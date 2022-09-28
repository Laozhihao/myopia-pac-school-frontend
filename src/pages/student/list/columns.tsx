import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY, MYOPIAWARNOPTION, TABLESEXOPTION } from '@/utils/constant';
import { visionColumn } from '@/utils/columns';
import { getShowIdCardText, getShowPassportText } from '@/utils/common';
import { Button, Badge } from 'antd';
import { history } from 'umi';

export const listColumns: ProColumns<API.StudentListItem>[] = [
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
    title: '身份证号/护照号',
    dataIndex: 'idCard',
    renderText: (val: string, record) =>
      val ? getShowIdCardText(val) : getShowPassportText(record?.passport),
  },
  ...visionColumn,
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
    title: '筛查次数',
    dataIndex: 'screeningCount',
    renderText: (val: number, record) => (
      <Button
        type="link"
        onClick={() =>
          history.push(`student/file?id=${record?.id}&studentId=${record?.studentId}&tabKey=2`)
        }
      >
        {val || 0}
      </Button>
    ),
  },
  {
    title: '最新筛查日期',
    dataIndex: 'lastScreeningTime',
    valueType: 'date',
  },
  {
    title: '医院就诊',
    dataIndex: 'numOfVisits',
  },
];
