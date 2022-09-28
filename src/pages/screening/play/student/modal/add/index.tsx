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
  const [screeningStudentInfo, setScreeningStudentInfo] = useState<API.ObjectType>({
    noSelectList: [],
    selectList: [],
  });

  const { query: { screeningPlanId } = {} } = history.location;

  /**
   * @desc 获取筛查学生年级班级
   */
  useMemo(async () => {
    if (visible) {
      const { data = {} } = await getScreeningStudent({ screeningPlanId });
      setScreeningStudentInfo(data);
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
        <p>当前计划已选中的年级：</p>
        <p className={styles.info_grade}>
          {screeningStudentInfo?.selectList
            ?.map((item: API.GradeInfoType & { studentNum?: number }) => item.gradeName)
            ?.join('、')}
        </p>
      </div>
      <Form.Item label="新增筛查学生" rules={defaultRulesConfig('选择筛查学生')} name="gradeIds">
        <Checkbox.Group className={styles.checkbox_item}>
          {screeningStudentInfo?.noSelectList?.map(
            (item: API.GradeInfoType & { studentNum?: number }) => (
              <Checkbox value={item.gradeId} key={item.gradeId}>
                {item?.gradeName} ({item?.studentNum})
              </Checkbox>
            ),
          )}
        </Checkbox.Group>
      </Form.Item>
    </ModalForm>
  );
};
