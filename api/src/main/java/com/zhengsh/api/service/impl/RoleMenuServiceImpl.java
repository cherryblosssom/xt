package com.zhengsh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.RoleMenu;
import com.zhengsh.api.repository.IRoleMenuRepository;
import com.zhengsh.api.service.IRoleMenuService;

@Service
public class RoleMenuServiceImpl extends BaseServiceImpl<RoleMenu> implements IRoleMenuService {
	
	@Autowired
	IRoleMenuRepository repository;
	@Override
	protected JpaRepository<RoleMenu, Integer> getRepository() {
		return repository;
	}
}
