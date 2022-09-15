import React, { useRef } from 'react';
import { Button } from 'antd';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { EMPTY } from '@/utils/constant';
import { getScreeningList } from '@/api/screen/plan';
import { PlusOutlined } from '@ant-design/icons';

const TableList: React.FC = () => {
  const tableRef = useRef<ActionType>();

  // tableRef?.current?.reloadAndRest?.(); 刷新

  const columns: ProColumns<API.ScreenListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => {
        return [
          <DynamicButtonGroup key="operator">
            <SwitchableButton key="student" icon="icon-a-Group120">
              学生档案
            </SwitchableButton>
          </DynamicButtonGroup>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ScreenListItem, API.PageParams>
        rowKey="planId"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={tableRef}
        columnEmptyText={EMPTY}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />}>
            创建
          </Button>,
        ]}
        request={async (params) => {
          const datas = await getScreeningList({
            current: params.current,
            size: params.pageSize,
          });
          return {
            data: datas.data.records,
            success: true,
            total: datas.data.total,
          };
        }}
        columns={columns}
        scroll={{
          x: '100vw',
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
    </PageContainer>
  );
};

export default TableList;
