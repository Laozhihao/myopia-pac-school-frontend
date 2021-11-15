import type { FormInstance } from 'antd';
import { Modal, Button, Cascader, Form, Row, Col, Image } from 'antd';
import styles from './add-modal.less';
import qrcodeImg from '@/assets/images/qrcode.jpg';
import React, { Fragment, useMemo, useState } from 'react';
import { StepsForm, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import RightTips from './right-tips';
import { getschoolGrade } from '@/api/school';
import type { SubmitterProps } from '@ant-design/pro-form/lib/components/Submitter';

// 分布表单类型
type ElePropsType = {
  step: number;
  onPre: () => void; // 返回上一级
  form?: FormInstance<any> | undefined;
  submit: () => void;
  reset: () => void;
} & SubmitterProps;

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const [gradeOptions, setGradeOptions] = useState([]); // 年级级联
  // const [current, setCurrent] = useState(0);

  const [initForm, setInitForm] = useState<API.ObjectType>({
    title: '学生视力筛查告家长书',
    subTitle: '疾控部门',
    call: '亲爱的家长朋友：',
    greetings: '您好！',
    content: '',
    qrCodeFileId: -1, // 默认值
  });

  const FormPreTemp = [
    {
      label: '告知书模板',
      title: '标题',
      value: 'title',
      // defaultVal: '学生视力筛查告家长书',
      placeholder: '大标题名称',
      limit: 20,
      step: 1,
      rules: [{ required: true, message: '请输入大标题名称' }],
    },
    {
      value: 'subTitle',
      title: '副标题',
      // defaultVal: '疾控部门',
      placeholder: '副标题名称',
      limit: 30,
      step: 2,
      rules: [{ required: true, message: '请输入副标题名称' }],
    },
  ];

  const FormNextTemp = [
    {
      title: '称呼',
      value: 'call',
      limit: 15,
      step: 3,
      rules: [{ required: true, message: '请输入称呼' }],
    },
    {
      title: '开头',
      placeholder: '问候语',
      value: 'greetings',
      limit: 10,
      step: 4,
      rules: [{ required: true, message: '请输入问候语' }],
    },
  ];

  const FormNoticeTemp = [{ title: '正文', value: 'content', limit: 15, step: 5 }];

  const prompt = [
    '查看孩子的眼健康档案',
    '了解孩子的视力变化趋势',
    '学习相关的眼健康知识与科普',
    '有问题可在线咨询医生进行解答',
  ];

  useMemo(async () => {
    const gradeArr = await getschoolGrade({ schoolId: 2 });
    setGradeOptions(gradeArr?.data || []);
    setInitForm({});
  }, []);

  /**
   * @desc 打印二维码
   */
  const onPrint = (eleProps: ElePropsType) => {
    eleProps?.form?.validateFields().then((value) => {
      if (value) {
        // eleProps.step = 1;
        // console.log('验证', eleProps)
      }
    });
  };

  return (
    <Modal
      title={props.title}
      width={800}
      bodyStyle={{ maxHeight: 650, overflow: 'auto' }}
      visible={props.visible}
      footer={null}
      onCancel={() => props.onCancel()}
      className={styles.modal}
    >
      <StepsForm
        // current={current}
        stepsProps={{
          type: 'navigation',
        }}
        submitter={{
          render: (eleProps) => {
            if (eleProps.step === 0) {
              return [
                <Button
                  type="primary"
                  key="notice"
                  onClick={() => {
                    eleProps.onSubmit?.((value: any) => console.log(value, '123'));
                  }}
                >
                  打印告知书
                </Button>,
                <Button type="primary" key="code" onClick={() => onPrint(eleProps)}>
                  打印二维码
                </Button>,
              ];
            }

            return [
              <Button key="pre" onClick={() => eleProps.onPre?.()}>
                上一步
              </Button>,
              <Button
                type="primary"
                key="print"
                onClick={() => {
                  console.log(eleProps?.form?.getFieldsValue(), '123');
                }}
              >
                保存打印
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          // onFinish={async (value) => {
          //   console.log(value, 'zd')
          //   // return true;
          // }}
          name="firstForm"
          title={'选择'}
          stepProps={{
            description: '按学校-年级进行打印，选择告知书或二维码打印',
          }}
        >
          <Form.Item
            label="选择年级/班级"
            rules={[{ required: true, message: '请选择年级班级' }]}
            name="gradeIds"
          >
            <Cascader
              options={gradeOptions}
              placeholder="请选择"
              fieldNames={{ label: 'name', value: 'id', children: 'child' }}
            />
          </Form.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="secordForm"
          title={'预览-保存'}
          stepProps={{
            description: '预览打印样板，点击保存打印',
          }}
        >
          <>
            {FormPreTemp.map((item) => (
              <Fragment key={item.value}>
                {item.label}
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText
                      placeholder={`请输入${item.placeholder}`}
                      name={item.value}
                      rules={item.rules}
                      initialValue={initForm[item.value]}
                    />
                  </Col>
                  <Col span={8}>
                    <RightTips {...item} />
                  </Col>
                </Row>
              </Fragment>
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
              <Fragment key={item.value}>
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText
                      name={item.value}
                      initialValue={initForm[item.value]}
                      placeholder={`请输入${item.placeholder ?? item.title}`}
                      fieldProps={{ maxLength: item.limit }}
                      rules={item.rules}
                    />
                  </Col>
                  <Col span={8}>
                    <RightTips {...item} />
                  </Col>
                </Row>
              </Fragment>
            ))}

            <Row>
              <Col span={16}>
                <ProFormTextArea
                  name="text"
                  fieldProps={{ maxLength: FormNoticeTemp[0].limit }}
                  placeholder="请输入告知书内容"
                  rules={[{ required: true, message: '请输入告知书内容' }]}
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
                  fieldProps={{ listType: 'picture-card', isImageUrl: () => false }}
                />
              </Col>
            </Row>
          </>
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
