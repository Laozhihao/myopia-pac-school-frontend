import { request } from 'umi';

/** 消息列表 GET /management/notice/list */
export async function getInfoList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/notice/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 已读列表 GET /management/notice/read/ */
export async function readInfoNotice(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/management/notice/read/', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除消息列表 DELETE /management/schoolGrade/ */
export async function deleteInfoItem(data: (number | undefined)[], options?: API.ObjectType) {
  return request<API.RequestResult>('/management/notice/deleted', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
