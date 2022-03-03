import type { ProColumns } from '@ant-design/pro-table';
import { Input, message } from 'antd';
import { addClass, editClass } from '@/api/school';

const onAddClass = async (e: any, record: any) => {
  const { value } = e.target;
  const isEdit = typeof record.id === 'number'; // 编辑/新增
  const parm = { ...record, name: value };
  const apiFn = isEdit ? editClass : addClass;
  !isEdit && delete parm.id;
  const { data } = await apiFn(parm);
  Object.assign(record, { id: isEdit ? record.id : data, name: value });
  message.success(isEdit ? '编辑成功' : '新建成功');
};

export const listColumns: ProColumns<API.GradeListItem>[] = [
  {
    title: '年级-班级',
    dataIndex: 'name',
    width: 400,
    render: (text, record) => {
      return !record.gradeId ? (
        <span>{text}</span>
      ) : (
        <Input
          defaultValue={record.name}
          style={{ width: 200 }}
          onPressEnter={(e) => onAddClass(e, record)}
        />
      );
    },
  },
];
