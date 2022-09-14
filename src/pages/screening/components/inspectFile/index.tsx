import React from 'react';
import { Divider, Space, Tag } from 'antd';
import { EMPTY } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import styles from './index.less';
import {
  CarryOutOutlined,
  CheckCircleOutlined,
  FieldNumberOutlined,
  SkinOutlined,
  UserOutlined,
} from '@ant-design/icons';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { SITUATIONOPTION } from '@/utils/form-constant';

export const InspectFile: React.FC = () => {
  const childInfo = [
    { value: 'name', icon: <UserOutlined /> },
    { value: 'birthdayInfo', icon: <CarryOutOutlined /> },
    { value: 'gender', icon: <SkinOutlined /> },
    { value: 'recordNo', icon: <FieldNumberOutlined /> },
  ];

  const columns: ProColumns<API.NoticeListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: () => [
        <DynamicButtonGroup key="operator">
          <SwitchableButton icon="icon-a-Group120">儿童眼保健及视力检查记录表</SwitchableButton>
          <SwitchableButton icon="icon-a-Group120">转诊单</SwitchableButton>
          <SwitchableButton icon="icon-a-Group120">回执单</SwitchableButton>
        </DynamicButtonGroup>,
      ],
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
      <div>
        <span className={styles.mgr80}>总体检查情况 1 / 13</span>
        {SITUATIONOPTION.map((item) => (
          <Tag key={item.value} icon={<CheckCircleOutlined />}>
            {item.label}
          </Tag>
        ))}
      </div>
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
