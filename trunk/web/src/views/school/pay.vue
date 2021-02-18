<template>
  <div class="app-container">
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
      <el-form-item v-show="isShowBuild" label="楼盘生" prop="roleName">
        <el-checkbox @change="buildChange" :checked="isBuild">是</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.dataList" stripe style="width: 100%">
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="fillTypeName" label="报名类型"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="className" label="班级（摇号）"></el-table-column>
      <el-table-column
        prop="studentPaymentStatus"
        label="缴费情况"
        :formatter="(row, column, cellValue, index) => !cellValue ? '已缴费' : '待缴费'"
      ></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            :disabled="!scope.row.paymentStatus"
            type="text"
            size="small"
            @click="pay(scope.row.sampleId, scope.row)"
          >缴费</el-button>
        </template>
      </el-table-column>
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
import { recruitTypeEnum, admissionStatusEnum } from "@/utils/enum";
export default {
  name: "SchoolPay",
  data() {
    return {
      queryParams: {
        searchKey: "",
        paymentStatus: admissionStatusEnum.ballot,
        fillType: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tableData: { total: 0, dataList: [] }
    };
  },
  computed: {
    isShowBuild: function() {
      return (
        this.queryParams.fillType == recruitTypeEnum.build ||
        this.queryParams.fillType == recruitTypeEnum.public
      );
    },
    isBuild: function() {
      return this.queryParams.fillType == recruitTypeEnum.build;
    }
  },
  created() {
    const { fullPath } = this.$route;
    this.queryParams.fillType = fullPath.substring(
      fullPath.length - 1,
      fullPath.length
    );
  },
  methods: {
    search() {
      this.queryParams.pageIndex = 1;
      this.handleQuery();
    },
    handleQuery() {
      this.$store.dispatch("GetPaymentList", this.queryParams).then(res => {
        this.tableData = res.data;
      });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    },
    /**
     * 是否楼盘生
     */
    buildChange(val) {
      this.queryParams.fillType = val
        ? recruitTypeEnum.build
        : recruitTypeEnum.public;
    },
    pay(sampleId, row) {
      this.$confirm(`是否将“${row.studentName}”标记为已缴费？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("StudentPay", { sampleId }).then(res => {
            const payMessage = ["操作成功", "操作失败", "缴费通道暂未开放"];
            this.$message({
              type: res.status == 1 ? "success" : "error",
              message: payMessage[res.status - 1]
            });
            if (res.status == 1) {
              row.paymentStatus = false;
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
