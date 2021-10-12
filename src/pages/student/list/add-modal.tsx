import { ModalForm } from '@ant-design/pro-form';
import PageForm from '@/components/PageForm';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useEffect, useRef } from 'react';
import { studentFormOptions } from '../utils/constant';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();

  useEffect(() => {
    modalRef?.current?.setFieldsValue(props?.currentRow || {});
  }, [props.currentRow]);

  return (
    <ModalForm
      title={props.title}
      formRef={modalRef}
      width={800}
      visible={props.visible}
      onFinish={props.onFinish}
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
        bodyStyle: {
          height: 600,
          overflow: 'auto',
        },
      }}
    >
      <PageForm {...studentFormOptions} />
    </ModalForm>
  );
};
