<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo"></div>
      <div class="login-title">Greeting, Mr.Stark 🌈</div>
      <el-form status-icon :model="loginForm" :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="Username"
            @keyup.enter.native="login" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont el-icon-mymima"
            show-password
            placeholder="Password"
            @keyup.enter.native="login" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">Login 🔑</el-button>
    </div>
  </div>
</template>

<script>
import { generaMenu } from '@/assets/js/menu'
export default {
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: 'The user name cannot be empty', trigger: 'blur' }],
        password: [{ required: true, message: 'The password cannot be empty', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const that = this
          var captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, function (res) {
            if (res.ret === 0) {
              let param = new URLSearchParams()
              param.append('username', that.loginForm.username)
              param.append('password', that.loginForm.password)
              that.axios.post('/api/users/login', param).then(({ data }) => {
                if (data.flag) {
                  that.$store.commit('login', data.data)
                  generaMenu()
                  that.$message.success('Log in successfully')
                  that.$router.push({ path: '/' })
                } else {
                  that.$message.error(data.message)
                }
              })
            }
          })
          captcha.show()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url(http://beamstark2.oss-cn-hangzhou.aliyuncs.com/photos/11ed009b1b886dd139ec096f034c81fa.png) center center / cover
    no-repeat;
}
.login-card {
  position: absolute;
  /*top: 150px;*/
  /*bottom: 0;*/
  /*right: 5px;*/
  background: #ffffff;
  padding: 170px 60px 180px;
  width: 350px;
  height: 150px;
  border-radius: 20px;
  left: 0; top: 0; right: 0; bottom: 0;
  margin: auto;
}
.logo {
  margin-top: -150px;
  margin-left: 100px;
  width: 150px;
  height: 150px;
  background: url(http://beamstark2.oss-cn-hangzhou.aliyuncs.com/config/b536312a97af9481eb6bd45d30fc33fe.PNG) center center / cover
  no-repeat;
}
.login-title {
  margin-top: 5px;
  color: #000000;
  font-weight: bold;
  font-size: 1rem;
}
.login-form {
  margin-top: 1.2rem;
}
.login-card button {
  margin-top: 1rem;
  width: 280px;
  margin-left: 35px;
  border-radius: 8px;
  font-size: 15px;
  background: black;
}
</style>
