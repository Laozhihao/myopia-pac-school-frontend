import { SEXOPTION } from '@/utils/constant';

export const studentFormOptions = {
  filterList: [
    {
      label: '学号',
      type: 'input',
      value: 'name',
      required: true,
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      col: 24,
    },
    {
      label: '姓名',
      type: 'input',
      value: 'name',
      col: 24,
    },
    {
      label: '性别',
      type: 'radio',
      value: 'sex',
      list: 'sexList',
      col: 24,
    },
    {
      label: '年级班级',
      type: 'cascader',
      value: 'grade',
      list: 'options',
      fieldNames: { label: 'label', value: 'value', children: 'child' },
      col: 24,
    },
    {
      label: '身份证',
      type: 'input',
      value: 'name',
      col: 24,
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'data',
      col: 24,
    },
    {
      label: '民族',
      type: 'select',
      value: 'nation',
      list: 'nationList',
      col: 24,
    },
    {
      label: '手机号码',
      type: 'input',
      value: 'phoneNumber',
      col: 24,
    },
    {
      label: '具体地址',
      type: 'textArea',
      value: 'textArea',
      fieldProps: {
        maxLength: 10,
        showCount: true,
      },
      col: 24,
    },
  ],
  listTypeInfo: {
    sexList: SEXOPTION,
    nationList: [],
    options: [],
  },
};
