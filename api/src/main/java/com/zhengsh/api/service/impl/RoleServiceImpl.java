/**
 * 
 */
package com.zhengsh.api.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.Role;
import com.zhengsh.api.repository.IRoleRepository;
import com.zhengsh.api.service.IRoleService;

/**
 * 角色管理
 * @author laozheng
 * @see 2016年9月17日 下午9:09:42 - v0.0.1
 */
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements IRoleService{

	@Autowired
	IRoleRepository repository;
	Logger logger = Logger.getLogger(RoleServiceImpl.class);
	
	@Override
	protected JpaRepository<Role, Integer> getRepository() {
		return repository;
	}

	@Override
	public List<Role> list() {
		return repository.findAll();
	}
}
