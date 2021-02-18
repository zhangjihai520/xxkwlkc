package com.ry.common.enums;

import lombok.var;

import java.util.Arrays;

/**
 * 用户状态
 *
 * @author
 */

public enum FillType {

    BUILDING(1, "楼盘生"), STAFF(2, "教职工子女"), DIRECTENTRANCE(3, "直升生"), PUBLIC(4, "校外招生"),SUPPLEMENT(7, "补录生");

    private final Integer id;
    private final String name;

    FillType(Integer id, String name) {
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
        var recruitType = Arrays.asList(FillType.values()).stream()
                .filter(alarmGrade -> alarmGrade.getId().equals(id))
                .findFirst().orElse(null);
        if (recruitType != null) {
            return recruitType.getName();
        } else {
            return "";
        }

    }
}
