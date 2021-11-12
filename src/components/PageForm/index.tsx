import {
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Row, Col, Form, Cascader, Select } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

// JSON数据生成表单

const PageForm: React.FC<API.PropsType> = (props) => {
  const [formlist, setFormList] = useState([] as API.FilterListType[]);

  // 过滤表单显示 增加show 字段防止后续可能需要权限显示
  useEffect(() => {
    const arr = props.filterList.filter(
      (item) => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show),
    );
    setFormList(arr);
  }, []);

  // 表单种类
  const FormTemp = {
    input: ({ label, value, rules, tooltip, required }: API.FilterListType) => (
      <ProFormText
        name={value}
        label={label}
        tooltip={tooltip}
        rules={rules}
        required={required}
        placeholder={`请输入${label}`}
      />
    ),

    // 输入文本框
    textArea: ({ label, value, fieldProps, required }: API.FilterListType) => (
      <ProFormTextArea label={label} name={value} fieldProps={fieldProps} required={required} />
    ),

    // 下拉选择
    select: ({ label, value, list, rules, required, fieldNames }: API.FilterListType) => (
      <Form.Item label={label} rules={rules} name={value} required={required}>
        <Select placeholder="请选择">
          {props.listTypeInfo[list].map((item) => (
            <Option value={item[fieldNames?.value]} key={item[fieldNames?.value]}>
              {item[fieldNames?.label]}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),

    // 级联
    cascader: ({ label, value, list, rules, fieldNames }: API.FilterListType) => (
      <Form.Item label={label} rules={rules} name={value}>
        <Cascader options={props.listTypeInfo[list]} placeholder="请选择" fieldNames={fieldNames} />
      </Form.Item>
    ),

    // 单选框
    radio: ({ label, rules, list, value, required }: API.FilterListType) => (
      <ProFormRadio.Group
        label={label}
        name={value}
        rules={rules}
        required={required}
        options={props.listTypeInfo[list]}
      />
    ),

    // 时间选择器
    datePicker: ({ label, rules, value, required }: API.FilterListType) => (
      <ProFormDatePicker width="md" name={value} label={label} rules={rules} required={required} />
    ),
  };

  return (
    <Row gutter={props.gutter ?? 40}>
      {formlist.map((item) => (
        <Col key={item.value} span={item.col ?? 8}>
          {FormTemp[item.type](item)}
        </Col>
      ))}
      {props?.children}
    </Row>
  );
};

export default PageForm;
