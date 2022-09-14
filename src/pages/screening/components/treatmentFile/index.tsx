import React from 'react';
import { Divider, Space } from 'antd';
import { EMPTY } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import styles from '../inspectFile/index.less';
import { CarryOutOutlined, SkinOutlined, UserOutlined } from '@ant-design/icons';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';

export const TreatmentFile: React.FC = () => {
  const childInfo = [
    { value: 'name', icon: <UserOutlined /> },
    { value: 'birthdayInfo', icon: <CarryOutOutlined /> },
    { value: 'gender', icon: <SkinOutlined /> },
  ];

  const columns: ProColumns<API.ScreenListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      render: () => {
        return [
          <DynamicButtonGroup key="operator">
            <SwitchableButton key="student" icon="icon-a-Group120">
              就诊报告
            </SwitchableButton>
          </DynamicButtonGroup>,
        ];
      },
    },
  ];

  return (
    <>
      <p className={styles.title}>儿童信息</p>
      <Space size={30} className={styles.children_info}>
        {childInfo.map((item) => (
          <span key={item.value}>
            {item.icon}
            <Divider type="vertical" />
          </span>
        ))}
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
