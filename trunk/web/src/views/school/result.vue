<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="学生" prop="searchKey">
        <el-input
          style="width:220px;"
          v-model="queryParams.searchKey"
          size="small"
          placeholder="请输入采集序号/学籍号/学生姓名"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="录取类型" prop="admissionType">
        <el-select v-model="queryParams.admissionType" size="small" placeholder="录取类型">
          <el-option
            v-for="dict in admissionTypeOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search" size="small">搜索</el-button>
        <el-button type="primary" icon="el-icon-download" @click="exportData" size="small">导出</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData.dataList" stripe style="width: 100%">
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="fillTypeName" label="报名类型"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="phone1" label="手机"></el-table-column>
      <el-table-column prop="studentCode" label="学籍号"></el-table-column>
      <el-table-column prop="pwmark" label="中签状态"></el-table-column>
      <el-table-column prop="statusName" label="录取状态"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.sampleId)">详情</el-button>
          <!--<br/> <el-button v-if="(scope.row.status==56||scope.row.status==6)" type="text" size="small" @click="giveUp(scope.row.sampleId, scope.row)">放弃</el-button> -->
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
import { admissionTypeSelectEnum } from "@/utils/enum";
import studentInfo from "@/views/components/studentInfo";
import { downloadByForm } from "@/utils/index";

export default {
  name: "SchoolResult",
  components: {
    studentInfo
  },
  data() {
    return {
      queryParams: {
        searchKey: "",
        admissionType: 0,
        status: 0,
        pageIndex: 1,
        pageSize: 10
      },
      admissionTypeOptions: admissionTypeSelectEnum,
      statusOptions: [
        {
          name: "全部",
          id: 0
        },
        {
          name: "待派位",
          id: 57
        },
        {
          name: "派位未中签",
          id: 58
        },
        {
          name: "待缴费",
          id: 56
        },
        {
          name: "已缴费",
          id: 6
        },
        {
          name: "确认录取",
          id: 7
        // },
        // {
        //   name: "放弃学位",
        //   id: 8
        }
      ],
      tableData: { total: 0, dataList: [] },
      studentInfo: {
        sampleId: 0,
        dialogVisible: false
      },
      exportLoading: false
    };
  },
  computed: {},
  created() {},
  methods: {
    search() {
      this.queryParams.pageIndex = 1;
      this.handleQuery();
    },
    handleQuery() {
      this.$store
        .dispatch("GetAdmissionResultList", this.queryParams)
        .then(res => {
          this.tableData = res.data;
        });
    },
    detail(sampleId) {
      this.studentInfo = {
        sampleId: sampleId,
        dialogVisible: true
      };
    },
    giveUp(sampleId, row) {
      this.$confirm(`是否将“${row.studentName}”标记为已放弃学位？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("GiveUp", { sampleId }).then(res => {
            const payMessage = ["操作成功", "操作失败"];
            this.$message({
              type: res.status == 1 ? "success" : "error",
              message: payMessage[res.status - 1]
            });
            if (res.status == 1) {
              this.handleQuery();
            }
          });
        })
        .catch(() => {});
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    },
    exportData() {
      this.exportLoading = true;
      downloadByForm(`/school/exportAdmissionResultList`);
      const than = this;
      setTimeout(function() {
        than.exportLoading = false;
      }, 3000);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
