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
 * @desc 数据转成form data格式
 * @param params 需要转的对象
 */
/* eslint-disable */
export function toFormData(params: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      formData.append(key, params[key] ?? '');
    }
  }
  return formData;
}
