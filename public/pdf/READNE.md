### 功能扩展

1. 可通过地址给viewer.js传入参数
 > 在"/pdf/viewer.html?file=url"地址上可以添加参数，同时在viewer.js内可以取到，传入的参数必须写在file之前&分开

2. 打印预览窗口可定制
> 在地址上传入参数printpreview=true 可在预览pdf页面默认打开打印预览窗口，默认不打开

3. pdf viewer的字体可定制（暂未使用）
> 在地址上传入参数iscustomtypeface=true, 则会使用自定义的字体，但目前需要在viewer.js源码中设置自定义的字体