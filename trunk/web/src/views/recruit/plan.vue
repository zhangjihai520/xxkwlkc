<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="departmentName" label="管辖区域"></el-table-column>
      <el-table-column prop="schoolName" label="学校"></el-table-column>
      <el-table-column prop="staffRecruitCount" label="教职工子女招生计划数"></el-table-column>
      <el-table-column prop="straightupRecruitCount" label="直升招生计划数"></el-table-column>
      <el-table-column prop="publicRecruitCount" label="校外招生计划数"></el-table-column>
      <el-table-column prop="recruitTotal" label="总招生计划数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RecruitPlan",
  data() {
    return { tableData: [] };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("GetPlanList").then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.label {
  text-align: right;
  font-weight: bold;
  color: #606266;
}
</style>
