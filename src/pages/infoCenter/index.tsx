import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { columns } from './columns';
import { rule } from '@/services/ant-design-pro/api';
import styles from './index.less';

const InfoCenter: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);

  const onRead = () => {
    if (!selectedRowsState.length) return;
    console.log('已读操作');
  };
  const onDelete = () => {
    if (!selectedRowsState.length) return;
    console.log('删除操作');
    // 删除
  };

  return (
    <PageContainer>
      <ProTable<API.NoticeListItem, API.PageParams>
        actionRef={actionRef}
        className={styles.table}
        rowKey="key"
        search={false}
        pagination={{ pageSize: 10 }}
        tableAlertRender={false}
        options={false}
        rowSelection={{
          columnWidth: 60,
          fixed: true,
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        scroll={{
          x: 'max-content',
        }}
        columnsStateMap={{
          name: {
            fixed: 'left',
          },
          callNo: {
            fixed: 'right',
          },
        }}
        toolBarRender={() => [
          <Button key="primary" type="primary" ghost onClick={onRead}>
            <CheckOutlined />已 读
          </Button>,
          <Button key="danger" danger onClick={onDelete}>
            <CloseOutlined /> 删 除
          </Button>,
        ]}
        request={rule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default InfoCenter;
