/**
 * 
 */
package com.zhengsh.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.Menu;
import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.Page;
import com.zhengsh.api.repository.IMenuRepository;
import com.zhengsh.api.service.IBaseService;
import com.zhengsh.api.service.IMenuService;

/**
 * 菜单管理
 * @author laozheng
 * @see 2016年9月17日 下午10:42:35 - v0.0.1
 */
@Service
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements IMenuService{
	
	@Autowired
	IMenuRepository repository;
	
	@Override
	protected JpaRepository<Menu, Integer> getRepository() {
		return repository;
	}
}
