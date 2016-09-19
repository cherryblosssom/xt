/**
 * 
 */
package com.zhengsh.api.dto;

import java.util.List;

import com.zhengsh.api.util.Constant;

/**
 * 分页
 * @author laozheng
 * @see 2016年8月27日 下午2:59:26 - v0.0.1
 */
public class Page<T> {

	/**
	 * 数据起始位置
	 */
	private int start;
	/**
	 * 每页显示记录数
	 */
	private int length;
	
	/**
	 * DataTable draw
	 */
	private int draw;
	
	/**
	 * 总记录数
	 */
	private int recordsTotal;
	
	/**
	 * 查询后记录数
	 */
	private int recordsFiltered;
	
	/**
	 * 查询数据集
	 */
	private List<T> data;
	
	public Page() {

	}

	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}
	
}
