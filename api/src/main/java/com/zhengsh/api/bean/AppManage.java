package com.zhengsh.api.bean;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AppManage implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String appkey;
	private String accesstoken;
	
	public AppManage() {
		
	}
	
	public String getAppkey() {
		return appkey;
	}
	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}
	public String getAccesstoken() {
		return accesstoken;
	}
	public void setAccesstoken(String accesstoken) {
		this.accesstoken = accesstoken;
	}
	
	
}
