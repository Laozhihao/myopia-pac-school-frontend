import React, { useEffect, useState } from 'react';
import { Tag, Space, Table, Pagination } from 'antd';
import styles from './index.less';
import { history } from 'umi';
import { columns } from './columns';
import { getscreeningRecord } from '@/api/screen/archives';
import { SCREENING_TYPE_LIST } from '@/utils/constant';
import { formatLength } from '@/utils/common';

export const ScreeningFile: React.FC = () => {
  const [total, setTotal] = useState(100); // 分页总数
  const [dataSource, setDataSource] = useState<any[]>([]);

  const { query: { id } = {} } = history.location;


  const onCurrentData = async (current: number, size: number) => {
    const parm = {
      id,
      current,
      size,
    }
    const { data } = await getscreeningRecord(parm);
    setDataSource(data?.records || [])
    console.log(data, 'data');
  }

  useEffect(() => {
    onCurrentData(1, 10);
  },[]);


  return (
    <>
    {dataSource.length ? <>{dataSource.map((item, index) => (
      <div key={index}>
        <p className={styles.date}>筛查日期</p>
        <Space size={15}>
          <span className={[styles.screening, styles.screening_red].join(' ')}>{SCREENING_TYPE_LIST[item.screeningType]}</span>
          <Tag color="success">{ item.isDoubleScreen ? '复测' : '初筛' }</Tag>
          <span>筛查编号：{ item.screeningCode }</span>
          <span>筛查标题：{ formatLength(item.screeningTitle, 15) }</span>
          <span>筛查机构：{ formatLength(item.screeningOrgName, 15)}</span>
          <span>D编码：{ item.commonDiseasesCode }</span>
        </Space>
        <Table columns={columns(item)} dataSource={item?.details?.vision} pagination={false}  scroll={{
            x: '100vw',
          }} />
      </div>
    ))}
      <Pagination defaultCurrent={1} total={total} className={styles.pagination} onChange={onCurrentData} /></>: <p>暂无数据</p> }
    </>
  );
};

