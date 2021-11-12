import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link } from 'umi';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { AddModal } from './add-modal';
import { OperationModal } from './operation-modal';
import { listColumns } from './columns';
import { deleteTableRow } from '@/pages/hook/table';
import { getschoolGrade } from '@/api/school';
import { getStudentList, deleteStudentInfo } from '@/api/student';
import { useModel } from 'umi';

const TableList: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [operationVisible, setOperationVisible] = useState(false); // 导入/导出
  const [typeKey, setTypeKey] = useState(''); // 导入/导出标志位
  const [currentRow, setCurrentRow] = useState<API.StudentListItem>(); // 当前行数据
  const [gradeOption, setGradeOption] = useState<API.ObjectType[]>([]);
  const ref = useRef<ProFormInstance>();

  let searchForm = {}; // 搜索表单项

  /**
   * @desc 获取年级班级 todo: 接口替换
   */

  const init = (params: API.ObjectType) => {
    getschoolGrade(params).then((res) => {
      setGradeOption(res.data);
    });
  };

  useEffect(() => {
    init({ schoolId: currentUser!.orgId });
    // init({ schoolId: 2 });
  }, []);

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
    searchForm = {};
    ref?.current?.resetFields();
    ref?.current?.submit();
  };

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    Object.assign(searchForm, {
      gradeId: formVal?.gradeName?.[0],
      classId: formVal?.gradeName?.[1],
      [formVal?.select]: formVal?.input,
      visionLabel: formVal?.warningLevel,
    });
    ref?.current?.submit();
  };

  /**
   * @desc 删除
   */
  const onDelete = (row: API.StudentListItem | undefined) => {
    deleteTableRow('该学生数据', async () => {
      await deleteStudentInfo(row?.id!);
      message.success('删除成功');
      onSearch();
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
    ...listColumns(gradeOption),
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
        <a key="delete" onClick={() => onDelete(record)}>
          删除
        </a>,
        <Link key="manage" to={`/student/file?id=${record.id}`}>
          档案管理
        </Link>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.StudentListItem, API.PageParams>
        rowKey="id"
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
            <Button key="search" type="primary" onClick={onSearch}>
              搜 索
            </Button>,
          ],
        }}
        scroll={{
          x: '100vw',
        }}
        columnsStateMap={{
          sno: {
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
            key="add"
            onClick={() => {
              onAdd(undefined);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={async (params) => {
          const datas = await getStudentList({
            ...searchForm,
            current: params.current,
            size: params.pageSize,
          });
          return {
            data: datas.data.records,
            success: true,
            total: datas.data.total,
          };
        }}
        columns={columns}
      />
      <AddModal
        visible={modalVisible}
        currentRow={currentRow}
        option={gradeOption}
        title={currentRow ? '编辑学生' : '创建学生'}
        onCancel={(refresh) => {
          setModalVisible(false);
          refresh && onSearch();
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
