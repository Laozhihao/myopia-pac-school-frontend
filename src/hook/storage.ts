import { createStorage } from '@/utils/storage';

const Storage = createStorage({ storage: localStorage });

export const ACCESS_TOKEN = 'school-AccessToken';
export const REFRESH_TOKEN = 'school-RefreshToken';
export const USER = 'school-User';
export const CASCADER = 'school-Cascader';
export const tokenPrefix = 'Bearer ';

/**
 * @desc 存储信息
 */
export const setStorageInfo = (name: string, data: any, expiresIn: number | null | undefined) =>
  Storage.set(name, data, expiresIn);

/**
 * @desc 存储token
 */
export const setToken = (tokenInfo: API.TokenInfo) => {
  const accessToken = tokenInfo?.accessToken;
  Storage.set(ACCESS_TOKEN, `${tokenPrefix}${accessToken}`, tokenInfo?.expiresIn);
  // REFRESH_TOKEN 失效时间 expiresIn + 1d
  const ONE_DAY = 86400;
  Storage.set(
    REFRESH_TOKEN,
    `${tokenPrefix}${tokenInfo?.refreshToken}`,
    tokenInfo?.expiresIn + ONE_DAY,
  );
};

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
export const getRefreshToken = (): string => Storage.get(REFRESH_TOKEN);

/**
 * @desc 获取行政区域树
 */
export const getCascader = () => Storage.get(CASCADER);

/**
 * @desc 清除缓存
 */
export const clearStorage = () => {
  // 单域名影响，不能全清，会影响其它端的在线状态
  [ACCESS_TOKEN, REFRESH_TOKEN, USER, CASCADER].forEach((key) => Storage.remove(key));
};
