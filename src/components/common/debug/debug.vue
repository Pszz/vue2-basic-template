<!-- 
	文件：src/components/common/debug/debug.vue
  作者：Pi
  时间：2018-03-28
	描述：自定义debug组件
 -->
 <template>
  <pre v-text="data"></pre>
</template>
 
 <script>
export default {
  props: ['data'],
  name: 'debug'
}
</script>
 
 <style scoped>
pre {
    color: red;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(200, 200, 200, 0.7);
    height: 30%;
    width: 50%;
    z-index: 9999;
    border: 1px solid #FF9800;
    overflow: auto;
    font-size: 14px;
}
</style>