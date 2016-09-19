/**
 * 
 */
package com.zhengsh.api.service.impl;

import org.apache.log4j.Logger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.dto.Page;
import com.zhengsh.api.service.IBaseService;

/**
 * 基类业务
 * @author laozheng
 * @see 2016年9月17日 下午9:16:03 - v0.0.1
 */
public class BaseServiceImpl<T> implements IBaseService<T>{
	
	Logger logger = Logger.getLogger(BaseServiceImpl.class);
	protected JpaRepository<T, Integer> getRepository() {
		return null;
	}
	
	@Override
	public Dto<T> save(Dto<T> dto) {
		try {
			T r = dto.getData();
			getRepository().save(r);
			logger.info(r);
			return new Dto<T>(r,ErrorEnum.SUCCESS);
		} catch (Exception ex) {
			logger.error(ex);
			return new Dto<T>(ErrorEnum.DEFEATED);
		}
	}

	@Override
	public Dto<T> delete(Integer id) {
		try {
			getRepository().delete(id);
			logger.info(ErrorEnum.getName(ErrorEnum.SUCCESS.getIndex()));
			return new Dto<T>(ErrorEnum.SUCCESS);
		} catch (Exception ex) {
			logger.error(ex);
			return new Dto<T>(ErrorEnum.DEFEATED);
		}
	}

	@Override
	public Page<T> list(Page<T> pager) {
		try {
			int page = pager.getStart() / pager.getLength();
			int size = pager.getLength();
			
			Pageable pageable = new PageRequest(page, size);
			org.springframework.data.domain.Page<T> p = getRepository().findAll(pageable);
			long total = p.getTotalElements();
			
			pager.setData(p.getContent());
			pager.setRecordsFiltered(Integer.parseInt(total + ""));
			pager.setRecordsTotal(Integer.parseInt(total + ""));
			
			return pager;
		} catch (Exception ex) {
			
			logger.error(ex);
			return new Page<T>();
		}
	}

	@Override
	public Dto<T> get(Integer id) {
		try {
			T r = getRepository().findOne(id);
			logger.info(ErrorEnum.getName(ErrorEnum.SUCCESS.getIndex()));
			
			return new Dto<T>(r);
		} catch (Exception ex) {
			
			logger.error(ex);
			return new Dto<T>(ErrorEnum.DEFEATED);
		}
	}
}
