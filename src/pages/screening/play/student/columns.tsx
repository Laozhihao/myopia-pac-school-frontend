import type { ProColumns } from '@ant-design/pro-table';
import { TABLESEXOPTION } from '@/utils/constant';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '筛查编码',
    dataIndex: 'sndo',
  },
  {
    title: '学号',
    dataIndex: 'sno',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    title: '戴镜情况',
    dataIndex: 'a',
  },
  {
    title: '裸眼视力（右/左）',
    dataIndex: 'b',
  },
  {
    title: '矫正视力（右/左）',
    dataIndex: 'c',
  },
  {
    title: '球镜（右/左）',
    dataIndex: 'd',
  },
  {
    title: '未做检查原因',
    dataIndex: 'd',
  },
  {
    title: '数据完整性',
    dataIndex: 'd',
  },
];
