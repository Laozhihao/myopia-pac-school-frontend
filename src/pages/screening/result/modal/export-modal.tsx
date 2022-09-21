import { getsGradeAll } from '@/api/school';
import { screeningNoticeResult } from '@/api/screen/plan';
import { exportScreeningArchiveCard } from '@/api/screen/result';
import { getPopupContainer, modalConfig } from '@/hook/ant-config';
import { convertData } from '@/utils/common';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { FooterTips } from '@/pages/screening/result/notice-report/components/footer-tips';
import { Cascader, Form, message, Select } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useModel, history } from 'umi';

const { Option } = Select;

export const ExportArchivesModal: React.FC<API.ModalItemType> = (props) => {
  const { title, visible } = props;

  const modalRef = useRef<ProFormInstance>();

  const { query: { screeningPlanId } = {} } = history.location;

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  const schoolId = currentUser?.orgId;

  const { orgName } = currentUser;

  const [gradeList, setGradeList] = useState<any[]>([]);
  const [studentList, setStudentList] = useState([]);
  const [selectStudentIds, setSelectStudentIds] = useState<any[]>([]); // 当前已选的筛查学生

  /**
   * @desc 确认导出
   */
  const onComfirm = async (value: any) => {
    const { gradeIds = [], studentIds = [] } = value;
    const [gradeId, classId] = gradeIds;
    const params = {
      gradeId,
      classId,
      schoolId,
      planStudentId: studentIds.join(','),
      screeningPlanId,
      isSchoolClient: true,
    };
    const { data } = await exportScreeningArchiveCard(params);
    if (classId) {
      window.open(data);
    } else {
      message.success('操作成功，请留意站内信!');
    }
  };

  /**
   * @desc 年级班级修改
   */
  const onGradeChange = async (e: any) => {
    const initValue = modalRef?.current?.getFieldsValue();
    modalRef?.current?.setFieldsValue({ ...initValue, studentIds: [] });
    const [gradeId, classId] = e || [];
    console.log(e);
    const params = {
      schoolId,
      planId: screeningPlanId,
      gradeId,
      classId,
      isSchoolClient: true,
    };
    const { data } = await screeningNoticeResult(params);
    setStudentList(data);
  };

  /**
   * @desc 筛查学生修改
   */
  const onSelectStudentChange = (e: React.SetStateAction<any[]>) => {
    setSelectStudentIds(e);
  };

  useMemo(async () => {
    if (visible) {
      const { data = [] } = await getsGradeAll();
      setGradeList(convertData(data));
    }
  }, [visible]);

  return (
    <ModalForm
      title={title}
      width={750}
      layout="horizontal"
      formRef={modalRef}
      onFinish={onComfirm}
      visible={visible}
      labelCol={{ style: { width: 120 } }}
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <div style={{ width: '80%' }}>
        <Form.Item label="筛查学校">
          <Select defaultValue={orgName} disabled />
        </Form.Item>
        <Form.Item label="选择年级/班级" name="gradeIds">
          <Cascader
            options={gradeList}
            fieldNames={{ label: 'name', value: 'id', children: 'child' }}
            onChange={onGradeChange}
            changeOnSelect
            placeholder="请选择年级班级"
          />
        </Form.Item>
        <Form.Item label="筛查学生" name="studentIds">
          <Select
            mode="multiple"
            allowClear
            optionFilterProp="name"
            getPopupContainer={getPopupContainer}
            placeholder="请选择筛查学生"
            onChange={onSelectStudentChange}
          >
            {studentList.map((item: any) => (
              <Option
                value={item.planStudentId}
                key={item.planStudentId}
                disabled={
                  !selectStudentIds.includes(item?.planStudentId) && selectStudentIds.length > 9
                }
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="导出内容">
          所选择<span style={{ color: '#3c6cfe' }}>{orgName}</span>的学生筛查结果通知书
        </Form.Item>
      </div>
      <FooterTips />
    </ModalForm>
  );
};
