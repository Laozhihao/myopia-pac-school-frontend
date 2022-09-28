import { request } from 'umi';

/** 筛查学生列表 GET /school/vision/screening/student/list */
export async function getScreeningStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/student/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增学生 GET /school/vision/screening/addScreeningStudent */
export async function addScreeningStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/addScreeningStudent', {
    method: 'POST',
    params,
    ...(options || {}),
  });
}

/** 详情 GET /school/vision/screening/studentScreeningDetail */
export async function getScreeningStudentDetailList(
  params: API.ObjectType,
  options?: API.ObjectType,
) {
  return request<API.RequestResult>('/school/vision/screening/studentScreeningDetail', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
