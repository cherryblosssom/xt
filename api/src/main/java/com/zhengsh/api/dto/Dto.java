package com.zhengsh.api.dto;

public class Dto<T> {

	private T data = null;
	private int code = 0;
	private String message = "";
	private String token = "";

	public Dto() {

	}

	public Dto(T data) {
		this.data = data;
	}

	public Dto(T data, String token) {
		this.token = token;
		this.data = data;
	}

	public Dto(ErrorEnum error) {
		this.code = error.getIndex();
		this.message = ErrorEnum.getName(this.code);
	}

	public Dto(ErrorEnum error, String token) {
		this.token = token;
		this.code = error.getIndex();
		this.message = ErrorEnum.getName(this.code);
	}

	public Dto(T data, ErrorEnum error) {
		this.data = data;
		this.code = error.getIndex();
		this.message = ErrorEnum.getName(this.code);
	}
	
	public Dto(T data, ErrorEnum error, String token) {
		this.token = token;
		this.data = data;
		this.code = error.getIndex();
		this.message = ErrorEnum.getName(this.code);
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	/**
	 * 获取code的异常描述
	 * 
	 * @return 异常描述
	 */
	public String getMessage() {
		if (code > 0) {
			message = ErrorEnum.getName(code);
		}
		return message;
	}

	private void setMessage(String message) {
		this.message = message;
	}

	/**
	 * 默认成功 DTO
	 * 
	 * @param t
	 * @return
	 */
	public Dto<T> getSuccess(T data) {
		return getResult(data, ErrorEnum.SUCCESS);
	}

	/**
	 * 默认失败 DTO
	 * 
	 * @param t
	 * @return
	 */
	public Dto<T> getDefeated(T data) {
		return getResult(data, ErrorEnum.DEFEATED);
	}

	/**
	 * 手动构建DTO
	 * 
	 * @param t
	 * @param error
	 * @return
	 */
	public Dto<T> getResult(T data, ErrorEnum error) {
		Dto<T> dto = new Dto<T>();
		dto.data = data;
		dto.setCode(error.getIndex());
		return dto;
	}

	/**
	 * 不带T的DTO
	 * 
	 * @param error
	 * @return
	 */
	public Dto<T> getResult(ErrorEnum error) {
		return getResult(null, ErrorEnum.DEFEATED);
	}
}
