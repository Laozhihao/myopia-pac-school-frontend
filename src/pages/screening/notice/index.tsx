import React, { useState, useRef } from 'react';
import { Modal } from 'antd';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import SwitchableButton from '@/components/SwitchableButton';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import styles from './index.less';
import { listColumns } from './columns';
import { escape2Html } from '@/utils/common';
import { EMPTY } from '@/utils/constant';
import { modalConfig } from '@/hook/ant-config';
import { getScreeningList } from '@/api/screen/plan';
import { history } from 'umi';

const TableList: React.FC = () => {
  const [textModalVisible, setTextModalVisible] = useState(false); // 筛查内容visible

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
  const onRouterPlan = () => {
    history.push('/screening/play');
  };

  const columns: ProColumns[] = [
    ...listColumns(onShow),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => {
        return [
          <DynamicButtonGroup key="operator">
            <SwitchableButton key="detail" icon="icon-Team" onClick={onRouterPlan}>
              查看筛查计划
            </SwitchableButton>
            <SwitchableButton key="create" icon="icon-Team">
              创建筛查计划
            </SwitchableButton>
          </DynamicButtonGroup>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PageParams>
        rowKey="planId"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={tableRef}
        columnEmptyText={EMPTY}
        request={async (params) => {
          const datas = await getScreeningList({
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
          title: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
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
    </PageContainer>
  );
};

export default TableList;
