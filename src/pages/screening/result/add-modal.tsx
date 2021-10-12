import { Modal, Image } from 'antd';
import Img from '@/assets/images/class_seat.png';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const describeItem = [
    '桌子高度（cm）=身高（cm）×0.43',
    '椅子高度（cm）=身高（cm）×0.24',
    '采用四舍五入方式计算',
    '例如儿童身高120cm',
    '桌子高度：120cm×0.43=52cm',
    '椅子高度：120cm×0.24=29cm',
  ];
  return (
    <Modal
      title={props.title}
      width={800}
      visible={props.visible}
      footer={null}
      onCancel={props.onCancel}
    >
      <p style={{ fontSize: 15, padding: 5, fontWeight: 600 }}>一、课桌椅标准</p>
      <Image width={750} src={Img} />
      <p style={{ fontSize: 15, padding: 5, fontWeight: 600 }}>二、可调节课桌椅建议桌椅高度</p>
      {describeItem.map((item) => (
        <p style={{ padding: 5 }}>{item}</p>
      ))}
      <p style={{ fontSize: 12, color: 'darkgray' }}>*公式参考自有关论文，仅供参考使用</p>
    </Modal>
  );
};
