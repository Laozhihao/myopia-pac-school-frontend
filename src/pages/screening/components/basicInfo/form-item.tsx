// import { defaultRulesConfig } from '@/utils/common';
import { SEXOPTION, EDUCATIONOPTION, OCCUPATIONOPTION } from '@/utils/constant';
import { Form, Input } from 'antd';

const commonConfig = {
  col: { span: 12 },
  showLabel: true,
};
export const FormItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      label: '学号',
      type: 'input',
      value: 'number',
      ...commonConfig,
      fieldProps: {
        maxLength: 20,
      },
    },
    {
      label: '民族',
      type: 'select',
      value: 'nation',
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
      ...commonConfig,
      slot: <Form.Item label="证件号"></Form.Item>,
    },
    {
      type: 'radio',
      value: 'identity',
      list: 'identityList',
      col: {
        span: 12,
      },
      fieldProps: {
        style: { marginLeft: 150 },
      },
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'date',
      ...commonConfig,
    },
    {
      label: '手机号码',
      type: 'input',
      value: 'number',
      ...commonConfig,
    },
    {
      value: 'school',
      col: {
        span: 12,
        // push: 12,
      },
      slot: (
        <Form.Item label="学校">
          <Input></Input>
        </Form.Item>
      ),
    },
    {
      label: '省市县镇（街道）',
      value: 'school',
      type: 'cascader',
      list: 'areaList',
      showLabel: true,
      col: {
        span: 12,
        // offset: 1,
      },
    },
    {
      label: '委会类型',
      value: 'type',
      type: 'select',
      list: 'typeList',
      showLabel: true,
      col: {
        span: 12,
        // offset: 12,
      },
    },
    {
      label: '筛查内容',
      type: 'textArea',
      value: 'remark',
      ...commonConfig,
    },
  ],
  listTypeInfo: {
    nationList: [], // 民族
    genderList: SEXOPTION, // 性别
    identityList: [{ label: ' 新生儿暂无身份证号', value: '11' }],
    areaList: [], // 行政区域
    typeList: [], // 委会类型
  },
};

export const FormInfoItemOptions: Pick<API.PropsType, 'filterList' | 'listTypeInfo'> = {
  filterList: [
    {
      label: '父亲姓名',
      type: 'input',
      value: 'name1',
      ...commonConfig,
      fieldProps: {
        maxLength: 15,
      },
    },
    {
      label: '母亲姓名',
      type: 'input',
      value: 'name2',
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
      value: 'birthday1',
      ...commonConfig,
    },
    {
      label: '出生日期',
      type: 'datePicker',
      value: 'birthday2',
      ...commonConfig,
    },

    {
      label: '文化程度',
      type: 'select',
      value: 'diploma1',
      list: 'diplomaList',
      ...commonConfig,
    },
    {
      label: '文化程度',
      type: 'select',
      value: 'diploma2',
      list: 'diplomaList',
      ...commonConfig,
    },

    {
      label: '职业',
      type: 'select',
      value: 'profession1',
      list: 'professionList',
      ...commonConfig,
    },
    {
      label: '职业',
      type: 'select',
      value: 'profession2',
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
