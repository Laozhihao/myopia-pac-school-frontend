import React, { useState, useMemo } from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Form } from 'antd';
import type { DataNode } from 'rc-cascader';

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
        isLeaf: !item.child?.length,
      }))!,
    );
  }, [props.options]);

  const findTarget = (origin: LazyDataNode[] | LazyDataNode, code: number | string) => {
    if (Array.isArray(origin)) return origin.find((item) => item[props.fieldNames.value] === code);
    return origin.child!.find((item) => item[props.fieldNames.value] === code);
  };

  const getValueProps = (selectOptions: (number | string)[]) => {
    if (!selectOptions) return {}; // 无回显地区
    let currentOrigin: LazyDataNode[] | LazyDataNode = props.options!;
    let targetOption: LazyDataNode;
    let options: LazyDataNode[] | undefined = filterOption;
    selectOptions.forEach((item) => {
      currentOrigin = findTarget(currentOrigin, item)!;
      if (!options) return;
      targetOption = options.find((subItem) => subItem.value === item)!;
      currentOrigin.child?.length &&
        (targetOption.children = currentOrigin.child.map((option) => ({
          label: option[props.fieldNames.label],
          value: option[props.fieldNames.value],
        })));
      options = targetOption.children!;
    });
    return {
      defaultValue: selectOptions,
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
      isLeaf: !item.child?.length,
    }));
    setFilterOption([...filterOption]);
  };

  return (
    <Form.Item getValueProps={getValueProps} label={props?.label} name={props.name}>
      <Cascader
        options={filterOption}
        loadData={cascaderLoadData}
        placeholder="请选择"
        {...props.originProps}
      />
    </Form.Item>
  );
};

export default LazyCascader;
