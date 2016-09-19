package com.zhengsh.api.service.impl;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.ApiAccessLog;
import com.zhengsh.api.repository.IApiAccessLogRepository;
import com.zhengsh.api.service.IApiAccessLogService;

/**
 * 接口访问日志
 * 
 * @author laozheng
 * @see 2016年8月26日 下午12:43:07 - v0.0.1
 */
@Service
public class ApiAccessLogServiceImpl implements IApiAccessLogService {

	Logger logger = Logger.getLogger(ApiAccessLogServiceImpl.class);
	@Autowired
	IApiAccessLogRepository repository;

	@Transactional
	@Override
	public void save(ApiAccessLog aal) {
		try {
			repository.save(aal);
			logger.error("接口日志创建成功");
		} catch (Exception ex) {
			logger.error("接口日志创建失败 " + ex.getMessage());
		}
	}

}
