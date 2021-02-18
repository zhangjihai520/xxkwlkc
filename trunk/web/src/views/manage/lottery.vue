<template>
  <div class="app-container" v-loading="showLoading">
    <el-row :gutter="10">
      <el-col :span="1.5" v-show="tableData == 0">
        <el-button
          :loading="buildLoading"
          type="success"
          icon="el-icon-play"
          size="mini"
          @click="buildData"
        >开启民办派位摇号</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          :disabled="isDisabled(3)"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="exportData(3)"
        >导出直升超计划数学生清单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-upload
          :disabled="isDisabled(3)"
          ref="upload"
          :action="fileAction"
          :limit="1"
          accept=".xls, .xlsx"
          :show-file-list="false"
          :on-progress="progressUpload"
          :on-error="errorUpload"
          :on-success="successUpload"
          :data="{ 'schoolId': currentRow&&currentRow.schoolId, 'fillType': 3}"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button
            :disabled="isDisabled(3)"
            type="primary"
            icon="el-icon-upload"
            size="mini"
          >导入直升派位中签学生</el-button>
        </el-upload>
      </el-col>
      <el-col :span="1.5">
        <el-button
          :disabled="isDisabled(4)"
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="exportData(4)"
        >导出校外派位超计划数学生清单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-upload
          :disabled="isDisabled(4)"
          ref="upload"
          :action="fileAction"
          :limit="1"
          accept=".xls, .xlsx"
          :show-file-list="false"
          :on-progress="progressUpload"
          :on-error="errorUpload"
          :on-success="successUpload"
          :data="{ 'schoolId': currentRow&&currentRow.schoolId, 'fillType': 4}"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button
            :disabled="isDisabled(4)"
            type="primary"
            icon="el-icon-upload"
            size="mini"
          >导入校外派位中签学生</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="选择">
        <template slot-scope="scope">
          <el-radio v-model="isSelect" :label="scope.row.schoolId">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="schoolCode" label="学校代码"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称"></el-table-column>
      <el-table-column prop="straightupRecruitCount" label="直升计划数"></el-table-column>
      <el-table-column prop="straightupFillCount" label="直升报名数">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            v-if="scope.row.straightupRecruitCount < scope.row.straightupFillCount"
          >{{scope.row.straightupFillCount}}</el-tag>
          <el-tag type="success" v-else>{{scope.row.straightupFillCount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="publicRecruitCount" label="校外计划数">
        <template slot-scope="scope">
          <template v-if="scope.row.otherRecruitCount>0">
          {{`${scope.row.publicRecruitCount}(含直升剩余${scope.row.otherRecruitCount}人)`}}
          </template>
          <template v-else>
            {{`${scope.row.publicRecruitCount}`}}
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="publicFillCount" label="校外报名数">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            v-if="scope.row.publicRecruitCount < scope.row.publicFillCount"
          >{{scope.row.publicFillCount}}</el-tag>
          <el-tag type="success" v-else>{{scope.row.publicFillCount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="importTime" label="导入时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { downloadByForm } from "@/utils/index";
import { recruitTypeEnum } from "@/utils/enum";
import { getHeaders } from "@/utils/auth";
export default {
  name: "ManageLottery",
  components: {},
  props: [],
  data() {
    return {
      tableData: [],
      currentRow: null,
      buildLoading: false,
      showLoading: false,
      isSelect: 0,
      formData: { file: {} },
      rules: {
        file: [
          {
            required: true,
            validator: this.checkFile,
            message: "请选择导入文件",
            trigger: "change"
          }
        ]
      },
      fileAction: `${
        process.env.VUE_APP_MOCK_API
          ? process.env.VUE_APP_MOCK_API
          : process.env.VUE_APP_BASE_API
      }/manage/importAllocateResult`,
      headers: getHeaders()
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getSchoolList();
  },
  mounted() {},
  methods: {
    buildData() {
      this.buildLoading = true;
      this.$store.dispatch("GenToBeAllocateData").then(res => {
        if (res.status == 1) {
          this.$message.success("生成成功");
          this.getSchoolList();
        }else if(res.status == 3) {
          this.$message.success("请填报时间结束后再生成");
        }else if(res.status == 4) {
          this.$message.success("学校招生计划为空");
        } else if(res.status == 5) {
          this.$message.success("待处理的学生报名数据为空");
        }else {
          this.$message.error("生成失败");
        }
        this.buildLoading = false;
      });
    },
    getSchoolList() {
      this.$store.dispatch("GetSchoolFillSummaryList").then(res => {
        this.tableData = res.data;
      });
    },
    isDisabled(type) {
      const row = this.currentRow;
      if (row != null) {
        if (type == recruitTypeEnum.straightup) {
          return row.straightupRecruitCount >= row.straightupFillCount;
        }
        if (type == recruitTypeEnum.public) {
          return row.publicRecruitCount >= row.publicFillCount;
        }
      }
      return true;
      // return false;
    },
    exportData(type) {
      this.showLoading = true;
      downloadByForm(`/manage/exportToBeAllocateData`, {
        schoolId: this.currentRow.schoolId,
        fillType: type
      });
      const than = this;
      setTimeout(function() {
        than.showLoading = false;
      }, 3000);
    },
    progressUpload() {
      this.showLoading = true;
    },
    successUpload(response, file, fileList) {
      this.showLoading = false;
      this.$alert(response.msg, "导入信息", {
        dangerouslyUseHTMLString: true,
        customClass: "importbox-msg"
      });
      this.$refs.upload.clearFiles();
    },
    errorUpload(response, file, fileList) {
      this.showLoading = false;
      this.$message.error("导入失败");
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.isSelect = val.schoolId;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
  margin: 10px 0;
}
.el-col {
  margin: 10px 0;
}
</style>
