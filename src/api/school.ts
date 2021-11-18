import { request } from 'umi';

/** 学校详情 GET management/school */
export async function getSchoolDetail(schoolId: number) {
  return request<API.RequestResult>(`/management/school/${schoolId}`, {
    method: 'GET',
  });
}

/** 编辑学校 PUT management/school */
export async function editSchoolDetail(body: API.ObjectType) {
  return request<API.RequestResult>('/management/school', {
    method: 'PUT',
    data: body,
  });
}

/** 年级班级（级联） GET management/school */
export async function getschoolGrade() {
  return request<API.RequestResult>('/school/management/grade/all', {
    method: 'GET',
  });
}

/** 年级班级（分页） GET management/schoolGrade/list */
export async function getsGradeList(params: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade/list', {
    method: 'GET',
    params,
  });
}

/** 创建年级列表 GET management/schoolGrade/getGradeCode */
export async function getGradeCode() {
  return request<API.RequestResult>('/school/management/grade/getGradeCode', {
    method: 'GET',
  });
}

/** 新增年级 POST /school/management/grade */
export async function addGrade(data: API.ObjectType) {
  return request<API.RequestResult>('/school/management/grade', {
    method: 'POST',
    data,
  });
}

/** 删除年级 DELETE /school/management/grade/ */
export async function deleteGrade(id: number) {
  return request<API.RequestResult>(`/school/management/grade/${id}`, {
    method: 'DELETE',
  });
}

/** 新增班级 POST /school/management/grade */
export async function addClass(data: API.ObjectType) {
  return request<API.RequestResult>('/school/management', {
    method: 'POST',
    data,
  });
}

/** 删除班级 DELETE /school/management */
export async function deleteClass(id: number) {
  return request<API.RequestResult>(`/school/management/${id}`, {
    method: 'DELETE',
  });
}
