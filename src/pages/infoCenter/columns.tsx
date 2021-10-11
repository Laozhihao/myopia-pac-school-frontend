import type { ProColumns } from '@ant-design/pro-table';

export const columns: ProColumns<API.NoticeListItem>[] = [
  {
    title: '序号',
    dataIndex: 'name',
  },
  {
    title: '时间',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '状态',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '消息内容',
    dataIndex: 'callNo',
    hideInForm: true,
    renderText: (val: string) => `${val}${'万'}`,
  },
];
