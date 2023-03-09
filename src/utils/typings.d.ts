declare namespace API {
  import type { ReactNode } from 'react';
  import type { Rule } from 'antd/lib/form';
  import type { FormLayout } from 'antd/lib/form/Form';

  // 接口返回值
  type RequestResult = {
    code?: number;
    data?: any;
    message?: string;
  };

  // token类型
  type RequestToken = {
    code?: number;
    data?: TokenInfo;
    message?: string;
  };

  type TokenInfo = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenInfo: TokenInfo;
  };

  // 分页
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  // 用户信息
  type CurrentUser = {
    username?: string;
    realName?: string;
    orgId?: number; // 学校id
    orgName?: string;
    isIndependentScreening?: boolean; // 是否支持自主筛查
    districtDetail?: array; // 区域信息
  };

  type ModalDataType = {
    title?: string;
    visible?: boolean;
    currentRow?: Record<string, any> | undefined;
    width?: number; // 宽度
  };
  // 弹窗类型
  type ModalItemType = {
    onFinish?: () => Promise<void>; // modalForm 的确定回调
    onOk?: () => void; // modal确定回调
    onCancel: (refresh?: boolean) => void; // 取消回调 refresh 取消后是否刷新页面
  } & ModalDataType;

  //  显示的表单类型
  type FilterListType = {
    value?: string;
    type: string;
    label?: string;
    tooltip?: string;
    list: string;
    col?: Record<string, any>;
    show?: boolean;
    slot?: ReactNode; // 插槽
    rules?: Rule[];
    valueEnum?: Record<string, any>;
    required?: boolean;
    showLabel?: boolean; // 是否显示label
    fieldProps?: Record<string, any>; // 透传的属性 pro
    fieldNames?: FieldNamesType;
    selectWidth?: number;
    event?: string; // 执行事件
    selectName?: string; // inputGroup select
    selectInitial?: string; // inputGroup select initialValue
    inputName?: string; // inputGroup input
    inputChange?: () => void; // input change 事件
  };

  //  JSON表单的prop类型
  type PropsType = {
    filterList: any[];
    listTypeInfo?: Record<string, any[]>; // Record<key, value>
    gutter?: number;
    isNeedBtn?: boolean; // 是否需要Btn
    labelWidth?: number;
    layout?: FormLayout;
    onSearch?: () => void;
    onReset?: () => void;
  };

  type ObjectType = Record<string, any>;

  // 通知栏
  type NoticeIconItemType = 'info' | 'notice';

  type FieldNamesType = {
    label: string;
    value: string;
    children?: string;
  };

  type GradeInfoType = {
    gradeId?: React.Key;
    gradeName?: string;
    isSelect?: boolean;
  };
}
