import { Modal } from 'antd';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  return (
    <Modal
      title={props.title}
      width={800}
      visible={props.visible}
      footer={null}
      onCancel={props.onCancel}
    >
      <p>课桌椅标准图片待补充</p>
    </Modal>
  );
};
