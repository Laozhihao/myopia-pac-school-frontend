import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { rule } from '@/services/ant-design-pro/api';
import { Tabs, Card, Button } from 'antd';
import PageForm from '@/components/PageForm';
import { studentFormOptions } from '../utils/constant';
import ProForm from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

const { TabPane } = Tabs;
const FileList: React.FC = () => {
  const formRef = useRef<ProFormInstance>();

  // const [currentRow, setCurrentRow] = useState();

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.FileListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fieldProps: {
        fixed: 'right',
      },
      render: (_, record) => {
        return [
          <a key="print" onClick={() => console.log(record)}>
            打印档案卡
          </a>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本资料" key="1">
            <ProForm formRef={formRef} submitter={false} style={{ width: '50%' }}>
              <PageForm {...studentFormOptions} />
              <Button type="primary">更新基本资料</Button>
            </ProForm>
          </TabPane>
          <TabPane tab="筛查记录" key="2">
            <ProTable<API.FileListItem, API.PageParams>
              actionRef={actionRef}
              rowKey="key"
              search={false}
              pagination={{ pageSize: 10 }}
              options={false}
              request={rule}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default FileList;
