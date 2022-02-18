import { Modal, Spin, Table } from 'antd';
import { inspectType } from './columns';
import styles from './detail-modal.less';
import { useState } from 'react';
import { modalConfig } from '@/hook/ant-config';

export const DetailModal: React.FC<API.ModalItemType> = (props) => {
  const [loading] = useState(false);
  const [tableData] = useState([]);

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      width={810}
      footer={null}
      {...modalConfig}
    >
      <Spin spinning={loading}>
        {inspectType.map((item) => (
          <div key={item.dataIndex}>
            <p className={styles.title}>{item.title}</p>
            <Table dataSource={tableData} columns={item.columns} scroll={{ x: 'max-content' }} />
          </div>
        ))}
      </Spin>
    </Modal>
  );
};
