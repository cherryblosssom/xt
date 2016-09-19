/**
 * 
 */
package com.zhengsh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.Menu;

/**
 * 菜单管理
 * @author laozheng
 * @see 2016年9月17日 下午9:07:31 - v0.0.1
 */
@Repository
public interface IMenuRepository extends JpaRepository<Menu, Integer> {
	
}
