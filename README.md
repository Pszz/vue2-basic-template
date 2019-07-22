# website

## Project setup
```
yarn install || npm install
```

### Compiles and hot-reloads for development
```
yarn run serve || npm run serve
```

### Compiles and minifies for production
```
yarn run build || npm run build
```

### Run your tests
```
yarn run test || npm run test
```

### Lints and fixes files
```
yarn run lint || npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 结构介绍

根目录 

- public - 存放静态文件(vue-cli2 的static目录)
- src - 项目核心文件
  - assets  - 需要编译/打包/压缩的资源文件(css|less|scss...等，字体，图片)
  - components - 全局组件
  - config - vuex/store/filters/dirctive/ 等扩展配置
  - libs - 第三方工具库
  - views - 所有页面/子页面/子组件 
  - main.js Vue初始入口
  - App.vue  Vue初始化入口组件
