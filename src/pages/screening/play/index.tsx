import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { AddModal } from './add-modal';
import { Link } from 'umi';
import { Modal } from 'antd';
import { escape2Html } from '@/utils/common';
import { getScreeningList } from '@/api/screen';

const TableList: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<API.ScreenListItem>();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [textModalVisible, setTextModalVisible] = useState(false); // 筛查内容visible
  const [textHtml, setTextHtml] = useState('');
  const ref = useRef<ActionType>();

  const onShow = (dom: any) => {
    setTextHtml(escape2Html(dom));
    setTextModalVisible(true);
  };

  const columns: ProColumns<API.ScreenListItem>[] = [
    ...listColumns(onShow),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return [
          <a
            key="print"
            onClick={() => {
              handleModalVisible(true);
              setCurrentRow(record);
            }}
          >
            打印二维码/告知书
          </a>,
          <Link
            to={`/screening/result/?id=${record?.schoolStatisticId}&screeningPlanId=${record?.planId}`}
            key="result"
          >
            筛查结果
          </Link>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ScreenListItem, API.PageParams>
        tableStyle={{ paddingTop: 30 }}
        rowKey="planId"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={ref}
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
          name: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
        }}
      />
      <AddModal
        title="打印告知书/二维码"
        visible={createModalVisible}
        currentRow={currentRow}
        onCancel={(flag) => {
          handleModalVisible(false);
          flag && ref?.current?.reload();
        }}
      />
      <Modal
        title="筛查内容"
        visible={textModalVisible}
        onOk={() => {}}
        onCancel={() => setTextModalVisible(false)}
        footer={null}
      >
        <div dangerouslySetInnerHTML={{ __html: textHtml }} />
      </Modal>
    </PageContainer>
  );
};

export default TableList;
