import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY } from '@/utils/constant';
import { getPercentage, getTotalNumber } from '@/utils/common';



export const screeningColumns: ProColumns<API.ScreenResultListItem>[] = [
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
    title: '纳入视力统计学生数',
    dataIndex: 'validScreeningNumbers',
  },
];

// 幼儿园 视力情况 key 值更改
export const childSituationColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '视力低常（人数/占比）',
    dataIndex: 'myopiaNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '平均视力（左/右）',
    dataIndex: 'myopiaLevelLight',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '远视储备不足（人数/占比）',
    dataIndex: 'myopiaLevelMiddle',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '屈光参差（人数/占比）',
    dataIndex: 'myopiaLevelHigh',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },

  {
    title: '屈光不足（人数/占比）',
    dataIndex: 'lowVisionNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
];

// 小学及以上 视力情况
export const teenagersSituationColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '近视（人数/占比）',
    dataIndex: 'myopiaNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.validScreeningNumbers)}`,
  },
  {
    title: '低度近视（人数/占比）',
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
    title: '重度近视（人数/占比）',
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
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },

  // 夜戴角膜塑形镜 key值替换
  {
    title: '夜戴角膜塑形镜（人数/占比）',
    dataIndex: 'wearingGlassesNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
];

export const monitorColumns: ProColumns<API.ScreenResultListItem>[] = [
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
       record?.realScreeningNumbers,
     )} `,
  },
  {
    title: '0级预警（人数/占比）',
    dataIndex: 'visionLabel0Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
  {
    title: '1级预警（人数/占比）',
    dataIndex: 'visionLabel1Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
  {
    title: '2级预警（人数/占比）',
    dataIndex: 'visionLabel2Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },

  {
    title: '3级预警（人数/占比）',
    dataIndex: 'visionLabel3Numbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
];

export const abnormalColumns: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '建议就诊学生数（人数/占比）',
    dataIndex: 'treatmentAdviceNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
  {
    title: '去医院就诊数（人数/占比）',
    dataIndex: 'reviewNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
  {
    title: '绑定公众号数（人数/占比）',
    dataIndex: 'bindMpNumbers',
    renderText: (val: number, record) =>
      `${val} / ${getPercentage(val, record?.realScreeningNumbers)}`,
  },
];

// type WarnColumnsType = {
//   gradeOption?: any[]; // 年级班级
//   show?: (dom: any) => void; // 查看医生反馈func
// };

// // 预警跟踪
// export const warnColumns: (params: WarnColumnsType) => ProColumns<API.ScreenWarnListItem>[] = ({
//   gradeOption,
//   show,
// }) => [
//   {
//     title: '学号',
//     dataIndex: 'sno',
//     width: 150,
//     search: false,
//   },
//   {
//     title: '姓名',
//     dataIndex: 'name',
//     search: false,
//   },
//   {
//     title: '性别',
//     dataIndex: 'gender',
//     valueEnum: TABLESEXOPTION,
//     search: false,
//   },
//   {
//     title: '年级-班级',
//     dataIndex: 'gradeName',
//     order: 3,
//     renderFormItem: () => {
//       return (
//         <Cascader
//           options={convertData(gradeOption, 'classes')}
//           placeholder="请选择"
//           fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
//         />
//       );
//     },
//     renderText: (val: string, record) => `${val}-${record?.className}`,
//   },
//   ...visionColumn,
//   {
//     title: '视力预警',
//     dataIndex: 'warningLevel',
//     renderText: (val?: number) =>
//       typeof val === 'number' && [0, 1, 2, 3, 4].includes(val) ? (
//         <Badge color={MYOPIAWARNOPTION[val]?.color} text={MYOPIAWARNOPTION[val]?.text} />
//       ) : (
//         EMPTY
//       ),
//     valueType: 'select',
//     fieldProps: {
//       options: MYOPIAWARNSELECTOPTION,
//     },
//     width: 200,
//     order: 1,
//   },
//   {
//     title: '绑定公众号',
//     dataIndex: 'isBindMp',
//     valueEnum: BINDOPTIONS,
//     renderText: (val: boolean | null | undefined) =>
//       `${typeof val === 'boolean' ? (val ? '已绑定' : '未绑定') : EMPTY}`,
//     order: 2,
//   },
//   {
//     title: '医院复查',
//     dataIndex: 'isReview',
//     valueEnum: REVIEWOPTIONS,
//     renderText: (val: boolean) => `${val ? '已去' : '未去'}`,
//   },
//   {
//     title: '复查反馈',
//     dataIndex: 'visitResult',
//     search: false,
//     render: (_, record) => {
//       return record?.visitResult ? <a onClick={() => show?.(record)}>查看</a> : EMPTY;
//     },
//   },
//   {
//     title: '防控建议-课桌椅',
//     dataIndex: 'height',
//     search: false,
//     render: (_, record) => {
//       return record?.height ? (
//         <>
//           <div>{getFixedNum(record?.height, 1)}cm</div>
//           <div>
//             <div>
//               课桌：{getTypeNumShow(record, 'deskType')}号，建议桌面高：{record?.deskAdviseHeight}
//             </div>
//             <div>
//               课椅：{getTypeNumShow(record, 'chairType')}号，建议座面高：{record?.chairAdviseHeight}
//             </div>
//           </div>
//         </>
//       ) : (
//         EMPTY_TEXT
//       );
//     },
//   },
//   {
//     title: '防控建议-座位调整',
//     dataIndex: 'myopiaLevel',
//     search: false,
//     renderText: (val?: number | string) => (val && val > 2 ? '与黑板相距5-6米' : EMPTY_TEXT),
//   },
// ];

export const diseasesColumns1: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '龋失补牙数',
    dataIndex: 'a',
  },
  {
    title: '龋均',
    dataIndex: 'reviewNumbers',
  },
  {
    title: '龋患（人数/占比）',
    dataIndex: 'bindMpNumbers',
  },

  {
    title: '龋失（人数/占比）',
    dataIndex: 'ad',
  },
  {
    title: '龋补（人数/占比）',
    dataIndex: 'reviewNumbers',
  },
  {
    title: '龋患（失、补）（人数/占比）',
    dataIndex: 'bindMpNumbers',
  },

  {
    title: '龋患(失、补）构成比（牙数/占比）',
    dataIndex: 'bindMpNumbers',
  },
];

export const diseasesColumns2: ProColumns<API.ScreenResultListItem>[] = [
  {
    title: '脊柱弯曲',
    dataIndex: 'a',
  },
  {
    title: '血压偏高',
    dataIndex: 'reviewNumbers',
  },
  {
    title: '超重',
    dataIndex: 'bindMpNumbers',
  },

  {
    title: '肥胖',
    dataIndex: 'ad',
  },
  {
    title: '营养不良',
    dataIndex: 'reviewNumbers',
  },
  {
    title: '生长迟缓',
    dataIndex: 'bindMpNumbers',
  },
];
