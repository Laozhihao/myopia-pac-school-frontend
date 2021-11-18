import type { ProColumns } from '@ant-design/pro-table';
import { MYOPIAWARNOPTION, STUDENTSELECTOPTIONS, TABLESEXOPTION } from '@/utils/constant';
import { visionColumn } from '@/utils/columns';
import { Cascader } from 'antd';
import { InputGroup } from '@/pages/components/input-group';

export const listColumns: (gradeOption: any[]) => ProColumns<API.StudentListItem>[] = (
  gradeOption: any[],
) => [
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
    order: 2,
    renderFormItem: () => {
      return (
        <Cascader
          options={gradeOption}
          placeholder="请选择"
          fieldNames={{ label: 'name', value: 'id', children: 'child' }}
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
        />
      );
    },
  },
  ...visionColumn,
  {
    title: '视力预警',
    dataIndex: 'visionLabel',
    valueEnum: MYOPIAWARNOPTION,
    order: 1,
  },
  {
    title: '筛查次数',
    dataIndex: 'screeningCount',
    search: false,
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
