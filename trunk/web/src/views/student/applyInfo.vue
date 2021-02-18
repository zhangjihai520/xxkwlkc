<template>
  <div>
    <div class="stu-tip">
      <i class="el-icon-warning"></i>&nbsp;资料填报是招生录取的重要一环，请认真填写核对各项资料。
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息" :stretch="true">
        <el-row :gutter="10">
          <!-- 基本信息 -->
          <el-col :span="12" :xs="24" class="colinfo">
            <label>采集序号</label>
            {{applyInfo.sampleId}}
          </el-col>
          <el-col :span="12" :xs="24" class="colinfo">
            <label>身份证号</label>
            {{applyInfo.identify}}
          </el-col>
          <el-col :span="12" :xs="24" class="colinfo">
            <label>姓名</label>
            {{applyInfo.name}}
          </el-col>
          <el-col :span="12" :xs="24" class="colinfo">
            <label>性别</label>
            {{sexText}}
          </el-col>
          <!-- 填写信息 -->
          <el-form
            ref="baseInfoForm"
            :model="applyInfo"
            :rules="baseInfoRules"
            size="medium"
            label-width="100px"
            :disabled="isFromCityBool"
          >
            <el-col :span="24">
              <el-form-item label="学籍号" prop="studentCode">
                <el-input v-model="applyInfo.studentCode" placeholder="请输入学籍号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="毕业学校" prop="schoolId">
                <el-select
                  v-model="applyInfo.schoolId"
                  placeholder="请选择毕业学校"
                  filterable
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="(item, index) in schoolOptions"
                    :key="index"
                    :label="item.name"
                    :value="parseInt(item.id)"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="班级" prop="className">
                <el-input-number v-model="applyInfo.className" :min="1" label="班级"></el-input-number>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="曾用名" prop="nameother">
                <el-input v-model="applyInfo.nameother" placeholder="请输入曾用名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族" prop="nationId">
                <el-select v-model="applyInfo.nationId" placeholder="请选择(可输入筛选)" filterable>
                  <el-option
                    v-for="(item, index) in nationOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="24">
              <el-form-item label="照片" prop="photo">
                <el-upload
                  class="avatar-uploader"
                  ref="photo"
                  :action="pictureAction"
                  :show-file-list="false"
                  accept="image/*"
                  :on-success="handlePictureSuccess"
                  :before-upload="pictureBeforeUpload"
                  :with-credentials="true"
                  :headers="headers"
                >
                  <img v-if="applyInfo.photo" :src="applyInfo.photo" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="!isFromCityBool">
              <el-form-item size="large">
                <el-button :loading="isLoading" @click="submitBaseInfoForm">保存</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitAllInfoCheck">信息预览</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="家庭信息">
        <el-form
          ref="familyInfoForm"
          :model="applyInfo"
          :rules="familyRules"
          size="medium"
          label-width="80px"
          :disabled="isFromCityBool"
        >
          <el-row :gutter="10">
            <el-col :span="12" :xs="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  监护人
                  <b>父亲</b>
                </div>
                <el-form-item label="姓名" prop="parentName1">
                  <el-input v-model="applyInfo.parentName1" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="parentIdentify1">
                  <el-input v-model="applyInfo.parentIdentify1" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="parentTelephone1">
                  <el-input v-model="applyInfo.parentTelephone1" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <!-- <el-form-item label="工作单位" prop="parentWorkunit1">
                  <el-input v-model="applyInfo.parentWorkunit1" placeholder="请输入工作单位"></el-input>
                </el-form-item>-->
              </el-card>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  监护人
                  <b>母亲</b>
                </div>
                <el-form-item label="姓名" prop="parentName2">
                  <el-input v-model="applyInfo.parentName2" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="parentIdentify2">
                  <el-input v-model="applyInfo.parentIdentify2" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="parentTelephone2">
                  <el-input v-model="applyInfo.parentTelephone2" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <!-- <el-form-item label="工作单位" prop="parentWorkunit2">
                  <el-input v-model="applyInfo.parentWorkunit2" placeholder="请输入工作单位"></el-input>
                </el-form-item>-->
              </el-card>
            </el-col>
            <el-col :span="24" v-if="!isFromCityBool">
              <el-form-item size="large" class="next">
                <el-button :loading="isLoading" @click="submitFamilyInfoForm">保存</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitAllInfoCheck">信息预览</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="户口信息">
        <el-form
          ref="residenceInfoForm"
          :model="applyInfo"
          :rules="residenceRules"
          size="medium"
          label-width="100px"
          :disabled="isFromCityBool"
        >
          <el-col :span="24">
            <el-form-item label="户口本地址" prop="residenceAddress">
              <el-input v-model="applyInfo.residenceAddress" placeholder="请输入户口本地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="所属派出所" prop="policeStationCode">
              <el-select
                disabled
                v-model="applyInfo.policeStationCode"
                placeholder="请选择所属派出所"
                filterable
              >
                <el-option
                  v-for="(item, index) in policeOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="与学生关系" prop="residenceReleation">
              <el-select
                v-model="applyInfo.residenceReleation"
                placeholder="请选择与学生关系"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="(item, index) in residencereleationOptions"
                  :key="index"
                  :label="item.name"
                  :value="parseInt(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large" v-if="!isFromCityBool">
              <el-button :loading="isLoading" @click="submitResidenceInfoForm">保存</el-button>
              <el-button type="primary" :loading="isLoading" @click="submitAllInfoCheck">信息预览</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="房产信息">
        <el-row :gutter="10">
          <el-form
            ref="houseInfoForm"
            :model="applyInfo"
            :rules="houseRules"
            size="medium"
            label-width="130px"
          >
            <el-col :span="24">
              <el-form-item label="是否有房产" prop="isHouse">
                <el-radio-group v-model="applyInfo.isHouse" size="medium" @change="isHouseChange">
                  <el-radio :label="1">有房产</el-radio>
                  <el-radio :label="0">无房管部门备案登记房产（放弃房产资格）</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="房产地址所在区" prop="districtId">
                <el-select
                  :disabled="isNotHouse"
                  v-model="applyInfo.districtId"
                  placeholder="请选择房产地址所在区"
                  filterable
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="(item, index) in departmentOptions"
                    :key="index"
                    :label="item.name"
                    :value="parseInt(item.id)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="房产来源" prop="houseType">
                <el-select v-model="applyInfo.houseType" placeholder="请选择房产来源">
                  <el-option
                    v-for="(item, index) in sourceOptions"
                    :key="index"
                    :label="item.name"
                    :value="parseInt(item.id)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="12" :xs="24">
              <el-form-item label="房产编号" prop="houseCode">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseCode"
                  placeholder="请输入房产编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="产权人姓名" prop="houseOwnerName">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseOwnerName"
                  placeholder="请输入产权人姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="产权人身份证" prop="houseOwnerIdentify">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseOwnerIdentify"
                  placeholder="请输入产权人身份证"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="建筑面积(平方米)" prop="houseSize">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseSize"
                  @change="houseSizeChange"
                  placeholder="请输入建筑面积(平方米)"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="规划用途" prop="houseUse">
                <el-radio-group
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseUse"
                  size="medium"
                  style="padding: 1px 0"
                >
                  <el-radio
                    v-for="(item, index) in planUseOptions"
                    :key="index"
                    :label="parseInt(item.id)"
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="登记时间" prop="houseTime">
                <el-date-picker
                  type="date"
                  v-model="applyInfo.houseTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择登记时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>-->
            <el-col :span="12" :xs="24">
              <el-form-item label="共有人姓名" prop="houseCoowner">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseCoowner"
                  placeholder="请输入共有人姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="房产证地址" prop="houseAddress">
                <el-input
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseAddress"
                  placeholder="请输入房产证地址"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="房产依据" prop="houseCertify">
                <el-select v-model="applyInfo.houseCertify" placeholder="请输入房产依据">
                  <el-option
                    v-for="(item, index) in housecertifyOptions"
                    :key="index"
                    :label="item.name"
                    :value="parseInt(item.id)"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="24">
              <el-form-item label="房屋查询码" prop="houseSearchCode">
                <el-input
                  style="width:180px;"
                  :disabled="isNotHouse"
                  v-model="applyInfo.houseSearchCode"
                  placeholder="请输入房屋查询码"
                ></el-input>
                <span class="red">城区房产请必填房屋查询码</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-link
                class="selectlink"
                type="primary"
                :underline="false"
                target="_blank"
                href="https://m.ncfdc.com.cn/help/getguide.html"
              >点击了解怎么获取查询验证码</el-link>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button :loading="isLoading" @click="submitHouseInfoForm">保存</el-button>
                <el-button type="primary" :loading="isLoading" @click="submitAllInfoCheck">信息预览</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapState } from "vuex";
import {
  sexEnum,
  dictionaryTypeEnum,
  fromCityEnum,
  uploadImageErrorEnum,
  planUseSelectEnum,
  nationSelectEnum,
  familyEnum,
  studentStatusEunm,
  saveErrorMessage,
  // houseTypeEnum,
  // houseTypeSelectEnum,
  housecertifyEnum,
  housecertifySelectEnum
} from "@/utils/enum";
import { getHeaders } from "@/utils/auth";
import { checkIDCard } from "@/utils/validate";

export default {
  name: "StudentApplyInfo",
  data() {
    const houseRulesDefault = {
      districtId: [
        {
          required: true,
          validator: this.validateDistrictId,
          message: "请选择房产地址所在区",
          trigger: "change"
        }
      ],
      isHouse: [
        {
          required: true,
          message: "请选择是否有房产",
          trigger: "change"
        }
      ],
      houseCode: [
        {
          required: true,
          message: "请输入房产编号",
          trigger: "blur"
        }
      ],
      // houseType: [
      //   {
      //     required: true,
      //     validator: this.validateSelectNull,
      //     message: "请输入房产来源",
      //     trigger: "change"
      //   }
      // ],
      houseOwnerName: [
        {
          required: true,
          message: "请输入产权人姓名",
          trigger: "blur"
        },
        {
          validator: this.validateHouseOwnerName,
          message: "只能填写自己或父母的房产信息",
          trigger: "blur"
        }
      ],
      houseOwnerIdentify: [
        {
          required: true,
          message: "请输入产权人身份证",
          trigger: "blur"
        },
        {
          validator: this.validateHouseOwnerIdentify,
          message: "只能填写自己或父母的房产信息",
          trigger: "blur"
        }
      ],
      houseSize: [
        {
          required: true,
          validator: this.validateSelectNull,
          message: "请输入建筑面积（平方米）",
          trigger: "blur"
        },
        {
          pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
          message: "请输入正确的建筑面积（平方米），保留两位小数",
          trigger: "blur"
        }
      ],
      houseUse: [
        {
          required: true,
          message: "请选择规划用途",
          trigger: "change"
        }
      ],
      // houseTime: [
      //   {
      //     required: true,
      //     message: "请选择登记时间",
      //     trigger: "change"
      //   }
      // ],
      houseAddress: [
        {
          required: true,
          message: "请输入房产证地址",
          trigger: "blur"
        }
      ],
      houseSearchCode: [
        {
          validator: this.validateHouseSeachCode,
          message: "请输入正确的6位房屋查询码",
          trigger: "blur"
        }
      ]
      // houseCertify: [
      //   {
      //     required: true,
      //     validator: this.validateSelectNull,
      //     message: "请输入房产依据",
      //     trigger: "change"
      //   }
      // ]
    };
    return {
      isLoading: false,
      applyInfo: {
        sampleId: "", // //采集序号
        status: -1, //状态
        studentCode: "", //学籍号
        schoolId: 0, //学校
        className: "", //班级
        name: "", //姓名
        // nameother: "", //曾用名
        // nationId: 0, //民族
        sex: 0,
        identify: "", //身份证号
        photo: "", //照片
        parentName1: "", //父亲姓名
        parentTelephone1: "", //父亲电话
        parentIdentify1: "", //父亲身份证号
        // parentWorkunit1: "", //父亲工作单位
        parentName2: "", //母亲姓名
        parentTelephone2: "", //母亲电话
        parentIdentify2: "", //母亲身份证号
        // parentWorkunit2: "", //母亲工作单位
        residenceAddress: "", //户口本地址
        residenceReleation: 0, //与学生关系
        policeStationCode: "0", // 所属派出所
        isHouse: 1, // 是否有房产
        districtId: 0, // 房产所在地
        houseCode: "", // 房产编号
        // houseType: 0, //房产来源
        houseOwnerName: "", // 产权人姓名
        houseOwnerIdentify: "", // 产权人身份证
        houseSize: 0, // 大小
        houseUse: 1, // 规划用途
        // houseTime: "", // yyyy-MM-dd
        houseCoowner: "", // 房屋共有人姓名
        houseAddress: "", // 房产地址
        // houseCertify: 0, //// 房屋依据
        leaseContractName: "", //相关手续-租赁合同-姓名
        leaseContractNum: "", //相关手续-租赁合同-字号
        leaseContractStime: "", //相关手续-租赁合同-开始时间
        leaseContractEtime: "", //相关手续-租赁合同-结束时间
        residentialPassName: "", //相关手续-居住证-姓名
        residentialPassNum: "", //相关手续-居住证-编号
        residentialPassStime: "", //相关手续-居住证-开始时间
        residentialPassEtime: "", //相关手续-居住证-结束时间
        socialSecurityNo: "", //社保号
        paymentUser: "", //社保缴费人
        paymentTime: "", //社保缴费身份证号，
        commercialPaper: 0, //工商注册
        taxRegistration: 0, //税务登记
        laborContract: 0 //用工合同
      },
      baseInfoRules: {
        studentCode: [
          {
            required: true,
            message: "请输入学籍号",
            trigger: "blur"
          }
        ],
        schoolId: [
          {
            required: true,
            validator: this.validateSelectNull,
            message: "请选择学校",
            trigger: "change"
          }
        ],
        className: [
          {
            required: true,
            validator: this.validateSelectNull,
            message: "请输入班级",
            trigger: "blur"
          }
        ],
        // nationId: [
        //   {
        //     required: true,
        //     message: "请选择民族",
        //     trigger: "change"
        //   }
        // ],
        photo: [
          {
            required: true,
            message: "请上传照片",
            trigger: "upload"
          }
        ]
      },
      familyRules: {
        parentName1: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        parentTelephone1: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          },
          {
            validator: this.validatePhone,
            message: "手机号格式错误，支持填写无",
            trigger: "blur"
          }
          // {
          //   pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          //   message: "手机号格式错误",
          //   trigger: "blur"
          // }
        ],
        parentIdentify1: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          },
          {
            message: "请输入正确的身份证号",
            trigger: "blur",
            validator: this.validateIdentify
          }
        ],
        parentName2: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        parentTelephone2: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          },
          {
            validator: this.validatePhone,
            message: "手机号格式错误，支持填写无",
            trigger: "blur"
          }
          // {
          //   pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          //   message: "手机号格式错误",
          //   trigger: "blur"
          // }
        ],
        parentIdentify2: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          },
          {
            message: "请输入正确的身份证号",
            trigger: "blur",
            validator: this.validateIdentify
          }
        ]
      },
      residenceRules: {
        residenceAddress: [
          {
            required: true,
            message: "请输入户口本地址",
            trigger: "blur"
          }
        ],
        residenceReleation: [
          {
            required: true,
            message: "请选择与学生关系",
            validator: this.validateSelectNull,
            trigger: "change"
          }
        ]
      },
      houseRules: houseRulesDefault,
      houseRulesDefault: houseRulesDefault,
      //nationOptions: nationSelectEnum, //民族列表
      schoolOptions: [], //小学列表
      departmentOptions: [], //县区
      policeOptions: [], //派出所
      residencereleationOptions: [], //与学生关系
      // sourceOptions: [], //房屋来源
      // housecertifyOptions: [], //房产依据
      planUseOptions: planUseSelectEnum, //房屋规划用途
      certificatestatusOptions: [], //工商执照、税务登记、用工合同
      pictureAction: process.env.VUE_APP_BASE_API + "/student/uploadImage",
      headers: getHeaders()
    };
  },
  computed: {
    ...mapState({
      isFromCityBool: state => state.student.studentInfo.isFromCity == 0,
      isFromCity: state => state.student.studentInfo.isFromCity
    }),
    sexText: function() {
      return sexEnum[this.applyInfo.sex];
    },
    isNotHouse: function() {
      return this.applyInfo.isHouse != 1;
    }
  },
  watch: {},
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const defaultOption = { id: 0, name: "请选择" };
      const defaultSearchOption = { id: 0, name: "请选择(可输入筛选)" };
      //与学生关系、证件状态
      this.$store
        .dispatch("GetDictionaryData", [
          dictionaryTypeEnum.residencereleation,
          dictionaryTypeEnum.certificatestatus
        ])
        .then(res => {
          this.residencereleationOptions = res.data.find(
            d => d.dictionaryType == dictionaryTypeEnum.residencereleation
          ).dictionaryData;
          this.residencereleationOptions &&
            this.residencereleationOptions.splice(0, 0, defaultOption);
          this.certificatestatusOptions = res.data.find(
            d => d.dictionaryType == dictionaryTypeEnum.certificatestatus
          ).dictionaryData;
          this.certificatestatusOptions &&
            this.certificatestatusOptions.splice(0, 0, defaultOption);
        });
      // this.sourceOptions = [defaultOption].concat(houseTypeSelectEnum);
      // this.housecertifyOptions = [defaultOption].concat(housecertifySelectEnum);
      //派出所
      this.$store.dispatch("GetPoliceList").then(res => {
        res.policeList.splice(0, 0, { id: "0", name: "请选择(可输入筛选)" });
        this.policeOptions = res.policeList;
      });
      //学校
      this.$store.dispatch("GetPrimarySchoolList").then(res => {
        res.schoolList.splice(0, 0, defaultSearchOption);
        if (this.isFromCityBool) {
          res.schoolList.push({
            id: -88,
            name: "外地返昌-无毕业学校"
          });
        }
        this.schoolOptions = res.schoolList;
      });
      //房产所在地，区县列表
      this.$store.dispatch("GetDepartmentList").then(res => {
        res.departmentList.splice(0, 0, defaultSearchOption);
        this.departmentOptions = res.departmentList;
      });
      //已填写信息
      this.$store.dispatch("GetStudentApplyInfo").then(res => {
        if (
          res.data.status == studentStatusEunm.noFillIn ||
          res.data.status == studentStatusEunm.fillIn
        ) {
          if (res.data.schoolId == null) res.data.schoolId = 0;
          // if (res.data.nationId == null) res.data.nationId = 0;
          if (res.data.houseUse == null) res.data.houseUse = 0;
          // if (res.data.houseTime == null) res.data.houseTime = "";
          if (res.data.residenceReleation == null)
            res.data.residenceReleation = 0;
          // if (res.data.houseType == null) res.data.houseType = 0;
          // if (res.data.houseCertify == null) res.data.houseCertify = 0;
          res.data.houseSize = this.houseSizeChange(res.data.houseSize);
          this.isHouseChange(res.data.isHouse);
          this.applyInfo = res.data;
        } else {
          //非填报状态，跳转到预览页面
          this.$router.push({ path: "/student/preview" });
        }
      });
    },
    /**
     * 获取注册学生需要保存的数据
     */
    getSubmitInfo() {
      const applyInfo = this.applyInfo;
      if (this.isFromCityBool) {
        return {
          isFromCity: this.isFromCity, //是否城区学生
          isHouse: applyInfo.isHouse,
          districtId: applyInfo.districtId, // 房产所在地，不能修改
          houseCode: applyInfo.houseCode, // 房产编号
          // houseType: applyInfo.houseType, //房产来源
          houseOwnerName: applyInfo.houseOwnerName, // 产权人姓名
          houseOwnerIdentify: applyInfo.houseOwnerIdentify, // 产权人身份证
          houseSize: applyInfo.houseSize, // 大小
          houseUse: applyInfo.houseUse, // 规划用途
          // houseTime: applyInfo.houseTime, // yyyy-MM-dd
          houseCoowner: applyInfo.houseCoowner, // 房屋共有人姓名
          houseAddress: applyInfo.houseAddress, // 房产地址
          // houseCertify: applyInfo.houseCertify, //// 房屋依据
          houseSearchCode: applyInfo.houseSearchCode //房屋查询码
        };
      }
      return {
        isFromCity: this.isFromCity, //是否城区学生
        // sampleId: applyInfo.sampleId, // //采集序号
        studentCode: applyInfo.studentCode, //学籍号
        schoolId: applyInfo.schoolId, //学校
        className: applyInfo.className, //班级
        // name: applyInfo.name, //姓名
        // nameother: applyInfo.nameother, //曾用名
        // nationId: applyInfo.nationId, //民族
        // sex: applyInfo.sex,
        photo: applyInfo.photo, //照片
        parentName1: applyInfo.parentName1, //父亲姓名
        parentTelephone1: applyInfo.parentTelephone1, //父亲电话
        parentIdentify1: applyInfo.parentIdentify1, //父亲身份证号
        // parentWorkunit1: applyInfo.parentWorkunit1, //父亲工作单位
        parentName2: applyInfo.parentName2, //母亲姓名
        parentTelephone2: applyInfo.parentTelephone2, //母亲电话
        parentIdentify2: applyInfo.parentIdentify2, //母亲身份证号
        // parentWorkunit2: applyInfo.parentWorkunit2, //母亲工作单位
        residenceAddress: applyInfo.residenceAddress, //户口本地址
        residenceReleation: applyInfo.residenceReleation, //与学生关系
        // policeStationCode: applyInfo.policeStationCode, // 所属派出所，不能修改
        isHouse: applyInfo.isHouse,
        districtId: applyInfo.districtId, // 房产所在地，不能修改
        houseCode: applyInfo.houseCode, // 房产编号
        // houseType: applyInfo.houseType, //房产来源
        houseOwnerName: applyInfo.houseOwnerName, // 产权人姓名
        houseOwnerIdentify: applyInfo.houseOwnerIdentify, // 产权人身份证
        houseSize: applyInfo.houseSize, // 大小
        houseUse: applyInfo.houseUse, // 规划用途
        // houseTime: applyInfo.houseTime, // yyyy-MM-dd
        houseCoowner: applyInfo.houseCoowner, // 房屋共有人姓名
        houseAddress: applyInfo.houseAddress, // 房产地址
        // houseCertify: applyInfo.houseCertify, //// 房屋依据
        houseSearchCode: applyInfo.houseSearchCode //房屋查询码
        // leaseContractName: applyInfo.leaseContractName, //相关手续-租赁合同-姓名
        // leaseContractNum: applyInfo.leaseContractNum, //相关手续-租赁合同-字号
        // leaseContractStime: applyInfo.leaseContractStime, //相关手续-租赁合同-开始时间
        // leaseContractEtime: applyInfo.leaseContractEtime, //相关手续-租赁合同-结束时间
        // residentialPassName: applyInfo.residentialPassName, //相关手续-居住证-姓名
        // residentialPassNum: applyInfo.residentialPassNum, //相关手续-居住证-编号
        // residentialPassStime: applyInfo.residentialPassStime, //相关手续-居住证-开始时间
        // residentialPassEtime: applyInfo.residentialPassEtime, //相关手续-居住证-结束时间
        // socialSecurityNo: applyInfo.socialSecurityNo, //社保号
        // paymentUser: applyInfo.paymentUser, //社保缴费人
        // paymentTime: applyInfo.paymentTime, //社保缴费身份证号，
        // commercialPaper: applyInfo.commercialPaper, //工商注册
        // taxRegistration: applyInfo.taxRegistration, //税务登记
        // laborContract: applyInfo.laborContract //用工合同
      };
    },
    /**
     * 验证下拉框，不能为默认选项
     */
    validateSelectNull(rule, value, callback) {
      if (value == 0) {
        callback(new Error());
      } else {
        callback();
      }
    },
    validatePhone(rule, value, callback) {
      if (value != "无" && !new RegExp(/^1(3|4|5|7|8|9)\d{9}$/).test(value)) {
        callback(new Error());
      } else {
        callback();
      }
    },
    validateIdentify(rule, value, callback) {
      if (value && !checkIDCard(value)) {
        callback(new Error());
      }
      callback();
    },
    /**
     * 验证房产所在地
     */
    validateDistrictId(rule, value, callback) {
      if (value == 0 && this.isFromCityBool) {
        callback(new Error());
      } else {
        callback();
      }
    },
    /**
     * 验证产权人姓名
     * 选择父母房产时，产权人姓名、身份证号需要与家庭信息一致
     */
    validateHouseOwnerName(rule, value, callback) {
      const { name, parentName1, parentName2 } = this.applyInfo;
      // if (houseType == houseTypeEnum.parent) {
      if (
        value &&
        name != value &&
        parentName1 != value &&
        parentName2 != value
      ) {
        callback(new Error());
      }
      // }
      callback();
    },
    /**
     * 验证产权人身份证
     * 选择父母房产时，产权人姓名、身份证号需要与家庭信息一致
     */
    validateHouseOwnerIdentify(rule, value, callback) {
      const { identify, parentIdentify1, parentIdentify2 } = this.applyInfo;
      // if (houseType == houseTypeEnum.parent) {
      if (
        value &&
        identify != value &&
        parentIdentify1 != value &&
        parentIdentify2 != value
      ) {
        callback(new Error());
      }
      // }
      callback();
    },
    validateHouseSeachCode(rule, value, callback) {
      if (value && value.length != 6) {
        callback(new Error());
      }
      callback();
    },
    houseSizeChange(houseSize) {
      let reg = new RegExp(/^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/);
      if (reg.test(houseSize)) {
        houseSize = parseFloat(houseSize).toFixed(2);
      }
      this.applyInfo.houseSize = houseSize;
      return houseSize;
    },
    /**
     * 是否有房产
     */
    isHouseChange(label) {
      this.$refs["houseInfoForm"].clearValidate();
      if (label == 1) {
        this.houseRules = this.houseRulesDefault;
      } else {
        this.houseRules = {
          isHouse: [
            {
              required: true,
              message: "请选择是否有房产",
              trigger: "change"
            }
          ]
        };
      }
    },
    /**
     * 提交家庭信息
     */
    submitFamilyInfoForm() {
      this.$refs["familyInfoForm"].validate(valid => {
        if (!valid) return;
        this.isLoading = true;
        this.saveApplyInfo();
      });
    },
    /**
     * 提交基本信息
     */
    submitBaseInfoForm() {
      this.$refs["baseInfoForm"].validate(valid => {
        if (!valid) return;
        this.isLoading = true;
        this.saveApplyInfo();
      });
    },
    /**
     * 提交户口信息
     */
    submitResidenceInfoForm() {
      this.$refs["residenceInfoForm"].validate(valid => {
        if (!valid) return;
        this.saveApplyInfo();
      });
    },
    /**
     * 提交房产信息
     */
    submitHouseInfoForm() {
      this.$refs["houseInfoForm"].validate(valid => {
        if (!valid) return;
        this.saveApplyInfo();
      });
    },
    /**
     * 提交相关信息
     */
    submitOtherInfoForm() {
      this.saveApplyInfo();
    },
    /**
     * 照片上传成功
     */
    handlePictureSuccess(res, file) {
      if (res.status == 1) {
        this.applyInfo.photo = res.url;
      } else {
        this.$message.error(uploadImageErrorEnum[res.status]);
      }
    },
    pictureBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      let isAccept = new RegExp("image/*").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择image/*类型的文件");
      }
      return isRightSize && isAccept;
    },
    /**
     * 保存信息
     */
    saveApplyInfo(callback) {
      this.isLoading = true;
      const applyInfo = this.applyInfo;
      const resultCallback = res => {
        if (callback) {
          callback(res);
        } else {
          if (res.status == 1) {
            this.$message.success("保存成功");
          } else {
            this.$message.error(saveErrorMessage[res.status]);
          }
          this.isLoading = false;
        }
      };
      this.$store
        .dispatch("SaveStudentApplyInfo", this.getSubmitInfo())
        .then(resultCallback);
    },
    /**
     * 提交所有信息审核
     */
    submitAllInfoCheck() {
      const infoFormList = [
        { name: "baseInfoForm", msg: "基本信息" },
        { name: "familyInfoForm", msg: "家庭信息" },
        { name: "residenceInfoForm", msg: "户口信息" },
        { name: "houseInfoForm", msg: "房产信息" }
      ];
      //验证表单
      const runValidate = (form, resolve) => {
        this.$refs[form.name].validate(valid => {
          if (!valid) {
            this.$message.error(`您还有${form.msg}内容没有完善！`);
            throw new Error();
          } else {
            resolve && resolve();
          }
        });
      };
      //提交预览
      const submitPreview = () => {
        // this.$confirm("信息预览后信息无法修改，是否继续?", "提示", {
        //   cancelButtonText: "取消",
        //   confirmButtonText: "确定",
        //   type: "warning"
        // }).then(() => {
        //再次保存数据，跳转到预览页面
        this.saveApplyInfo(res => {
          this.isLoading = false;
          if (res.status == 1) {
            this.$message.success("保存成功，正在跳转...");
            this.$router.push({ path: "/student/preview" });
          } else {
            this.$message.error(saveErrorMessage[res.status]);
          }
        });
        // });
      };
      //是否是城区，城区只保存房产信息
      if (this.isFromCityBool) {
        new Promise(resolve => {
          runValidate(infoFormList[3], resolve);
        })
          .then(submitPreview)
          .catch(() => {});
      } else {
        new Promise(resolve => {
          runValidate(infoFormList[0], resolve);
        })
          .then(() => {
            runValidate(infoFormList[1]);
          })
          .then(() => {
            runValidate(infoFormList[2]);
          })
          .then(() => {
            runValidate(infoFormList[3]);
          })
          .then(submitPreview)
          .catch(() => {});
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.el-tab-pane {
  font-size: 14px;
  color: $defaultText;
  min-height: 400px;
}
.colinfo {
  padding: 10px 0 20px 0;
  label {
    display: inline-block;
    text-align: right;
    width: 100px;
    padding: 0px 15px;
    color: #606266;
  }
}
.el-input,
.el-select {
  width: 100%;
}
.el-upload__tip {
  line-height: 1.2;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 160px;
  display: block;
}
.next {
  margin: 0 auto;
  padding-top: 20px;
}
.warning {
  padding: 0 0 15px 0;
  font-size: 16px;
  color: #999;
  i {
    color: $yellow;
    font-size: 24px;
    vertical-align: text-bottom;
  }
}
.red {
  color: #f56c6c;
}
.selectlink {
  padding: 0 0 20px 150px;
}
@media screen and (max-width: 700px) {
  .el-tabs {
    width: calc(100vw + 100px);
  }
  .box-card {
    margin-bottom: 20px;
  }
}
</style>
