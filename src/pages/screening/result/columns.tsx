import type { ProColumns } from '@ant-design/pro-table';

export const screeningColumns: ProColumns[] = [
  {
    title: '预计筛查学生数',
    dataIndex: 'planScreeningNum',
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'realScreeningNum',
  },
  {
    title: '视力筛查完成率',
    dataIndex: 'finishRatio',
  },
  {
    title: '纳入视力统计学生数',
    dataIndex: 'validScreeningNum',
  },
];

// 幼儿园 视力情况 key 值更改
export const childSituationColumns: ProColumns[] = [
  {
    title: '视力低常（人数/占比）',
    dataIndex: 'lowVisionNum',
    renderText: (val: number, record) => `${val} / ${record?.lowVisionRatio}`,
  },
  {
    title: '平均视力（左/右）',
    dataIndex: 'avgLeftVision',
    renderText: (val: number, record) => `${val} / ${record?.avgRightVision}`,
  },
  {
    title: '远视储备不足（人数/占比）',
    dataIndex: 'myopiaLevelInsufficientNum',
    renderText: (val: number, record) => `${val} / ${record?.myopiaLevelInsufficientRatio}`,
  },
  {
    title: '屈光参差（人数/占比）',
    dataIndex: 'anisometropiaNum',
    renderText: (val: number, record) => `${val} / ${record?.anisometropiaRatio}`,
  },

  {
    title: '屈光不足（人数/占比）',
    dataIndex: 'ametropiaNum',
    renderText: (val: number, record) => `${val} / ${record?.ametropiaRatio}`,
  },
];

// 小学及以上 视力情况
export const teenagersSituationColumns: ProColumns[] = [
  {
    title: '近视（人数/占比）',
    dataIndex: 'myopiaNum',
    renderText: (val: number, record) => `${val} / ${record?.myopiaRatio}`,
  },
  {
    title: '近视前期（人数/占比）',
    dataIndex: 'myopiaLevelEarlyNum',
    renderText: (val: number, record) => `${val} / ${record?.myopiaLevelEarlyRatio}`,
  },
  {
    title: '低度近视（人数/占比）',
    dataIndex: 'lowMyopiaNum',
    renderText: (val: number, record) => `${val} / ${record?.myopiaLevelEarlyRatio}`,
  },
  {
    title: '高度近视（人数/占比）',
    dataIndex: 'highMyopiaNum',
    renderText: (val: number, record) => `${val} / ${record?.highMyopiaRatio}`,
  },

  {
    title: '视力低下（人数/占比）',
    dataIndex: 'lowVisionNum',
    renderText: (val: number, record) => `${val} / ${record?.lowVisionRatio}`,
  },
  {
    title: '平均视力（左/右）',
    dataIndex: 'avgLeftVision',
    renderText: (val: number, record) => `${val} / ${record?.avgRightVision} `,
  },
  {
    title: '戴镜情况（人数/占比）',
    dataIndex: 'wearingGlassesNum',
    renderText: (val: number, record) => `${val} / ${record?.wearingGlassesRatio}`,
  },

  // 夜戴角膜塑形镜 key值替换
  {
    title: '夜戴角膜塑形镜（人数/占比）',
    dataIndex: 'nightWearingOrthokeratologyLensesNum',
    renderText: (val: number, record) =>
      `${val} / ${record?.nightWearingOrthokeratologyLensesRatio}`,
  },
];

export const monitorColumns: ProColumns[] = [
  {
    title: '加入预警学生数（人数/占比）',
    dataIndex: 'visionWarningNum',
    renderText: (val: number, record) => `${val} / ${record?.visionWarningRatio}`,
  },
  {
    title: '0级预警（人数/占比）',
    dataIndex: 'visionLabel0Num',
    renderText: (val: number, record) => `${val} / ${record?.visionLabel0Ratio}`,
  },
  {
    title: '1级预警（人数/占比）',
    dataIndex: 'visionLabel1Num',
    renderText: (val: number, record) => `${val} / ${record?.visionLabel1Ratio}`,
  },
  {
    title: '2级预警（人数/占比）',
    dataIndex: 'visionLabel2Num',
    renderText: (val: number, record) => `${val} / ${record?.visionLabel2Ratio}`,
  },

  {
    title: '3级预警（人数/占比）',
    dataIndex: 'visionLabel3Num',
    renderText: (val: number, record) => `${val} / ${record?.visionLabel3Ratio}`,
  },
];

export const abnormalColumns: ProColumns[] = [
  {
    title: '建议就诊学生数（人数/占比）',
    dataIndex: 'treatmentAdviceNum',
    renderText: (val: number, record) => `${val} / ${record?.treatmentAdviceRatio}`,
  },
  {
    title: '去医院就诊数（人数/占比）',
    dataIndex: 'reviewNum',
    renderText: (val: number, record) => `${val} / ${record?.reviewRatio}`,
  },
  {
    title: '绑定公众号数（人数/占比）',
    dataIndex: 'bindMpNum',
    renderText: (val: number, record) => `${val} / ${record?.bindMpRatio}`,
  },
];

export const diseasesColumns1: ProColumns[] = [
  {
    title: '龋失补牙数',
    dataIndex: 'dmftNum',
  },
  {
    title: '龋均',
    dataIndex: 'dmftRatio',
  },
  {
    title: '龋患（人数/占比）',
    dataIndex: 'saprodontiaNum',
    renderText: (val: number, record) => `${val} / ${record?.saprodontiaRatio}`,
  },

  {
    title: '龋失（人数/占比）',
    dataIndex: 'saprodontiaLossNum',
    renderText: (val: number, record) => `${val} / ${record?.saprodontiaLossRatio}`,
  },
  {
    title: '龋补（人数/占比）',
    dataIndex: 'saprodontiaRepairNum',
    renderText: (val: number, record) => `${val} / ${record?.saprodontiaRepairRatio}`,
  },
  {
    title: '龋患（失、补）（人数/占比）',
    dataIndex: 'saprodontiaLossAndRepairNum',
    renderText: (val: number, record) => `${val} / ${record?.saprodontiaLossAndRepairRatio}`,
  },

  {
    title: '龋患(失、补）构成比（牙数/占比）',
    dataIndex: 'saprodontiaLossAndRepairTeethNum',
    renderText: (val: number, record) => `${val} / ${record?.saprodontiaLossAndRepairTeethRatio}`,
  },
];

export const diseasesColumns2: ProColumns[] = [
  {
    title: '脊柱弯曲',
    dataIndex: 'abnormalSpineCurvatureNum',
    renderText: (val: number, record) => `${val} / ${record?.abnormalSpineCurvatureRatio}`,
  },
  {
    title: '血压偏高',
    dataIndex: 'highBloodPressureNum',
    renderText: (val: number, record) => `${val} / ${record?.highBloodPressureRatio}`,
  },
  {
    title: '超重',
    dataIndex: 'overweightNum',
    renderText: (val: number, record) => `${val} / ${record?.overweightRatio}`,
  },

  {
    title: '肥胖',
    dataIndex: 'obeseNum',
    renderText: (val: number, record) => `${val} / ${record?.obeseRatio}`,
  },
  {
    title: '营养不良',
    dataIndex: 'malnourishedNum',
    renderText: (val: number, record) => `${val} / ${record?.malnourishedRatio}`,
  },
  {
    title: '生长迟缓',
    dataIndex: 'stuntingNum',
    renderText: (val: number, record) => `${val} / ${record?.stuntingRatio}`,
  },
];
