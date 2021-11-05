import { SEXOPTION } from '@/utils/constant';
import { isPhoneNum86, isIdCard } from '@vistel/vistel-utils/lib/validator';

export const studentFormOptions = {
  filterList: [
    {
      label: '学号',
      type: 'input',
      value: 'sno',
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
      rules: [
        {
          required: true,
          message: '请输入姓名',
        },
      ],
    },
    {
      label: '性别',
      type: 'radio',
      value: 'gender',
      list: 'sexList',
      rules: [
        {
          required: true,
          message: '请选择性别',
        },
      ],
      col: 24,
    },
    {
      label: '年级班级',
      type: 'cascader',
      value: 'gradeIds',
      list: 'gradeOptions',
      fieldNames: { label: 'name', value: 'id', children: 'child' },
      rules: [
        {
          required: true,
          message: '请选择年级班级',
        },
      ],
      col: 24,
    },
    {
      label: '身份证',
      type: 'input',
      value: 'idCard',
      rules: [
        {
          required: true,
          message: '请输入身份证',
        },
        {
          validator(_: any, value: any) {
            if (value && !isIdCard(value)) return Promise.reject('请输入正确的身份证号');
            return Promise.resolve();
          },
        },
      ],
      col: 24,
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'birthday',
      col: 24,
    },
    {
      label: '民族',
      type: 'select',
      value: 'nation',
      list: 'nationList',
      fieldNames: { label: 'cnName', value: 'enName' },
      col: 24,
    },
    {
      label: '手机号码',
      type: 'input',
      value: 'parentPhone',
      rules: [
        {
          validator(_: any, value: any) {
            if (value && !isPhoneNum86(value)) return Promise.reject('请输入正确的手机号码');
            return Promise.resolve();
          },
        },
      ],
      col: 24,
    },
    {
      label: '居住地址',
      type: 'cascader',
      value: 'addressIds',
      list: 'addressOptions',
      fieldNames: { label: 'name', value: 'code', children: 'child' },
      col: 24,
    },
    {
      label: '具体地址',
      type: 'textArea',
      value: 'address',
      col: 24,
    },
  ],
  listTypeInfo: {
    sexList: SEXOPTION,
    nationList: [],
    gradeOptions: [],
    addressOptions: [],
  },
};
