<template>
  <div class="app-container">
    <el-form ref="importForm" :model="formData" :rules="rules" size="medium" label-width="150px">
      <el-form-item label="导入类型" prop="type">
        <el-radio-group v-model="formData.type" size="medium">
          <el-radio
            v-for="(item, index) in typeOptions"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传" prop="import" required>
        <el-upload
          ref="import"
          :file-list="importfileList"
          :action="importAction"
          :before-upload="importBeforeUpload"
          accept=".xls, .xlsx"
          :with-credentials="true"
          :headers="headers"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getHeaders } from "@/utils/auth";
export default {
  name: "InformationImport",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        school: undefined,
        type: undefined,
        import: null
      },
      rules: {
        school: [
          {
            required: true,
            message: "请选择学校",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "导入类型不能为空",
            trigger: "change"
          }
        ]
      },
      importAction: "https://jsonplaceholder.typicode.com/posts/",
      importfileList: [],
      schoolOptions: [
        {
          label: "选项一",
          value: 1
        },
        {
          label: "选项二",
          value: 2
        }
      ],
      typeOptions: [
        {
          label: "教职工子女",
          value: 1
        },
        {
          label: "楼盘生",
          value: 2
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
    submitForm() {
      this.$refs["importForm"].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["importForm"].resetFields();
    },
    importBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 20;
      if (!isRightSize) {
        this.$message.error("文件大小超过 20MB");
      }
      let isAccept = new RegExp(".xls,.xlsx").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择.xls,.xlsx类型的文件");
      }
      return isRightSize && isAccept;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-upload__tip {
  line-height: 1.2;
}
</style>
