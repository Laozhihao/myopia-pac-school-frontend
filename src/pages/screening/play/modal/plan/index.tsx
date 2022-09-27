import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import type { ProFormInstance } from '@ant-design/pro-form';
import { deleteRedundantData } from '@/utils/common';
import { useMemo, useRef, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { FormItemOptions } from './form-item';
import { getScreeningStudent, editScreeningStudent } from '@/api/screen/plan';
import { message, Form } from 'antd';
import { MyEditor } from '@/components/wangeditor';

export const PlanModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [screeningStudentInfo, setScreeningStudentInfo] = useState<API.ObjectType>({
    allList: [],
    selectList: [],
  });
  const [contentValue, setContentValue] = useState('');

  const { title, visible, currentRow } = props;

  /**
   * @desc 获取筛查学生年级班级
   */
  useMemo(async () => {
    if (visible) {
      const parm = currentRow ? { screeningPlanId: currentRow?.planId } : undefined;
      const { data = {} } = await getScreeningStudent(parm);
      setScreeningStudentInfo(data);

      modalRef?.current?.setFieldsValue({
        ...currentRow,
        time: currentRow ? [currentRow?.startTime, currentRow?.endTime] : [],
        gradeIds: currentRow
          ? data?.selectList.map((item: API.GradeInfoType) => item.gradeId)
          : data?.allList?.map((item: API.GradeInfoType) => item.gradeId),
      });
      currentRow && setContentValue(currentRow?.content);
    }
  }, [visible]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const { time = [] } = value;
    const [startTime, endTime] = time;
    console.log(contentValue, 'contentValue');
    await editScreeningStudent(
      deleteRedundantData(
        {
          ...value,
          screeningType: 0,
          startTime,
          endTime,
          content: contentValue,
          id: currentRow ? currentRow?.planId : undefined,
        },
        ['time'],
      ),
    );
    props.onCancel(true);
    message.success(`${currentRow ? '编辑' : '创建'}成功`);
  };

  return (
    <ModalForm
      title={title}
      formRef={modalRef}
      width={800}
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
      <DynamicForm
        {...FormItemOptions(
          screeningStudentInfo?.allList,
          screeningStudentInfo?.selectList,
          currentRow,
        )}
        isNeedBtn={false}
      >
        <Form.Item label="筛查内容">
          <MyEditor value={contentValue} onChange={(e) => setContentValue(e)} ></MyEditor>
        </Form.Item>
      </DynamicForm>
    </ModalForm>
  );
};
