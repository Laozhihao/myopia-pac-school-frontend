import type { ProColumns } from '@ant-design/pro-table';
import { isNotEmpty } from '@/utils/common';
import { SCREENSTATUS, EMPTY } from '@/utils/constant';

// 列合并
// export const onCellSpan = (_, index) => {
//   return { rowSpan: index ? 0 : 2 };
// };

// 其他眼病
export const otherDiseasesColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '其他眼病',
    dataIndex: 'eyeDiseases',
  },
];

// 身高体重
export const heightAndWeightColumns: ProColumns<API.StudentListItem>[] = [
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

// 通用
export const basicColumns: ProColumns<API.StudentListItem>[] = [
  {
    dataIndex: 'lateriality',
    width: 120,
  },
  {
    title: '戴镜情况',
    dataIndex: 'glassesTypeDes',
  },
];

export const columns: ProColumns<API.StudentListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '筛查标题',
    dataIndex: 'title',
    // render: (_, record) => {
    //   return <p title={record?.title}>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    // },
  },
  {
    title: '筛查时间段',
    dataIndex: 'startTime',
    // renderText: (val: any, record) =>
    //   `${val ? moment(val).format(DATE) : EMPTY} 至 ${
    //     record?.endTime ? moment(record?.endTime).format(DATE) : EMPTY
    //   }`,
  },
  {
    title: '筛查状态',
    dataIndex: 'releaseStatus',
    valueEnum: SCREENSTATUS,
  },
  {
    title: '预计筛查学生数',
    dataIndex: 'planScreeningNumbers',
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'realScreeningNumbers',
  },
  {
    title: '筛查机构',
    dataIndex: 'screeningOrgName',
  },
  {
    title: '通知日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
];
