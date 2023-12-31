declare namespace API {
  // 视力情况
  type MyopiaType = {
    glassesType?: string; // 戴镜类型
    hyperopiaLevel?: string; // 远视情况
    astigmatismLevel?: string; // 散光情况
    visionLabel?: string | number; // 视力标签
    myopiaLevel?: string; // 近视等级
  };

  // 学生管理列表
  type StudentListItem = {
    id?: number;
    studentId?: number; // 学生id
    sno?: number;
    name?: boolean;
    gender?: number;
    gradeName?: string;
    className?: string;
    screeningCount?: number;
    lastScreeningTime?: string;
    numOfVisits?: string;
    parentPhone?: string;
    address?: string;
    idCard?: string; // 身份证
    passport?: string; // 护照
  } & MyopiaType;

  // 筛查学生列表
  type ScreeningStudentListItem = {
    id?: React.Key;
    studentId?: React.Key;
    planStudentId?: React.Key;
    screeningCode?: string;
    sno?: string;
    name?: string;
    gender?: string;
    gradeName?: string;
    className?: string;
    glassesTypeDes?: string; // 戴镜情况
    nakedVision?: string; // 裸眼视力（右/左）
    correctedVision?: string; // 矫正视力（右/左）
    sph?: string; // 球镜（右/左）
    cyl?: string; // 柱镜（右/左）
    axial?: string; // 轴位（右/左）
    state?: React.Key; // 未做检查原因
    dataIntegrity?: string; // 数据完整性
    hasScreening?: boolean;
  };

  // 档案管理列表
  type FileListItem = {
    planStudentId?: React.Key;
    planId?: React.Key;
    templateId: string | number;
    resultId: string | number;
    screeningTitle?: string;
    screeningDate?: string;
    glassesType?: string;
    details?: any[];
    warningLevel?: string; // 视力标签
    myopiaLevel?: string; // 近视情况
    hyperopiaLevel?: string; // 远视情况
    astigmatismLevel?: string; // 散光情况
    otherEyeDiseases?: string[]; // 其他眼病
    hasScreening?: boolean; // 是否有详情
  } & MyopiaType;

  // 档案管理 - 详情
  type FileDetailItem = {
    title: string;
    nakedVision?: string | number; // 裸眼
    correctedVision?: string | number; // 矫正
  };

  type FileDetailInspectItem = {
    title?: string;
    dataIndex: string;
    columns?: any;
  };

  // 视力筛查列表
  type ScreenListItem = {
    notificationConfig?: Record<string, any>;
    qrCodeFileUrl?: string; // 图片url
    schoolStatisticId?: string;
    planId?: React.Key;
    schoolId?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    releaseStatus?: string; // 筛查状态
    planScreeningNumbers?: string; // 预计筛查学生数
    realScreeningNumbers?: string; // 实际筛查学生数
    screeningOrgName?: string; // 筛查机构名称
    content?: string; // 内容
    releaseTime?: string; // 通知日期
    status?: string; // 状态
    hasScreeningResults?: boolean; // 是否有筛查结果
  };

  // 筛查结果列表
  type ScreenResultListItem = {
    id?: string;
    screeningPlanId?: number | string; // 计划id
    screeningOrgId?: number | string; // 筛查计划id
    planScreeningNumbers?: number; // 预计筛查学生数
    realScreeningNumbers?: number; // 实际筛查学生数
    validScreeningNumbers: number; // 有效实际筛查学生数
    myopiaNumbers?: number; // 近视人数
    myopiaRatio?: number; // 近视比例
    myopiaLevelLight?: number;
    myopiaLevelMiddle?: number;
    avgLeftVision?: number; // 平均视力 （左眼）
    avgRightVision?: number; // 平均视力 （右眼）
    wearingGlassesNumbers?: number; // 戴镜人数
    visionLabel0Numbers?: number; // 0级预警人数
    visionLabel1Numbers?: number; // 1级预警人数
    visionLabel2Numbers?: number; // 2级预警人数
    visionLabel3Numbers?: number; // 3级预警人数
    myopiaLevelInsufficient?: number; // 远视储备不足人数
    treatmentAdviceNumbers?: number; // 就诊学生数
    reviewNumbers?: number; // 就诊医院数
    bindMpNumbers?: number; // 绑定公众号人数
  };

  // 学生跟踪数据列表
  type ScreenWarnListItem = {
    studentId?: number;
    schoolStudentId?: number | string;
    sno?: string;
    name?: string;
    gender?: number;
    gradeName?: string;
    className?: string;
    visitResult?: string; // 就诊结论(医生反馈)
    isBindMp?: boolean; // 公众号绑定
    isReview?: boolean; // 医院复查
    glassesSuggest?: string; // 配镜建议
    height?: number | string; // 课座椅高度
    deskAdviseHeight?: string; // 建议桌面高
    chairAdviseHeight?: string; // 建议座面高
  } & MyopiaType;

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
    gradeCode?: number | string;
    seatCount?: boolean;
    name?: string;
    uniqueId?: number;
    id?: number;
    schoolId?: number;
    child?: any[];
  };

  // 年级列表
  type GradeOptionType = {
    name: string;
    code: string;
    value: string;
  };
}
