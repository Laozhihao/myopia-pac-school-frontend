import { HttpStatusEnum } from '@/enums/http-enum';

export function checkStatus(res: any): string {
  const { status } = res || {};
  return {
    [HttpStatusEnum.ERROR_REQUEST]: '请求错误, 请稍后再试!',
    [HttpStatusEnum.UNAUTHORIZED]: '用户没有权限（令牌、用户名、密码错误）!',
    [HttpStatusEnum.NOT_FOUND]: '网络请求错误,未找到该资源!',
    [HttpStatusEnum.METHOD_DISABLED]: '网络请求错误,请求方法未允许!',
    [HttpStatusEnum.TIME_OUT]: '网络请求超时!',
    [HttpStatusEnum.INTERNAL_ERROR]: '服务器错误,请联系管理员!',
    [HttpStatusEnum.IMPLEMENTED]: '网络未实现!',
    [HttpStatusEnum.FAULT_GATEWAY]: '网络错误!',
    [HttpStatusEnum.SERVICE_NOT_AVAILABLE]: '服务不可用，服务器暂时过载或维护!',
    [HttpStatusEnum.GATEWAY_TIMEOUT]: '网络超时!',
    [HttpStatusEnum.UNSUPPORTED_HTTP_VERSION]: 'http版本不支持该请求!',
  }[status];
}
