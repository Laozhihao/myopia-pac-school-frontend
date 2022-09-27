import WangEditor from 'wangeditor';
import { useEffect, useState } from 'react';
import { uploadImg } from '@/api/common';
import { Spin } from 'antd';

export const MyEditor = (props: { value: any; onChange?: (e: any) => void }) => {
  const [loading, setLoading] = useState(false);

  const { value } = props;

  useEffect(() => {
    let instance = new WangEditor('#div1') as any;
    // 目前需要的配置
    instance.config.menus = ['head', 'bold', 'fontSize', 'indent', 'list', 'justify', 'image'];
    instance.config.placeholder = '';
    // 一次最多上传1个图片
    instance.config.uploadImgMaxLength = 1;

    /**
     * @desc 自定义上传方法
     */
    instance.config.customUploadImg = async (
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

    Object.assign(instance.config, {
      onchange() {
        // instance?.txt?.html(instance?.txt?.html?.());
        props?.onChange?.(instance?.txt?.html?.());
      },
    });
    instance.create();
    // 重新设置编辑器内容
    instance.txt.html(value);

    return () => {
      instance.destroy();
      instance = null;
    };
  }, []);

  return (
    <Spin spinning={loading}>
      <div id="div1" key="staticEditor"></div>
    </Spin>
  );
};
