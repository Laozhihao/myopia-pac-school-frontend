import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { ContentTypeEnum } from '@/enums/http-enum';
import { message, Spin } from 'antd';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Auth from '@/utils/authorization';

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
  // settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {
        collapsed: false,
      },
    };
  }
  return {
    fetchUserInfo,
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
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
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
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      const ignorePages = ['login'];
      if (ignorePages.find((item) => url.indexOf(item) > -1)) {
        return { url, options };
      }
      const headers = {
        ...options.headers,
        Authorization: Auth.get(),
        'Content-Type': ContentTypeEnum.JSON,
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
      // todo 请求拦截
      const data = await response.clone().json();
      if (response.status !== 200 || data.code !== 200) {
        message.error(data.message);
      }
      // console.log('res', response);
      // console.log(response, options, data);
      return response;
    },
  ],
};
