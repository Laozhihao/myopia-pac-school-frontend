import { Modal } from 'antd';

export const ImportModal: React.FC<API.ModalItemType> = (props) => {
  return (
    <Modal
      title={`导入${props.title}`}
      width={props?.width ?? 800}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  );
};
