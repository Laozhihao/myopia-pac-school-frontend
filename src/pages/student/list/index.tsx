import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Select } from 'antd';
import { Link } from 'umi';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { AddModal } from './add-modal';
import { ImportModal } from './import-modal';
import { listColumns } from './columns';
import { rule } from '@/services/ant-design-pro/api';
import { deleteTableRow } from '@/utils/common';
import { ExportModal } from '@/pages/components/export-modal';
import styles from './index.less';

const { Option } = Select;

// 年级option类型
interface gradeOptionType {
  label: string;
  value: string;
}

const TableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [exportVisible, setExportVisible] = useState(false); // 导出
  const [importVisible, setImportVisible] = useState(false); // 导入
  const [gradeList, setGradeList] = useState<gradeOptionType[]>([]); // 学生列表

  const [gradeId, setGradeId] = useState();
  const [exportType, setExportType] = useState(1); // 导出类型

  const [currentRow, setCurrentRow] = useState<API.StudentListItem>();

  const ref = useRef<ProFormInstance>();

  useEffect(() => {
    // todo 接口
    setGradeList([{ label: '一年级', value: '11' }]);
  }, []);

  /**
   * @desc 删除
   */
  const onDelete = () => {
    deleteTableRow('该学生数据', () => {
      console.log('确认删除');
    });
  };

  /**
   * @desc 重置
   */
  const onReset = () => {
    ref?.current?.resetFields();
    ref?.current?.submit();
  };

  const onAdd = (rows: React.SetStateAction<API.StudentListItem | undefined>) => {
    setModalVisible(true);
    setCurrentRow(rows);
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
            <Button key="reset" onClick={() => onReset()}>
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
            key="primary"
            onClick={() => {
              setExportVisible(true);
            }}
          >
            <UploadOutlined /> 导出
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setImportVisible(true);
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

      <ExportModal
        visible={exportVisible}
        title={'学生数据'}
        onCancel={() => {
          setExportVisible(false);
        }}
        onOk={() => {
          console.log(gradeId, '123');
        }}
      >
        <div className={styles.content}>
          <p className={styles.title}>请确认学生数据导出条件：</p>
          <Radio.Group
            className={styles.radio}
            onChange={(e: { target: { value: React.SetStateAction<number> } }) =>
              setExportType(e.target.value)
            }
            value={exportType}
          >
            <Space direction="vertical">
              <Radio value={1}>导出全校学生数据</Radio>
              <Radio value={2}>导出年级学生数据</Radio>
            </Space>
          </Radio.Group>
          {exportType === 2 ? (
            <Select
              style={{ width: '100%', marginBottom: 20 }}
              allowClear
              value={gradeId}
              onChange={(val: React.SetStateAction<undefined>) => setGradeId(val)}
              placeholder="请选择年级"
            >
              {gradeList.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          ) : null}
          <p>导出内容：在所选择学校下对应选择年级的全部学生信息</p>
        </div>
      </ExportModal>
      <ImportModal
        title={'学生数据'}
        visible={importVisible}
        onCancel={() => setImportVisible(false)}
        onOk={() => {}}
      />
    </PageContainer>
  );
};

export default TableList;
