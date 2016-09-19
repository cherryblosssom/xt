package com.zhengsh.api.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 接口访问日志
 * @author laozheng
 * @see 2016年08月26日 - v0.0.1
 */
@Entity
public class ApiAccessLog implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int id;
	/**
	 * 访问时间
	 */
	private Date accesstime; 
	/**
	 * 访问地址
	 */
	private String url; 
	/**
	 * 菜单
	 */
	private String menu; 
	/**
	 * IP
	 */
	private String ip; 
	/**
	 * 用户
	 */
	private String username;

	public ApiAccessLog() {
	}

	public ApiAccessLog(Date accesstime, String url, String menu, String ip, String username) {
		this.accesstime = accesstime;
		this.url = url;
		this.menu = menu;
		this.ip = ip;
		this.username = username;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getAccesstime() {
		return this.accesstime;
	}

	public void setAccesstime(Date accesstime) {
		this.accesstime = accesstime;
	}

	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMenu() {
		return this.menu;
	}

	public void setMenu(String menu) {
		this.menu = menu;
	}

	public String getIp() {
		return this.ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}