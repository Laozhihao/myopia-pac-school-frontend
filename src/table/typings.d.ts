declare namespace API {
  // 学生管理列表
  type StudentListItem = {
    id?: number;
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
    screeningTitle?: string;
    screeningDate?: string;
    glassesType?: string;
    details?: any[];
    warningLevel?: string; // 视力标签
    myopiaLevel?: string; // 近视情况
    hyperopiaLevel?: string; // 远视情况
    astigmatismLevel?: string; // 散光情况
    otherEyeDiseases?: string[]; // 其他眼病
  };

  // 筛查列表
  type ScreenListItem = {
    schoolStatisticId?: string;
    planId?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    releaseStatus?: string; // 筛查状态
    planScreeningNumbers?: string; // 预计筛查学生数
    realScreeningNumbers?: string; // 实际筛查学生数
    screeningOrgName?: string; // 筛查机构名称
    content?: string; // 内容
    releaseTime?: string; // 通知日期
  };

  // 筛查结果列表
  type ScreenResultListItem = {
    planScreeningNumbers?: string;
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
