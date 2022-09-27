import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export const MyEditor = (props: { value: any, onChange?: (e: any) => void }) => {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    const { value } = props;

    // 编辑器内容
    const [html, setHtml] = useState('');

    useEffect(() => {
      setHtml(value);
    }, [value])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法

    console.log(editor?.getAllMenuKeys(), '222');
    
  //   toolbarConfig.toolbarKeys = [
  //     // 菜单 key
  //     'headerSelect',
  
  //     // 分割线
  //     '|',
  
  //     // 菜单 key
  //     'bold', 'fontSize', 'indent', 'bulletedList', 'numberedList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify', 'insertImage', 'uploadImage', 'fullScreen',
  
  //     // 菜单组，包含多个菜单
  //     {
  //         key: 'group-image', // 必填，要以 group 开头
  //         title: '更多样式', // 必填
  //         iconSvg: '<svg>....</svg>', // 可选
          menuKeys: ['insertImage', 'uploadImage'] // 下级菜单 key ，必填
  //     },
  //     // 继续配置其他菜单...
  // ]            // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor?.destroy()
            setEditor(null)
        }
    }, [editor])
    const editorOnchange = (editor: { getHtml: () => React.SetStateAction<string> }) => {
      setHtml(editor.getHtml())
      props?.onChange?.(editor.getHtml());
    }

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
              <Toolbar
                  editor={editor}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: '1px solid #ccc' }}
              />
              <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editorOnchange}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
              />
            </div>
        </>
    )
}