import type { ProColumns } from '@ant-design/pro-table';
import { MYOPIAWARNOPTION, STUDENTSELECTOPTIONS } from '@/utils/constant';
import { Cascader } from 'antd';
import { InputGroup } from '@/pages/components/input-group';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '学号',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'desc',
    valueType: 'textarea',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'desc',
    search: false,
  },
  {
    title: '年级-班级',
    dataIndex: 'grade',
    order: 2,
    renderFormItem: () => {
      return <Cascader options={[]} placeholder="请选择" />;
    },
  },
  {
    hideInForm: true,
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
  {
    title: '视力情况',
    dataIndex: 'callNo',
    search: false,
    renderText: (val: string) => `${val}${'万'}`,
  },
  {
    title: '视力预警',
    dataIndex: 'desc',
    valueEnum: MYOPIAWARNOPTION,
    order: 1,
  },
  {
    title: '筛查次数',
    dataIndex: 'desc',
    search: false,
  },
  {
    title: '最新筛查日期',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
    search: false,
  },
  {
    title: '医院就诊',
    dataIndex: 'updatedAt',
    valueType: 'dateTime',
    search: false,
  },
];
