import { history } from 'umi';
import React, { useState, useRef, useMemo } from 'react';
import { Button, message, Card } from 'antd';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DynamicForm from '@/components/DynamicForm';
import SwitchableButton from '@/components/SwitchableButton';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import { AddModal } from './add-modal';
import { OperationModal } from './operation-modal';
import { listColumns } from './columns';
import { FormItemOptions } from './form-item';
import { EMPTY } from '@/utils/constant';
import { convertData, deleteRedundantData } from '@/utils/common';
import { TableListCtx } from '@/hook/ant-config';
import { deleteTableRow } from '@/hook/table';
import { getschoolGrade } from '@/api/school';
import { getStudentList, deleteStudentInfo, getStudentFormItemList } from '@/api/student';

const TableList: React.FC = () => {
  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const [modalVisible, setModalVisible] = useState(false); // 新增/编辑弹窗
  const [operationVisible, setOperationVisible] = useState(false); // 导入/导出
  const [typeKey, setTypeKey] = useState(''); // 导入/导出标志位
  const [currentRow, setCurrentRow] = useState<API.StudentListItem>(); // 当前行数据
  const [gradeOption, setGradeOption] = useState<API.ObjectType[]>([]);
  const ref = useRef<ProFormInstance>();
  const tableRef = useRef<ActionType>();

  const [ItemOptions, setItemOptions] = useState<
    Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
  >({ ...FormItemOptions });

  /**
   * @desc 获取年级班级
   */
  useMemo(async () => {
    const [gradeList, formItemList] = await Promise.all([
      getschoolGrade(),
      getStudentFormItemList(),
    ]);
    const { data: gradeListOption } = gradeList;
    const {
      data: { glassesTypeList, refractionTypeList, visionTypeList, yearList },
    } = formItemList;

    setGradeOption(gradeListOption);
    console.log(
      '123',
      gradeOption,
      gradeOption.filter((item) => item.gradeName !== '毕业'),
    );
    setItemOptions((s) => ({
      ...s,
      listTypeInfo: {
        gradeOptions: convertData(gradeListOption),
        glassesTypeList,
        refractionTypeList,
        visionTypeList,
        yearList,
      },
    }));
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
    setSearchForm({});
    ref?.current?.resetFields();
    tableRef?.current?.reloadAndRest?.();
  };

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    const [gradeId, classId] = formVal?.gradeName || [];
    setSearchForm(
      deleteRedundantData(
        {
          ...formVal,
          gradeId,
          classId,
          [formVal?.select]: formVal?.input,
        },
        ['select', 'input', 'gradeName'],
      ),
    );
    tableRef?.current?.reloadAndRest?.();
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
   * @desc 跳转档案管理
   */
  const onJumpArchives = (record: API.StudentListItem) => {
    history.push(`/student/file?id=${record.id}`);
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
        <DynamicButtonGroup key="operator">
          {/* <Button
            type="link"
            onClick={() => {
              onAdd(record);
            }}
          >
            编辑
          </Button> */}
          <Button type="link" onClick={() => onDelete(record)}>
            删除
          </Button>
          <SwitchableButton
            key="manage"
            icon="icon-a-Group120"
            onClick={() => onJumpArchives(record)}
          >
            学生档案
          </SwitchableButton>
        </DynamicButtonGroup>,
      ],
    },
  ];

  return (
    <PageContainer>
      <TableListCtx.Provider
        value={{
          ref,
        }}
      >
        <Card className="pro-form-card">
          <ProForm layout="horizontal" formRef={ref} submitter={false}>
            <DynamicForm {...ItemOptions} onSearch={onSearch} onReset={onReset} />
          </ProForm>
        </Card>
        <ProTable<API.StudentListItem, API.PageParams>
          rowKey="id"
          pagination={{ pageSize: 10 }}
          options={false}
          actionRef={tableRef}
          form={{ span: 8, labelWidth: 120 }}
          columnEmptyText={EMPTY}
          search={false}
          scroll={{ x: 'max-content' }}
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
              data: datas.data.records || [],
              success: true,
              total: datas.data.total || 0,
            };
          }}
          columns={columns}
        />
      </TableListCtx.Provider>
      <AddModal
        visible={modalVisible}
        currentRow={currentRow}
        option={gradeOption.filter((item) => item.name !== '毕业')} // 新增过滤掉毕业年级
        title={currentRow ? '编辑学生' : '创建学生'}
        onCancel={(refresh) => {
          setModalVisible(false);
          refresh && onSearch();
        }}
      />
      <OperationModal
        visible={operationVisible}
        typeKey={typeKey}
        gradeOption={gradeOption}
        onCancel={(refresh) => {
          setOperationVisible(false);
          refresh && onSearch();
        }}
      />
    </PageContainer>
  );
};

export default TableList;
