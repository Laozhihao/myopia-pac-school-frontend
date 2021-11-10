import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Button } from 'antd';
import { firstColumns, secondColumns, thirdColumns, fourthColumns, warnColumns } from './columns';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { UploadOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { AddModal } from './add-modal';
import { ExportModal } from '@/pages/components/export-modal';
import { useState } from 'react';
import { getScreeningResult } from '@/api/screen';
import styles from './index.less';

const { TabPane } = Tabs;

const ScreeningResult: React.FC = () => {
  const [detailVisible, setDetailVisible] = useState(false); // 课座椅visible
  const [exportVisible, setExportVisible] = useState(false); // 导出visible
  const [resultInfo, setResultInfo] = useState<Object[]>([]); // 结果分析

  const tableOptions = [
    { title: '视力筛查情况', columns: firstColumns },
    {
      title: '视力情况统计',
      subTitle: '*仅对有效实际筛查学生数进行统计分析',
      columns: secondColumns,
    },
    { title: '视力监测预警', columns: thirdColumns },
    { title: '视力异常跟踪', columns: fourthColumns },
  ];

  const studentWarnColumns: ProColumns<API.ScreenResultListItem>[] = [
    ...warnColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (...params) => {
        const [, record] = params;
        return [<a key="student">学生档案{record}</a>];
      },
    },
  ];

  useEffect(() => {
    const { query: { id } = {} } = history.location;
    id &&
      getScreeningResult(id as string).then((res) => {
        setResultInfo([res?.data]);
      });
  }, []);

  return (
    <PageContainer>
      <Card>
        <p>
          筛查标题： 2020年上半年度全省视力筛查通知
          <span className={styles.notice_tab}>筛查时间段：2020-01-01 至 2020-06-01 </span>
          <span>状态：未开始</span>
        </p>
        <Tabs defaultActiveKey="1">
          <TabPane tab="结果统计分析" key="1">
            {tableOptions.map((item, index) => (
              <ProTable
                className={styles.table}
                columns={item.columns}
                key={index}
                search={false}
                options={false}
                defaultData={resultInfo}
                headerTitle={item.title}
              />
            ))}
          </TabPane>
          <TabPane tab="学生预警跟踪" key="2">
            <ProTable<API.ScreenResultListItem, API.PageParams>
              rowKey="key"
              form={{ span: 8 }}
              search={{ collapseRender: false, collapsed: false }}
              pagination={{ pageSize: 10 }}
              options={false}
              // request={rule}
              columns={studentWarnColumns}
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
              toolbar={{
                title: (
                  <span className={styles.title} onClick={() => setDetailVisible(true)}>
                    课桌椅型号标准
                  </span>
                ),
                actions: [
                  <Button
                    type="primary"
                    key="primary"
                    onClick={() => {
                      setExportVisible(true);
                    }}
                  >
                    <UploadOutlined /> 导出
                  </Button>,
                ],
              }}
            />
          </TabPane>
        </Tabs>
      </Card>
      <AddModal
        visible={detailVisible}
        title={'课桌椅标准'}
        onCancel={() => {
          setDetailVisible(false);
        }}
      />
      <ExportModal
        visible={exportVisible}
        title={'学生预警跟踪数据'}
        onCancel={() => {
          setExportVisible(false);
        }}
      >
        <p className={styles.content}>
          导出内容：在所选择筛查计划下的筛查学生的预警跟踪反馈情况表。
        </p>
      </ExportModal>
    </PageContainer>
  );
};

export default ScreeningResult;
