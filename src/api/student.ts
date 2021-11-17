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
export async function deleteStudentInfo(id: number | string) {
  return request<API.RequestResult>(`/school/student/${id}`, {
    method: 'DELETE',
  });
}

/** 学生详情 /school/student */
export async function getStudentDetail(id: number | string) {
  return request<API.RequestResult>(`/school/student/${id}`, {
    method: 'GET',
  });
}

/** 筛查记录 /school/student */
export async function getStudentScreen(id: number | string) {
  return request<API.RequestResult>(`/school/student/screening/list/${id}`, {
    method: 'GET',
  });
}

/** 导出 /school/student */
export async function exportStudent(params?: API.ObjectType) {
  return request<API.RequestResult>('/school/student/export', {
    method: 'GET',
    params,
  });
}

/** 导入 /school/student */
export async function importStudent(data?: any) {
  return request<API.RequestResult>('/school/student/import', {
    method: 'POST',
    data,
  });
}
