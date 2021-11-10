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
import { getCascaderOption } from '@/pages/hook/district';

const { TabPane } = Tabs;
const FileList: React.FC = () => {
  const formRef = useRef<ProFormInstance>();

  const [areaOption, setAreaOption] = useState<any[]>();
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位
  const [basicInfo, setBasicInfo] = useState<API.ObjectType>({});

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

  const { run } = useRequest(getStudentDetail, {
    manual: true,
    onSuccess: (result) => {
      const info = {};
      setAddressFlag(!result?.provinceCode); // 编辑地址
      setBasicInfo(result);
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
  }, []);

  useEffect(() => {
    const { query: { id } = {} } = history.location;
    id && run(id as string);
    // todo: 年级班级接口替换
  }, []);

  const onFinish = async (value: {
    gradeIds?: never[] | undefined;
    region?: never[] | undefined;
  }) => {
    const { gradeIds = [], region = [] } = value;
    const parm = {
      ...value,
      id: basicInfo.id ?? '',
      studentId: basicInfo.studentId ?? '',
      gradeId: gradeIds[0] ?? '',
      classId: gradeIds[1] ?? '',
      provinceCode: region[0] ?? '',
      cityCode: region[1] ?? '',
      areaCode: region[2] ?? '',
      townCode: region[3] ?? '',
    };
    await editStudentInfo(parm);
    message.success('更新成功');
    run(basicInfo.id);
  };

  return (
    <PageContainer>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="基本资料" key="1">
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
              <PageForm {...studentFormOptions} />
              <LazyCascader
                label="居住地址"
                name="region"
                options={areaOption}
                fieldNames={{ label: 'name', value: 'code', children: 'child' }}
                originProps={{
                  placeholder: '请选择',
                  onChange: (value: any) => setAddressFlag(!value.length),
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
              scroll={{
                x: '100vw',
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
                const datas = await getStudentScreen(basicInfo.studentId);
                return {
                  data: datas.data.items,
                  success: true,
                  total: datas.data.total,
                };
              }}
              columns={columns}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default FileList;
