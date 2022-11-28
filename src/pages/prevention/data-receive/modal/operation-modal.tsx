import styles from './operation-modal.less';
import React, { useState } from 'react';
import { Upload, message, Modal } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { modalConfig } from '@/hook/ant-config';
import { saveDataSubmitFile } from '@/api/prevention/data-receive';

const { Dragger } = Upload;

export const OperationModal: React.FC<API.ModalItemType & { typeKey?: string }> = (props) => {
  const { typeKey } = props;

  const [fileList, setFileList] = useState<any[]>([]); // 导入file
  const [loading, setLoading] = useState(false); // 确认按钮loading

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
      onCancel={() => props.onCancel()}
      {...modalConfig}
    >
      <p className={styles.explain}>1.请从中国学生体质健康网数据报送平台下载视力数据模板</p>
      <p className={styles.explain}>
        2.系统将会默认填充右眼裸眼视力、左眼裸眼视力、右眼屈光度(球镜、
        柱镜、轴位)、左眼屈光度(球镜、柱镜、轴位)
      </p>
      <p className={styles.explain}>
        3.系统将根据学籍号进行记录匹配，系统将取学生最后一次筛查数据进行匹配
      </p>
      <p className={styles.explain}>4.完成匹配后将通过站内信通知您下载补全完整的数据表格</p>
      <Dragger {...loadProps}>
        <CloudUploadOutlined className={styles.icon} />
        <p className="ant-upload-hint">点击导入excel</p>
      </Dragger>
    </Modal>
  );
};
