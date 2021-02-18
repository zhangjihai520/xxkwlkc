<template>
  <div class="app-container">
    <el-button :loading="exportLoading" type="primary" @click="exportData">导出需要校验户籍的学生</el-button>
  </div>
</template>
<script>
import { downloadByForm } from "@/utils/index";
export default {
  name: "ExportCensus",
  components: {},
  props: [],
  data() {
    return { exportLoading: false };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    exportData() {
      this.exportLoading = true;
      downloadByForm(`/manage/exportResidenceCheckData`);
      const than = this;
      setTimeout(function() {
        than.exportLoading = false;
      }, 3000);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
