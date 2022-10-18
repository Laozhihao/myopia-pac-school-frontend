import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY, MYOPIAWARNOPTION } from '@/utils/constant';
import { Badge } from 'antd';
import { correctionOption } from '@/utils/form-constant';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '学号',
    dataIndex: 'sno',
    fixed: 'left',
  },
  {
    title: '学年',
    dataIndex: 'yearStr',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    title: '视力情况',
    dataIndex: 'vision',
  },
  {
    title: '屈光情况',
    dataIndex: 'refraction',
  },
  {
    title: '近视矫正',
    dataIndex: 'correction',
    valueEnum: correctionOption,
  },
  {
    title: '视力预警',
    dataIndex: 'visionLabel',
    width: 200,
    renderText: (val?: number) =>
      typeof val === 'number' && [0, 1, 2, 3, 4].includes(val) ? (
        <Badge color={MYOPIAWARNOPTION[val]?.color} text={MYOPIAWARNOPTION[val]?.text} />
      ) : (
        EMPTY
      ),
  },
];
