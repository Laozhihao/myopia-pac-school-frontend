import React, { useState, useMemo } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import type { DataNode } from 'rc-cascader';

interface LazyCascaderProps {
  options?: LazyDataNode[];
  fieldNames: { value: string; label: string; children: string };
  originProps?: CascaderProps;
}

type LazyDataNode = Partial<
  DataNode & {
    code?: number;
    child: LazyDataNode[];
  }
>;

const LazyCascader: React.FC<LazyCascaderProps> = (props) => {
  const [filterOption, setFilterOption] = useState<any>([]);
  useMemo(() => {
    setFilterOption(
      props.options?.map((item) => ({
        label: item[props.fieldNames.label],
        value: item[props.fieldNames.value],
        isLeaf: !item.child?.length,
      })),
    );
  }, [props.options]);
  const findTarget = (origin: LazyDataNode[] | LazyDataNode, code: number | string) => {
    if (Array.isArray(origin)) return origin.find((item) => item[props.fieldNames.value] === code);
    return origin.child!.find((item) => item[props.fieldNames.value] === code);
  };
  const cascaderLoadData = (selectOptions: LazyDataNode[]) => {
    const targetOption = selectOptions[selectOptions.length - 1];
    const selectCodes = selectOptions.map((item) => item.value);
    let currentOrigin: LazyDataNode[] | LazyDataNode = props.options!;
    selectCodes.forEach((item) => {
      currentOrigin = findTarget(currentOrigin, item!)!;
    });
    targetOption.children = (currentOrigin as LazyDataNode).child!.map((item) => ({
      label: item[props.fieldNames.label],
      value: item[props.fieldNames.value],
      isLeaf: !item.child?.length,
    }));
    setFilterOption([...filterOption]);
  };

  return <Cascader options={filterOption} loadData={cascaderLoadData} {...props.originProps} />;
};

export default LazyCascader;
