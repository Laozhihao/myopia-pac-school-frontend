import { request } from 'umi';

/** 学生列表 GET /school/student */
export async function getStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/student', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
