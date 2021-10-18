import { request } from 'umi';

/** 登录 POST /auth/login */
export async function login(body: FormData, options?: Record<string, any>) {
  return request<API.RequestToken>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 POST /auth/exit */
export async function outLogin() {
  return request<API.RequestResult>('/auth/exit', {
    method: 'POST',
  });
}

/** 用户信息 POST /management/user/userId */
export async function getUserInfo(userId: number, options?: Record<string, any>) {
  return request<API.RequestResult>(`/management/user/${userId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 地区 GET data/district.json */
export async function getDistrict(options?: Record<string, any>) {
  return request<any[]>('data/district.json', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新token POST /auth/refresh/token */
export async function refreshToken(data: FormData) {
  return request<API.RequestToken>('/auth/refresh/token', {
    method: 'POST',
    data,
    requestType: 'form',
  });
}

/** 未读通知 GET /management/notice/unreadCount */
export async function unreadCount() {
  return request<API.RequestResult>('/management/notice/unreadCount', {
    method: 'GET',
  });
}
