import React, { useMemo, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Button, Tree, message } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { history, useModel, useRequest } from 'umi';
import { getSchoolDetail, editSchoolDetail, getschoolGrade } from '@/api/school';
import { getCascaderOption } from '@/hook/district';
import styles from './index.less';
import LazyCascader from '@/pages/components/lazy-cascader';

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
    onSuccess: (result: any) => {
      setAddressFlag(!result?.provinceCode); // 是否可编辑地址
      setSchoolInfo(result);
      const { provinceCode, cityCode, areaCode, townCode } = result || {}; // 地区回填
      const region = [provinceCode, cityCode, areaCode, townCode].filter((item) => item); // 过滤空值
      ref?.current?.setFieldsValue({ ...result, region });
    },
  });

  useMemo(async () => {
    if (currentUser?.orgId) {
      run(currentUser!.orgId);
      const { data = [] } = await getschoolGrade();
      setGradeOption(data);
    }
    setAreaOption(await getCascaderOption());
  }, []);

  /**
   * @desc 更新基本资料
   */
  const onEdit = async (values: API.ObjectType) => {
    const { region = [] } = values;
    const [provinceCode, cityCode, areaCode, townCode] = region;
    const parm = {
      ...schoolInfo,
      provinceCode,
      cityCode,
      areaCode,
      townCode,
      ...values,
    };
    await editSchoolDetail(parm);
    message.success('更新成功');
  };

  /**
   * @desc 更改选择地区
   */
  const changeRegion = (value: string | any[]) => {
    setAddressFlag(!value.length); // 未选择地址 详细地址不可编辑
    !value.length && ref?.current?.setFieldsValue({ address: '' });
  };

  /**
   * @desc 年级班级管理
   */
  const onManagement = () => {
    history.push('/school/grade');
  };

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
              onFinish={onEdit}
            >
              <ProFormText
                label="学校名称"
                fieldProps={{ maxLength: 15 }}
                required
                name="name"
                rules={[{ required: true, message: '请输入学校名称' }]}
              />
              <p className={styles.total}>
                在读学生： <span>{schoolInfo?.studentCount}</span>
              </p>
              <p className={styles.total}>
                <label className={styles.label}>全部：</label>{' '}
                <span>{schoolInfo?.studentCount}</span>
              </p>
              <LazyCascader
                label="学校地址"
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
          </Card>
        </Col>
        <Col span={12} className={styles.flex_col}>
          <Card
            style={{ flex: 1 }}
            title="班级年级"
            bordered={false}
            extra={
              <Button type="primary" size="small" onClick={onManagement}>
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
