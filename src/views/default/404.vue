<!--
    文件：src/views/default/404.vue
    作者：Pi
    时间：2018-03-20
    描述：404错误
-->
<template>
  <section class="not-found">
    <section>404页面不存在</section>
    <router-link :to="{ path: '/' }">回首页</router-link>
  </section>
</template>

<script>
export default {
}
</script>
