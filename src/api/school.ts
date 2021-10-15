import { request } from 'umi';

/** 学校详情 GET management/school */
export async function getSchoolDetail(schoolId: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/management/school/${schoolId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 编辑学校 PUT management/school */
export async function editSchoolDetail(body: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/school', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 年级班级（级联） GET management/school */
export async function getschoolGrade(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/schoolGrade/all', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 年级班级（分页） GET management/schoolGrade/list */
export async function getsGradeList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('management/schoolGrade/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 创建年级列表 GET management/schoolGrade/getGradeCode */
export async function getGradeCode(options?: API.ObjectType) {
  return request<API.RequestResult>('management/schoolGrade/getGradeCode', {
    method: 'GET',
    ...(options || {}),
  });
}
