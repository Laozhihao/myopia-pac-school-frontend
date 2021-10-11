declare namespace API {
  import type { Rule } from 'antd/lib/form';
  import type { FormLayout } from 'antd/lib/form/Form';

  // 分页
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  // 弹窗类型
  type ModalItemType = {
    title?: string;
    visible?: boolean;
    currentRow?: Record<string, any> | undefined;
    width?: number; // 宽度
    onFinish?: (values: any) => Promise<void>; // modalForm 的确定回调
    onOk?: () => void; // modal确定回调
    onCancel: () => void; // 取消回调
  };

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
    fieldProps?: Record<string, any>; // 透传的属性
    fieldNames?: Record<string, any>;
  };

  //  JSON表单的prop类型
  type PropsType = {
    filterList: any[];
    listTypeInfo: Record<string, any[]>; // Record<key, value>
    gutter?: number;
    labelWidth?: number;
    layout?: FormLayout;
    type?: string;
    onSearch?: (values: any) => Promise<void>;
    onReset?: () => void;
  };
}
