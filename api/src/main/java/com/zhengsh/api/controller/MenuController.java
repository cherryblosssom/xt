package com.zhengsh.api.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zhengsh.api.bean.Menu;
import com.zhengsh.api.service.IBaseService;
import com.zhengsh.api.service.IMenuService;

/**
 * 角色管理
 * @author laozheng
 * @see 2016年8月27日 下午2:57:16 - v0.0.1
 */
@Controller
@EnableAutoConfiguration
@RequestMapping("/menu")
public class MenuController extends BaseController<Menu>{
	
	@Autowired
	private IMenuService s;
	@Override
	public IBaseService<Menu> getService() {
		return (IBaseService<Menu>) s;
	};
	
	Logger logger = Logger.getLogger(MenuController.class);
	
}
