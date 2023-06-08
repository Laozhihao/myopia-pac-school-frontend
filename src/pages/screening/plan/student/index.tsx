import { history } from 'umi';
import { Button, message, Card, Modal, Radio, Space } from 'antd';
import React, { useState, useRef, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import { InfoCircleOutlined } from '@ant-design/icons';
import DynamicForm from '@/components/DynamicForm';
import SwitchableButton from '@/components/SwitchableButton';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import { DetailModal } from './modal/detail/index';
import { StandardModal } from '../../result/modal/standard-modal';
import { listColumns } from './columns';
import { EMPTY, INSPECTIONINSTRUCTIONS } from '@/utils/constant';
import { FormItemOptions } from './form-item';
import { convertData } from '@/utils/common';
import { AddModal } from './modal/add/index';
import { deleteTableRow } from '@/hook/table';
import { TableListCtx, modalConfig } from '@/hook/ant-config';
import { getschoolGrade } from '@/api/school';
import { getScreeningStudentList, delPlanStudent, updateExamineState } from '@/api/screen/student';

import styles from './index.less';

const TableList: React.FC = () => {
  const [searchForm, setSearchForm] = useState({}); // 搜索表单项
  const ref = useRef<ProFormInstance>();
  const tableRef = useRef<ActionType>();

  // 查看详情弹窗
  const [detailInfo, setDetailInfo] = useState<API.ModalDataType>({
    visible: false,
    title: '查看详情',
    currentRow: {},
  });

  const [standardModalVisible, setStandardModalVisible] = useState(false); // 判断标准

  const [ItemOptions, setItemOptions] = useState<
    Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
  >({ ...FormItemOptions });

  const [addModalVisible, setAddModalVisible] = useState(false); // 新增筛查学生

  // const { query: { screeningPlanId, screeningBizType } = {} } = history.location;
  const { query: { screeningPlanId } = {} } = history.location;

  /**
   * @desc 获取年级班级
   */
  useMemo(async () => {
    // 过滤毕业年级
    const { data = [] } = await getschoolGrade({ isFilterGraduate: true });
    setItemOptions((s) => ({
      ...s,
      listTypeInfo: { ...s.listTypeInfo, gradeOptions: convertData(data) },
    }));
  }, []);

  const onDetail = (record: API.ScreeningStudentListItem) => {
    setDetailInfo((s) => ({
      ...s,
      visible: true,
      currentRow: { screeningPlanStudentId: record?.planStudentId, screeningPlanId },
    }));
  };

  /**
   * @desc 重置
   */
  const onReset = () => {
    setSearchForm({});
    ref?.current?.resetFields();
    tableRef?.current?.reloadAndRest?.();
  };

  /**
   * @desc 搜索
   */
  const onSearch = () => {
    const formVal = ref?.current?.getFieldsFormatValue?.();
    const [gradeId, classId] = formVal?.gradeName || [];
    setSearchForm({
      gradeId,
      classId,
      [formVal?.select]: formVal?.input,
    });
    tableRef?.current?.reloadAndRest?.();
  };

  const onCancel = (refresh?: boolean) => {
    setAddModalVisible(false);
    refresh && onSearch();
  };

  /**
   * @desc 学生档案
   */
  const onJumpArchives = (record: API.ScreeningStudentListItem) => {
    history.push(`/student/file?id=${record.id}&studentId=${record?.studentId}`);
  };

  /**
   * @desc 判断标准
   */
  const onShowStandard = () => {
    setStandardModalVisible(true);
  };

  /**
   * @desc 删除
   */
  const onDelete = (row: API.ScreeningStudentListItem) => {
    deleteTableRow('该学生数据', async () => {
      await delPlanStudent(row?.planStudentId!);
      message.success('删除成功');
      onSearch();
    });
  };

  const [currentRow, setCurrentRow] = useState<API.ObjectType>();
  const [reasonModalVisible, setReasonModalVisible] = useState(false); // 未做检查原因visible
  const [reasonVal, setReasonVal] = useState(0);

  /**
   * @desc 未做检查原因弹窗
   */
  const onShowExamine = (val: number, record: any) => {
    setReasonVal(val);
    setCurrentRow(record);
    setReasonModalVisible(true);
  };

  /**
   * @desc 提交未做检查原因
   */
  const submitReasonFn = async () => {
    await updateExamineState(currentRow?.planStudentId!, reasonVal);
    setReasonModalVisible(false);
    message.success('更新成功');
    onSearch();
  };

  const columns: ProColumns<API.ScreeningStudentListItem>[] = [
    ...listColumns(onShowExamine),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (_, record) => [
        <DynamicButtonGroup key="operator">
          <Button type="link" onClick={() => onDelete(record)}>
            删除
          </Button>
          <SwitchableButton
            key="detail"
            icon="icon-a-Group1000006854"
            disabled={!record?.hasScreening}
            tooltip={!record?.hasScreening ? '当前没有筛查数据' : ''}
            onClick={() => onDetail(record)}
          >
            筛查详情
          </SwitchableButton>
          {record.id && record?.studentId && (
            <SwitchableButton
              key="manage"
              icon="icon-Frame-1"
              onClick={() => onJumpArchives(record)}
            >
              学生档案
            </SwitchableButton>
          )}
        </DynamicButtonGroup>,
      ],
    },
  ];

  return (
    <PageContainer>
      <TableListCtx.Provider
        value={{
          ref,
        }}
      >
        <Card className="pro-form-card">
          <ProForm layout="horizontal" formRef={ref} submitter={false}>
            <DynamicForm {...ItemOptions} onSearch={onSearch} onReset={onReset} />
          </ProForm>
        </Card>
        <ProTable<API.ScreeningStudentListItem, API.PageParams>
          rowKey="planStudentId"
          pagination={{ pageSize: 10 }}
          options={false}
          actionRef={tableRef}
          columnEmptyText={EMPTY}
          search={false}
          scroll={{
            x: 'max-content',
          }}
          headerTitle={
            <p style={{ fontSize: 14 }}>
              <span style={{ color: 'rgba(0,0,0,0.45)' }}>
                数据完整性：数据完整情况下才会对此学生进行视力相关统计分析，如视力低下情况、近视情况等
              </span>

              <span className={styles.judge_standard} onClick={onShowStandard}>
                <InfoCircleOutlined style={{ color: '#096DD9', marginRight: 8 }} />
                判断标准
              </span>
            </p>
          }
          toolBarRender={() => [
            <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
              新增/同步筛查学生
            </Button>,
          ]}
          request={async (params) => {
            const { data } = await getScreeningStudentList({
              ...searchForm,
              screeningPlanId,
              current: params.current,
              size: params.pageSize,
            });
            return {
              data: data?.pageData?.records || [],
              success: true,
              total: data?.pageData?.total || 0,
            };
          }}
          columns={columns}
        />
      </TableListCtx.Provider>
      <AddModal title="新增/同步筛查学生" visible={addModalVisible} onCancel={onCancel} />
      <DetailModal
        {...detailInfo}
        onCancel={() => setDetailInfo((s) => ({ ...s, visible: false, currentRow: {} }))}
      />
      <StandardModal
        visible={standardModalVisible}
        onCancel={() => setStandardModalVisible(false)}
      ></StandardModal>
      <Modal
        title="未做检查原因"
        visible={reasonModalVisible}
        onOk={() => submitReasonFn()}
        onCancel={() => setReasonModalVisible(false)}
        {...modalConfig}
      >
        <Radio.Group onChange={(e) => setReasonVal(e.target.value)} value={reasonVal}>
          <Space>
            {Object.entries(INSPECTIONINSTRUCTIONS).map((item, index) => (
              <Radio key={index} value={+item[0]}>
                {item[1]}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
    </PageContainer>
  );
};

export default TableList;
