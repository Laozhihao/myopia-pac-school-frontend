import { ModalForm } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useMemo, useRef, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import styles from './index.less';
import { defaultRulesConfig } from '@/utils/common';
import { history } from 'umi';
import { getScreeningStudent } from '@/api/screen/plan';
import { Checkbox, Form, message } from 'antd';
import { addScreeningStudentList } from '@/api/screen/student';

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const { title, visible } = props;
  const [screeningStudentInfo, setScreeningStudentInfo] = useState<API.ObjectType[]>([]);

  const { query: { screeningPlanId } = {} } = history.location;

  /**
   * @desc 获取筛查学生年级班级
   */
  useMemo(async () => {
    if (visible) {
      const { data } = await getScreeningStudent({ screeningPlanId });
      setScreeningStudentInfo(data);
      modalRef?.current?.setFieldsValue({
        gradeIds: data
          .map((item: API.GradeInfoType) => item?.isSelect && item.gradeId)
          .filter(Boolean),
      });
    }
  }, [visible]);

  /**
   * @desc 新增/编辑
   */
  const onConfirm = async (value: any) => {
    const parm = {
      screeningPlanId,
      ...value,
    };
    await addScreeningStudentList(parm);
    props.onCancel(true);
    message.success('新增成功');
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
        <p>新增筛查学生使用说明：</p>
        <p>1.请勾选您要添加至本次筛查计划的学生，可按照年级/或班级批量添加。</p>
        <p>
          2.如果您已经添加过筛查学生，且在学校中新增了学生档案信息，并想将学生添加入本次筛查，完成档案添加后，请重新点击新增筛查学生并选中所处的年级班级，系统将会为您更新筛查学生列表，不会影响原有筛查计划中的学生信息。
        </p>
      </div>
      <Form.Item label="新增筛查学生" rules={defaultRulesConfig('选择筛查学生')} name="gradeIds">
        <Checkbox.Group className={styles.checkbox_item}>
          {screeningStudentInfo?.map(
            (item: API.GradeInfoType & { unSyncStudentNum?: number; studentNum?: number }) => (
              <div key={item.gradeId}>
                <Checkbox value={item.gradeId}>
                  {item?.gradeName} (未添加到筛查计划：{item?.unSyncStudentNum}；年级人数：
                  {item?.studentNum})
                </Checkbox>
              </div>
            ),
          )}
        </Checkbox.Group>
      </Form.Item>
    </ModalForm>
  );
};
