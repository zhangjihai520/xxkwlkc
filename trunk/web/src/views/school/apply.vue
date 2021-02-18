<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="4" class="label">教职工子女报名人数：</el-col>
      <el-col :span="4">{{totalData.staffFillCount}}</el-col>
      <el-col :span="3" class="label">直升报名人数：</el-col>
      <el-col :span="3">{{totalData.straightupFillCount}}</el-col>
      <el-col :span="6" class="label">校外招生报名人数：</el-col>
      <el-col :span="4">{{totalData.publicFillCount}}</el-col>
    </el-row>
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="学生" prop="searchKey">
        <el-input
          style="width:240px;"
          v-model="queryParams.searchKey"
          size="small"
          placeholder="请输入采集序号/学籍号/学生姓名"
          @keyup.enter.native="search"
        />
      </el-form-item>
      <el-form-item label="报名类型" prop="fillType">
        <el-select v-model="queryParams.fillType" size="small" placeholder="报名类型">
          <el-option
            v-for="dict in recruitTypeData"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="applyData.dataList" stripe style="width: 100%">
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="fillTypeName" label="报名类型"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="studentCode" label="学籍号"></el-table-column>
      <!-- <el-table-column prop="national" label="民族"></el-table-column> -->
      <!-- <el-table-column prop="policeStation" label="户口所属派出所"></el-table-column>
      <el-table-column prop="houseDistrict" label="房产地址所在区"></el-table-column> -->
    </el-table>

    <pagination
      v-show="applyData.total>0"
      :total="applyData.total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="handleQuery"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { recruitTypeSelectEnum } from "@/utils/enum";
export default {
  name: "SchoolApply",
  data() {
    return {
      totalData: {},
      queryParams: {
        searchKey: "",
        fillType: 0,
        pageIndex: 1,
        pageSize: 10
      },
      recruitTypeData: recruitTypeSelectEnum,
      applyData: { total: 0, dataList: [] }
    };
  },
  computed: {},
  created() {
    this.getPlanData();
  },
  methods: {
    getPlanData() {
      this.$store.dispatch("GetFillSummaryInfo").then(res => {
        this.totalData = res.data;
      });
    },
    search() {
      this.queryParams.pageIndex = 1;
      this.handleQuery();
    },
    handleQuery() {
      this.$store.dispatch("GetFillStudentList", this.queryParams).then(res => {
        this.applyData = res.data;
      });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
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
