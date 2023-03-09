import styles from './operation-modal.less';
import { useModel } from 'umi';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Upload, message, Modal, Radio, Space } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { modalConfig } from '@/hook/ant-config';
import { saveDataSubmitFile } from '@/api/prevention/data-receive';

const { Dragger } = Upload;

export const OperationModal: React.FC<API.ModalItemType & { typeKey?: string }> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  // 是否是长沙市及以下归属
  const isChangSha = currentUser?.districtDetail?.some((item) =>
    String(item.code).startsWith('4301'),
  );

  const { typeKey } = props;

  const [fileList, setFileList] = useState<any[]>([]); // 导入file
  const [loading, setLoading] = useState(false); // 确认按钮loading

  // 数据报送类型
  const dataSubmissionTypeArr = [
    { type: 0, text: '国家表格' },
    { type: 1, text: '长沙市数据报送适配器（教育版）' },
  ];
  // 默认选中长沙市数据报送适配器（教育版）
  const [submitType, setSubmitType] = useState<number>(isChangSha ? 1 : 0);

  const onSubmitTypeChange = (e: RadioChangeEvent) => {
    setSubmitType(e.target.value);
  };

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
    <Modal
      title="新建数据送报表格导出"
      width={800}
      visible={props.visible}
      onOk={onComfirm}
      destroyOnClose
      confirmLoading={loading}
      onCancel={onCancel}
      {...modalConfig}
    >
      {isChangSha ? (
        <Radio.Group
          className={styles.mb10}
          buttonStyle="solid"
          onChange={onSubmitTypeChange}
          value={submitType}
        >
          <Space size={10}>
            {dataSubmissionTypeArr.map((item: any) => (
              <Radio.Button value={item.type} key={item.type}>
                {item.text}
              </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      ) : (
        ''
      )}
      {submitType ? (
        <>
          <p className={styles.explain}>1.您配置了多个数据报送的适配器，请选择对应的适配器。</p>
          <p className={styles.explain}>
            2.说明：不同的是配置对应需要上传的表格和导出的表格内容不同，请根据实际情况选用。
          </p>
        </>
      ) : (
        <>
          <p className={styles.explain}>1.请从中国学生体质健康网数据报送平台下载视力数据模板</p>
          <p className={styles.explain}>
            2.系统将会默认填充右眼裸眼视力、左眼裸眼视力、右眼屈光度(球镜、
            柱镜、轴位)、左眼屈光度(球镜、柱镜、轴位)
          </p>
          <p className={styles.explain}>
            3.系统将根据学籍号进行记录匹配，系统将取学生最后一次筛查数据进行匹配
          </p>
          <p className={styles.explain}>4.完成匹配后将通过站内信通知您下载补全完整的数据表格</p>
        </>
      )}
      <Dragger {...loadProps}>
        <CloudUploadOutlined className={styles.icon} />
        <p className="ant-upload-hint">点击导入excel</p>
      </Dragger>
    </Modal>
  );
};
