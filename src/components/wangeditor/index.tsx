import WangEditor from 'wangeditor';
import { useEffect, useMemo, useState } from 'react';
import { uploadImg } from '@/api/common';
import { Spin } from 'antd';

export const MyEditor = (props: { value: any; onChange?: (e: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState<WangEditor | null>(null);

  useEffect(() => {
    // const instance = new WangEditor('#div1')
    // setInstance(instance);
    const ins = new WangEditor('#div1');
    setInstance(ins);
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
        props?.onChange?.(instance?.txt?.html?.());
      },
    });
    ins.create();

    return () => {
      ins.destroy();
    };
  }, []);

  useMemo(() => {
    // 重新设置编辑器内容
    instance?.txt?.html(props?.value);
  }, [props?.value]);

  return (
    <Spin spinning={loading}>
      <div id="div1" key="staticEditor"></div>
    </Spin>
  );
};
