import React, { useMemo, useState } from 'react';
import { Modal, Spin, Table } from 'antd';
import { getScreeningStudentDetailList } from '@/api/screen/student';
import { modalConfig } from '@/hook/ant-config';
import { inspectType } from './columns';
import styles from './index.less';
import { GLASSESTYPE } from '@/utils/constant';
import { isNotEmpty } from '@vistel/vistel-utils/lib/tool';

// currentRow 类型
type DetailModalDetailType = {
  screeningPlanStudentId?: React.Key;
  screeningPlanId?: React.Key;
};

export const DetailModal: React.FC<API.ModalItemType> = (props) => {
  const { title, visible, currentRow } = props;
  const [detailDataSource, setDetailDataSource] = useState<{ glassesType?: React.Key }>({}); // 详情数据

  const [loading, setLoading] = useState(false);

  useMemo(async () => {
    if (visible) {
      setLoading(true);
      const { screeningPlanStudentId, screeningPlanId } = currentRow as DetailModalDetailType;
      const { data } = await getScreeningStudentDetailList({
        screeningPlanStudentId,
        screeningPlanId,
      });
      setDetailDataSource(data);
      setLoading(false);
    }
  }, [visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => props.onCancel(false)}
      width={810}
      footer={null}
      {...modalConfig}
    >
      <Spin spinning={loading}>
        {inspectType.map((item) =>
          detailDataSource[item.dataIndex] ? (
            <div key={item.dataIndex} className={styles.content}>
              <p className={styles.title}>
                {item.title}
                {item.dataIndex === 'visionData' && (
                  <span className={styles.glasses_tip}>
                    {isNotEmpty(detailDataSource?.glassesType) &&
                      GLASSESTYPE[detailDataSource?.glassesType!]}
                  </span>
                )}
              </p>
              {item?.columns?.map((eleItem: any, eleIndex: number) => (
                <Table
                  key={eleIndex}
                  dataSource={
                    Array.isArray(detailDataSource[item.dataIndex])
                      ? detailDataSource[item.dataIndex]
                      : [detailDataSource[item.dataIndex]]
                  }
                  rowKey="eyeType"
                  columns={eleItem}
                  scroll={{ x: 'max-content' }}
                  pagination={false}
                  style={{ marginTop: 15 }}
                />
              ))}
            </div>
          ) : null,
        )}
      </Spin>
    </Modal>
  );
};
