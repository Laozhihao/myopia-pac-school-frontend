import moment from 'moment';
import { EMPTY, DATE } from '@/utils/constant';
import type { Rule } from 'antd/lib/form';

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
 **
 * @desc 格式化日期
 * @param time
 * @param {string} format - 格式
 */
export const formatDate = (time: number | string | undefined, format = DATE) =>
  time ? moment(time).format(format) : '';

/**
 * @desc 截取字符长度
 */

export const formatLength = (val?: string, length = 15) =>
  val && val.length > length ? `${val.substr(0, length)}...` : val;

/**
 * @desc 富文本转义html
 * @param {string} sHtml
 */
export const html2Escape = (sHtml) =>
  sHtml.replace(
    /[<>&"]/g,
    (c) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
      }[c]),
  );

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
  return denominatorVal === 0
    ? `${(moleculeVal * 100).toFixed(2)}${company}`
    : `${((moleculeVal / denominatorVal) * 100).toFixed(2)}${company}`;
}

/**
 * @desc 获取累加数
 */

export function getTotalNumber(arr: any[]) {
  return arr.reduce((a, b) => a + b);
}

/**
 * @desc 获取保留指定位数的小数点数据，默认保留两位
 * @param {number} num - 数据
 * @param {number} digit - 保留几位小数
 */
export const getFixedNum = (num: React.Key, digit = 2) => Number(num).toFixed(digit);

/**
 * @desc 获取保留指定位数的小数点数据，默认保留两位 加上单位
 * @param val - 数据
 * @param digit - 保留几位小数
 * @param unit - 单位
 */
export const typeNumberHandle = (val: any, digit?: number, unit?: string) =>
  typeof val === 'number' ? `${getFixedNum(val, digit)}${unit ?? ''}` : EMPTY;

/**
 * @desc 特殊数据加上+ 符号
 * @param val - 数据
 * @param digit - 保留几位小数
 * @param unit - 单位
 */
export const symbolHandle = (val: any, digit: number, unit?: string) =>
  val !== null && Number(val) >= 0
    ? `+${typeNumberHandle(val, digit, unit)}`
    : typeNumberHandle(val, digit, unit);

/**
 * @desc 级联数据转换 number 类型的id 转换成string
 * @param {string} option - option 列表
 * @param {string} children - option 子集名称
 * @param {string} isNeedHandlClasses 是否需要处理班级
 */
export const convertData = (option?: any[], children = 'child', isNeedHandlClasses = false) => {
  if (!option || !option.length) return [];
  option?.forEach((item: any) => {
    item.id = item.id.toString();
    isNeedHandlClasses && item[children] && convertData(item[children]); // 处理班级id
  });
  return option;
};

/**
 * @desc 护照校验
 */
export function isPassport(passport: string): boolean {
  const validateRuler = /^\S{8,12}$/;
  return validateRuler.test(passport);
}

/**
 * @desc 去敏身份证
 * @param {number} idCard 身份证
 */
export function getShowIdCardText(idCard: string | undefined) {
  return idCard && idCard.replace(/^(.{5})(?:\d+)(.{4})$/, '$1***********$2');
}

/**
 * @desc 去敏护照
 * @param {number} passport 护照
 */
export function getShowPassportText(passport: string | undefined) {
  return passport && `${passport.substr(0, 2)}***********${passport.substr(-1)}`;
}

/**
 * @desc 删除多余字段
 * @param data 源数据
 * @param arr 需要删除的字段组合 默认删除select input 值
 */
export const deleteRedundantData = (data: API.ObjectType, arr: string[] = ['select', 'input']) => {
  arr?.forEach((item) => {
    delete data[item];
  });
  return data;
};

/**
 * @desc select option 处理成数组格式（可传数组或者对象）
 * @param list  源数组
 * @param fieldNames  组件库 select 不支持fieldNames 所以传一个对象自行处理
 */

export const getOptions = (
  list: API.ObjectType | any[],
  fieldNames?: API.FieldNamesType | undefined,
) =>
  Array.isArray(list)
    ? fieldNames
      ? list.map((item) => ({ label: item?.[fieldNames.label], value: item?.[fieldNames.value] }))
      : list
    : Object.keys(list).map((ele) => ({ label: list[ele], value: ele }));

export const defaultRulesConfig = (label: string): Rule[] => {
  return [
    {
      required: true,
      message: `请${label}`,
    },
  ];
};

/** @desc 获取真实的域名地址
 * @param {string} path 路径
 */
export function getCorrectPath(path: string) {
  // 本地是一个 / ，线上包含二级域名 /school/
  return `${location.pathname}${path}`;
}

/**
 * @desc 值大于0，默认需要增加一个+号
 * @param {number} num - 数据
 * @param {number} digit - 保留几位小数
 * @param {string} prefix - + 加号
 */
export function getCorrectNum(num: any, digit = 2, prefix = '+') {
  const val = Number(num);
  return `${val >= 0 ? prefix : ''}${getFixedNum(val, digit)}`;
}

/**
 * @desc 新开报告
 * @param
 */
export const openReport = (cb: (path: string) => string) => {
  // 获取当前域名
  const { protocol, host } = location;
  const hostPath = `${protocol}//${host}/report`;
  const href = cb(hostPath);
  window.open(decodeURIComponent(href), '_blank');
};

// 报告端
export const showReport = (parm: string) => {
  return openReport((path: string) => `${path}?${parm}`);
};
