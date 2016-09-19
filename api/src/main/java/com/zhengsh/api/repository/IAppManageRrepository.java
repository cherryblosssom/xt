package com.zhengsh.api.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.AppManage;

@Repository
public interface IAppManageRrepository extends JpaRepository<AppManage, String> {
	
	/**
	 * 通过 appkey 和  accesstoken 获取 AppManage对象
	 * 缓存 2 小时
	 * @param appkey       key   
	 * @param accesstoken  token
	 * @return    AppManage对象
	 */
	@Cacheable(value = "appkey",keyGenerator = "wiselyKeyGenerator")
	@Query("from AppManage a where a.appkey=:appkey and a.accesstoken=:accesstoken")
 	public AppManage findByAppkeyAndAccesstoken(@Param("appkey")String appkey,@Param("accesstoken")String accesstoken);
}
