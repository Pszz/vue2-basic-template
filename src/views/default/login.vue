<!--
    文件：src/views/default/login.vue
    作者：Pi
    时间：2018-07-31
    描述：登陆
-->
<template>
    <section class="login-page"></section>
</template>

<script>
import md5 from 'md5'
export default {
    data () {
        return {
            // 账号
            email: '',
            // 密码
            passwd: '',
            // 验证码
            imgcode: ''
        }
    },
    methods: {
    }
}
</script>
