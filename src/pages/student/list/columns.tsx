import type { ProColumns } from '@ant-design/pro-table';
import {
  EMPTY,
  MYOPIAWARNOPTION,
  MYOPIAWARNSELECTOPTION,
  STUDENTSELECTOPTIONS,
  TABLESEXOPTION,
} from '@/utils/constant';
import { visionColumn } from '@/utils/columns';
import { formatLength, convertData } from '@/utils/common';
import { Cascader, Button, Badge } from 'antd';
import { InputGroup } from '@/pages/components/input-group';
import { history } from 'umi';

export const listColumns: (
  gradeOption: any[],
  onSearch?: () => void,
) => ProColumns<API.StudentListItem>[] = (gradeOption: any[], onSearch) => [
  {
    title: '学号',
    dataIndex: 'sno',
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
    renderText: (val?: string) => (val ? formatLength(val, 4) : EMPTY),
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
    order: 2,
    renderFormItem: () => {
      return (
        <Cascader
          options={convertData(gradeOption)}
          placeholder="请选择"
          fieldNames={{ label: 'name', value: 'id', children: 'child' }}
          changeOnSelect={true}
        />
      );
    },
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    hideInTable: true,
    order: 3,
    renderFormItem: () => {
      return (
        <InputGroup
          option={STUDENTSELECTOPTIONS}
          bottom={-24}
          selectName={'select'}
          selectInitial={'name'}
          inputName={'input'}
          onPressEnter={onSearch}
        />
      );
    },
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
    valueType: 'select',
    fieldProps: {
      options: MYOPIAWARNSELECTOPTION,
    },
    order: 1,
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
