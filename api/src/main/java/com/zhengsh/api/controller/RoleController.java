package com.zhengsh.api.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhengsh.api.bean.Role;
import com.zhengsh.api.service.IBaseService;
import com.zhengsh.api.service.IRoleService;

/**
 * 角色管理
 * @author laozheng
 * @see 2016年8月27日 下午2:57:16 - v0.0.1
 */
@Controller
@EnableAutoConfiguration
@RequestMapping("/role")
public class RoleController extends BaseController<com.zhengsh.api.bean.Role>{
	
	@Autowired
	private IRoleService s;
	@Override
	public com.zhengsh.api.service.IBaseService<Role> getService() {
		return (IBaseService<Role>) s;
	};
	
	Logger logger = Logger.getLogger(RoleController.class);
	
	@RequestMapping(value = "/list", method=RequestMethod.POST)
	@ResponseBody
	public List<Role> list(){
		return s.list();
	}
}
