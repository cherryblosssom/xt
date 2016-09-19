package com.zhengsh.api.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 菜单
 * @author laozheng
 * @see 2016年09月17日 - v0.0.1
 */
@Entity
public class Menu {
	
	@Id
	@GeneratedValue
	private int id;  // 主键
	private int parentId;// 上级ID
	private String name;// 菜单名称
	private String fullName;// 菜单全名称
	private String url;// 菜单地址（winfrom 为类路径）
	private String icon;// 图标
	private int sort;// 排序
	private String endIndex;// 是否级节点
	private String type;// 菜单，按钮 ，其他 (直接存储中文）

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getEndIndex() {
		return endIndex;
	}

	public void setEndIndex(String endIndex) {
		this.endIndex = endIndex;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}