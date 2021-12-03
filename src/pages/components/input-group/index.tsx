import { TableListCtx } from '@/pages/student/list';
import { Input, Select, Form } from 'antd';
import { useContext } from 'react';

const { Option } = Select;

export type InputItemType = {
  bottom?: number; // marginBottom
  selectName?: string; // select 值
  selectInitial?: string; // select 默认值
  width?: number; // 宽度
  inputName?: string; // input 值
  option: Record<string, any>[]; // select 的 option
  onPressEnter?: () => void; // 按下回车后的callback 事件 不绑定在ref 上是为了灵活性
};

export const InputGroup: React.FC<InputItemType> = (props) => {
  const { ref } = useContext(TableListCtx);
  const onChange = () => {
    ref?.current.resetFields([props.inputName]);
  };

  return (
    <Input.Group compact style={{ display: 'flex', marginBottom: props?.bottom }}>
      <Form.Item name={props.selectName} initialValue={props.selectInitial}>
        <Select placeholder="请选择" style={{ width: props.width ?? 140 }} onChange={onChange}>
          {props.option.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={props.inputName} style={{ width: 'inherit' }}>
        <Input placeholder="请输入" onPressEnter={props?.onPressEnter} allowClear />
      </Form.Item>
    </Input.Group>
  );
};
