import React, { useMemo, useRef, useState } from 'react';
import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import { Divider, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import { FormItemOptions, FormInfoItemOptions } from './form-item';
import styles from './index.less';
import { getschoolGrade } from '@/api/school';
import { convertData } from '@/utils/common';

import { getCascaderOption } from '@/hook/district';
import { getManagementWorkbenchDistrict } from '@/api/screen/archives';
import LazyCascader from '@/pages/components/lazy-cascader';

export const BasicInfo: React.FC = () => {
  const ref = useRef<ProFormInstance>();
  const [areaOption, setAreaOption] = useState([]);
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位


  // 地区修改
  const onAreaChange = async (e: any) => {
    console.log(ItemOptions, 'ItemOptions');
    if (Array.isArray(e)) {
      const code = e[e.length - 1];
      const { data = [] } = await getManagementWorkbenchDistrict(code);
      console.log(ItemOptions, 'areaOption');
      // const targetData = ItemOptions; // 更新传递地区参数
      // setItemOptions({ ...ItemOptions, listTypeInfo: { ...ItemOptions.listTypeInfo, typeList: data }});
    }
  }

  const [ItemOptions, setItemOptions] = useState<
  Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
>({ ...FormItemOptions(ref, [], onAreaChange
  ) });

  useMemo(async () => {
    const arr = await getCascaderOption();
    setAreaOption(arr);
    const { data = [] } = await getschoolGrade();
    const targetData = FormItemOptions(ref, arr, onAreaChange); // 更新传递地区参数
    setItemOptions({ ...targetData, listTypeInfo: { ...targetData.listTypeInfo, gradeOptions: convertData(data) }});
  }, []);

  const onUpdate = () => {
    const value = ref?.current?.getFieldsValue();
    console.log(value, 'value');
    const { gradeIds = [], fatherName, fatherPhone, fatherBirthday, fatherDiploma, fatherProfession,  motherName, motherPhone, motherBirthday, motherDiploma, motherProfession} = value;
    console.log(ItemOptions, 'ItemOptions');
    const parmKey = ['sno', 'nation', 'name', 'gender', 'parentPhone', 'birthday'];
    const parm = {}
    parmKey.forEach(element => {
      parm[element]=value?.[element]
    });
    Object.assign(parm, {
      fatherInfo: {
        name: fatherName,
        phone: fatherPhone,
        birthday: fatherBirthday,
        diploma: fatherDiploma,
        profession: fatherProfession,
      },
      motherInfo: {
        name: motherName,
        phone: motherPhone,
        birthday: motherBirthday,
        diploma: motherDiploma,
        profession: motherProfession,
      },
      // gradeId: gradeId[0],
      // classId: gradeId[1]
    });
    console.log(parm, 'pram');
  }

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
      <DynamicForm {...FormInfoItemOptions} isNeedBtn={false} >
      <LazyCascader
        label="居住地址"
        name="region"
        options={areaOption}
        fieldNames={{ label: 'name', value: 'code', children: 'child' }}
        // originProps={{
        //   onChange: changeRegion,
        // }}
      />
      <ProFormTextArea
        name="address"
        disabled={addressFlag}
        fieldProps={{ maxLength: 50 }}
        placeholder="请输入详细地址"
      />
      </DynamicForm>
      <Button type="primary" className={styles.update_btn} onClick={onUpdate}>
        更新基本资料
      </Button>
    </ProForm>
  );
};
