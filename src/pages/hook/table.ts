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
