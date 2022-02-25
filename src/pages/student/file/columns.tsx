import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY, STATE_TEXT } from '@/utils/constant';
import { MYOPIAWARNOPTION } from '@/utils/constant';
import { Badge } from 'antd';
import { visionResultColumn } from '@/utils/columns';
import { formatLength, typeNumberHandle, symbolHandle } from '@/utils/common';

export const listColumns: ProColumns<API.FileListItem>[] = [
  {
    title: '筛查日期',
    dataIndex: 'screeningDate',
    valueType: 'date',
    width: 150,
  },
  {
    title: '配镜情况',
    dataIndex: 'glassesType',
  },
  {
    title: '裸眼视力（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.nakedVision, 1)} / ${typeNumberHandle(val[0]?.nakedVision, 1)}`,
  },
  {
    title: '矫正视力（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.correctedVision, 1)} / ${typeNumberHandle(
        val[0]?.correctedVision,
        1,
      )}`,
  },
  {
    title: '球镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.sph, 2, 'D')} / ${symbolHandle(val[0]?.sph, 2, 'D')}`,
  },

  {
    title: '柱镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.cyl, 2, 'D')} / ${symbolHandle(val[0]?.cyl, 2, 'D')}`,
  },
  {
    title: '等效球镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.se, 2, 'D')} / ${symbolHandle(val[0]?.se, 2, 'D')}`,
  },
  {
    title: '轴位（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.axial, 0, '°')} / ${typeNumberHandle(val[0]?.axial, 0, '°')}`,
  },
  {
    title: '身高（cm）',
    dataIndex: 'height',
  },
  {
    title: '体重（KG）',
    dataIndex: 'weight',
  },
  ...visionResultColumn,

  {
    title: '视力预警',
    dataIndex: 'warningLevel',
    width: 200,
    renderText: (val?: number) =>
      typeof val === 'number' && [0, 1, 2, 3, 4].includes(val) ? (
        <Badge color={MYOPIAWARNOPTION[val]?.color} text={MYOPIAWARNOPTION[val]?.text} />
      ) : (
        EMPTY
      ),
  },
  {
    title: '其他眼病',
    dataIndex: 'otherEyeDiseases',
    width: 400,
    renderText: (val: string[]) => `${val.length ? val.join('、') : EMPTY}`,
  },
  {
    title: '筛查标题',
    dataIndex: 'screeningTitle',
    render: (_, record) => {
      return (
        <p title={record?.screeningTitle}>
          {record?.screeningTitle ? formatLength(record?.screeningTitle) : EMPTY}
        </p>
      );
    },
  },
];

/** ------------------------------------------------------- 查看详情列 */

// 默认第一列
const defaultColumns: ProColumns<API.FileDetailItem>[] = [
  {
    title: '',
    width: 150,
    dataIndex: 'eyes',
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
    renderText: ({ val }) => `${typeNumberHandle(val)}`,
  },
  {
    title: '柱镜',
    dataIndex: 'cyl',
    renderText: ({ val }) => `${typeNumberHandle(val)}`,
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
    renderText: ({ val }) => `${val} mmHg`,
  },
];

// 其他 columns
export const othersColumns: ProColumns<API.FileDetailItem>[] = [
  ...defaultColumns,
  {
    title: '裂隙灯',
    dataIndex: 'slitLampData',
    renderText: ({ val }) => STATE_TEXT[val],
  },
  {
    title: '眼位',
    dataIndex: 'ocularInspectionData',
    renderText: ({ val }) => STATE_TEXT[val],
  },
  {
    title: '眼底',
    dataIndex: 'fundusData',
    renderText: ({ val }) => STATE_TEXT[val],
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
    dataIndex: 'computerOptometry',
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
    dataIndex: 'other',
    columns: othersColumns,
  },
];
