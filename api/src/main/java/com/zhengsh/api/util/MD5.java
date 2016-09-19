package com.zhengsh.api.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 { 
	
	private static String salt = "啊发票放啊高搞哈怂的更好更活动啊干哈啥都哈斯夺冠啊话说当个； 阿斯各啊啥是大帅哥哈宿管啊啊usgha";
    
	public static String getMd5(String plainText) {  
        try {
        	plainText += salt;
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.update(plainText.getBytes());  
            byte b[] = md.digest();  
            int i;  
  
            StringBuffer buf = new StringBuffer("");  
            for (int offset = 0; offset < b.length; offset++) {  
                i = b[offset];  
                if (i < 0)  
                    i += 256;  
                if (i < 16)  
                    buf.append("0");  
                buf.append(Integer.toHexString(i));  
            } 
            return buf.toString();  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
            return null;  
        }  
  
    }  
  
}  