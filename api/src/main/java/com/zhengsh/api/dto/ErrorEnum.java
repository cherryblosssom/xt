package com.zhengsh.api.dto;

public enum ErrorEnum {
	
	SUCCESS("操作成功",10000),
	USERNAME_OR_PASSWORD_ERROR("用户名或密码错误", 10001),
	SYSTEM_OUT_TIME("系统超时", 10002),
	E_401("权限不足",10401),
	E_404("服务器找不到请求",10404),
	E_500("服务器内部错误",10500),
	E_NO_PUBLIC_TOKEN("尚未存在TOKEN", 10777),
	DEFEATED("操作失败",99999),
	APPKEY_LOGIN_DEFEATED("AppKey 登录失败",99998);
	
	private ErrorEnum(String name, int index) {
		this.name = name;
		this.index = index;
	}

	public static String getName(int index) {
		for (ErrorEnum c : ErrorEnum.values()) {
			if (c.getIndex() == index) {
				return c.name;
			}
		}
		return null;
	}

	private String name;
	private int index;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

}
