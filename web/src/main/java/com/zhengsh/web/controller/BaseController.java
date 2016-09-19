package com.zhengsh.web.controller;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

public class BaseController {
	
	protected Logger logger = Logger.getLogger(this.getClass());
	
	/**
	 * 模板文件夹名
	 */
	private String getModel() {
		return getClass().getSimpleName().toLowerCase().replace("controller", "");
	}
	
	/**
	 * 编辑页面 
	 */
	@RequestMapping("edit")
	public String edit() {
		String url =  getModel() +"/edit";
		logger.info("访问地址 --- " + url);
		return url;
	}
	
	/**
	 * 列表页面
	 */
	@RequestMapping("list")
	public String list() {
		String url = getModel() +"/list";
		logger.info("访问地址 --- " + url);
		return url;
	}
	
	/**
	 * 其他页面
	 */
	@RequestMapping("/{mothod}/{id}")
	public String other(@PathVariable("mothod")String mothod, @PathVariable("id") String id) {
		String url = getModel() +"/" + mothod;
		logger.info("访问地址 --- " + url + "/" + id);
		return url;
	}
}
