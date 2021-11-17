import type { FormInstance } from 'antd';
import { Modal, Button, Cascader, Form, Row, Col, Image, Upload } from 'antd';
import styles from './add-modal.less';
import qrcodeImg from '@/assets/images/qrcode.jpg';
import type { ProFormInstance } from '@ant-design/pro-form';
import React, { Fragment, useEffect, useMemo, useState, useRef } from 'react';
import { StepsForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import RightTips from './right-tips';
import { getschoolGrade } from '@/api/school';
import { uploadFile } from '@/api/common';
import UploadDefaultImg from '@/assets/images/code.png';

import {
  getScreeningNoticeUrl,
  getScreeningQrcodeUrl,
  updateScreeningNotice,
  getScreeningOrg,
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
  const [gradeOptions, setGradeOptions] = useState([]); // 年级级联
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [orgInfo, setOrgInfo] = useState<API.ObjectType>(); // 机构信息
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

  const prompt = [
    '查看孩子的眼健康档案',
    '了解孩子的视力变化趋势',
    '学习相关的眼健康知识与科普',
    '有问题可在线咨询医生进行解答',
  ];

  const bottonList = [
    { label: '打印告知书', key: 'notice', isStep: true },
    { label: '打印筛查二维码', key: 'qrCode', isStep: false, type: 1 },
    { label: '打印VS666设备专属筛查二维码', key: 'equipmentCode', isStep: false, type: 2 },
    { label: '打印虚拟学生二维码', key: 'studentCode', isStep: false, type: 3 },
  ];

  useMemo(async () => {
    const { data = [] } = await getschoolGrade();
    setGradeOptions(data);
  }, []);

  useEffect(() => {
    if (props?.currentRow && current && !orgInfo) {
      getScreeningOrg(props?.currentRow?.screeningOrgId).then((res) => {
        setOrgInfo({ ...res?.data });
      });
    }
  }, [props?.visible, current]);

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
    url && window.open(`https://s-myopia-pac-mgmt.tulab.cn/pdf/viewer.html?file=${url}`);
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
      const datas = {
        ...props?.currentRow,
        ...orgInfo,
        notificationConfig: { ...obj, qrCodeFileId: initForm.qrCodeFileId },
      };
      setLoading(true);
      await updateScreeningNotice(datas);
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

  return (
    <Modal
      title={props.title}
      width={800}
      bodyStyle={{ maxHeight: 650, overflow: 'auto' }}
      visible={props.visible}
      footer={null}
      destroyOnClose
      onCancel={onCancel}
      className={styles.modal}
    >
      <StepsForm
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
              fieldNames={{ label: 'name', value: 'id', children: 'child' }}
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
                  <img src={imgUrl ?? UploadDefaultImg} alt="avatar" style={{ width: '100%' }} />
                </Upload>
              </Col>
            </Row>
          </>
        </StepsForm.StepForm>
      </StepsForm>
    </Modal>
  );
};
