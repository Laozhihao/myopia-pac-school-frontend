import { ModalForm } from '@ant-design/pro-form';
import PageForm from '@/components/PageForm';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useRef, useState, useEffect, useMemo } from 'react';
import { studentFormOptions } from '../utils/constant';
import { getNationOption, getCascaderOption } from '@/pages/hook/district';
import { Form, Cascader } from 'antd';

export const AddModal: React.FC<API.ModalItemType & { option: any[] }> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [studentForm, setStudentForm] = useState<API.PropsType>({ ...studentFormOptions });
  const [addressOptions, setAddressOptions] = useState<any[]>();

  useMemo(async () => {
    const nationArr = await getNationOption();
    setStudentForm((value) => {
      return Object.assign(value, {
        listTypeInfo: {
          ...value.listTypeInfo,
          gradeOptions: props.option,
          nationList: nationArr || [],
        },
      });
    });
  }, [props.option]);

  useMemo(async () => {
    setAddressOptions(await getCascaderOption());
  }, []);

  useEffect(() => {
    const info = {};
    if (props?.currentRow) {
      const { gradeId, classId, provinceCode, cityCode, areaCode, townCode } = props?.currentRow;
      const addressArr = [provinceCode, cityCode, areaCode, townCode].filter((item) => item); // 过滤掉空值
      const gradeArr = [gradeId, classId].filter((item) => item);
      Object.assign(info, {
        gradeIds: gradeArr, // 回显年级班级
        addressIds: addressArr, // 回显地区
      });
    }
    modalRef?.current?.setFieldsValue({ ...props?.currentRow, ...info });
  }, [props?.currentRow, props.visible]);

  return (
    <ModalForm
      title={props.title}
      formRef={modalRef}
      width={800}
      visible={props.visible}
      onFinish={async (value) => {
        console.log(value);
      }}
      modalProps={{
        destroyOnClose: false,
        onCancel: props.onCancel,
        bodyStyle: {
          height: 600,
          overflow: 'auto',
        },
      }}
    >
      <PageForm {...studentForm} />
      <Form.Item label="居住地址">
        <Cascader
          options={addressOptions}
          placeholder="请选择"
          fieldNames={{ label: 'name', value: 'code', children: 'child' }}
        />
      </Form.Item>
    </ModalForm>
  );
};
