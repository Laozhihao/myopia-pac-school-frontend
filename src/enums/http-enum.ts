// 请求结果集
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  TIMEOUT = 10042,
  TYPE = 'success',
  FORBID = 403,
}

// 请求方法
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// 常用的contentTyp类型

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
  FORBID = 'FORBID',
}

// 常见的http状态码集合
export enum HttpStatusEnum {
  ERROR_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBID = 403,
  NOT_FOUND = 404,
  METHOD_DISABLED = 405,
  TIME_OUT = 408,
  INTERNAL_ERROR = 500,
  IMPLEMENTED = 501,
  FAULT_GATEWAY = 502,
  SERVICE_NOT_AVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  UNSUPPORTED_HTTP_VERSION = 505,
}
