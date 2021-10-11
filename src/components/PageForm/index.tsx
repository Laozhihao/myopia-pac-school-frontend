import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Card, Row, Col, Button, Form, Cascader } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const PageForm: React.FC<API.PropsType> = (props) => {
  const [formlist, setFormList] = useState([] as API.FilterListType[]);
  const formRef = useRef<ProFormInstance>();

  // 过滤表单显示 增加show 字段防止后续可能需要权限显示
  useEffect(() => {
    const arr = props.filterList.filter(
      (item) => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show),
    );
    setFormList(arr);
  }, [props.filterList]);

  // 表单种类
  const FormTemp = {
    input: ({ label, value, rules, tooltip }: API.FilterListType) => (
      <ProFormText
        name={value}
        label={label}
        tooltip={tooltip}
        rules={rules}
        placeholder={`请输入${label}`}
      />
    ),

    // 输入文本框
    textArea: ({ label, value, fieldProps }: API.FilterListType) => (
      <ProFormTextArea label={label} name={value} fieldProps={fieldProps} />
    ),

    // 下拉选择
    select: ({ label, value, list, rules }: API.FilterListType) => (
      <ProFormSelect
        options={props.listTypeInfo[list]}
        name={value}
        label={label}
        rules={rules}
        placeholder="请选择"
      />
    ),

    // 级联
    cascader: ({ label, value, list, rules, fieldNames }: API.FilterListType) => (
      <Form.Item label={label} rules={rules} name={value}>
        <Cascader options={props.listTypeInfo[list]} placeholder="请选择" fieldNames={fieldNames} />
      </Form.Item>
    ),

    // 单选框
    radio: ({ label, rules, list, value }: API.FilterListType) => (
      <ProFormRadio.Group
        label={label}
        name={value}
        rules={rules}
        options={props.listTypeInfo[list]}
      />
    ),

    // 时间选择器
    datePicker: ({ label, rules, value }: API.FilterListType) => (
      <ProFormDatePicker width="md" name={value} label={label} rules={rules} />
    ),
  };

  const onReset = () => {
    formRef?.current?.resetFields();
    props.onReset?.();
  };

  // 搜索重置模块
  const FormFootTemp = (
    <Col flex={1}>
      <Row justify="end">
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={() => props.onSearch?.(formRef?.current?.getFieldsValue())}
        >
          搜 索
        </Button>
        <Button onClick={onReset}>重 置</Button>
      </Row>
    </Col>
  );

  // 通用的模块
  const FormContain = (
    <Row gutter={props.gutter ?? 40}>
      {formlist.map((item, index) => (
        <Col key={index} span={item.col ?? 8}>
          {FormTemp[item.type](item)}
        </Col>
      ))}
      {props?.type === 'form' && FormFootTemp}
    </Row>
  );

  return props.type === 'form' ? (
    <Card className={styles.card}>
      <ProForm layout={props.layout ?? 'horizontal'} submitter={false} formRef={formRef}>
        {FormContain}
      </ProForm>
    </Card>
  ) : (
    <>{FormContain}</>
  );
};

export default PageForm;
