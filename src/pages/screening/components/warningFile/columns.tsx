import type { ProColumns } from '@ant-design/pro-table';
import { SCREENSTATUS } from '@/utils/constant';

export const columns: ProColumns<API.StudentListItem>[] = [
  {
    title: '筛查日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
  {
    title: '筛查标题',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '视力情况',
    dataIndex: 'title',
    // render: (_, record) => {
    //   return <p title={record?.title}>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    // },
  },
  {
    title: '视力标签',
    dataIndex: 'startTime',
  },
  {
    title: '医院复查',
    dataIndex: 'releaseStatus',
    valueEnum: SCREENSTATUS,
  },
  {
    title: '复查反馈',
    dataIndex: 'planScreeningNumbers',
  },
  {
    title: '防控建议-课桌椅',
    dataIndex: 'realScreeningNumbers',
  },
  {
    title: '防控建议-座位调整',
    dataIndex: 'screeningOrgName',
  },
];
