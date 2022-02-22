import type { ProColumns } from '@ant-design/pro-table';
import { Input } from 'antd';
// import { addClass } from '@/api/school';

const onAddClass = async (e: any, record: any) => {
  console.log(e, record);
  // const { value } = e.target;
  // const isEdit = typeof record.id === 'number'; // 编辑/新增
  // const parm = Object.assign({ ...record,
  //   name: value });
  // const apiFn = isEdit ? editClass : addClass;
  // await addClass(parm);
  // message.success(isEdit ? '编辑成功' : '新建成功');
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
