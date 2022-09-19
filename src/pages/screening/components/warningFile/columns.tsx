import { MYOPIAWARNOPTION, EMPTY } from '@/utils/constant';
import { Badge } from 'antd';
import { INSTITUTIONALREVIEWOPTION } from '@/utils/form-constant';


export const columns = (show?: (record: any) => void) => ([
  {
    title: '筛查日期',
    dataIndex: 'screeningDate',
    valueType: 'date',
  },
  {
    title: '筛查标题',
    dataIndex: 'screeningTitle',
  },
  // ...visionColumn,
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
  {
    title: '医院复查',
    dataIndex: 'isVisited',
    valueEnum: INSTITUTIONALREVIEWOPTION,
  },
  {
    title: '复查反馈',
    dataIndex: 'visitResult',
    search: false,
    render: (_: any, record: { visitResult: any }) => {
      return record?.visitResult ? <a onClick={() => show?.(record)}>查看</a> : EMPTY;
    },
  },
    {
    title: '防控建议-课桌椅',
    dataIndex: 'height',
  },
  {
    title: '防控建议-座位调整',
    dataIndex: 'myopiaLevel',
  },
]);

