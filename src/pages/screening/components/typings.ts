// 医生诊断类型
export type VisitResultType = {
  visible: boolean;
  glassesSuggest?: string;
  visitResult?: string;
};

// 学生信息
export type StudentInfoType = {
  className?: string;
  gender?: React.Key;
  gradeName?: string;
  name?: string;
  sno?: string
}