import { request } from 'umi';

/** 筛查列表 GET /management/hospital/workbench/patient/child/district */
export async function getManagementWorkbenchDistrict(code: React.Key) {
  return request<API.RequestResult>(`/management/hospital/workbench/patient/child/district/${code}`, {
    method: 'GET',
  });
}


/** 筛查记录 GET /school/student/screeningRecord */
export async function getscreeningRecord(params: API.ObjectType) {
  return request<API.RequestResult>('/school/student/screeningRecord', {
    method: 'GET',
    params,
  });
}

/** 预警跟踪记录 GET /school/student/warning/archive */
export async function getStudentWarningArchiveList(id:React.Key, params?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/student/warning/archive/${id}`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 0-6岁检查记录 GET /school/student/preschool/check/list */
export async function getStudentPreschoolCheckList(params?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/student/preschool/check/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 0-6岁检查记录 学生信息 GET /school/student/preschool/check/studentInfo */
export async function getStudentPreschoolCheckInfo(params?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/student/preschool/check/studentInfo', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}


/** 就诊记录 GET /school/student/report/list */
export async function getStudentReportList(params?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/student/report/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}


/** 基本资料 GET /school/student/baseInfo */
export async function getStudentBaseInfoList(id:React.Key, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/student/baseInfo/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}