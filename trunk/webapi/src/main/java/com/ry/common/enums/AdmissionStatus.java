package com.ry.common.enums;

import java.util.Arrays;

/**
 * 用户状态
 *
 * @author
 */

public enum AdmissionStatus {
    DELETE(0, "删除"),
    TOBEVERIFIED(1, "信息待核验"),
    VERIFIEDFAIL(2, "信息核验不通过"),
    COMPLETED(4, "信息核验通过"),//信息核验成功
    TO_BO_ASSIGNED(57, "待派位"),
    UN_CHECKED(58, "派位未中签"),
    CHECKED(56, "待缴费"),//中签
    PAID(6, "已缴费"),
    CONFIRM_ADMISSION(7, "确认录取"),
    GIVEUP(8, "放弃学位");


    private final Integer id;
    private final String name;

    AdmissionStatus(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    /**
     * @param id
     * @return
     */
    public static String getNameById(int id) {
        AdmissionStatus admissionStatus = Arrays.asList(AdmissionStatus.values()).stream()
                .filter(alarmGrade -> alarmGrade.getId().equals(id))
                .findFirst().orElse(null);
        if (admissionStatus != null) {
            return admissionStatus.getName();
        } else {
            return "暂无";
        }
    }
}
