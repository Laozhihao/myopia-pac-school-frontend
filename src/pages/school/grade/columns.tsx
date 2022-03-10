import type { ProColumns } from '@ant-design/pro-table';
import { Input, message, Button } from 'antd';
import { addClass, editClass } from '@/api/school';

const onAddClass = async (value: any, record: any) => {
  const isEdit = typeof record.id === 'number'; // 编辑/新增
  const parm = { ...record };
  const apiFn = isEdit ? editClass : addClass;
  !isEdit && delete parm.id;
  const { data } = await apiFn(parm);
  Object.assign(record, { id: isEdit ? record.id : data });
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
        <>
          <Input
            defaultValue={record.name}
            style={{ width: 250 }}
            onChange={(e) => Object.assign(record, { name: e.target.value })}
            onPressEnter={(e) => onAddClass((e.target as HTMLInputElement).value, record)}
            placeholder="请输入班级名称，按回车确认"
          />
          <Button type="link" onClick={() => onAddClass(record.name, record)}>
            保存
          </Button>
        </>
      );
    },
  },
];
