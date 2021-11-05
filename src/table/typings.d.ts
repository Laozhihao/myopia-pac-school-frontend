declare namespace API {
  // 学生管理列表
  type StudentListItem = {
    sno?: number;
    name?: boolean;
    gender?: number;
    myopiaLevel?: string;
    gradeName?: string;
    className?: string;
    screeningCount?: number;
    lastScreeningTime?: string;
    numOfVisits?: string;
    parentPhone?: string;
    address?: string;
  };

  // 档案管理列表
  type FileListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  // 筛查列表
  type ScreenListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  // 筛查结果列表
  type ScreenResultListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  // 消息列表
  type NoticeListItem = {
    index?: number;
    id?: number;
    createTime?: string;
    status?: number;
    content?: string;
    title?: string;
    downloadUrl?: string;
    filter?: function; // 过滤
  };

  // 年级班级列表
  type GradeListItem = {
    gradeId?: number;
    seatCount?: boolean;
    name?: string;
    uniqueId?: number;
    id?: number;
  };
}
