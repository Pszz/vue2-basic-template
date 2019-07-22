# 多语言

##  参数介绍
```javascript
{
    userLge: {}, // 多语言数据
    defaultLang: {}, // 默认语言 - 中文简体
    install: function(){}, // Vue 加载器入口
    init: function() {}, // 初始化加载语言
    get: function(key, args) {}, // 根据key提取语言内容
    getCurrLang: function() {}, // 获取当前使用的语言: 如'zh-cn'
    setCurrLang: function(lang) {}, // 修改当前使用的语言: 如 'en-us'
    importLge: function(lang) {} // 根据语言名称提取./lge/xx-xx.json 内容
}
```
