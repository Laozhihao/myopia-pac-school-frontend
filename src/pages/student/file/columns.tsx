import type { ProColumns } from '@ant-design/pro-table';

export const listColumns: ProColumns<API.FileListItem>[] = [
  {
    title: '筛查日期',
    dataIndex: 'name',
  },
  {
    title: '配镜情况',
    dataIndex: 'desc',
  },
  {
    title: '裸眼视力（右/左)',
    dataIndex: 'desc',
  },
  {
    title: '矫正视力（右/左',
    dataIndex: 'desc',
  },
  {
    title: '球镜（右/左)',
    dataIndex: 'desc',
  },

  {
    title: '柱镜（右/左)',
    dataIndex: 'desc',
  },
  {
    title: '等效求镜（右/左',
    dataIndex: 'desc',
  },
  {
    title: '轴位（右/左)',
    dataIndex: 'desc',
  },
  {
    title: '视力结论',
    dataIndex: 'callNo',
    hideInForm: true,
    renderText: (val: string) => `${val}${'万'}`,
  },
  {
    title: '其他眼病',
    dataIndex: 'desc',
  },
  {
    title: '筛查标题',
    dataIndex: 'desc',
  },
];
