import styles from './footer-tips.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const FooterTips: React.FC = () => {
  return (
    <div className="matters">
      <div className="matters_tit">
        <ExclamationCircleOutlined className={styles.warn} />
        <span>注意事项</span>
      </div>
      <div className="matters_words">
        <ul>
          <li>1.按学校、按年级，导出成功后，下载链接将通过站内信推送，请关注站内消息提醒！</li>
          <li>
            2.按班级，按学生(单个或至多10个)，导出成功后，新开界面展示并可手动点击打印，请留意！
          </li>
        </ul>
      </div>
    </div>
  );
};
