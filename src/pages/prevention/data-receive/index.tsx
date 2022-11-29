import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { listColumns } from './columns';
import type { VisionColumnsType } from './columns';
import { EMPTY } from '@/utils/constant';
import { OperationModal } from './modal/operation-modal';
import { getDataSubmitList } from '@/api/prevention/data-receive';

const TableList: React.FC = () => {
  const tableRef = useRef<ActionType>();

  const columns: ProColumns<VisionColumnsType>[] = [...listColumns];
  const [operationVisible, setOperationVisible] = useState(false); // 导入

  let requestTimer;
  useEffect(() => {
    // 定时 30s 请求数据报送的列表
    requestTimer = setTimeout(() => {
      tableRef?.current?.reload?.();
    }, Number('30000'));
    return () => {
      clearTimeout(requestTimer);
    };
  }, []);

  /**
   * @desc 导入弹窗
   */
  const showModal = () => {
    setOperationVisible(true);
  };

  const onCancel = (refresh?: boolean) => {
    setOperationVisible(false);
    if (refresh) {
      tableRef?.current?.reload?.();
    }
  };

  return (
    <PageContainer>
      <ProTable<VisionColumnsType, API.PageParams>
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={tableRef}
        columnEmptyText={EMPTY}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            创建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await getDataSubmitList({
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
          x: 'max-content',
        }}
      />

      <OperationModal
        visible={operationVisible}
        typeKey={'import'}
        onCancel={(refresh) => onCancel(refresh)}
      />
    </PageContainer>
  );
};

export default TableList;
