package com.zhengsh.api.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.CacheUser;

@Repository
public interface ICacheUserRepository extends JpaRepository<CacheUser, String> {
	
	@Query("from CacheUser c where c.id=:id and c.duetime > :nowtime")
	public CacheUser findIdAndDuetime(@Param("id")String id,@Param("nowtime")Date nowtime);
	
	@Query("from CacheUser c where c.name=:name")
	public CacheUser findName(@Param("name")String name);
}
