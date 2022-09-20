import React, { useState } from 'react';
import { Divider, Space } from 'antd';
import { EMPTY, TABLESEXOPTION } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import styles from '../inspectFile/index.less';
import { CarryOutOutlined, SkinOutlined, UserOutlined } from '@ant-design/icons';
import { history } from 'umi';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { StudentInfoType } from '../typings';
import { getStudentReportList } from '@/api/screen/archives';

export const TreatmentFile: React.FC = () => {
  const childInfo = [
    { value: 'name', icon: <UserOutlined /> },
    { value: 'birthdayInfo', icon: <CarryOutOutlined /> },
    { value: 'gender', icon: <SkinOutlined />, slot: (val: StudentInfoType) => val?.gender && TABLESEXOPTION[val?.gender] },
  ];

  const [studentInfo, setStudentInfo] = useState<StudentInfoType>({});

  const { query: { id } = {} } = history.location;

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
            <span style={{marginLeft: 8}}>{item.slot ? item.slot(studentInfo) : studentInfo?.[item.value]}</span>
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
        request={async (params) => {
          const { data } = await getStudentReportList({
            id,
            current: params.current,
            size: params.pageSize,
          });
          setStudentInfo(data?.studentInfo);
          return {
            data: data?.pageData?.records || [],
            success: true,
            total: data?.pageData?.total || 0,
          };
        }}
        columns={columns}
      />
    </>
  );
};
