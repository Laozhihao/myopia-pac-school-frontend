// 空
export const EMPTY = '--';

// 时间格式
export const DATE = 'YYYY-MM-DD';
export const DATATIME = 'YYYY-MM-DD HH:mm:ss';

// 使用record<key, {text: any}> 声明变量的原因是protable 的 column 可指定valueEnum 自定义渲染text 文本 从而不用renderText

// 绑定公众号
export const BINDOPTIONS = {
  0: { text: '已绑定' },
  1: { text: '未绑定' },
};

// 视力预警
export const MYOPIAWARNOPTION = {
  0: { text: '0级预警' },
  4: { text: '0级预警 远视储备不足' },
  1: { text: '1级预警' },
  2: { text: '2级预警' },
  3: { text: '3级预警' },
};

// 医院复查
export const REVIEWOPTIONS = {
  0: { text: '未去医院' },
  1: { text: '已去医院' },
};

// 筛查状态
export const SCREENSTATUS = {
  0: { text: '未发布' },
  1: { text: '已发布' },
};

export const STUDENTSELECTOPTIONS = [
  { value: 'sno', label: '学号' },
  { value: 'name', label: '姓名' },
];

// 性别 （pro表格）
export const TABLESEXOPTION = {
  0: { text: '男' },
  1: { text: '女' },
};

// 性别 （JSON表单）
export const SEXOPTION = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
];

// 戴镜类型
export const GLASSESTYPE = {
  0: '不佩戴眼镜',
  1: '佩戴框架眼镜',
  2: '佩戴隐形眼镜',
};

// 近视情况
export const MYOPIATYPE = {
  0: '正常',
  1: '筛查性近视',
  2: '近视前期',
  3: '低度近视',
  4: '中度近视',
  5: '重度近视',
};

export const HYPEROPIATYPE = {
  0: '正常',
  1: '远视',
  2: '低度远视',
  3: '中度远视',
  4: '重度远视',
};

export const ASTIGMATISMTYPE = {
  0: '正常',
  1: '低度散光',
  2: '中度散光',
  3: '重度散光',
};
