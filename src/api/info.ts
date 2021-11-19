import { request } from 'umi';

/** 消息列表 GET /school/notice/list */
export async function getInfoList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/notice/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 已读列表 GET /school/notice/read/ */
export async function readInfoNotice(data: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/notice/read/', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除消息列表 DELETE /school/schoolGrade/ */
export async function deleteInfoItem(data: (number | undefined)[], options?: API.ObjectType) {
  return request<API.RequestResult>('/school/notice/deleted', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
