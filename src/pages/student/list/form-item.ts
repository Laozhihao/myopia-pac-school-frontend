import { STUDENTSELECTOPTIONS, MYOPIAWARNSELECTOPTION } from '@/utils/constant';

export const FormItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      type: 'inputGroup',
      selectInitial: 'name',
      value: 'inputKey',
      selectOption: STUDENTSELECTOPTIONS,
    },
    {
      label: '年级班级',
      type: 'cascader',
      value: 'gradeName',
      list: 'gradeOptions',
      fieldNames: { label: 'name', value: 'id', children: 'child' },
    },
    {
      label: '视力预警',
      type: 'select',
      value: 'visionLabel',
      list: 'visionLabelOptions',
    },
  ],
  listTypeInfo: {
    gradeOptions: [], // 年级班级
    visionLabelOptions: MYOPIAWARNSELECTOPTION, // 视力预警
  },
};
