import {
  ProfileOutlined,
  EyeOutlined,
  ProjectOutlined,
  CommentOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import routes from './routes';

// 存储 icon 信息替换 icon 组件
const iconInfoMap = {
  profile: <ProfileOutlined />,
  eye: <EyeOutlined />,
  project: <ProjectOutlined />,
  comment: <CommentOutlined />,
  setting: <SettingOutlined />,
};

export default routes.map((item) => {
  if (item?.icon) {
    // 直接用 routes 在 config 加载 jsx icon 组件会有时序问题
    item.icon = iconInfoMap[item.icon];
  }
  return item;
});
