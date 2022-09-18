import React, { useMemo, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Button, Modal, message, Row, Col, Space } from 'antd';
import {
  screeningColumns,
  teenagersSituationColumns,
  childSituationColumns,
  monitorColumns,
  abnormalColumns,
  diseasesColumns1,
  diseasesColumns2,
} from './columns';
import ProTable from '@ant-design/pro-table';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { AddModal } from './add-modal';
import { NoticeReport } from './notice-report/index';
import { ExportModal } from '@/pages/components/export-modal';
import { useState } from 'react';
import { useModel } from 'umi';
import {
  getScreeningResult,
  exportScreeningStudent,
  exportScreeningReport,
  exportScreeningData,
} from '@/api/screen/plan';
import styles from './index.less';
import { EMPTY, DATE, SCREENSTATUS, GLASSESSUGGESTTYPE, EMPTY_TEXT, SCREENING_TYPE_LIST } from '@/utils/constant';
import { getScreeningDetail } from '@/api/screen/plan';
import moment from 'moment';
import { modalConfig } from '@/hook/ant-config';
import type { IdsType } from './notice-report/index';
import { SCREENTYPEOPTIONS } from '@/utils/form-constant';

const { TabPane } = Tabs;

type DetailType = {
  visible?: boolean; // 弹窗visible
  tabKey?: string; // key
  title?: string; // 标题
};

type VisitResultType = {
  visible: boolean;
  glassesSuggest?: string;
  visitResult?: string;
};

// let searchForm = {}; // 搜索表单项

const ScreeningResult: React.FC = () => {
  const [exportVisible, setExportVisible] = useState(false); // 导出visible
  const [detailInfo, setDetailInfo] = useState<DetailType>({
    visible: false,
    tabKey: '',
    title: '',
  }); // 弹窗props
  const [resultInfo, setResultInfo] = useState<API.ScreenResultListItem[]>([]); // 结果分析
  // const [gradeOption, setGradeOption] = useState<any[]>([]);
  const [schoolDetail, setSchoolDetail] = useState<API.ObjectType>({}); // 筛查详情
  const [visitResultInfo, setVisitResultInfo] = useState<VisitResultType>({
    visible: false,
    glassesSuggest: '',
    visitResult: '',
  }); // 医院复查反馈弹窗
  const [reportVisible, setReportVisible] = useState(false); // 通知书弹窗
  const [ids, setIds] = useState<IdsType>();
  const [exportType, setExportType] = useState(0); // 导出弹窗类型 0 筛查报告 1 筛查数据 2 学生跟踪数据
  const [ActiveKey, setActiveKey] = useState('8'); // tab 激活页

  const { query: { screeningPlanId } = {} } = history.location;
  const { initialState } = useModel('@@initialState');

  const childTableOptions = [
    { title: '视力筛查情况', columns: [screeningColumns], key: 'screen' },
    {
      title: '视力情况统计',
      subTitle: '*仅对有效实际筛查学生数进行统计分析',
      columns: [childSituationColumns],
      key: 'situation',
    },
    { title: '视力监测预警', columns: [monitorColumns], key: 'monitor' },
    { title: '视力异常跟踪', columns: [abnormalColumns], key: 'abnormal' },
  ];

  const teenagersTableOptions = [
    { title: '视力筛查情况', columns: [screeningColumns], key: 'screen' },
    {
      title: '视力情况统计',
      subTitle: '*仅对有效实际筛查学生数进行统计分析',
      columns: [teenagersSituationColumns],
      key: 'situation',
    },
    { title: '视力监测预警', columns: [monitorColumns], key: 'monitor' },
    { title: '视力异常跟踪', columns: [abnormalColumns], key: 'abnormal' },
    { title: '常见病监测', columns: [diseasesColumns1, diseasesColumns2], key: 'diseases' },
  ];

  const exportOptions = {
    0: { title: '筛查报告', content: '在所选择筛查计划下的筛查报告' },
    1: { title: '筛查数据', content: '在所选择筛查计划下的全部筛查原始数据' },
    2: { title: '学生预警跟踪数据', content: '在所选择筛查计划下的筛查学生的预警跟踪反馈情况表' },
  };

  const [tabList, setTabList] = useState<API.ObjectType[]>([
    { label: '幼儿园', key: '8' },
    { label: '小学及以上', key: '0' },
  ]);


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

  useMemo(async () => {
    if (screeningPlanId) {
      // getScreeningGradeList(screeningPlanId as string).then((res) => {
      //   setGradeOption(res?.data);
      // });
      getScreeningDetail(screeningPlanId as string).then((res) => {
        setSchoolDetail(res?.data);
      });

      const { data } = await getScreeningDetail(screeningPlanId as string);
      setSchoolDetail(data);
      const arr = tabList.filter(item => data?.optionTabs?.includes(~~[item.key]));
      // setTabList(arr);
      getScreeningResult({screeningPlanId, type: ~~ActiveKey }).then((res) => {
        setResultInfo([res?.data]);
      });
    }
  }, []);

  const onTabChange = (key: string) => {
    setActiveKey(key);
  };

  /**
   * @desc 确定导出
   */
  const onConfirm = async () => {
    const { srcScreeningNoticeId: screeningNoticeId, id: planId, screeningOrgId } = schoolDetail;
    const parm = exportType
      ? exportType === 1
        ? { planId }
        : { planId, screeningOrgId }
      : { screeningNoticeId, planId };
    const func = exportType
      ? exportType === 1
        ? exportScreeningData
        : exportScreeningStudent
      : exportScreeningReport;
    await func(parm);
    setExportVisible(false);
    message.success('导出成功');
  };

  // 结果统计分析导出
  const onExport = (val: number) => {
    setExportType(val);
    setExportVisible(true);
  };
  const showNoticeReport = () => {
    const user = initialState?.currentUser;
    const { id: planId, screeningOrgId } = schoolDetail;
    setIds({
      schoolName: user?.orgName as string,
      schoolId: user?.orgId as number,
      planId,
      orgId: screeningOrgId,
    });
    setReportVisible(true);
  };
  return (
    <PageContainer>
      <Card style={{ marginBottom: 12 }}>
        <Row gutter={40}>
          <Col className={styles.result_info}>
            <Space size={[40, 10]} wrap={true}>
              <span>筛查标题： {schoolDetail?.title}</span>
              <span>
                筛查时间段：
                {schoolDetail?.startTime
                  ? moment(schoolDetail?.startTime).format(DATE)
                  : EMPTY} 至{' '}
                {schoolDetail?.endTime ? moment(schoolDetail?.endTime).format(DATE) : EMPTY}
              </span>
              <span>筛查机构：{schoolDetail?.screeningOrgName}</span>
              <span>筛查类型：{ `${(SCREENTYPEOPTIONS[schoolDetail?.screeningBizType] || EMPTY)}-${(SCREENING_TYPE_LIST[schoolDetail?.screeningType] || EMPTY)}`}</span>
              <span>状态：{SCREENSTATUS[schoolDetail?.releaseStatus]}</span>
            </Space>
          </Col>
          <Col className={styles.judge_standard}>
            <InfoCircleOutlined style={{ color: '#096DD9', fontSize: 16 }} />
            判断标准
          </Col>
        </Row>
      </Card>
      <Card>
        <Tabs defaultActiveKey={ActiveKey} onTabClick={onTabChange}>
          {tabList.map((item) => (
            <TabPane tab={item.label} key={item.key}>
              <div className={styles.btn}>
                <Space>
                  <Button type="primary" ghost href={'/#/prevention/eye-health'}>
                    预警跟踪
                  </Button>
                  <Button type="primary" onClick={() => onExport(0)} ghost>
                    筛查报告
                  </Button>
                  <Button type="primary" onClick={() => onExport(1)} ghost>
                    筛查数据
                  </Button>
                  <Button type="primary" onClick={() => onExport(0)} ghost>
                    档案卡
                  </Button>
                  <Button type="primary" onClick={() => showNoticeReport()} ghost>
                    结果通知书
                  </Button>
                </Space>
              </div>
              <div className={styles.modular}>
                {(ActiveKey === '8' ? childTableOptions : teenagersTableOptions).map(
                  (activeItem) => (
                    <Fragment key={activeItem.key}>
                      <p className={styles.title}>
                        {activeItem.title}
                        <span
                          onClick={() =>
                            showModal({ tabKey: activeItem.key, title: activeItem.title })
                          }
                        >
                          <QuestionCircleOutlined style={{ marginLeft: 5 }} />
                        </span>
                        <span className={styles.subTitle}>{activeItem.subTitle}</span>
                      </p>
                      {activeItem.columns.map((eleItem, eleIndex) => (
                        <ProTable<API.ScreenResultListItem>
                          columns={eleItem}
                          rowKey="id"
                          key={eleIndex}
                          className={styles.table}
                          search={false}
                          options={false}
                          pagination={false}
                          dataSource={resultInfo}
                        />
                      ))}
                    </Fragment>
                  ),
                )}
              </div>
            </TabPane>
          ))}
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
      <NoticeReport
        ids={ids!}
        visible={reportVisible}
        onCancel={() => {
          setReportVisible(false);
        }}
      />
      <ExportModal
        visible={exportVisible}
        title={exportOptions[exportType].title}
        onCancel={() => {
          setExportVisible(false);
        }}
        onOk={onConfirm}
      >
        <p className={styles.content}>导出内容：{exportOptions[exportType].content}</p>
      </ExportModal>
      <Modal
        title="医生复查反馈"
        {...visitResultInfo}
        onCancel={() => setVisitResultInfo({ ...visitResultInfo, visible: false })}
        footer={null}
        {...modalConfig}
      >
        <Row>
          <Col span={4}>建议配镜：</Col>
          <Col span={20}>{GLASSESSUGGESTTYPE[visitResultInfo?.glassesSuggest!] ?? EMPTY_TEXT}</Col>
        </Row>
        <Row>
          <Col span={4}>医生诊断：</Col>
          <Col span={20}>{visitResultInfo?.visitResult}</Col>
        </Row>
      </Modal>
    </PageContainer>
  );
};

export default ScreeningResult;
