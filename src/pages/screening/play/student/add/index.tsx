import { ModalForm, ProFormCheckbox } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { CheckboxOptionType } from 'antd';
import { useRef } from 'react';
import { modalConfig } from '@/hook/ant-config';
import styles from './index.less';
import { defaultRulesConfig } from '@/utils/common';

export const AddModal: React.FC<API.ModalItemType & { option: (string | CheckboxOptionType)[] }> = (
  props,
) => {
  const modalRef = useRef<ProFormInstance>();
  const { title, visible, currentRow } = props;

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    console.log(currentRow, value, '123');
  };

  return (
    <ModalForm
      title={title}
      formRef={modalRef}
      width={750}
      visible={visible}
      onFinish={onConfirm}
      layout="vertical"
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(false),
      }}
    >
      <div className={styles.info}>
        <p>当前计划已选中的年级：</p>
        <p className={styles.info_grade}> 一年级、二年级、三年级、四年级</p>
      </div>
      <ProFormCheckbox.Group
        name="checkbox"
        label="新增筛查学生"
        options={['农业', '制造业', '互联网']}
        rules={defaultRulesConfig('选择筛查学生')}
      />
    </ModalForm>
  );
};
