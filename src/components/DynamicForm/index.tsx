import {
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Row, Col, Form, Cascader, Select, Button } from 'antd';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getPopupContainer } from '@/hook/ant-config';
import { defaultColConfig } from '@/utils/config-constant';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { InputGroup } from './input-group';

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
    input: ({
      label,
      value,
      rules,
      tooltip,
      required,
      fieldProps,
      showLabel,
    }: API.FilterListType) => (
      <ProFormText
        name={value}
        label={showLabel ? label : ''}
        tooltip={tooltip}
        rules={rules}
        required={required}
        placeholder={`请输入${label}`}
        fieldProps={fieldProps}
      />
    ),

    // inputGroup
    inputGroup: (item: API.FilterListType & { bottom?: number; onPressEnter?: () => void }) => (
      <InputGroup {...item} onPressEnter={props[item?.event || 'onSearch']} />
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
    radio: ({ label, rules, list, value, required, showLabel }: API.FilterListType) => (
      <ProFormRadio.Group
        label={showLabel ? label : ''}
        name={value}
        rules={rules}
        required={required}
        options={props.listTypeInfo[list]}
      />
    ),

    // 时间选择器
    datePicker: ({ label, rules, value, required, showLabel, fieldProps }: API.FilterListType) => (
      <ProFormDatePicker
        width="md"
        name={value}
        label={showLabel ? label : ''}
        rules={rules}
        required={required}
        fieldProps={{ ...fieldProps, getPopupContainer }}
      />
    ),
  };

  return (
    <Row gutter={props.gutter ?? 40}>
      <div className={styles.item}>
        {formlist.map((item) => (
          <Col key={item.value} {...(item?.col ?? defaultColConfig)}>
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
