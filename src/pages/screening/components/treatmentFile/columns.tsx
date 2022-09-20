import type { ProColumns } from '@ant-design/pro-table';
import { GLASSESSUGGESTTYPE } from '@/utils/constant';
import { Image } from 'antd';

export const listColumns: ProColumns<API.StudentListItem>[] = [
  {
    title: '检查日期',
    dataIndex: 'createTime',
    valueType: 'date',
  },
  {
    title: '配镜',
    dataIndex: 'glassesSituation',
    valueEnum: GLASSESSUGGESTTYPE,
  },
  {
    title: '医生诊断',
    dataIndex: 'medicalContent',
  },
  {
    title: '处方',
    dataIndex: 'imageFileUrl',
    render: (text?: any) => {
      return  text?.length ? <Image.PreviewGroup>{
        text.map((item: string, index: number) => <Image key={index} height={28} src={item} /> )}</Image.PreviewGroup> : null 
    }
  },
  {
    title: '就诊医院',
    dataIndex: 'hospitalName',
  },
  {
    title: '医师',
    dataIndex: 'doctorName',
  },
];
