import { modalConfig } from '@/hook/ant-config';
import { Modal, Image } from 'antd';
import standardImg0 from '@/assets/images/standard-img0.jpg';
import standardImg1 from '@/assets/images/standard-img1.jpg';
import standardImg2 from '@/assets/images/standard-img2.jpg';
import standardImg3 from '@/assets/images/standard-img3.jpg';
import standardImg4 from '@/assets/images/standard-img4.jpg';
import standardImg5 from '@/assets/images/standard-img5.jpg';
import standardImg6 from '@/assets/images/standard-img6.jpg';

export const StandardModal: React.FC<API.ModalItemType> = (props) => {
  const standardImg = [
    standardImg0,
    standardImg1,
    standardImg2,
    standardImg3,
    standardImg4,
    standardImg5,
    standardImg6,
  ];
  return (
    <Modal
      title="判断标准"
      width={850}
      visible={props.visible}
      footer={null}
      onCancel={() => props.onCancel()}
      {...modalConfig}
    >
      {standardImg.map((item, index) => (
        <Image key={index} width={800} src={item} />
      ))}
    </Modal>
  );
};
