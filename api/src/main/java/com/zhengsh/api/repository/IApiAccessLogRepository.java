package com.zhengsh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zhengsh.api.bean.ApiAccessLog;

@Repository
public interface IApiAccessLogRepository extends JpaRepository<ApiAccessLog, Integer> {
	
}
