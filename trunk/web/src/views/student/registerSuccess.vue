<template>
  <common-no-login>
    <el-main>
      <div class="stu-tip">
        <i class="el-icon-warning"></i>&nbsp;此页面展示信息有效时间为1小时，请注意保存信息
      </div>
      <div class="result-card">
        <el-card>
          <div slot="header" class="clearfix">
            <b>注册成功</b>
          </div>
          <ul class="desc" v-if="!isDataNull">
            <li>
              采集序号：
              <el-tag>{{this.sampleId}}</el-tag>
            </li>
            <li>
              密码：
              <el-tag>{{this.pwd}}</el-tag>
            </li>
            <li>
              <el-button type="primary" @click="toLogin">登 录</el-button>
            </li>
          </ul>
          <ul class="desc" v-else>
            <li style="text-align:center">数据已失效</li>
          </ul>
        </el-card>
      </div>
    </el-main>
  </common-no-login>
</template>

<script>
import Cookies from "js-cookie";
import CommonNoLogin from "./components/CommonNoLogin";
export default {
  name: "StudentRegisterSuccess",
  components: {
    CommonNoLogin
  },
  data() {
    return {
      sampleId: "",
      pwd: "",
      auditOrgInfo: "",
      isDataNull: false
    };
  },
  watch: {},
  created() {
    const sampleId = Cookies.get("sampleId");
    const pwd = Cookies.get("pwd");
    const auditOrgInfo = Cookies.get("auditOrgInfo");
    if (sampleId && pwd) {
      this.sampleId = sampleId;
      this.pwd = pwd;
      this.auditOrgInfo = auditOrgInfo;
    } else {
      this.isDataNull = true;
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/student/login" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-main {
  width: 1050px;
  margin: 0 auto;
  padding: 10px 0;
  min-height: calc(100vh - 120px);

  .result-card {
    width: 420px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .desc {
    list-style: none;
    padding: 0 40px;
    li {
      padding: 10px 0px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
