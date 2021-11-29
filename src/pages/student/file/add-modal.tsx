import { Modal, Spin, Button } from 'antd';
import { useEffect, useState } from 'react';
import type { FileCardPropsParams } from './index';

export const AddModal: React.FC<API.ModalItemType & FileCardPropsParams> = (props) => {
  const [loading, setLoading] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(''); // iframe 嵌套页
  const [currentHostPath, setCurrentHostPath] = useState(''); // 域名

  useEffect(() => {
    setLoading(true);
    // 获取当前域名
    const { protocol, host } = location;
    const hostPath = `${protocol}//${host.replace(/mgmt/, 'report')}`;
    setCurrentHostPath(hostPath);
    setIframeSrc(
      `${hostPath}?resultId=${props.resultId}&templateId=${props.templateId}&crossStatus=true`,
    );
  }, []);

  // Iframe加载完成
  const loadHandler = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // 生成PDF
  const onPdf = () => {
    const a = document.getElementById('cardIframe');
    if (!a) {
      return;
    }
    setLoading(true);
    // 跨域通知PDF项目生成PDF文件，再window.open打开
    a.contentWindow.postMessage('打印', currentHostPath);
    // 接收到生成PDF回调，loading消失
    function receiveMessage() {
      setLoading(false);
    }
    window.addEventListener('message', receiveMessage, false);
  };

  return (
    <Modal
      title={props.title}
      centered
      visible={props.visible}
      onCancel={() => props.onCancel()}
      width={810}
      footer={null}
      bodyStyle={{ height: 800, overflow: 'auto' }}
    >
      <Spin spinning={loading}>
        <Button type="primary" onClick={onPdf} style={{ marginBottom: 20 }}>
          生成PDF
        </Button>
        <div id="fileCardPrintElement">
          <iframe
            style={{ border: 0 }}
            id="cardIframe"
            title="cardIframe"
            width="760"
            height="1073"
            scrolling="no"
            src={iframeSrc}
            onLoad={loadHandler}
          />
        </div>
      </Spin>
    </Modal>
  );
};
