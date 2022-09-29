import type { ProColumns } from '@ant-design/pro-table';
import { formatLength } from '@/utils/common';
import { DATE, EMPTY, CREATESTATUS } from '@/utils/constant';
import moment from 'moment';

export const listColumns: (show: (dom: any) => void) => ProColumns[] = (show) => [
  {
    title: '筛查标题',
    dataIndex: 'title',
    render: (_, record) => {
      return <p title={record?.title}>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    },
  },
  {
    title: '筛查时间段',
    dataIndex: 'startTime',
    renderText: (val: any, record) =>
      `${val ? moment(val).format(DATE) : EMPTY} 至 ${
        record?.endTime ? moment(record?.endTime).format(DATE) : EMPTY
      }`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: CREATESTATUS,
  },
  {
    title: '接收时间',
    dataIndex: 'acceptTime',
  },
  {
    title: '通知部门',
    dataIndex: 'noticeDeptName',
  },
  {
    title: '筛查内容',
    dataIndex: 'content',
    render: (dom) => {
      return <a onClick={() => show(dom)}>查看</a>;
    },
  },
];
