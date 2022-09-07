import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { HttpStatusEnum } from '@/enums/http-enum';
import { Spin } from 'antd';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history, request as requestFn } from 'umi';
import RightContent from '@/components/RightContent';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getToken, getUser, getRefreshToken, clearStorage, setToken } from '@/hook/storage';
import { checkStatus } from '@/axios/check-status';
import { refreshToken } from './api/common';
import Logo from '@/assets/images/logo@2x.png';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <Spin />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<
    LayoutSettings & {
      collapsed: boolean;
    }
  >;
  currentUser?: API.CurrentUser;
}> {
  return {
    currentUser: getUser(),
    settings: {
      collapsed: false,
    },
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    headerContentRender: () => (
      <div
        style={{ cursor: 'pointer', fontSize: '16px', width: 'fit-content' }}
        onClick={() =>
          setInitialState({
            ...initialState,
            settings: {
              ...initialState?.settings,
              collapsed: !initialState?.settings?.collapsed,
            },
          })
        }
      >
        {' '}
        {initialState?.settings?.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    ),
    logo: <img style={{ width: '34px', objectFit: 'contain' }} alt="近视防控学校平台" src={Logo} />,
    disableContentMargin: false,
    collapsedButtonRender: false,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    pageTitleRender: () => '近视防控学校平台',
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    breadcrumbProps: {
      minLength: 0,
    },
    ...initialState?.settings,
  };
};

// request运行时配置
export const request: RequestConfig = {
  timeout: 30000,
  prefix: process.env.REACT_APP_RUNTIME === 'production' ? '/school/api' : '/api',
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      // 请求区域文件特殊处理去掉/api
      if (url.endsWith('/api/data/district.json')) {
        return { url: '/school/data/district.json', options };
      }
      const ignorePages = ['login'];
      if (ignorePages.find((item) => url.indexOf(item) > -1)) {
        return { url, options };
      }
      const headers = {
        Authorization: getToken(),
        ...options.headers,
      };
      (!headers.Authorization || url.endsWith('/auth/refresh/token')) &&
        delete headers.Authorization;
      return {
        url,
        options: {
          ...options,
          headers,
        },
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      // token过期 403
      if (response.status === HttpStatusEnum.FORBID) {
        const refresh_token = getRefreshToken()?.replace('Bearer ', '');
        if (!refresh_token) {
          history.push(loginPath);
          return response;
        }
        try {
          const { data } = await refreshToken({
            client_id: '2',
            client_secret: '123456',
            refresh_token,
          });
          data && setToken(data);

          return requestFn(options.url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: getToken(),
            },
          });
        } catch {
          clearStorage();
          history.push(loginPath);
        }
      }
      if (response.status === HttpStatusEnum.UNAUTHORIZED) {
        clearStorage();
        history.push(loginPath);
      }
      return response;
    },
    async (response) => {
      if (response?.headers?.get('Content-type') === 'application/json') {
        // umi封装resquest 导致不能直接拿res中的一些其他信息
        const data = await response.clone().json();
        if (response.status !== HttpStatusEnum.SUCCESS_REQUEST) {
          return data.message
            ? Promise.reject(data)
            : Promise.reject({ message: checkStatus(response) });
        }
        if (data.code && data.code !== 200) {
          return Promise.reject(data);
        }
      }
      return response;
    },
  ],
};
