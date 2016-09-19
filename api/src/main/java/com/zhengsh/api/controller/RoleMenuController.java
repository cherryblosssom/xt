/**
 * 
 */
package com.zhengsh.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zhengsh.api.bean.RoleMenu;
import com.zhengsh.api.service.IBaseService;
import com.zhengsh.api.service.IRoleMenuService;

/**
 * 用户角色
 * @author laozheng
 * @see 2016年8月27日 下午2:57:16 - v0.0.1
 */
@Controller
@EnableAutoConfiguration
@RequestMapping("/rolemenu")
public class RoleMenuController extends BaseController<RoleMenu> {
	
	@Autowired
	IRoleMenuService service;
	@Override
	protected IBaseService<RoleMenu> getService() {
		return service;
	}
}
