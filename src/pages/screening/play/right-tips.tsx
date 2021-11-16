import { Image } from 'antd';
import lineImg from '@/assets/images/line.png';
import styles from './right-tips.less';

type FormTipsType = {
  limit?: number; // input限制长度
  title?: string;
  step?: number;
  text?: string;
};

const RightTips: React.FC<FormTipsType> = (props) => {
  return (
    <div className={styles.tip}>
      <Image width={30} height={14} src={lineImg} preview={false} />
      <span className={styles.step}>{props.step}</span>
      <div className={styles.text}>
        <span className={styles.title}>{props.title}</span>
        <span className={styles.sub_title}>
          {props.limit ? `可进行修改，限制${props.limit}个字符！` : props.text}
        </span>
      </div>
    </div>
  );
};

export default RightTips;
