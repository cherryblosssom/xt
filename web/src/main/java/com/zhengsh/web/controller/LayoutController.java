package com.zhengsh.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/layout")
public class LayoutController {
	
    @RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(){
		return "layout";
	}
}
