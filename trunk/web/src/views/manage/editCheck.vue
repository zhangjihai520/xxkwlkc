<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" :rules="rules">
      <el-form-item label="学生" prop="searchKey">
        <el-input
          style="width:240px;"
          v-model="queryParams.searchKey"
          size="small"
          placeholder="请输入采集序号/学籍号/学生姓名"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="schoolName" label="学校"></el-table-column>
      <el-table-column prop="className" width="80" label="班级"></el-table-column>
      <el-table-column prop="sampleId" label="采集序号"></el-table-column>
      <el-table-column prop="studentName" label="姓名"></el-table-column>
      <el-table-column prop="sex" width="50" label="性别"></el-table-column>
      <el-table-column label="学籍核验">
        <template
          slot-scope="scope"
        >{{getStatusText(scope.row.studentCodeCheckStatus, scope.row.studentCodeDistrictName)}}</template>
      </el-table-column>
      <el-table-column label="户籍核验">
        <template
          slot-scope="scope"
        >{{getStatusText(scope.row.residenceCheckStatus, scope.row.residenceDistrictName)}}</template>
      </el-table-column>
      <el-table-column label="房产核验">
        <template
          slot-scope="scope"
        >{{getStatusText(scope.row.houseCheckStatus, scope.row.hourseDistrictName)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.sampleId)">详情</el-button>
          <el-button
            :disabled="isCurrentEdit(scope.row)"
            type="text"
            size="small"
            @click="edit(scope.row)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <student-info :studentInfo="studentInfo" @close="studentInfo.dialogVisible=false" />

    <el-dialog title="修改核验结果" :visible="editVisible" width="500px" @close="editVisible = false">
      <el-form :model="editInfo" ref="editInfoForm" :inline="true" :rules="editInfoRules">
        <template v-if="editInfo.isShowStudentCode">
          <el-form-item label="学籍核验" prop="studentCodeDepartmentId">
            <el-radio-group v-model="editInfo.studentCodeCheckStatus" size="medium">
              <el-radio
                v-for="item in checkStatusRadios"
                :key="item.id"
                :label="item.id"
                :disabled="item.disabled"
              >{{item.name}}</el-radio>
            </el-radio-group>
            <el-select
              :disabled="changeDepartment(editInfo.studentCodeCheckStatus)"
              v-model="editInfo.studentCodeDepartmentId"
              placeholder="请选择归属区域"
              filterable
            >
              <el-option
                v-for="(item, index) in departmentOptions"
                :key="index"
                :label="item.name"
                :value="parseInt(item.id)"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-if="editInfo.isShowResidence">
          <el-form-item label="户籍核验" prop="residenceDepartmentId">
            <el-radio-group v-model="editInfo.residenceCheckStatus" size="medium">
              <el-radio
                v-for="item in checkStatusRadios"
                :key="item.id"
                :label="item.id"
                :disabled="item.disabled"
              >{{item.name}}</el-radio>
            </el-radio-group>
            <el-select
              :disabled="changeDepartment(editInfo.residenceCheckStatus)"
              v-model="editInfo.residenceDepartmentId"
              placeholder="请选择归属区域"
              filterable
            >
              <el-option
                v-for="(item, index) in departmentOptions"
                :key="index"
                :label="item.name"
                :value="parseInt(item.id)"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-if="editInfo.isShowHouse">
          <el-form-item label="房产核验" prop="houseDepartmentId">
            <el-radio-group v-model="editInfo.houseCheckStatus" size="medium">
              <el-radio
                v-for="item in checkStatusRadios"
                :key="item.id"
                :label="item.id"
                :disabled="item.disabled"
              >{{item.name}}</el-radio>
            </el-radio-group>
            <el-select
              :disabled="changeDepartment(editInfo.houseCheckStatus)"
              v-model="editInfo.houseDepartmentId"
              placeholder="请选择归属区域"
              filterable
            >
              <el-option
                v-for="(item, index) in departmentOptions"
                :key="index"
                :label="item.name"
                :value="parseInt(item.id)"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" size="small">关闭</el-button>
        <el-button type="primary" @click="submitCheckStatus" size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import studentInfo from "@/views/components/studentInfo";
import { checkStatusEnum, checkStatusSelectEnum } from "@/utils/enum";
export default {
  name: "ManageEditCheck",
  components: {
    studentInfo
  },
  data() {
    return {
      queryParams: {
        searchKey: ""
      },
      studentInfo: {
        sampleId: 0,
        dialogVisible: false
      },
      editVisible: false,
      tableData: [],
      rules: {
        searchKey: [
          {
            required: true,
            message: "请输入采集序号/学籍号/学生姓名",
            trigger: "blur"
          },
          {
            min: 2,
            message: "最少输入2个字符",
            trigger: "blur"
          }
        ]
      },
      departmentOptions: [],
      checkStatusRadios: [],
      editInfo: {
        sampleId: 0,
        isShowStudentCode: false,
        studentCodeCheckStatus: 1,
        studentCodeDepartmentId: 0,
        isShowResidence: false,
        residenceCheckStatus: 1,
        residenceDepartmentId: 0,
        isShowHouse: false,
        houseCheckStatus: 1,
        houseDepartmentId: 0
      },
      editInfoRules: {
        studentCodeDepartmentId: [
          {
            validator: this.checkStudentCodeDepartmentId,
            message: "请选择归属区域",
            trigger: "change"
          }
        ],
        residenceDepartmentId: [
          {
            validator: this.checkResidenceDepartmentId,
            message: "请选择归属区域",
            trigger: "change"
          }
        ],
        houseDepartmentId: [
          {
            validator: this.checkHouseDepartmentId,
            message: "请选择归属区域",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},
  created() {
    const defaultSearchOption = { id: 0, name: "请选择(可输入筛选)" };
    //房产所在地，区县列表
    this.$store.dispatch("GetDepartmentList").then(res => {
      this.departmentOptions = res.departmentList;
      this.departmentOptions &&
        this.departmentOptions.splice(0, 0, defaultSearchOption);
    });
    const checkStatusRadios = [];
    checkStatusSelectEnum.map(status => {
      checkStatusRadios.push({
        ...status,
        disabled: status.id != checkStatusEnum.pass
      });
    });
    this.checkStatusRadios = checkStatusRadios;
  },
  methods: {
    getStatusText(status, districtName) {
      const item = checkStatusSelectEnum.find(c => c.id == status);
      const text =
        (item ? item.name : "") +
        (districtName ? `，${districtName}` : "");
      return text;
    },
    changeDepartment(status) {
      return status != checkStatusEnum.pass;
    },
    isCurrentEdit(row) {
      return (
        row.studentCodeCheckStatus != checkStatusEnum.notPass &&
        row.residenceCheckStatus != checkStatusEnum.notPass &&
        row.houseCheckStatus != checkStatusEnum.notPass &&
        row.isEdit != 1
      );
    },
    handleQuery() {
      this.$refs["queryForm"].validate(valid => {
        if (!valid) return;
        this.$store
          .dispatch("GetVerifyFailStudentList", this.queryParams)
          .then(res => {
            this.tableData = res.data;
          });
      });
    },
    resetQuery() {
      this.$refs["queryForm"].resetFields();
    },
    detail(sampleId) {
      this.studentInfo = {
        sampleId: sampleId,
        dialogVisible: true
      };
    },
    checkStudentCodeDepartmentId(rule, value, callback) {
      if (this.editInfo.studentCodeCheckStatus == checkStatusEnum.pass) {
        if (value == 0) {
          callback(new Error());
          return;
        }
      }
      callback();
    },
    checkResidenceDepartmentId(rule, value, callback) {
      if (this.editInfo.residenceCheckStatus == checkStatusEnum.pass) {
        if (value == 0) {
          callback(new Error());
          return;
        }
      }
      callback();
    },
    checkHouseDepartmentId(rule, value, callback) {
      if (this.editInfo.houseCheckStatus == checkStatusEnum.pass) {
        if (value == 0) {
          callback(new Error());
          return;
        }
      }
      callback();
    },
    edit(row) {
      this.editVisible = true;
      this.editInfo = {
        sampleId: row.sampleId,
        isShowStudentCode:
          row.studentCodeCheckStatus == checkStatusEnum.notPass,
        studentCodeCheckStatus: row.studentCodeCheckStatus,
        studentCodeDepartmentId: 0,
        isShowResidence: row.residenceCheckStatus == checkStatusEnum.notPass,
        residenceCheckStatus: row.residenceCheckStatus,
        residenceDepartmentId: 0,
        isShowHouse: row.houseCheckStatus == checkStatusEnum.notPass,
        houseCheckStatus: row.houseCheckStatus,
        houseDepartmentId: 0
      };
    },
    submitCheckStatus() {
      this.$refs["editInfoForm"].validate(valid => {
        if (!valid) return;
        const { editInfo } = this;
        let submitInfo = [];
        if (
          editInfo.studentCodeCheckStatus == checkStatusEnum.pass &&
          editInfo.studentCodeDepartmentId != 0
        ) {
          submitInfo.push({
            type: 1,
            departmentId: editInfo.studentCodeDepartmentId
          });
        }
        if (
          editInfo.residenceCheckStatus == checkStatusEnum.pass &&
          editInfo.residenceDepartmentId != 0
        ) {
          submitInfo.push({
            type: 2,
            departmentId: editInfo.residenceDepartmentId
          });
        }
        if (
          editInfo.houseCheckStatus == checkStatusEnum.pass &&
          editInfo.houseDepartmentId != 0
        ) {
          submitInfo.push({
            type: 3,
            departmentId: editInfo.houseDepartmentId
          });
        }
        if (submitInfo.length > 0) {
          this.$store
            .dispatch("EditStudentVerifyResults", {
              sampleId: editInfo.sampleId,
              changeObj: submitInfo
            })
            .then(res => {
              if (res.status == 1) {
                this.$message.success("修改成功");
                this.editVisible = false;
                this.handleQuery();
              } else {
                this.$message.error("修改失败");
              }
            });
        } else {
          this.$message.info("没有修改为核验通过的内容，不予提交");
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
