seajs-build-example
===================

###目录结构说明：
```
.
├── config.js // seajs配置文件
├── Gruntfile.js // Grunt配置文件
├── index.html
├── .jshintrc // jshint配置
├── LICENSE
├── Makefile
├── package.json // Node包依赖关系
├── README.md
├── sea-modules
│   ├── jquery
│   │   └── jquery
│   │       └── 1.10.1
│   │           ├── jquery-debug.js
│   │           ├── jquery.js
│   │           └── package.json
│   ├── lvmama // 构建出来的Javascript业务模块目录
│   └── seajs
│       └── seajs
│           └── 2.1.1
│               ├── package.json
│               ├── sea-debug.js
│               ├── sea.js
│               └── sea.js.map
├── static
│   ├── img // 图片存放目录
│   └── style // 构建出来的css文件目录
├── static_src // 存放原始代码的文件夹
│   ├── js // Javascript代码
│   └── style // scss代码
└── tmp // 临时文件夹

```
###Grunt构建命令及说明：

> 初次运行请首先执行命令`grunt js_build`和`grunt css_build`来初始化构建环境。

grunt js_build
:   对`static_src/js`目录下的所有Javascript文件执行构建，构建后的Javascript代码存放在`sea-modules/lvmama`目录下。

grunt css_build
:   对`static_src/style`目录下的所有sass || scss文件执行构建，构建后的css代码存放在`static/style`目录下。

grunt js_hint
:   对`static_src/js`目录下的所有Javascript文件进行代码质量检查。

grunt js_hint
:   对`static_src/js`目录下的所有Javascript文件进行代码质量检查。

grunt css_watch
:   监控`static_src/style`目录文件活动(修改||新建)自动增量构建活动文件，**非全量构建**。

grunt js_watch
:   监控`static_src/js`目录文件活动(修改||新建)自动增量构建活动文件，**非全量构建**。

**注意：移动或删除`static_src`目录下的代码后请手动执行命令`grunt js_reset`或`grunt css_reset`手动将代码全量构建一遍**
