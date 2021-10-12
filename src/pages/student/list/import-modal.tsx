import { Modal } from 'antd';
import styles from './import-modal.less';
import { Upload, message } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const ImportModal: React.FC<API.ModalItemType> = (props) => {
  let fileList: any[] = [];

  const loadProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    maxCount: 1,
    beforeUpload() {
      return false;
    },
    onChange(info: any) {
      fileList = info.fileList;
    },
    onDrop(e: any) {
      fileList = e.dataTransfer.files;
    },
  };

  const onComfirm = () => {
    if (!fileList.length) {
      message.error('请上传需要导入的学生数据');
      return;
    }
    // todo 接口调试-关闭弹窗
    props.onCancel();
  };

  return (
    <Modal
      title={`导入${props.title}`}
      width={props?.width ?? 800}
      visible={props.visible}
      onOk={onComfirm}
      onCancel={props.onCancel}
    >
      <p className={styles.title}>学校： XXXXX学校</p>
      <p className={styles.explain}>说明：请先下载筛查学生数据模板表，按照模板填写后，再上传</p>
      <p className={styles.modular}>
        模板：
        <span className={styles.load_font} onClick={() => window.open('/excel/导入学生表.xlsx')}>
          学生数据表模板.xls，点击下载
        </span>
      </p>

      <Dragger {...loadProps}>
        <CloudUploadOutlined className={styles.icon} />
        <p className="ant-upload-hint">点击导入表格</p>
      </Dragger>
    </Modal>
  );
};
