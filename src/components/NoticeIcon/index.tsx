import { useEffect, useState } from 'react';
import { useRequest, history } from 'umi';
import { unreadCount } from '@/api/common';
import NoticeIcon from './NoticeIcon';
import styles from './index.less';

const Info = '/info-center';
const Notice = '/screening';
const NoticeIconView = () => {
  const [notices, setNotices] = useState<API.ObjectType>();
  const { run } = useRequest(unreadCount, {
    manual: true,
    // pollingInterval: 3000,
    onSuccess: (result) => {
      setNotices(result);
    },
  });

  useEffect(() => {
    run();
  }, []);

  const onRouter = (item: any, props: any) => {
    // 站内信
    if (props.tabKey === 'info') {
      if (history.location.pathname === Info) return;
      history.push(Info);
    } else {
      if (history.location.pathname === Notice) return;
      history.push(Notice);
    }
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={notices?.total}
      onItemClick={onRouter}
      loading={false}
      viewMoreText="查看更多"
      onViewMore={(props) => onRouter(false, props)}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="info"
        count={notices?.stationLetter?.length}
        list={notices?.stationLetter}
        title="站内信"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="notice"
        count={notices?.screeningNotice?.length}
        list={notices?.screeningNotice}
        title="筛查通知"
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
