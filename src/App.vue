<template>
  <main id="app" class="app-page">
    <!-- 组件: 头部 -->
    <m-header class="app-header"></m-header>

    <!-- 内容 -->
    <router-view class="app-content"></router-view>

    <!-- 组件: 底部 -->
    <m-footer class="app-footer"></m-footer>

  </main>
</template> 
<script>
import '@assets/less/index.less'
import MHeader from '@components/header.vue'
import MFooter from '@components/footer.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    MFooter
  }
}
</script>

<style lang="less" scoped>
.app-content {
  min-height: 90vh;
  padding-top: 0.6rem;
  position: relative;
  z-index: 10;
}
</style>
