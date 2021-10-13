
import { createStorage } from '@/utils/storage';

const Storage = createStorage({ storage: localStorage });

const ACCESS_TOKEN = 'AccessToken';
const REFRESH_TOKEN = 'RefreshToken';
/**
 * @desc 获取Access-Token
 */
 export const getToken = () => Storage.get(ACCESS_TOKEN);

 /**
  * @desc 获取refresh_token
  */
 export const getRefreshToken = () => Storage.get(REFRESH_TOKEN);
 
 /**
  * @desc 清除缓存
  */
 export const clearStorage = () => {
   Storage.clear();
 };