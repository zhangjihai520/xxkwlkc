package com.ry.common.enums;

import lombok.var;

import java.util.Arrays;

/**
 * 用户状态
 *
 * @author
 */

public enum AdmissionType {

    BUILDING(1, "楼盘生录取"),
    STAFF(2, "教职工子女录取"),
    DIRECTUPREG(3, "直升注册录取"),
    DIRECTUPDIS(4, "直升派位录取"),
    PUBLICREG(5, "校外注册录取"),
    PUBLICDIS(6, "校外派位录取"),
    SUPPLEMENT(7, "补充录取");
    private final Integer id;
    private final String name;

    AdmissionType(Integer id, String name) {
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
    public static String getNameById(Integer id) {
        var recruitType = Arrays.asList(AdmissionType.values()).stream()
                .filter(alarmGrade -> alarmGrade.getId().equals(id))
                .findFirst().orElse(null);
        if (recruitType != null) {
            return recruitType.getName();
        } else {
            return "暂无";
        }

    }
}
