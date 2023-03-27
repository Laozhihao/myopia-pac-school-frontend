import styles from './index.less';
import { history, useModel } from 'umi';
import React, { useState, useRef } from 'react';
import { Modal, Button, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import DynamicForm from '@/components/DynamicForm';
import SwitchableButton from '@/components/SwitchableButton';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import { AddModal } from './add-modal';
import { listColumns } from './columns';
import { PlanModal } from './modal/plan';
import { TimeModal } from './modal/time';
import { AssociateModal } from './modal/associate';
import { FormItemOptions } from './form-item';
import { EMPTY } from '@/utils/constant';
import { escape2Html, deleteRedundantData } from '@/utils/common';
import { modalConfig } from '@/hook/ant-config';
import { TableListCtx } from '@/hook/ant-config';
import { deleteTableRow, secondaryConfirmation } from '@/hook/table';
import { getScreeningList, deleteScreeningPlan, releaseScreeningPlan } from '@/api/screen/plan';

const TableList: React.FC = () => {
  // 获取当前学校信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  const [currentRow, setCurrentRow] = useState<API.ObjectType>();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false); // 筛查内容visible
  const [planModalData, setPlanModalData] = useState<API.ModalDataType>({
    title: '',
    visible: false,
    currentRow: undefined,
  }); // 创建筛查计划信息

  const [screeningTimeModal, setScreeningTimeModal] = useState<API.ModalDataType>({
    title: '增加筛查时间',
    visible: false,
    currentRow: undefined,
  }); // 筛查时间信息

  const [associateModal, setAssociateModal] = useState<API.ModalDataType>({
    title: '将筛查计划关联至筛查任务',
    visible: false,
    currentRow: undefined,
  }); // 筛查任务关联筛查计划

  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const [textHtml, setTextHtml] = useState('');
  const tableRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();

  const onShow = (dom: any) => {
    setTextHtml(escape2Html(dom));
    setTextModalVisible(true);
  };

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

  /**
   * @desc 创建/编辑筛查计划
   */
  const onHandle = (row?: API.ObjectType) => {
    setPlanModalData({
      visible: true,
      currentRow: row,
      title: row ? '编辑筛查计划' : '创建筛查计划',
    });
  };

  /**
   * @desc 删除
   */
  const onDelete = (screeningPlanId: React.Key) => {
    deleteTableRow('该筛查计划', async () => {
      await deleteScreeningPlan(screeningPlanId);
      message.success('删除成功');
      onReset();
    });
  };

  /**
   * @desc 发布
   */
  const onRelease = (screeningPlanId: React.Key) => {
    secondaryConfirmation('一经发布无法撤回或删除，你确定发布这一筛查计划吗？', async () => {
      await releaseScreeningPlan(screeningPlanId);
      message.success('发布成功');
      onReset();
    });
  };

  /**
   * @desc 新增筛查时间
   */
  const onAddSreenTime = (row: API.ObjectType) => {
    setScreeningTimeModal((s: API.ModalDataType) => ({ ...s, visible: true, currentRow: row }));
  };

  /**
   * @desc 路由跳转
   */
  const onJumpRouter = (path: string) => {
    history.push(path);
  };

  /**
   * @desc 关闭筛查计划弹窗
   */
  const onCancel = (refresh?: boolean, cb?: () => void) => {
    cb?.();
    refresh && onSearch();
  };

  /**
   * @desc 筛查任务关联至筛查计划
   */
  const onAssociateFn = (row: API.ObjectType) => {
    setAssociateModal((s: API.ModalDataType) => ({ ...s, visible: true, currentRow: row }));
  };

  const columns: ProColumns[] = [
    ...listColumns(onShow),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 150,
      render: (_, record) => {
        return [
          <DynamicButtonGroup key="operator">
            {record.status
              ? [
                  <SwitchableButton
                    key="student"
                    icon="icon-Team"
                    onClick={() =>
                      onJumpRouter(
                        `/screening/plan/student?screeningPlanId=${record?.planId}&screeningBizType=${record?.screeningBizType}`,
                      )
                    }
                  >
                    筛查学生列表
                  </SwitchableButton>,

                  record?.screeningBizType ? (
                    <SwitchableButton
                      key="add_time"
                      icon="icon-a-Group1000006856"
                      onClick={() => onAddSreenTime(record)}
                    >
                      新增筛查时间
                    </SwitchableButton>
                  ) : null,
                  <SwitchableButton
                    key="print"
                    onClick={() => {
                      handleModalVisible(true);
                      setCurrentRow(record);
                    }}
                    icon="icon-PrinterCode"
                  >
                    打印二维码/告知书
                  </SwitchableButton>,
                  <SwitchableButton
                    key="manage"
                    icon="icon-FundView1"
                    disabled={!record?.hasScreeningResults}
                    tooltip={!record?.hasScreeningResults ? '当前没有筛查结果' : ''}
                    onClick={() =>
                      onJumpRouter(`/screening/plan/result/?screeningPlanId=${record?.planId}`)
                    }
                  >
                    筛查结果
                  </SwitchableButton>,
                  // 只有自主筛查 and 视力筛查 and 非区域筛查计划类型的筛查计划才显示该按钮
                  record?.screeningBizType &&
                  !record?.screeningType &&
                  !record?.srcScreeningNoticeId ? (
                    <SwitchableButton
                      key="associate"
                      icon="icon-FundView1"
                      onClick={() => onAssociateFn(record)}
                    >
                      关联至
                    </SwitchableButton>
                  ) : null,
                  // <SwitchableButton key="student" icon="icon-a-Group120" >
                  //   数据上交
                  // </SwitchableButton>,
                  // <SwitchableButton key="student" icon="icon-a-Group120">
                  //   学校问卷
                  // </SwitchableButton>,
                ]
              : record.screeningBizType
              ? [
                  <Button type="link" key="edit" onClick={() => onHandle(record)}>
                    编辑
                  </Button>,
                  <Button type="link" key="delete" onClick={() => onDelete(record?.planId!)}>
                    删除
                  </Button>,
                  <Button type="link" key="release" onClick={() => onRelease(record?.planId!)}>
                    发布
                  </Button>,
                ]
              : []}
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
        <ProTable<API.PageParams>
          rowKey="planId"
          search={false}
          pagination={{ pageSize: 10 }}
          options={false}
          actionRef={tableRef}
          columnEmptyText={EMPTY}
          toolBarRender={() =>
            currentUser?.isIndependentScreening
              ? [
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => onHandle()}>
                    创建
                  </Button>,
                ]
              : []
          }
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
            x: 'max-content',
          }}
        />
      </TableListCtx.Provider>
      <AddModal
        title="打印告知书/二维码"
        visible={createModalVisible}
        currentRow={currentRow}
        onCancel={(flag?: boolean) => {
          handleModalVisible(false);
          flag && tableRef?.current?.reload();
        }}
      />
      <Modal
        title="筛查内容"
        visible={textModalVisible}
        width={800}
        onCancel={() => setTextModalVisible(false)}
        footer={null}
        {...modalConfig}
      >
        <div dangerouslySetInnerHTML={{ __html: textHtml }} className={styles.content} />
      </Modal>
      <PlanModal
        {...planModalData}
        onCancel={(refresh?: boolean) =>
          onCancel(refresh, () =>
            setPlanModalData((s: API.ModalDataType) => ({ ...s, visible: false })),
          )
        }
      />
      <TimeModal
        {...screeningTimeModal}
        onCancel={(refresh?: boolean) =>
          onCancel(refresh, () =>
            setScreeningTimeModal((s: API.ModalDataType) => ({ ...s, visible: false })),
          )
        }
      />
      {associateModal.visible ? (
        <AssociateModal
          {...associateModal}
          onCancel={(refresh?: boolean) =>
            onCancel(refresh, () =>
              setAssociateModal((s: API.ModalDataType) => ({ ...s, visible: false })),
            )
          }
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
