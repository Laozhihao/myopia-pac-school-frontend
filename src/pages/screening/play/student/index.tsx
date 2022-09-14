import { Button, Card } from 'antd';
import React, { useState, useRef, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { getStudentList } from '@/api/student';
import { EMPTY } from '@/utils/constant';
import SwitchableButton from '@/components/SwitchableButton';
import { FormItemOptions } from './form-item';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import { convertData } from '@/utils/common';
import { AddModal } from './add/index';
import { TableListCtx } from '@/hook/ant-config';

const TableList: React.FC = () => {
  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const ref = useRef<ProFormInstance>();
  const tableRef = useRef<ActionType>();

  const [ItemOptions, setItemOptions] = useState<
    Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
  >({ ...FormItemOptions });

  const [addModelInfo, setAddModelInfo] = useState<API.ModalDataType>({
    title: '新增筛查学生',
    visible: false,
    currentRow: {},
  }); // 新增筛查

  /**
   * @desc 获取年级班级
   */
  useMemo(() => {
    setItemOptions((s) => ({
      ...s,
      listTypeInfo: { ...s.listTypeInfo, gradeOptions: convertData([]) },
    }));
  }, []);

  /**
   * @desc 新增/编辑
   */
  const onHandle = () => {
    setAddModelInfo((s) => ({ ...s, visible: true }));
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
    setSearchForm({
      gradeId,
      classId,
      [formVal?.select]: formVal?.input,
    });
    tableRef?.current?.reloadAndRest?.();
  };

  const onCancel = (refresh?: boolean) => {
    setAddModelInfo((s) => ({ ...s, visible: false }));
    refresh && onSearch();
  };

  const columns: ProColumns<API.StudentListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => [
        <DynamicButtonGroup key="operator">
          <SwitchableButton key="detail" icon="icon-a-Group120">
            查看详情
          </SwitchableButton>
          <SwitchableButton key="manage" icon="icon-a-Group120" href={'/#/screening/play/archives'}>
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
            <Button type="primary" key="add" onClick={onHandle}>
              新增筛查学校
            </Button>,
          ]}
          request={async (params) => {
            const { data } = await getStudentList({
              ...searchForm,
              current: params.current,
              size: params.pageSize,
            });
            return {
              data: data?.records || [],
              success: true,
              total: data?.total || 0,
            };
          }}
          columns={columns}
        />
      </TableListCtx.Provider>
      <AddModal {...addModelInfo} option={[]} onCancel={onCancel}></AddModal>
    </PageContainer>
  );
};

export default TableList;
