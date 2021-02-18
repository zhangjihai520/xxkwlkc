<template>
  <el-container>
    <el-header height="70px">
      <img @click="goLogin" alt="logo" src="@/assets/image/logo.png" />
      <div class="link">
        <el-link type="primary" href="/student/login">登录</el-link>&nbsp;&nbsp;
        <!-- |&nbsp;&nbsp;<el-link type="primary" href="/student/register">注册</el-link> -->
      </div>
    </el-header>
    <slot />
    <!--  底部  -->
    <el-footer height="40px">版权所有&nbsp;©&nbsp;2020&nbsp;&nbsp;南昌市现代教育技术中心&nbsp;&nbsp;技术支持：江西软云科技股份有限公司</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "CommonNoLogin",
  data() {
    return {};
  },
  created() {},
  methods: {
    goLogin() {
      this.$router.push({ path: "/student/login" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-container {
  width: 100%;
}
.el-header {
  padding-top: 10px;
  text-align: center;
  img {
    padding-left: 100px;
    height: 50px;
    cursor: pointer;
  }
  .link {
    float: right;
    width: 100px;
    padding-top: 15px;
    text-align: right;
  }
}

.el-footer {
  line-height: 40px;
  font-size: 14px;
  color: #333;
  text-align: center;
}

@media screen and (max-width: 700px) {
  .el-header {
    img {
      padding-left: 0;
    }
  }
}
</style>
