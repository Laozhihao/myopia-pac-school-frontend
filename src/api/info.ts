import { request } from 'umi';

/** 消息列表 GET /management/notice/list */
export async function getInfoList(params: API.ObjectType) {
  return request<API.RequestResult>('/management/notice/list', {
    method: 'GET',
    params,
  });
}

/** 已读列表 GET /management/notice/read/ */
export async function readInfoNotice(data: API.ObjectType) {
  return request<API.RequestResult>('/management/notice/read/', {
    method: 'POST',
    data,
  });
}

/** 删除消息列表 DELETE /management/schoolGrade/ */
export async function deleteInfoItem(data: (number | undefined)[]) {
  return request<API.RequestResult>('/management/notice/deleted', {
    method: 'POST',
    data,
  });
}
