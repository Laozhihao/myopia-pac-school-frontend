import {
  ProFormText,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Row, Col, Form, Cascader, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getPopupContainer } from '@/hook/ant-config';
import { defaultColConfig } from '@/utils/config-constant';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { InputGroup } from './input-group';
import { getOptions } from '@/utils/common';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
      (item: API.FilterListType) =>
        !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show),
    );
    setFormList(arr);
  }, [props.filterList]);

  // 表单种类
  const FormTemp = {
    input: ({
      label,
      value,
      rules,
      tooltip,
      fieldProps,
      showLabel,
      required,
    }: API.FilterListType) => (
      <ProFormText
        name={value}
        label={showLabel ? label : ''}
        tooltip={tooltip}
        rules={rules}
        placeholder={`请输入${label}`}
        fieldProps={fieldProps}
        required={required}
      />
    ),

    // inputGroup
    inputGroup: (item: API.FilterListType & { bottom?: number; onPressEnter?: () => void }) => (
      <Form.Item
        label={item?.showLabel ? item?.label : ''}
        style={{ marginBottom: 0 }}
        required={item?.required}
      >
        <InputGroup
          {...item}
          valueEnum={item?.valueEnum}
          selectOption={
            item?.valueEnum
              ? undefined
              : getOptions(props?.listTypeInfo?.[item?.list] ?? [], item?.fieldNames)
          }
          onPressEnter={props[item?.event || 'onSearch']}
        />
      </Form.Item>
    ),

    // 输入文本框
    textArea: ({ label, value, fieldProps, rules, showLabel, required }: API.FilterListType) => (
      <ProFormTextArea
        label={showLabel ? label : ''}
        name={value}
        fieldProps={fieldProps}
        rules={rules}
        required={required}
        placeholder={`请输入${label}`}
      />
    ),

    // 下拉选择
    select: ({
      label,
      value,
      list,
      rules,
      fieldProps,
      showLabel,
      valueEnum,
      fieldNames,
      required,
    }: API.FilterListType) => (
      <ProFormSelect
        label={showLabel ? label : ''}
        placeholder={`请选择${label}`}
        name={value}
        fieldProps={{
          getPopupContainer,
          ...fieldProps,
        }}
        rules={rules}
        required={required}
        valueEnum={valueEnum}
        options={valueEnum ? undefined : getOptions(props?.listTypeInfo?.[list] ?? [], fieldNames)}
      />
    ),

    // 级联
    cascader: ({ label, value, list, rules, fieldNames, showLabel }: API.FilterListType) => (
      <Form.Item label={showLabel ? label : ''} rules={rules} name={value}>
        <Cascader
          options={props?.listTypeInfo?.[list] ?? []}
          changeOnSelect
          placeholder={`请选择${label}`}
          fieldNames={fieldNames}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>
    ),

    // 单选框
    radio: ({
      label,
      rules,
      list,
      value,
      showLabel,
      fieldProps,
      fieldNames,
      required,
    }: API.FilterListType) => (
      <ProFormRadio.Group
        label={showLabel ? label : ''}
        name={value}
        rules={rules}
        required={required}
        fieldProps={fieldProps}
        options={getOptions(props?.listTypeInfo?.[list] ?? [], fieldNames)}
      />
    ),

    // 时间选择器
    datePicker: ({ label, rules, value, showLabel, fieldProps, required }: API.FilterListType) => (
      <ProFormDatePicker
        name={value}
        label={showLabel ? label : ''}
        rules={rules}
        required={required}
        fieldProps={{
          style: { width: '100%' },
          getPopupContainer,
          locale,
          ...fieldProps,
        }}
      />
    ),
  };

  return (
    <Row gutter={props.gutter ?? 40}>
      <div className={styles.item}>
        {formlist.map((item) => (
          <Col key={item.value} {...(item?.col ?? defaultColConfig)}>
            {item.slot ?? FormTemp[item.type](item)}
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
