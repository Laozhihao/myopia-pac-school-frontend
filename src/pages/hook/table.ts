import { Modal } from 'antd';

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

/**
 * @desc 身份证获取出生日期
 * @param idCard 删除文本
 */

export const getBirthday = (idCard: string) => {
  const temStr = idCard.substring(6, 14);
  return `${temStr.substring(0, 4)}-${temStr.substring(4, 6)}-${temStr.substring(6)}`;
};
