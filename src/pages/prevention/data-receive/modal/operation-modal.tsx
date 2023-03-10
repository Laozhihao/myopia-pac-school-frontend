import styles from './operation-modal.less';
import { useModel } from 'umi';
import React, { useState, useMemo } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Upload, message, Modal, Radio, Space, Button } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { reportModalConfig } from '@/hook/ant-config';
import { saveDataSubmitFile, getSchoolDataSubmitTemplate } from '@/api/prevention/data-receive';

const { Dragger } = Upload;

export const OperationModal: React.FC<API.ModalItemType & { typeKey?: string }> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  // 是否配置了超出一种数据上报类型
  const isMultiple = currentUser?.dataSubmitConfig?.length > 1;
  const [step, setStep] = useState<number>(0); // 选择步骤，只有当存在数据上报类型多个才需要
  const [submitTips, setSubmitTips] = useState<string>(''); // 报错错误提示

  // 数据上报类型，超出一种不选择，只有一种默认选择
  const [submitType, setSubmitType] = useState<number>(
    isMultiple ? undefined : currentUser?.dataSubmitConfig[0],
  );

  const onSubmitTypeChange = (e: RadioChangeEvent) => {
    setSubmitType(e.target.value);
  };

  /**
   * @desc 保存数据报送适配器选择回调
   */
  const onSaveBubmitType = () => {
    const isError = submitType === undefined;
    setSubmitTips(isError ? '请选择对应的数据报送表格适配器' : '');
    setStep(isError ? 0 : 1);
  };

  const { typeKey, visible } = props;

  const [fileList, setFileList] = useState<any[]>([]); // 导入file
  const [loading, setLoading] = useState(false); // 确认按钮loading

  // 数据报送类型
  const [dataSubmissionTypeArr, setDataSubmitTypeArr] = useState<any[]>([]);
  useMemo(async () => {
    if (visible) {
      // 获取数据报送模板信息
      const { data } = await getSchoolDataSubmitTemplate();
      setDataSubmitTypeArr(data ?? []);
    }
  }, [visible]);

  const onCancel = () => {
    // 清空上一次保存的文件
    setFileList([]);
    props.onCancel();
  };

  // 导入
  const loadProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    maxCount: 1,
    beforeUpload() {
      return false;
    },
    onChange(file: any) {
      setFileList(() => {
        return file?.fileList[0]?.originFileObj ? [file?.fileList[0]?.originFileObj] : [];
      });
    },
  };

  const onComfirm = () => {
    setLoading(true);
    const formData = new FormData();
    switch (typeKey) {
      // 导入
      case 'import':
        if (!fileList.length) {
          message.error('请上传需要上报的学生数据');
          setLoading(false);
          return;
        }
        fileList.forEach((file) => {
          formData.append('file', file);
        });
        formData.append('type', String(submitType));
        saveDataSubmitFile(formData)
          .then(() => {
            message.success('导入成功');
            props.onCancel(true);
          })
          .finally(() => {
            setLoading(false);
          });
        break;

      default:
        break;
    }
  };

  return (
    // footer={!isMultiple || step ? true : null}
    <Modal
      title={isMultiple ? '数据报送表格适配器选择' : '新建数据送报表格导出'}
      className={!isMultiple || step ? '' : 'noSaveType'}
      visible={props.visible}
      onOk={onComfirm}
      destroyOnClose
      confirmLoading={loading}
      onCancel={onCancel}
      {...reportModalConfig}
    >
      {isMultiple && !step ? (
        <>
          <p className={styles.mb10}>1.您配置了多个数据报送的适配器，请选择对应的适配器。</p>
          <p className={styles.mb10}>
            2.说明：不同的适配器配置需要上传对应的表格，请根据实际情况选用。
          </p>
          <Radio.Group
            className={styles.mb10}
            buttonStyle="solid"
            onChange={onSubmitTypeChange}
            value={submitType}
          >
            <Space size={10}>
              {dataSubmissionTypeArr
                .filter((item) => currentUser?.dataSubmitConfig?.includes(item.type))
                .map((item: any) => (
                  <Radio.Button value={item.type} key={item.type}>
                    {item.desc}
                  </Radio.Button>
                ))}
            </Space>
          </Radio.Group>
          <div className={styles.stepBtnW}>
            <div>
              <Button className={styles.sureBtn} type="primary" onClick={onSaveBubmitType}>
                确定
              </Button>
            </div>
            {submitTips && submitType === undefined ? (
              <div className={styles.redFont}>{submitTips}</div>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
      {!isMultiple || step ? (
        <>
          <p className={styles.explain}>1.请从对应的数据源网站下载近视防控学生数据模板</p>
          <p className={styles.explain}>
            2.系统将根据学籍号进行记录匹配，系统将取学生最后一次筛查数据进行匹配
          </p>
          <p className={styles.explain}>3.完成匹配后将通过站内信通知您下载补全完整的数据表格</p>
          <Dragger {...loadProps}>
            <CloudUploadOutlined className={styles.icon} />
            <p className="ant-upload-hint">点击导入excel</p>
          </Dragger>
        </>
      ) : (
        ''
      )}
    </Modal>
  );
};
