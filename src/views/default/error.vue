<!--
    文件：src/views/default/error.vue
    作者：Pi
    时间：2018-03-20
    描述：错误页面
-->
<template>
  <section class="error-page">
    <section>糟糕，发生了一点点意外</section>
    <router-link :to="{ path: '/' }">回首页</router-link>
  </section>
</template>

<script>
export default {
}
</script>