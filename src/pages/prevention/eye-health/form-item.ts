import { EYEHEALTHYOPTION, INSTITUTIONALREVIEWOPTION } from '@/utils/form-constant';
import { BINDOPTIONS, MYOPIAWARNOPTION } from '@/utils/constant';

export const FormItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      type: 'inputGroup',
      selectInitial: 'sno',
      value: 'inputKey',
      valueEnum: EYEHEALTHYOPTION,
    },
    {
      label: '公众号在线档案',
      type: 'select',
      value: 'screeningType',
      valueEnum: BINDOPTIONS,
    },
    {
      label: '专业医疗机构复查',
      type: 'select',
      value: 'screeningType1',
      valueEnum: INSTITUTIONALREVIEWOPTION,
    },
    {
      label: '年级班级',
      type: 'cascader',
      value: 'gradeName',
      list: 'gradeOptions',
      fieldNames: { label: 'name', value: 'id', children: 'child' },
    },

    {
      label: '预警级别',
      type: 'select',
      value: 'screeningType33',
      valueEnum: MYOPIAWARNOPTION,
    },
  ],

  listTypeInfo: {
    gradeOptions: [], // 年级班级
  },
};
