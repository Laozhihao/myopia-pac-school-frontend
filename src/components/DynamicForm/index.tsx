import {
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Row, Col, Form, Cascader, Select, Input, Button } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { getPopupContainer } from '@/hook/ant-config';
import { defaultColConfig } from '@/utils/config-constant';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Option } = Select;

const defaultFieldNames = {
  label: 'label',
  value: 'value',
  children: 'child',
};

// 默认按钮配置类型
type FormButtonType = {
  type?: 'link' | 'text' | 'primary' | 'default' | 'ghost' | 'dashed';
  icon?: ReactNode;
  label?: string;
  event?: string;
  className?: string;
};
const buttonList: FormButtonType[] = [
  {
    type: 'primary',
    label: '搜索',
    event: 'onSearch',
    icon: <SearchOutlined />,
  },
  {
    type: 'default',
    label: '重置',
    event: 'onReset',
    className: 'reset-btn',
  },
];

// JSON数据生成表单

const DynamicForm: React.FC<API.PropsType> = (props) => {
  const { isNeedBtn = true } = props;
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
    input: ({ label, value, rules, tooltip, required, fieldProps }: API.FilterListType) => (
      <ProFormText
        name={value}
        label={label}
        tooltip={tooltip}
        rules={rules}
        required={required}
        placeholder={`请输入${label}`}
        fieldProps={fieldProps}
      />
    ),

    // inputGroup
    inputGroup: ({
      label,
      selectName = 'select',
      selectInitial,
      selectWidth,
      inputName = 'input',
      rules,
      required,
      selectChange,
      inputChange,
      selectOption = [],
    }: API.FilterListType) => (
      <Form.Item label={label} required={required}>
        <Input.Group compact style={{ display: 'flex', marginBottom: -24 }}>
          <Form.Item name={selectName} initialValue={selectInitial}>
            <Select
              placeholder="请选择"
              style={{ width: selectWidth ?? 140 }}
              onChange={selectChange}
              options={selectOption}
              getPopupContainer={getPopupContainer}
            />
          </Form.Item>
          <Form.Item
            name={inputName}
            style={{ width: 'inherit' }}
            rules={rules}
            required={required}
          >
            <Input placeholder="请输入" allowClear onChange={inputChange} />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    ),

    // 输入文本框
    textArea: ({ label, value, fieldProps, required, showLabel }: API.FilterListType) => (
      <ProFormTextArea
        label={showLabel ? label : ''}
        name={value}
        fieldProps={fieldProps}
        required={required}
      />
    ),

    // 下拉选择
    select: ({
      label,
      value,
      list,
      rules,
      required,
      showLabel,
      fieldNames = defaultFieldNames,
    }: API.FilterListType) => (
      <Form.Item label={showLabel ? label : ''} rules={rules} name={value} required={required}>
        <Select placeholder={`请选择${label}`} getPopupContainer={getPopupContainer}>
          {props.listTypeInfo[list].map((item) => (
            <Option value={item[fieldNames?.value]} key={item[fieldNames?.value]}>
              {item[fieldNames?.label]}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ),

    // 级联
    cascader: ({ label, value, list, rules, fieldNames, showLabel }: API.FilterListType) => (
      <Form.Item label={showLabel ? label : ''} rules={rules} name={value}>
        <Cascader
          options={props.listTypeInfo[list]}
          placeholder={`请选择${label}`}
          fieldNames={fieldNames}
          getPopupContainer={getPopupContainer}
        />
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
    datePicker: ({ label, rules, value, required, showLabel }: API.FilterListType) => (
      <ProFormDatePicker
        width="md"
        name={value}
        label={showLabel ? label : ''}
        rules={rules}
        required={required}
      />
    ),
  };

  return (
    <Row gutter={props.gutter ?? 40}>
      <div className={styles.item}>
        {formlist.map((item) => (
          <Col key={item.value} {...(item.col ?? defaultColConfig)}>
            {FormTemp[item.type](item)}
          </Col>
        ))}
        {props?.children}
      </div>
      {isNeedBtn ? (
        <div className={styles.btn}>
          {buttonList.map((eleItem, eleIndex) => (
            <Button
              key={eleIndex}
              type={eleItem?.type}
              icon={eleItem?.icon}
              className={eleItem?.className && styles[eleItem?.className]}
              onClick={eleItem?.event && props[eleItem?.event]}
            >
              {eleItem.label}
            </Button>
          ))}
        </div>
      ) : null}
    </Row>
  );
};

export default DynamicForm;
