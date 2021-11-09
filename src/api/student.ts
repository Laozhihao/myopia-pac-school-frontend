import { request } from 'umi';

/** 学生列表 GET /school/student */
export async function getStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/student', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增/编辑学生 POST /school/student */
export async function editStudentInfo(data: API.ObjectType) {
  return request<API.RequestResult>('/school/student', {
    method: 'POST',
    data,
  });
}

/** 删除 /school/student */
export async function deleteStudentList(id: number) {
  return request<API.RequestResult>(`/school/student/${id}`, {
    method: 'DELETE',
  });
}
