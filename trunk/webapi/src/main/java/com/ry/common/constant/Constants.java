package com.ry.common.constant;

import io.jsonwebtoken.Claims;

/**
 * 通用常量信息
 *
 * @author
 */
public class Constants {
    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";

    /**
     * GBK 字符集
     */
    public static final String GBK = "GBK";

    /**
     * 通用成功标识
     */
    public static final String SUCCESS = "0";

    /**
     * 通用失败标识
     */
    public static final String FAIL = "1";

    /**
     * 登录成功
     */
    public static final String LOGIN_SUCCESS = "Success";

    /**
     * 注销
     */
    public static final String LOGOUT = "Logout";

    /**
     * 登录失败
     */
    public static final String LOGIN_FAIL = "Error";
    /**
     * 验证码 redis key
     */
    public static final String DEPT_KEY = "dept:";
    /**
     * 验证码 redis key
     */
    public static final String CAPTCHA_CODE_KEY = "captcha_codes:";
    /**
     * 验证码 redis key
     */
    public static final String CHANGEPWD_CODE_KEY = "changepwd_codes:";

    /**
     * 验证码 redis key
     */
    public static final String REGISTER_CODE_KEY = "register_codes:";

    /**
     * 登录用户 redis key
     */
    public static final String LOGIN_TOKEN_KEY = "login_tokens:";

    /**
     * 警局 redis key
     */
    public static final String POLICESTATIONS_KEY = "police_stations";
    /**
     * 区县 redis key
     */
    public static final String DEPTMANAGER_KEY = "DeptManager:";

    /**
     * 字典 redis key
     */
    public static final String CONDITIONVALUES_KEY = "condition_values:";
    /**
     * 全部字典 redis key
     */
    public static final String ALLCONDITIONVALUES_KEY = "all_condition_values";
    /**
     * 小学 redis key
     */
    public static final String PRIMARYSCHOOLS_KEY = "primary_schools";

    /**
     * 中学 redis key
     */
    public static final String MIDDLESCHOOLS_KEY = "middle_schools";

    /**
     * 字典 redis key
     */
    public static final String ACCESSCONFIGS_KEY = "access_configs";
    /**
     * 业务数据缓存
     */
    public static final Integer BUSSINESS_DATA_CACHE = 30;

    /**
     * 验证码有效期（分钟）
     */
    public static final Integer CAPTCHA_EXPIRATION = 5;
    /**
     * 令牌
     */
    public static final String TOKEN = "token";

    /**
     * 令牌前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    /**
     * 令牌前缀
     */
    public static final String LOGIN_USER_KEY = "login_user_key";

    public static final String LOGIN_USER_TYPE = "login_user_type";

    /**
     * 用户ID
     */
    public static final String JWT_USERID = "userid";

    /**
     * 用户名称
     */
    public static final String JWT_USERNAME = Claims.SUBJECT;

    /**
     * 用户头像
     */
    public static final String JWT_AVATAR = "avatar";

    /**
     * 创建时间
     */
    public static final String JWT_CREATED = "created";

    /**
     * 用户权限
     */
    public static final String JWT_AUTHORITIES = "authorities";

    /**
     * 资源映射路径 前缀
     */
    public static final String RESOURCE_PREFIX = "/profile";

    public static final String MSG_REGISTER_SUC_FORMAT = "【南昌市教育考试院】您的民办小升初采集序号是：%s，登录密码是%s，请妥善保存采集号及密码，登录小升初民办信息管理平台进行信息完善确认和志愿填报。";
    public static final String MSG_REGISTER_FORMAT = "【南昌市教育考试院】您正在注册小升初民办系统账号，验证码为：%s,本验证码5分钟内有效，如非本人操作，请忽略此信息。";
    public static final String MSG_PWD_CHANGE_FORMAT = "【南昌市教育考试院】您的小升初系统账号正在重置密码，新密码为：%s";

    //区域审批人A 角色ID
    public static final Integer AREA_REVIEWER_A_ROLEID = 111;
    //区域审批人B 角色ID
    public static final Integer AREA_REVIEWER_B_ROLEID = 112;
}
