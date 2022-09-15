import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import type { ProFormInstance } from '@ant-design/pro-form';
import { deleteRedundantData } from '@/utils/common';
import { useMemo, useRef, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { FormItemOptions } from './form-item';
import { getScreeningStudent, editScreeningStudent } from '@/api/screen/plan';
import { message } from 'antd';

export const PlanModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [screeningStudentInfo, setScreeningStudentInfo] = useState<API.ObjectType>({
    noSelectList: [],
    selectList: [],
  });

  const { title, visible, currentRow } = props;

  /**
   * @desc 获取筛查学生年级班级
   */
  useMemo(async () => {
    if (visible) {
      const parm = currentRow ? { screeningPlanId: currentRow?.planId } : undefined;
      const { data = {} } = await getScreeningStudent(parm);
      setScreeningStudentInfo(data);
      // 编辑回填
      currentRow &&
        modalRef?.current?.setFieldsValue({
          ...currentRow,
          time: [currentRow?.startTime, currentRow?.endTime],
          gradeIds:
            Array.isArray(data?.selectList) && data?.selectList.length
              ? data?.selectList.map((item: API.GradeInfoType) => item.gradeId)
              : [],
        });
    }
  }, [visible]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const { time = [] } = value;
    const [startTime, endTime] = time;
    await editScreeningStudent(
      deleteRedundantData({ ...value, screeningType: 0, startTime, endTime }, ['time']),
    );
    props.onCancel(true);
    message.success(`${currentRow ? '编辑' : '创建'}成功`);
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
      <DynamicForm {...FormItemOptions(screeningStudentInfo?.noSelectList)} isNeedBtn={false} />
    </ModalForm>
  );
};
