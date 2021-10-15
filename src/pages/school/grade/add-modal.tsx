import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getGradeCode } from '@/api/school';
import { useRequest } from 'umi';
import { useEffect, useRef, useState } from 'react';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [gradeOption, setGradeOption] = useState<any[]>();

  const { run } = useRequest(getGradeCode, {
    manual: true,
    onSuccess: (result) => {
      setGradeOption(result);
    },
  });

  useEffect(() => {
    !props?.currentRow && run();
  }, [props, run]);

  return (
    <ModalForm
      title={props.title}
      formRef={modalRef}
      width={600}
      visible={props.visible}
      onFinish={props.onFinish}
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
    >
      {!props?.currentRow ? (
        <ProFormSelect
          name="gradeId"
          label="年级名称"
          options={gradeOption}
          // fieldProps={{fieldNames: }}
          required
          rules={[{ required: true, message: '请选择年级' }]}
        />
      ) : (
        <>
          <ProFormText
            name="className"
            label="班级名称"
            placeholder="请输入"
            required
            rules={[{ required: true, message: '请输入班级名称' }]}
          />
          <ProFormText
            name="class"
            label="班级座位"
            placeholder="请输入"
            required
            rules={[{ required: true, message: '请输入班级座位' }]}
          />
        </>
      )}
    </ModalForm>
  );
};
