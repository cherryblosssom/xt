package com.zhengsh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.UserRole;
import com.zhengsh.api.repository.IUserRoleRepository;
import com.zhengsh.api.service.IUserRoleService;

@Service
public class UserRoleServiceImpl extends BaseServiceImpl<UserRole> implements IUserRoleService {
	
	@Autowired
	IUserRoleRepository repository;
	@Override
	protected JpaRepository<UserRole, Integer> getRepository() {
		return repository;
	}
}
