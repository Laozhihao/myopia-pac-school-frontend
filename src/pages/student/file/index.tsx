import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import moment from 'moment';
import { ScreeningRecordColumns } from './columns';
import { history, useRequest } from 'umi';
import { Tabs, Card, message, Pagination, Spin, Space, Row, Tag, Table, Col, Button } from 'antd';
import { editStudentInfo } from '@/api/student';
import DynamicForm from '@/components/DynamicForm';
import LazyCascader from '@/pages/components/lazy-cascader';
import { studentFormOptions } from '../utils/constant';
import ProForm from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getStudentDetail, getStudentScreen } from '@/api/student';
import { getCascaderOption } from '@/hook/district';
import { getschoolGrade } from '@/api/school';
import { DetailModal } from '@/pages/screening/play/student/modal/detail';
import { DATE } from '@/utils/constant';
import { formatLength } from '@/utils/common';
import type { ScreeningStudentRecordType } from './columns';

const { TabPane } = Tabs;
export type FileCardPropsParams = {
  resultId: number | string;
  templateId: number | string;
};

const FileList: React.FC = () => {
  const formRef = useRef<
    ProFormInstance<{
      gradeIds?: never[];
      region?: never[];
      selectValue: string | number;
      inputValue?: string | number;
      address?: string;
    }>
  >();

  const [areaOption, setAreaOption] = useState<any[]>();
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位
  const [allTotal, setAllTotal] = useState(1); // 总页数
  const [pageInfo, setPageInfo] = useState<{ current?: number; pageSize?: number }>({
    current: 1,
    pageSize: 10,
  }); // 页数和条数
  const [activeKey, setActiveKey] = useState(
    history?.location?.query?.tabKey ? history?.location?.query?.tabKey.toString() : '1',
  );
  const [loading, setLoading] = useState(false);
  const [screeningRecord, setScreeningRecord] = useState([]);

  const [detailInfo, setDetailInfo] = useState<API.ModalDataType>({
    visible: false,
    title: '查看详情',
    currentRow: {},
  });

  const [studentForm, setStudentForm] = useState<API.PropsType>(
    studentFormOptions(undefined, 2, formRef),
  );
  const { query: { id } = {} } = history.location; // id

  /**
   * @desc 查看详情
   */
  const onDetail = (record: ScreeningStudentRecordType) => {
    setDetailInfo((s) => ({
      ...s,
      visible: true,
      currentRow: {
        screeningPlanStudentId: record?.planStudentId,
        screeningPlanId: record?.planId,
      },
    }));
  };

  /**
   * @desc 分页查询
   */
  const onCurrentScreeningRecord = async (current: number, size: number) => {
    setLoading(true);
    const parm = {
      current,
      size,
    };
    const { data } = await getStudentScreen(id as string, parm).finally(() => {
      setLoading(false);
    });
    setScreeningRecord(data?.records);
    setAllTotal(data?.total);
  };

  /**
   * @desc 新开报告
   * @param
   */
  const openReport = (cb: (path: string) => string) => {
    // 获取当前域名
    const { protocol, host } = location;
    const hostPath = `${protocol}//${host}/report`;
    const href = cb(hostPath);
    window.open(decodeURIComponent(href), '_blank');
  };

  // 报告端
  const showReport = (parm: string) => {
    return openReport((path: string) => `${path}?${parm}`);
  };

  /**
   * @desc 档案卡/监测表
   */
  const onMonitor = (record: any) => {
    const {
      resultId,
      templateId,
      planId,
      classId,
      planStudentId: planStudentIds,
      screeningType,
    } = record;
    let parmUrl = '';
    const parmsObj = {
      templateId,
      planId,
      classId,
      planStudentIds,
      type: 5,
      reportType: 'monitor',
    };
    // 区别档案卡还是监测表
    if (screeningType) {
      Object.keys(parmsObj).forEach((ele) => {
        parmUrl += parmsObj[ele] ? `${ele}=${parmsObj[ele]}&` : '';
      });
    } else {
      parmUrl = `resultId=${resultId}&templateId=${templateId}`;
    }
    showReport(parmUrl);
  };

  /**
   * @desc 初始化数据
   */
  const { run } = useRequest(getStudentDetail, {
    manual: true,
    onSuccess: (result: any) => {
      const info = {};
      setAddressFlag(!result?.provinceCode); // 编辑地址
      const { gradeId, classId, provinceCode, cityCode, areaCode, townCode, idCard, passport } =
        result || {};
      const addressArr = [provinceCode, cityCode, areaCode, townCode].filter((item) => item); // 地区
      const gradeArr = [gradeId, classId].filter((item) => item); // 年级
      Object.assign(info, {
        gradeIds: gradeArr, // 回显年级班级
        region: addressArr, // 回显地区
        selectValue: passport ? 'passport' : 'idCard', // 回填证件号
        inputValue: idCard ?? passport, // 回填证件号
      });
      formRef?.current?.setFieldsValue({ ...result, ...info });
    },
  });

  useMemo(async () => {
    setAreaOption(await getCascaderOption());
    const { data = [] } = await getschoolGrade();
    setStudentForm((value) => {
      return {
        ...value,
        listTypeInfo: {
          ...value.listTypeInfo,
          gradeOptions: data,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (activeKey === '1') {
      id && run(id as string);
    } else onCurrentScreeningRecord(1, 10);
  }, [activeKey]);

  /**
   * @desc 更改基本资料
   */
  const onFinish = async (value: {
    gradeIds?: never[] | undefined;
    region?: never[] | undefined;
    selectValue: string | number;
    inputValue?: string | number;
  }) => {
    const { gradeIds = [], region = [], selectValue, inputValue } = value;
    const [gradeId, classId] = gradeIds;
    const [provinceCode, cityCode, areaCode, townCode] = region;
    const parm = {
      ...value,
      id,
      gradeId,
      classId,
      provinceCode,
      cityCode,
      areaCode,
      townCode,
      [selectValue]: inputValue,
    };
    await editStudentInfo(parm);
    message.success('更新成功');
    run(id as string);
  };

  /**
   * @desc 更改选择地区
   */
  const changeRegion = (value: string | any[]) => {
    setAddressFlag(!value.length);
    !value.length && formRef?.current?.setFieldsValue({ address: '' });
  };

  /**
   * @desc 分页器修改
   */
  const onPageChange = (page: number, size: number) => {
    const { pageSize } = pageInfo;
    setPageInfo({
      current: pageSize === size ? page : 1,
      pageSize: size,
    });
    onCurrentScreeningRecord(pageSize === size ? page : 1, size);
  };

  return (
    <PageContainer>
      <Card>
        <Tabs activeKey={activeKey} onTabClick={(key) => setActiveKey(key)}>
          <TabPane tab="基本资料" key="1" forceRender={true}>
            <ProForm
              formRef={formRef}
              style={{ width: '50%' }}
              submitter={{
                searchConfig: {
                  submitText: '更新基本资料',
                },
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
              }}
              onFinish={onFinish}
            >
              <DynamicForm {...studentForm} isNeedBtn={false} />
              <LazyCascader
                label="居住地址"
                name="region"
                options={areaOption}
                fieldNames={{ label: 'name', value: 'code', children: 'child' }}
                originProps={{
                  onChange: changeRegion,
                }}
              />
              <ProFormTextArea
                name="address"
                disabled={addressFlag}
                fieldProps={{ maxLength: 50 }}
                placeholder="请输入详细地址"
              />
            </ProForm>
          </TabPane>
          <TabPane tab="筛查记录" key="2">
            <Spin spinning={loading}>
              {screeningRecord?.length ? (
                <>
                  {screeningRecord?.map((item: ScreeningStudentRecordType) => (
                    <React.Fragment key={item?.resultId}>
                      <div>
                        <p className={styles.title}>
                          筛查日期：{moment(item?.screeningDate).format(DATE)}
                        </p>
                        <Row justify="space-between">
                          <Col>
                            <Space size={12}>
                              <Tag color="error" className={styles.vision_tag}>
                                {item?.screeningType ? '常见病筛查' : '视力筛查'}
                              </Tag>
                              <Tag color="warning">{item.isDoubleScreen ? '复测' : '初筛'}</Tag>
                              <span>筛查编号：{item?.screeningCode}</span>
                              <span>筛查标题：{formatLength(item?.screeningTitle)}</span>
                              <span>筛查机构：{formatLength(item?.screeningOrgName)}</span>
                            </Space>
                          </Col>
                          <Col>
                            <Space>
                              <Button
                                key="print"
                                className={styles.btn}
                                onClick={() => onMonitor(item)}
                              >
                                档案卡
                              </Button>
                              {!item?.hasScreening ? (
                                <Button
                                  key="detail"
                                  className={styles.btn}
                                  onClick={() => onDetail(item)}
                                >
                                  查看详情
                                </Button>
                              ) : null}
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <Table
                        columns={ScreeningRecordColumns(item)}
                        dataSource={item?.details?.vision}
                        pagination={false}
                        className={styles.table}
                        rowKey="lateriality"
                        scroll={{
                          x: '100vw',
                        }}
                      ></Table>
                    </React.Fragment>
                  ))}
                  <Pagination
                    current={pageInfo?.current}
                    pageSize={pageInfo?.pageSize}
                    total={allTotal}
                    style={{ textAlign: 'right' }}
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
                    onChange={onPageChange}
                  />
                </>
              ) : (
                <span>暂无数据</span>
              )}
            </Spin>
          </TabPane>
        </Tabs>
      </Card>
      <DetailModal
        {...detailInfo}
        onCancel={() => setDetailInfo((s) => ({ ...s, visible: false, currentRow: {} }))}
      />
    </PageContainer>
  );
};

export default FileList;
