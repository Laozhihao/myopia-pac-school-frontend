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
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
    search: false,
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    title: '身份证号/护照号',
    dataIndex: 'idCard',
    search: false,
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
    // valueType: 'select',
    // fieldProps: {
    //   options: MYOPIAWARNSELECTOPTION,
    // },
    // order: 1,
  },
  {
    title: '筛查次数',
    dataIndex: 'screeningCount',
    search: false,
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
    search: false,
  },
  {
    title: '医院就诊',
    dataIndex: 'numOfVisits',
    search: false,
  },
];
