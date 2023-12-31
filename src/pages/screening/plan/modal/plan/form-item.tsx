import styles from './index.less';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { Checkbox, Form, Select, Space } from 'antd';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import moment from 'moment';
import { XINJIANG_YEAR_OPTIONS, XINJIANG_NUMS_OPTIONS } from '@/utils/constant';
import { defaultRulesConfig } from '@/utils/common';
import { getPopupContainer } from '@/hook/ant-config';

type StudentOptionType = {
  studentNum?: number;
} & API.GradeInfoType;

export const FormItemOptions = (
  studentOption: StudentOptionType[],
  isXinJiangDistrict: Boolean, // 是否是新疆用户
) => {
  const [total, setTotal] = useState(0); // 选中的学生总数

  useEffect(() => {
    const allStudentTotal = studentOption
      .map((item) => item?.studentNum)
      .reduce((pre, item) => pre! + item!, 0)!;
    // 合计
    setTotal(allStudentTotal);
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
        value: 'screeningTime',
        col: {
          span: 24,
        },
        slot: (
          <div className={styles.screen_item}>
            <ProFormDateRangePicker
              name="screeningTime"
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
        value: 'year',
        col: {
          span: 24,
        },
        slot: isXinJiangDistrict ? (
          <>
            <Space align={'start'} size={10}>
              <Form.Item
                label="自治区数据上报"
                rules={defaultRulesConfig('选择')}
                name="year"
                style={{ marginBottom: 12 }}
              >
                <Select
                  className={styles.select_w}
                  allowClear
                  placeholder="请选择"
                  getPopupContainer={getPopupContainer}
                  options={XINJIANG_YEAR_OPTIONS}
                ></Select>
              </Form.Item>
              <div className={styles.data_tips}>年，第</div>
              <Form.Item
                rules={defaultRulesConfig('选择')}
                name="time"
                style={{ marginBottom: 12 }}
              >
                <Select
                  className={styles.select_w}
                  allowClear
                  placeholder="请选择"
                  getPopupContainer={getPopupContainer}
                  options={XINJIANG_NUMS_OPTIONS}
                ></Select>
              </Form.Item>
              <div className={styles.data_tips}>次</div>
            </Space>
          </>
        ) : (
          <></>
        ),
      },
      {
        value: 'student',
        col: {
          span: 24,
        },
        slot: studentOption?.length ? (
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
                    {/* {item?.gradeName}({item?.studentNum}) */}
                    {item?.gradeName}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            {/* <div className={styles.total_part}>合计{total}人</div> */}
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
    ],
  };
};
