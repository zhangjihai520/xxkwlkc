<template>
  <div>
    <div class="stu-tip">
      <i class="el-icon-warning"></i>&nbsp;手机号用于忘记密码及接受信息通知，请谨慎填写。
    </div>
    <el-form
      ref="editPwd"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="150px"
      style="padding-top:10px;"
    >
      <el-form-item label="原手机" prop="oldPhone">
        <el-input v-model="formData.oldPhone" placeholder="请输入原手机" :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="新手机" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入新手机" :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新手机" prop="phone2">
        <el-input v-model="formData.phone2" placeholder="请再次输入新手机" :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入验证码" :style="{width: '50%'}"></el-input>
        <div class="code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
export default {
  name: "StudentEditPhone",
  data() {
    return {
      codeUrl: "",
      formData: {
        oldPhone: undefined,
        phone: undefined,
        phone2: undefined,
        code: undefined,
        uuid: ""
      },
      rules: {
        oldPhone: [
          {
            required: true,
            message: "请输入原手机",
            trigger: "blur"
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入新手机",
            trigger: "blur"
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        phone2: [
          {
            required: true,
            message: "请再次输入新手机",
            trigger: "blur"
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.formData.uuid = res.uuid;
      });
    },
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
.code {
  display: inline-block;
  margin-left: 10px;
  height: 38px;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
