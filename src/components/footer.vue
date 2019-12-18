<!--
    文件：src/views/components/footer.vue
    作者：Pi
    时间：2019-06-13
    描述：头部文件
-->
<template>
  <section class="layer-footer">
    <ul class="max-width">
      这是底部
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layer-footer {
  height: 384px;
  color: #fff;
  background-color: @bg;
  overflow: hidden;
  padding: 30px 0;
  .max-width {
    margin: 0 auto;
    display: flex;
  }
}
</style>