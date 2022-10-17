import { MYOPIAWARNOPTION } from '@/utils/constant';
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
      label: '学年(入学年份)',
      type: 'select',
      list: 'yearList',
      value: 'year',
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
      value: 'visionLabels',
    },
    {
      label: '戴镜情况',
      type: 'select',
      list: 'glassesTypeList',
      value: 'glassesType',
    },
    {
      label: '视力情况',
      type: 'select',
      list: 'visionTypeList',
      value: 'visionType',
    },
    {
      label: '屈光情况',
      type: 'select',
      list: 'refractionTypeList',
      value: 'refractionType',
    },
  ],
  listTypeInfo: {
    gradeOptions: [], // 年级班级
    yearList: [], // 学年
    glassesTypeList: [], // 戴镜情况
    visionTypeList: [], // 视力情况
    refractionTypeList: [], // 屈光情况
  },
};
