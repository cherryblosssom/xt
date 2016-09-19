/**
 * 
 */
package com.zhengsh.api.service;

import com.zhengsh.api.dto.Dto;
import com.zhengsh.api.dto.Page;

/**
 * 基类逻辑
 * @author laozheng
 * @see 2016年9月17日 下午5:33:36 - v0.0.1
 */
public interface IBaseService<T> {
	
	/**
	 * 保存或者更新[存在Id,更新;否则,新增]
	 */
	public Dto<T> save(Dto<T> dto);
	
	/**
	 * 删除
	 * @param id  主键
	 * @return
	 */
	public Dto<T> delete(Integer id);
	
	/**
	 * 分页查询
	 * @param page 分页对象
 	 * @return
	 */
	public Page<T> list(Page<T> page);
	
	/**
	 * 通过主键获取对象
	 * @param id 主键
	 */
	public Dto<T> get(Integer id);
}
