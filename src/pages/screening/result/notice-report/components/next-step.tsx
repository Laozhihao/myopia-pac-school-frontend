import { Form, Select, Cascader } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { screeningNoticeResult, getGrades } from '@/api/screen';
import styles from './next-step.less';
import { useState, useMemo, forwardRef } from 'react';
import { getPopupContainer } from '@/hook/ant-config';
import type { IdsType } from '../index';

type NextStepType = {
  ids: IdsType;
};
export const NextStep = forwardRef<any, NextStepType>((props, ref) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const { ids } = props;
  const { schoolName } = ids;

  const [studentList, setStudentList] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [currentGrade, setCurrentGrade] = useState('');
  const [currentStuNames, setCurrentStuNames] = useState('');
  useMemo(async () => {
    const { orgId, planId, schoolId } = ids;
    if (schoolId) {
      try {
        const params = {
          schoolId,
          orgId,
          planId,
          isSchoolClient: true,
        };
        const { data } = await screeningNoticeResult(params);
        setStudentList(data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useMemo(async () => {
    const { planId } = ids;
    if (planId) {
      const { data = [] } = await getGrades(planId);
      data.forEach((item: any) => {
        item.classes.unshift({
          id: `'all' + ${item.id}`,
          name: '全部',
        });
      });
      setGradeList(data);
    }
  }, []);

  const rtrim = (str: string) => {
    // 删除右边的、
    return str.replace(/(、*$)/g, '');
  };
  // 获取名称
  const getName = (arr: any[], id: string, name = 'name', isName = false) => {
    if (!arr.length) {
      return '';
    }
    let names = '';
    arr.forEach((v) => {
      if (v[id].toString().indexOf('all') === -1) {
        names += v[name] + (isName ? '、' : '');
      }
    });
    return names;
  };
  // 年级班级 变化
  const gradeChange = async (value: any[], option) => {
    const gradeId = value[0];
    const classId = value[1].toString().indexOf('all') === -1 ? value[1] : '';
    const { orgId, planId, schoolId } = ids;
    setCurrentGrade(getName(option, 'id'));
    const params = {
      schoolId,
      orgId,
      planId,
      gradeId,
      classId,
      isSchoolClient: true,
    };
    const { data } = await screeningNoticeResult(params);
    form.setFieldsValue({ studentIds: [] });
    setStudentList(data);
    setCurrentStuNames('');
  };
  // 学生变化
  const studentChange = async (value: any[], option) => {
    setStudentIds(value);
    const str = getName(option, 'key', 'children', true);
    setCurrentStuNames(rtrim(str));
  };
  // 搜索过滤
  const filterOption = (inputValue: string, option) =>
    option.props.children.indexOf(inputValue) >= 0;

  return (
    <Form {...layout} className={styles.next_step} form={form} ref={ref} requiredMark={false}>
      {
        <div>
          <Form.Item label="筛查学校">
            <Select defaultValue={schoolName} disabled />
          </Form.Item>
          <Form.Item label="选择年级/班级" name="grade">
            <Cascader
              options={gradeList}
              fieldNames={{ label: 'name', value: 'id', children: 'classes' }}
              onChange={gradeChange}
            />
          </Form.Item>
          <Form.Item label="筛查学生" name="studentIds">
            <Select
              mode="multiple"
              allowClear
              optionFilterProp="name"
              className={styles.stu_option}
              filterOption={filterOption}
              onChange={studentChange}
              getPopupContainer={getPopupContainer}
            >
              {studentList.map((item: any) => (
                <Option
                  value={item.planStudentId}
                  key={item.planStudentId}
                  disabled={!studentIds.includes(item.planStudentId) && studentIds.length > 9}
                >
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      }
      <Form.Item label="导出内容">
        所选择
        <span className={styles.s_desc}>{`${schoolName} ${currentGrade} ${currentStuNames}`}</span>
        的学生筛查结果通知书
      </Form.Item>
      <div className="matters">
        <div className="matters_tit">
          <ExclamationCircleOutlined className={styles.warn} />
          <span>注意事项</span>
        </div>
        <div className="matters_words">
          <ul>
            <li>
              1.按计划、按学校、按年级，导出成功后，下载链接将通过站内信推送，请关注站内消息提醒！
            </li>
            <li>
              2.按班级，按学生(单个或至多10个)，导出成功后，新开界面展示并可手动点击打印，请留意！
            </li>
          </ul>
        </div>
      </div>
    </Form>
  );
});
