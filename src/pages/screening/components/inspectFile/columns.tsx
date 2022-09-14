import type { ProColumns } from '@ant-design/pro-table';
import { SCREENSTATUS } from '@/utils/constant';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '检查日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
  {
    title: '对应月龄',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '检查前-转诊',
    dataIndex: 'title',
  },
  {
    title: '眼病筛查及视力评估',
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
  {
    title: '状态',
    dataIndex: 'realScreeningNumbers',
  },
];
