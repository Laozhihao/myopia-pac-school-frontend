import type { ProColumns } from '@ant-design/pro-table';
import { GLASSESTYPE, MYOPIATYPE, HYPEROPIATYPE, ASTIGMATISMTYPE, EMPTY } from './constant';

// 视力情况 戴镜
export const visionColumn: ProColumns<API.MyopiaType>[] = [
  {
    title: '视力情况',
    dataIndex: 'glassesType',
    search: false,
    renderText: (val: string, record) => {
      const descArr = [] as string[];
      const { myopiaLevel, hyperopiaLevel, astigmatismLevel } = record;
      myopiaLevel && descArr.push(MYOPIATYPE[myopiaLevel]);
      hyperopiaLevel && descArr.push(HYPEROPIATYPE[hyperopiaLevel]);
      astigmatismLevel && descArr.push(ASTIGMATISMTYPE[astigmatismLevel]);
      const descStr = descArr.length ? `，${descArr.join('、')}` : '';
      return !val ? EMPTY : `${GLASSESTYPE[val]}${descStr}`;
    },
  },
];

// 视力结论 戴镜
export const visionResultColumn: ProColumns<API.MyopiaType>[] = [
  {
    title: '视力结论',
    dataIndex: 'myopiaLevel',
    search: false,
    renderText: (val: string, record) => {
      const descArr = [] as string[];
      const { hyperopiaLevel, astigmatismLevel } = record;
      val && descArr.push(MYOPIATYPE[val]);
      hyperopiaLevel && descArr.push(HYPEROPIATYPE[hyperopiaLevel]);
      astigmatismLevel && descArr.push(ASTIGMATISMTYPE[astigmatismLevel]);
      const descStr = descArr.length ? `${descArr.join('、')}` : EMPTY;
      return descStr;
    },
  },
];
