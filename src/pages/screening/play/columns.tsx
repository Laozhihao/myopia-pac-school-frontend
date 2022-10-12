import type { ProColumns } from '@ant-design/pro-table';
import { formatLength } from '@/utils/common';
import { DATE, EMPTY, RELEASESTATUS, SCREENING_TYPE_LIST } from '@/utils/constant';
import moment from 'moment';
import { isNotEmpty } from '@vistel/vistel-utils/lib/tool';
import { Badge } from 'antd';
import { SCREENTYPEOPTIONS } from '@/utils/form-constant';
import IconFont from '@/components/IconFont';
import styles from './index.less';

export const listColumns: (show: (dom: any) => void) => ProColumns[] = (show) => [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '筛查标题',
    dataIndex: 'title',
    render: (_, record) => {
      return <p title={record?.title} className={styles.center} style={{'visibility': record.srcScreeningNoticeId !== 0 ? 'visible' : 'hidden'}}><IconFont type="icon-icon-quyu-16" style={{ fontSize: 30 }}/>{record?.title ? formatLength(record?.title) : EMPTY}</p>;
    },
  },
  {
    title: '筛查时间段',
    dataIndex: 'startTime',
    renderText: (val: any, record) =>
      `${val ? moment(val).format(DATE) : EMPTY} 至 ${
        record?.endTime ? moment(record?.endTime).format(DATE) : EMPTY
      }`,
  },
  {
    title: '筛查类型',
    dataIndex: 'screeningBizType',
    render: (text, record) => {
      return isNotEmpty(text) ? (
        <Badge
          color={text === 1 ? '#3C6CFE' : '#D8345F'}
          text={
            <>
              <span>{isNotEmpty(text) ? SCREENTYPEOPTIONS[text as React.Key] : ''}</span>
              <span style={{ marginLeft: 10 }}>
                {isNotEmpty(record?.screeningType)
                  ? SCREENING_TYPE_LIST[record?.screeningType]
                  : ''}
              </span>
            </>
          }
        />
      ) : (
        EMPTY
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: RELEASESTATUS,
  },
  {
    title: '预计筛查学生数',
    dataIndex: 'planScreeningNumbers',
  },
  {
    title: '实际筛查学生数',
    dataIndex: 'realScreeningNumbers',
  },
  {
    title: '筛查机构',
    dataIndex: 'screeningOrgName',
  },
  {
    title: '筛查内容',
    dataIndex: 'content',
    render: (dom) => {
      return <a onClick={() => show(dom)}>查看</a>;
    },
  },
  {
    title: '发布/通知日期',
    dataIndex: 'releaseTime',
    valueType: 'date',
  },
];
