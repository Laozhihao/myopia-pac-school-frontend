<h1 align="center">近视防控学校管理端 开发须知</h1>

## 技术栈及使用要求

> 1. 基于 react 17.0 + axios + typescript 4.2.2 + ant-design 4.17.0 + ant-design-pro + scss + dumi 1.1.7 + umi 3.5.0 构建的应用项目
> 2. 开发时请确保已了解或掌握以上技术要求！

## 代码约束

> 使用`eslint`, `@typescript-eslint`进行代码风格约束

## 文件命名规范

> 单词小写，单词之间用 '-' 分隔， 如`data-view`

## 项目地址

```bash
$ git clone git@git.vistel.cn:web/myopia-pac/myopia-pac-school-frontend.git
```

## 使用 yarn 进行包管理

```bash
$ yarn          # Project setup
$ yarn dev    # Compiles and hot-reloads for development
$ yarn build    # Compiles and minifies for production
$ yarn lint:fix    # Lints and fixes files
```

## 工程目录结构

```bash
src：项目源码。开发的时候代码写在这里。
 |--config # 配置
 |    |--routes # 配置routes入口文件
 |--api # 服务层ajax请求服务
 |    |--common # 一些全局的公共api数据入口文件
 |    |--info # 消息中学的api数据入口文件
 |    |--school # 学校详情api数据入口文件
 |    |--screen # 视力筛查的api数据入口文件
 |    |--student # 学生的api数据入口文件
 |    |--typings.d # api数据的type 声明入口文件
 |--assets # 项目静态资源
 |--components # 项目公共组件库
 |--e2e # 枚举
 |    |--baseLayout.e2e # layout 入口文件
 |--enums # 枚举
 |    |--http-enum # http状态枚举
 |--hooks
 |    |--district # 地区级联数据的方法
 |    |--storage # 浏览器缓存等相关方法
 |    |--table # 自定义表格组件相关的公共业务方法
 |--utils # 公共库函数
 |    |--constant.ts # 常量数据
 |--pages # 项目应用页面，根据应用需要，还可以有子页面，各子页面目录结构和顶级子页面类似
 |    |--components # 页面级公共组件
 |    |--infoCenter # 消息中心
 |    |--school # 学校管理
 |    |--screening # 筛查管理
 |    |--student # 学生管理
 |--app.tsx # 项目入口文件

```

### Customize configuration

See [Configuration Reference](https://d.umijs.org/config).
