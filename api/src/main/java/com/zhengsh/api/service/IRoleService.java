package com.zhengsh.api.service;

import java.util.List;

import com.zhengsh.api.bean.Role;

/**
 * 角色管理
 * @author laozheng
 * @see 2016年9月17日 下午9:08:52 - v0.0.1
 */
public interface IRoleService extends IBaseService<com.zhengsh.api.bean.Role> {
	
	public List<Role> list();
}
