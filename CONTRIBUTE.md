# 模板简单上手

## 目录结构

下面是对常用目录的一个介绍。

### 1、项目目录

```
project
├── dist
├── src             # 源码目录
├── public          # 静态资源，里面的内容会全部复制到 dist 目录下
├── index.html      # 入口的 html 页，构建时会在此文件基础上进行一些修改
└── ……              # 其它都不重要
```

### 2、源码目录

```
src
├── main.js             # 入口文件，可以在这里加全局的功能
├── entry.vue           # 入口模板，可以作为全局布局
├── router.js           # 路由配置文件，可以自定义路由规则。你也可以不自定义，而是使用内置的自动路由
├── assets              # 图片等资源文件
├── pages               # 页面，遵循 umi 约定
│   ├── xxx.vue         # /xxx/ 页面
│   └── yyy.vue         # /yyy/ 页面
├── models              # 数据层，预留
├── components          # 通用组件
├── services            # 一些服务，如异常上报等，通常应该存在内部 npm 包，这里是存放那些未成形的服务
└── utils               # 一些工具类
```


## 开始开发

- 以下操作默认均在页面目录下进行

### 新增一个页面

新建与 url 相对应的目录作为 **页面目录** （[路由介绍](#路由介绍)），在 **页面目录** 下新建 `index.vue`。

```vue
// index.vue
<template>
  <div>Hello World!</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style></style>
```

## 代码组织

### 路由介绍

我们内置的 `/src/services/auto-router.js` 会根据 `pages` 目录作自动路由，称为“约定式路由”。举例：

- `page/users/index.vue` -> `/users/`
- `page/users/list/index.vue` -> `/users/list/`
- 所有的页面都是目录下的 `index.js`，这样方便在页面内做功能的文件拆分

你也可以无视或关闭自动路由，完全手动配置路由规则：

```js
// /src/router.js
// import Router from './services/auto-router'; // 将这一行修改为下面一行
import Router from 'vue-router';
```

### 页面代码组织

1. **页面目录** 是与 url 相对应的目录（[路由介绍](#路由介绍)）
2. `index.vue` 暴露页面的函数
3. `components/` 可复用的组件
4. `services/` 插件、可复用的服务
5. `utils/` 简单可复用的工具类

### 全局复用

将全局复用的功能，提取到 `src` 根目录下，包括：

- `/src/components/`
- `/src/services/`
- `/src/utils/`
