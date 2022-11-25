import { SEXOPTION } from '@/utils/constant';
import { isPhoneNum86, isIdCard } from '@vistel/vistel-utils/lib/validator';
import { getNationOption } from '@/hook/district';
import { isPassport } from '@/utils/common';
import { IDENTITYINFORMATIONOPTIONS } from '@/utils/form-constant';

const nationArr = await getNationOption();
type StudentFormOptionsParmas = (params: any) => void;

const cache = {}; // 用来缓存身份证/证件号

/**
 * @desc 学生列表共同动态表单数据
 * @param validatorCb 身份证验证回调
 * @param type 1新增 2编辑
 */
export const studentFormOptions = (validatorCb?: StudentFormOptionsParmas, type = 1, ref?: any) => {
  !ref && Object.assign(cache, { idCard: '', passport: '' }); // 关闭弹窗时清空缓存

  return {
    filterList: [
      {
        label: '学籍号',
        type: 'input',
        value: 'sno',
        showLabel: true,
        rules: [
          {
            required: true,
            message: '请输入用户名',
          },
        ],
        fieldProps: {
          maxLength: 20,
        },
        col: {
          span: 24,
        },
      },
      {
        label: '姓名',
        type: 'input',
        value: 'name',
        showLabel: true,
        col: {
          span: 24,
        },
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
        showLabel: true,
        rules: [
          {
            required: true,
            message: '请选择性别',
          },
        ],
        col: {
          span: 24,
        },
      },
      {
        label: '年级班级',
        type: 'cascader',
        value: 'gradeIds',
        list: 'gradeOptions',
        showLabel: true,
        fieldNames: { label: 'name', value: 'id', children: 'child' },
        rules: [
          {
            required: true,
            message: '请选择年级班级',
          },
        ],
        col: {
          span: 24,
        },
      },
      {
        label: '证件号',
        type: 'inputGroup',
        value: 'inputValue',
        selectName: 'selectValue',
        inputName: 'inputValue',
        showLabel: true,
        selectInitial: ref?.current?.getFieldValue('passport') ? 'passport' : 'idCard',
        valueEnum: IDENTITYINFORMATIONOPTIONS,
        required: true,
        rules: [
          {
            validator(_: any, value: any) {
              const { selectValue } = ref?.current?.getFieldValue();
              const idCardFlag = selectValue === 'idCard'; // 证件号类型标志位
              if (!value)
                return idCardFlag
                  ? Promise.reject('请输入身份证号')
                  : Promise.reject('请输入护照号');

              // 身份证
              if (idCardFlag) {
                if (!isIdCard(value)) return Promise.reject('请输入正确的身份证号');
                type === 1 && validatorCb?.(value); // 获取出生日期
              }

              // 护照号
              if (!idCardFlag && !isPassport(value)) return Promise.reject('请输入正确的护照号');
              return Promise.resolve();
            },
          },
        ],
        fieldProps: {
          onChange: (val: string | number) => {
            const { inputValue } = ref?.current?.getFieldValue();
            cache[val === 'idCard' ? 'passport' : 'idCard'] = inputValue;
            ref?.current?.resetFields(['inputValue']); // 重置值和验证状态
            ref?.current?.setFieldsValue({ inputValue: cache[val] });
          },
        },
        inputChange: (e: { target: { value: any } }) => {
          const { selectValue } = ref?.current?.getFieldValue();
          cache[selectValue] = e.target.value;
        },
        col: {
          span: 24,
        },
      },
      {
        label: '出生日期',
        type: 'datePicker',
        value: 'birthday',
        showLabel: true,
        col: {
          span: 24,
        },
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
        showLabel: true,
        fieldNames: { label: 'cnName', value: 'code' },
        col: {
          span: 24,
        },
      },
      {
        label: '手机号码',
        type: 'input',
        value: 'parentPhone',
        showLabel: true,
        rules: [
          {
            validator(_: any, value: any) {
              if (value && !isPhoneNum86(value)) return Promise.reject('请输入正确的手机号码');
              return Promise.resolve();
            },
          },
        ],
        col: {
          span: 24,
        },
      },
    ],
    listTypeInfo: {
      sexList: SEXOPTION, // 性别
      nationList: nationArr, // 民族
      gradeOptions: [], // 年级班级
    },
  };
};
