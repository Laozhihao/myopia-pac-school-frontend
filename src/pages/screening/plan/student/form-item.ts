import { STUDENTSELECTOPTIONS } from '@/utils/form-constant';

export const FormItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      type: 'inputGroup',
      selectInitial: 'name',
      value: 'inputKey',
      valueEnum: STUDENTSELECTOPTIONS,
    },
    {
      label: '年级班级',
      type: 'cascader',
      value: 'gradeName',
      list: 'gradeOptions',
      fieldNames: { label: 'name', value: 'id', children: 'child' },
    },
  ],
  listTypeInfo: {
    gradeOptions: [], // 年级班级
  },
};
