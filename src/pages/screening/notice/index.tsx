import React, { useState, useRef } from 'react';
import { Modal } from 'antd';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import styles from './index.less';
import { listColumns } from './columns';
import type { ScreenNoticeListType } from './columns';
import { escape2Html } from '@/utils/common';
import { EMPTY } from '@/utils/constant';
import { modalConfig } from '@/hook/ant-config';
import { getScreeningNoticeList } from '@/api/screen/notice';
import { history } from 'umi';
import { PlanModal } from '../plan/modal/plan';

const TableList: React.FC = () => {
  const [textModalVisible, setTextModalVisible] = useState(false); // 筛查内容visible

  const [planModalData, setPlanModalData] = useState<
    API.ModalDataType & { param?: API.ObjectType }
  >({
    visible: false,
    title: '创建筛查计划',
    param: {}, // 参数信息
  }); // 创建筛查计划信息

  const [textHtml, setTextHtml] = useState('');
  const tableRef = useRef<ActionType>();

  /**
   * @desc 筛查内容
   */
  const onShow = (dom: any) => {
    setTextHtml(escape2Html(dom));
    setTextModalVisible(true);
  };

  /**
   * @desc 查看筛查计划
   */
  const onRouterPlan = (record: Object) => {
    history.push(`/screening/plan?id=${record['screeningTaskId']}`);
  };

  /**
   * @desc 创建筛查计划
   */
  const onCreatePlan = (record?: ScreenNoticeListType) => {
    setPlanModalData((s) => ({
      ...s,
      visible: true,
      param: {
        screeningNoticeId: record?.srcScreeningNoticeId,
        screeningTaskId: record?.screeningTaskId,
      },
    }));
  };

  const onPlanCancel = (fresh?: boolean) => {
    setPlanModalData((s: API.ModalDataType) => ({ ...s, visible: false }));
    fresh && tableRef?.current?.reload?.();
  };

  const columns: ProColumns<ScreenNoticeListType>[] = [
    ...listColumns(onShow),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => {
        return [
          <DynamicButtonGroup key="operator">
            {record?.status === 3 ? (
              <SwitchableButton
                key="detail"
                icon="icon-a-Group1000006857"
                onClick={() => onRouterPlan(record)}
              >
                查看筛查计划
              </SwitchableButton>
            ) : null}
            {record?.canCreatePlan ? (
              <SwitchableButton
                key="create"
                icon="icon-a-Group1000006858"
                onClick={() => onCreatePlan(record)}
              >
                创建筛查计划
              </SwitchableButton>
            ) : null}
          </DynamicButtonGroup>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<ScreenNoticeListType, API.PageParams>
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={tableRef}
        columnEmptyText={EMPTY}
        request={async (params) => {
          const datas = await getScreeningNoticeList({
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
        // onCancel={() => setPlanModalData((s: API.ModalDataType) => ({ ...s, visible: false }))}
        onCancel={onPlanCancel}
      />
    </PageContainer>
  );
};

export default TableList;
