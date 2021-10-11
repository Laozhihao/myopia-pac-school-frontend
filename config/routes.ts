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
    hideChildrenInMenu: true,
    routes: [
      { path: '/screening', redirect: '/screening/play' },
      { path: '/screening/play', component: './screening/play' },
      { path: '/screening/result', component: './screening/result', name: '筛查结果' },
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
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
