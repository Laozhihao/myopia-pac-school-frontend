// 身份证信息
export const IDENTITYINFORMATIONOPTIONS = {
  idCard: '身份证',
  passport: '护照',
};

// 筛查计划
export const SCREENSELECTOPTIONS = {
  title: '标题',
  screeningOrgName: '筛查机构',
};

// 学生管理
export const STUDENTSELECTOPTIONS = {
  sno: '学籍号',
  name: '姓名',
};

// 筛查类型
export const SCREENTYPEOPTIONS = {
  1: '自主筛查',
  0: '协助筛查',
};

export const SITUATIONOPTION = [
  { label: '新生儿', value: 0 },
  { label: '满月', value: 1 },
  { label: '3月龄', value: 2 },
  { label: '6月龄', value: 3 },
  { label: '8月龄', value: 4 },
  { label: '12月龄', value: 5 },
  { label: '18月龄', value: 6 },
  { label: '24月龄', value: 7 },
  { label: '30月龄', value: 8 },
  { label: '36月龄', value: 9 },
  { label: '4岁', value: 10 },
  { label: '5岁', value: 11 },
  { label: '6岁', value: 12 },
];

// 机构复查
export const INSTITUTIONALREVIEWOPTION = [
  { label: '已就诊', value: true },
  { label: '未就诊', value: false },
];

export const spineOption = [
  { label: '胸段侧弯', key: 'chest' },
  { label: '腰部侧弯', key: 'waist' },
  { label: '胸腰段侧弯', key: 'chestWaist' },
  {
    label: '前后弯曲',
    key: 'entirety',
  },
];
export const spineLevel = {
  1: 'I',
  2: 'II',
  3: 'III',
};
export const spineType = {
  1: '无侧弯',
  2: '左低右高',
  3: '右低左高',
};

// 前后弯曲
export const entiretySpineType = {
  1: '无前后弯曲异常',
  2: '平背',
  3: '前凸异常',
  4: '后凸异常',
};

// 隐私项
export const privacyOption = {
  0: '首次遗精',
  1: '首次月经',
};

export const correctionOption = {
  0: '正常',
  1: '未矫',
  2: '欠矫',
  3: '足矫',
};
