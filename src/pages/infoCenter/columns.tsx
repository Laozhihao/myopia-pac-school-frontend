import type { ProColumns } from '@ant-design/pro-table';

export const listColumns: ProColumns<API.NoticeListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 100,
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    width: 250,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    valueEnum: {
      1: { text: '已读', status: 'Processing' },
      0: { text: '未读', status: 'Default' },
    },
  },
];
