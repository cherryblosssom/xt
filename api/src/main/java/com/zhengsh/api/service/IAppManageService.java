package com.zhengsh.api.service;

import com.zhengsh.api.bean.AppManage;
import com.zhengsh.api.dto.Dto;

public interface IAppManageService {
	
	Dto<String> getToken(Dto<AppManage> dto);
	
}
