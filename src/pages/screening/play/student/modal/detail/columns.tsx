import type { ProColumns } from '@ant-design/pro-table';


/** ------------------------------------------------------- 查看详情列 */

// 默认第一列
const defaultColumns: ProColumns<API.FileDetailItem>[] = [
  {
    title: '',
    width: 150,
    dataIndex: 'eyeType',
    render: (text) => {
      return <span>{text ? '右眼' : '左眼'}</span>
    },
  },
];

// 视力columns
export const visionColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '裸眼视力',
    dataIndex: 'nakedVision',
  },
  {
    title: '矫正视力',
    dataIndex: 'correctedVision',
  },
];

// 验光 columns
export const optometryColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '球镜',
    dataIndex: 'sph',
  },
  {
    title: '柱镜',
    dataIndex: 'cyl',
  },
  {
    title: '轴向',
    dataIndex: 'axial',
  },
];

// 生物测量 columns
export const biometryColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '角膜前表面曲率K1',
    dataIndex: 'k1',
  },
  {
    title: '角膜前表面曲率K2',
    dataIndex: 'k2',
  },
  {
    title: '垂直方向角膜散光度数AST',
    dataIndex: 'ast',
  },
  {
    title: '角膜直径WTW',
    dataIndex: 'wtw',
  },
  {
    title: '眼轴总长度AL',
    dataIndex: 'al',
  },
  {
    title: '角膜中央厚度CCT',
    dataIndex: 'cct',
  },
  {
    title: '前房深度AD',
    dataIndex: 'ad',
  },
  {
    title: '晶体厚度LT',
    dataIndex: 'lt',
  },
  {
    title: '玻璃体厚度VT',
    dataIndex: 'vt',
  },
];

// 眼压 columns
export const eyePressureColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '眼压',
    dataIndex: 'pressure',
    render: (text) => <span>{text}mmHg</span>,
  },
];

// 其他 columns
export const othersColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '裂隙灯',
    dataIndex: 'slitLamp',
  },
  {
    title: '眼位',
    dataIndex: 'ocularInspection',
  },
  {
    title: '眼底',
    dataIndex: 'fundus',
  },
  {
    title: '其他眼病',
    width: 300,
    dataIndex: 'otherEyeDiseases',
  },
];

// 身高体重 columns
export const heightAndWeightColumns: ProColumns<API.FileDetailItem>[] = [
  {
    title: '身高（cm）',
    dataIndex: 'height',
  },
  {
    title: '体重（KG）',
    dataIndex: 'weight',
  },
];

// 检查类型
export const inspectType: API.FileDetailInspectItem[] = [
  {
    title: '视力检查',
    dataIndex: 'visionData',
    columns: visionColumns,
  },
  {
    title: '电脑验光',
    dataIndex: 'computerOptometryData',
    columns: optometryColumns,
  },
  {
    title: '身高体重',
    dataIndex: 'heightAndWeightData',
    columns: heightAndWeightColumns,
  },
  {
    title: '生物测量',
    dataIndex: 'biometricData',
    columns: biometryColumns,
  },
  {
    title: '小瞳验光',
    dataIndex: 'pupilOptometryData',
    columns: optometryColumns,
  },
  {
    title: '眼压',
    dataIndex: 'eyePressureData',
    columns: eyePressureColumns,
  },
  {
    title: '其他',
    dataIndex: 'otherData',
    columns: othersColumns,
  },
];
