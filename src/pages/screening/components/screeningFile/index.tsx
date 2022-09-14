import React from 'react';
import { Tag, Space } from 'antd';
import styles from './index.less';
import { EMPTY } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import { columns } from './columns';

export const ScreeningFile: React.FC = () => {
  return (
    <>
      <p className={styles.date}>筛查日期</p>
      <Space>
        <span className={[styles.screening, styles.screening_red].join(' ')}>常见病筛查</span>
        <Tag color="success">初筛</Tag>
        <span>筛查编号：</span>
        <span>筛查标题：</span>
        <span>筛查机构：</span>
        <span>D编码：</span>
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
        className={styles.table}
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
