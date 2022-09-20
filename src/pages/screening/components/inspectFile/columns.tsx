import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY, SCREENSTATUS } from '@/utils/constant';
import { INSTITUTIONALREVIEWOPTION, SITUATIONOPTION } from '@/utils/form-constant';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '检查日期',
    dataIndex: 'updateTime',
    valueType: 'date',
  },
  {
    title: '对应月龄',
    dataIndex: 'monthAge',
    renderText: (text) => (SITUATIONOPTION[text] ? SITUATIONOPTION[text].label : EMPTY)
  },
  {
    title: '检查前-转诊',
    dataIndex: 'isReferral',
    render: () => {
      return <span>查看</span>
    }
  },
  {
    title: '眼病筛查及视力评估',
    dataIndex: 'conclusion',
  },
  {
    title: '就诊医院',
    dataIndex: 'hospitalName',
  },
  {
    title: '医师',
    dataIndex: 'doctorsName',
  },
  {
    title: '状态',
    dataIndex: 'referralStatus',
    valueEnum: INSTITUTIONALREVIEWOPTION,
  },
];
