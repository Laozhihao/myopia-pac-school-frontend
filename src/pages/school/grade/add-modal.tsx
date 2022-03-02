import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getPopupContainer } from '@/hook/ant-config';
import { getGradeCode, addGrade, addClass, getsGradeAll } from '@/api/school';
import { useModel } from 'umi';
import styles from './add-modal.less';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Select, Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { modalConfig } from '@/hook/ant-config';

const { Option } = Select;

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const ref = useRef<ProFormInstance>();
  const validatorReg = /^[\u4e00-\u9fa5、\da-zA-Z]+$/;
  const [gradeOption, setGradeOption] = useState<API.GradeOptionType[]>([]);
  const [selectGradeIds, setSelectGradeIds] = useState<React.Key[]>([]); // 当前选中的年级ids
  const [originList, serOriginList] = useState([]); // 已有的年级班级
  const [newClassList, setNewClassList] = useState<string[]>([]);

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  const schoolId = currentUser?.orgId;

  // 获取年级下拉列表
  const init = async() => {
    const [grade, list] = await Promise.all([getGradeCode(), getsGradeAll()]);
    const { data = [] } = list;
    setGradeOption(grade?.data ?? []);
    serOriginList(data);
    const defaultFormArr = data.map((item: { gradeCode: React.Key }) => ({ gradeCode: item.gradeCode }));
    const selectArr = data.map((item: { gradeCode: React.Key }) => item.gradeCode);
    setSelectGradeIds(selectArr);
    // ref?.current?.setFieldsValue({form: defaultFormArr});
  }

  useEffect(() => {
    props.visible && init();
  }, [props.visible]);

  /**
   * @desc 选中下拉, 
   * @param value 选中值
   * @param name field map 下的index
   */
  const selectOnChange = (value: React.Key) => {
  }

  /**
   * @desc 回显已有班级, 
   */
  const formatExitedClass = (index: number) => {
    const { child = [] } = originList[index] ?? {};
    console.log(originList[index], '123');
    return child.map((eleItem: { name: any }) => eleItem.name).join('、');
  };

  /**
   * @desc 回显新增班级, 
   */
  const formatClass = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;

    const { child = [] as any[] } = originList[index] ?? {};
    const childNames = child.map(eleItem => eleItem.name);
    const  validatorStr = validatorReg.test(value) ? value.split('、').filter((item: any) => !childNames.includes(item))
      .join('、') : '';
    setNewClassList((val) => {
      val[index] = validatorStr
      return val
    })
  };

  const onComfirm = async (value: Record<string, any>) => {
    console.log(ref?.current?.getFieldsValue(), value, '22');
    // props?.onFinish?.();
  };

  return (
    <ModalForm
      title={props.title}
      formRef={ref}
      width={750}
      visible={props.visible}
      layout="horizontal"
      onFinish={onComfirm}
      labelCol={{ style: { width: 90 } }}
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <span className={styles.primary_text}>
        年级班级管理（批量新增删除年级班级，如需单个新增编辑删除请直接在年级班级管理界面操作）
      </span>
      <div className={styles.content}>
        <span>年级：</span>
        <div className={styles.content_right}>
        <Form.List
        name="form"
        >
        {(fields, { add, remove }) => (
          <>
            {fields.map((key, index,  ...restField) => (
              <div className={styles.content_right_item} key={index}>
              <Form.Item {...restField} name={[index, 'gradeCode']}>
                <Select placeholder="请选择年级" allowClear style={{ width: 290 }} onChange={selectOnChange} getPopupContainer={getPopupContainer}>
                  {gradeOption.map((item) => (
                    <Option value={item.code} key={item.value} disabled={selectGradeIds.includes(item.code)}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                {/* <Button type="primary" danger className={styles.btn_delete} onClick={() => remove(name)}>删除</Button> */}
              </Form.Item>
              <span className={styles.tip}>已有班级：{ formatExitedClass(index) }</span>
              <div className={styles.modular}>
                <ProFormTextArea
                 {...restField}
                  name={[index, 'className']}
                  label="新增班级"
                  placeholder="请输入名称"
                  fieldProps={{
                    onChange: e => formatClass(e, index)
                  }}
                  />
                <span className={styles.tip} style={{marginLeft: 90}}>新增班级：{ newClassList[index] }</span>
              </div>
            </div>
            ))}
            <Form.Item><Button type="dashed" block icon={<PlusOutlined />} className={styles.btn} onClick={add}>添加年级</Button></Form.Item>
          </>
        )}
      </Form.List>
        </div>
      </div>
    </ModalForm>
  );
};
