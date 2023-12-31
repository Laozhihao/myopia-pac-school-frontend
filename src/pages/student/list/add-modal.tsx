import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import LazyCascader from '@/pages/components/lazy-cascader';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useRef, useState, useEffect, useMemo } from 'react';
import { studentFormOptions } from '../utils/constant';
import { getCascaderOption } from '@/hook/district';
import { editStudentInfo } from '@/api/student';
import { getBirthday } from '@/hook/table';
import { modalConfig } from '@/hook/ant-config';

export const AddModal: React.FC<API.ModalItemType & { option: any[] }> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [areaOption, setAreaOption] = useState<any[]>();
  const [addressFlag, setAddressFlag] = useState(true); // 详细地址标志位

  /**
   * @desc 获取身份证自动回显出生日期
   */
  const validatorCb = (value: string) => {
    modalRef?.current?.setFieldsValue({ birthday: getBirthday(value) });
  };

  const [studentForm, setStudentForm] = useState<API.PropsType>(studentFormOptions(validatorCb));

  useMemo(async () => {
    if (props.visible) {
      setStudentForm((value) => {
        return {
          ...studentFormOptions(validatorCb, props?.currentRow ? 2 : 1, modalRef),
          listTypeInfo: {
            ...value.listTypeInfo,
            gradeOptions: props.option,
          },
        };
      });
    }
  }, [props.option, props.visible]);

  useMemo(async () => {
    setAreaOption(await getCascaderOption());
  }, []);

  useEffect(() => {
    if (props.visible) {
      setAddressFlag(!props?.currentRow?.provinceCode); // 编辑地址
      const info = {};
      if (props?.currentRow) {
        const { gradeId, classId, provinceCode, cityCode, areaCode, townCode, idCard, passport } =
          props?.currentRow;
        const addressArr = [provinceCode, cityCode, areaCode, townCode].filter((item) => item); // 过滤掉空值
        const gradeArr = [gradeId, classId].filter((item) => item);
        Object.assign(info, {
          gradeIds: gradeArr, // 回显年级班级
          region: addressArr, // 回显地区
          selectValue: passport ? 'passport' : 'idCard', // 回填证件号
          inputValue: idCard ?? passport, // 回填证件号
        });
      }
      modalRef?.current?.setFieldsValue({ ...props?.currentRow, ...info });
    }
  }, [props.visible]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const { gradeIds = [], region = [], selectValue, inputValue } = value;
    const [gradeId, classId] = gradeIds;
    const [provinceCode, cityCode, areaCode, townCode] = region;
    const parm = {
      ...value,
      id: props?.currentRow?.id ?? '',
      studentId: props?.currentRow?.studentId ?? '',
      gradeId,
      classId,
      provinceCode,
      cityCode,
      areaCode,
      townCode,
      [selectValue]: inputValue,
    };
    await editStudentInfo(parm);
    message.success(props?.currentRow ? '编辑成功' : '新增成功');
    props.onCancel(true);
  };

  /**
   * @desc 更改选择地区
   */
  const changeRegion = (value: string | any[]) => {
    setAddressFlag(!value.length);
    !value.length && modalRef?.current?.setFieldsValue({ address: '' });
  };

  return (
    <ModalForm
      title={props.title}
      formRef={modalRef}
      width={800}
      visible={props.visible}
      onFinish={onConfirm}
      layout="vertical"
      isKeyPressSubmit={false}
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(false),
      }}
    >
      <DynamicForm {...studentForm} isNeedBtn={false} />
      <LazyCascader
        label="居住地址"
        name="region"
        options={areaOption}
        fieldNames={{ label: 'name', value: 'code', children: 'child' }}
        originProps={{
          onChange: changeRegion,
        }}
      />
      <ProFormTextArea
        name="address"
        disabled={addressFlag}
        fieldProps={{ maxLength: 50 }}
        placeholder="请输入详细地址"
      />
    </ModalForm>
  );
};
