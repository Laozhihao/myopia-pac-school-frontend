import { request } from 'umi';

/** 学校详情 GET /school/management */
export async function getSchoolDetail(schoolId: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/management/school/${schoolId}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 编辑学校 PUT /school/management */
export async function editSchoolDetail(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management/school', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 年级班级（级联） GET /school/management */
export async function getschoolGrade(options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 年级班级（分页） GET /school/management/grade/list */
export async function getsGradeList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 创建年级列表 GET /school/management/grade/getGradeCode */
export async function getGradeCode(options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade/getGradeCode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增年级 POST /school/management/grade */
export async function addGrade(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除年级 DELETE /school/management */
export async function deleteGrade(id: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/management/grade/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 新增班级 POST /school/management */
export async function addClass(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/management', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除班级 DELETE /school/management */
export async function deleteClass(id: number, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/management/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
