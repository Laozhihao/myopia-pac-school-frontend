import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY } from '@/utils/constant';
import { MYOPIAWARNOPTION } from '@/utils/constant';
import { Badge } from 'antd';
import { visionResultColumn } from '@/utils/columns';
import { formatLength, typeNumberHandle, symbolHandle } from '@/utils/common';

export const listColumns: ProColumns<API.FileListItem>[] = [
  {
    title: '筛查日期',
    dataIndex: 'screeningDate',
    valueType: 'date',
    width: 150,
  },
  {
    title: '配镜情况',
    dataIndex: 'glassesType',
  },
  {
    title: '裸眼视力（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.nakedVision, 1)} / ${typeNumberHandle(val[0]?.nakedVision, 1)}`,
  },
  {
    title: '矫正视力（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.correctedVision, 1)} / ${typeNumberHandle(
        val[0]?.correctedVision,
        1,
      )}`,
  },
  {
    title: '球镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.sph, 2, 'D')} / ${symbolHandle(val[0]?.sph, 2, 'D')}`,
  },

  {
    title: '柱镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.cyl, 2, 'D')} / ${symbolHandle(val[0]?.cyl, 2, 'D')}`,
  },
  {
    title: '等效球镜（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${symbolHandle(val[1]?.se, 2, 'D')} / ${symbolHandle(val[0]?.se, 2, 'D')}`,
  },
  {
    title: '轴位（左/右）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${typeNumberHandle(val[1]?.axial, 0, '°')} / ${typeNumberHandle(val[0]?.axial, 0, '°')}`,
  },
  ...visionResultColumn,

  {
    title: '视力预警',
    dataIndex: 'warningLevel',
    width: 150,
    renderText: (val?: number) =>
      typeof val === 'number' && [0, 1, 2, 3, 4].includes(val) ? (
        <Badge color={MYOPIAWARNOPTION[val]?.color} text={MYOPIAWARNOPTION[val]?.text} />
      ) : (
        EMPTY
      ),
  },
  {
    title: '其他眼病',
    dataIndex: 'otherEyeDiseases',
    width: 400,
    renderText: (val: string[]) => `${val.length ? val.join('、') : EMPTY}`,
  },
  {
    title: '筛查标题',
    dataIndex: 'screeningTitle',
    render: (_, record) => {
      return (
        <p title={record?.screeningTitle}>
          {record?.screeningTitle ? formatLength(record?.screeningTitle) : EMPTY}
        </p>
      );
    },
  },
];
