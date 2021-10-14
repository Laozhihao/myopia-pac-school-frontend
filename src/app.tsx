import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { ContentTypeEnum } from '@/enums/http-enum';
import { Spin } from 'antd';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getToken, getUser } from '@/pages/hook/storage';

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
    currentUser: getUser() || {},
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
        style={{ cursor: 'pointer', fontSize: '16px' }}
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
    disableContentMargin: false,
    collapsedButtonRender: false,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    menuHeaderRender: undefined,
    pageTitleRender: false,
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
  // timeout: 1000,
  prefix: process.env.REACT_APP_RUNTIME === 'ONLINE' ? '' : '/api',
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      const ignorePages = ['login'];
      if (ignorePages.find((item) => url.indexOf(item) > -1)) {
        return { url, options };
      }
      const headers = {
        Authorization: getToken(),
        ...options.headers,
      };
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
    async (response) => {
      if(response.headers.get('Content-type') === 'application/json') {
        // umi封装resquest 导致不能直接拿res中的一些其他信息
        const data = await response.clone().json();
        if (response.status !== 200 || (data.code && data.code !== 200 )) {
          return Promise.reject(data);
        } 
      }
      return response;
    },
  ],
};
