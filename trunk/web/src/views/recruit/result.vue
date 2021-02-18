<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="所属小学" prop="primarySchoolId">
        <el-select
          v-model="queryParams.primarySchoolId"
          size="small"
          filterable
          placeholder="请选择或输入学校"
        >
          <el-option
            v-for="dict in primarySchoolOptions"
            :key="dict.id"
            :label="dict.name"
            :value="parseInt(dict.id)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报名学校" prop="schoolId">
        <el-select v-model="queryParams.schoolId" size="small" filterable placeholder="请选择或输入学校">
          <el-option
            v-for="dict in schoolOptions"
            :key="dict.id"
            :label="dict.name"
            :value="parseInt(dict.id)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="录取类型" prop="admissionType">
        <el-select v-model="queryParams.admissionType" size="small" placeholder="请选择录取类型">
          <el-option
            v-for="dict in admissionTypeOptions"
            :key="dict.id"
            :label="dict.name"
            :value="parseInt(dict.id)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="录取状态" prop="status">
        <el-select v-model="queryParams.status" size="small" placeholder="请选择录取状态">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.id"
            :label="dict.name"
            :value="parseInt(dict.id)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学生" prop="searchKey">
        <el-input
          v-model="queryParams.searchKey"
          size="small"
          style="width:240px;"
          placeholder="请输入采集序号/学籍号/学生姓名"
          @keyup.enter.native="search"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.dataList" stripe style="width: 100%">
      <el-table-column prop="primarySchoolName" label="毕业学校"></el-table-column>
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="fillDateTime" label="报名时间"></el-table-column>
      <el-table-column prop="schoolName" label="报名学校"></el-table-column>
      <el-table-column prop="phone1" label="联系电话1"></el-table-column>
      <el-table-column prop="phone2" label="联系电话2"></el-table-column>
      <el-table-column prop="phone3" label="联系电话3"></el-table-column>
      <el-table-column prop="admissionTypeName" label="录取类型"></el-table-column>
      <el-table-column prop="statusName" label="录取状态"></el-table-column>
    </el-table>
    <pagination
      v-show="tableData.total>0"
      :total="tableData.total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="handleQuery"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { admissionTypeSelectEnum, admissionStatusSelectEnum } from "@/utils/enum";
export default {
  name: "RecruitResult",
  data() {
    return {
      queryParams: {
        primarySchoolId: 0,
        schoolId: 0,
        admissionType: 0,
        status: 0,
        searchKey: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: { total: 0, dataList: [] },
      schoolOptions: [],
      primarySchoolOptions: [],
      admissionTypeOptions: admissionTypeSelectEnum,
      statusOptions: admissionStatusSelectEnum
    };
  },
  computed: {},
  created() {
    const defaultSearchOption = { id: 0, name: "请选择(可输入筛选)" };
    //小学学校
    this.$store.dispatch("GetPrimarySchoolList").then(res => {
      this.primarySchoolOptions = res.schoolList;
      this.primarySchoolOptions &&
        this.primarySchoolOptions.splice(0, 0, defaultSearchOption);
    });
    //民办学校
    this.$store.dispatch("GetSchoolList").then(res => {
      this.schoolOptions = res.schoolList;
      this.schoolOptions &&
        this.schoolOptions.splice(0, 0, defaultSearchOption);
    });
  },
  methods: {
    search() {
      this.queryParams.pageIndex = 1;
      this.handleQuery();
    },
    handleQuery() {
      this.$store
        .dispatch("GetRecruitAdmissionResultList", this.queryParams)
        .then(res => {
          this.tableData = res.data;
        });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
