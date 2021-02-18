package com.ry.framework.task;

import com.ry.common.utils.StringUtils;
import com.ry.project.system.service.ISysDeptService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 定时任务调度测试
 *
 * @author
 */
@Component("ryTask")
@Slf4j
public class RyTask {
    @Autowired
    ISysDeptService sysDeptService;

    public void ryParams(Boolean isFinally) {
    }

    public void ryMultipleParams(String s, Boolean b, Long l, Double d, Integer i) {
        System.out.println(StringUtils.format("执行多参方法： 字符串类型{}，布尔类型{}，长整型{}，浮点型{}，整形{}", s, b, l, d, i));
    }

    public void ryParams(String params) {
        System.out.println("执行有参方法：" + params);
    }
}
