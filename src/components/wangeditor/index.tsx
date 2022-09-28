import WangEditor from 'wangeditor';
import { useEffect, useState } from 'react';
import { uploadImg } from '@/api/common';
import { Spin } from 'antd';

export default function MyEditor(props: { value: any; onChange?: (e: any) => void }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ins = new WangEditor('#div1') as any;
    // 目前需要的配置
    ins.config.menus = ['head', 'bold', 'fontSize', 'indent', 'list', 'justify', 'image'];
    ins.config.placeholder = '';
    // 一次最多上传1个图片
    ins.config.uploadImgMaxLength = 1;

    /**
     * @desc 自定义上传方法
     */
    ins.config.customUploadImg = async (
      resultFiles: File[],
      insertImgFn: (url: string) => void,
    ) => {
      const formData = new FormData();
      // resultFiles 是 input 中选中的文件列表
      resultFiles.forEach((file) => {
        formData.append('file', file);
      });
      setLoading(true);
      const { data } = await uploadImg(formData);
      insertImgFn(data?.url);
      setLoading(false);
    };

    Object.assign(ins.config, {
      onchange() {
        props?.onChange?.(ins?.txt?.html?.());
      },
    });
    ins.create();
    ins?.txt?.html(props?.value);

    return () => {
      ins.destroy();
      ins = null;
    };
  }, []);

  return (
    <Spin spinning={loading}>
      <div id="div1" key="staticEditor"></div>
    </Spin>
  );
}
