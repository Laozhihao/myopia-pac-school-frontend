import React, { useState, useRef } from 'react';
import { Button, Card } from 'antd';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { deleteRedundantData } from '@/utils/common';
import { EMPTY } from '@/utils/constant';
import { getScreeningList } from '@/api/screen/plan';
import { FormItemOptions } from './form-item';
import { TableListCtx } from '@/hook/ant-config';
import { ExportModal } from '@/pages/components/export-modal';

const TableList: React.FC = () => {
  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const [exportVisible, setExportVisible] = useState(false);

  const tableRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    setSearchForm(deleteRedundantData({ ...formVal, [formVal?.select]: formVal?.input }));
    tableRef?.current?.reloadAndRest?.();
  };

  /**
   * @desc 重置
   */
  const onReset = () => {
    setSearchForm({});
    ref?.current?.resetFields();
    tableRef?.current?.reloadAndRest?.();
  };

  const onExport = () => {
    setExportVisible(false);
    // todo 导出
  };

  const columns: ProColumns<API.ScreenListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => {
        return [
          <DynamicButtonGroup key="operator">
            <SwitchableButton key="student" icon="icon-a-Group120">
              学生档案
            </SwitchableButton>
          </DynamicButtonGroup>,
        ];
      },
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
            <DynamicForm {...FormItemOptions} onSearch={onSearch} onReset={onReset} />
          </ProForm>
        </Card>
        <ProTable<API.ScreenListItem, API.PageParams>
          rowKey="planId"
          search={false}
          pagination={{ pageSize: 10 }}
          options={false}
          actionRef={tableRef}
          columnEmptyText={EMPTY}
          toolBarRender={() => [
            <Button type="primary" onClick={() => setExportVisible(true)}>
              导出
            </Button>,
          ]}
          request={async (params) => {
            const datas = await getScreeningList({
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
          scroll={{
            x: '100vw',
          }}
          columnsStateMap={{
            name: {
              fixed: 'left',
            },
            option: {
              fixed: 'right',
            },
          }}
        />
      </TableListCtx.Provider>
      <ExportModal
        visible={exportVisible}
        title="眼健康中心数据"
        onCancel={() => {
          setExportVisible(false);
        }}
        onOk={onExport}
      >
        <p style={{ margin: '10px 0 22px' }}>导出内容：眼健康数据中心表</p>
      </ExportModal>
    </PageContainer>
  );
};

export default TableList;
