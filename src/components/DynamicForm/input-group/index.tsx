import { TableListCtx } from '@/pages/student/list';
import { Input, Select, Form } from 'antd';
import { useContext } from 'react';
import styles from './index.less';

const { Option } = Select;
type InputGroupType = {
  bottom?: number;
  onPressEnter?: () => void;
} & API.FilterListType;

export const InputGroup: React.FC<InputGroupType> = (props) => {
  const { selectName = 'select', inputName = 'input', selectOption = [] } = props;
  const { ref } = useContext(TableListCtx);
  // const [isFocus, setIsFocus] = useState(false);
  // const [isHover, setIsHover] = useState(false);
  const onChange = () => {
    ref?.current.resetFields([inputName]);
  };

  return (
    <Input.Group
      compact
      style={{ display: 'flex', marginBottom: props?.bottom }}
      className={styles.group}
    >
      <Form.Item name={selectName} initialValue={props.selectInitial}>
        <Select
          placeholder="请选择"
          style={{ width: props.selectWidth ?? 140 }}
          onChange={onChange}
          className={styles.select}
        >
          {selectOption?.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={inputName} style={{ width: 'inherit' }} rules={props?.rules}>
        <Input
          placeholder="请输入"
          onPressEnter={props?.onPressEnter}
          allowClear
          className={styles.input}
        />
      </Form.Item>
    </Input.Group>
  );
};
