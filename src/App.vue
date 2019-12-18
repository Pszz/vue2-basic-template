<template>
  <main id="app">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
  created () {
    window.vm = this
    // 全局分页配置
    this.$root.pageSizeOpts = [10, 20, 50, 100, 200, 500]
    // 全局计算总数
    this.$root.getTotal = this.getTotal
    // 全局复制函数
    this.$root.onCopy = this.onCopy
  },
  methods: {
    /**
     * 总计计算
     * @param { Array[Object] }  arr
     * @param { String } key 需要计算的属性
     */
    getTotal (arr, key) {
      let sum = 0
      if (arr.length) {
        sum = arr.reduce((prev, next) => {
          prev += parseFloat(next[key] || 0)
          return prev
        }, 0)
        sum = parseFloat(sum.toFixed(2)) || 0
      }
      return sum
    },
    /**
     * 复制功能
     * @param { String } txt 复制的内容
     */
    onCopy (txt) {
      this.$copyText(txt).then(
        () => {
          this.$message.success('复制成功:' + txt)
        },
        () => {
          this.$message.error('复制失败:' + txt)
        }
      )
    }
  }
}
</script>