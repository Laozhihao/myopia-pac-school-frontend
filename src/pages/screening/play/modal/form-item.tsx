import { Checkbox, Form } from 'antd';
import { defaultRulesConfig } from '@/utils/common';
import styles from './plan.less';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
// import React, { useState } from 'react';

// const [selectGradeOption, setSelectGradeOption] = useState<React.Key[]>([]);

export const FormItemOptions = (
  studentOption: (API.GradeInfoType & { studentNum?: number })[],
) => ({
  filterList: [
    {
      label: '筛查标题',
      type: 'input',
      value: 'title',
      showLabel: true,
      col: {
        span: 24,
      },
      fieldProps: {
        maxLength: 30,
        // showCount: true,
      },
      rules: defaultRulesConfig('输入筛查标题'),
    },
    {
      value: 'time',
      col: {
        span: 24,
      },
      slot: (
        <div>
          <ProFormDateRangePicker
            name="time"
            label="筛查时间段"
            rules={[{ type: 'array', required: true, message: '请选择筛查时间段' }]}
            fieldProps={{ style: { width: '100%' } }}
          />
          <p className={styles.red_tip}>
            注：请合理设置时间段，为保证数据安全性，筛查人员在该筛查时间段内才能查阅到学生的数据进行筛查，因此请确保所负责的学校可以在该时间段内完成。筛查时间段只能从当前时间开始进行选择
          </p>
        </div>
      ),
    },
    {
      value: 'student',
      col: {
        span: 24,
      },
      slot: (
        <Form.Item label="筛查学生" rules={defaultRulesConfig('选择筛查学生')} name="gradeIds">
          {Array.isArray(studentOption) && studentOption?.length ? (
            <>
              <Checkbox.Group
                className={styles.checkbox_item}
                onChange={(e) => {
                  console.log(e, '22');
                }}
              >
                {studentOption.map((item) => (
                  <Checkbox value={item.gradeId} key={item.gradeId}>
                    {item?.gradeName} ({item?.studentNum}){' '}
                  </Checkbox>
                ))}
              </Checkbox.Group>
              <p className={styles.total_part}>合计： xxx 人</p>
            </>
          ) : (
            <div className={styles.tip}>
              <p className="secondary_text">
                暂无年级数据，请前去学校管理中进行年级班级的设置{' '}
                <span className={styles.grade_text}>年级班级设置</span>
              </p>
            </div>
          )}
        </Form.Item>
      ),
    },
    {
      label: '筛查内容',
      type: 'textArea',
      value: 'content',
      showLabel: true,
      col: {
        span: 24,
      },
    },
  ],
});
