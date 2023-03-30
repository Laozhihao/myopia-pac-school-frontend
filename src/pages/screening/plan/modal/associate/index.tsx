import { useMemo, useRef, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { message, Form, Radio, Button, Modal } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import IconFont from '@/components/IconFont';
import { modalConfig } from '@/hook/ant-config';
import { defaultRulesConfig, formatDate } from '@/utils/common';
import { getPlanLinkNotice, savelinkNotice } from '@/api/screen/plan';
import styles from './index.less';

type taskNamesType = {
  title?: React.Key;
  govDeptName?: React.Key;
  screeningTaskId?: React.Key;
  screeningNoticeDeptOrgId?: React.Key;
  releaseName?: React.Key;
  releaseTime?: number | string;
};

export const AssociateModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();

  const [taskOptions, setTaskOptions] = useState<taskNamesType[]>([]); // 筛查任务列表
  const [step, setStep] = useState(1); // 操作步骤
  const [confirmLoading, setConfirmLoading] = useState(false); // 确定操作按钮 loading
  const [selectTask, setSelectTask] = useState<taskNamesType | null>(null); // 已选择的关联筛查任务

  const { title, visible, currentRow } = props;

  /**
   * @desc 获取可关联的筛查任务列表
   */
  useMemo(async () => {
    if (visible) {
      const { data } = await getPlanLinkNotice();
      setTaskOptions(data);
    }
  }, [visible]);

  /**
   * @desc radio 选择句柄
   */
  const onRadioChange = (e: RadioChangeEvent) => {
    const task = taskOptions.filter((item) => item.screeningTaskId === e.target.value)[0];
    setSelectTask(task);
  };

  /**
   * @desc 确定操作
   */
  const onConfirm = async () => {
    setConfirmLoading(true);
    const { screeningTaskId, screeningNoticeDeptOrgId } = selectTask!;
    const params = {
      planId: currentRow?.planId,
      screeningTaskId,
      screeningNoticeDeptOrgId,
    };
    await savelinkNotice(params);
    setConfirmLoading(false);
    setStep(1);
    props.onCancel(true);
    message.success('关联成功');
  };

  return (
    <>
      <ModalForm
        title={title}
        formRef={modalRef}
        width={785}
        visible={visible}
        layout="vertical"
        modalProps={{
          ...modalConfig,
          destroyOnClose: true,
          onCancel: () => props.onCancel(false),
        }}
        submitter={{
          render: () => {
            return [
              <Button
                key="ok"
                type="primary"
                disabled={taskOptions.length === 0}
                onClick={() => {
                  modalRef?.current?.validateFields().then(() => {
                    setStep(2);
                  });
                }}
              >
                确定关联
              </Button>,
            ];
          },
        }}
      >
        <div className={styles.header_w}>
          <div className={styles.title}>关联操作使用场景说明：</div>
          <div>
            如果上级部门发布了筛查任务，但是您已经创建了筛查计划在执行因而无法汇总数据给上级部门，使用本功能可将已在执行的筛查计划关联至区域筛查任务中。您需要注意以下事项：
          </div>
          <div>1.每个自主筛查计划只能关联至一个筛查任务，关联后无法撤销，请谨慎操作。</div>
          <div>
            2.自主筛查计划关联至区域筛查任务后，该自主筛查将切换成为区域筛查计划，数据自动汇总至上级部门的系统统计中。
          </div>
          <div>
            3.关联后，您筛查计划标题前将会出现
            <IconFont
              type="icon-icon-quyu-16"
              style={{
                fontSize: 24,
              }}
            />
            标签，表示已关联成功。
          </div>
        </div>
        <div className={styles.select_w}>
          <div className={styles.title}>已选中筛查计划：</div>
          <div>筛查任务标题：{currentRow?.title}</div>
          <div>发布时间：{currentRow?.releaseTime}</div>
        </div>
        <div className={styles.form_w}>
          <Form.Item
            label="请选择要关联的筛查任务"
            name="screeningTaskId"
            rules={defaultRulesConfig('请选择需要关联的筛查任务')}
          >
            <Radio.Group onChange={onRadioChange}>
              {taskOptions.map((item: any) => (
                <Radio
                  className={styles.select_w}
                  key={item.screeningTaskId}
                  value={item.screeningTaskId}
                >
                  <div>发布部门：{item.govDeptName}</div>
                  <div>筛查任务标题：{item.title}</div>
                  <div>发布时间：{formatDate(item.releaseTime)}</div>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>
      </ModalForm>
      {/* 二步确定 */}
      <Modal
        width={785}
        visible={step === 2}
        okText="确定操作"
        onOk={onConfirm}
        onCancel={() => setStep(1)}
        confirmLoading={confirmLoading}
        {...modalConfig}
      >
        <header className={styles.confirm_h}>
          <div className={styles.confirm_h_title}>操作确认</div>
          <div className={styles.confirm_h_desc}>此操作不可撤销，请谨慎操作</div>
        </header>
        <div className={styles.select_w}>
          <div className={styles.title}>您将把筛查计划：</div>
          <div>筛查任务标题：{currentRow?.title}</div>
          <div>发布时间：{formatDate(currentRow?.releaseTime)}</div>
        </div>
        <div className={styles.select_w}>
          <div className={styles.title}>关联至以上筛查任务</div>
          <div>发布部门：{selectTask?.releaseName}</div>
          <div>筛查任务标题：{selectTask?.title}</div>
          <div>发布时间：{formatDate(selectTask?.releaseTime)}</div>
        </div>
      </Modal>
    </>
  );
};
