import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { history, useRequest } from 'umi';
import { Tabs, Card, message, Tooltip, Button } from 'antd';
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
import { DetailModal } from './detail-modal';
import { EMPTY } from '@/utils/constant';

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
  // 查看详情弹窗
  const [detail, setDetail] = useState<API.ModalDataType>({
    visible: false,
    title: '查看详情',
    currentRow: {},
  });

  const [studentForm, setStudentForm] = useState<API.PropsType>(
    studentFormOptions(undefined, 2, formRef),
  );
  const actionRef = useRef<ActionType>();
  const { query: { id, studentId } = {} } = history.location; // id studentId

  /**
   * @desc 查看详情
   */
  const onDetail = (record: API.FileListItem) => {
    setDetail((value) => ({ ...value, visible: true, currentRow: record }));
  };

  /**
   * @desc 新开报告
   * @param
   */
  const openReport = (cb: Function) => {
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

  const columns: ProColumns<API.FileListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => {
        return [
          <a key="print" onClick={() => onMonitor(record)}>
            打印档案卡
          </a>,
          record?.hasScreening ? (
            <Button type="link" onClick={() => onDetail(record)} key="detail">
              查看详情
            </Button>
          ) : (
            <Tooltip title="当前没有筛查数据">
              <Button type="text" disabled key="unDetail">
                查看详情
              </Button>
            </Tooltip>
          ),
        ];
      },
    },
  ];

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
    id && run(id as string);
  }, []);

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
      studentId,
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

  return (
    <PageContainer>
      <Card>
        <Tabs
          defaultActiveKey={
            history?.location?.query?.tabKey ? history?.location?.query?.tabKey.toString() : '1'
          }
        >
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
              <DynamicForm {...studentForm} />
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
            <ProTable<API.FileListItem, API.PageParams>
              actionRef={actionRef}
              rowKey="resultId"
              search={false}
              pagination={{ pageSize: 10 }}
              options={false}
              columnEmptyText={EMPTY}
              scroll={{
                x: 'max-content',
              }}
              columnsStateMap={{
                screeningDate: {
                  fixed: 'left',
                },
                option: {
                  fixed: 'right',
                },
              }}
              request={async () => {
                const datas = studentId ? await getStudentScreen(studentId as string) : undefined;
                return {
                  data:
                    datas?.data.records.filter((item: object) => !item.screeningType && item) || [],
                  success: true,
                  total: datas?.data.total || 0,
                };
              }}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </Card>
      <DetailModal
        {...detail}
        onCancel={() => {
          setDetail((value) => ({ ...value, visible: false }));
        }}
      />
    </PageContainer>
  );
};

export default FileList;
