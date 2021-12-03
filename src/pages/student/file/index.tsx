import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { history, useRequest } from 'umi';
import { Tabs, Card, message } from 'antd';
import { editStudentInfo } from '@/api/student';
import PageForm from '@/components/PageForm';
import LazyCascader from '@/pages/components/lazy-cascader';
import { studentFormOptions } from '../utils/constant';
import ProForm from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getStudentDetail, getStudentScreen } from '@/api/student';
import { getCascaderOption } from '@/hook/district';
import { getschoolGrade } from '@/api/school';
import { getBirthday } from '@/hook/table';
import { AddModal } from './add-modal';
import { EMPTY } from '@/utils/constant';

const { TabPane } = Tabs;
export type FileCardPropsParams = {
  visible: boolean;
  resultId: number | string;
  templateId: number | string;
};

const FileList: React.FC = () => {
  const formRef = useRef<ProFormInstance>();

  /**
   * @desc 获取身份证自动回显出生日期
   */
  const validatorCb = (value: string) => {
    formRef?.current?.setFieldsValue({ birthday: getBirthday(value) });
  };

  const [areaOption, setAreaOption] = useState<any[]>();
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位
  const [cardInfo, setCardInfo] = useState<FileCardPropsParams>({
    visible: false,
    resultId: '',
    templateId: '', // 模板id
  });
  const [studentForm, setStudentForm] = useState<API.PropsType>(studentFormOptions(validatorCb, 2));
  const actionRef = useRef<ActionType>();
  const { query: { id, studentId } = {} } = history.location; // id studentId

  const columns: ProColumns<API.FileListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => {
        return [
          <a
            key="print"
            onClick={() =>
              setCardInfo({
                resultId: record.resultId,
                templateId: record.templateId,
                visible: true,
              })
            }
          >
            打印档案卡
          </a>,
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
      const { gradeId, classId, provinceCode, cityCode, areaCode, townCode } = result || {};
      const addressArr = [provinceCode, cityCode, areaCode, townCode].filter((item) => item); // 地区
      const gradeArr = [gradeId, classId].filter((item) => item); // 年级
      Object.assign(info, {
        gradeIds: gradeArr, // 回显年级班级
        region: addressArr, // 回显地区
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
  }) => {
    const { gradeIds = [], region = [] } = value;
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
              <PageForm {...studentForm} />
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
                  data: datas?.data.items || [],
                  success: true,
                  total: datas?.data.total || 0,
                };
              }}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </Card>
      <AddModal
        {...cardInfo}
        title="档案卡"
        onCancel={() => {
          setCardInfo({ ...cardInfo, visible: false });
        }}
      />
    </PageContainer>
  );
};

export default FileList;
