import { Button, Card } from 'antd';
import React, { useState, useRef, useMemo } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import DynamicForm from '@/components/DynamicForm';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { listColumns } from './columns';
import { EMPTY } from '@/utils/constant';
import SwitchableButton from '@/components/SwitchableButton';
import { FormItemOptions } from './form-item';
import DynamicButtonGroup from '@/components/DynamicButtonGroup';
import { convertData } from '@/utils/common';
import { AddModal } from './modal/add/index';
import { TableListCtx } from '@/hook/ant-config';
import { getschoolGrade } from '@/api/school';
import { getScreeningStudentList } from '@/api/screen/student';
import { history } from 'umi';
import { DetailModal } from './modal/detail/index';
import { StandardModal } from '../../result/modal/standard-modal';
import { InfoCircleOutlined } from '@ant-design/icons';
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

  const [isHasScreeningStudent, setIsHasScreeningStudent] = useState(false);
  const [standardModalVisible, setStandardModalVisible] = useState(false); // 判断标准

  const [ItemOptions, setItemOptions] = useState<
    Pick<API.PropsType, 'filterList' | 'listTypeInfo'>
  >({ ...FormItemOptions });

  const [addModalVisible, setAddModalVisible] = useState(false); // 新增筛查学生

  const { query: { screeningPlanId, screeningBizType } = {} } = history.location;

  /**
   * @desc 获取年级班级
   */
  useMemo(async () => {
    const { data = [] } = await getschoolGrade();
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

  const columns: ProColumns<API.ScreeningStudentListItem>[] = [
    ...listColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <DynamicButtonGroup key="operator">
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
            screeningBizType === '1' && isHasScreeningStudent ? (
              <Button type="primary" key="add" onClick={() => setAddModalVisible(true)}>
                新增筛查学生
              </Button>
            ) : null,
          ]}
          request={async (params) => {
            const { data } = await getScreeningStudentList({
              ...searchForm,
              screeningPlanId,
              current: params.current,
              size: params.pageSize,
            });
            setIsHasScreeningStudent(data?.hasScreeningStudent);
            return {
              data: data?.pageData?.records || [],
              success: true,
              total: data?.pageData?.total || 0,
            };
          }}
          columns={columns}
        />
      </TableListCtx.Provider>
      <AddModal visible={addModalVisible} onCancel={onCancel} />
      <DetailModal
        {...detailInfo}
        onCancel={() => setDetailInfo((s) => ({ ...s, visible: false, currentRow: {} }))}
      />
      <StandardModal
        visible={standardModalVisible}
        onCancel={() => setStandardModalVisible(false)}
      ></StandardModal>
    </PageContainer>
  );
};

export default TableList;