import { request } from 'umi';


/** 学校详情 GET management/school */
export async function getSchoolDetail(schoolId: number, options?: Record<string, any>) {
  return request<API.RequestResult>(`/management/school/${schoolId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 学校详情 GET management/school */
export async function editSchoolDetail(body: Record<string, any>, options?: Record<string, any>) {
  return request<API.RequestResult>('/management/school', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}