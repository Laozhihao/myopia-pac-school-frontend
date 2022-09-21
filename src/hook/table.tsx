import { SmileOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { notification } from 'antd';
import type { ArgsProps } from 'antd/lib/notification';
/**
 * @desc 删除表格项
 * @param message 删除文本
 * @param callback 确认删除回调
 */

export const deleteTableRow = (message: string, callback: (() => void) | undefined) => {
  const { confirm } = Modal;
  confirm({
    title: `是否删除${message}`,
    centered: true,
    onOk() {
      callback?.();
    },
  });
};


export const notificationHook = (Option: ArgsProps) => {
  notification.open({
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    style: {
      wordWrap: 'break-word',
      wordBreak: 'break-all',
    },
    ...Option,
  });
};


/**
 * @desc 重置密码
 * @param record 当前记录的数据
 * @param isNeedAlert 是否需要弹窗确认
 * @param apiFn 重置密码api
 */

 export const resetPwdHook =  (record: any, apiFn: (record?: any) => {}, isNeedAlert = true, callback?: (() => void) | undefined) => {
  const { confirm } = Modal;
  confirm({
    title: '提示',
    content: '你确定重置密码吗？',
    centered: true,
    async onOk() {
      const { data } = await apiFn(record);

      if (isNeedAlert && data?.password) {
        notificationHook({
          message: '重置密码成功！',
          description: `账号：${data?.username ?? record?.username}，密码：${data?.password ?? ''}`,
          duration: 15,
        });
      }
      callback?.();
    },
  });
};

/**
 * @desc 二次确认框
 * @param message 文本
 * @param callback 确认回调
 */
export const secondaryConfirmation = (message: string, callback: (() => void) | undefined) => {
  const { confirm } = Modal;
  confirm({
    title: message,
    centered: true,
    onOk() {
      callback?.();
    },
  });
};

/**
 * @desc 身份证获取出生日期
 * @param idCard 删除文本
 */

export const getBirthday = (idCard: string) => {
  const temStr = idCard.substring(6, 14);
  return `${temStr.substring(0, 4)}-${temStr.substring(4, 6)}-${temStr.substring(6)}`;
};
