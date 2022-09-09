import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { CheckboxOptionType } from 'antd';
import { useRef } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { FormItemOptions } from './form-item';

export const PlanModal: React.FC<API.ModalItemType & { option: (string | CheckboxOptionType)[] }> =
  (props) => {
    const modalRef = useRef<ProFormInstance>();
    const { title, visible, currentRow } = props;

    console.log(title, visible, currentRow, '123');

    /**
     * @desc 新增/编辑
     */
    const onConfirm = async (value: any) => {
      console.log(value, '123');
    };

    return (
      <ModalForm
        title={title}
        formRef={modalRef}
        width={750}
        visible={visible}
        onFinish={onConfirm}
        layout="horizontal"
        labelCol={{ style: { width: 120 } }}
        modalProps={{
          ...modalConfig,
          destroyOnClose: true,
          onCancel: () => props.onCancel(false),
        }}
      >
        <DynamicForm {...FormItemOptions([])} isNeedBtn={false} />
      </ModalForm>
    );
  };
