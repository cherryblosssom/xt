/**
 * 
 */
package com.zhengsh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.RoleMenu;

/**
 * 角色菜单
 * @author laozheng
 * @see 2016年9月18日 下午8:40:11 - v0.0.1
 */
@Repository
public interface IRoleMenuRepository extends JpaRepository<RoleMenu, Integer>{

}
