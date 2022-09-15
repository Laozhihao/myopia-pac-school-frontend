import type { ProColumns } from '@ant-design/pro-table';
import { formatLength } from '@/utils/common';
import { SCREENSTATUS, DATE, EMPTY, RELEASESTATUS } from '@/utils/constant';
import moment from 'moment';

export const listColumns: (show: (dom: any) => void) => ProColumns<API.ScreenListItem>[] = (
  show,
) => [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
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
    title: '筛查状态',
    dataIndex: 'screeningStatus',
    valueEnum: SCREENSTATUS,
  },

  {
    title: '发布状态',
    dataIndex: 'releaseStatus',
    valueEnum: RELEASESTATUS,
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
    title: '筛查内容',
    dataIndex: 'content',
    render: (dom) => {
      return <a onClick={() => show(dom)}>查看</a>;
    },
  },
  {
    title: '通知日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
];
