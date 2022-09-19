import { getDistrict, getNation } from '@/api/common';
import { setStorageInfo, getCascader, CASCADER } from '@/hook/storage';

/**
 * @desc 给级联options child的添加第一个节点：全部
 */
export const defaultKey = 'id';
/* eslint-disable */
export const dealCascaderOptions = (options: any, key = defaultKey) => {
  for (const eleItem of options) {
    if (eleItem?.child?.length) {
      const hasAll = eleItem.child.filter((item: Record<string, string>) => item[key] === 'all');
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

/**
 * @desc 获取地区级联
 */
export const getCascaderOption = async () => {
  if (!getCascader()) {
    const region = await getDistrict();
    setStorageInfo(CASCADER, region, null);
  }
  return getCascader() || [];
};

/**
 * @desc 获取民族
 */
export const getNationOption = async () => {
  const res: API.ObjectType = await getNation();
  return res?.data || [];
};
