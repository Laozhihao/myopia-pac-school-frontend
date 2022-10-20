import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import { FormItemOptions } from './form-item';
import { message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useEffect, useRef } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { saveVisionStaff } from '@/api/prevention/vision';

export const AddModal: React.FC<
  API.ModalItemType & { cb?: (data: any, isReset?: boolean) => void }
> = (props) => {
  const modalRef = useRef<ProFormInstance>();

  const { title, visible, currentRow } = props;

  useEffect(() => {
    visible && currentRow && modalRef?.current?.setFieldsValue(currentRow); // 编辑回填
  }, [visible, currentRow]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const { data } = await saveVisionStaff({
      ...value,
      id: currentRow ? currentRow?.id : undefined,
    });
    message.success(currentRow ? '编辑成功' : '新增成功');
    props.onCancel(true);
    !currentRow && props?.cb?.(data, false);
  };

  return (
    <ModalForm
      title={title}
      formRef={modalRef}
      width={750}
      visible={visible}
      onFinish={onConfirm}
      labelCol={{ style: { width: 100 } }}
      layout="horizontal"
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(false),
      }}
    >
      <DynamicForm {...FormItemOptions} isNeedBtn={false} />
    </ModalForm>
  );
};
