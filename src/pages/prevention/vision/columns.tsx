import type { ProColumns } from '@ant-design/pro-table';
import { TABLESEXOPTION, VISIONSTATUS } from '@/utils/constant';
import { getShowIdCardText } from '@/utils/common';

// 视力小队类型
export type VisionColumnsType = {
  id: React.Key;
  staffName?: string;
  gender?: React.Key;
  idCard?: string;
  passport?: string;
  phone?: string;
  remark?: string;
  status?: React.Key;
};

export const listColumns: ProColumns<VisionColumnsType>[] = [
  {
    title: '姓名',
    dataIndex: 'staffName',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    renderText: (val: string) => (val ? getShowIdCardText(val) : ''),
  },
  {
    title: '手机号码/账号',
    dataIndex: 'phone',
  },
  {
    title: '说明',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: VISIONSTATUS,
  },
];
