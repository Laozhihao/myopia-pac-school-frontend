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
