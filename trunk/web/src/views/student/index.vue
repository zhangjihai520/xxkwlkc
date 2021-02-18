<template>
  <div class="index-main">
    <div class="oper">
      <!-- 
        信息采集：学生采集信息阶段；   跳转页面：信息采集页
        民办申报：学生报名阶段；   跳转页面：填报志愿报名页
        录取查询：学生查询录取结果阶段；    跳转页面：录取结果查询页
      -->
      <el-card class="box-card" body-style="padding:0;">
        <img alt="信息采集" src="@/assets/image/student/index-1.png" />
        <span class="title">信息采集</span>
        <!-- <span class="sub">INFORMATION ACQUISITION</span> -->
        <el-tooltip
          popper-class="tip"
          effect="dark"
          :content="isEditInfo?'点击进入':'暂未开放'"
          placement="top-start"
        >
          <el-button
            type="primary"
            icon="el-icon-arrow-right"
            circle
            :class="isEditInfo?'':'is-disabled'"
            v-on:click="goPage('applyInfo')"
          ></el-button>
        </el-tooltip>
      </el-card>
      <el-card class="box-card" body-style="padding:0;">
        <img alt="民办申报" src="@/assets/image/student/index-2.png" />
        <span class="title">民办申报</span>
        <!-- <span class="sub">INFORMATION ACQUISITION</span> -->
        <el-tooltip
          popper-class="tip"
          effect="dark"
          :content="isApplySchool||isShowValidationResult?'点击进入':'先采集预览提交，再申报'"
          placement="top-start"
        >
          <el-button
            type="primary"
            icon="el-icon-arrow-right"
            circle
            :class="isApplySchool||isShowValidationResult?'':'is-disabled'"
            v-on:click="goPage('selectSchool')"
          ></el-button>
        </el-tooltip>
      </el-card>
      <el-card class="box-card" body-style="padding:0;">
        <img alt="录取查询" src="@/assets/image/student/index-3.png" />
        <span class="title">录取查询</span>
        <!-- <span class="sub">INFORMATION ACQUISITION</span> -->
        <el-tooltip
          popper-class="tip"
          effect="dark"
          :content="isSelectResult?'点击进入':'您未录取'"
          placement="top-start"
        >
          <el-button
            type="primary"
            icon="el-icon-arrow-right"
            circle
            :class="isSelectResult?'':'is-disabled'"
            v-on:click="goPage('matriculateResult')"
          ></el-button>
        </el-tooltip>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StudentIndex",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isFromCityBool: state => state.student.studentInfo.isFromCity == 0,
      isFromCity: state => state.student.studentInfo.isFromCity,
      isEditInfo: state => state.student.studentAccess.isEditInfo,
      isApplySchool: state => state.student.studentAccess.isApplySchool,
      isShowValidationResult: state =>
        state.student.studentAccess.isShowValidationResult,
      isSelectResult: state => state.student.studentAccess.isSelectResult
    })
  },
  created() {},
  methods: {
    goPage(type) {
      if (type == "applyInfo" && !this.isEditInfo) return;
      if (
        type == "selectSchool" &&
        !this.isApplySchool &&
        !this.isShowValidationResult
      )
        return;
      if (type == "matriculateResult" && !this.isSelectResult) return;
      this.$router.push({ path: `/student/${type}` });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.index-main {
  background-image: url("~@/assets/image/student/index-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.oper {
  display: block;
  padding-top: 12%;
  margin: 0 auto;
  width: 730px;
  .el-card {
    display: inline-block;
    width: 220px;
    height: 300px;
    margin-right: 20px;
    padding-top: 50px;
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      display: inline-block;
    }
    .title {
      display: block;
      padding: 30px 0 30px 0;
      font-size: 18px;
      color: #333;
    }
    .sub {
      display: block;
      padding: 0 0 30px 0;
      font-size: 14px;
      color: #ccd4dc;
    }
  }
}
</style>
