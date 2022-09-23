import { Checkbox, Form } from 'antd';
import { defaultRulesConfig } from '@/utils/common';
import styles from './index.less';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { useEffect, useState } from 'react';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import moment from 'moment';
import { history } from 'umi';

type StudentOptionType = {
  studentNum?: number;
} & API.GradeInfoType;

export const FormItemOptions = (
  studentOption: StudentOptionType[],
  selectStudentOption: StudentOptionType[],
  currentRow?: API.ObjectType,
) => {
  const [total, setTotal] = useState(0); // 选中的学生总数
  const [allTotal, setAllTotal] = useState(0); // 全部的学生总数

  useEffect(() => {
    const allStudentTotal = studentOption
      .map((item) => item?.studentNum)
      .reduce((pre, item) => pre! + item!, 0)!;
    setAllTotal(allStudentTotal);
    // 合计
    setTotal(
      currentRow
        ? selectStudentOption
            .map((item) => item?.studentNum)
            .reduce((pre, item) => pre! + item!, 0)!
        : allStudentTotal,
    );
  }, [studentOption]);

  // 选中学生数
  const onChange = (e: CheckboxValueType[]) => {
    const numArr = e.map((item) => {
      return studentOption.find((subItem) => subItem.gradeId === item)?.studentNum;
    });
    setTotal(numArr.reduce((pre, item) => pre! + item!, 0)!);
  };

  // 跳转学生管理/年级班级管理
  const onJump = (path: string) => {
    history.push(path);
  };

  return {
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
          maxLength: 25,
        },
        rules: defaultRulesConfig('输入筛查标题'),
      },
      {
        value: 'time',
        col: {
          span: 24,
        },
        slot: (
          <div className={styles.screen_item}>
            <ProFormDateRangePicker
              name="time"
              label="筛查时间段"
              rules={[{ type: 'array', required: true, message: '请选择筛查时间段' }]}
              fieldProps={{
                style: { width: '100%' },
                disabledDate: (currentDate) => currentDate && currentDate < moment().startOf('day'),
              }}
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
        slot: allTotal ? (
          <>
            <Form.Item
              label="筛查学生"
              rules={defaultRulesConfig('选择筛查学生')}
              name="gradeIds"
              style={{ marginBottom: 12 }}
            >
              <Checkbox.Group className={styles.checkbox_item} onChange={onChange}>
                {studentOption.map((item) => (
                  <Checkbox value={item.gradeId} key={item.gradeId}>
                    {item?.gradeName}({item?.studentNum})
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <div className={styles.total_part}>合计{total}人</div>
            {!total ? (
              <div className={styles.tip}>
                <p className="secondary_text">
                  暂无学生数据，请前去学生管理中批量导入或新增学生
                  <span className={styles.grade_text} onClick={() => onJump('/student')}>
                    学生管理
                  </span>
                </p>
              </div>
            ) : null}
          </>
        ) : (
          <Form.Item label="筛查学生" rules={defaultRulesConfig('选择筛查学生')} name="gradeIds">
            <p className="secondary_text">
              暂无年级数据，请前去学校管理中进行
              <span className={styles.grade_text} onClick={() => onJump('/school/grade')}>
                年级班级设置
              </span>
            </p>
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
  };
};
