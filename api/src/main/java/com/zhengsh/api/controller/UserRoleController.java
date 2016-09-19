/**
 * 
 */
package com.zhengsh.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zhengsh.api.bean.UserRole;
import com.zhengsh.api.service.IBaseService;
import com.zhengsh.api.service.IUserRoleService;

/**
 * 用户角色
 * @author laozheng
 * @see 2016年8月27日 下午2:57:16 - v0.0.1
 */
@Controller
@EnableAutoConfiguration
@RequestMapping("/userrole")
public class UserRoleController extends BaseController<UserRole> {
	
	@Autowired
	IUserRoleService service;
	@Override
	protected IBaseService<UserRole> getService() {
		return service;
	}
}
