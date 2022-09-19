import { Children, cloneElement } from 'react';
import { Dropdown, Menu, Space } from 'antd';
import SwitchableButton from '../SwitchableButton';

interface DynamicButtonGroupProps {
  children: React.ReactNode;
}
interface MoreTypeProps {
  isMoreType: boolean;
}

const DynamicButtonGroup: React.FC<DynamicButtonGroupProps> = ({ children }) => {
  const cs = Children.toArray(children);
  const more = Children.count(children) >= 5;
  const prev = more ? cs.slice(0, 3) : children;
  const next = more ? cs.slice(3) : [];
  return (
    <div style={{ display: 'inline-block' }}>
      <Space>
        {prev}
        {next.length ? (
          <Dropdown
            overlay={
              <Menu>
                {next.map((item, index) => (
                  <Menu.Item key={index}>
                    {cloneElement(item as React.FunctionComponentElement<MoreTypeProps>, {
                      isMoreType: true,
                    })}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <SwitchableButton icon="icon-icon-gegnduo-20" needTooltip={false}>
              更多
            </SwitchableButton>
          </Dropdown>
        ) : null}
      </Space>
    </div>
  );
};

export default DynamicButtonGroup;
