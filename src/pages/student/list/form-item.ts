// import { doubleDefaultColConfig } from '@/utils/config-constant';
import { MYOPIAWARNOPTION } from '@/utils/constant';
import { STUDENTSELECTOPTIONS } from '@/utils/form-constant';

export const FormItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      type: 'inputGroup',
      selectInitial: 'name',
      value: 'inputKey',
      valueEnum: STUDENTSELECTOPTIONS,
      // col: doubleDefaultColConfig,
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
      valueEnum: MYOPIAWARNOPTION,
      value: 'visionLabel',
    },
  ],
  listTypeInfo: {
    gradeOptions: [], // 年级班级
  },
};
