/**
 * 
 */
package com.zhengsh.api.controller;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.Page;
import com.zhengsh.api.service.IBaseService;

/**
 * 基类控制器
 * 
 * @author laozheng
 * @see 2016年9月17日 下午5:47:06 - v0.0.1
 */
public class BaseController<T> {

	protected IBaseService<T> getService() {
		return null;
	}

	Logger logger = Logger.getLogger(BaseController.class);
	
	/**
	 * 保存
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public Dto<T> save(T t) {
		return getService().save(new Dto<T>(t));
	}
	

	/**
	 * 分页查询
	 */
	@RequestMapping(value = "/getList", method = RequestMethod.POST)
	@ResponseBody
	public Page<T> getList(Page<T> page) {
		return getService().list(page);
	}

	/**
	 * 获取
	 */
	@RequestMapping(value = "/{id}/get", method = RequestMethod.GET)
	@ResponseBody
	public Dto<T> get(@PathVariable("id") String id) {
		return getService().get(new Integer(id));
	}

	/**
	 * 删除
	 */
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public Dto<T> delete(@PathVariable("id") String id) {
		return getService().delete(new Integer(id));
	}
}
