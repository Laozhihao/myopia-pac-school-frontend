declare namespace API {
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
    col?: number;
    show?: boolean;
    rules?: Rule[];
    required?: boolean;
    showLabel?: boolean; // 是否显示label
    fieldProps?: Record<string, any>; // 透传的属性 pro
    fieldNames?: Record<string, any>;
    selectWidth?: number;
    selectName?: string; // inputGroup select
    selectOption?: any[]; // select option选项
    selectInitial?: string; // inputGroup select initialValue
    inputName?: string; // inputGroup input
    selectChange?: () => void; // select change 事件
    inputChange?: () => void; // input change 事件
  };

  //  JSON表单的prop类型
  type PropsType = {
    filterList: any[];
    listTypeInfo: Record<string, any[]>; // Record<key, value>
    gutter?: number;
    isNeedBtn?: boolean; // 是否需要Btn
    labelWidth?: number;
    layout?: FormLayout;
    type?: string;
    col?: Record<string, any>;
    onSearch?: () => void;
    onReset?: () => void;
  };

  type ObjectType = Record<string, any>;

  // 通知栏
  type NoticeIconItemType = 'info' | 'notice';
}
