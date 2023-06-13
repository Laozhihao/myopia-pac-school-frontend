import { useMemo, useRef, useState } from 'react';
import { message, Form, Col } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import MyEditor from '@/components/EditorModal';
import { FormItemOptions } from './form-item';
import { deleteRedundantData, html2Escape, escape2Html } from '@/utils/common';
import { modalConfig } from '@/hook/ant-config';
import {
  getScreeningStudent,
  editScreeningStudent,
  getIsXinJiangDistrict,
} from '@/api/screen/plan';

export const PlanModal: React.FC<API.ModalItemType & { param?: API.ObjectType }> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [screeningStudentInfo, setScreeningStudentInfo] = useState<API.ObjectType[]>([]);
  const [contentValue, setContentValue] = useState('');
  const [isXinJiangDistrict, setIsXinJiangDistrict] = useState(false);

  const { title, visible, currentRow, param = {} } = props;

  /**
   * @desc 获取筛查学生年级班级
   */
  useMemo(async () => {
    if (visible) {
      // 过滤毕业年级
      const parm = {
        isFilterGraduate: true,
        ...(currentRow ? { screeningPlanId: currentRow?.planId } : {}),
      };
      console.log('currentRow', currentRow);
      setContentValue(currentRow?.content ? escape2Html(escape2Html(currentRow?.content)) : '');
      const { data } = await getScreeningStudent(parm);
      setScreeningStudentInfo(data);
      // 判断当前创建的计划是否属于新疆地区的
      const { data: xinjiangFlag } = await getIsXinJiangDistrict();
      setIsXinJiangDistrict(xinjiangFlag);
      modalRef?.current?.setFieldsValue({
        ...currentRow,
        screeningTime: currentRow ? [currentRow?.startTime, currentRow?.endTime] : [],
        gradeIds: data
          .map((item: API.GradeInfoType) =>
            currentRow ? item?.isSelect && item.gradeId : item.gradeId,
          )
          .filter(Boolean), // 创建默认全选，编辑按 isSelect
      });
    }
  }, [visible]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const { screeningTime = [] } = value;
    const [startTime, endTime] = screeningTime;
    await editScreeningStudent(
      deleteRedundantData(
        {
          ...value,
          screeningType: 0,
          startTime,
          endTime,
          content: html2Escape(contentValue),
          id: currentRow ? currentRow?.planId : undefined, // 编辑时需要
          screeningNoticeId: currentRow ? currentRow?.srcScreeningNoticeId : undefined, // 编辑时需要
          screeningTaskId: currentRow ? currentRow?.screeningTaskId : undefined, // 编辑时需要
          ...param,
        },
        ['screeningTime'],
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
      isKeyPressSubmit={false}
      onFinish={onConfirm}
      layout="horizontal"
      labelCol={{ style: { width: 120 } }}
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(false),
      }}
    >
      <DynamicForm {...FormItemOptions(screeningStudentInfo, isXinJiangDistrict)} isNeedBtn={false}>
        <Col span={24}>
          <Form.Item label="筛查内容">
            <MyEditor
              needImg={true}
              value={contentValue}
              onChange={(e) => setContentValue(e)}
            ></MyEditor>
          </Form.Item>
        </Col>
      </DynamicForm>
    </ModalForm>
  );
};
