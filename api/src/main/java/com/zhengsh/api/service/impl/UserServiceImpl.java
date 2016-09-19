package com.zhengsh.api.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhengsh.api.bean.Cache;
import com.zhengsh.api.bean.CacheUser;
import com.zhengsh.api.bean.User;
import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.repository.ICacheUserRepository;
import com.zhengsh.api.repository.IUserRepository;
import com.zhengsh.api.service.IUserService;
import com.zhengsh.api.util.MD5;

@Service
public class UserServiceImpl implements IUserService {

	Logger logger = Logger.getLogger(UserServiceImpl.class);

	@Autowired
	IUserRepository repository;
	@Autowired
	ICacheUserRepository cuRepository;
	
	public Dto<User> login(Dto<User> dto) {
		Dto<User> d = null;
		User u = null;
		ErrorEnum error = null;
		String token = null;
		try {

			User user = (User) dto.getData();
			user.setPassword(MD5.getMd5(user.getPassword()));
			u = repository.findByUserNameAndPassword(user.getUserName(), user.getPassword());

			if (u != null) {
				CacheUser ch = cuRepository.findIdAndDuetime(user.getUserName(), new Date());
				
				if (ch == null) {
					token = UUID.randomUUID().toString();
					
					CacheUser c = new CacheUser();
					c.setId(token);
					c.setName(token);
					Date date = new Date();
					Calendar calendar = new GregorianCalendar();
					calendar.setTime(date);
					calendar.add(calendar.MINUTE, 30);
					c.setDuetime(calendar.getTime());
					
					cuRepository.save(c);
					
					u.setPassword("******");
					error = ErrorEnum.SUCCESS;
				} else {
					token = ch.getName();
				}
			} else {
				error = ErrorEnum.DEFEATED;
			}
		} catch (Exception ex) {
			error = ErrorEnum.DEFEATED;
		}
		return new Dto<User>(u, error, token);
	}

	@Override
	public Dto<User> save(Dto<User> dto) {
		User u = dto.getData();
		try{
			repository.save(u);
			return new Dto<User>(u,ErrorEnum.SUCCESS);
		}catch(Exception ex) {
			return new Dto<User>(u,ErrorEnum.DEFEATED);
		}
	}

	@Override
	public Dto<User> get(Dto<User> dto) {
		return null;
	}

	@Override
	public Dto<User> list(Dto<User> dto) {
		return null;
	}
	
	
}
