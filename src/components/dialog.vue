<!--
    文件：src/components/dialog/index.vue
    作者：Pi  
    时间：2019-07-18
    描述：弹窗
-->

<template>
  <section class="mask dialog">
    <div class="box">
      <div class="title" v-if="title">{{ title }}</div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="button">
        <div class="sure" @click="onSure">确认</div>
        <div class="cancel" @click="onCancel">取消</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSure () {
      this.$emit('onSure')
    },
    onCancel () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.3rem;
  width: 6.4rem;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 15%;
  z-index: 99;
  box-sizing: border-box;
  .title {
    font-size: 0.24rem;
    padding-bottom: 0.3rem;
    color: @color;
    text-align: center;
  }
  .body {
    padding: 0.2rem 0;
    min-height: 0.6rem;
  }
  .button {
    color: #fff;
    display: flex;
    justify-content: center;
    > div {
      user-select: none;
      cursor: pointer;
      .-line-height(0.4rem);
      width: 1rem;
      border-radius: 0.04rem;
      background-color: #aaa;
      margin: 0 0.2rem;
      text-align: center;
      font-size: 0.16rem;
    }
    .sure {
      background: linear-gradient(to bottom, @bg-light, @bg-dark) @bg-dark;
    }
  }
}
</style>