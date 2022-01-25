import styles from './step.less';

type TStep = {
  step: number;
};
export const Step: React.FC<TStep> = (props) => {
  const { step } = props;
  return (
    <div className={styles.step}>
      <div className={`${styles.pre} ${step === 2 ? styles.pre_img : ''}`}>
        <div>
          <div className={styles.pre_t}>配置</div>
          <div className={styles.pre_b}>配置需要打印的通知书模板</div>
        </div>
        <div className={styles.step_box}>
          <span className={`${styles.step_num} ${step !== 2 ? styles.step_color : ''}`}>1</span>
        </div>
      </div>
      <div className={`${styles.next} ${step === 2 ? styles.next_img : ''}`}>
        <div>
          <div className={styles.pre_t}>选择</div>
          <div className={styles.pre_b}>按学校、年级、班级进行打印</div>
        </div>
        <div className={styles.step_box}>
          <span className={`${styles.step_num} ${step === 2 ? styles.step_color : ''}`}>2</span>
        </div>
      </div>
    </div>
  );
};
