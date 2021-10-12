import { request } from 'umi';
import type { LoginParams } from './typings';

/** 登录接口 POST /auth/login */
export async function login(body: LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
