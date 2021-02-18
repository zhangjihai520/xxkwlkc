<template>
  <common-no-login>
    <el-main>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <h3 class="title">南昌市普通高中选修课网络课程</h3>
        <!-- <h4 class="subtitle">EDUCATION EXAMINATIONS AUTHORITY</h4> -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="采集序号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" style="margin-bottom:25px;">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码（不区分大小写）"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" />
          </div>
        </el-form-item>
        <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox> -->
        <el-form-item style="margin-bottom:5px;">
          <el-button
            :loading="loading"
            size="medium"
            type="danger"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >登 录</el-button>
        </el-form-item>
        <el-button type="default" disabled style="width:100%; margin-bottom:15px;">注 册</el-button>
      </el-form>
    </el-main>
  </common-no-login>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { loginStatusEnum } from "@/utils/enum";
import { setToken } from "@/utils/auth";
import CommonNoLogin from "./components/CommonNoLogin";

export default {
  name: "StudentLogin",
  components: {
    CommonNoLogin
  },
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "采集序号不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.username = this.loginForm.username.trim();
          this.$store
            .dispatch("StudentLogin", this.loginForm)
            .then(res => {
              if (res.status == 1) {
                setToken(res.token);
                this.$router.push({ path: "/student/index" });
              } else {
                this.$message.error(loginStatusEnum[res.status]);
                this.getCode();
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    },
    toRegister() {
      this.$router.push({ path: "/student/register" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-main {
  min-height: calc(100vh - 110px);
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/image/student/login-bg.png");
  background-size: cover;
}

.login-form {
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
  .title {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 20px;
    font-family: '微软雅黑';
  }
  .subtitle {
    color: #575857;
    margin: 0 0 20px 0;
    font-style:oblique;
    font-size: 14px;
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
