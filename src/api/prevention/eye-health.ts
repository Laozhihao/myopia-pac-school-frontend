import { request } from 'umi';

/** 获取眼健康列表 GET /school/prevention/eyeHealth/list */
export async function getPreventionEyeHealthList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/prevention/eyeHealth/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取眼健康列表 GET  */
export async function getExportEyeHealthData(options?: API.ObjectType) {
  return request<API.RequestResult>('/school/prevention/eyeHealthData/Export', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取有筛查数据的班级年级 GET /school/prevention/getAllGradeList  */
export async function getAllGradeList(options?: API.ObjectType) {
  return request<API.RequestResult>('/school/prevention/getAllGradeList', {
    method: 'GET',
    ...(options || {}),
  });
}
