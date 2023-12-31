// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import path from 'path';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  publicPath: '/school/',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  lessLoader: {
    modifyVars: {
      'root-entry-name': 'default',
    },
  },
  define: {
    'process.env': {
      REACT_APP_RUNTIME: 'production',
    },
  },
  history: {
    type: 'hash',
  },
  chainWebpack(config) {
    config.module
      .rule('less-loader')
      .test(/\.less$/)
      .use('less-loader')
      .loader('style-resources-loader')
      .options({
        patterns: path.resolve(__dirname, '../src/styles/common.less'),
      })
      .end();
  },
});
