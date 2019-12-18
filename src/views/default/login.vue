<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" type="text" auto-complete="off" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="imgcode" class="imgcode">
        <el-input placeholder="Code" v-model="loginForm.imgcode">
          <template slot="append">
            <img :src="imgCode" @click="getImgCode" />
          </template>
        </el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin" v-keypress.enter>Login</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    function validateUsername (rule, value, callback) {
      if (value.length < 3) {
        callback(new Error('请输入正确用户名'))
      } else {
        callback()
      }
    }
    function validatePassword (rule, value, callback) {
      if (value.length < 6) {
        callback(new Error('请输入正确密码'))
      } else {
        callback()
      }
    }
    return {
      // 表单信息
      loginForm: {
        username: 'admin',
        password: '123456',
        imgcode: ''
      },
      // 验证码
      imgCode: '',
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        imgcode: [{ required: true, message: '请输入图形验证码' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.getImgCode()
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getImgCode () {
      this.$ws.request(this.$wsapi.new_code, res => {
        this.imgCode = 'data:image/png;base64,' + res.para.b64png
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$ws.request(
            this.$wsapi.login,
            res => {
              if (!res.err) {
                this.$store.dispatch('user/setLogind', true)
                this.$store.dispatch('user/setUinfo', res.para.uinfo)
                this.$store.dispatch('user/setSess', res.sess || res.para.sess)
                this.$router.replace({ name: 'Home' })
              }
            },
            {
              uname: this.loginForm.username,
              upwd: md5(this.loginForm.password),
              imgcode: this.loginForm.imgcode
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .imgcode {
    .el-input {
      width: 100%;
      display: flex;
      .el-input-group__append {
        min-width: 100px;
        padding: 2px;
        background: none;
        border: 0 none;
        overflow: hidden;
        > img {
          display: block;
          height: 100%;
          width: 100%;
          background-color: #374a62;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
