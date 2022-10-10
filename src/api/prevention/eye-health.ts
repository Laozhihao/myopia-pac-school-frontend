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
