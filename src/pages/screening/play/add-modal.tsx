import { Modal, Select, Radio, Button, Cascader, Form, Row, Col, Image, Upload, Space } from 'antd';
import { useRequest, useModel } from 'umi';
import { ProFormText } from '@ant-design/pro-form';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { isNotEmpty } from '@vistel/vistel-utils/lib/tool';
import styles from './add-modal.less';
import qrcodeImg from '@/assets/images/qrcode.jpg';
import { Step } from '../result/notice-report/components/step';
import { FooterTips } from '../result/notice-report/components/footer-tips';
import RightTips from './right-tips';
import MyEditor from '@/components/EditorModal';
import UploadDefaultImg from '@/assets/images/code.png';
import { modalConfig, getPopupContainer } from '@/hook/ant-config';
import { escape2Html, html2Escape } from '@/utils/common';
import { uploadFile } from '@/api/common';
import {
  getScreeningGradeList,
  getScreeningQrcode,
  updateScreeningNoticeConfig,
  getScreeningPlanstudents,
} from '@/api/screen/plan';
import type { OptionType } from 'antd/lib/select';
import type { RadioChangeEvent } from 'antd';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  // 获取当前学校名称
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  // 表单Ref
  const [formRef] = Form.useForm();
  // 设置默认值
  formRef.setFieldsValue({
    schoolName: currentUser?.realName,
  });
  // 默认选中筛查二维码
  const [printType, setPrintType] = useState<number>();
  const [studentList, setStudentList] = useState([]);
  const [studentIds, setStudentIds] = useState<number[]>([]);

  const [gradeOptions, setGradeOptions] = useState([]); // 年级级联
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [selectArr, setSelectArr] = useState<any[]>([]); // 选中的年级班级
  const [loading, setLoading] = useState(false); // 预览下载loading
  const [refresh, setRefresh] = useState(false); // 刷新列表
  const [isAssignment, setIsAssignment] = useState(false); // 赋值标志位
  const [imgUrl, setImgUrl] = useState<string>();
  const [contentValue, setContentValue] = useState('');

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
    title: '公众号二维码',
    text: '可进行更改大小不能超过5M宽度不能小于100px格式：png、jpg、jpeg',
    step: 6,
  };

  const prompt = [
    '查看孩子的眼健康档案',
    '了解孩子的视力变化趋势',
    '学习相关的眼健康知识与科普',
    '有问题可在线咨询医生进行解答',
  ];

  useMemo(async () => {
    if (props?.visible) {
      const { planId: screeningPlanId, notificationConfig } = props?.currentRow || {};
      setContentValue(escape2Html(notificationConfig?.content ? notificationConfig?.content : ''));
      const { data = [] } = await getScreeningGradeList(screeningPlanId);
      // 级联只选择年级，设置全部
      data.forEach((item: any) => {
        item.classes.unshift({
          id: item.id,
          name: '全部',
        });
      });
      setGradeOptions(data);
    }
  }, [props?.visible, props?.currentRow]);

  useEffect(() => {
    if (props?.currentRow && current && !isAssignment && props?.visible) {
      formRef?.setFieldsValue({ ...initForm, ...props?.currentRow?.notificationConfig });
      setInitForm({ ...initForm, ...props?.currentRow?.notificationConfig });
      setIsAssignment(true); // 已赋值
    }
  }, [props?.visible, props?.currentRow, current]);

  // 打印类型
  const defaultPrintTypeArr = [
    { type: 0, text: '告知书' },
    { type: 1, text: '筛查二维码' },
    { type: 2, text: '学生筛查二维码' },
    { type: 3, text: '虚拟二维码' },
  ];
  const [printTypeArr, setPrintTypeArr] = useState<API.ObjectType[]>(defaultPrintTypeArr);

  useEffect(() => {
    setImgUrl(props?.currentRow?.qrCodeFileUrl);
    // 处理二维码配置权限，告知书默认显示
    const confitArr = [
      0,
      2,
      ...(props?.currentRow?.qrCodeConfig?.split(',')?.map((i: string) => +i) || []),
    ];
    const dynamicPrintTypeArr = defaultPrintTypeArr.filter((item) => confitArr.includes(item.type));
    setPrintTypeArr(dynamicPrintTypeArr);
    // 根据权限显示默认匹配第一个二维码类型，没有则默认显示告知书
    setPrintType(confitArr[1] ?? 0);
  }, [props?.visible, props?.currentRow]);

  // 监听选择的年级和班级
  const onSelectGradeClass = async (value: any) => {
    const [gradeId, classId] = value;
    // 当前操作选中项跟上一次保持一致，直接忽略此次选择
    if (selectArr[1] === classId) {
      return;
    }
    // 记录当前操作项
    setSelectArr(value);
    // 重置值
    formRef.setFieldsValue({ studentIds: [] });
    setStudentList([]);
    // 注意gradeId===classId代表选择了某年级全部
    if (gradeId === classId) {
      return;
    }
    // 班级ID存在的时候才去获取学生，避免学生同名
    const { data } = await getScreeningPlanstudents(
      props?.currentRow?.planId,
      props?.currentRow?.schoolId,
      gradeId,
      classId,
    );
    setStudentList(data);
  };

  /**
   * @desc 预览pdf
   */
  const openPdf = (url: any) => {
    url && window.open(`/school/pdf/viewer.html?file=${url}`);
  };

  const onCancel = () => {
    props.onCancel(refresh);
    setCurrent(0);
    setRefresh(false);
    setIsAssignment(false);
  };

  // 用fetches管理并发请求的多个loading 就无须声明多个loading变量 (二维码请求)
  const { run } = useRequest(getScreeningQrcode, {
    manual: true,
    fetchKey: (params: { type: any }) => params.type,
    onSuccess: (result: any) => {
      result && openPdf(result);
      setLoading(false);
      onCancel();
    },
  });

  /**
   * @desc 预览告知书/二维码  1-二维码 2-VS666 3-虚拟学生二维码
   */
  const onHandle = async (type?: number, obj?: API.ObjectType) => {
    const [gradeId, classId] = selectArr;
    const parm = {
      gradeId,
      classId: gradeId === classId ? '' : classId,
      schoolId: props?.currentRow?.schoolId,
      screeningPlanId: props?.currentRow?.planId,
      type,
      planStudentIds: studentIds.join(','),
      isSchoolClient: true,
    };
    setLoading(true);
    // 告知书
    if (!type) {
      await updateScreeningNoticeConfig({ ...obj, qrCodeFileId: initForm.qrCodeFileId });
      setRefresh(true); // 编辑过 返回列表需要刷新
    }
    run(parm);
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

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const onPrintTypeChange = (e: RadioChangeEvent) => {
    setPrintType(e.target.value);
  };

  // 搜索过滤
  const filterOption = (
    inputValue: string,
    option: OptionType & { props: { children: string[] } },
  ) => option.props.children.indexOf(inputValue) >= 0;

  // 学生变化
  const studentChange = async (value: any[]) => {
    setStudentIds(value);
  };

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

  /**
   *@desc 下一步操作逻辑
   */
  const nextClickHandle = () => {
    // 非告知书
    if (printType) {
      onHandle(printType, undefined); // 打印
    } else {
      // 告知书处于第二步检验通过可以直接生成
      if (current) {
        formRef?.validateFields().then((value) => {
          if (value) {
            value.content = html2Escape(contentValue);
            onHandle(printType, value); // 打印
          }
        });
        return;
      }

      // 告知书下一步
      setCurrent(1);
    }
  };

  return (
    <Modal
      title={props.title}
      width={750}
      visible={props.visible}
      destroyOnClose
      forceRender
      onCancel={onCancel}
      className={styles.modal}
      footer={[
        <div className={styles.footer} key="footer-btn">
          <Button key="back" className={styles.cancel_btn} onClick={prevClickHandle}>
            {current === 1 ? '上一步' : '取消'}
          </Button>
          {isNotEmpty(printType) ? (
            <Button loading={loading} key="export" type="primary" onClick={nextClickHandle}>
              {printType || current ? '生成' : '下一步'}
            </Button>
          ) : (
            ''
          )}
        </div>,
      ]}
      {...modalConfig}
    >
      <Step step={current} key="current" />
      <Form {...(current ? {} : layout)} form={formRef} preserve={false}>
        {current === 0 ? (
          <>
            <Form.Item label="打印类型" required>
              <Radio.Group
                defaultValue={printType}
                buttonStyle="solid"
                onChange={onPrintTypeChange}
              >
                <Space size={10}>
                  {printTypeArr.map((item: any) => (
                    <Radio.Button value={item.type} key={item.type}>
                      {item.text}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="筛查学校" name="schoolName" required>
              <Select disabled />
            </Form.Item>
            <Form.Item label="选择年级/班级" name="selectArr">
              <Cascader
                options={gradeOptions}
                placeholder="请选择"
                fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
                onChange={onSelectGradeClass}
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
                onChange={studentChange}
              >
                {studentList.map((item: any) => (
                  <Select.Option
                    value={item.studentId}
                    key={item.studentId}
                    disabled={!studentIds.includes(item.studentId) && studentIds.length > 9}
                  >
                    {item.studentName}
                  </Select.Option>
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
                {/* <ProFormTextArea
                  name="content"
                  fieldProps={{ maxLength: FormNoticeTemp[0].limit }}
                  placeholder="请输入告知书内容"
                  rules={[{ required: true, message: '请输入告知书内容' }]}
                /> */}
                <MyEditor
                  maxlength={500}
                  value={contentValue}
                  onChange={(e) => setContentValue(e)}
                ></MyEditor>
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormNoticeTemp[0]} />
              </Col>
            </Row>
            <Row className={styles.foot} align={'middle'}>
              <Col span={11}>
                <p>关注公众号，及时查看孩子视力筛查结果报告！</p>
                <ul className={styles.ul}>
                  {prompt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Col>
              <Col className={styles.upload_col} span={5}>
                <Upload
                  name="upload"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  {...uploaderProps}
                >
                  <Image
                    width={128}
                    height={128}
                    src={imgUrl ?? UploadDefaultImg}
                    alt="avatar"
                    className={styles.image}
                  />
                </Upload>
              </Col>
              <Col span={8}>
                <RightTips style={{ top: 'calc(50% - 23px)' }} {...FormUploadTemp} />
              </Col>
            </Row>
          </>
        )}
      </Form>
      {current === 0 ? <FooterTips /> : <></>}
    </Modal>
  );
};
