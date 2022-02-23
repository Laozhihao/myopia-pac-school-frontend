import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getGradeCode, addGrade, addClass } from '@/api/school';
import { useRequest, useModel } from 'umi';
import styles from './add-modal.less';
import { useEffect, useRef, useState } from 'react';
import { Select, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { modalConfig } from '@/hook/ant-config';

const { Option } = Select;

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [gradeOption, setGradeOption] = useState<API.GradeOptionType[]>([]);

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  // 获取年级下拉列表
  const { run } = useRequest(getGradeCode, {
    manual: true,
    onSuccess: (result) => {
      setGradeOption(result || []);
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
      width={750}
      visible={props.visible}
      layout="horizontal"
      onFinish={onComfirm}
      labelCol={{ style: { width: 90 } }}
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <span className={styles.primary_text}>
        年级班级管理（批量新增删除年级班级，如需单个新增编辑删除请直接在年级班级管理界面操作）
      </span>
      <div className={styles.content}>
        <span>年级：</span>
        <div className={styles.content_right}>
          <div className={styles.content_right_item}>
            <Form.Item name="gradeCode">
              <Select placeholder="请选择年级" allowClear style={{ width: 290 }}>
                {gradeOption.map((item) => (
                  <Option value={item.code} key={item.value}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <span className={styles.tip}>已有班级：1班</span>
            <div className={styles.modular}>
              <ProFormTextArea
                name="text"
                label="新增班级"
                placeholder="请输入名称"
                />
              <span className={styles.tip} style={{marginLeft: 90}}>已有班级：1班</span>
            </div>
          </div>
          <Button type="dashed" block icon={<PlusOutlined />} className={styles.btn}>添加年级</Button>
        </div>
      </div>

      {/* {!props?.currentRow ? (
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
        </>
      )} */}
    </ModalForm>
  );
};
