package com.ry.project.common.vo;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class IdName {
    private String id;
    private String name;
}
