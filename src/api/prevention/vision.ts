import { request } from 'umi';

/** 获取学校员工列表 GET /school/staff/list */
export async function getVisionStaffList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/staff/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 启用停用 GET /school/staff/editStatus/ */
export async function editVisionStaffStatus(
  id?: React.Key,
  status?: React.Key,
  options?: API.ObjectType,
) {
  return request<API.RequestResult>(`/school/staff/editStatus/${id}/${status}`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 重置密码 GET /school/staff/resetPassword */
export async function resetVisionStaffPassword(params?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/staff/resetPassword', {
    method: 'POST',
    params,
    ...(options || {}),
  });
}

/** 保存学校员工 POST /school/staff/save */
export async function saveVisionStaff(data?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/staff/save', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
