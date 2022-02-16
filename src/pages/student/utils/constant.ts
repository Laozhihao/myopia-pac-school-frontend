import { SEXOPTION } from '@/utils/constant';
import { isPhoneNum86, isIdCard } from '@vistel/vistel-utils/lib/validator';
import { getNationOption } from '@/hook/district';

const nationArr = await getNationOption();
type StudentFormOptionsParmas = (params: any) => void;

/**
 * @desc 学生列表共同动态表单数据
 * @param validatorCb 身份证验证回调
 * @param type 1新增 2编辑
 */
export const studentFormOptions = (validatorCb: StudentFormOptionsParmas, type = 1, ref?: any) => ({
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
      fieldProps: {
        maxLength: 20,
      },
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
      fieldProps: {
        maxLength: 20,
      },
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
      label: '证件号',
      type: 'inputGroup',
      selectName: 'selectValue',
      inputName: 'inputValue',
      selectOption: [
        { label: '身份证', value: 'idCard' },
        { label: '护照', value: 'passport' },
      ],
      required: true,
      rules: [
        {
          required: true,
          message:
            ref?.current?.getFieldValue('selectValue') === 'idCard'
              ? '请输入身份证'
              : '请输入证件号',
        },
        {
          validator(_: any, value: any) {
            if (value && !isIdCard(value)) return Promise.reject('请输入正确的身份证号');
            if (value && type === 1) validatorCb?.(value); // 获取出生日期
            return Promise.resolve();
          },
        },
      ],
      onChange: () => {
        console.log(ref?.current?.getFieldValue('selectValue'), 'ref');
      },
      col: 24,
    },
    // {
    //   label: '身份证',
    //   type: 'input',
    //   value: 'idCard',
    //   rules: [
    //     {
    //       required: true,
    //       message: '请输入身份证',
    //     },
    //     {
    //       validator(_: any, value: any) {
    //         if (value && !isIdCard(value)) return Promise.reject('请输入正确的身份证号');
    //         if (value && type === 1) validatorCb?.(value); // 获取出生日期
    //         return Promise.resolve();
    //       },
    //     },
    //   ],
    //   fieldProps: type === 2 ? { type: 'password' } : undefined,
    //   col: 24,
    // },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'birthday',
      col: 24,
      rules: [
        {
          required: true,
          message: '请选择出生日期',
        },
      ],
    },
    {
      label: '民族',
      type: 'select',
      value: 'nation',
      list: 'nationList',
      fieldNames: { label: 'cnName', value: 'code' },
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
  ],
  listTypeInfo: {
    sexList: SEXOPTION, // 性别
    nationList: nationArr, // 民族
    gradeOptions: [], // 年级班级
  },
});
