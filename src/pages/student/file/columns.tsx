import { EMPTY } from '@/utils/constant';


export type ScreeningStudentRecordType = {
  resultId?: number;
  screeningDate?: React.Key;
  screeningCode?: string;
  isDoubleScreen?: boolean;
  screeningTitle?: string;
  screeningOrgName?: string
}

// 列合并
export const onCell = (_: any, index: number) => {
  return index === 2 ? { rowSpan: 2 } : {}
}

// 其他眼病
export const otherDiseasesColumns = [
  {
    title: '其他眼病',
    dataIndex: 'otherEyeDiseases',
    width: 400,
    renderText: (val: string[]) => `${val.length ? val.join('、') : EMPTY}`,
  },
];

// 身高体重 columns
export const heightAndWeightColumns = [
  {
    title: '身高（cm）',
    dataIndex: 'height',
    onCell,
  },
  {
    title: '体重（KG）',
    dataIndex: 'weight',
    onCell,
  },
];


// 通用
export const basicColumns = (data = [] as any[]) => [
  {
    dataIndex: 'lateriality',
    width: 120,
    renderText: (val: number) => (val === 0 ? '左眼（OS）' : '右眼（OD）'),
    fixed: 'left',
  },
  {
    title: '戴镜情况',
    dataIndex: 'glassesTypeDes',
  },
  {
    title: '裸眼视力',
    dataIndex: 'nakedVision',
  },
  {
    title: '矫正视力（戴镜视力）',
    dataIndex: 'correctedVision',

  },
  {
    title: '等效球镜（SE）',
    dataIndex: 'se',
  },
  {
    title: '球镜（S）',
    dataIndex: 'sph',
  },
  {
    title: '柱镜',
    dataIndex: 'cyl',
  },
  {
    title: '轴位（A）',
    dataIndex: 'axial',
  },
];

// 常见病
export const commonDiseasesColumns = [
  {
    title: '龋齿检查',
    key: 'saprodontiaStat',
  },
  {
    title: '脊柱弯曲 ',
    key: 'spineData',
  },
  {
    title: '血压情况',
    key: 'bloodPressureData',
  },
  {
    title: '疾病情况',
    key: 'diseasesHistoryData',
  },
  {
    title: '个人隐私',
    key: 'privacyData',
  },
];

// 筛查计划表格列
export const ScreeningRecordColumns = (data: { details?: any; isDoubleScreen?: any; screeningType?: any; }) => {
  const { isDoubleScreen, screeningType } = data;
  if (screeningType === 0) {
    return isDoubleScreen ? [...basicColumns(data?.details?.vision)] : [...basicColumns(data?.details?.vision), ...otherDiseasesColumns, ...heightAndWeightColumns];
  }
  // 常见病 
  return isDoubleScreen ? [...basicColumns(data?.details?.vision), ...heightAndWeightColumns] : [...basicColumns(data?.details?.vision), ...otherDiseasesColumns, ...commonDiseasesColumns, ...heightAndWeightColumns];
};

