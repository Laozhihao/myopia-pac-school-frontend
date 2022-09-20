import { getNationOption } from '@/hook/district';
import LazyCascader from '@/pages/components/lazy-cascader';
import { isPassport } from '@/utils/common';
import { SEXOPTION, EDUCATIONOPTION, OCCUPATIONOPTION } from '@/utils/constant';
import {  IDENTITYINFORMATIONOPTIONS } from '@/utils/form-constant';
import { isPhoneNum86, isIdCard } from '@vistel/vistel-utils/lib/validator';
import { Form, Radio } from 'antd';


const cache = {}; // 用来缓存身份证/证件号

const nationArr = await getNationOption();
const commonConfig = {
  col: { span: 12 },
  showLabel: true,
};
export const FormItemOptions = (ref?: any, areaOption?: any[], onAreaChange?: (e:any) => void) => ({
  filterList: [
    {
      label: '学号',
      type: 'input',
      value: 'sno',
      ...commonConfig,
      fieldProps: {
        maxLength: 20,
      },
    },
    {
      label: '民族',
      type: 'select',
      value: 'nation',
      fieldNames: { label: 'cnName', value: 'code' },
      ...commonConfig,
      list: 'nationList',
    },
    {
      label: '姓名',
      type: 'input',
      value: 'name',
      ...commonConfig,
    },
    {
      label: '性别',
      type: 'radio',
      value: 'gender',
      list: 'genderList',
      ...commonConfig,
    },
    {
      label: '证件号',
      type: 'inputGroup',
      value: 'inputValue',
      selectName: 'selectValue',
      inputName: 'inputValue',
      ...commonConfig,
      selectInitial: ref?.current?.getFieldValue('passport') ? 'passport' : 'idCard',
      valueEnum: IDENTITYINFORMATIONOPTIONS,
      rules: [
        {
          validator(_: any, value: any) {
            const { selectValue } = ref?.current?.getFieldValue();
            const idCardFlag = selectValue === 'idCard'; // 证件号类型标志位
            if (!value)
              return idCardFlag ? Promise.reject('请输入身份证号') : Promise.reject('请输入护照号');

            // 身份证
            if (idCardFlag && !isIdCard(value)) return Promise.reject('请输入正确的身份证号');

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
    },
    {
      value: 'isNewbornWithoutIdCard',
      col: {
        span: 12,
      },
      slot:<Form.Item name="isNewbornWithoutIdCard">
        <Radio style={{ marginLeft: 150 }}>新生儿暂无身份证号</Radio>
      </Form.Item>
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'birthday',
      ...commonConfig,
    },
    {
      label: '手机号码',
      type: 'input',
      value: 'parentPhone',
      ...commonConfig,
    },
    {
      value: 'school',
      col: {
        span: 12,
      },
      slot: (
      <Form.Item label="学校">
        <p>筛查学校</p>
      </Form.Item>
      ),
    },
    {
      label: '年级-班级',
      value: 'gradeIds',
      type: 'cascader',
      list: 'gradeOptions',
      fieldNames: { label: 'name', value: 'id', children: 'child' },
      ...commonConfig,
    },
    {
      value: 'address',
      col: {
        span: 12,
      },
      slot: <LazyCascader
      label="省市县镇（街道）"
      name="addressArr"
      options={areaOption}
      fieldNames={{ label: 'name', value: 'code', children: 'child' }}
      originProps={{
        onChange: (e:any) => onAreaChange?.(e),
      }}
    />
    },
    {
      label: '委会类型',
      value: 'type',
      type: 'select',
      list: 'typeList',
      fieldNames: { label: 'name', value: 'id' },
      ...commonConfig,
    },
    {
      label: '筛查内容',
      type: 'textArea',
      value: 'remark',
      ...commonConfig,
    },
  ],
  listTypeInfo: {
    nationList: nationArr, // 民族
    genderList: SEXOPTION, // 性别
    gradeOptions: [], // 年级班级
    typeList: [], // 委会类型
  },
});

export const FormInfoItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      label: '父亲姓名',
      type: 'input',
      value: 'fatherName',
      ...commonConfig,
      fieldProps: {
        maxLength: 15,
      },
    },
    {
      label: '母亲姓名',
      type: 'input',
      value: 'motherName',
      ...commonConfig,
      fieldProps: {
        maxLength: 15,
      },
    },
    {
      label: '联系电话',
      type: 'input',
      value: 'fatherPhone',
      ...commonConfig,
    },
    {
      label: '联系电话',
      type: 'input',
      value: 'motherPhone',
      ...commonConfig,
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'fatherBirthday',
      ...commonConfig,
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'motherBirthday',
      ...commonConfig,
    },

    {
      label: '文化程度',
      type: 'select',
      value: 'fatherDiploma',
      list: 'diplomaList',
      ...commonConfig,
    },
    {
      label: '文化程度',
      type: 'select',
      value: 'motherDiploma',
      list: 'diplomaList',
      ...commonConfig,
    },

    {
      label: '职业',
      type: 'select',
      value: 'fatherProfession',
      list: 'professionList',
      ...commonConfig,
    },
    {
      label: '职业',
      type: 'select',
      value: 'motherProfession',
      list: 'professionList',
      ...commonConfig,
    },
  ],
  listTypeInfo: {
    nationList: [], // 民族
    genderList: SEXOPTION, // 性别
    identityList: [{ label: ' 新生儿暂无身份证号', value: '11' }],
    areaList: [], // 行政区域
    typeList: [], // 委会类型
    diplomaList: EDUCATIONOPTION, // 文化程度
    professionList: OCCUPATIONOPTION, // 职业
  },
};
