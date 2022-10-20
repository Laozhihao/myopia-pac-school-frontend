import { request } from 'umi';

/** 筛查列表 GET /school/screeningNotice/page */
export async function getScreeningNoticeList(params: API.ObjectType) {
  return request<API.RequestResult>('/school/screeningNotice/page', {
    method: 'GET',
    params,
  });
}
