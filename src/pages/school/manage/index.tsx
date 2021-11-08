import React, { useMemo, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Form, Cascader, Button, Tree } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { history, useModel, useRequest } from 'umi';
import { getSchoolDetail, editSchoolDetail, getschoolGrade } from '@/api/school';
import { getCascaderOption } from '@/pages/hook/district';
import styles from './index.less';

const SchoolManage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  const ref = useRef<ProFormInstance>();
  const [schoolInfo, setSchoolInfo] = useState<API.ObjectType>(); // 学校详情
  const [areaOption, setAreaOption] = useState<any[]>([]); // 地区级联
  const [gradeOption, setGradeOption] = useState<any[]>([]); // 年级级联
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位

  const { run } = useRequest(getSchoolDetail, {
    manual: true,
    onSuccess: (result: React.SetStateAction<API.ObjectType | undefined>) => {
      setSchoolInfo(result);
      ref?.current?.setFieldsValue(result || {});
    },
  });

  const getschoolList = (params: API.ObjectType) => {
    getschoolGrade(params).then((res) => {
      setGradeOption(res?.data);
    });
  };

  /**
   * @desc 更新基本资料
   */
  const onEdit = (values: API.ObjectType) => {
    const { region = [] } = values;
    const parm = {
      ...schoolInfo,
      provinceCode: region[0] ?? '',
      cityCode: region[1] ?? '',
      areaCode: region[2] ?? '',
      townCode: region[3] ?? '',
      ...values,
    };
    editSchoolDetail(parm).then((res) => {
      console.log(res);
    });
  };

  useMemo(async () => {
    if (currentUser?.orgId) {
      run(currentUser!.orgId);
      getschoolList({ schoolId: currentUser!.orgId });
    }
    setAreaOption(await getCascaderOption());
  }, []);

  return (
    <PageContainer className={styles.container}>
      <Row gutter={24}>
        <Col span={12} className={styles.flex_col}>
          <Card title="账号信息" bordered={false}>
            <p className={styles.title}>
              账号：<span style={{ color: '#141414' }}>{currentUser?.username}</span>
            </p>
            <p className={styles.tip}>如忘记密码，请联系管理员进行重置！</p>
          </Card>
          <Card title="基本信息" bordered={false} className={styles.info}>
            <ProForm
              layout="horizontal"
              labelCol={{ style: { width: 90 } }}
              formRef={ref}
              submitter={{
                searchConfig: {
                  submitText: '更新基本资料',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  style: {
                    marginLeft: 90,
                  },
                },
              }}
              onFinish={async (values) => {
                onEdit(values);
              }}
            >
              <ProFormText
                label="学校名称"
                fieldProps={{ maxLength: 15 }}
                required
                name="name"
                rules={[{ required: true, message: '请输入学校名称' }]}
              />
              <p className={styles.total}>
                学生总数： <span>{schoolInfo?.studentCount}</span>
              </p>
              <Form.Item label="学校地址" name="region">
                <Cascader
                  options={areaOption}
                  placeholder="请选择"
                  fieldNames={{ label: 'name', value: 'code', children: 'child' }}
                  onChange={(value: any) => setAddressFlag(!value.length)}
                />
              </Form.Item>
              <ProFormTextArea
                name="address"
                disabled={addressFlag}
                fieldProps={{ maxLength: 50 }}
                placeholder="请输入详细地址"
              />
            </ProForm>
          </Card>
        </Col>
        <Col span={12} className={styles.flex_col}>
          <Card
            style={{ flex: 1 }}
            title="班级年级"
            bordered={false}
            extra={
              <Button type="primary" size="small" onClick={() => history.push('/school/grade')}>
                年级班级管理
              </Button>
            }
          >
            <Tree
              selectable={false}
              treeData={gradeOption}
              fieldNames={{ title: 'name', key: 'uniqueId', children: 'child' }}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SchoolManage;
