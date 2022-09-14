// 空
export const EMPTY = '--';
export const EMPTY_TEXT = '无';

// 时间格式
export const DATE = 'YYYY-MM-DD';
export const DATATIME = 'YYYY-MM-DD HH:mm:ss';

// 使用record<key, {text: any}> 声明变量的原因是protable 的 column 可指定valueEnum 自定义渲染text 文本 从而不用renderText

// 绑定公众号
export const BINDOPTIONS = {
  0: '未绑定',
  1: '已绑定',
};

// 视力预警
export const MYOPIAWARNOPTION = {
  0: { text: '0级预警', color: 'green' },
  4: { text: '0级预警 远视储备不足', color: 'lime' },
  1: { text: '1级预警', color: 'orange' },
  2: { text: '2级预警', color: 'magenta' },
  3: { text: '3级预警', color: 'red' },
};

// 视力预警 下拉

export const MYOPIAWARNSELECTOPTION = [
  { label: '0级预警', value: 0 },
  { label: '0级预警 远视储备不足', value: 4 },
  { label: '1级预警', value: 1 },
  { label: '2级预警', value: 2 },
  { label: '3级预警', value: 3 },
];

// 医院复查
export const REVIEWOPTIONS = {
  0: '未去医院',
  1: '已去医院',
};

// 筛查状态
export const SCREENSTATUS = {
  0: '未开始',
  1: '进行中',
  2: '已结束',
};

// 性别 （pro表格）
export const TABLESEXOPTION = {
  0: '男',
  1: '女',
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
  3: '夜戴角膜塑形镜',
};

// 戴镜类型
export const GLASSESSUGGESTTYPE = {
  0: '无',
  1: '配框架眼镜 ',
  2: '配OK眼镜',
  3: '配隐形眼镜',
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

export const STATE_TEXT = {
  0: '正常',
  1: '异常',
};
// 文化程度
export const EDUCATIONOPTION = [
  '研究生',
  '大学本科',
  '大学专科和专科学校',
  '中等专业学校',
  '技工学校',
  '高中',
  '初中',
  '小学',
  '文盲或半文盲',
  '不详',
];

// 职业
export const OCCUPATIONOPTION = [
  '国家机关',
  '党群组织',
  '企业、事业单位负责人',
  '专业技术人员',
  '办事人员和有关人员',
  '商业、服务业人员',
  '农、林、牧、渔、水利业生产人员',
  '生产、运输设备操作人员及有关人员',
  '军人',
  '不便分类的其他从业人员',
  '无职业',
];
