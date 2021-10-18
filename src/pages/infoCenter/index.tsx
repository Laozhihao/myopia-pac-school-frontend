import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { listColumns } from './columns';
import { deleteTableRow } from '@/utils/common';
import { getInfoList, readInfoNotice, deleteInfoItem } from '@/api/info';
import styles from './index.less';

const InfoCenter: React.FC = () => {
  const ref = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  /**
   * 删除
   */
  const onDelete = () => {
    const filterList = selectedRows.map((row: API.NoticeListItem) => row?.id);
    if (!filterList.length) return;
    deleteTableRow('该所选数据', async () => {
      await deleteInfoItem(filterList);
      message.success('删除成功');
      ref?.current?.reloadAndRest?.();
    });
  };

  /**
   * 刷新状态
   */
  const refreshInit = async (list: API.NoticeListItem) => {
    const filterList = list
      .filter((row: API.NoticeListItem) => row?.status !== 1)
      .map((row: API.NoticeListItem) => row?.id);
    if (filterList.length) {
      await readInfoNotice(filterList);
      ref?.current?.reloadAndRest?.();
    }
  };

  const columns: ProColumns<API.NoticeListItem>[] = [
    ...listColumns,
    {
      title: '消息内容',
      width: 450,
      dataIndex: 'content',
      render: (dom, record) =>
        record.downloadUrl ? (
          <a
            href={record.downloadUrl}
            download={record.downloadUrl}
            onClick={() => refreshInit([record])}
          >
            {dom}
          </a>
        ) : (
          <span>{dom}</span>
        ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.NoticeListItem, API.PageParams>
        actionRef={ref}
        className={styles.table}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        tableAlertRender={false}
        options={false}
        rowSelection={{
          columnWidth: 60,
          fixed: true,
          onChange: (_, rows) => {
            setSelectedRows(rows);
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
          <Button key="primary" type="primary" ghost onClick={() => refreshInit(selectedRows)}>
            <CheckOutlined />已 读
          </Button>,
          <Button key="danger" danger onClick={onDelete}>
            <CloseOutlined /> 删 除
          </Button>,
        ]}
        request={async (params) => {
          const datas = await getInfoList({
            ...params,
            size: params.pageSize,
          });
          return {
            data: datas.data.records,
            success: true,
            total: datas.data.total,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default InfoCenter;
