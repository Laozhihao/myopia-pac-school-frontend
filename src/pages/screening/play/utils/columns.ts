import {
  ASTIGMATISM_LEVEL,
  EMPTY,
  GLASSES_TYPE_LIST,
  HYPEROPIA_LEVEL,
  MYOPIA_LEVEL,
} from '@/utils/constant';

/**
 * @desc 视力情况、视力标签
 * @param isEllipsis 是否需要显示...
 */
export const visionColumn = [
  {
    title: '视力情况',
    key: 'glassesType',
    dataIndex: 'glassesType',
    render: (text: any, record: any) => {
      const descArr = [] as string[];
      // 视力低下、筛查性近视、近视、远视、散光 等级
      const {
        lowVision,
        isAstigmatism,
        isHyperopia,
        isMyopia,
        screeningMyopia,
        myopiaLevel,
        hyperopiaLevel,
        astigmatismLevel,
      } = record;
      lowVision && descArr.push('视力低下');
      // 夜戴角膜塑形镜没有等级
      if (text === 3) {
        isMyopia && descArr.push('近视');
        isHyperopia && descArr.push('远视');
        isAstigmatism && descArr.push('散光');
      } else {
        screeningMyopia && descArr.push(MYOPIA_LEVEL[screeningMyopia]);
        myopiaLevel && descArr.push(MYOPIA_LEVEL[myopiaLevel]);
        hyperopiaLevel && descArr.push(HYPEROPIA_LEVEL[hyperopiaLevel]);
        astigmatismLevel && descArr.push(ASTIGMATISM_LEVEL[astigmatismLevel]);
      }
      const descStr = descArr.length ? `，${descArr.join('、')}` : '';

      const result = text === null ? EMPTY : `${GLASSES_TYPE_LIST[text]}${descStr}`;
      return result;
    },
  },
];
