import { Modal } from 'antd';
import styles from './operation-modal.less';
import { Upload, message, Radio, Space, Select, Form } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ExportModal } from '@/pages/components/export-modal';
import React, { useState, useEffect } from 'react';
import type { FormInstance } from 'antd/es/form';
// import { values } from 'lodash';

const { Dragger } = Upload;
const { Option } = Select;

// 年级option类型
interface gradeOptionType {
  label: string;
  value: string;
}

export const OperationModal: React.FC<API.ModalItemType & { typeKey?: string }> = (props) => {
  const { typeKey } = props;

  const formRef = React.createRef<FormInstance>();

  // 导出
  const [gradeList, setGradeList] = useState<gradeOptionType[]>([]); // 学生列表

  // const [gradeId, setGradeId] = useState();
  const [exportType, setExportType] = useState(1); // 导出类型

  let fileList: any[] = [];

  // 导入
  const loadProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    maxCount: 1,
    beforeUpload() {
      return false;
    },
    onChange(info: any) {
      fileList = info.fileList;
    },
    onDrop(e: any) {
      fileList = e.dataTransfer.files;
    },
  };

  useEffect(() => {
    // todo 接口
    typeKey === 'import' && setGradeList([{ label: '一年级', value: '11' }]);
  }, []);

  const onComfirm = () => {
    if (typeKey === 'import') {
      if (!fileList.length) {
        message.error('请上传需要导入的学生数据');
      }
    } else if (exportType === 2) {
      formRef?.current?.validateFields().then((values) => {
        console.log(values, '123');
      });
    }
    // todo 接口调试-关闭弹窗
    // props.onCancel();
  };

  return typeKey === 'import' ? (
    <Modal
      title="导入学生数据"
      width={800}
      visible={props.visible}
      onOk={onComfirm}
      onCancel={props.onCancel}
    >
      <p className={styles.title}>学校： XXXXX学校</p>
      <p className={styles.explain}>说明：请先下载筛查学生数据模板表，按照模板填写后，再上传</p>
      <p className={styles.modular}>
        模板：
        <span className={styles.load_font} onClick={() => window.open('/excel/导入学生表.xlsx')}>
          学生数据表模板.xls，点击下载
        </span>
      </p>

      <Dragger {...loadProps}>
        <CloudUploadOutlined className={styles.icon} />
        <p className="ant-upload-hint">点击导入表格</p>
      </Dragger>
    </Modal>
  ) : (
    <ExportModal
      visible={props.visible}
      title={'学生数据'}
      onCancel={props.onCancel}
      onOk={onComfirm}
    >
      <div className={styles.content}>
        <p className={styles.title}>请确认学生数据导出条件：</p>
        <Radio.Group
          className={styles.radio}
          onChange={(e) => setExportType(e.target.value)}
          value={exportType}
        >
          <Space direction="vertical">
            <Radio value={1}>导出全校学生数据</Radio>
            <Radio value={2}>导出年级学生数据</Radio>
          </Space>
        </Radio.Group>
        {exportType === 2 ? (
          <Form ref={formRef} autoComplete="off">
            <Form.Item name="gradeId" rules={[{ required: true, message: '请选择年级' }]}>
              <Select allowClear placeholder="请选择年级">
                {gradeList.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ) : null}
        <p>导出内容：在所选择学校下对应选择年级的全部学生信息</p>
      </div>
    </ExportModal>
  );
};
