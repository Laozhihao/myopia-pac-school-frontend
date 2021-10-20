import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'umi';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { AddModal } from './add-modal';
import { OperationModal } from './operation-modal';
import { listColumns } from './columns';
import { rule } from '@/services/ant-design-pro/api';
import { deleteTableRow } from '@/utils/common';

const TableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗

  const [operationVisible, setOperationVisible] = useState(false); // 导入/导出
  const [typeKey, setTypeKey] = useState(''); // 导入/导出标志位

  const [currentRow, setCurrentRow] = useState<API.StudentListItem>();

  const ref = useRef<ProFormInstance>();

  /**
   * @desc 新增/编辑
   */
  const onAdd = (rows: React.SetStateAction<API.StudentListItem | undefined>) => {
    setModalVisible(true);
    setCurrentRow(rows);
  };

  /**
   * @desc 重置
   */
  const onReset = () => {
    ref?.current?.resetFields();
    ref?.current?.submit();
  };

  /**
   * @desc 删除
   */
  const onDelete = () => {
    deleteTableRow('该学生数据', () => {
      console.log('确认删除');
    });
  };

  /**
   * @desc 导入导出弹窗
   */
  const showModal = (key: React.SetStateAction<string>) => {
    setOperationVisible(true);
    setTypeKey(key);
  };

  const columns: ProColumns<API.StudentListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            onAdd(record);
          }}
        >
          编辑
        </a>,
        <a key="delete" onClick={onDelete}>
          删除
        </a>,
        <Link key="manage" to="/student/file">
          档案管理
        </Link>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.StudentListItem, API.PageParams>
        rowKey="key"
        pagination={{ pageSize: 10 }}
        options={false}
        formRef={ref}
        form={{ span: 8, labelWidth: 120 }}
        search={{
          collapseRender: false,
          collapsed: false,
          optionRender: () => [
            <Button key="reset" onClick={onReset}>
              重 置
            </Button>,
            <Button key="search" type="primary" onClick={() => ref?.current?.submit()}>
              搜 索
            </Button>,
          ],
        }}
        scroll={{
          x: 'max-content',
        }}
        columnsStateMap={{
          name: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="export"
            onClick={() => {
              showModal('export');
            }}
          >
            <UploadOutlined /> 导出
          </Button>,
          <Button
            type="primary"
            key="import"
            onClick={() => {
              showModal('import');
            }}
          >
            <DownloadOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              onAdd(undefined);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={async (params) => {
          const datas = await rule({
            ...params,
            current: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: datas.data,
            success: true,
            total: datas.total,
          };
        }}
        columns={columns}
      />
      <AddModal
        visible={modalVisible}
        currentRow={currentRow}
        title={currentRow ? '编辑学生' : '创建学生'}
        onCancel={() => {
          setModalVisible(false);
        }}
      />

      <OperationModal
        visible={operationVisible}
        typeKey={typeKey}
        onCancel={() => {
          setOperationVisible(false);
        }}
      />
    </PageContainer>
  );
};

export default TableList;
