import { request } from 'umi';

/** 登录 POST /auth/login */
export async function login(body: FormData) {
  return request<API.RequestToken>('/auth/login', {
    method: 'POST',
    data: body,
  });
}

/** 退出登录 POST /auth/exit */
export async function outLogin() {
  return request<API.RequestResult>('/auth/exit', {
    method: 'POST',
  });
}

/** 用户信息 POST /management/user/userId */
export async function getUserInfo(userId: number) {
  return request<API.RequestResult>(`/management/user/${userId}`, {
    method: 'GET',
  });
}

/** 地区 GET data/district.json */
export async function getDistrict() {
  return request<any[]>('data/district.json', {
    method: 'GET',
  });
}

/** 民族 GET /management/student/nation */
export async function getNation() {
  return request<any[]>('/management/student/nation', {
    method: 'GET',
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

/** 上传图片 GET /management/notice/unreadCount */
export async function uploadFile(data: FormData) {
  return request<API.RequestResult>('/management/common/fileUpload', {
    method: 'POST',
    data,
    requestType: 'form',
  });
}
