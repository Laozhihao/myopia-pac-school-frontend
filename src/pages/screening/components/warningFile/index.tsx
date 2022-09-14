import React from 'react';
import { Space } from 'antd';
import { EMPTY } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import { columns } from './columns';

export const WarningFile: React.FC = () => {
  return (
    <>
      <Space size={30}>
        <span>学号：</span>
        <span>姓名：</span>
        <span>年级班级：</span>
        <span>性别：</span>
      </Space>
      <ProTable<API.StudentListItem, API.PageParams>
        rowKey="id"
        pagination={{ pageSize: 10 }}
        options={false}
        columnEmptyText={EMPTY}
        search={false}
        scroll={{
          x: '100vw',
        }}
        style={{ marginTop: 15 }}
        // columnsStateMap={{
        //   sno: {
        //     fixed: 'left',
        //   },
        //   option: {
        //     fixed: 'right',
        //   },
        // }}
        // request={async (params) => {
        //   const { data } = await getStudentList({
        //     current: params.current,
        //     size: params.pageSize,
        //   });
        //   return {
        //     data: data?.records || [],
        //     success: true,
        //     total: data?.total || 0,
        //   };
        // }}
        columns={columns}
      />
    </>
  );
};
