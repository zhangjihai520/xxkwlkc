<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="importForm" :model="formData" :rules="rules" size="medium" label-width="150px">
      <el-form-item label="导入类型" prop="recruitType">
        <el-radio-group v-model="formData.recruitType" size="medium">
          <el-radio
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="item.value"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传" prop="file" required>
        <el-upload
          ref="upload"
          :action="importAction"
          :auto-upload="false"
          accept=".xls, .xlsx"
          :data="{'recruitType':formData.recruitType}"
          :on-error="errorUpload"
          :on-success="successUpload"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button size="small" slot="trigger">选择文件</el-button>
          <el-link
            target="_blank"
            type="primary"
            :underline="false"
            href="/template/recruitTemplate.xlsx"
          >下载模板</el-link>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" :loading="loading" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { recruitTypeEnum } from "@/utils/enum";
import { getHeaders } from "@/utils/auth";
export default {
  name: "ManageImportRecruitStudent",
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      formData: {
        recruitType: undefined,
        file: {}
      },
      rules: {
        recruitType: [
          {
            required: true,
            message: "请选择导入类型",
            trigger: "change"
          }
        ],
        file: [
          {
            required: true,
            validator: this.checkFile,
            message: "请选择导入文件",
            trigger: "change"
          }
        ]
      },
      importAction: `${
        process.env.VUE_APP_MOCK_API
          ? process.env.VUE_APP_MOCK_API
          : process.env.VUE_APP_BASE_API
      }/manage/importPrivilegeStudent`,
      typeOptions: [
        {
          label: "教职工子女",
          value: recruitTypeEnum.staff
        },
        {
          label: "楼盘生",
          value: recruitTypeEnum.build
        },
        {
          label: "补录生",
          value: recruitTypeEnum.supplement
        }
      ],
      headers: getHeaders()
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
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
    },
    submitForm() {
      this.$refs["importForm"].validate(valid => {
        if (!valid) return;
        this.loading = true;
        this.$refs.upload.submit();
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-upload__tip {
  line-height: 1.2;
}
</style>
