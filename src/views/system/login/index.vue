<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center"
    >
      {{ time }}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
      >
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            遇见你是人生中最浪漫的事
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center"
        >
          <!-- logo -->
            <img class="page-login--logo" src="./image/heart.png" />
          <!-- form -->
          <div class="page-login--form"  >
            <el-card shadow="never">
              <div style="display:flex; justify-content: center;margin:0 auto 10px; ">
                  <span style="cursor: auto;">
                    {{title}}
                  </span>
              </div>
               <el-form
                ref="reform"
                label-position="top"
                :rules="rules"
                :model="reform"
                size="default"
                 v-if="forgotPass||isregister"
              >
                <el-form-item prop="reguser" v-if="isregister">
                  <el-input
                    type="text"
                    v-model="reform.reguser"
                    placeholder="用户名"
                  >
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                  <el-form-item prop="userphone">
                  <el-input
                    type="text"
                    v-model="reform.userphone"
                    placeholder="手机号"
                  >
                    <i slot="prepend" class="fa fa-mobile fa-2x"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="pass">
                  <el-input
                    type="password"
                    v-model="reform.pass"
                    placeholder="密码"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                 <el-form-item prop="checkpassword">
                  <el-input
                    type="password"
                    v-model="reform.checkpassword"
                    placeholder="再次输入密码"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    type="text"
                    v-model="reform.phonecode"
                    placeholder="手机验证码"
                  >
                    <template slot="append">
                      <img class="login-code" src="./image/login-code.png" />
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login"
                >
                  确认
                </el-button>
              </el-form>
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default"
                v-else
              >
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="用户名"
                  >
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    placeholder="密码"
                  >
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    type="text"
                    v-model="formLogin.code"
                    placeholder="验证码"
                  >
                    <template slot="append">
                      <img class="login-code" src="./image/login-code.png" />
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  size="default"
                  @click="submit"
                  type="primary"
                  class="button-login"
                >
                  登录
                </el-button>
              </el-form>
            </el-card>
            <p class="page-login--options" flex="main:justify cross:center"  v-if="!forgotPass&&!isregister">
              <span @click="toFindPassword('forgotPass')"><d2-icon name="question-circle" /> 忘记密码</span>
              <span @click="toFindPassword('isregister')">注册用户</span>
            </p>
            <p class="page-login--options" style="display:flex; justify-content: center;"  v-else>
              <span @click="toFindPassword('tologin')">去登录</span>
            </p>
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-copyright">
            Copyright
            <d2-icon name="copyright" />
            2021 小沈老师后台管理系统
            <a href="https://beian.miit.gov.cn/">
              豫ICP备2021011934号
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
import { isTel, password } from '@/utils/validate.js'

export default {
  mixins: [localeMixin],
  data () {
    var validPhone = (rule, value, callback) => {
      if (!isTel(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!password(value)) {
        callback(new Error('请输入6-16个，含字母、数字两种及以上组合'))
      } else {
        if (this.reform.checkpassword !== '') {
          this.$refs.reform.validateField('checkpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.reform.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 快速选择用户
      dialogVisible: false,
      isregister: false,
      forgotPass: false,
      title: '登录',
      // 表单1
      formLogin: {
        username: '',
        password: '',
        code: ''
      },
      // 表单2
      reform: {
        reguser: '',
        userphone: '',
        pass: '',
        checkpassword: '',
        phonecode: ''
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        reguser: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userphone: [
          {
            required: true,
            validator: validPhone,
            trigger: 'blur'
          }
        ],
        pass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkpassword: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    toFindPassword (identifying) {
      switch (identifying) {
        case 'forgotPass': // 忘记密码
          this.forgotPass = true
          this.isregister = false
          this.title = '重置密码'
          this.$refs.loginForm.resetFields()
          break
        case 'isregister': // 注册用户
          this.forgotPass = false
          this.isregister = true
          this.title = '注册'
          this.$refs.loginForm.resetFields()
          break
        default:
          this.forgotPass = false
          this.isregister = false
          this.title = '登录'
          this.$refs.reform.resetFields()
          break
      }
    },
    ...mapActions('d2admin/account', ['login']),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          }).then(() => {
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
            // }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  cursor: auto;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 140px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 300px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    span{
      cursor: pointer;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #405864;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
