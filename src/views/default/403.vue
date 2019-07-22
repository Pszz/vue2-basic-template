<!--
    文件：src/views/default/403.vue
    作者：Pi
    时间：2018-03-20
    描述：权限不足提示
-->
<template>
  <section class="not-found">
    <section>您没有权限访问当前页面</section>
		<router-link :to="{ path: '/' }">回首页</router-link>
  </section>
</template>