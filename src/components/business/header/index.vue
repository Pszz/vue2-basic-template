<!--
  src: components/business/footer
  created: 2018.11.02
  author: Pi
  desc: 网页头部公共部分
-->
<template>
  <section class="m-header">
    <div class="content">
      <div class="logo">
        <img src="~img/logo.png">
        <img src="~img/ttbit.png">
      </div>
      <ul class="menu">
        <router-link
          tag="li"
          v-for="(menu, key) in menus"
          :key="key"
          :to="menu.path"
        >{{ menu.label }}</router-link>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MHeader',
  data () {
    return {
      menus: [
        { path: '/', label: '产品介绍' },
        { path: '/', label: '服务流程' },
        { path: '/', label: '服务优势' },
        { path: '/', label: '关于我们' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.m-header {
  height: 0.8rem;
  font-size: 0.18rem;
  background-color: rgba(0, 0, 0, 0.2);
  .content {
    display: flex;
  }
  .logo{
    display: flex;
    align-items: center;
  }
  .menu{
    display: flex;
  }
}
</style>
