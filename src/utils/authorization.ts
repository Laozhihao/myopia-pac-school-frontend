const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';

/**
 * @desc 存储token
 * @param token token
 */
const set = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

/**
 * @desc 获取token
 * @returns {string} token
 */
const get = (): string => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) as string;
};

/**
 * @desc 清除token
 * @returns {string} token
 */
const clear = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export default {
  set,
  get,
  clear,
};
