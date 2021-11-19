import type { ProColumns } from '@ant-design/pro-table';
import { EMPTY, MYOPIAWARNOPTION, STUDENTSELECTOPTIONS, TABLESEXOPTION } from '@/utils/constant';
import { visionColumn } from '@/utils/columns';
import { formatLength } from '@/utils/common';
import { Cascader } from 'antd';
import { InputGroup } from '@/pages/components/input-group';

// const options = [
//   {
//     id: '1',
//     name: 'Zhejiang',
//     children: [
//       {
//         id: '2',
//         name: 'Hangzhou',
//         children: [
//           {
//             id: '3',
//             name: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '5',
//     name: 'zhengedd',
//   },
//   {
//     id: '7',
//     name: 'Jiangsu',
//     children: [
//       {
//         id: '9',
//         name: 'Nanjing',
//         children: [
//           {
//             id: '10',
//             name: 'Zhong Hua Men',
//           },
//         ],
//       },
//     ],
//   },
// ];

// const options = [
//   {
//     value: '1',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: '2',
//         label: 'Hangzhou',
//         children: [
//           {
//             value: '3',
//             label: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [
//       {
//         value: 'nanjing',
//         label: 'Nanjing',
//         children: [
//           {
//             value: 'zhonghuamen',
//             label: 'Zhong Hua Men',
//           },
//         ],
//       },
//     ],
//   },
// ];

export const listColumns: (gradeOption: any[]) => ProColumns<API.StudentListItem>[] = (
  gradeOption: any[],
) => [
  {
    title: '学号',
    dataIndex: 'sno',
    search: false,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    search: false,
    renderText: (val?: string) => (val ? formatLength(val, 4) : EMPTY),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueEnum: TABLESEXOPTION,
    search: false,
  },
  {
    title: '年级-班级',
    dataIndex: 'gradeName',
    order: 2,
    renderFormItem: () => {
      return (
        <Cascader
          options={gradeOption}
          placeholder="请选择"
          fieldNames={{ label: 'name', value: 'id', children: 'child' }}
        />
        // <Cascader options={options}  placeholder="Please select" changeOnSelect={true} fieldNames={{ label: 'name', value: 'id', children: 'children' }}/>
      );
    },
    renderText: (val: string, record) => `${val}-${record?.className}`,
  },
  {
    hideInTable: true,
    order: 3,
    renderFormItem: () => {
      return (
        <InputGroup
          option={STUDENTSELECTOPTIONS}
          bottom={-24}
          selectName={'select'}
          selectInitial={'name'}
          inputName={'input'}
        />
      );
    },
  },
  ...visionColumn,
  {
    title: '视力预警',
    dataIndex: 'visionLabel',
    valueEnum: MYOPIAWARNOPTION,
    order: 1,
  },
  {
    title: '筛查次数',
    dataIndex: 'screeningCount',
    search: false,
  },
  {
    title: '最新筛查日期',
    dataIndex: 'lastScreeningTime',
    valueType: 'date',
    search: false,
  },
  {
    title: '医院就诊',
    dataIndex: 'numOfVisits',
    search: false,
  },
];
