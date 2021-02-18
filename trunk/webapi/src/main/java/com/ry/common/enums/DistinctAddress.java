package com.ry.common.enums;

import lombok.var;

import java.util.Arrays;

/**
 * 用户状态
 *
 * @author
 */

public enum DistinctAddress {

    DHQ(102, "东湖区教科体局教育科，预约审核电话：87838592。"),
    XHQ(103, "西湖区教科体局教育科，预约审核电话：86564950。"),
    QYPQ(104, "青云谱区教科体局基教科，预约审核电话：88461813。"),
    QSHQ(111, "青山湖区教体局基教科，预约审核电话：88101575。"),
    GXQ(109, "高新区教育事业管理中心教育科，预约审核电话：88161123。"),
    JKQ(106, "经济技术开发区教育文化体育办公室义教科，预约审核电话：83899829。"),
    HGTQ(108, "红谷滩新区教育事业管理中心教育科，预约审核电话：83950360。"),
    NCS(100, "南昌市教育考试院，中招科预约审核电话：86230809。");

    private final Integer id;
    private final String name;

    DistinctAddress(Integer id, String name) {
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
        var distinctAddress = Arrays.asList(DistinctAddress.values()).stream()
                .filter(x -> x.getId().equals(id))
                .findFirst().orElse(null);
        if (distinctAddress != null) {
            return distinctAddress.getName();
        } else {
            return DistinctAddress.NCS.getName();
        }
    }
}
