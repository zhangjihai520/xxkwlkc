<template>
  <div>
    <div class="el-steps el-steps--vertical">
      <div class="el-step is-vertical" style="flex-basis: 50%;">
        <div :class="'el-step__head '+ getClassByStep(1)">
          <div class="el-step__line" style="margin-right: 0px;">
            <i
              class="el-step__line-inner"
              style="transition-delay: 0ms; border-width: 0px; height: 0%;"
            ></i>
          </div>
          <div class="el-step__icon is-text">
            <div class="el-step__icon-inner">1</div>
          </div>
        </div>
        <div class="el-step__main">
          <div :class="'el-step__title '+ getClassByStep(1)">请选择报名资格</div>
          <div :class="'el-step__description '+ getClassByStep(1)">
            只能选择一种报名资格，各资格报名录取方式不一，请谨慎选择
            <div class="select">
              <el-radio-group
                v-model="selectApply.applyTypeId"
                :disabled="!isShowSubmit"
                @change="selectTypeChange"
              >
                <el-radio
                  v-for="(item, index) in applyTypeList"
                  :key="index"
                  :label="item.applyTypeId"
                  border
                >{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="el-step is-vertical" style="flex-basis: 50%;">
        <div :class="'el-step__head '+ getClassByStep(2)">
          <div class="el-step__line" style="margin-right: 0px;">
            <i
              class="el-step__line-inner"
              style="transition-delay: -150ms; border-width: 0px; height: 0%;"
            ></i>
          </div>
          <div class="el-step__icon is-text">
            <!---->
            <div class="el-step__icon-inner">2</div>
          </div>
        </div>
        <div class="el-step__main">
          <div :class="'el-step__title '+ getClassByStep(2)">选择报名学校</div>
          <div :class="'el-step__description '+ getClassByStep(2)">
            只能选择一所报名学校
            <div class="select">
              <el-select
                placeholder="请选择学校(可输入筛选)"
                filterable
                v-model="selectApply.schoolId"
                :disabled="!isShowSubmit"
                @change="selectSchoolChange"
              >
                <el-option
                  v-for="(item, index) in schoolList"
                  :key="index"
                  :label="item.name"
                  :value="parseInt(item.id)"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="el-step is-vertical is-flex" style="flex-basis: 50%;">
        <div :class="'el-step__head '+ getClassByStep(3)">
          <div class="el-step__line">
            <i class="el-step__line-inner"></i>
          </div>
          <div class="el-step__icon is-text">
            <!---->
            <div class="el-step__icon-inner">3</div>
          </div>
        </div>
        <div class="el-step__main">
          <div :class="'el-step__title '+ getClassByStep(3)">确认志愿学校</div>
          <div :class="'el-step__description desc '+ getClassByStep(3)">
            您选择的结果是：
            <span
              class="res"
            >{{selectApply.applyTypeName}}&nbsp;—&nbsp;{{selectApply.schoolName}}</span>
          </div>
        </div>
      </div>
      <div v-if="curStep>=4 && isShowValidationResult" class="el-step is-vertical is-flex" style="flex-basis: 50%;">
        <div :class="'el-step__head '+ getClassByStep(4)">
          <div class="el-step__line">
            <i class="el-step__line-inner"></i>
          </div>
          <div class="el-step__icon is-text">
            <!---->
            <div class="el-step__icon-inner">4</div>
          </div>
        </div>
        <div class="el-step__main">
          <div :class="'el-step__title '+ getClassByStep(4)">信息核查状态</div>
          <div :class="'el-step__description desc res '+ getClassByStep(4)">{{checkStatus}}</div>
        </div>
      </div>
    </div>
    <div style="text-align: center; padding-top: 20px;" v-if="isShowSubmit">
      <el-button
        :loading="isLoading"
        :disabled="isSubmit"
        type="primary"
        @click="submitApplySchool"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import { checkStatusSelectEnum, checkStatusEnum } from "@/utils/enum";
import { mapState } from "vuex";

export default {
  name: "StudentSelectSchool",
  data() {
    return {
      isLoading: false,
      curStep: 1,
      isShowSubmit: false, //是否可以修改
      selectApply: {
        applyTypeId: 0,
        applyTypeName: "",
        schoolId: undefined,
        schoolName: "",
        checkStatus: -1
      },
      applyTypeList: []
    };
  },
  computed: {
    ...mapState({
      isApplySchool: state => state.student.studentAccess.isApplySchool,
      isShowValidationResult: state =>
        state.student.studentAccess.isShowValidationResult
    }),
    schoolList: function() {
      var applyType = this.applyTypeList.find(
        a => a.applyTypeId == this.selectApply.applyTypeId
      );
      return applyType ? applyType.schoolList : [];
    },
    isSubmit: function() {
      return !(
        this.selectApply.applyTypeId > 0 && this.selectApply.schoolId > 0
      );
    },
    checkStatus: function() {
      const cs = checkStatusSelectEnum.find(
        c => c.id == this.selectApply.checkStatus
      );
      return cs ? cs.name : "无";
    }
  },
  watch: {},
  created() {
    this.getApplySchoolList();
  },
  methods: {
    getApplySchoolList() {
      this.$store.dispatch("GetApplySchoolList").then(res => {
        let { applyTypeList, selectApply } = res;
        //已提交过数据，不允许修改
        if (
          selectApply &&
          selectApply.applyTypeId > 0 &&
          selectApply.schoolId
        ) {
          let applyType = applyTypeList.find(
            a => a.applyTypeId == selectApply.applyTypeId
          );
          selectApply.applyTypeName = applyType.name;
          selectApply.schoolName = applyType.schoolList.find(
            s => s.id == selectApply.schoolId
          ).name;
          this.curStep =
            selectApply.checkStatus == checkStatusEnum.pass ||
            selectApply.checkStatus == checkStatusEnum.notPass
              ? 5
              : 4;
          this.isShowSubmit = false;
        } else {
          selectApply = {
            applyTypeId: 0,
            applyTypeName: "",
            schoolId: undefined,
            schoolName: "",
            checkStatus: -1
          };
          if (this.isShowValidationResult) {
            this.isShowSubmit = false;
            this.curStep = 5;
            selectApply.checkStatus = checkStatusEnum.notApply;
          } else {
            this.isShowSubmit = true;
          }
        }
        this.applyTypeList = applyTypeList;
        this.selectApply = selectApply;
      });
    },
    getClassByStep(step) {
      const { curStep } = this;
      if (step == curStep) {
        return "is-process";
      } else if (step < curStep) {
        return "is-finish";
      } else {
        return "is-wait";
      }
    },
    selectTypeChange: function(value) {
      let { selectApply } = this;
      if (value) {
        this.curStep = 2;
        selectApply.applyTypeId = value;
        selectApply.applyTypeName = this.applyTypeList.find(
          a => a.applyTypeId == value
        ).name;
      } else {
        this.curStep = 1;
        selectApply.applyTypeId = "";
        selectApply.applyTypeName = "";
      }
      selectApply.schoolId = undefined;
      selectApply.schoolName = "";
      this.selectApply = selectApply;
    },
    selectSchoolChange: function(value) {
      let { selectApply } = this;
      let item = this.schoolList.find(a => a.id == value);
      if (value && item) {
        this.curStep = 3;
        selectApply.schoolId = value;
        selectApply.schoolName = `${item.name}`;
      } else {
        this.curStep = 2;
        selectApply.schoolId = undefined;
        selectApply.schoolName = "";
      }
      this.selectApply = selectApply;
    },
    submitApplySchool: function() {
      this.$confirm(
        `您选择的是<b style="color:red">${this.selectApply.applyTypeName}&nbsp;—&nbsp;${this.selectApply.schoolName}</b><br/>提交后无法修改，是否继续?`,
        "提示",
        {
          dangerouslyUseHTMLString: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }
      ).then(
        () => {
          this.isLoading = true;
          this.$store
            .dispatch("SubmitApplySchool", this.selectApply)
            .then(res => {
              if (res.status == 1) {
                this.$message.success("已提交");
                this.isShowSubmit = false;
                this.curStep = 4;
              } else if(res.status == 3)
              {
                this.$message.error("报名通道已关闭");
                this.isShowSubmit = false;
              } else if(res.status == 4){
                this.$message.error("您只允许填报一所民办初中，请勿重复提交");
                this.isShowSubmit = false;
              }else {
                this.$message.error("提交失败");
                this.isLoading = false;
              }
            });
        },
        () => {}
      );
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.el-steps {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 40px;
  .el-step {
    .el-step__main {
      padding: 0 10px;
    }
  }
  .select {
    margin: 10px 0px;
    min-height: 56px;
    .el-select {
      width: 100%;
    }
  }
}
.el-radio {
  border-color: #1890ff;
}
.desc {
  padding: 10px 0 20px 0;
}
.res {
  color: red;
  font-size: 14px;
  font-weight: bold;
}
</style>
