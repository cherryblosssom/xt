package com.zhengsh.api.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.zhengsh.api.bean.ApiAccessLog;
import com.zhengsh.api.bean.Cache;
import com.zhengsh.api.dto.ErrorEnum;
import com.zhengsh.api.repository.ICacheRepository;
import com.zhengsh.api.service.IApiAccessLogService;
import com.zhengsh.api.util.NetworkUtil;

@Configuration
@EnableWebMvc
public class WebAppConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new UserSecurityInterceptor()).addPathPatterns("/**");
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**");
	}
}

class UserSecurityInterceptor implements HandlerInterceptor {

	Logger logger = Logger.getLogger(UserSecurityInterceptor.class);
	
	/**
	 * 免登入 免检查地址
	 */
	private List<String> uncheckUrls = new ArrayList<String>();

	public UserSecurityInterceptor() {
		uncheckUrls.add("/error");
		uncheckUrls.add("/getToken");
		uncheckUrls.add("/user/getList");
		uncheckUrls.add("/test");
		uncheckUrls.add("/test1");
		uncheckUrls.add("/test2");
		uncheckUrls.add("/test3");
		uncheckUrls.add("/test4");
		uncheckUrls.add("/test5");
		uncheckUrls.add("/401");
		uncheckUrls.add("/404");
		uncheckUrls.add("/500");
	}

	/**
	 * 预处理 （这里处理公钥）
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String type = request.getMethod();
		String requestUrl = request.getRequestURI();

		// 设置允许跨域请求
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		
		saveAccessLog(request);

		logger.info("MVC 拦截器  预处理");
		logger.info("访问地址： --- " + requestUrl);
		logger.info("访问类型： --- " + type);
		showParams(request);
		
		return true;
		
//		if (!uncheckUrls.contains(requestUrl)) { // 需要拦截的地址
//			String keyname = "publickey";
//			String publickey = request.getParameter(keyname);
//			if (publickey == null) {
//				publickey = request.getHeader(keyname);
//			}
//			try {
//				ApplicationContext ac = WebApplicationContextUtils
//						.getRequiredWebApplicationContext(request.getServletContext());
//				ICacheRepository repository = (ICacheRepository) ac.getBean("ICacheRepository");
//
//				Cache c = repository.findName(publickey);
//				if (c == null) {
//					throw new Exception();
//				} else {
//					response.setHeader("publickey", c.getName());
//					return true;
//				}
//			} catch (Exception ex) {
//
//				logger.info("公钥验证失败 --- " + ex.getMessage());
//
//				if ("POST".equals(type)) {
//					int code = ErrorEnum.APPKEY_LOGIN_DEFEATED.getIndex();
//					response.getWriter().print("{code:" + code + ",message:'" + ErrorEnum.getName(code) + "'}");
//				} else {
//					response.sendRedirect("/401");
//				}
//			}
//			return false;
//		} else {
//			return true;
//		}
	}

	/**
	 * 保存访问日志
	 */
	private void saveAccessLog(HttpServletRequest request) {
		Date accesstime = new Date();
		String url = request.getRequestURI();
		String menu = "";           // TODO 需要调用菜单接口通过地址获取菜单
		String ip = "";
		try {
			ip = NetworkUtil.getIpAddress(request);
		} catch (IOException e) {
			ip = "无法获取IP";
		}
		String username = "匿名用户"; // TODO 登陆用户名
		
		ApplicationContext ac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(request.getServletContext());
		IApiAccessLogService aalServer = (IApiAccessLogService) ac.getBean("apiAccessLogServiceImpl");

		ApiAccessLog aal = new ApiAccessLog(accesstime, url, menu, ip, username);
		aalServer.save(aal);
	}

	/**
	 * 返回处理
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.info("com.zhengsh.api.config.UserSecurityInterceptor -> postHandle");
	}

	/**
	 * 后处理
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		logger.info("MVC 拦截器  后处理");

		String callbackFunName = request.getParameter("callback");
		response.getOutputStream();
	}

	private void showParams(HttpServletRequest request) {
		Map map = new HashMap();
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String paramName = (String) paramNames.nextElement();

			String[] paramValues = request.getParameterValues(paramName);
			if (paramValues.length == 1) {
				String paramValue = paramValues[0];
				if (paramValue.length() != 0) {
					map.put(paramName, paramValue);
				}
			}
		}

		Set<Map.Entry<String, String>> set = map.entrySet();
		logger.info("--------------- MVC 访问输入 开始 ---------------");
		for (Map.Entry entry : set) {
			logger.info(entry.getKey() + ":" + entry.getValue());
		}
		logger.info("--------------- MVC 访问输入 结束 ---------------");
	}
}