import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  colorWeak: false,
  title: '近视防控学校平台',
  pwa: false,
  iconfontUrl: '',
  layout: 'side',
  contentWidth: 'Fluid',
  splitMenus: false,
  navTheme: 'dark',
  fixedHeader: true,
  fixSiderbar: true,
  primaryColor: '#096dd9',
  footerRender: false,
};

export default Settings;
