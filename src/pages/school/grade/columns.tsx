import type { ProColumns } from '@ant-design/pro-table';

export const listColumns: ProColumns<API.GradeListItem>[] = [
  {
    title: '年级-班级',
    dataIndex: 'name',
    width: 400,
  },
  {
    title: '座位数',
    dataIndex: 'seatCount',
  },
];
