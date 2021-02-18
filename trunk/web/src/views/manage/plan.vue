<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="importForm" :inline="true">
      <el-form-item>
        <el-button @click="getData">刷新列表</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :action="fileAction"
          :limit="1"
          accept=".xls, .xlsx"
          :on-error="errorUpload"
          :on-success="successUpload"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button :loading="loading" slot="trigger" type="primary">导入招生计划</el-button>
          <el-link
            target="_blank"
            type="primary"
            :underline="false"
            href="/template/planTemplate.xlsx"
          >下载模板</el-link>
        </el-upload>
      </el-form-item>
    </el-form>
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
import { getHeaders } from "@/utils/auth";

export default {
  name: "ManagePlan",
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      tableData: [],
      fileAction: `${
        process.env.VUE_APP_MOCK_API
          ? process.env.VUE_APP_MOCK_API
          : process.env.VUE_APP_BASE_API
      }/manage/importPlan`,
      headers: getHeaders()
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      this.$store.dispatch("GetPlanList").then(res => {
        this.tableData = res.data;
      });
    },
    checkFile(rule, value, callback) {
      const upload = this.$refs.upload;
      const count = upload.uploadFiles.filter(u => u.status == "ready").length;
      if (count == 0) {
        callback(new Error());
      } else {
        this.formData.file = upload.uploadFiles;
        callback();
      }
    },
    successUpload(response, file, fileList) {
      this.loading = false;
      this.$alert(response.msg, "导入信息", {
        dangerouslyUseHTMLString: true,
        customClass: "importbox-msg"
      });
      this.$refs.upload.clearFiles();
    },
    errorUpload(response, file, fileList) {
      this.$message.error("导入失败");
      this.loading = false;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
