import { request } from 'umi';

/** 数据上报列表 GET /school/prevention/data/submit/list */
export async function getDataSubmitList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/prevention/data/submit/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 数据上报 POST /school/prevention/data/submit */
export async function saveDataSubmitFile(data?: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/prevention/data/submit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 获取文件Url GET /school/prevention/data/submit/file/{id} */
export async function getDataSubmitFileUrl(id: React.Key, options?: API.ObjectType) {
  return request<API.RequestResult>(`/school/prevention/data/submit/file/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 数据报送模板列表 GET /school/prevention/data/submit/template */
export async function getSchoolDataSubmitTemplate() {
  return request<API.RequestResult>('/school/prevention/data/submit/template', {
    method: 'GET',
  });
}
