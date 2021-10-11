import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { listColumns } from './columns';
import { PlusOutlined } from '@ant-design/icons';
import { AddModal } from './add-modal';
import { deleteTableRow } from '@/utils/common';

const GradeManage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [currentRow, setCurrentRow] = useState<API.GradeListItem>();

  const tableListDataSource: {
    key: number;
    name: string;
    number: number;
    children: { key: number; name: string; number: number }[];
  }[] = [];

  for (let i = 0; i < 3; i += 1) {
    tableListDataSource.push({
      key: i,
      name: 'AppName',
      number: Math.floor(Math.random() * 20),
      children: [{ key: i, name: 'AppName', number: Math.floor(Math.random() * 20) }],
    });
  }

  const onAdd = (rows: React.SetStateAction<API.GradeListItem | undefined>) => {
    setModalVisible(true);
    setCurrentRow(rows);
  };

  const onDelete = (rows: API.GradeListItem) => {
    deleteTableRow('该所选数据', () => {
      console.log('确认删除', rows);
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
        <a key="add" onClick={() => onAdd(record)}>
          新增班级
        </a>,
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
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          pageSize: 10,
        }}
        columnsStateMap={{
          option: {
            fixed: 'right',
          },
        }}
        expandable={{ childrenColumnName: 'children' }}
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
        onFinish={async (values) => console.log(values)}
      />
    </PageContainer>
  );
};

export default GradeManage;
