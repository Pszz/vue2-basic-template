<template>
  <main id="main">
    <!-- 组件：头部 -->
    <m-header></m-header>
    <!-- 内容路由 -->
    <router-view/>
    <!-- 组件：底部 -->
    <m-footer></m-footer>
  </main>
</template>

<script>
// import 'element-ui/lib/theme-chalk/index.css'
import MHeader from 'components/business/header'
import MFooter from 'components/business/footer'
export default {
  name: 'Main',
  components: {
    MHeader,
    MFooter
  },
  created () {
    // 启动装载机
    // this.$interrupt.registe(this.$ws)
  }
}
</script>