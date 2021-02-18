<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="switchForm" :model="formData" :rules="rules" size="medium" label-width="150px">
      <el-form-item label="采集注册时间段" prop="collectInfoBegintime">
        <el-date-picker type="datetime"
          v-model="formData.collectInfoBegintime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="1px" label prop="collectInfoEndtime">
        <el-date-picker type="datetime"
          v-model="formData.collectInfoEndtime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-tag type="success">未开始</el-tag>
      <el-tag type="warning">已过期</el-tag>-->
      <br />
      <el-form-item label="志愿填报时间段" prop="targetFillBegintime">
        <el-date-picker type="datetime"
          v-model="formData.targetFillBegintime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="1px" label prop="targetFillEndtime">
        <el-date-picker type="datetime"
          v-model="formData.targetFillEndtime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="查看核验结果时间段" prop="showValidationResultBegintime">
        <el-date-picker type="datetime"
          v-model="formData.showValidationResultBegintime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="1px" label prop="showValidationResultEndtime">
        <el-date-picker type="datetime"
          v-model="formData.showValidationResultEndtime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="查询结果时间段" prop="searchResultBegintime">
        <el-date-picker type="datetime"
          v-model="formData.searchResultBegintime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="1px" label prop="searchResultEndtime">
        <el-date-picker type="datetime"
          v-model="formData.searchResultEndtime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item label="学校缴费时间段" prop="payBegintime">
        <el-date-picker type="datetime"
          v-model="formData.payBegintime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="1px" label prop="payEndtime">
        <el-date-picker type="datetime"
          v-model="formData.payEndtime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :style="{width: '220px'}"
          placeholder="请选择结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <br />
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "ManageSwitch",
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      formData: {
        collectInfoBegintime: null,
        collectInfoEndtime: null,
        targetFillBegintime: null,
        targetFillEndtime: null,
        showValidationResultBegintime: null,
        showValidationResultEndtime: null,
        searchResultBegintime: null,
        searchResultEndtime: null,
        payBegintime: null,
        payEndtime: null
      },
      rules: {
        collectInfoBegintime: [
          {
            required: true,
            message: "请选择信息采集开始时间",
            trigger: "change"
          }
        ],
        collectInfoEndtime: [
          {
            required: true,
            message: "请选择信息采集结束时间",
            trigger: "change"
          }
        ],
        showValidationResultBegintime: [
          {
            required: true,
            message: "请选择查看核验结果开始时间",
            trigger: "change"
          }
        ],
        showValidationResultEndtime: [
          {
            required: true,
            message: "请选择查看核验结果结束时间",
            trigger: "change"
          }
        ],
        targetFillBegintime: [
          {
            required: true,
            message: "请选择志愿填报开始时间",
            trigger: "change"
          }
        ],
        targetFillEndtime: [
          {
            required: true,
            message: "请选择志愿填报结束时间",
            trigger: "change"
          }
        ],
        searchResultBegintime: [
          {
            required: true,
            message: "请选择查询结果开始时间",
            trigger: "change"
          }
        ],
        searchResultEndtime: [
          {
            required: true,
            message: "请选择查询结果结束时间",
            trigger: "change"
          }
        ],
        payBegintime: [
          {
            required: true,
            message: "请选择学校缴费开始时间",
            trigger: "change"
          }
        ],
        payEndtime: [
          {
            required: true,
            message: "请选择学校缴费结束时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.$store.dispatch("GtAccessConfig").then(res => {
      this.formData = res.data;
    });
  },
  mounted() {},
  methods: {
    checkDataRange(start, end) {},
    submitForm() {
      this.$refs["switchForm"].validate(valid => {
        if (!valid) return;
        this.$store.dispatch("SaveAccessConfig", this.formData).then(res => {
          if (res.status == 1) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
          }
        });
      });
    },
    resetForm() {
      this.$refs["switchForm"].resetFields();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  display: inline-block;
}
</style>
