/**
 * 
 */
package com.zhengsh.api.controller;

import org.apache.log4j.Logger;
import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhengsh.api.bean.User;
import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.dto.Page;
import com.zhengsh.api.repository.IUserRepository;
import com.zhengsh.api.service.IUserService;
import com.zhengsh.api.service.impl.ApiAccessLogServiceImpl;

/**
 * 用户管理
 * @author laozheng
 * @see 2016年8月27日 下午2:57:16 - v0.0.1
 */
@Controller
@EnableAutoConfiguration
@RequestMapping("/user")
public class UserController{
	@Autowired
	private IUserRepository repository;
	@Autowired
	private IUserService service;
	Logger logger = Logger.getLogger(UserController.class);
	
	/**
	 * 分页查询
	 */
	@RequestMapping(value ="/getList", method=RequestMethod.POST)
    @ResponseBody
	public Page<User> getList(Page pager) {
		int page = pager.getStart() / pager.getLength();
		int size = pager.getLength();
		Pageable pageable = new PageRequest(page, size);
		org.springframework.data.domain.Page<User> p = repository.findAll(pageable);
		long total = p.getTotalElements();
		pager.setData(p.getContent());
		pager.setRecordsFiltered(Integer.parseInt(total + ""));
		pager.setRecordsTotal(Integer.parseInt(total + ""));
		return pager;
	}
	
	/**
	 * 保存
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public Dto<User> save(User user) {
		return service.save(new Dto<User>(user));
	}
	
	
	/**
	 * 保存
	 */
	@RequestMapping(value = "/{id}/get", method = RequestMethod.GET)
	@ResponseBody
	public Dto<User> get(@PathVariable("id") String id) {
		User u = repository.findOne(new Integer(id));
		return new Dto<User>(u);
	}
	
	/**
	 * 删除
	 */
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	@ResponseBody
	public Dto<User> delete(@PathVariable("id") String id) {
		try {
			repository.delete(new Integer(id));
			
			logger.info(ErrorEnum.SUCCESS);
			return new Dto<User>(ErrorEnum.SUCCESS);
		} catch (Exception ex) {
			
			logger.error(ex);
			return new Dto<User>(ErrorEnum.E_500);
		}
	}
}
