import React from 'react';
import { Tabs, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { BasicInfo } from '../../components/basicInfo';
import { ScreeningFile } from '../../components/screeningFile';
import { WarningFile } from '../../components/warningFile';
import { InspectFile } from '../../components/inspectFile';
import { TreatmentFile } from '../../components/treatmentFile';

const StudentArchives: React.FC = () => {
  const items = [
    { label: '基本资料', key: '1', children: <BasicInfo /> },
    { label: '筛查记录', key: '2', children: <ScreeningFile /> },
    { label: '预警跟踪记录', key: '3', children: <WarningFile /> },
    { label: '0-6岁检查记录', key: '4', children: <InspectFile /> },
    { label: '就诊记录', key: '5', children: <TreatmentFile /> },
  ];

  return (
    <PageContainer>
      <Card>
        <Tabs>
          {items.map((eleItem) => (
            <Tabs.TabPane tab={eleItem.label} key={eleItem.key}>
              {eleItem.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Card>
    </PageContainer>
  );
};
export default StudentArchives;
