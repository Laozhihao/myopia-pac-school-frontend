export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  {
    name: '学生管理',
    icon: 'profile',
    path: '/student',
    hideChildrenInMenu: true,
    routes: [
      { path: '/student', component: './student/list' },
      { name: '档案管理', path: '/student/file', component: './student/file' },
    ],
  },
  {
    name: '视力筛查',
    icon: 'eye',
    path: '/screening',
    routes: [
      {
        path: '/screening/notice',
        component: './screening/notice',
        name: '筛查通知',
      },
      {
        path: '/screening/plan',
        component: './screening/plan',
        name: '筛查计划',
      },
      {
        name: '筛查学生列表',
        path: '/screening/plan/student',
        component: './screening/plan/student',
        hideInMenu: true,
      },
      {
        path: '/screening/plan/result',
        component: './screening/result',
        name: '筛查结果',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '防控中心',
    icon: 'project',
    path: '/prevention',
    filter: 'isIndependentScreening',
    routes: [
      {
        name: '眼健康中心',
        path: '/prevention/eye-health',
        component: './prevention/eye-health',
      },
      {
        name: '视力小队',
        path: '/prevention/vision',
        component: './prevention/vision',
      },
      {
        name: '数据报送',
        path: '/prevention/data-receive',
        component: './prevention/data-receive',
      },
    ],
  },
  { name: '消息中心', icon: 'comment', path: '/info-center', component: './infoCenter' },
  {
    name: '学校管理',
    icon: 'setting',
    path: '/school',
    hideChildrenInMenu: true,
    routes: [
      { path: '/school', component: './school/manage' },
      { name: '年级管理', path: '/school/grade', component: './school/grade' },
    ],
  },
  {
    name: '数据大屏',
    icon: 'project',
    path: '/data-view',
    layout: false,
    target: '_blank',
    component: './dataView',
  },
  { path: '/', redirect: '/student' },
  { component: './404' },
];
