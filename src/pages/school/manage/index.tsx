import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row, Form, Cascader, Button } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import styles from './index.less';

const SchoolManage: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  console.log(initialState, '123');

  return (
    <PageContainer className={styles.container}>
      <Row gutter={24}>
        <Col span={12} className={styles.flex_col}>
          <Card title="账号信息" bordered={false}>
            <p className={styles.title}>
              账号：<span style={{ color: '#141414' }}>{initialState?.currentUser?.username}</span>
            </p>
            <p className={styles.tip}>如忘记密码，请联系管理员进行重置！</p>
          </Card>
          <Card title="基本信息" bordered={false} className={styles.info}>
            <ProForm
              layout="horizontal"
              labelCol={{ style: { width: 90 } }}
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
                console.log(values, 'form');
              }}
            >
              <ProFormText
                label="学校名称"
                required
                name="name"
                rules={[{ required: true, message: '请输入学校名称' }]}
              />
              <p className={styles.total}>
                学生总数： <span>123123</span>
              </p>
              <Form.Item
                label="详细地址"
                name="address"
                required
                rules={[{ required: true, message: '请选择详细地址' }]}
              >
                <Cascader options={[]} placeholder="请选择" />
              </Form.Item>
              <ProFormTextArea name="remark" style={{ marginLeft: 90 }} />
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
          ></Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default SchoolManage;
