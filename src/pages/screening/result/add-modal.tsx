import { Modal, Image } from 'antd';
import Img from '@/assets/images/class_seat.png';
import styles from './add-modal.less';

export const AddModal: React.FC<API.ModalItemType & { tabKey?: string }> = (props) => {
  // 课座椅标准
  const standardItem: string[] = [
    '桌子高度（cm）=身高（cm）×0.43',
    '椅子高度（cm）=身高（cm）×0.24',
    '采用四舍五入方式计算',
    '例如儿童身高120cm',
    '桌子高度：120cm×0.43=52cm',
    '椅子高度：120cm×0.24=29cm',
  ];

  const screenItem: API.ObjectType[] = [
    {
      title: '一、字段解说：',
      describe: [
        '预计筛查学生数：筛查计划中导入的该学校的筛查学生总数',
        '实际筛查学生数：现场筛查中进行筛查的学生总数（即有筛查数据的学生）',
        '视力筛查完成率：公式=实际筛查学生数 / 预计筛查学生数 * 100%',
        <p>
          有效实际筛查学生数：实际筛查学生数中，其筛查数据
          <span style={{ color: 'lightseagreen' }}>满足完整数据要求</span>的学生总数。
        </p>,
      ],
    },
    {
      title: '二、完整数据判断：',
      describe: [
        '1 配镜情况：没有配镜，需要：裸眼视力和电脑验光数据（球镜、柱镜、轴位）',
        '2 配镜情况：佩戴框架眼镜，需要裸眼视力、矫正视力和电脑验光数据（球镜、柱镜、轴位）',
        '3 配镜情况：佩戴隐形眼镜，需要裸眼视力、矫正视力和电脑验光数据（球镜、柱镜、轴位）',
        '4 配镜情况：佩戴角膜塑形镜，需要矫正视力',
      ],
    },
  ];

  // 详细说明种类
  const FormTemp = {
    // 课座椅标准
    standard: () => (
      <div className={styles.standard}>
        <p className={styles.title}>一、课桌椅标准</p>
        <Image width={750} src={Img} />
        <p className={styles.title}>二、可调节课桌椅建议桌椅高度</p>
        {standardItem.map((item) => (
          <p style={{ padding: 5 }} key={item}>
            {item}
          </p>
        ))}
        <p style={{ fontSize: 12, color: 'darkgray' }}>*公式参考自有关论文，仅供参考使用</p>
      </div>
    ),

    // 视力筛查情况
    screen: () => (
      <>
        {screenItem.map((item: API.ObjectType) => (
          <div className={styles.screen}>
            <p key={item.title} className={styles.title}>
              {item.title}
            </p>
            {item.describe.map((eleItem: string | HTMLElement) =>
              typeof eleItem === 'string' ? (
                <p key={eleItem} className={styles.subtitle}>
                  {eleItem}
                </p>
              ) : (
                eleItem
              ),
            )}
          </div>
        ))}
      </>
    ),
  };
  return (
    <Modal
      title={props.title}
      width={800}
      visible={props.visible}
      footer={null}
      onCancel={() => props.onCancel()}
    >
      {FormTemp[props?.tabKey!]?.()}
    </Modal>
  );
};
