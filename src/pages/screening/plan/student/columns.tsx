import type { ProColumns } from '@ant-design/pro-table';
import { INSPECTIONINSTRUCTIONS, TABLESEXOPTION } from '@/utils/constant';

export const listColumns: (
  show: (val: number, record: any) => void,
) => ProColumns<API.ScreeningStudentListItem>[] = (show) => [
  {
    title: '筛查编码',
    dataIndex: 'screeningCode',
    fixed: 'left',
  },
  {
    title: '学籍号',
    dataIndex: 'sno',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    title: '戴镜情况',
    dataIndex: 'glassesTypeDes',
  },
  {
    title: '裸眼视力（右/左）',
    dataIndex: 'nakedVision',
  },
  {
    title: '矫正视力（右/左）',
    dataIndex: 'correctedVision',
  },
  {
    title: '球镜（右/左）',
    dataIndex: 'sph',
  },
  {
    title: '柱镜（右/左）',
    dataIndex: 'cyl',
  },
  {
    title: '轴位（右/左）',
    dataIndex: 'axial',
  },
  {
    title: '未做检查原因',
    dataIndex: 'state',
    render: (val, record) => {
      return (
        <div>
          {INSPECTIONINSTRUCTIONS[val as number]}{' '}
          <a onClick={() => show(val as number, record)}>编辑</a>
        </div>
      );
    },
  },
  {
    title: '数据完整性',
    dataIndex: 'dataIntegrity',
  },
];
