import type { FormInstance } from 'antd';
import { Modal, Select, Radio, Button, Cascader, Form, Row, Col, Image, Upload } from 'antd';
import styles from './add-modal.less';
import qrcodeImg from '@/assets/images/qrcode.jpg';
import { ModalForm } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import React, { Fragment, useEffect, useMemo, useState, useRef } from 'react';
import { Step } from '../result/notice-report/components/step';
import { FooterTips } from '../result/notice-report/components/footer-tips';
import { StepsForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import RightTips from './right-tips';
import { getScreeningGradeList } from '@/api/screen';
import { uploadFile } from '@/api/common';
import UploadDefaultImg from '@/assets/images/code.png';
import { modalConfig, getPopupContainer } from '@/hook/ant-config';
import {
  getScreeningNoticeUrl,
  getScreeningQrcodeUrl,
  updateScreeningNoticeConfig,
} from '@/api/screen';
import type { SubmitterProps } from '@ant-design/pro-form/lib/components/Submitter';
import { useRequest } from 'umi';

// 分布表单类型
type ElePropsType = {
  step: number;
  onPre: () => void; // 返回上一级
  form?: FormInstance<any> | undefined;
  submit: () => void;
  reset: () => void;
} & SubmitterProps;

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const [step, setStep] = useState<number>(0);
  const [studentList, setStudentList] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [printType, setPrintType] = useState<number>(1);

  const [gradeOptions, setGradeOptions] = useState([]); // 年级级联
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectArr, setSelectArr] = useState<any[]>([]); // 选中的年级班级
  const [loading, setLoading] = useState(false); // 预览下载loading
  const [refresh, setRefresh] = useState(false); // 刷新列表
  const [isAssignment, setIsAssignment] = useState(false); // 赋值标志位
  const [imgUrl, setImgUrl] = useState<string>();

  const ref = useRef<ProFormInstance>();

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
      placeholder: '大标题名称',
      limit: 20,
      step: 1,
      rules: [{ required: true, message: '请输入大标题名称' }],
    },
    {
      value: 'subTitle',
      title: '副标题',
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

  const FormNoticeTemp = [{ title: '正文', value: 'content', limit: 500, step: 5 }];
  const FormUploadTemp = {
    title: '医院公众号二维码',
    text: '可进行更改大小不能超过5M宽度不能小于100px格式：png、jpg、jpeg',
    step: 6,
  };

  const prompt = [
    '查看孩子的眼健康档案',
    '了解孩子的视力变化趋势',
    '学习相关的眼健康知识与科普',
    '有问题可在线咨询医生进行解答',
  ];

  const bottonList = [
    { label: '打印告知书', key: 'notice', isStep: true },
    { label: '打印筛查二维码', key: 'qrCode', isStep: false, type: 1 },
  ];

  useMemo(async () => {
    if (props?.visible) {
      const { planId: screeningPlanId } = props?.currentRow || {};
      const { data = [] } = await getScreeningGradeList(screeningPlanId);
      setGradeOptions(data);
    }
  }, [props?.visible, props?.currentRow]);

  useEffect(() => {
    if (props?.currentRow && ref?.current && !isAssignment && props?.visible) {
      ref?.current?.setFieldsValue({ ...initForm, ...props?.currentRow?.notificationConfig });
      setInitForm({ ...initForm, ...props?.currentRow?.notificationConfig });
      setIsAssignment(true); // 已赋值
    }
  }, [props?.visible, props?.currentRow, current]);

  useEffect(() => {
    setImgUrl(props?.currentRow?.qrCodeFileUrl);
  }, [props?.visible, props?.currentRow]);

  /**
   * @desc 预览pdf
   */
  const openPdf = (url: any) => {
    url && window.open(`/pdf/viewer.html?file=${url}`);
  };

  // 用fetches管理并发请求的多个loading 就无须声明多个loading变量 (二维码请求)
  const { run, fetches } = useRequest(getScreeningQrcodeUrl, {
    manual: true,
    fetchKey: (params) => params.type,
    onSuccess: (result) => {
      openPdf(result.url);
    },
  });

  /**
   * @desc 预览告知书/二维码  1-二维码 2-VS666 3-虚拟学生二维码
   */
  const onHandle = async (type?: number, obj?: API.ObjectType) => {
    const [gradeId, classId] = selectArr;
    const parm = {
      gradeId,
      classId,
      schoolId: props?.currentRow?.schoolId,
      screeningPlanId: props?.currentRow?.planId,
      type,
    };
    // 告知书
    if (!type) {
      setLoading(true);
      await updateScreeningNoticeConfig({ ...obj, qrCodeFileId: initForm.qrCodeFileId });
      setRefresh(true); // 编辑过 返回列表需要刷新
      const res = await getScreeningNoticeUrl(parm);
      setLoading(false);
      openPdf(res?.data?.url);
    } else run(parm);
  };

  /**
   * @desc 打印告知书/二维码
   */
  const onPrint = (eleProps: ElePropsType, next?: boolean, type?: number) => {
    eleProps?.form
      ?.validateFields()
      .then((value) => {
        if (value) {
          // 下一步
          if (next) setCurrent(1);
          else onHandle(type, current ? { ...eleProps?.form?.getFieldsValue() } : undefined); // 打印
        }
      })
      .catch(() => {});
  };

  /**
   * @desc 上传图片的props
   */
  const uploaderProps = {
    beforeUpload: (file: { type: string; name: any }) => {
      setFileList([file]);
      return false;
    },
    onChange: async () => {
      const formData = new FormData();
      fileList.forEach((item: string | Blob) => {
        formData.append('file', item);
      });
      const { data } = await uploadFile(formData);
      setInitForm({ ...initForm, qrCodeFileId: data.fileId });
      setImgUrl(data.url);
    },
  };

  const onCancel = () => {
    props.onCancel(refresh);
    setCurrent(0);
    setRefresh(false);
    setIsAssignment(false);
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  // 打印类型
  const printTypeArr = [{ type: 0,
    text: '告知书' },
  { type: 1,
    text: '筛查二维码' },
  { type: 2,
    text: 'vs666专属筛查二维码' },
  { type: 3,
    text: '虚拟二维码' }];

  const schoolName = '学校名称';

  const onPrintTypeChange = (e) => {
    setPrintType(e.target.value);
  };

  // 搜索过滤
  const filterOption = (inputValue: string, option) =>
    option.props.children.indexOf(inputValue) >= 0;

  /**
   *@desc 上一步操作逻辑
    */
    const prevClickHandle = () => {
    // 是否处于告知书第二步
    if (current) {
      setCurrent(0);
    } else {
      onCancel();
    }
  };

  return (
    <Modal
      title={props.title}
      width={750}
      visible={props.visible}
      destroyOnClose
      onCancel={onCancel}
      className={styles.modal}
      footer={[
        <div className={styles.footer} key="footer-btn">
          <Button
            key="back"
            className={styles.cancel_btn}
            onClick={prevClickHandle}
          >
            { current === 1 ? '上一步' : '取消' }
          </Button>
          <Button
            loading={loading}
            key="export"
            type="primary"
          >
            { printType === 0 || current ? '生成' : '下一步' }
          </Button>
        </div>,
      ]}
      {...modalConfig}
    >
      <Step step={step} key="step" />
      <Form {...layout} requiredMark={false}>
        {step === 0 ? (
          <>
            <Form.Item label="打印类型">
              <Radio.Group defaultValue={printType} onChange={onPrintTypeChange} buttonStyle="solid">
                {printTypeArr.map((item: any) => (
                  <Radio.Button
                    value={item.type}
                    key={item.type}
                  >
                    {item.text}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="筛查学校">
              <Select defaultValue={schoolName} disabled />
            </Form.Item>
            <Form.Item
              label="选择年级/班级"
              rules={[{ required: true, message: '请选择年级班级' }]}
              name="gradeIds"
            >
              <Cascader
                options={gradeOptions}
                placeholder="请选择"
                fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
                onChange={setSelectArr}
              />
            </Form.Item>
            <Form.Item label="筛查学生" name="studentIds">
              <Select
                mode="multiple"
                allowClear
                optionFilterProp="name"
                className={styles.stu_option}
                filterOption={filterOption}
                getPopupContainer={getPopupContainer}
              >
                {studentList.map((item: any) => (
                  <Option
                    value={item.planStudentId}
                    key={item.planStudentId}
                    disabled={!studentIds.includes(item.planStudentId) && studentIds.length > 9}
                  >
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : (
          <>
            {FormPreTemp.map((item) => (
              <Fragment key={item.value}>
                {item.label}
                <Row align={'top'}>
                  <Col span={16}>
                    <ProFormText
                      placeholder={`请输入${item.placeholder}`}
                      name={item.value}
                      rules={item.rules}
                      fieldProps={{ maxLength: item.limit }}
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
                <span style={{ marginTop: 5 }}>筛查二维码：</span>
                <Image width={128} height={128} src={qrcodeImg} />
              </Col>
            </Row>
            {FormNextTemp.map((item) => (
              <Fragment key={item.value}>
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText
                      name={item.value}
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
                  name="content"
                  fieldProps={{ maxLength: FormNoticeTemp[0].limit }}
                  placeholder="请输入告知书内容"
                  rules={[{ required: true, message: '请输入告知书内容' }]}
                />
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormNoticeTemp[0]} />
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
                <Upload
                  name="upload"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  {...uploaderProps}
                >
                  <img src={imgUrl ?? UploadDefaultImg} alt="avatar" className={styles.image} />
                </Upload>
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormUploadTemp} />
              </Col>
            </Row>
          </>
        )}
        
      </Form>
      { step === 0 ? <FooterTips /> : <></>}
      {/* <StepsForm
        current={current}
        stepsProps={{
          type: 'navigation',
        }}
        submitter={{
          render: (eleProps) => {
            if (!eleProps.step) {
              return bottonList.map((item) => (
                <Button
                  loading={item.type ? fetches[item.type!]?.loading : undefined}
                  type="primary"
                  key={item.key}
                  onClick={() => onPrint(eleProps, item.isStep, item?.type)}
                >
                  {item.label}
                </Button>
              ));
            }
            return [
              <Button key="pre" onClick={() => setCurrent(0)}>
                上一步
              </Button>,
              <Button
                loading={loading}
                type="primary"
                key="print"
                onClick={() => onPrint(eleProps)}
              >
                预览下载
              </Button>,
            ];
          },
        }}
      >
        <StepsForm.StepForm
          name="firstForm"
          title="选择"
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
              fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
              onChange={setSelectArr}
            />
          </Form.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          formRef={ref}
          name="secordForm"
          title="预览-保存"
          stepProps={{
            description: '预览打印样板，点击保存打印',
          }}
        >
          <>
            {FormPreTemp.map((item) => (
              <Fragment key={item.value}>
                {item.label}
                <Row align={'top'}>
                  <Col span={16}>
                    <ProFormText
                      placeholder={`请输入${item.placeholder}`}
                      name={item.value}
                      rules={item.rules}
                      fieldProps={{ maxLength: item.limit }}
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
                <span style={{ marginTop: 5 }}>筛查二维码：</span>
                <Image width={128} height={128} src={qrcodeImg} />
              </Col>
            </Row>
            {FormNextTemp.map((item) => (
              <Fragment key={item.value}>
                <Row align={'middle'}>
                  <Col span={16}>
                    <ProFormText
                      name={item.value}
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
                  name="content"
                  fieldProps={{ maxLength: FormNoticeTemp[0].limit }}
                  placeholder="请输入告知书内容"
                  rules={[{ required: true, message: '请输入告知书内容' }]}
                />
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormNoticeTemp[0]} />
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
                <Upload
                  name="upload"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  {...uploaderProps}
                >
                  <img src={imgUrl ?? UploadDefaultImg} alt="avatar" className={styles.image} />
                </Upload>
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormUploadTemp} />
              </Col>
            </Row>
          </>
        </StepsForm.StepForm>
      </StepsForm> */}
    </Modal>
  );
};
