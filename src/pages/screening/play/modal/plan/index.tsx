import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import MyEditor from '@/components/EditorModal';
import type { ProFormInstance } from '@ant-design/pro-form';
import { deleteRedundantData } from '@/utils/common';
import { useMemo, useRef, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { FormItemOptions } from './form-item';
import { getScreeningStudent, editScreeningStudent } from '@/api/screen/plan';
import { message, Form, Col, Button } from 'antd';

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
      setContentValue(currentRow ? currentRow?.content : '');

      const { data = {} } = await getScreeningStudent(parm);
      setScreeningStudentInfo(data);

      modalRef?.current?.setFieldsValue({
        ...currentRow,
        time: currentRow ? [currentRow?.startTime, currentRow?.endTime] : [],
        gradeIds: currentRow
          ? data?.selectList.map((item: API.GradeInfoType) => item.gradeId)
          : data?.allList?.map((item: API.GradeInfoType) => item.gradeId),
      });
    }
  }, [visible]);
  /**
   * @desc 新增/编辑
   */
  const onConfirm = () => {
    modalRef?.current?.validateFields().then(async (value) => {
      const { time = [] } = value;
      const [startTime, endTime] = time;
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
    });
  };

  return (
    <ModalForm
      title={title}
      formRef={modalRef}
      width={800}
      visible={visible}
      submitter={{
        render: () => {
          return [
            <Button onClick={() => props.onCancel(false)} key="cancel">
              取消
            </Button>,
            <Button onClick={onConfirm} key="submit" type="primary">
              确定
            </Button>,
          ];
        },
      }}
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
        <Col span={24}>
          <Form.Item label="筛查内容">
            <MyEditor value={contentValue} onChange={(e) => setContentValue(e)}></MyEditor>
          </Form.Item>
        </Col>
      </DynamicForm>
    </ModalForm>
  );
};
