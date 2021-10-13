import { request } from 'umi';


/** 登录接口 POST /auth/login */
export async function login(body: FormData, options?: Record<string, any>) {
  return request<API.RequestResult>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


/** 用户信息 POST /auth/login */
export async function getUserInfo(userId: number, options?: Record<string, any>) {
  return request<API.RequestResult>(`/management/user/${userId}`, {
    method: 'GET',
    ...(options || {}),
  });
}