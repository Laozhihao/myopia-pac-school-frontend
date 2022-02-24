import { Modal, Spin, Table } from 'antd';
import { inspectType } from './columns';
import styles from './detail-modal.less';
import { useEffect, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { useRequest, history } from 'umi';
import { getStudentScreenDetail } from '@/api/student';
import { getFixedNum } from '@/utils/common';

export const DetailModal: React.FC<API.ModalItemType> = (props) => {
  const [loading, setLoading] = useState(false);
  const [studentInspectType, setStudentInspectType] = useState<API.ObjectType>({});

  const { query: { studentId } = {} } = history.location;

  /**
   * @desc 处理眼球展示数据
   */
  const transEyeSideData = (data: Record<string, React.Key>) => {
    for (const key in data) {
      // 1. 视力检查 裸眼和矫正保留一位小数 2. 电脑验光 轴向取整
      if (['correctedVision', 'nakedVision', 'axial'].includes(key)) {
        data[key] = getFixedNum(data[key], Number(key !== 'axial'));
      }
    }
    return data;
  };

  const { run } = useRequest(getStudentScreenDetail, {
    manual: true,
    onSuccess: (result: any) => {
      for (let i = 0; i < inspectType.length; i++) {
        const element = inspectType[i];
          let arr: any[] = [];
          if (result[element.dataIndex]) {
            if (element.dataIndex === 'heightAndWeightData') {
              arr = [{
                weight: result?.heightAndWeightData?.weight,
                height: result?.heightAndWeightData?.height,
              }];
            }
            else if (element.dataIndex === 'other') {
              arr = [
                {
                  eyes: 'OD 右眼',
                  slitLampData: result?.slitLampData?.rightEyeData?.diagnosis, // 右裂隙灯
                  ocularInspectionData: result?.ocularInspectionData?.diagnosis, // 右裂隙灯
                  fundusData: result?.fundusData?.rightEyeData?.hasAbnormal, // 右眼底
                  otherEyeDiseases: result?.otherEyeDiseases && result.otherEyeDiseases.rightEyeData.eyeDiseases.join('、'), // 右其他眼病
                },
                {
                  eyes: 'OS 左眼',
                  slitLampData: result?.slitLampData?.leftEyeData.diagnosis, // 左裂隙灯
                  ocularInspectionData: result?.ocularInspectionData?.diagnosis, // 左眼位
                  fundusData: result?.fundusData?.leftEyeData.hasAbnormal, // 左眼底
                  otherEyeDiseases: result?.otherEyeDiseases && result?.otherEyeDiseases?.leftEyeData.eyeDiseases.join('、'), // 左其他眼病
                }
              ];
            }
            else {
              const { leftEyeData = {}, rightEyeData = {} } = result[element.dataIndex];
              leftEyeData.eyes = 'OS 左眼';
              rightEyeData.eyes = 'OD 右眼';
              arr = [transEyeSideData(rightEyeData), transEyeSideData(leftEyeData)];
            }
  
            setStudentInspectType(value => ({
              ...value,
              [element.dataIndex]: {
                title: element.title,
                columns: element.columns,
                value: arr,
                isWearGlasses: result.visionData && (result.visionData.leftEyeData.glassesType || result.visionData.rightEyeData.glassesType),
              }
            }));
          }
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const { visible, currentRow } = props;
    if (visible && currentRow?.planId) {
      setLoading(true);
      run({studentId, planId: currentRow.planId})
    };
  }, [props.visible]);

  const onCancel = () => {
    setStudentInspectType({});
    props.onCancel();
  }


  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={onCancel}
      width={810}
      footer={null}
      {...modalConfig}
    >
      <Spin spinning={loading}>
        {
          Object.keys(studentInspectType).map(item => (
            <div key={item} className={styles.content}>
              <p className={styles.title}>{studentInspectType[item].title}</p>
              <Table dataSource={studentInspectType[item].value} columns={studentInspectType[item].columns} scroll={{ x: 'max-content' }} pagination={false}/>
            </div>
          ))
        }
      </Spin>
    </Modal>
  );
};
