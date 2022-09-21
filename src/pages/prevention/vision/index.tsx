import React, { useRef, useState } from 'react';
import { Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { EMPTY } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { editVisionStaffStatus, getVisionStaffList, resetVisionStaffPassword } from '@/api/prevention/vision';
import { resetPwdHook } from '@/hook/table';
import { AddModal } from './modal/add-modal';

const TableList: React.FC = () => {
  const tableRef = useRef<ActionType>();

  // tableRef?.current?.reloadAndRest?.(); 刷新

  const [addModalInfo, setAddModalInfo] = useState<API.ModalDataType>({
    title: '',
    visible: false,
    currentRow: undefined,
  }); // 创建筛查计划信息


   /**
   * @desc 启用/停用
   */
  const onStatusChange = async (record) => {
    const status = record.status === 0 ? 1 : 0;
    await editVisionStaffStatus(record?.id, status);
    message.success(`${record?.status ? '启用' : '停用'}成功`);
    tableRef?.current?.reload?.();
  }

  /**
   * @desc 启用/停用
   */
  const onReset = (record: any) => {
    resetPwdHook({id: record?.id}, resetVisionStaffPassword);
  }

  /**
   * @desc 启用/停用
   */
  const onHandle = (row?: any) => {
    setAddModalInfo({ visible: true, title: row ? '编辑视力小队' : '创建视力小队', currentRow: row });
  }

  const columns: ProColumns[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => {
        return [
          <Button key="student" type="link" onClick={() => onHandle(record)}>
            编辑
          </Button>,
          <Button key="recovery" type="link" onClick={() => onStatusChange(record)}>
            { record?.status ? '启用' : '停用' }
          </Button>,
          <Button key="reset" type="link" onClick={() => onReset(record)}>
            重置密码
          </Button>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PageParams>
        rowKey="idCard"
        search={false}
        pagination={{ pageSize: 10 }}
        options={false}
        actionRef={tableRef}
        columnEmptyText={EMPTY}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />} onClick={() => onHandle()}>
            创建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await getVisionStaffList({
            current: params.current,
            size: params.pageSize,
          });
          console.log
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
          staffName: {
            fixed: 'left',
          },
          option: {
            fixed: 'right',
          },
        }}
      />
      <AddModal {...addModalInfo} onCancel={() => setAddModalInfo({visible: false})} />
    </PageContainer>
  );
};

export default TableList;
