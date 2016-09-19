package com.zhengsh.api.service;

import com.zhengsh.api.bean.User;
import com.zhengsh.api.dto.Dto;

/**
 * 用户管理
 * @author laozheng
 * @see 2016年8月26日 下午1:36:33 - v0.0.1
 */
public interface IUserService {
	
	public Dto<User> login(Dto<User> dto);
	
	public Dto<User> save(Dto<User> dto);
	
	public Dto<User> get(Dto<User> dto);
	
	public Dto<User> list(Dto<User> dto);
	
}
