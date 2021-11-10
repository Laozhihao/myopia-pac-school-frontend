import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY } from '@/utils/constant';
import { MYOPIAWARNOPTION, MYOPIATYPE, HYPEROPIATYPE, ASTIGMATISMTYPE } from '@/utils/constant';

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
    title: '裸眼视力（右/左)',
    dataIndex: 'details',
    renderText: (val: any[]) => `${val[0]?.lateriality ?? EMPTY} / ${val[1]?.lateriality ?? EMPTY}`,
  },
  {
    title: '矫正视力（右/左）',
    dataIndex: 'details',
    renderText: (val: any[]) =>
      `${val[0]?.correctedVision ?? EMPTY} / ${val[1]?.correctedVision ?? EMPTY}`,
  },
  {
    title: '球镜（右/左)',
    dataIndex: 'details',
    renderText: (val: any[]) => `${val[0]?.sph ?? EMPTY} / ${val[1]?.sph ?? EMPTY}`,
  },

  {
    title: '柱镜（右/左)',
    dataIndex: 'details',
    renderText: (val: any[]) => `${val[0]?.cyl ?? EMPTY} / ${val[1]?.cyl ?? EMPTY}`,
  },
  {
    title: '等效球镜（右/左',
    dataIndex: 'details',
    renderText: (val: any[]) => `${val[0]?.se ?? EMPTY} / ${val[1]?.se ?? EMPTY}`,
  },
  {
    title: '轴位（右/左)',
    dataIndex: 'details',
    renderText: (val: any[]) => `${val[0]?.axial ?? EMPTY} / ${val[1]?.axial ?? EMPTY}`,
  },
  {
    title: '视力结论',
    dataIndex: 'myopiaLevel',
    hideInForm: true,
    renderText: (val: string, record) =>
      `${MYOPIATYPE[val] ?? EMPTY} / ${HYPEROPIATYPE[record?.hyperopiaLevel!] ?? EMPTY} / ${
        ASTIGMATISMTYPE[record?.astigmatismLevel!] ?? EMPTY
      }`,
  },
  {
    title: '视力预警',
    dataIndex: 'warningLevel',
    valueEnum: MYOPIAWARNOPTION,
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
  },
];
