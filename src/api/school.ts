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
  return request<API.RequestResult>('/management/schoolGrade/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 创建年级列表 GET management/schoolGrade/getGradeCode */
export async function getGradeCode(options?: API.ObjectType) {
  return request<API.RequestResult>('/management/schoolGrade/getGradeCode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增年级 POST /management/schoolGrade */
export async function addGrade(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/schoolGrade', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除年级 DELETE /management/schoolGrade/ */
export async function deleteGrade(id: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/management/schoolGrade/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新增班级 POST /management/schoolGrade */
export async function addClass(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/schoolClass', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除班级 DELETE /management/schoolClass */
export async function deleteClass(id: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/management/schoolClass/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
