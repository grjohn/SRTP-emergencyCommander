package com.ecs.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.Contact;
import com.ecs.service.ContactService;

@Controller
@RequestMapping(value="contact")
public class ContactController {
	
	@Resource(name="contactservice")
	private ContactService contactservice;
	
	
	@ResponseBody
	@RequestMapping(value="loadmenu",produces="text/json;charset=UTF-8")
	public String loadMenu(){
		String json = contactservice.loadMenu();
		return json;
	}
	

	@ResponseBody
	@RequestMapping(value="findbyid",produces="text/json;charset=UTF-8")
	public String findById(HttpServletRequest request){
		try{
			String id = request.getParameter("id");
			String json = contactservice.findById(id);
//System.out.println("json:"+ json);
			if(json != null){
				return json;
			}else{
				return "{msg:'无此单位信息，请先添加！'}";
			}
		}catch(Exception e){
			e.printStackTrace();
			return "{errors: '载入数据出错！'}";
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value="saveorupdate",produces="text/json;charset=UTF-8")
	public String saveorupdate(Contact contact){
		try{
//System.out.println(contact.getEmail());
			contactservice.saveorupdate(contact);
			return "{success:true, message:'操作成功'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors:'操作失败'}";
		}
	}
}
