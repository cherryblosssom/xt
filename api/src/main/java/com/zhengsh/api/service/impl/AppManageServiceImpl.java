package com.zhengsh.api.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.AppManage;
import com.zhengsh.api.bean.Cache;
import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.repository.IAppManageRrepository;
import com.zhengsh.api.repository.ICacheRepository;
import com.zhengsh.api.service.IAppManageService;

@Service
public class AppManageServiceImpl implements IAppManageService {

	Logger logger = Logger.getLogger(AppManageServiceImpl.class);
	@Autowired
	IAppManageRrepository repository;
	@Autowired
	ICacheRepository cacheRepository;

	@Override
	public Dto<String> getToken(Dto<AppManage> dto) {
		Dto<String> r = null;
		try {
			AppManage app = dto.getData();
			String appkey = app.getAppkey();
			AppManage a = repository.findByAppkeyAndAccesstoken(appkey, app.getAccesstoken());

			if (a == null) {
				logger.info("com.zhengsh.api.service.impl.AppmanageServiceImpl : Appkey 登录失败!");
				r = new Dto<String>(ErrorEnum.APPKEY_LOGIN_DEFEATED);
			} else {
				Cache ch = cacheRepository.findIdAndDuetime(appkey, new Date());
				String token = "";
				if (ch == null) {
					token = UUID.randomUUID().toString();
					
					Cache c = new Cache();
					c.setId(appkey);
					c.setName(token);
					Date date = new Date();
					Calendar calendar = new GregorianCalendar();
					calendar.setTime(date);
					calendar.add(calendar.MINUTE, 30);
					c.setDuetime(calendar.getTime());

					cacheRepository.save(c);
				} else {
					token = ch.getName();
				}
				
				r = new Dto<String>(token, ErrorEnum.SUCCESS);
				logger.info("com.zhengsh.api.service.impl.AppmanageServiceImpl : Appkey 登录成功!");
			}
		} catch (Exception ex) {
			r = new Dto<String>(ErrorEnum.DEFEATED);
			logger.error("com.zhengsh.api.service.impl.AppmanageServiceImpl : Appkey 登录失败! -- " + ex.getMessage());
		}
		return r;
	}

}
