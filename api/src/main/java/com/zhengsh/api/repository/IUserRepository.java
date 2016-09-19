package com.zhengsh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.User;

/**
 * 用户信息持久化
 * @author laozheng
 * @see 2016年8月27日 下午3:17:53 - v0.0.1
 */
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
	
	@Query("from User u where u.UserName=:username and u.Password=:password")
	public User findByUserNameAndPassword(@Param("username")String username,@Param("password")String password);
}