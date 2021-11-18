import { request } from 'umi';

/** 筛查列表 GET /school/vision/screening/list */
export async function getScreeningList(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/list', {
    method: 'GET',
    params,
  });
}

/** 筛查结果统计分析 GET /school/vision/screening */
export async function getScreeningResult(schoolStatisticId: number | string) {
  return request<API.RequestResult>(`/school/vision/screening/${schoolStatisticId}`, {
    method: 'GET',
  });
}

/** 学生预警跟踪 GET /school/vision/screening/statStudents/list */
export async function getScreeningWarn(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/statStudents/list', {
    method: 'GET',
    params,
  });
}

/** 学生年级 GET /school/vision/screening/grades/{screeningPlanId} */
export async function getScreeningGradeList(planId: number | string) {
  return request<API.RequestResult>(`/school/vision/screening/grades/${planId}`, {
    method: 'GET',
  });
}

/** 获取筛查学生告知书PDF地址 GET /school/vision/screening/export/notice */
export async function getScreeningNoticeUrl(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/export/notice', {
    method: 'GET',
    params,
  });
}

/** 获取机构信息 GET /school/vision/screening/screeningOrg */
export async function getScreeningOrg(screeningOrgId: number | string) {
  return request<API.RequestResult>(`/school/vision/screening/screeningOrg/${screeningOrgId}`, {
    method: 'GET',
  });
}

/** 更新机构 PUT /school/vision/screening/update/screeningOrg */
export async function updateScreeningNotice(data: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/update/screeningOrg', {
    method: 'PUT',
    data,
  });
}

/** 获取筛查学生二维码PDF地址 GET /school/vision/screening/export/notice */
export async function getScreeningQrcodeUrl(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/export/QRCode', {
    method: 'GET',
    params,
  });
}

/** 获取筛查详情 GET /school/vision/screening/plan/{screeningPlanId} */
export async function getScreeningDetail(screeningPlanId: number | string) {
  return request<API.RequestResult>(`/school/vision/screening/plan/${screeningPlanId}`, {
    method: 'GET',
  });
}

/** 获取筛查详情 POST /school/vision/screening/export/student/warning/archive */
export async function exportScreeningStudent(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/export/student/warning/archive', {
    method: 'GET',
    params,
  });
}
