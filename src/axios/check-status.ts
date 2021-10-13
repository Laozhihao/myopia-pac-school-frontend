import { HttpStatusEnum } from '@/enums/http-enum';
import { message } from 'antd';

const { error } = message;

export function checkStatus(res: any, msg: string): void {
  const { status } = res || {};
  switch (status) {
    case HttpStatusEnum.ERROR_REQUEST:
      message && error(`${message}`);
      break;
    // 401: 未登录
    case HttpStatusEnum.UNAUTHORIZED:
      error(message ?? '用户没有权限（令牌、用户名、密码错误）!');
      // clearAuthAndLogin();
      break;
    case HttpStatusEnum.NOT_FOUND:
      error(message ?? '网络请求错误,未找到该资源!');
      break;
    case HttpStatusEnum.METHOD_DISABLED:
      error(message ?? '网络请求错误,请求方法未允许!');
      break;
    case HttpStatusEnum.TIME_OUT:
      error(message ?? '网络请求超时!');
      break;
    case HttpStatusEnum.INTERNAL_ERROR:
      error(message ?? '服务器错误,请联系管理员!');
      break;
    case HttpStatusEnum.IMPLEMENTED:
      error(message ?? '网络未实现!');
      break;
    case HttpStatusEnum.FAULT_GATEWAY:
      error(message ?? '网络错误!');
      break;
    case HttpStatusEnum.SERVICE_NOT_AVAILABLE:
      error(message ?? '服务不可用，服务器暂时过载或维护!');
      break;
    case HttpStatusEnum.GATEWAY_TIMEOUT:
      error(message ?? '网络超时!');
      break;
    case HttpStatusEnum.UNSUPPORTED_HTTP_VERSION:
      error(message ?? 'http版本不支持该请求!');
      break;
    default:
      msg && error(msg);
  }
}
