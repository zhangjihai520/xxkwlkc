<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" :rules="rules">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="学籍系统账号" prop="userName">
            <el-input v-model="queryParams.userName" placeholder="请输入学籍系统账号" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="学籍系统密码" prop="password">
            <el-input type="password" v-model="queryParams.password" placeholder="请输入学籍系统密码" />
          </el-form-item>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="21">
          <el-button :loading="loading" type="primary" @click="submit">开始采集数据</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PrimarySchoolSchoolRoll",
  data() {
    return {
      loading: false,
      queryParams: {},
      rules: {
        userName: [
          {
            required: true,
            message: "请输入学籍系统账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: this.validateSelectNull,
            message: "请输入学籍系统密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    submit() {
      this.$refs["queryForm"].validate(valid => {
        if (!valid) return;
        this.loading = true;
        this.$store
          .dispatch("SubmitSchoolRollAccount", this.queryParams)
          .then(res => {
            if (res.status == 1) {
              this.$message.success("操作成功");
            }
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
