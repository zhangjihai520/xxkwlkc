<template>
  <div class="result-card">
    <el-card>
      <div slot="header" class="clearfix">
        <b>录取结果</b>
      </div>
      <ul class="desc">
        <li>
          报名资格：
          <el-tag>{{applyTypeName}}</el-tag>
        </li>
        <li>
          报名学校：
          <el-tag>{{schoolName}}</el-tag>
        </li>
        <li>
          当前状态：
          <el-tag type="success">{{statusName}}</el-tag>
          <el-button v-show="isShowPay" :loading="isLoading" type="primary" @click="confirmPay">确认缴费</el-button>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import { admissionStatusTextEnum, admissionStatusEnum } from "@/utils/enum";
export default {
  name: "StudentMatriculateResult",
  data() {
    return {
      isLoading: false,
      applyTypeId: 0,
      applyTypeName: "",
      schoolId: 0,
      schoolName: "",
      status: 1,
      paymentStatus: false
    };
  },
  computed: {
    statusName: function() {
      return admissionStatusTextEnum[this.status];
    },
    isShowPay: function() {
      return this.status == admissionStatusEnum.alreadyPayCost && this.paymentStatus;
    }
  },
  created() {
    this.getApplyResult();
  },
  methods: {
    getApplyResult() {
      this.$store.dispatch("GetApplyResult").then(res => {
        if(res.status==-1){
            this.$message.error("未查到您的报名信息");
        }else{
          this.applyTypeId = res.applyTypeId;
          this.applyTypeName = res.applyTypeName;
          this.schoolId = res.schoolId;
          this.schoolName = res.schoolName;
          this.status = res.status;
          this.paymentStatus = res.paymentStatus;
        }
      });
    },
    confirmPay() {
      this.isLoading = true;
      this.$store.dispatch("ConfirmPay").then(res => {
        if (res.status == 1) {
          this.$message.success("确认缴费成功");
        } else if (res.status == 3) {
          this.$message.error("缴费通道已关闭");
          this.isLoading = false;
        }else {
          this.$message.error("确认缴费失败");
          this.isLoading = false;
        }
        this.getApplyResult();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.result-card {
  width: 420px;
  margin: 0 auto;
  padding-top: 50px;
}
.desc {
  list-style: none;
  li {
    padding: 15px 0px;
  }
}
</style>
