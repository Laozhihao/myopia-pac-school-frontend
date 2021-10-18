import { useEffect, useState } from 'react';
// import { message } from 'antd';
import { useRequest } from 'umi';
import { unreadCount } from '@/api/common';

import NoticeIcon from './NoticeIcon';
import styles from './index.less';

const NoticeIconView = () => {
  const [notices, setNotices] = useState<API.ObjectType>();
  const { run } = useRequest(unreadCount, {
    manual: true,
    onSuccess: (result) => {
      setNotices(result);
    },
  });

  useEffect(() => {
    run();
  }, []);

  const onRouter = () => {
    console.log('changeRouter');
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={notices?.total}
      onItemClick={onRouter}
      loading={false}
      viewMoreText="查看更多"
      onViewMore={onRouter}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="info"
        count={notices?.stationLetter?.length}
        list={notices?.stationLetter}
        title="站内信"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="notice"
        count={notices?.screeningNotice?.length}
        list={notices?.screeningNotice}
        title="筛查通知"
        emptyText="您已查看所有信息"
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
