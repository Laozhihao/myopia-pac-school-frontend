import { Modal } from 'antd';
import styles from './index.less';
import { InfoCircleOutlined } from '@ant-design/icons';

export const ExportModal: React.FC<API.ModalItemType> = (props) => {
  return (
    <Modal
      title={`导出${props.title}`}
      width={props?.width ?? 550}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={() => props.onCancel()}
    >
      {props.children}
      <div className={styles.tips}>
        <InfoCircleOutlined /> 导出成功后，下载链接将通过站内信推送，请关注站内消息提醒
      </div>
    </Modal>
  );
};
