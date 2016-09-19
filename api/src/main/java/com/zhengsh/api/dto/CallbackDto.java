package com.zhengsh.api.dto;

public class CallbackDto<T> {
	Dto<T> callback = null;

	public CallbackDto() {
	}
	
	public CallbackDto(Dto<T> callback) {
		this.callback = callback;
	}



	public Dto<T> getCallback() {
		return callback;
	}

	public void setCallback(Dto<T> callback) {
		this.callback = callback;
	}
	
	
}
