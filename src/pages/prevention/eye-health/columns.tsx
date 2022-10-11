import { CheckCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { Space, Tag } from 'antd';
import styles from './index.less';
import IconFont from '@/components/IconFont';

export type PreventionEyeHealthType = {
  schoolStudentId?: React.Key;
  studentId?: React.Key;
  sno?: React.Key;
  name?: string;
  gradeName?: string;
  className?: string;
  wearingGlasses?: React.Key;
  visionCorrection?: string;
  warningLevel?: React.Key;
  refractiveResult?: string;
  isRecommendVisit?: boolean;
  isHavaReport?: boolean;
  seatSuggest?: boolean; // 座位建议
  height?: string;
  lowVision?: string;
};

export const listColumns = (
  onShowProposal?: (record: PreventionEyeHealthType) => void,
): ProColumns<PreventionEyeHealthType>[] => {
  return [
    {
      title: '学籍号',
      dataIndex: 'sno',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年级-班级',
      dataIndex: 'gradeName',
      renderText: (val: string, record) => `${val}-${record?.className}`,
    },
    {
      title: '视力情况',
      dataIndex: 'wearingGlasses',
      renderText: (val, record) => `${val} ${record?.lowVision}`
    },
    {
      title: '屈光情况',
      dataIndex: 'refractiveResult',
    },
    {
      title: '近视矫正',
      dataIndex: 'visionCorrection',
    },
    {
      title: '视力预警',
      dataIndex: 'warningLevel',
    },
    {
      title: '防控建议',
      dataIndex: 'isRecommendVisit',
      render: (text, record) => {
        return (
          <Space direction="vertical">
            {text ? (
              <p>
                {text ? '专业医疗机构复查' : ''}{' '}
                {record?.isHavaReport ? (
                  <Tag
                    icon={<CheckCircleOutlined />}
                    color="processing"
                    className={styles.sign_tag}
                  >
                    已就诊
                  </Tag>
                ) : null}
              </p>
            ) : null}
            <p
              style={{ color: record?.height ? '#096DD9' : 'rgba(0,0,0,0.25)' }}
              className={styles.proposal}
              onClick={() => (record?.seatSuggest ? onShowProposal?.(record) : null)}
            >
              <IconFont type="icon-a-Group1000005898" style={{ marginRight: 5 }} />
              课桌椅座位建议
            </p>
          </Space>
        );
      },
    },
    {
      title: '公众号在线档案',
      dataIndex: 'isBindMp',
      renderText: (val: boolean) => (val ? '已绑定' : '未绑定'),
    },
    {
      title: '最新筛查日期',
      dataIndex: 'screeningTime',
      valueType: 'date',
    },
  ];
};
