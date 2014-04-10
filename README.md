seajs-build-example
===================

###目录结构说明：
```
.
├── sea-modules // seajs模块目录，用于存放第三方模块/构建后的自定义模块
│   ├── gallery
│   │   ├── backbone
│   │   │   └── 1.1.2
│   │   ├── mustache
│   │   │   └── 0.8.1
│   │   └── underscore
│   │       └── 1.6.0
│   ├── jquery
│   │   └── jquery
│   │       └── 1.10.1
│   ├── lvmama
│   ├── seajs
│   │   └── seajs
│   │       └── 2.1.1
│   └── willkan
│       └── backbone-localStorage
│           └── 1.1.6
├── static // 静态文件目录，用来存放图片与生成的css文件
│   ├── img // 存放图片
│   └── style // 存放css
│       ├── lib // 存放第三方css文件，例如：reset.css、bootstrap.min.css
│       └── lvmama // 存放构建后的自定义css样式文件
├── static_src // javascript与sass源文件(未经压缩与合并过的)
│   ├── js
│   └── style
│       ├── lib
│       └── lvmama
└── tmp // 构建Js时用到的临时文件夹
    ├── concat_js
    └── transport_js
```

###Grunt构建命令及说明：

**grunt js_build**

构建Javascript，将{static_src/js}目录下的所有Javascript源文件构建至{sea-modules/lvmama}目录下，构建前{sea-modules/lvmama}目录将被清空
 
**grunt css_build**

构建SASS，将{static_src/style/lvmama}目录下的所有scss或sass文件转换并压缩存放至目标目录{static/style/lvmama}目录下，构建前{static/style/lvmama}目录将被清空
  
**grunt js_watch**

监听{static_src/js}目录下Javascript文件变动(修改/新建操作)，对变动的文件执行构建操作，并输出至{sea-modules/lvmama}目录，此构建操作不会清空{sea-modules/lvmama}目录
   
**grunt css_watch**
监听{static_src/style/lvmama}目录下scss或sass文件变动(修改/新建操作)，对变动的文件执行构建操作，并输出至{static/style/lvmama}目录，此构建操作不会清空{static/style/lvmama}目录
    
**grunt js_hint**
读取配置文件中Javascript代码质量检测配置，对{static_src/js}所有Javascript文件进行编码规范检查


###注意：

> 对{static_src/js}或{static_src/style/lvmama}目录下的文件执行删除/移动操作后请手动执行一下构建命令

> 理清依赖关系，修改被引用文件不会重新构建依赖于该文件的其它文件
