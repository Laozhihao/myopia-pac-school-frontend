import { Modal } from 'antd';
import styles from './operation-modal.less';
import { Upload, message, Radio, Space, Select, Form } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ExportModal } from '@/pages/components/export-modal';
import React, { useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { exportStudent, importStudent } from '@/api/student';
import { useModel } from 'umi';
import { getPopupContainer } from '@/hook/ant-config';

const { Dragger } = Upload;
const { Option } = Select;

export const OperationModal: React.FC<
  API.ModalItemType & { typeKey?: string; gradeOption?: any[] }
> = (props) => {
  const { typeKey, gradeOption = [] } = props;

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState!;

  const formRef = React.createRef<FormInstance>();

  const [exportType, setExportType] = useState(1); // 导出类型
  const [fileList, setFileList] = useState<any[]>([]); // 导入file

  // 导入
  const loadProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    maxCount: 1,
    beforeUpload() {
      return false;
    },
    onChange(file: any) {
      setFileList(() => {
        return file?.fileList[0]?.originFileObj ? [file?.fileList[0]?.originFileObj] : [];
      });
    },
  };

  /**
   * @desc 导出
   */
  const onExport = (obj?: API.ObjectType) => {
    exportStudent(obj).then(() => {
      message.success('导出成功');
      setExportType(1);
      props.onCancel();
    });
  };

  const onComfirm = () => {
    const formData = new FormData();
    switch (typeKey) {
      // 导入
      case 'import':
        if (!fileList.length) {
          message.error('请上传需要导入的学生数据');
          return;
        }
        fileList.forEach((file) => {
          formData.append('file', file);
        });
        importStudent(formData).then(() => {
          message.success('导入成功');
          props.onCancel(true);
        });
        break;

      // 导出
      case 'export':
        if (exportType === 2) {
          formRef?.current?.validateFields().then((values) => {
            values && onExport(formRef?.current?.getFieldsValue());
          });
        } else onExport();
        break;

      default:
        break;
    }
  };

  return typeKey === 'import' ? (
    <Modal
      title="导入学生数据"
      width={800}
      visible={props.visible}
      onOk={onComfirm}
      destroyOnClose
      onCancel={() => props.onCancel()}
    >
      <p className={styles.title}>学校： {currentUser?.orgName}学校</p>
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
      onCancel={() => {
        setExportType(1);
        props.onCancel();
      }}
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
          <Form ref={formRef}>
            <Form.Item name="gradeId" rules={[{ required: true, message: '请选择年级' }]}>
              <Select allowClear placeholder="请选择年级" getPopupContainer={getPopupContainer}>
                {gradeOption.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
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
