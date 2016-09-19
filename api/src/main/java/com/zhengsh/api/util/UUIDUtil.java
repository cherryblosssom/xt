package com.zhengsh.api.util;
import java.util.UUID;  
  
/**
 * UUID工具类 
 * @author laozheng
 * @see 2016年9月17日 下午8:26:45 - v0.0.1
 */
public class UUIDUtil {
	
    /** 
     * 获取生成的uuid 
     * @return 
     */  
    public static String uuid(){  
        return UUID.randomUUID().toString().replaceAll("-", "");  
    }  
   
}  