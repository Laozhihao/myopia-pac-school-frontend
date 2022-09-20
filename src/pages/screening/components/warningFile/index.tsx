import React, { useState } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import { EMPTY, EMPTY_TEXT, GLASSESSUGGESTTYPE, TABLESEXOPTION } from '@/utils/constant';
import ProTable from '@ant-design/pro-table';
import { columns } from './columns';
import { getStudentWarningArchiveList } from '@/api/screen/archives';
import { history } from 'umi';
import { modalConfig } from '@/hook/ant-config';
import { StudentInfoType, VisitResultType } from '../typings';

export const WarningFile: React.FC = () => {

  const { query: { id } = {} } = history.location;

  const [visitResultInfo, setVisitResultInfo] = useState<VisitResultType>({
    visible: false,
    glassesSuggest: '',
    visitResult: '',
  }); // 医院复查反馈弹窗

  const [studentInfo, setStudentInfo] = useState<StudentInfoType>({});

  const onShow = (record: { glassesSuggest: any; visitResult: any; }) => {
    setVisitResultInfo({visible: true, glassesSuggest: record?.glassesSuggest, visitResult: record?.visitResult});
  }
  
  return (
    <>
      <Space size={30}>
        <span>学号：{studentInfo?.sno}</span>
        <span>姓名：{studentInfo?.name}</span>
        <span>年级班级：{`${studentInfo?.gradeName}-${studentInfo?.className}`}</span>
        <span>性别：{ studentInfo?.gender ? TABLESEXOPTION[studentInfo?.gender] : ''}</span>
      </Space>
      <ProTable<API.StudentListItem, API.PageParams>
        rowKey="screeningPlanSchoolStudentId"
        pagination={{ pageSize: 10 }}
        options={false}
        columnEmptyText={EMPTY}
        search={false}
        scroll={{
          x: '100vw',
        }}
        style={{ marginTop: 15 }}
        request={async (params) => {
          const { data } = await getStudentWarningArchiveList(id as React.Key, {
            current: params.current,
            size: params.pageSize,
          });
          setStudentInfo(data?.studentInfo);
          return {
            data: data?.pageData?.records || [],
            success: true,
            total: data?.pageData?.total || 0,
          };
        }}
        columns={columns(onShow)}
      />
      <Modal
        title="医生复查反馈"
        {...visitResultInfo}
        onCancel={() => setVisitResultInfo({ ...visitResultInfo, visible: false })}
        footer={null}
        {...modalConfig}
      >
        <Row>
          <Col span={4}>建议配镜：</Col>
          <Col span={20}>{GLASSESSUGGESTTYPE[visitResultInfo?.glassesSuggest!] ?? EMPTY_TEXT}</Col>
        </Row>
        <Row>
          <Col span={4}>医生诊断：</Col>
          <Col span={20}>{visitResultInfo?.visitResult}</Col>
        </Row>
      </Modal>
    </>
  );
};
