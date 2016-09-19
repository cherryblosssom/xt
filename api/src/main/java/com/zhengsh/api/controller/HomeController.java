package com.zhengsh.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhengsh.api.bean.AppManage;
import com.zhengsh.api.bean.User;
import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.service.IAppManageService;
import com.zhengsh.api.service.IUserService;

@Controller
@EnableAutoConfiguration
public class HomeController{

	@Autowired
	IUserService userService;
	@Autowired
	IAppManageService appmanageService;
	
	/**
	 *  获取公钥
	 */
	@RequestMapping("/getToken")
    @ResponseBody
    public Dto<String> getToken(AppManage data) {
		return appmanageService.getToken(new Dto<AppManage>(data));
    }
	
	/**
	 *  获取公钥
	 */
	@RequestMapping("/test")
    @ResponseBody
    public String test(HttpServletRequest request) {
		String callbackFunName = request.getParameter("callback");
		return callbackFunName + "({data:'aaa'})";
    }
	
	
	/**
	 *  登录（获取私钥、用户信息）
	 */
	@RequestMapping("/login")
    @ResponseBody
    public Dto<User> login(String username,String password) {
    	return userService.login(new Dto<User>(new User(username,password)));
    }
    
	/**
	 *  权限不足
	 */
	@RequestMapping("/401")
    @ResponseBody
    public Dto<String> e401() {
    	return new Dto<String>(ErrorEnum.E_401);
    }
	
	/**
	 *  地址不存在
	 */
	@RequestMapping("/404")
    @ResponseBody
    public Dto<String> e404() {
    	return new Dto<String>(ErrorEnum.E_404);
    }
	
	/**
	 *  内部错误
	 */
	@RequestMapping("/500")
    @ResponseBody
    public Dto<String> e500() {
    	return new Dto<String>(ErrorEnum.E_500);
    }
	
}