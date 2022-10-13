import { EMPTY } from '@/utils/constant';
import {
  entiretySpineType,
  privacyOption,
  spineLevel,
  spineOption,
  spineType,
} from '@/utils/form-constant';
import React from 'react';

// 标题行信息类型
export type ScreeningStudentRecordType = {
  planStudentId?: React.Key;
  planId?: React.Key;
  hasScreening?: boolean;
  resultId?: number;
  screeningDate?: React.Key;
  screeningCode?: string;
  isDoubleScreen?: boolean;
  screeningTitle?: string;
  screeningOrgName?: string;
  screeningType?: number;
  details?: API.ObjectType;
};

// 常见病数据类型
export type ScreeningCommonDiseasesType = {
  bloodPressureData?: API.ObjectType;
  diseasesHistoryData?: API.ObjectType;
  saprodontiaStat?: API.ObjectType; // 龋齿检查
  spineData?: API.ObjectType;
  privacyData?: API.ObjectType; // 个人隐私
};

// 其他
export type ScreeningOtherType = {
  details?: API.ObjectType;
  isDoubleScreen?: boolean;
  screeningType?: React.Key;
  gender?: React.Key;
};

// 列合并
export const onCell = (value: React.Key | JSX.Element, index: number) => {
  const obj = {
    children: value,
    props: {} as any,
  };
  obj.props.rowSpan = index ? 0 : 2;
  return obj;
};

// 其他眼病
export const otherDiseasesColumns = [
  {
    title: '其他眼病',
    dataIndex: 'otherEyeDiseases',
    width: 400,
    render: (val: string[]) => <span>{val?.length ? val.join('、') : EMPTY}</span>,
  },
];

// 身高体重 columns
export const heightAndWeightColumns = [
  {
    title: '身高（cm）',
    dataIndex: 'heightAndWeightData',
    render: (value: { height: React.Key }, _row: any, index: number) =>
      onCell(value?.height ?? EMPTY, index),
  },
  {
    title: '体重（KG）',
    dataIndex: 'heightAndWeightData',
    render: (value: { weight: React.Key }, _row: any, index: number) =>
      onCell(value?.weight ?? EMPTY, index),
  },
];

// 通用
export const basicColumns = [
  {
    dataIndex: 'lateriality',
    width: 120,
    render: (val: number) => <span>{val === 0 ? '左眼（OS）' : '右眼（OD）'}</span>,
    fixed: 'left',
  },
  {
    title: '戴镜情况',
    dataIndex: 'glassesTypeDes',
    render: (value: string, _row: any, index: number) => onCell(value, index),
  },
  {
    title: '裸眼视力',
    dataIndex: 'nakedVision',
  },
  {
    title: '矫正视力（戴镜视力）',
    dataIndex: 'correctedVision',
  },
  {
    title: '等效球镜（SE）',
    dataIndex: 'se',
  },
  {
    title: '球镜（S）',
    dataIndex: 'sph',
  },
  {
    title: '柱镜',
    dataIndex: 'cyl',
  },
  {
    title: '轴位（A）',
    dataIndex: 'axial',
  },
];

// 常见病
export const commonDiseasesColumns = (
  commonDiseases?: ScreeningCommonDiseasesType,
  data?: ScreeningOtherType,
) => [
  {
    title: '龋齿检查',
    key: 'saprodontiaStat',
    width: 150,
    render: (_value: string, _row: any, index: number) => {
      const { saprodontiaStat } = commonDiseases || {};
      const toothArr = ['deciduous', 'permanent'];
      const childrenText = (
        <>
          {toothArr.map((item, eleIndex) => (
            <p key={eleIndex}>
              {eleIndex ? '恒牙' : '乳牙'} 龋（d）：{saprodontiaStat?.[item]?.dcount ?? EMPTY} ；
              失（m）：{saprodontiaStat?.[item]?.mcount ?? EMPTY} ； 补（f）：
              {saprodontiaStat?.[item]?.fcount ?? EMPTY}
            </p>
          ))}
        </>
      );
      return onCell(childrenText, index);
    },
  },
  {
    title: '脊柱弯曲 ',
    key: 'spineData',
    width: 150,
    render: (_value: string, _row: any, index: number) => {
      const { spineData } = commonDiseases || {};
      const childrenText = (
        <>
          {spineOption.map((item, eleIndex) => (
            <p key={eleIndex}>
              {item.label}：{' '}
              {item.key === 'entirety'
                ? entiretySpineType?.[spineData?.[item.key]?.type] || EMPTY
                : spineType?.[spineData?.[item.key]?.type] || EMPTY}{' '}
              {spineLevel?.[spineData?.[item.key]?.level]
                ? `${spineLevel?.[spineData?.[item.key]?.level]}度`
                : EMPTY}
            </p>
          ))}
        </>
      );
      return onCell(childrenText, index);
    },
  },
  {
    title: '血压情况',
    key: 'bloodPressureData',
    width: 150,
    render: (_value: string, _row: any, index: number) => {
      const childrenText = (
        <>
          <p>舒张压：{commonDiseases?.bloodPressureData?.dbp ?? EMPTY}</p>
          <p>收缩压: {commonDiseases?.bloodPressureData?.sbp ?? EMPTY}</p>
        </>
      );
      return onCell(childrenText, index);
    },
  },
  {
    title: '疾病情况',
    key: 'diseasesHistoryData',
    render: (_value: string, _row: any, index: number) => {
      const childrenText = (
        <p>
          {commonDiseases?.diseasesHistoryData?.diseases
            ? commonDiseases?.diseasesHistoryData?.diseases.join('，')
            : EMPTY}
        </p>
      );
      return onCell(childrenText, index);
    },
  },
  {
    title: '个人隐私',
    key: 'privacyData',
    render: (_value: string, _row: any, index: number) => {
      const { privacyData } = commonDiseases || {};
      const childrenText = (
        <>
          <p>{data?.gender ? privacyOption[data?.gender] : ''}</p>
          <p>状况: {privacyData?.hasIncident ? `是， 年龄 ${privacyData?.age} 岁` : '否'}</p>
        </>
      );
      return onCell(childrenText, index);
    },
  },
];

// 筛查计划表格列
export const ScreeningRecordColumns = (data: {
  details?: any;
  isDoubleScreen?: any;
  screeningType?: any;
}) => {
  const { isDoubleScreen, screeningType } = data;
  if (screeningType === 0) {
    return isDoubleScreen
      ? [...basicColumns]
      : [...basicColumns, ...otherDiseasesColumns, ...heightAndWeightColumns];
  }
  // 常见病
  return isDoubleScreen
    ? [...basicColumns, ...heightAndWeightColumns]
    : [
        ...basicColumns,
        ...otherDiseasesColumns,
        ...commonDiseasesColumns(data?.details?.commonDiseases, data),
        ...heightAndWeightColumns,
      ];
};
