<!--
    文件：src/views/components/header.vue
    作者：Pi
    时间：2019-06-13
    描述：头部文件
-->
<template>
  <section class="layer-header">
    <div class="max-width">
      <div class="logo">
        <img src="@imgs/logo@2x.png">
        Vue-cli 3.0框架
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
.layer-header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  background-color: @bg;
  color: #fff;
  font-size: 18px;
  .max-width {
    height: 100%;
    margin: 0 auto;
    display: flex;
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      font-weight: bold;
      > img {
        height: 80%;
      }
    }
  }
}
</style>