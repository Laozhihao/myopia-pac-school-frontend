import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getGradeCode, addGrade, addClass } from '@/api/school';
import { useRequest, useModel } from 'umi';
import { useEffect, useRef, useState } from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [gradeOption, setGradeOption] = useState<any[]>([]);

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  // 获取年级下拉列表
  const { run } = useRequest(getGradeCode, {
    manual: true,
    onSuccess: (result) => {
      setGradeOption(result);
    },
  });

  useEffect(() => {
    !props?.currentRow && run();
  }, []);

  const onComfirm = async (value: Record<string, any>) => {
    const parm = {
      schoolId: currentUser?.orgId,
    };
    // 新增年级
    if (!props?.currentRow) {
      const nowIndex = gradeOption.findIndex((item) => item.code === value?.gradeCode);
      Object.assign(parm, value, { name: gradeOption[nowIndex].name });
      await addGrade(parm);
    }
    // 新增班级
    else {
      Object.assign(parm, value, { gradeId: props?.currentRow.id });
      await addClass(parm);
    }
    props?.onFinish?.();
  };

  return (
    <ModalForm
      title={props.title}
      formRef={modalRef}
      width={600}
      visible={props.visible}
      onFinish={onComfirm}
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
    >
      {!props?.currentRow ? (
        <Form.Item
          name="gradeCode"
          label="年级名称"
          rules={[{ required: true, message: '请选择年级' }]}
        >
          <Select placeholder="请选择年级" allowClear>
            {gradeOption.map((item) => (
              <Option value={item.code} key={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <>
          <ProFormText
            name="name"
            label="班级名称"
            placeholder="请输入"
            required
            rules={[{ required: true, message: '请输入班级名称' }]}
          />
          <ProFormText
            name="seatCount"
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
