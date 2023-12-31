import { request } from 'umi';
import { getCorrectPath } from '@/utils/common';

/** 登录 POST /auth/login */
export async function login(body: FormData, options?: Record<string, any>) {
  return request<API.RequestToken>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function uploadImg(data: FormData, options?: Record<string, any>) {
  return request<API.RequestResult>('/management/common/richTextFileUpload', {
    method: 'POST',
    data,
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
  return request<any[]>(getCorrectPath('data/district.json'), {
    method: 'GET',
    prefix: '',
    ...(options || {}),
  });
}

/** 民族 GET /school/student/nation */
export async function getNation(options?: Record<string, any>) {
  return request<any[]>('/school/student/nation', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新token POST /auth/refresh/token */
export async function refreshToken(params?: Record<string, any>) {
  return request<API.RequestToken>('/auth/refresh/token', {
    method: 'POST',
    params,
  });
}

/** 未读通知 GET /management/notice/unreadCount */
export async function unreadCount() {
  return request<API.RequestResult>('/management/notice/unreadCount', {
    method: 'GET',
  });
}

/** 上传图片 GET /management/common/fileUpload */
export async function uploadFile(data: FormData) {
  return request<API.RequestResult>('/management/common/fileUpload', {
    method: 'POST',
    data,
    requestType: 'form',
  });
}

/** 安全验证图片滑块 GET auth/verify/image */
export async function getVerifyImage() {
  return request<API.RequestResult>('/auth/verify/image', {
    method: 'GET',
  });
}
