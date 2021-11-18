import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  colorWeak: false,
  title: '近视防控',
  pwa: false,
  logo: './logo@2x.png',
  iconfontUrl: '',
  layout: 'side',
  contentWidth: 'Fluid',
  splitMenus: false,
  navTheme: 'dark',
  fixedHeader: true,
  fixSiderbar: true,
  primaryColor: '#1890ff',
  footerRender: false,
};

export default Settings;
