package com.zhengsh.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }
    
    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String mian() {
        return "index/index";
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
    	return "login";
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register() {
    	return "register";
    }
}