import type { ProColumns } from '@ant-design/pro-table';
import { TABLESEXOPTION, VISIONSTATUS } from '@/utils/constant';
import { getShowIdCardText, getShowPassportText } from '@/utils/common';

export const listColumns: ProColumns[] = [
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
    renderText: (val: string, record) =>
    val ? getShowIdCardText(val) : getShowPassportText(record?.passport),
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
    valueEnum: VISIONSTATUS
  },
];
