import React, { useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { firstColumns, secondColumns, thirdColumns, fourthColumns, warnColumns } from './columns';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { history, Link } from 'umi';
import { AddModal } from './add-modal';
import { ExportModal } from '@/pages/components/export-modal';
import { useState } from 'react';
import { getScreeningResult } from '@/api/screen';
import styles from './index.less';
import { EMPTY } from '@/utils/constant';
import { getScreeningWarn, getScreeningGradeList } from '@/api/screen';

const { TabPane } = Tabs;

type DetailType = {
  visible?: boolean; // 弹窗visible
  tabKey?: string; // key
  title?: string; // 标题
};

const ScreeningResult: React.FC = () => {
  const [exportVisible, setExportVisible] = useState(false); // 导出visible
  const [detailInfo, setDetailInfo] = useState<DetailType>({
    visible: false,
    tabKey: '',
    title: '',
  }); // 弹窗props
  const [planId, setPlanId] = useState<string>(); // 计划id
  const [resultInfo, setResultInfo] = useState<API.ScreenResultListItem[]>([]); // 结果分析
  const [gradeOption, setGradeOption] = useState<any[]>([]);
  const ref = useRef<ProFormInstance>();

  let searchForm = {}; // 搜索表单项

  const tableOptions = [
    { title: '视力筛查情况', columns: firstColumns, key: 'screen' },
    {
      title: '视力情况统计',
      subTitle: '*仅对有效实际筛查学生数进行统计分析',
      columns: secondColumns,
      key: 'situation',
    },
    { title: '视力监测预警', columns: thirdColumns, key: 'monitor' },
    { title: '视力异常跟踪', columns: fourthColumns, key: 'abnormal' },
  ];

  const studentWarnColumns: ProColumns<API.ScreenWarnListItem>[] = [
    ...warnColumns(gradeOption),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        return [
          <Link key="manage" to={`/student/file?id=${record.studentId}`}>
            档案管理
          </Link>,
        ];
      },
    },
  ];

  /**
   * @desc 字段说明弹窗
   */
  const showModal = (obj: DetailType) => {
    setDetailInfo((value) => {
      return {
        ...value,
        ...obj,
        visible: true,
      };
    });
  };

  useEffect(() => {
    const { query: { id, screeningPlanId } = {} } = history.location;
    setPlanId(screeningPlanId as string);
    id &&
      getScreeningResult(id as string).then((res) => {
        setResultInfo([res?.data]);
      });
    screeningPlanId &&
      getScreeningGradeList(screeningPlanId as string).then((res) => {
        setGradeOption(res?.data);
      });
  }, []);

  /**
   * @desc 重置
   */
  const onReset = () => {
    searchForm = {};
    ref?.current?.resetFields();
    ref?.current?.submit();
  };

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    Object.assign(searchForm, {
      gradeId: formVal?.gradeName?.[0],
      classId: formVal?.gradeName?.[1],
      visionLabel: formVal?.warningLevel,
      isReview: formVal?.isReview ? !!Number(formVal?.isReview) : undefined,
      isBindMq: formVal?.isBindMq ? !!Number(formVal?.isBindMq) : undefined,
    });
    ref?.current?.submit();
  };

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
            {tableOptions.map((item) => (
              <>
                <p className={styles.table_title}>
                  {item.title}{' '}
                  <span onClick={() => showModal({ tabKey: item.key, title: item.title })}>
                    <QuestionCircleOutlined />
                  </span>
                </p>
                <ProTable<API.ScreenResultListItem>
                  className={styles.table}
                  columns={item.columns}
                  key={item.key}
                  rowKey="id"
                  search={false}
                  options={false}
                  pagination={false}
                  dataSource={resultInfo}
                />
              </>
            ))}
          </TabPane>
          <TabPane tab="学生预警跟踪" key="2">
            <ProTable<API.ScreenWarnListItem, API.PageParams>
              rowKey="studentId"
              formRef={ref}
              form={{ span: 8 }}
              search={{
                collapseRender: false,
                collapsed: false,
                optionRender: () => [
                  <Button key="reset" onClick={onReset}>
                    重 置
                  </Button>,
                  <Button key="search" type="primary" onClick={onSearch}>
                    搜 索
                  </Button>,
                ],
              }}
              pagination={{ pageSize: 10 }}
              options={false}
              columns={studentWarnColumns}
              columnEmptyText={EMPTY}
              request={async (params) => {
                const datas = await getScreeningWarn({
                  ...searchForm,
                  planId,
                  current: params.current,
                  size: params.pageSize,
                });
                return {
                  data: datas.data.records,
                  success: true,
                  total: datas.data.total,
                };
              }}
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
              toolbar={{
                title: (
                  <span
                    className={styles.title}
                    onClick={() => showModal({ tabKey: 'standard', title: '课桌椅标准' })}
                  >
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
        {...detailInfo}
        onCancel={() => {
          setDetailInfo((value) => {
            return {
              ...value,
              visible: false,
            };
          });
        }}
      />
      <ExportModal
        visible={exportVisible}
        title="学生预警跟踪数据"
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
