import { Input, Select, Form } from 'antd';

const { Option } = Select;

export type InputItemType = {
  bottom?: number; // marginBottom
  selectName?: string; // select 值
  selectInitial?: string; // select 默认值
  width?: number; // 宽度
  inputName?: string; // input 值
  option: Record<string, any>[]; // select 的 option
};

export const InputGroup: React.FC<InputItemType> = (props) => {
  return (
    <Input.Group compact style={{ display: 'flex', marginBottom: props?.bottom }}>
      <Form.Item name={props.selectName} initialValue={props.selectInitial}>
        <Select placeholder="请选择" style={{ width: props.width ?? 140 }}>
          {props.option.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={props.inputName} style={{ width: 'inherit' }}>
        <Input placeholder="请输入" />
      </Form.Item>
    </Input.Group>
  );
};
