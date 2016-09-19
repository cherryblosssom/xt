package com.zhengsh.api.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.Cache;

@Repository
public interface ICacheRepository extends JpaRepository<Cache, String> {
	
	@Query("from Cache c where c.id=:id and c.duetime > :nowtime")
	public Cache findIdAndDuetime(@Param("id")String id,@Param("nowtime")Date nowtime);
	
	@Query("from Cache c where c.name=:name")
	public Cache findName(@Param("name")String name);
}
