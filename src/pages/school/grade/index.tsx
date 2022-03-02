import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { listColumns } from './columns';
import { PlusOutlined } from '@ant-design/icons';
import { AddModal } from './add-modal';
import { deleteTableRow } from '@/hook/table';
import { getsGradeList, deleteClass, deleteGrade } from '@/api/school';
import { useModel } from 'umi';
import type { ActionType } from '@ant-design/pro-table';

const GradeManage: React.FC = () => {
  const ref = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [expandedRow, setExpandedRow] = useState<React.Key[]>([]); // 展开行
  const [tableData, setTableData] = useState<any[]>([]);    // 表格数据

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;


  /**
   * @desc 删除
   */
  const onDelete = (rows: API.GradeListItem & {gradeIndex: number}) => {
    if (typeof rows?.id !== 'number') {
      const { child = [] as any[] } = tableData[rows.gradeIndex];
      const nowClassIndex = child.findIndex((item: { id: any }) => item.id === rows.id);
      child.splice(nowClassIndex, 1);
      setTableData(value => [
        ...value,
      ])
      return;
    }
    deleteTableRow('该所选数据', async () => {
      const apiFn = rows?.gradeId ? deleteClass : deleteGrade;
      await apiFn(rows?.id!);
      ref?.current?.reload();
    });
  };

  /**
   * @desc 新增班级
   */
  const onAddClass = (record: API.GradeListItem, index: number) => {
    const { id, schoolId } = record;
    id && setExpandedRow((value) => [...value, id]);
    record.child = [
      ...(record?.child || []),
      {
        gradeIndex: index,
        gradeId: id,
        schoolId,
        id: new Date(),
      },
    ];
  };

  const columns: ProColumns<API.GradeListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_, record, index) => [
        !record?.gradeId ? (
          <a key="add" onClick={() => onAddClass(record, index)}>
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
          setTableData(datas.data.records);
          return {
            success: true,
            total: datas.data.total,
          };
        }}
        dataSource={tableData}
        rowKey="id"
        pagination={{
          pageSize: 10,
        }}
        columnsStateMap={{
          option: {
            fixed: 'right',
          },
        }}
        expandable={{ childrenColumnName: 'child' }}
        expandedRowKeys={expandedRow}
        onExpandedRowsChange={(rows) => setExpandedRow(rows)}
        search={false}
        headerTitle="年级表格"
        options={false}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setModalVisible(true)}>
            <PlusOutlined />
            新增年级
          </Button>,
        ]}
      />
      <AddModal
        visible={modalVisible}
        title="新增年级班级"
        onCancel={() => {
          setModalVisible(false);
        }}
        onFinish={async () => {
          setModalVisible(false);
          ref?.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default GradeManage;
