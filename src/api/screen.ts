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
