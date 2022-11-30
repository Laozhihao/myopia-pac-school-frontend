import styles from './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import { getDataSubmitFileUrl } from '@/api/prevention/data-receive';

// 数据报送类型
export type VisionColumnsType = {
  id: React.Key;
  remark?: string;
  successMatch?: React.Key;
  failMatch?: React.Key;
  downloadMessage?: React.Key;
  createTime?: React.Key;
};

/**
 * @desc 获取文件Url
 */
const getFileUrl = async ({ fileId }) => {
  if (fileId) {
    const { data } = await getDataSubmitFileUrl(fileId);
    data && window.open(data);
  }
};

export const listColumns: ProColumns<VisionColumnsType>[] = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  // },
  {
    title: '说明',
    dataIndex: 'remark',
  },
  {
    title: '成功匹配',
    dataIndex: 'successMatch',
  },
  {
    title: '匹配失败',
    dataIndex: 'failMatch',
  },
  {
    title: '下载',
    dataIndex: 'status',
    render: (text, record) => {
      return (
        // 状态 0-创建 1-进行中 2-成功 3-失败
        <div className={text === 2 ? styles.download : ''} onClick={() => getFileUrl(record)}>
          {text === 3 ? '系统错误，请重试' : '视力筛查数据报送表'}
        </div>
      );
    },
  },
  {
    title: '生成时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
];
