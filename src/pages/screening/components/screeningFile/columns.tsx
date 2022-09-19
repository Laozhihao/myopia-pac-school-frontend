import { isNotEmpty } from '@vistel/vistel-utils/lib/tool';
import { EMPTY } from '@/utils/constant';
import { getCorrectNum, getFixedNum } from '@/utils/common';


// 其他眼病
export const otherDiseasesColumns = [
  {
    title: '其他眼病',
    dataIndex: 'eyeDiseases',
    width: 200,
  },
];

// 身高体重
export const heightAndWeightColumns = [
  {
    title: '身高（cm）',
    dataIndex: 'heightAndWeightData',
    renderText: (text: API.ObjectType) => (isNotEmpty(text?.height) ? text?.height : EMPTY),
  },
  {
    title: '体重（KG）',
    dataIndex: 'heightAndWeightData',
    renderText: (text: API.ObjectType) => (isNotEmpty(text?.height) ? text?.weight : EMPTY),
  },
];

// 常见病
export const commonDiseasesColumns = (commonDiseases, data) => [
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

// 通用
export const basicColumns = (data = [] as any[]) => [
  {
    dataIndex: 'lateriality',
    key: 'lateriality',
    width: 120,
    renderText: ( text: number ) => (text === 0 ? '左眼（OS）' : '右眼（OD）'),
    fixed: 'left',
  },
  {
    title: '戴镜情况',
    dataIndex: 'glassesTypeDes',
    key: 'glassesTypeDes',
    // customRender: ({ text, index, record }) => {
    //   const { glassesType } = record;
    //   const leftIndex = data.findIndex(item => !item?.lateriality);
    //   const rightIndex = data.findIndex(item => item?.lateriality);
    //   const leftVision = typeof data[leftIndex]?.okDegree === 'number' ? `${getCorrectNum(data[leftIndex]?.okDegree, 2, '+')}D` : EMPTY;
    //   const rightVision = typeof data[rightIndex]?.okDegree === 'number' ? `${getCorrectNum(data[rightIndex]?.okDegree, 2, '+')}D` : EMPTY;

    //   const childrenText = h('p', {}, [`${text || EMPTY}`, h('br'), `${glassesType === 3 ? `度数：右眼：${rightVision}、左眼：${leftVision}` : ''}`]);
    //   return handleRowSpan(index, childrenText);
    // },
    render: (text, record, index) => {
      return <span>111</span>
    },
  },
  {
    title: '裸眼视力',
    dataIndex: 'nakedVision',
    key: 'nakedVision',
    renderText: ( text: React.Key ) =>
      // 保留一位小数
      (isNotEmpty(text) ? getFixedNum(text, 1) : EMPTY),
  },
  {
    title: '矫正视力（戴镜视力）',
    dataIndex: 'correctedVision',
    key: 'correctedVision',
    renderText: ( text: React.Key ) =>
      // 保留一位小数
      (isNotEmpty(text) ? getFixedNum(text, 1) : EMPTY),

  },
  {
    title: '等效球镜（SE）',
    dataIndex: 'se',
    key: 'se',
    render: (text: number, record: { isHyperopia: any } ) => {
      const { isHyperopia } = record;
      // 是否需要显示远视，需要根据年龄条件判断
      const hyperopiaText = isHyperopia ? '远视' : '';
      // 远近视文本
      const myopiaText = text < 0 ? '近视' : hyperopiaText;
      const max = 0.5;
      // -0.5 <= text <= 0.5 无文案
      const ametropiaText = Math.abs(text) <= max
        ? ''
        : myopiaText;
      // 保留两位小数
      return isNotEmpty(text)
        ? `${getCorrectNum(text, 2)}D，${ametropiaText}${getFixedNum(Math.abs(text) * 100, 0)}度`
        : EMPTY;
    },
  },
  {
    title: '球镜（S）',
    dataIndex: 'sph',
    key: 'sph',
    renderText: ( text: any ) => (isNotEmpty(text)
      ? `${getCorrectNum(text, 2, '+')}D`
      : EMPTY),
  },
  {
    title: '柱镜（C）',
    dataIndex: 'cyl',
    key: 'cyl',
    render: ( text: number ) => {
      let descText;
      // -0.5 <= text <= 0.5 无文案
      const max = 0.5;
      Math.abs(text) <= max
        ? descText = ''
        : descText = '散光';
      // 保留两位小数
      return isNotEmpty(text)
        ? `${getCorrectNum(text, 2)}D，${descText}${getFixedNum(Math.abs(text) * 100, 0)}度`
        : EMPTY;
    },
  },
  {
    title: '轴位（A）',
    dataIndex: 'axial',
    key: 'axial',
    renderText: ( text: any ) => (isNotEmpty(text)
      ? `${text}，散光的轴位为${text}度方向`
      : EMPTY),
  },
];

export const columns = (data: { details?: any; isDoubleScreen?: any; screeningType?: any; }) => {
  const { isDoubleScreen, screeningType } = data;
  if (screeningType === 0) {
    return isDoubleScreen ? [...basicColumns(data?.details?.vision)] : [...basicColumns(data?.details?.vision), ...otherDiseasesColumns, ...heightAndWeightColumns];
  }
  // 常见病
  return isDoubleScreen ? [...basicColumns(data?.details?.vision), ...heightAndWeightColumns] : [...basicColumns(data?.details?.vision), ...otherDiseasesColumns, ...commonDiseasesColumns(data?.details?.commonDiseases, data), ...heightAndWeightColumns];
};