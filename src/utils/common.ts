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

export function toFormData(params: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key in params) {
      if (params.hasOwnProperty(key)) {
          formData.append(key, params[key] ?? '');
      }
  }
  return formData;
}


/**
 * @desc 给级联options child的添加第一个节点：全部
 */
export const defaultKey = 'id';

export const dealCascaderOptions = (options: any, key = defaultKey) => {
  for (const eleItem of options) {
    if (eleItem?.child?.length) {
      const hasAll = eleItem.child.filter((item: { [x: string]: string; }) => item[key] === 'all');
      const allTemp = {
        [key]: 'all',
        name: '全部',
      };
      !hasAll.length && eleItem.child.unshift(allTemp);
      dealCascaderOptions(eleItem.child);
    }
  }
  return options;
};
