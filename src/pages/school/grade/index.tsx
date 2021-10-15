import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { listColumns } from './columns';
import { PlusOutlined } from '@ant-design/icons';
import { AddModal } from './add-modal';
import { deleteTableRow } from '@/utils/common';
import { getsGradeList, deleteClass, deleteGrade } from '@/api/school';
import { useModel } from 'umi';
import type { ActionType } from '@ant-design/pro-table';

const GradeManage: React.FC = () => {
  const ref = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [currentRow, setCurrentRow] = useState<API.GradeListItem>();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  const onAdd = (rows: React.SetStateAction<API.GradeListItem | undefined>) => {
    setModalVisible(true);
    setCurrentRow(rows);
  };

  const onDelete = (rows: API.GradeListItem) => {
    deleteTableRow('该所选数据', async () => {
      const apiFn = rows?.gradeId ? deleteClass : deleteGrade;
      await apiFn(rows?.id!);
      ref?.current?.reload();
    });
  };

  const columns: ProColumns<API.GradeListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_, record) => [
        !record?.gradeId ? (
          <a key="add" onClick={() => onAdd(record)}>
            新增班级
          </a>
        ) : null,
        <a key="delete" style={{ color: '#FF4D4F' }} onClick={() => onDelete(record)}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.GradeListItem, API.PageParams>
        columns={columns}
        actionRef={ref}
        request={async (params) => {
          const datas = await getsGradeList({
            ...params,
            size: params.pageSize,
            schoolId: currentUser?.orgId,
          });
          return {
            data: datas.data.records,
            success: true,
            total: datas.data.total,
          };
        }}
        // todo rowKey 替换 uniqueId
        rowKey="name"
        pagination={{
          pageSize: 10,
        }}
        columnsStateMap={{
          option: {
            fixed: 'right',
          },
        }}
        expandable={{ childrenColumnName: 'child' }}
        search={false}
        headerTitle="年级表格"
        options={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => onAdd(undefined)}>
            <PlusOutlined />
            新增年级
          </Button>,
        ]}
      />
      <AddModal
        visible={modalVisible}
        currentRow={currentRow}
        title={currentRow ? '新增班级' : '新增年级'}
        onCancel={() => {
          setModalVisible(false);
        }}
        onFinish={() => {
          setModalVisible(false);
          ref?.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default GradeManage;
