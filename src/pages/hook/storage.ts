
import { createStorage } from '@/utils/storage';

const Storage = createStorage({ storage: localStorage });

const ACCESS_TOKEN = 'AccessToken';
const REFRESH_TOKEN = 'RefreshToken';
const USER = 'User';
const CASCADER = 'Cascader'

 /**
  * @desc 获取refresh_token
  */
  export const setStorageInfo = (name:string, data: any, expiresIn: number | null | undefined) => Storage.set(name, data, expiresIn);


/**
 * @desc 获取Access-Token
 */
 export const getToken = () => Storage.get(ACCESS_TOKEN);

 /**
 * @desc 获取Access-Token
 */
  export const getUser = () => Storage.get(USER);

 /**
  * @desc 获取refresh_token
  */
 export const getRefreshToken = () => Storage.get(REFRESH_TOKEN);
 

 /**
 * @desc 获取行政区域树
 */
  export const getCascader = () => Storage.get(CASCADER);

 /**
  * @desc 清除缓存
  */
 export const clearStorage = () => {
   Storage.clear();
 };