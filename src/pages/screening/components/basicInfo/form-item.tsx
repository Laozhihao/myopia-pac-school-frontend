// import { defaultRulesConfig } from '@/utils/common';
import { InputGroup } from '@/components/DynamicForm/input-group';
import { getNationOption } from '@/hook/district';
import LazyCascader from '@/pages/components/lazy-cascader';
import { SEXOPTION, EDUCATIONOPTION, OCCUPATIONOPTION } from '@/utils/constant';
import { CERTIFICATESTYPEOPTIONS } from '@/utils/form-constant';
import { Form, Radio } from 'antd';

const nationArr = await getNationOption();
const commonConfig = {
  col: { span: 12 },
  showLabel: true,
};
export const FormItemOptions = (areaOption: any[]) => ({
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
      value: 'certificates',
      ...commonConfig,
      slot: <Form.Item label="证件号" style={{ marginBottom: 0 }} >
        <InputGroup valueEnum={CERTIFICATESTYPEOPTIONS} selectInitial="idCard" fieldProps={{
          onChange: e => console.log(e, '3'),
        }}></InputGroup>
      </Form.Item>,
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
      value: 'date',
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
      name="address"
      options={areaOption}
      fieldNames={{ label: 'name', value: 'code', children: 'child' }}
      originProps={{
        onChange: () => {},
      }}
    />
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
