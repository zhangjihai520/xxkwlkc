/**
 * 字典类型
 */
export const dictionaryTypeEnum = {
    schooltype: "schooltype",//学校性质
    district: "schooltype",//考区
    residencetype: "residencetype",//户口类型
    housetype: "housetype",//房屋类型
    studenttype: "studenttype",//生源类型
    admissiontype: "admissiontype",//录取形式
    approveresult: "approveresult",//审核结果
    helicoptertype: "helicoptertype",//直升类型
    residencereleation: "residencereleation",//与户主关系
    housecertify: "housecertify",//房屋依据
    houseproperty: "houseproperty",//房产性质
    allocnote: "allocnote",//分配说明
    admissionnote: "admissionnote",//录取备注
    wholetype: "wholetype",//统筹类别
    certificatestatus: "certificatestatus",//证件状态（工商执照、税务登记、用工合同）
    reasontype: "reasontype",//来访原因
    admissionnote99: "admissionnote99",//民校政府购买学位
}
// export const dictionaryTypeEnum = {
//     schooltype: 3,//学校性质
//     district: 4,//考区
//     residencetype: 5,//户口类型
//     housetype: 6,//房屋类型
//     studenttype: 7,//生源类型
//     admissiontype: 8,//录取形式
//     approveresult: 9,//审核结果
//     helicoptertype: 10,//直升类型
//     residencereleation: 11,//与户主关系
//     housecertify: 12,//房屋依据
//     houseproperty: 13,//房产性质
//     allocnote: 14,//分配说明
//     admissionnote: 15,//录取备注
//     wholetype: 16,//统筹类别
//     certificatestatus: 17,//证件状态（工商执照、税务登记、用工合同）
//     reasontype: 18,//来访原因
//     admissionnote99: 19,//民校政府购买学位
// }

/**
 * 登录结果枚举
 */
export const loginStatusEnum = {
    1: "登录成功",
    2: "验证码错误",
    3: "采集号或密码错误",
    4: "对不起，你的账号未通过审核，无法登录！",
};

/**
 * 注册结果枚举
 */
export const registerStatusEnum = {
    1: "登录成功",
    2: "身份证号已存在，请确认是否已注册过",
    3: "验证码错误",
    4: "手机号已存在，请确认是否已注册过"
};

/**
 * 性别枚举
 */
export const sexSelectEnum = [
    {
        name: "男",
        id: 0
    },
    {
        name: "女",
        id: 1
    }
];
export const sexEnum = {
    0: "男", 1: "女"
};

/**
 * 上传图片类型
 */
export const uploadImageEnum = {
    studentPicture: 1
};

/**
 * 上传图片类型
 */
export const fromCityEnum = {
    city: 0,    //城区
    noCity: 1   //非城区
};

/**
 * 上传图片失败
 */
export const uploadImageErrorEnum = {
    1: "上传成功",
    2: "文件超出大小",
};

/**
 * 房屋类型
 */
export const planUseSelectEnum = [
    {
        name: "住宅",
        id: 0
    },
    {
        name: "商用",
        id: 1
    }
];

/**
 * 家庭成员枚举
 */
export const familyEnum = {
    1: "父亲", 2: "母亲"
};

/**
 * 民族
 */
export const nationSelectEnum = [{
    id: 0, name: "汉族"
}, {
    id: 1, name: "壮族"
}, {
    id: 2, name: "满族"
}, {
    id: 3, name: "回族"
}, {
    id: 4, name: "苗族"
}, {
    id: 5, name: "维吾尔族"
}, {
    id: 6, name: "土家族"
}, {
    id: 7, name: "彝族"
}, {
    id: 8, name: "蒙古族"
}, {
    id: 9, name: "藏族"
}, {
    id: 10, name: "布依族"
}, {
    id: 11, name: "侗族"
}, {
    id: 12, name: "瑶族"
}, {
    id: 13, name: "朝鲜族"
}, {
    id: 14, name: "白族"
}, {
    id: 15, name: "哈尼族"
}, {
    id: 16, name: "哈萨克族"
}, {
    id: 17, name: "黎族"
}, {
    id: 18, name: "傣族"
}, {
    id: 19, name: "畲族"
}, {
    id: 20, name: "傈僳族"
}, {
    id: 21, name: "仡佬族"
}, {
    id: 22, name: "东乡族"
}, {
    id: 23, name: "高山族"
}, {
    id: 24, name: "拉祜族"
}, {
    id: 25, name: "水族"
}, {
    id: 26, name: "佤族"
}, {
    id: 27, name: "纳西族"
}, {
    id: 28, name: "羌族"
}, {
    id: 29, name: "土族"
}, {
    id: 30, name: "仫佬族"
}, {
    id: 31, name: "锡伯族"
}, {
    id: 32, name: "柯尔克孜族"
}, {
    id: 33, name: "达斡尔族"
}, {
    id: 34, name: "景颇族"
}, {
    id: 35, name: "毛南族"
}, {
    id: 36, name: "撒拉族"
}, {
    id: 37, name: "布朗族"
}, {
    id: 38, name: "塔吉克族"
}, {
    id: 39, name: "阿昌族"
}, {
    id: 40, name: "普米族"
}, {
    id: 41, name: "鄂温克族"
}, {
    id: 42, name: "怒族"
}, {
    id: 43, name: "京族"
}, {
    id: 44, name: "基诺族"
}, {
    id: 45, name: "德昂族"
}, {
    id: 46, name: "保安族"
}, {
    id: 47, name: "俄罗斯族"
}, {
    id: 48, name: "裕固族"
}, {
    id: 49, name: "乌孜别克族"
}, {
    id: 50, name: "门巴族"
}, {
    id: 51, name: "鄂伦春族"
}, {
    id: 52, name: "独龙族"
}, {
    id: 53, name: "塔塔尔族"
}, {
    id: 54, name: "赫哲族"
}, {
    id: 55, name: "珞巴族"
}, { id: 56, name: "其他民族" }
];


/**
 * 学生填报状态
 * 0删除、1未填报、 2 填报中 、3 信息核验中、4 不通过，无资质、 5 通过
 */
export const studentStatusEunm = {
    noFillIn: 1,
    fillIn: 2,
    check: 3,
    error: 4,
    pass: 5
}

/**
 * 学生录取状态
 *  4已填报；57待排位；58派位未中签； 56派位中签（待缴费，或超时没缴费放弃），
 * 6已缴费（学校操作一次确认），7:确认录取（最终确认，学生操作确认）
 */
export const admissionStatusTextEnum = {
    
    1: "信息待核验",
    2: "信息核验不通过",
    4: "信息核验通过",
    57: "待派位",
    58: "派位未中签",
    56: "待缴费",
    6: "已缴费",
    7: "确认录取",
    8: "放弃学位"
}
export const admissionStatusEnum = {
    hasProvided: 4,
    forCentralAllocation: 57,
    notAwarded: 58,
    ballot: 56,
    alreadyPayCost: 6,
    admitted: 7
}
export const admissionStatusSelectEnum = [
    {
        name: "全部",
        id: 0
    },
    {
        name: "信息待核验",
        id: 1
    },
    {
        name: "信息核验不通过",
        id: 2
    },
    {
        name: "信息核验通过",
        id: 4
    },
    {
        name: "待派位",
        id: 57
    },
    {
        name: "派位未中签",
        id: 58
    },
    {
        name: "待缴费",
        id: 56
    },
    {
        name: "已缴费",
        id: 6
    },
    {
        name: "确认录取",
        id: 7
    },
    {
        name: "放弃学位",
        id: 8
    }
];

/**
 * 发送短信枚举
 */
export const sendMessageEnum = {
    register: 1
}

/**
 * 招生类型
 * 2教职工子女招生，3 直升计划，4校外招生
 */
export const studentTypeEnum = {
    teacher: 2,
    helicopter: 3,
    society: 4
}

/**
 * 保存、提交审核信息返回消息提醒
 */
export const saveErrorMessage = {
    1: "保存成功",
    2: "保存失败",
    3: "超出截止时间，无法保存"
}

/**
 * 报名类型
 * 0则全部，1楼盘生，2教职工子女招生 ,3 直升计划,4校外招生
 */
export const recruitTypeSelectEnum = [
    {
        name: "全部",
        id: 0
    },
    {
        name: "楼盘生",
        id: 1
    },
    {
        name: "教职工子女招生",
        id: 2
    },
    {
        name: "直升计划",
        id: 3
    },
    {
        name: "校外招生",
        id: 4
    },
    {
        name: "补录招生",
        id: 7
    }
];
export const recruitTypeEnum = {
    all: 0,
    build: 1,
    staff: 2,
    straightup: 3,
    public: 4,
    supplement: 7
};

/**
 * 校验结果枚举
 * NOVERIFIED(-1, "未核验"),
 * NOVERIFIED(0, "待核验"),
 * PASS(1, "核验通过"),
 * NOTPASS(2, "核验未通过");
 */
export const checkStatusEnum = {
    noverified: -1,
    waitverified: 0,
    pass: 1,
    notPass: 2,
    notApply: 99    //没有填报学校，但是已经开始核验
};
export const checkStatusSelectEnum = [
    {
        name: "未核验",
        id: -1
    }, {
        name: "待核验",
        id: 0
    },
    {
        name: "核验通过",
        id: 1
    },
    {
        name: "核验未通过",
        id: 2
    },
    {
        name: "未填报",
        id: 99
    }
];


/**
 * 房产来源
 * 24：父母房产；25：学生房产
 */
export const houseTypeEnum = {
    parent: 24,
    self: 25
};
export const houseTypeSelectEnum = [
    {
        name: "父母房产",
        id: 24
    },
    {
        name: "学生房产",
        id: 25
    }
];

/**
 * 房产依据
 * 55：房产证；56：不动产证；57：购房合同
 */
export const housecertifyEnum = {
    premisesPermit: 55,
    feoffment: 56,
    homesContract: 57
};
export const housecertifySelectEnum = [
    {
        name: "房产证",
        id: 55
    },
    {
        name: "不动产证",
        id: 56
    },
    {
        name: "购房合同",
        id: 57
    }
];

/**
 * 录取类型
 */
export const admissionTypeSelectEnum = [
    {
        name: "全部",
        id: 0
    },
    {
        name: "楼盘生录取",
        id: 1
    },
    {
        name: "教职工子女录取",
        id: 2
    },
    {
        name: "直升注册录取",
        id: 3
    },
    {
        name: "直升派位录取",
        id: 4
    },
    {
        name: "校外注册录取",
        id: 5
    },
    {
        name: "校外派位录取",
        id: 6
    },
    {
        name: "补录录取",
        id: 7
    }
];
