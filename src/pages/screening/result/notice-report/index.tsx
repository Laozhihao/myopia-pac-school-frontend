// import type { FormInstance } from 'an
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PreStep } from './components/pre-step';
import { Step } from './components/step';
import { modalConfig } from '@/hook/ant-config';
import { NextStep } from './components/next-step';
import styles from './index.less';
import type { FormInstance } from '@ant-design/pro-form';
import { setReportInfo, asyncGeneratorPDF, syncGeneratorPDF } from '@/api/screen';

export type IdsType = {
  schoolName: string;
  schoolId: string | number;
  planId: string | number;
  orgId: string | number;
};
type EleReportType = {
  ids: IdsType;
} & API.ModalItemType;

export const NoticeReport: React.FC<EleReportType> = (props) => {
  const { ids } = props;
  const [step, setStep] = useState<number>(1);

  const preFormRef = useRef<FormInstance | null>(null);
  const nextFormRef = useRef<FormInstance | null>(null);

  const [nextLoading, setNextLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    props.visible && setStep(1);
  }, [props.visible]);
  const nextStep = async () => {
    try {
      const { schoolId } = ids;
      setNextLoading(true);
      const result = await preFormRef.current?.validateFields();
      await setReportInfo(result, schoolId);
      setStep(2);
    } finally {
      setNextLoading(false);
    }
  };
  // 异步导出
  const asyncExport = async (params: any) => {
    await asyncGeneratorPDF(params);
    message.success('操作成功，请注意站内信提醒！！');
    props.onCancel();
  };
  // 预览pdf
  const openPdf = (url: string) => {
    url && window.open(`/school/pdf/viewer.html?file=${url}`);
  };
  // 同步导出
  const syncExport = async (params: any) => {
    try {
      const { data } = await syncGeneratorPDF(params);
      openPdf(data?.url);
      props.onCancel();
    } catch (err) {
      console.log(err);
    }
  };
  // 是否选择了班级
  const hasClasses = (arr: any[]) => {
    if (arr[1] && arr[1].toString().indexOf('all') === -1) {
      return true;
    }
    return false;
  };
  // 生成pdf
  const exportPDF = async () => {
    try {
      const { schoolId, planId, orgId } = ids;
      const result = await nextFormRef.current?.validateFields();
      const { studentIds = [], grade = [] } = result;
      const hasClass = hasClasses(grade);
      const planStudentIdStr = studentIds.join(',');
      setExportLoading(true);
      const params = {
        planId,
        schoolId,
        gradeId: grade[0] || null,
        classId: hasClass ? grade[1] : null,
        orgId,
        planStudentIdStr,
      };
      if (planStudentIdStr || hasClass) {
        await syncExport(params);
      } else {
        await asyncExport(params);
      }
    } finally {
      setExportLoading(false);
    }
  };
  return (
    <Modal
      title="打印通知书"
      visible={props.visible}
      width={780}
      className={styles.notice}
      onCancel={() => props.onCancel()}
      destroyOnClose
      footer={[
        <div className={styles.footer} key="footer-btn">
          {step === 1 ? (
            <Button
              key="back"
              type="primary"
              loading={nextLoading}
              className={styles.prev_btn}
              onClick={nextStep}
            >
              下一步
              <ArrowRightOutlined />
            </Button>
          ) : (
            <div className={styles.steps_action}>
              <Button
                key="submit"
                type="primary"
                icon={<ArrowLeftOutlined />}
                className={styles.next_btn}
                onClick={() => setStep(1)}
              >
                上一步
              </Button>
              <Button
                key="export"
                className={styles.output_btn}
                loading={exportLoading}
                icon={<DownloadOutlined />}
                type="primary"
                onClick={exportPDF}
              >
                生成
              </Button>
            </div>
          )}
        </div>,
      ]}
      {...modalConfig}
    >
      <Step step={step} key="step" />
      {step === 1 ? (
        <div>
          <span className={styles.tit}>告知书样板:</span>
          <PreStep key="preStep" ids={props.ids as IdsType} ref={preFormRef} />
        </div>
      ) : (
        <Spin spinning={exportLoading} delay={300}>
          <NextStep key="nextStep" ids={props.ids as IdsType} ref={nextFormRef} />
        </Spin>
      )}
    </Modal>
  );
};
