<template>
  <div>
    <el-form ref="editPwd" :model="formData" :rules="rules" size="medium" label-width="150px" style="padding-top:10px;" >
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="formData.oldPwd" placeholder="请输入原密码" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pwd">
        <el-input v-model="formData.pwd" placeholder="请输入新密码" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="pwd2">
        <el-input v-model="formData.pwd2" placeholder="请再次输入新密码" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentEditPwd",
  data() {
    return {
      formData: {
        oldPwd: undefined,
        pwd: undefined,
        pwd2: undefined
      },
      rules: {
        oldPwd: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          }
        ],
        pwd2: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    submitForm() {
      this.$refs["editPwd"].validate(valid => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["editPwd"].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
</style>
