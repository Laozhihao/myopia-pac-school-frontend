import type { ProColumns } from '@ant-design/pro-table';

export const listColumns: ProColumns<API.ScreenListItem>[] = [
  {
    title: '序号',
    dataIndex: 'name',
  },
  {
    title: '筛查标题',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '筛查时间段',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '筛查状态',
    dataIndex: 'callNo',
    hideInForm: true,
    renderText: (val: string) => `${val}${'万'}`,
  },
  {
    title: '预计筛查学生数',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '筛查机构',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
  },
  {
    title: '筛查内容',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
  },
  {
    title: '通知日期',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
  },
];
