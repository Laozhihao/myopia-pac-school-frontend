import { Input, Form } from 'antd';
import { ProFormSelect } from '@ant-design/pro-form';
import { useContext, useState } from 'react';
import styles from './index.less';
import { TableListCtx } from '@/hook/ant-config';

type InputGroupType = {
  bottom?: number;
  selectOption?: any[];
  onPressEnter?: () => void;
  inputChange?: () => void;
} & Pick<
  API.FilterListType,
  | 'selectName'
  | 'inputName'
  | 'valueEnum'
  | 'fieldProps'
  | 'selectInitial'
  | 'selectWidth'
  | 'rules'
>;

export const InputGroup: React.FC<InputGroupType> = (props) => {
  const {
    selectName = 'select',
    inputName = 'input',
    selectOption,
    valueEnum,
    fieldProps,
    selectInitial,
  } = props;
  const { ref } = useContext(TableListCtx);
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const onChange = () => {
    ref?.current.resetFields([inputName]);
  };

  return (
    <Input.Group
      compact
      style={{ display: 'flex', marginBottom: props?.bottom }}
      className={[styles.group, isHover && styles.hover, isFocus && styles.focus].join(' ')}
    >
      <ProFormSelect
        initialValue={selectInitial}
        name={selectName}
        valueEnum={valueEnum}
        fieldProps={{
          onChange,
          allowClear: false,
          style: { width: props.selectWidth ?? 120 },
          ...fieldProps,
        }}
        options={selectOption}
      />
      <Form.Item name={inputName} style={{ width: 'inherit' }} rules={props?.rules}>
        <Input
          placeholder="请输入"
          onPressEnter={props?.onPressEnter}
          allowClear
          className={styles.input}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          onChange={props?.inputChange}
        />
      </Form.Item>
    </Input.Group>
  );
};
