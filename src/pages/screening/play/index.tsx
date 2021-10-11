import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { rule } from '@/services/ant-design-pro/api';
import { AddModal } from './add-modal';
import { Link } from 'umi';

const TableList: React.FC = () => {
  // const [currentRow, setCurrentRow] = useState();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.ScreenListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (...params) => {
        const [, record] = params;
        return [
          <a key={record.name} onClick={() => handleModalVisible(true)}>
            打印二维码/告知书
          </a>,
          <Link to="/screening/result" key="result">
            筛查结果
          </Link>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ScreenListItem, API.PageParams>
        actionRef={actionRef}
        tableStyle={{ paddingTop: 30 }}
        rowKey="key"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        request={rule}
        columns={columns}
        scroll={{
          x: 'max-content',
        }}
        columnsStateMap={{
          name: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
        }}
      />
      <AddModal
        title="打印告知书/二维码"
        visible={createModalVisible}
        onCancel={() => {
          handleModalVisible(false);
        }}
      />
    </PageContainer>
  );
};

export default TableList;
