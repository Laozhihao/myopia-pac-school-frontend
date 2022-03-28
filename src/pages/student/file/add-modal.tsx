import { Modal, Spin, Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import type { FileCardPropsParams } from './index';
import { modalConfig } from '@/hook/ant-config';
import { getArchivesUrl } from '@/api/student';

export const AddModal: React.FC<API.ModalItemType & FileCardPropsParams> = (props) => {
  const [loading, setLoading] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(''); // iframe 嵌套页
  const [currentHostPath, setCurrentHostPath] = useState(''); // 域名

  // 获取当前域名
  useMemo(() => {
    const { protocol, host } = location;
    const hostPath = `${protocol}//${host.replace(/school/, 'report')}`;
    setCurrentHostPath(hostPath);
  }, []);

  useEffect(() => {
    if (props.visible) {
      setLoading(true);
      setIframeSrc(`${currentHostPath}?resultId=${props.resultId}&templateId=${props.templateId}`);
    }
  }, [props.visible]);

  // Iframe加载完成
  const loadHandler = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // 生成PDF
  const onPdf = () => {
    setLoading(true);
    getArchivesUrl({ resultId: props.resultId, templateId: props.templateId }).then((data) => {
      data.data && window.open(`/pdf/viewer.html?file=${data.data}`);
      setLoading(false);
    });
  };

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={() => props.onCancel()}
      width={950}
      footer={null}
      {...modalConfig}
    >
      <Spin spinning={loading}>
        <Button type="primary" onClick={onPdf} style={{ marginBottom: 20 }}>
          生成PDF
        </Button>
        <div id="fileCardPrintElement">
          <iframe
            style={{ border: 0 }}
            title="cardIframe"
            width="900"
            height="1100"
            scrolling="no"
            src={iframeSrc}
            onLoad={loadHandler}
          />
        </div>
      </Spin>
    </Modal>
  );
};
