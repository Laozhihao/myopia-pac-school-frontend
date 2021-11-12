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

/**
 * @desc 截取字符长度
 */

export const formatLength = (val: string, length = 15) =>
  val && val.length > length ? `${val.substr(0, length)}...` : val;

/**
 * @desc 富文本反转义html
 * @param {string} str
 */
export const escape2Html = (str: string) => {
  const arrEntities = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    amp: '&',
    quot: '"',
  };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (all, t) => arrEntities[t]);
};

/**
 * @desc 百分比计算
 * @param moleculeVal 分子值
 * @param denominatorVal 分母值
 * @param company 单位
 */

export function getPercentage(moleculeVal = 0, denominatorVal = 0, company = '%') {
  return `${((moleculeVal / denominatorVal) * 100).toFixed(2)}${company}`;
}

/**
 * @desc 获取累加数
 */

export function getTotalNumber(arr: any[]) {
  return arr.reduce((a, b) => a + b);
}
