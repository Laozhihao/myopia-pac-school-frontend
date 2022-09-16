import { ModalForm } from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';
import { useRef, useState } from 'react';
import { modalConfig } from '@/hook/ant-config';
import { increasedScreeningTime } from '@/api/screen/plan';
import { message } from 'antd';
import { defaultRulesConfig } from '@/utils/common';
import styles from './index.less';
import { ProFormSelect } from '@ant-design/pro-form';
import { DATE, EMPTY, SCREENINGTIMEOPTIONS } from '@/utils/constant';
import moment from 'moment';

export const TimeModal: React.FC<API.ModalItemType> = (props) => {
  const modalRef = useRef<ProFormInstance>();
  const [selectTime, setSelectTime] = useState(undefined);

  const [endTime, setEndTime] = useState('');

  const { title, visible, currentRow } = props;

  /**
   * @desc 新增
   */
  const onConfirm = async () => {
    await increasedScreeningTime({ endTime, screeningPlanId: currentRow?.planId });
    props.onCancel(true);
    message.success('新增成功');
  };

  /**
   * @desc 筛查时间修改
   */
  const onChange = (e: any) => {
    setSelectTime(e);
    e && setEndTime(moment(currentRow?.startTime).add(e, 'd').format(DATE));
  };

  return (
    <ModalForm
      title={title}
      formRef={modalRef}
      width={750}
      visible={visible}
      onFinish={onConfirm}
      layout="horizontal"
      modalProps={{
        ...modalConfig,
        destroyOnClose: true,
        onCancel: () => props.onCancel(false),
      }}
    >
      <p className={styles.screen_time}>
        筛查时间段：
        {currentRow?.startTime ? `${currentRow?.startTime} 至 ${currentRow?.endTime}` : EMPTY}
      </p>
      <p className={styles.screen_tip}>
        注：每次筛查计划有且仅有1次增加筛查时间的机会，请合理增加时间确保所负责的学校可以在该时间段内完成
      </p>
      <ProFormSelect
        label="增加筛查时间"
        placeholder="请选择增加筛查时间"
        name="endTime"
        rules={defaultRulesConfig('请选择筛查时间')}
        options={SCREENINGTIMEOPTIONS}
        fieldProps={{
          onChange,
        }}
      />
      {selectTime ? (
        <p className={styles.select_time}>
          新的筛查时间 {`${currentRow?.startTime} 至 ${endTime}`}{' '}
        </p>
      ) : null}
    </ModalForm>
  );
};
