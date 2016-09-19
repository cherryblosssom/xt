package com.zhengsh.api.bean;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int Id;
	private String UserName;// 账号
	private String Password;// 密码
	private String NickName;// 昵称
	private String Icon;// 头像
	private int Moblie;// 手机
	private String EMail;// 邮箱
	private int Age;// 年龄
	private String Sex;// 性别 1-男 0-女 null-不公开
	private String Note;// 个人说明
	private String Address;// 地址
	private String CreateIP;// 创建IP
	private String CreateCity;// 创建城市
	private String LocationCity;// 定位城市
	private String ThisCity;// 当前城市

	public User() {

	}

	public User(String username, String password) {
		this.UserName = username;
		this.Password = password;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getUserName() {
		return this.UserName;
	}

	public void setUserName(String UserName) {
		this.UserName = UserName;
	}

	public String getPassword() {
		return this.Password;
	}

	public void setPassword(String Password) {
		this.Password = Password;
	}

	public String getNickName() {
		return this.NickName;
	}

	public void setNickName(String NickName) {
		this.NickName = NickName;
	}

	public String getIcon() {
		return this.Icon;
	}

	public void setIcon(String Icon) {
		this.Icon = Icon;
	}

	public int getMoblie() {
		return this.Moblie;
	}

	public void setMoblie(int Moblie) {
		this.Moblie = Moblie;
	}

	public String getEMail() {
		return this.EMail;
	}

	public void setEMail(String EMail) {
		this.EMail = EMail;
	}

	public int getAge() {
		return this.Age;
	}

	public void setAge(int Age) {
		this.Age = Age;
	}

	public String getSex() {
		return this.Sex;
	}

	public void setSex(String Sex) {
		this.Sex = Sex;
	}

	public String getNote() {
		return this.Note;
	}

	public void setNote(String Note) {
		this.Note = Note;
	}

	public String getAddress() {
		return this.Address;
	}

	public void setAddress(String Address) {
		this.Address = Address;
	}

	public String getCreateIP() {
		return this.CreateIP;
	}

	public void setCreateIP(String CreateIP) {
		this.CreateIP = CreateIP;
	}

	public String getCreateCity() {
		return this.CreateCity;
	}

	public void setCreateCity(String CreateCity) {
		this.CreateCity = CreateCity;
	}

	public String getLocationCity() {
		return this.LocationCity;
	}

	public void setLocationCity(String LocationCity) {
		this.LocationCity = LocationCity;
	}

	public String getThisCity() {
		return this.ThisCity;
	}

	public void setThisCity(String ThisCity) {
		this.ThisCity = ThisCity;
	}

}