import type { CheckboxOptionType } from 'antd';
import { Checkbox, Form } from 'antd';
import { defaultRulesConfig } from '@/utils/common';
import styles from './plan.less';

export const FormItemOptions = (studentOption: (string | CheckboxOptionType)[]) => ({
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
      label: '筛查时间段',
      type: 'datePicker',
      value: 'time',
      showLabel: true,
      col: {
        span: 24,
      },
      rules: defaultRulesConfig('选择筛查时间段'),
    },
    {
      value: 'student',
      col: {
        span: 24,
      },
      slot: (
        <Form.Item label="筛查学生" rules={defaultRulesConfig('选择筛查学生')} name="checkbox">
          {Array.isArray(studentOption) && studentOption?.length ? (
            <Checkbox.Group options={studentOption} />
          ) : (
            <div className={styles.tip}>
              <p className="secondary_text">
                暂无年级数据，请前去学校管理中进行年级班级的设置{' '}
                <span className={styles.grade_text}>年级班级设置</span>
              </p>
              <p className={styles.total_part}>合计： XXXXXXXXX人</p>
            </div>
          )}
        </Form.Item>
      ),
    },
    {
      label: '筛查内容',
      type: 'textArea',
      value: 'remark',
      showLabel: true,
      col: {
        span: 24,
      },
    },
  ],
});
