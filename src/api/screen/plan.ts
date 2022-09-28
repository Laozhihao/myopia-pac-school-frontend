import { request } from 'umi';

/** 筛查列表 GET /school/vision/screening/list */
export async function getScreeningList(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/list', {
    method: 'GET',
    params,
  });
}

/** 筛查结果统计分析 GET /school/vision/screening */
export async function getScreeningResult(screeningPlanId: React.Key, params: API.ObjectType) {
  return request<API.RequestResult>(`/school/vision/screening/${screeningPlanId}`, {
    method: 'GET',
    params,
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
export async function getScreeningGradeList(planId: React.Key, params?: API.ObjectType) {
  return request<API.RequestResult>(`/school/vision/screening/grades/${planId}`, {
    method: 'GET',
    params,
  });
}

/** 获取筛查学生告知书PDF地址 GET /school/vision/screening/export/notice */
export async function getScreeningNoticeUrl(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/export/notice', {
    method: 'GET',
    params,
  });
}

/** 更新学校告知书配置 PUT /school/vision/screening/update */
export async function updateScreeningNoticeConfig(data: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/update', {
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
export async function getScreeningDetail(screeningPlanId: React.Key) {
  return request<API.RequestResult>(`/school/vision/screening/plan/${screeningPlanId}`, {
    method: 'GET',
  });
}

/** 导出学生跟踪数据 GET /school/vision/screening/export/student/warning/archive */
export async function exportScreeningStudent(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/export/student/warning/archive', {
    method: 'GET',
    params,
  });
}

/** 导出筛查报告 GET /school/vision/screening/school/export */
export async function exportScreeningReport(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/school/export', {
    method: 'GET',
    params,
  });
}

/** 导出筛查数据 GET /school/vision/screening/plan/export */
export async function exportScreeningData(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/plan/export', {
    method: 'GET',
    params,
  });
}

/** 已读筛查通知 POST /school/notice/read */
export async function NoticeRead(data: API.ObjectType) {
  return request<API.RequestResult>('/school/notice/read', {
    method: 'POST',
    data,
  });
}

/** 获取通知书配置 GET /school/management/school/{id} */
export async function getReportInfo(id: React.Key) {
  return request<API.RequestResult>(`/school/management/school/${id}`, {
    method: 'GET',
  });
}

/** 更新通知书配置 GET /school/vision/screening/update/resultNoticeConfig/{id} */
export async function setReportInfo(data: API.ObjectType, id: React.Key) {
  return request<API.RequestResult>(`/school/vision/screening/update/resultNoticeConfig/${id}`, {
    method: 'PUT',
    data,
  });
}

/** 获取学生 GET /school/vision/screening/screeningNoticeResult/list */
export async function screeningNoticeResult(params: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/screeningNoticeResult/list', {
    method: 'GET',
    params,
  });
}

/** 异步导出通知书 GET /school/vision/screening/screeningNoticeResult/asyncGeneratorPDF */
export async function asyncGeneratorPDF(params: API.ObjectType) {
  return request<API.RequestResult>(
    '/school/vision/screening/screeningNoticeResult/asyncGeneratorPDF',
    {
      method: 'GET',
      params,
    },
  );
}

/** 同步导出通知书 GET school/vision/screening/screeningNoticeResult/syncGeneratorPDF */
export async function syncGeneratorPDF(params: API.ObjectType) {
  return request<API.RequestResult>(
    '/school/vision/screening/screeningNoticeResult/syncGeneratorPDF',
    {
      method: 'GET',
      params,
    },
  );
}

/** 获取告知书、筛查二维码学生列表 GET /school/management/student/notice */
export async function getScreeningPlanstudents(
  screeningPlanId: number,
  schoolId: number,
  gradeId: number,
  classId: number,
) {
  return request<API.RequestResult>(
    `/school/management/screeningPlan/students/${screeningPlanId}/${schoolId}/${gradeId}/${classId}`,
    {
      method: 'GET',
    },
  );
}

/** 获取筛查学生导出报告 GET /school/management/screeningOrg/qrcode */
export async function getScreeningQrcode(params: API.ObjectType) {
  return request<API.RequestResult>('/school/management/screeningOrg/qrcode', {
    method: 'GET',
    params,
  });
}

/** 获取筛查学生 GET /school/student/screeningStudent */
export async function getScreeningStudent(params?: API.ObjectType) {
  return request<API.RequestResult>('/school/student/screeningStudent', {
    method: 'GET',
    params,
  });
}

/** 创建/编辑筛查计划 GET /school/vision/screening/save */
export async function editScreeningStudent(data?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/save', {
    method: 'POST',
    data,
  });
}

/** 删除筛查计划 DELETE /school/vision/screening/delete/{screeningPlanId} */
export async function deleteScreeningPlan(screeningPlanId: React.Key) {
  return request<API.RequestResult>(`/school/vision/screening/delete/${screeningPlanId}`, {
    method: 'DELETE',
  });
}

/** 发布筛查计划 PUT /school/vision/screening/release/{screeningPlanId} */
export async function releaseScreeningPlan(screeningPlanId: React.Key) {
  return request<API.RequestResult>(`/school/vision/screening/release/${screeningPlanId}`, {
    method: 'PUT',
  });
}

/** 新增筛查时间 POST /school/vision/screening/increased/screeningTime */
export async function increasedScreeningTime(data?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/increased/screeningTime', {
    method: 'POST',
    data,
  });
}
