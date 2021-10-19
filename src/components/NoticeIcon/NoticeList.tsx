import { List } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './NoticeList.less';

export type NoticeIconTabProps = {
  count?: number;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: API.NoticeIconItemType;
  onClick?: (item: API.NoticeListItem) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: API.NoticeListItem[];
  onViewMore?: (e: any) => void;
  onListItemClick?: (item: API.NoticeListItem) => void;
};
const NoticeList: React.FC<NoticeIconTabProps> = ({
  list = [],
  onClick,
  onViewMore,
  emptyText,
  viewMoreText,
  showViewMore = false,
}) => {
  if (!list || list.length === 0) {
    return (
      <div className={styles.notFound}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List<API.NoticeListItem>
        className={styles.list}
        dataSource={list}
        renderItem={(item, i) => {
          return (
            <List.Item
              className={styles.item}
              key={item.id || i}
              onClick={() => {
                onClick?.(item);
              }}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={<MailOutlined className={styles.icon} />}
                title={<div className={styles.title}>{item.title}</div>}
                description={<div className={styles.description}>{item.createTime}</div>}
              />
            </List.Item>
          );
        }}
      />
      <div className={styles.bottomBar}>
        {showViewMore ? (
          <div
            onClick={(e) => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoticeList;
