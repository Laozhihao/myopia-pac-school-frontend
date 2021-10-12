import { Modal, Button, Cascader, Form, Row, Col, Image } from 'antd';
import styles from './add-modal.less';
import qrcodeImg from '@/assets/images/qrcode.jpg';
import React, { useState } from 'react';
import { StepsForm, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import RightTips from './right-tips';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const [options, setOptions] = useState([]);
  console.log(setOptions);

  const FormPreTemp = [
    {
      label: '告知书模板',
      title: '标题',
      value: 'title',
      defaultVal: '学生视力筛查告家长书',
      placeholder: '大标题名称',
      limit: 20,
      step: 1,
    },
    {
      value: 'subTitle',
      title: '副标题',
      defaultVal: '疾控部门',
      placeholder: '副标题名称',
      limit: 30,
      step: 2,
    },
  ];

  const FormNextTemp = [
    { title: '称呼', value: 'title', defaultVal: '亲爱的家长朋友：', limit: 15, step: 3 },
    { title: '开头', value: 'subTitle', defaultVal: '您好！', limit: 10, step: 4 },
  ];

  const FormNoticeTemp = [{ title: '正文', value: 'title', limit: 15, step: 5 }];

  const prompt = [
    '查看孩子的眼健康档案',
    '了解孩子的视力变化趋势',
    '学习相关的眼健康知识与科普',
    '有问题可在线咨询医生进行解答',
  ];

  const onChange = () => {
    // console.log(value, '123');
  };

  return (
    <Modal
      title={props.title}
      width={800}
      visible={props.visible}
      footer={null}
      onCancel={props.onCancel}
      className={styles.modal}
    >
      <StepsForm
        stepsProps={{
          type: 'navigation',
        }}
        submitter={{
          render: (eleProps) => {
            if (eleProps.step === 0) {
              return [
                <Button type="primary" key="notice" onClick={() => eleProps.onSubmit?.()}>
                  打印告知书
                </Button>,
                <Button type="primary" key="code" onClick={() => eleProps.onSubmit?.()}>
                  打印二维码
                </Button>,
              ];
            }

            return [
              <Button key="pre" onClick={() => eleProps.onPre?.()}>
                上一步
              </Button>,
              <Button type="primary" key="print" onClick={() => eleProps.onSubmit?.()}>
                保存打印
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          name="1"
          title={'选择'}
          stepProps={{
            description: '按学校-年级进行打印，选择告知书或二维码打印',
          }}
        >
          <Form.Item label="选择年级/班级" rules={[{ required: true, message: '请选择年级班级' }]}>
            <Cascader options={options} onChange={onChange} placeholder="请选择" />
          </Form.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="2"
          title={'预览-保存'}
          stepProps={{
            description: '预览打印样板，点击保存打印',
          }}
        >
          <>
            {FormPreTemp.map((item) => (
              <React.Fragment key={item.value}>
                {item.label}
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText placeholder={`请输入${item.placeholder}`} />
                  </Col>
                  <Col span={8}>
                    <RightTips {...item} />
                  </Col>
                </Row>
              </React.Fragment>
            ))}
            <Row className={styles.info}>
              <Col span={8}>
                <p>学生信息：</p>
                <div style={{ color: '#595959' }}>
                  <p>赵XX</p>
                  <p> 男</p>
                  <p>XX学校</p>
                  <p>年级班级：XX年级XX班</p>
                </div>
              </Col>
              <Col span={8} style={{ display: 'flex' }}>
                <span style={{ marginTop: '5px' }}>筛查二维码：</span>
                <Image width={128} height={128} src={qrcodeImg} />
              </Col>
            </Row>
            {FormNextTemp.map((item) => (
              <React.Fragment key={item.value}>
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText
                      fieldProps={{ maxLength: item.limit }}
                      placeholder={`请输入${item.title}`}
                    />
                  </Col>
                  <Col span={8}>
                    <RightTips {...item} />
                  </Col>
                </Row>
              </React.Fragment>
            ))}

            <Row>
              <Col span={16}>
                <ProFormTextArea
                  name="text"
                  fieldProps={{ maxLength: FormNoticeTemp[0].limit }}
                  placeholder="请输入告知书内容"
                />
              </Col>
              <Col span={8}>
                <RightTips {...FormNoticeTemp[0]} />
              </Col>
            </Row>
            <Row className={styles.foot} align={'middle'}>
              <Col span={10}>
                <p>关注公众号，及时查看孩子视力筛查结果报告！</p>
                <ul className={styles.ul}>
                  {prompt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Col>
              <Col className={styles.upload_col} span={6}>
                <ProFormUploadButton
                  name="upload"
                  max={1}
                  title={'上传图片'}
                  fieldProps={{ listType: 'picture-card' }}
                />
              </Col>
            </Row>
          </>
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
