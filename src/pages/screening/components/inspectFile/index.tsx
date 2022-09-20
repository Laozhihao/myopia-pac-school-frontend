import React, { useMemo, useRef, useState } from 'react';
import { Divider, Space, Tag } from 'antd';
import { EMPTY, TABLESEXOPTION } from '@/utils/constant';
import ProTable, { ActionType } from '@ant-design/pro-table';
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
import { history } from 'umi';
import { StudentInfoType } from '../typings';
import { getStudentPreschoolCheckInfo, getStudentPreschoolCheckList } from '@/api/screen/archives';

export const InspectFile: React.FC = () => {

  const tableRef = useRef<ActionType>();

  const childInfo = [
    { value: 'name', icon: <UserOutlined /> },
    { value: 'birthdayInfo', icon: <CarryOutOutlined /> },
    { value: 'gender', icon: <SkinOutlined />, slot: (val: StudentInfoType) => val?.gender && TABLESEXOPTION[val?.gender]  },
    { value: 'recordNo', icon: <FieldNumberOutlined /> },
  ];

  const { query: { id } = {} } = history.location;

  const [studentInfo, setStudentInfo] = useState<StudentInfoType & { ageStageStatusList?: API.ObjectType[] }>({});
  const [ageCheckList, setAgeCheckList] = useState<React.Key[]>([]); // 个人信息已做检查的情况
  const [activeCheckList, setActiveCheckList] = useState<React.Key[]>([]); // 当前激活的月龄项目


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

  useMemo(async () => {
    const { data } = await getStudentPreschoolCheckInfo({id});
    setStudentInfo(data);
    const ageArr = data?.ageStageStatusList.filter((item: { status: number }) => [3, 6].includes(item.status)); // 有做过检查的月龄
    const arr = ageArr.map((item: { monthAge: any }) => item.monthAge);
    setAgeCheckList(arr);
    setActiveCheckList(arr);
  }, []);

  const onSelect = (value: React.Key) => {
    if (!ageCheckList.includes(value)) {
      return;
    }
    if (activeCheckList.includes(value)) {
      const nowIndex = activeCheckList.findIndex(item => item === value);
      activeCheckList.splice(nowIndex, 1)
      setActiveCheckList([...activeCheckList])
    } else {
      setActiveCheckList((s) => ([...s, value]));
    }
    tableRef?.current?.reload?.();
  };

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
      <div>
        <span className={styles.mgr80}>总体检查情况 { ageCheckList.length } / 13</span>
        {SITUATIONOPTION.map((item) => (
          <Tag key={item.value} icon={<CheckCircleOutlined />} color={activeCheckList.includes(item.value) ? 'processing' : 'default'}  onClick={() => onSelect(item.value)}>
            {item.label}
          </Tag>
        ))}
      </div>
      <ProTable<API.StudentListItem, API.PageParams>
        rowKey="id"
        pagination={{ pageSize: 10 }}
        actionRef={tableRef}
        options={false}
        columnEmptyText={EMPTY}
        search={false}
        scroll={{
          x: '100vw',
        }}
        style={{ marginTop: 15 }}
        columnsStateMap={{
          sno: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
        }}
        request={async (params) => {
          const { data } = await getStudentPreschoolCheckList({
            id,
            monthAges: activeCheckList?.length ? activeCheckList.join(',') : undefined,
            current: params.current,
            size: params.pageSize,
          });
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
