import type { ProColumns } from '@ant-design/pro-table';
// import { formatLength } from '@/utils/common';
import { SCREENSTATUS } from '@/utils/constant';

export const listColumns: ProColumns<API.ScreenListItem>[] = [
  {
    title: '学籍号',
    dataIndex: 'index',
  },
  {
    title: '姓名',
    dataIndex: 'title',
    // render: (_, record) => {
    //   return <p title={record?.title}>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    // },
  },
  {
    title: '年级-班级',
    dataIndex: 'startTime',
  },
  {
    title: '视力情况',
    dataIndex: 'releaseStatus',
    valueEnum: SCREENSTATUS,
  },
  {
    title: '屈光情况',
    dataIndex: 'planScreeningNumbers',
  },
  {
    title: '近视矫正',
    dataIndex: 'realScreeningNumbers',
  },
  {
    title: '视力预警',
    dataIndex: 'screeningOrgName',
  },
  {
    title: '防控建议',
    dataIndex: 'content',
  },
  {
    title: '公众号在线档案',
    dataIndex: 'content',
  },
  {
    title: '通知日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
];
