import { request } from 'umi';

/** 导出档案卡 GET /school/archive/export */
export async function exportScreeningArchiveCard(params: API.ObjectType) {
  return request<API.RequestResult>('/school/archive/export', {
    method: 'GET',
    params,
  });
}
