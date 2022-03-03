import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { getPopupContainer } from '@/hook/ant-config';
import { getGradeCode, getsGradeAll, editSchoolGradeAndClassAll } from '@/api/school';
import { useModel } from 'umi';
import styles from './add-modal.less';
import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { Select, Form, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { modalConfig } from '@/hook/ant-config';
import type { SelectValue } from 'antd/lib/select';

const { Option } = Select;

// 批量编辑的年级班级数据类型(表单)
type FieldsValueType = {
  form: {
    gradeCode?: React.Key;
    name?: string;
  }[];
};

let selectArr = [] as SelectValue[]; // 默认选中的年级班级

export const AddModal: React.FC<API.ModalItemType> = (props) => {
  const ref = useRef<ProFormInstance>();
  const validatorReg = /^[\u4e00-\u9fa5、\da-zA-Z]+$/;
  const [gradeOption, setGradeOption] = useState<API.GradeOptionType[]>([]);
  const [selectGradeIds, setSelectGradeIds] = useState<SelectValue[]>([]); // 当前选中的年级ids
  const [originList, setOriginList] = useState([]); // 已有的年级班级
  const [newClassList, setNewClassList] = useState<Record<string, string>>({});

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;
  const schoolId = currentUser?.orgId;

  // 获取年级下拉列表
  const init = async () => {
    const [grade, list] = await Promise.all([getGradeCode(), getsGradeAll()]);
    const { data = [] } = list;
    setGradeOption(grade?.data ?? []);
    setOriginList(data);
    const defaultFormArr = data.length
      ? data.map((item: API.GradeListItem) => ({
          gradeCode: item.gradeCode,
          id: item?.id,
          name: item?.name,
        }))
      : [{ gradeCode: '', name: '' }];
    selectArr = data.map((item: { gradeCode: React.Key }) => item.gradeCode);
    setSelectGradeIds(selectArr);
    ref?.current?.setFieldsValue({ form: defaultFormArr });
  };

  useEffect(() => {
    props.visible && init();
  }, [props.visible]);

  /**
   * @desc 选中下拉,
   * @param value 选中值
   * @param index field map 下的index
   */
  const selectOnChange = (value: SelectValue, index: number) => {
    setSelectGradeIds((val) => {
      val.splice(index, 1, value);
      return [...val];
    });
    const nowIndex = gradeOption.findIndex((item) => item.code === value);
    const fieldsValue = ref?.current?.getFieldsValue() as FieldsValueType;
    fieldsValue.form[index].name = gradeOption[nowIndex].name;
    ref?.current?.setFieldsValue(fieldsValue);
  };

  /**
   * @desc 回显已有班级,
   */
  const formatExitedClass = (index: number) => {
    const { child = [] } = originList[index] ?? {};
    return child.map((eleItem: { name: any }) => eleItem.name).join('、');
  };

  /**
   * @desc 回显新增班级,
   */
  const textareaChange = (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const { child = [] as any[] } = originList[index] ?? {};
    const childNames = child.map((eleItem) => eleItem.name);
    const validatorStr = validatorReg.test(value)
      ? value
          .split('、')
          .filter((item: any) => !childNames.includes(item) && item)
          .join('、')
      : '';
    setNewClassList((val) => ({
      ...val,
      [index]: validatorStr,
    }));
  };

  /**
   * @desc 检验
   */
  const classNamesValidator = (rule: any, value: any): Promise<string | boolean> => {
    if (!value) return Promise.resolve(true);
    const index = rule.field.match(/\d/)[0];
    const { child = [] as any[] } = originList[index] ?? {};
    const childNames = child.map((eleItem) => eleItem.name);
    const values = value.split('、');
    const exitedNames = values.filter((item: any) => childNames.includes(item));

    if (value && !validatorReg.test(value)) {
      return Promise.reject('班级名称用、隔开，如1班、2班、3班');
    }
    if (exitedNames.length) {
      return Promise.reject(`${exitedNames.join('、')}已重复`);
    }
    return Promise.resolve(true);
  };

  /**
   * @desc 删除
   */
  const onDelete = (index: number) => {
    setSelectGradeIds((val) => {
      val.splice(index, 1);
      return [...val];
    });
  };

  /**
   * @desc 新增
   */
  const onAdd = () => {
    setSelectGradeIds((val) => {
      val.push(undefined);
      return [...val];
    });
  };

  /**
   * @desc 批量添加
   */
  const onComfirm = async (value: Record<string, any>) => {
    const { form = [] } = value;
    if (form.length) {
      const arr = form.filter(
        (item: { gradeCode: SelectValue; className?: string }) =>
          !(selectArr.includes(item?.gradeCode) && !item.className),
      );
      const parm = arr.map((item: API.GradeListItem & { className: string }) => ({
        schoolGrade: {
          id: item?.id,
          schoolId,
          gradeCode: item?.gradeCode,
          name: item?.name,
        },
        schoolClass: item.className
          ? item.className.split('、').map((eleItem) => ({
              schoolId,
              name: eleItem,
            }))
          : [],
      }));
      await editSchoolGradeAndClassAll(parm);
      message.success('批量编辑成功');
      props?.onFinish?.();
    }
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
          <Form.List name="form">
            {(fields, { add, remove }) => (
              <>
                {fields.map((key, index) => (
                  <div className={styles.content_right_item} key={index}>
                    <div style={{ display: 'flex' }}>
                      <Form.Item
                        name={[index, 'gradeCode']}
                        rules={[{ required: true, message: '请选择年级' }]}
                        style={{ width: 'fit-content' }}
                      >
                        <Select
                          placeholder="请选择年级"
                          style={{ width: 290 }}
                          onChange={(e) => selectOnChange(e, index)}
                          getPopupContainer={getPopupContainer}
                          disabled={index < originList.length}
                        >
                          {gradeOption.map((item) => (
                            <Option
                              value={item.code}
                              key={item.value}
                              disabled={selectGradeIds.includes(item.code)}
                            >
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      {index && index > originList.length - 1 ? (
                        <Button
                          type="primary"
                          danger
                          className={styles.btn_delete}
                          onClick={() => {
                            remove(index);
                            onDelete(index);
                          }}
                        >
                          删除
                        </Button>
                      ) : null}
                    </div>
                    <span className={styles.tip}>已有班级：{formatExitedClass(index)}</span>
                    <div className={styles.modular}>
                      <ProFormTextArea
                        name={[index, 'className']}
                        label="新增班级"
                        placeholder="请输入名称"
                        fieldProps={{
                          onChange: (e) => textareaChange(e, index),
                        }}
                        rules={[{ validator: classNamesValidator }]}
                      />
                      <span className={styles.tip} style={{ marginLeft: 90 }}>
                        新增班级：{newClassList[index]}
                      </span>
                    </div>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    className={styles.btn}
                    onClick={() => {
                      add();
                      onAdd();
                    }}
                  >
                    添加年级
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
      </div>
    </ModalForm>
  );
};
