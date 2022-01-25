import { Form, Input, Row, Col, Upload, Spin, message } from 'antd';
import styles from './pre-step.less';
import type { IdsType } from '../index';
import { getReportInfo } from '@/api/screen';
import { useMemo, useState, forwardRef } from 'react';
import UploadDefaultImg from '@/assets/images/code.png';
import { uploadFile } from '@/api/common';

type PreStepType = {
  ids: IdsType;
};

export const PreStep = forwardRef<any, PreStepType>((props, ref) => {
  const [form] = Form.useForm();
  const { ids } = props;
  const [fileList, setFileList] = useState<any[]>([]);
  const [imgUrl, setImgUrl] = useState<string>();
  const [preLoading, setPreLoading] = useState(false);
  const { schoolName } = ids;
  const [initForm] = useState<API.ObjectType>({
    title: '学生视力筛查结果通知书',
    subTitle: schoolName,
    call: '尊敬的家长',
    content: '',
    qrCodeFileId: -1,
  });
  const prompt = [
    '步骤1：关注公众号--点击菜单栏【查看报告】',
    '步骤2：输入孩子身份证/筛查编号 、姓名',
    '步骤3：查看孩子的筛查报告，了解孩子的视力情况',
  ];
  const info = [
    {
      key: '姓名 : ',
      value: '赵xx',
    },
    {
      key: '年级班级 : ',
      value: '三年级一班',
    },
    {
      key: '出生日期 : ',
      value: '2000年1月1日',
    },
    {
      key: '性别 : ',
      value: '男',
    },
    {
      key: '筛查编号 : ',
      value: 'xxxxxxxx',
    },
  ];
  useMemo(async () => {
    try {
      const { schoolId } = ids;
      if (schoolId) {
        setPreLoading(true);
        const { data } = await getReportInfo(schoolId);
        if (data.resultNoticeConfig) {
          form.setFieldsValue(data.resultNoticeConfig);
          setImgUrl(data.noticeResultFileUrl);
        }
      }
    } finally {
      setPreLoading(false);
    }
  }, []);
  /**
   * @desc 上传图片的props
   */
  const uploaderProps = {
    beforeUpload: (file: { type: string; name: any; size: number }) => {
      const isImgFormat = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      const isLt3M = file.size! / 1024 / 1024 < 5;
      if (file && !isLt3M) {
        message.error('上传失败！上传图片文件大小不能超过5M');
        return true;
      }
      if (!isImgFormat) {
        message.error('上传失败！上传图片只支持png、jpg、jpeg');
        return true;
      }
      setFileList([file]);
      return false;
    },
    onChange: async () => {
      const formData = new FormData();
      fileList.forEach((item: string | Blob) => {
        formData.append('file', item);
      });
      const { data } = await uploadFile(formData);
      form.setFieldsValue({ qrCodeFileId: data.fileId });
      setImgUrl(data.url);
    },
  };

  const { TextArea } = Input;
  return (
    <Spin spinning={preLoading} delay={300}>
      <Form
        ref={ref}
        layout="vertical"
        className={styles.pre_step}
        initialValues={initForm}
        form={form}
        preserve={false}
        requiredMark={false}
      >
        <Form.Item
          name="title"
          label={
            <div className="m_label">
              <label>标题</label>
              <span className="c_org">可进行修改，20字以内</span>
            </div>
          }
          className={styles.title}
          rules={[
            { required: true, message: '请输入标题' },
            { min: 1, max: 20, message: '最多可填入20个字符' },
          ]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          name="subTitle"
          label={
            <div className="m_label">
              <label>副标题</label>
              <span className="c_org">可进行修改，30字以内</span>
            </div>
          }
          className={styles.sub_title}
          rules={[
            { required: true, message: '请输入副标题' },
            { min: 1, max: 30, message: '最多可填入30个字符' },
          ]}
        >
          <Input placeholder="请输入副标题" />
        </Form.Item>
        <Form.Item label="学生信息">
          <ul className={`${styles.stu_info} ${styles.g_border}`}>
            {info.map((v) => (
              <li key={v.key}>
                <span>{v.key}</span>
                {v.value}
              </li>
            ))}
          </ul>
        </Form.Item>
        <Form.Item
          name="call"
          label={
            <div className="m_label">
              <span>称谓</span>
              <span className="c_org">可进行修改，15字以内</span>
            </div>
          }
          className={styles.sub_title}
          rules={[
            { required: true, message: '请输入称谓' },
            { min: 1, max: 15, message: '最多可填入15个字符' },
          ]}
        >
          <Input placeholder="请输入称谓" />
        </Form.Item>
        <Form.Item
          label="正文"
          name="content"
          className={styles.content}
          rules={[
            { required: true, message: '请输入正文' },
            { min: 1, max: 500, message: '最多可填入500个字符' },
          ]}
        >
          <TextArea showCount maxLength={500} style={{ height: 170 }} />
        </Form.Item>
        <Form.Item
          label={
            <div className="m_label">
              <span>建议</span>
              <span className="c_org">无法修改</span>
            </div>
          }
        >
          <div className={`${styles.advance} ${styles.g_border}`}>
            <p>建议</p>
            <div>
              如您的孩子在本次学生视力筛查中发现您的孩子眼睛存在异常，建议您带孩子到医院复测。
            </div>
            <div>*复测项目包括验光试镜、散瞳检影、生物测量、眼底情况等</div>
          </div>
        </Form.Item>
        <Row>
          <Col span={18}>
            <Form.Item
              className={styles.tips}
              label={
                <div className="m_label_code">
                  <span>流程细节</span>
                  <span className="c_org">无法修改</span>
                </div>
              }
            >
              <ul className={styles.step_words}>
                {prompt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item className={styles.code} name="qrCodeFileId">
              <div className={styles.qrCode}>
                <Upload
                  name="upload"
                  listType="picture-card"
                  className="avatar-upload"
                  showUploadList={false}
                  {...uploaderProps}
                >
                  <div className="upload_label">
                    <span className="title">点击更换二维码</span>
                  </div>
                  <img src={imgUrl ?? UploadDefaultImg} alt="avatar" className={styles.image} />
                </Upload>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
});
