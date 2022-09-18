import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { Divider, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import { FormItemOptions, FormInfoItemOptions } from './form-item';
import styles from './index.less';
import { getschoolGrade } from '@/api/school';
import { convertData } from '@/utils/common';
import { getCascaderOption } from '@/hook/district';

export const BasicInfo: React.FC = () => {
  const ref = useRef<ProFormInstance>();

  const [areaOption, setAreaOption] = useState<any[]>([]); // 地区级联

  const [ItemOptions, setItemOptions] = useState<
  Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
>({ ...FormItemOptions(areaOption) });

  useMemo(async () => {
    const { data = [] } = await getschoolGrade();
    setAreaOption(await getCascaderOption());
    setItemOptions((s) => ({
      ...s,
      listTypeInfo: { ...s.listTypeInfo, gradeOptions: convertData(data) },
    }));
  }, []);

  return (
    <ProForm
      layout="horizontal"
      formRef={ref}
      submitter={false}
      labelCol={{ style: { width: 150 } }}
    >
      <DynamicForm {...ItemOptions} isNeedBtn={false} />
      <Divider />
      <p className={styles.info}>父母信息</p>
      <DynamicForm {...FormInfoItemOptions} isNeedBtn={false} />
      <Button type="primary" className={styles.update_btn}>
        更新基本资料
      </Button>
    </ProForm>
  );
};
