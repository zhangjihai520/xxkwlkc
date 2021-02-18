<template>
  <common-no-login>
    <el-main class="stu-main">
      <div class="stu-tip">
        <i class="el-icon-warning"></i>&nbsp;手机号用于接受信息通知，户籍所属派出所影响填报学校，请谨慎填写，提交后不可修改。
      </div>
      <el-row style="margin: 0 auto;">
        <el-form
          ref="registerForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="150px"
          label-position="top"
        >
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="formData.sex" size="medium">
                <el-radio
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.id"
                  :disabled="item.disabled"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="证件类型" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio :label="1">大陆身份证</el-radio>
                <el-radio :label="2">非大陆身份证</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学生身份证号" prop="identify">
              <el-input
                v-model="formData.identify"
                placeholder="请输入学生证件号码"
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="户籍所属派出所" prop="policeStationCode">
              <el-select
                :popper-append-to-body="false"
                v-model="formData.policeStationCode"
                placeholder="请选择户籍所属派出所"
                filterable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in policeIdOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="房产地址所在区" prop="districtId">
              <el-select
                :popper-append-to-body="false"
                v-model="formData.districtId"
                placeholder="请选择房产地址所在区"
                filterable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in houseIdOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="formData.phone"
                placeholder="请输入手机号"
                :maxlength="11"
                show-word-limit
                prefix-icon="el-icon-phone"
                :style="{width: '300px'}"
              ></el-input>
              <el-button
                size="small"
                :disabled="!isSendMessage"
                alt="请输入验证码"
                type="primary"
                @click="getPhoneCode"
              >{{!isSendMessage? `${codeTime}秒后可重发` : "获取短信验证码"}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="短信验证码" prop="code">
              <el-input v-model="formData.code" placeholder="请输入短信验证码" :style="{width: '150px'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm" :loading="isLoading">提交</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-main>
  </common-no-login>
</template>

<script>
import {
  sexSelectEnum,
  registerStatusEnum,
  sendMessageEnum
} from "@/utils/enum";
import Cookies from "js-cookie";
import CommonNoLogin from "./components/CommonNoLogin";
import { checkIDCard } from "@/utils/validate";

export default {
  name: "StudentRegister",
  components: {
    CommonNoLogin
  },
  data() {
    return {
      isLoading: false,
      codeTime: 0,
      formData: {
        name: "",
        sex: undefined,
        type: 1,
        identify: "",
        policeStationCode: 0,
        districtId: 0,
        phone: "",
        code: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "blur"
          }
        ],
        identify: [
          {
            required: true,
            message: "请输入证件号码",
            trigger: "blur"
          },
          {
            validator: this.validateIdentify,
            message: "请输入正确的身份证格式",
            trigger: "blur"
          },
          {
            validator: this.validateIdentifyYear,
            message: "请输入学生本人的身份证号",
            trigger: "blur"
          }
        ],
        policeStationCode: [
          {
            validator: this.validatePolice,
            message: "请选择 户籍所属派出所 或 房产地址所在区"
            // trigger: "change"
          }
        ],
        districtId: [
          {
            validator: this.validatePolice,
            message: "请选择 户籍所属派出所 或 房产地址所在区"
            // trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
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
            message: "请输入短信验证码",
            trigger: "blur"
          }
        ]
      },
      sexOptions: sexSelectEnum,
      policeIdOptions: [],
      houseIdOptions: []
    };
  },
  watch: {},
  computed: {
    isSendMessage: function() {
      return this.codeTime <= 0;
    }
  },
  created() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      const defaultOption = { id: 0, name: "请选择(可输入筛选)" };
      //派出所列表
      this.$store.dispatch("GetPoliceList").then(res => {
        res.policeList.splice(0, 0, defaultOption);
        this.policeIdOptions = res.policeList;
      });
      //房产所在地，区县列表
      this.$store.dispatch("GetDepartmentList").then(res => {
        res.departmentList.splice(0, 0, defaultOption);
        this.houseIdOptions = res.departmentList;
      });
    },
    validatePolice(rule, value, callback) {
      if (
        this.formData.policeStationCode == 0 &&
        this.formData.districtId == 0
      ) {
        callback(new Error());
      } else {
        callback();
      }
    },
    validateIdentify(rule, value, callback) {
      if (this.formData.type == 1) {
        if (!checkIDCard(value)) {
          callback(new Error());
        }
      }
      callback();
    },
    validateIdentifyYear(rule, value, callback) {
      if (this.formData.type == 1) {
        const year = parseInt(value.substring(6, 10));
        if (year < 2006 || year > 2010) {
          callback(new Error());
        }
      }
      callback();
    },
    getPhoneCode() {
      this.$refs["registerForm"].validateField("phone", valid => {
        if (valid && valid.length > 0) return;
        this.$store
          .dispatch("SendMessage", {
            phone: this.formData.phone,
            flag: sendMessageEnum.register
          })
          .then(res => {
            // if (res.status == 1) {
            const than = this;
            than.$message.success("短信发送成功，请注意查收");
            let defaultTime = 60;
            const si = setInterval(function() {
              defaultTime--;
              if (defaultTime <= 0) {
                clearInterval(si);
                than.codeTime = 0;
              } else {
                than.codeTime = defaultTime;
              }
            }, 1000);
            // }
          });
      });
    },
    /**
     * 提交表单
     */
    submitForm() {
      this.$refs["registerForm"].validate(valid => {
        if (!valid) return;
        this.studentRegister();
      });
    },
    studentRegister() {
      this.isLoading = true;
      this.$store.dispatch("StudentRegister", this.formData).then(res => {
        res = res.data;
        if (res.status == 1) {
          //注册成功，有效时间为1个小时
          let expires = new Date(new Date().getTime() + 60 * 60 * 1000);
          Cookies.set("sampleId", res.sampleId, { expires: expires });
          Cookies.set("pwd", res.pwd, { expires: expires });
          Cookies.set("auditOrgInfo", res.auditOrgInfo, { expires: expires });
          this.$router.push({ path: "/student/registerSuccess" });
        } else {
          this.$message.error(registerStatusEnum[res.status]);
          this.isLoading = false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.el-row {
  width: 650px;
}
.el-form-item {
  margin-bottom: 20px;
}

@media screen and (max-width: 700px) {
  .el-row {
    width: 98%;
  }
}

.code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-header {
  padding: 0;
  .logo {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .info {
    padding-top: 20px;
    text-align: right;
    line-height: 120%;
    font-size: 14px;
  }
}
</style>
