import React, { useRef } from 'react';
import ProForm from '@ant-design/pro-form';
import { Divider, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import { FormItemOptions, FormInfoItemOptions } from './form-item';
import styles from './index.less';

export const BasicInfo: React.FC = () => {
  const ref = useRef<ProFormInstance>();

  return (
    <ProForm
      layout="horizontal"
      formRef={ref}
      submitter={false}
      labelCol={{ style: { width: 150 } }}
    >
      <DynamicForm {...FormItemOptions} isNeedBtn={false} />
      <Divider />
      <p className={styles.info}>父母信息</p>
      <DynamicForm {...FormInfoItemOptions} isNeedBtn={false} />
      <Button type="primary" className={styles.update_btn}>
        更新基本资料
      </Button>
    </ProForm>
  );
};
