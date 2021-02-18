<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <el-form-item label="学校" prop="schoolId">
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-handleQuery" @click="handleQuery" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery" size="small">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="schoolCode" label="学校代码"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称" :width="200"></el-table-column>
      <el-table-column prop="departmentName" label="管辖区域"></el-table-column>
      <el-table-column prop="planTotal" label="计划招生总数"></el-table-column>
      <el-table-column prop="staffFillCount" label="教职工子女报名数"></el-table-column>
      <el-table-column prop="straightupFillCount" label="直升报名数"></el-table-column>
      <el-table-column prop="publicFillCount" label="校外招生报名数"></el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showDetail(scope.row.schoolId)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="学校报名详情" :visible="dialogVisible" width="80%" @close="dialogVisible=false">
      <el-form :model="detailParams" ref="detailForm" :inline="true">
        <el-form-item label="学生" prop="searchKey">
          <el-input
            style="width:240px;"
            v-model="detailParams.searchKey"
            size="small"
            placeholder="请输入采集序号/学籍号/学生姓名"
            @keyup.enter.native="searchDetail"
          />
        </el-form-item>
        <el-form-item label="报名类型" prop="fillType">
          <el-select v-model="detailParams.fillType" size="small" placeholder="报名类型">
            <el-option
              v-for="dict in recruitTypeData"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchDetail" size="small">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetQueryDetail" size="small">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="detailData.dataList" stripe style="width: 100%">
        <el-table-column prop="sampleId" label="采集序号"></el-table-column>
        <el-table-column prop="fillTypeName" label="报名类型"></el-table-column>
        <el-table-column prop="studentName" label="姓名" :width="90"></el-table-column>
        <el-table-column prop="sex" label="性别" :width="60"></el-table-column>
        <el-table-column prop="studentCode" label="学籍号"></el-table-column>
        <!-- <el-table-column prop="national" label="民族" :width="60"></el-table-column> -->
        <!-- <el-table-column prop="policeStation" label="户口所属派出所"></el-table-column> -->
        <el-table-column prop="houseDistrict" label="房产地址所在区"></el-table-column>
      </el-table>

      <pagination
        v-show="detailData.total>0"
        :total="detailData.total"
        :page.sync="detailParams.pageIndex"
        :limit.sync="detailParams.pageSize"
        @pagination="handleQueryDetail"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { recruitTypeSelectEnum } from "@/utils/enum";
export default {
  name: "RecruitApply",
  data() {
    return {
      queryParams: { schoolId: 0 },
      dialogVisible: false,
      tableData: [],
      schoolOptions: [],
      detailParams: {
        schoolId: 0,
        searchKey: "",
        fillType: 0,
        pageIndex: 1,
        pageSize: 10
      },
      recruitTypeData: recruitTypeSelectEnum,
      detailData: { total: 0, dataList: [] }
    };
  },
  computed: {},
  created() {
    const defaultSearchOption = { id: 0, name: "请选择(可输入筛选)" };
    //学校
    this.$store.dispatch("GetSchoolList").then(res => {
      this.schoolOptions = res.schoolList;
      this.schoolOptions &&
        this.schoolOptions.splice(0, 0, defaultSearchOption);
    });
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      this.$store.dispatch("GetFillSummaryList", this.queryParams).then(res => {
        this.tableData = res.data;
      });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    },
    showDetail(schoolId) {
      this.detailParams = {
        schoolId: schoolId,
        searchKey: "",
        fillType: 0,
        pageIndex: 1,
        pageSize: 10
      };
      this.searchDetail();
      this.dialogVisible = true;
    },
    searchDetail() {
      this.detailParams.pageIndex = 1;
      this.handleQueryDetail();
    },
    handleQueryDetail() {
      this.$store
        .dispatch("GetFillListBySchoolId", this.detailParams)
        .then(res => {
          this.detailData = res.data;
        });
    },
    resetQueryDetail() {
      this.$refs["detailForm"].resetFields();
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
