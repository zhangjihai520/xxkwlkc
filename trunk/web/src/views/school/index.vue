<template>
  <div class="app-container">
    <el-card class="school">
      <div slot="header" class="title">基本信息</div>
      <el-row :gutter="20">
        <el-col :span="8">总招生计划数：{{planData.recruitTotal}}</el-col>
        <el-col :span="8">区域：{{planData.departmentName}}</el-col>
        <el-col :span="8">学校：{{planData.schoolName}}</el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" class="detail">
      <el-col :span="8">
        <el-card>
          <div class="num">{{planData.staffRecruitCount}}</div>
          <div class="txt">教职工子女招生计划数</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="school">
          <div class="num">{{planData.straightupRecruitCount}}</div>
          <div class="txt">直升计划数</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="school">
          <div class="num">{{planData.publicRecruitCount}}</div>
          <div class="txt">校外招生计划数</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SchoolIndex",
  data() {
    return {
      planData: {}
    };
  },
  computed: {},
  created() {
    this.getPlanData();
  },
  methods: {
    getPlanData() {
      this.$store.dispatch("GetSchoolPlan").then(res => {
        this.planData = res.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.school {
  .title {
    font-weight: bold;
  }
}
.detail {
  margin-top: 20px;
  .num {
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin: 0 auto;
    text-align: center;
    line-height: 80px;
    color: $green;
    font-weight: bold;
  }
  .txt {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    font-family: "微软雅黑";
  }
}
</style>
