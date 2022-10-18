import React, { useState, useRef, useMemo } from 'react';
import { Badge, Button, Card, message, Modal, Space } from 'antd';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import type { PreventionEyeHealthType } from './columns';
import { convertData, deleteRedundantData } from '@/utils/common';
import { EMPTY } from '@/utils/constant';
import { FormItemOptions } from './form-item';
import { TableListCtx } from '@/hook/ant-config';
import { ExportModal } from '@/pages/components/export-modal';
import {
  getAllGradeList,
  getExportEyeHealthData,
  getPreventionEyeHealthList,
} from '@/api/prevention/eye-health';
import { history } from 'umi';

const TableList: React.FC = () => {
  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const [exportVisible, setExportVisible] = useState(false); // 导出弹窗
  const [proposalInfo, setProposalInfo] = useState<API.ModalDataType>({
    visible: false,
    currentRow: {},
  }); // 课座椅弹窗
  const [ItemOptions, setItemOptions] = useState(FormItemOptions);

  const tableRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();

  useMemo(async () => {
    const { data = [] } = await getAllGradeList();
    setItemOptions((s) => ({
      ...s,
      listTypeInfo: { ...s.listTypeInfo, gradeOptions: convertData(data) },
    }));
  }, []);

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    const [gradeId, classId] = formVal?.gradeIds || [];
    setSearchForm(
      deleteRedundantData({ ...formVal, [formVal?.select]: formVal?.input, gradeId, classId }, [
        'select',
        'input',
        'gradeIds',
      ]),
    );
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

  /**
   * @desc 导出
   */
  const onExport = async () => {
    setExportVisible(false);
    await getExportEyeHealthData();
    message.success('操作成功，请留意站内信!');
  };

  /**
   * @desc 课座椅建议
   */
  const showProposal = (record: PreventionEyeHealthType) => {
    setProposalInfo({ visible: true, currentRow: record });
  };

  /**
   * @desc 学生档案
   */
  const onJumpArchives = (record: PreventionEyeHealthType) => {
    history.push(`/student/file?id=${record.schoolStudentId}&studentId=${record?.studentId}`);
  };

  const columns: ProColumns<PreventionEyeHealthType>[] = [
    ...listColumns(showProposal),
    {
      title: '操作',
      dataIndex: 'option',
      width: 130,
      valueType: 'option',
      render: (_, record) => {
        return [
          <DynamicButtonGroup key="operator">
            <SwitchableButton
              key="student"
              icon="icon-Frame-1"
              onClick={() => onJumpArchives(record)}
            >
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
            <DynamicForm {...ItemOptions} onSearch={onSearch} onReset={onReset} />
          </ProForm>
        </Card>
        <ProTable<PreventionEyeHealthType, API.PageParams>
          rowKey="schoolStudentId"
          search={false}
          bordered={false}
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
            const { data = {} } = await getPreventionEyeHealthList({
              ...searchForm,
              current: params.current,
              size: params.pageSize,
            });
            return {
              data: data?.records,
              success: true,
              total: data?.total,
            };
          }}
          columns={columns}
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
      <Modal
        visible={proposalInfo?.visible}
        footer={null}
        onCancel={() => setProposalInfo({ visible: false })}
        centered={true}
      >
        <Space direction="vertical" size={12}>
          <p>身高： {proposalInfo?.currentRow?.height} cm</p>
          <p>课桌： {proposalInfo?.currentRow?.desk}</p>
          <p>课椅： {proposalInfo?.currentRow?.chair} </p>
          {proposalInfo?.currentRow?.haveBlackboardDistance ? (
            <p>
              <Badge status="success" />
              座位与黑板相距5-6米{' '}
            </p>
          ) : null}
        </Space>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
