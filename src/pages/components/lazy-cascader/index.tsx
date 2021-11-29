import React, { useState, useMemo } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Form } from 'antd';
import type { DataNode } from 'rc-cascader';
import { getPopupContainer } from '@/hook/ant-config';

interface LazyCascaderProps {
  label?: string;
  name?: string;
  options?: LazyDataNode[];
  fieldNames: { value: string; label: string; children: string };
  originProps?: CascaderProps;
}

type LazyDataNode = DataNode &
  Partial<{
    code?: number;
    child: LazyDataNode[];
  }>;

const LazyCascader: React.FC<LazyCascaderProps> = (props) => {
  const [filterOption, setFilterOption] = useState<LazyDataNode[]>([]);

  useMemo(() => {
    setFilterOption(
      props.options?.map((item) => ({
        label: item[props.fieldNames.label],
        value: item[props.fieldNames.value],
        isLeaf: !item[props.fieldNames.children]?.length,
      }))!,
    );
  }, [props.options]);

  const findTarget = (origin: LazyDataNode[] | LazyDataNode, code: number | string) => {
    if (Array.isArray(origin)) return origin.find((item) => item[props.fieldNames.value] === code);
    return (origin[props.fieldNames.children]! as LazyDataNode[]).find(
      (item) => item[props.fieldNames.value] === code,
    );
  };

  const findAndChangeFileds = (
    origin: LazyDataNode,
    fieldNames: { value: string; label: string; children: string },
  ): LazyDataNode => {
    origin[fieldNames.children] && (origin.children = origin[fieldNames.children]);
    origin.value = origin[fieldNames.value];
    origin.label = origin[fieldNames.label];
    origin.children?.forEach((item) => {
      findAndChangeFileds(item, fieldNames);
    });
    return origin;
  };

  const getValueProps = (selectOptions: (number | string)[]) => {
    if (!selectOptions || (selectOptions && !selectOptions.length)) return {}; // 无回显地区
    const newSelectOptions = [...new Set(selectOptions)]; // 避免直辖市的省市code 一致无法回显
    const currentOrigin = findTarget(props.options!, newSelectOptions[0])!;
    if (!currentOrigin) return {};
    const targetIndex = filterOption.findIndex((subItem) => subItem.value === newSelectOptions[0])!;
    filterOption.splice(targetIndex, 1, findAndChangeFileds(currentOrigin, props.fieldNames));
    return {
      value: newSelectOptions,
      options: [...filterOption],
    };
  };

  const cascaderLoadData = (selectOptions: LazyDataNode[]) => {
    const targetOption = selectOptions[selectOptions.length - 1];
    const selectCodes = selectOptions.map((item) => item.value);
    let currentOrigin: LazyDataNode[] | LazyDataNode = props.options!;
    selectCodes.forEach((item) => {
      currentOrigin = findTarget(currentOrigin, item!)!;
    });
    targetOption.children = (currentOrigin as unknown as LazyDataNode).child!.map((item) => ({
      label: item[props.fieldNames.label],
      value: item[props.fieldNames.value],
      isLeaf: !item[props.fieldNames.children]?.length,
    }));
    setFilterOption([...filterOption]);
  };

  return (
    <Form.Item getValueProps={getValueProps} label={props?.label} name={props.name}>
      <Cascader
        options={filterOption}
        loadData={cascaderLoadData}
        getPopupContainer={getPopupContainer}
        placeholder="请选择"
        {...props.originProps}
      />
    </Form.Item>
  );
};

export default LazyCascader;
