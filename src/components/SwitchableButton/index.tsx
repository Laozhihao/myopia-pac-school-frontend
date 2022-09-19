import type { ButtonProps } from 'antd';
import { Tooltip, Button } from 'antd';
import IconFont from '../IconFont';
import styles from './index.less';

interface SwitchableButtonProps extends ButtonProps {
  tooltip?: string;
  icon?: string;
  isMoreType?: boolean;
  needTooltip?: boolean;
}

const SwitchableButton: React.FC<SwitchableButtonProps> = ({
  tooltip,
  children,
  isMoreType,
  needTooltip = true,
  icon,
  ...rest
}) => {
  return !isMoreType ? (
    <div className={styles.btnW}>
      <div className={styles.scrrenDefault}>
        <Tooltip title={needTooltip && tooltip}>
          <Button type="primary" ghost {...rest}>
            {children}
          </Button>
        </Tooltip>
      </div>

      <div className={styles.scrren1600}>
        <Tooltip title={needTooltip && (tooltip || children)}>
          <Button type="link" {...rest}>
            {icon && <IconFont type={icon} />}
          </Button>
        </Tooltip>
      </div>
    </div>
  ) : (
    <Button type="link" {...rest}>
      {icon && <IconFont type={icon} />}
      {children}
    </Button>
  );
};

export default SwitchableButton;
