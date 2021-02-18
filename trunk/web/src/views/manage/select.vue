<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="毕业学校" prop="schoolId">
        <el-select
          v-model="queryParams.schoolId"
          placeholder="请选择毕业学校"
          size="small"
          filterable
          style="width:240px;"
        >
          <el-option
            v-for="(item, index) in schoolOptions"
            :key="index"
            :label="item.name"
            :value="parseInt(item.id)"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="className">
        <el-input
          v-model="queryParams.className"
          size="small"
          style="width:100px;"
          placeholder="请输入班级"
          @keyup.enter.native="handleQuery"
        />
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.dataList" stripe style="width: 100%">
      <el-table-column prop="schoolName" label="毕业学校"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="studentCodeCheckStatus" label="学籍核验"></el-table-column>
      <el-table-column prop="residenceCheckStatus" label="户籍核验"></el-table-column>
      <el-table-column prop="houseCheckStatus" label="房产核验"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.sampleId)">详情</el-button>
          <el-button
            :disabled="scope.row.isFromCity!=1"
            type="text"
            size="small"
            @click="restPassword(scope.row)"
          >重置密码</el-button>
          <!-- 已填报学校或有核验通过项则不允许删除 -->
          <el-button
            :disabled="scope.row.isDelete!=1"
            type="text"
            size="small"
            @click="del(scope.row.sampleId, scope.row)"
          >删除</el-button>
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
    <student-info :studentInfo="studentInfo" @close="studentInfo.dialogVisible=false" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import studentInfo from "@/views/components/studentInfo";

export default {
  name: "ManageSelect",
  components: {
    studentInfo
  },
  data() {
    return {
      schoolOptions: [],
      queryParams: {
        schoolId: 0,
        className: "",
        searchKey: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: { total: 0, dataList: [] },
      studentInfo: {
        sampleId: 0,
        dialogVisible: false
      }
    };
  },
  computed: {},
  created() {
    const defaultSearchOption = { id: 0, name: "请选择(可输入筛选)" };
    //学校
    this.$store.dispatch("GetPrimarySchoolList").then(res => {
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
      this.$store.dispatch("GetStudentInfoList", this.queryParams).then(res => {
        this.tableData = res.data;
      });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    },
    detail(sampleId) {
      this.studentInfo = {
        sampleId: sampleId,
        dialogVisible: true
      };
    },
    restPassword(row) {
      this.$confirm(
        `是否将采集号为“${row.sampleId}”的学生（${row.studentName}）重置密码？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store
            .dispatch("RestPassword", { sampleId: row.sampleId })
            .then(res => {
              if (res.status == 1) {
                this.$alert(
                  `操作成功，采集号为【${row.sampleId}】的新密码为【${res.newPassword}】`,
                  "提示"
                );
              } else {
                this.$message.error("操作失败");
              }
            });
        })
        .catch(() => {});
    },
    del(sampleId, row) {
      this.$confirm(
        `是否将采集号为“${row.sampleId}”的学生（${row.studentName}）删除？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$store.dispatch("DeleteStudentInfo", { sampleId }).then(res => {
            this.$message({
              type: "success",
              message: res.status == 1 ? "操作成功!" : "操作失败！"
            });
            if (res.status == 1) {
              this.handleQuery();
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
