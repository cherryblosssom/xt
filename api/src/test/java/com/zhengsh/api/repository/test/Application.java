package com.zhengsh.api.repository.test;
import org.apache.catalina.startup.ClassLoaderFactory.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.zhengsh.api.bean.User;
import com.zhengsh.api.repository.IUserRepository;

@SpringBootApplication
public class Application {

	@Autowired
	IUserRepository repository;
	
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);

        System.out.println(" ---  =^_^= 服务器接口启动成功  =^_^=  --- ");

//        String[] beanNames = ctx.getBeanDefinitionNames();
//        Arrays.sort(beanNames);
//        for (String beanName : beanNames) {
//            System.out.println(beanName);
//        }
        
        new Application().test();
    }
    
    private void test() {
    	User user = new User();
    	user.setUserName("developer");
    	user.setPassword("111111");
    	repository.save(user);
    }
}