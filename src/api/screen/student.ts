import { request } from 'umi';

/** 筛查学生列表 GET /school/vision/screening/student/list */
export async function getScreeningStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/student/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 新增学生 GET /school/vision/screening/addScreeningStudent */
export async function addScreeningStudentList(params: API.ObjectType, options?: API.ObjectType) {
  return request<API.RequestResult>('/school/vision/screening/addScreeningStudent', {
    method: 'POST',
    params,
    ...(options || {}),
  });
}

/** 详情 GET /school/vision/screening/studentScreeningDetail */
export async function getScreeningStudentDetailList(
  params: API.ObjectType,
  options?: API.ObjectType,
) {
  return request<API.RequestResult>('/school/vision/screening/studentScreeningDetail', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除 筛查计划-学生列表 /school/vision/screening/delete/planStudent/{planStudentId} */
export async function delPlanStudent(planStudentId: React.Key) {
  return request<API.RequestResult>(
    `/school/vision/screening/delete/planStudent/${planStudentId}`,
    {
      method: 'DELETE',
    },
  );
}

/** 更新筛查学生不检查说明 POST /school/vision/screening/students/updateState */
export async function updateExamineState(id: number, state: number) {
  return request<API.RequestResult>(
    `/school/vision/screening/students/updateState/${id}/${state}`,
    {
      method: 'POST',
    },
  );
}
