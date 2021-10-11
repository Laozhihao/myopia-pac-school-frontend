import type { ProColumns } from '@ant-design/pro-table';
import { MYOPIAWARNOPTION, BINDOPTIONS, REVIEWOPTIONS } from '@/utils/constant';
import { Cascader } from 'antd';

export const firstColumns: ProColumns[] = [
  {
    title: '预计筛查学生数',
    dataIndex: 'name',
    tip: '筛查计划中导入的该学校的筛查学生总数',
    fieldProps: {
      fixed: 'right',
    },
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'desc',
    tip: '现场筛查中进行筛查的学生总数（即有筛查数据的学生）',
  },
  {
    title: '视力筛查完成率',
    dataIndex: 'desc',
    tip: '公式=实际筛查学生数 / 预计筛查学生数 * 100%',
  },
  {
    title: '有效实际筛查学生数',
    dataIndex: 'desc',
    tip: '实际筛查学生数中，其筛查数据满足完整数据要求的学生总数',
  },
];

export const secondColumns: ProColumns[] = [
  {
    title: '近视（人数/占比）',
    dataIndex: 'name',
    fieldProps: {
      fixed: 'right',
    },
  },
  {
    title: '轻度近视（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '中度近视（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '高度近视（人数/占比）',
    dataIndex: 'desc',
  },

  {
    title: '视力低下（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '平均视力（左/右）',
    dataIndex: 'desc',
  },
  {
    title: '戴镜情况（人数/占比）',
    dataIndex: 'desc',
  },
];

export const thirdColumns: ProColumns[] = [
  {
    title: '加入预警学生数（人数/占比）',
    dataIndex: 'name',
    fieldProps: {
      fixed: 'right',
    },
  },
  {
    title: '0级预警（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '1级预警（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '2级预警（人数/占比）',
    dataIndex: 'desc',
  },

  {
    title: '3级预警（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '远视储备不足（人数/占比）',
    dataIndex: 'desc',
  },
];

export const fourthColumns: ProColumns[] = [
  {
    title: '建议就诊学生数（人数/占比）',
    dataIndex: 'name',
    fieldProps: {
      fixed: 'right',
    },
  },
  {
    title: '去医院就诊数（人数/占比）',
    dataIndex: 'desc',
  },
  {
    title: '绑定公众号数（人数/占比）',
    dataIndex: 'desc',
  },
];

export const warnColumns: ProColumns[] = [
  {
    title: '学号',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '性别',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '年级-班级',
    dataIndex: 'name',
    order: 3,
    renderFormItem: () => {
      return <Cascader options={[]} placeholder="请选择" />;
    },
  },
  {
    title: '视力情况',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '视力预警',
    dataIndex: 'name',
    valueEnum: MYOPIAWARNOPTION,
    order: 1,
  },
  {
    title: '绑定公众号',
    dataIndex: 'name',
    valueEnum: BINDOPTIONS,
    order: 2,
  },
  {
    title: '医院复查',
    dataIndex: 'name',
    valueEnum: REVIEWOPTIONS,
  },
  {
    title: '复查反馈',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '防控建议-课桌椅',
    dataIndex: 'name',
    search: false,
  },
  {
    title: '防控建议-座位调整',
    dataIndex: 'name',
    search: false,
  },
];
