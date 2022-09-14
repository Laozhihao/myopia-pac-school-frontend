import type { ProColumns } from '@ant-design/pro-table';
import { SCREENSTATUS } from '@/utils/constant';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '检查日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
  {
    title: '配镜',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '医生诊断',
    dataIndex: 'title',
    // render: (_, record) => {
    //   return <p title={record?.title}>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    // },
  },
  {
    title: '处方',
    dataIndex: 'startTime',
  },
  {
    title: '就诊医院',
    dataIndex: 'releaseStatus',
    valueEnum: SCREENSTATUS,
  },
  {
    title: '医师',
    dataIndex: 'planScreeningNumbers',
  },
];
