import { Modal, Image } from 'antd';
import Img from '@/assets/images/class_seat.png';
import monitorImg from '@/assets/images/monitor.jpg';
import abnormalImg from '@/assets/images/abnormal.png';
import styles from './add-modal.less';
import { Fragment } from 'react';

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

  // 视力筛查情况
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

  // 视力情况
  const situationItem = {
    commentary: [
      '近视：有效实际筛查学生数中近视的学生总数，公式=（根据标准判断为近视的学生数+佩戴角膜塑形镜的学生数） / 有效实际筛查学生数 *100%',
      '低度近视：有效实际筛查学生数低度近视的学生总数，公式=根据标准判断为低度近视的学生数 / 有效实际筛查学生数 *100%',
      '中度近视：有效实际筛查学生数中度近视的学生总数，公式=根据标准判断为中度近视的学生数 / 有效实际筛查学生数 *100%',
      '重度近视：有效实际筛查学生数重度近视的学生总数，公式=根据标准判断为重度近视的学生数 / 有效实际筛查学生数 *100%',
      '视力低下：有效实际筛查学生数中视力低下的学生总数，公式=视力低下的学生数 / 有效实际筛查学生数数 *100%',
      '平均视力：有效实际筛查学生数的平均视力，公式= 调查眼的视力之和 / 有效实际筛查学生数的调查眼数 *100%',
      '戴镜情况：实际筛查学生数中戴眼镜的学生总数，公式=戴眼镜的学生数 / 实际筛查学生数 *100%',
    ],
    myopia: [
      {
        title: '1、近视判断标准：',
        detail: [
          '视力正常：-0.50D≤SE≤0.50D',
          '低度近视：-3.00D＜SE≤-0.50D',
          '中度近视：-6.00D＜SE≤-3.00D',
          '重度近视：SE＜-6.00D',
        ],
      },
      {
        title: '2、视力低下判断标准：',
        detail: [
          '*＜3岁 视力低于4.6',
          '*＜4岁 视力低于4.7',
          '*＜6岁 视力低于4.9',
          '*＞6岁 视力低于5.0',
        ],
      },
    ],
  };

  // 视力监测
  const monitorItem = [
    '加入预警学生数：实际筛查学生数中符合0-3级预警的学生总数，公式=加入预警学生数 / 实际筛查学生数 *100%',
    '0级预警学生数：实际筛查学生数中符合0级预警的学生总数，公式=0级预警的学生数 / 实际筛查学生数 *100%',
    '1级预警学生数：实际筛查学生数中符合1级预警的学生总数，公式=1级预警的学生数 / 实际筛查学生数 *100%',
    '2级预警学生数：实际筛查学生数中符合2级预警的学生总数，公式=2级预警的学生数 / 实际筛查学生数 *100%',
    '3级预警学生数：实际筛查学生数中符合3级预警的学生总数，公式=3级预警的学生数 / 实际筛查学生数 *100%',
    '远视储备不足：实际筛查学生数中符合远视储备不足的学生总数，公式=远视储备不足的学生数 / 实际筛查学生数 *100%',
  ];

  // 视力异常
  const abnormalItem = [
    '建议就诊学生数：实际筛查学生数中符合建议就诊的学生总数，公式=建议就诊的学生数 / 实际筛查学生数 *100%',
    '去医院就诊数：实际筛查学生数中去医院就诊的学生总数，公式=去医院就诊的学生总数 / 实际筛查学生数 *100%',
    '绑定公众号数：实际筛查学生数中家长绑定了公众号的学生总数，公式=绑定了公众号的学生总数 / 实际筛查学生数 *100%',
  ];

  // 详细说明种类
  const FormTemp = {
    // 课座椅标准
    standard: () => (
      <div>
        <p className={styles.title}>一、课桌椅标准</p>
        <Image width={750} src={Img} />
        <p className={styles.title}>二、可调节课桌椅建议桌椅高度</p>
        {standardItem.map((item, index) => (
          <p style={{ padding: 5 }} key={index}>
            {item}
          </p>
        ))}
        <p style={{ fontSize: 12, color: 'darkgray' }}>*公式参考自有关论文，仅供参考使用</p>
      </div>
    ),

    // 视力筛查情况
    screen: () => (
      <>
        {screenItem.map((item, index) => (
          <div className={styles.modular} key={index}>
            <p className={styles.title}>{item.title}</p>
            {item.describe.map((eleItem: any, eleIndex: any) =>
              typeof eleItem === 'string' ? (
                <p key={eleIndex} className={styles.subtitle}>
                  {eleItem}
                </p>
              ) : (
                <Fragment key={eleIndex}>{eleItem}</Fragment>
              ),
            )}
          </div>
        ))}
      </>
    ),

    // 视力情况
    situation: () => (
      <>
        <p className={styles.title}>
          一、字段解说：
          <span style={{ color: 'red', fontSize: 13, fontWeight: 400 }}>
            *仅对有效实际筛查学生数进行统计分析
          </span>
        </p>
        {situationItem.commentary.map((item, index) => (
          <p className={styles.subtitle} key={index}>
            {item}
          </p>
        ))}
        <p className={styles.title} style={{ marginTop: 20 }}>
          二、近视、视力低下、戴镜等判断：
        </p>
        <div className={styles.situation}>
          {situationItem.myopia.map((item, eleIndex) => (
            <div key={eleIndex}>
              <p>{item.title}</p>
              {item.detail.map((eleItem) => (
                <p key={eleItem}>{eleItem}</p>
              ))}
            </div>
          ))}
        </div>
        <p className={styles.subtitle}>
          3、戴镜判断标准：选择了佩戴框架眼睛、佩戴隐形眼睛、佩戴角膜塑形镜
        </p>
      </>
    ),

    // 视力监测
    monitor: () => (
      <>
        <div className={styles.modular}>
          <p className={styles.title}>一、字段解说：</p>
          {monitorItem.map((item) => (
            <p className={styles.subtitle} key={item}>
              {item}
            </p>
          ))}
        </div>
        <Image width={750} src={monitorImg} />
      </>
    ),

    // 视力异常
    abnormal: () => (
      <>
        <div className={styles.modular}>
          <p className={styles.title}>一、字段解说：</p>
          {abnormalItem.map((item) => (
            <p className={styles.subtitle} key={item}>
              {item}
            </p>
          ))}
        </div>
        <p className={styles.title}>
          二、建议就诊判断标准：<span>数据来源于：儿童青少年近视防控适宜技术指南</span>
        </p>
        <Image width={750} src={abnormalImg} />
      </>
    ),
  };
  return (
    <Modal
      title={props.title}
      width={850}
      bodyStyle={{
        maxHeight: 700,
        overflow: 'auto',
      }}
      visible={props.visible}
      footer={null}
      onCancel={() => props.onCancel()}
    >
      {FormTemp[props?.tabKey!]?.()}
    </Modal>
  );
};
