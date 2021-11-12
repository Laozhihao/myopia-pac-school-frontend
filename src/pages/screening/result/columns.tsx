import type { ProColumns } from '@ant-design/pro-table';
import { Cascader } from 'antd';
import {
  MYOPIAWARNOPTION,
  BINDOPTIONS,
  REVIEWOPTIONS,
  EMPTY,
  TABLESEXOPTION,
} from '@/utils/constant';
import { getPercentage, getTotalNumber } from '@/utils/common';

export const firstColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '预计筛查学生数',
    dataIndex: 'planScreeningNumbers',
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'realScreeningNumbers',
  },
  {
    title: '视力筛查完成率',
    dataIndex: 'realScreeningNumbers',
    renderText: (val: number, record) =>
      val && record?.planScreeningNumbers
        ? `${((val / record?.planScreeningNumbers) * 100).toFixed(2)} % `
        : EMPTY,
  },
  {
    title: '有效实际筛查学生数',
    dataIndex: 'validScreeningNumbers',
  },
];

export const secondColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '近视（人数/占比）',
    dataIndex: 'myopiaNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '轻度近视（人数/占比）',
    dataIndex: 'myopiaLevelLight',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '中度近视（人数/占比）',
    dataIndex: 'myopiaLevelMiddle',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '高度近视（人数/占比）',
    dataIndex: 'myopiaLevelHigh',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },

  {
    title: '视力低下（人数/占比）',
    dataIndex: 'lowVisionNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '平均视力（左/右）',
    dataIndex: 'avgLeftVision',
    renderText: (val: number, record) => `${val} / ${record?.avgRightVision} `,
  },
  {
    title: '戴镜情况（人数/占比）',
    dataIndex: 'wearingGlassesNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
];

export const thirdColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '加入预警学生数（人数/占比）',
    dataIndex: 'visionLabel0Numbers',
    renderText: (val: number, record) =>
      `${getTotalNumber([
        val,
        record?.visionLabel1Numbers,
        record?.visionLabel2Numbers,
        record?.visionLabel3Numbers,
        record?.myopiaLevelInsufficient,
      ])} / 
     ${getPercentage(
       getTotalNumber([
         val,
         record?.visionLabel1Numbers,
         record?.visionLabel2Numbers,
         record?.visionLabel3Numbers,
         record?.myopiaLevelInsufficient,
       ]),
       record?.validScreeningNumbers,
     )} `,
  },
  {
    title: '0级预警（人数/占比）',
    dataIndex: 'visionLabel0Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '1级预警（人数/占比）',
    dataIndex: 'visionLabel1Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '2级预警（人数/占比）',
    dataIndex: 'visionLabel2Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },

  {
    title: '3级预警（人数/占比）',
    dataIndex: 'visionLabel3Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '远视储备不足（人数/占比）',
    dataIndex: 'myopiaLevelInsufficient',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
];

export const fourthColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '建议就诊学生数（人数/占比）',
    dataIndex: 'treatmentAdviceNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '去医院就诊数（人数/占比）',
    dataIndex: 'reviewNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '绑定公众号数（人数/占比）',
    dataIndex: 'bindMpNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
];

export const warnColumns: (gradeOption: any[]) => ProColumns<API.ScreenWarnListItem>[] = (
  gradeOption: any[],
) => [
  {
    title: '学号',
    dataIndex: 'sno',
    width: 150,
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
    search: false,
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    order: 3,
    renderFormItem: () => {
      return (
        <Cascader
          options={gradeOption}
          placeholder="请选择"
          fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
        />
      );
    },
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  // {
  //   title: '视力情况',
  //   dataIndex: 'name',
  //   search: false,
  // },
  {
    title: '视力预警',
    dataIndex: 'warningLevel',
    valueEnum: MYOPIAWARNOPTION,
    order: 1,
  },
  {
    title: '绑定公众号',
    dataIndex: 'isBindMq',
    valueEnum: BINDOPTIONS,
    renderText: (val: boolean) => `${val ? '已绑定' : '未绑定'}`,
    order: 2,
  },
  {
    title: '医院复查',
    dataIndex: 'isReview',
    valueEnum: REVIEWOPTIONS,
    renderText: (val: boolean) => `${val ? '已去医院' : '未去医院'}`,
  },
  // {
  //   title: '复查反馈',
  //   dataIndex: 'name',
  //   search: false,
  // },
  // {
  //   title: '防控建议-课桌椅',
  //   dataIndex: 'name',
  //   search: false,
  // },
  // {
  //   title: '防控建议-座位调整',
  //   dataIndex: 'name',
  //   search: false,
  // },
];
