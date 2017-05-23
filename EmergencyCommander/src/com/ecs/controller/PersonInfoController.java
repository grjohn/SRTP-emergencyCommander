package com.ecs.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.PersonInfo;
import com.ecs.service.PersonInfoService;


@Controller
@RequestMapping(value="personInfo")
public class PersonInfoController {
	
	@Resource(name="personInfoservice")
	private PersonInfoService personInfoservice;
	
	
	@ResponseBody
	@RequestMapping(value="addPerson", produces="text/html;charset=UTF-8")
	public String addPersonInfo(PersonInfo person,HttpServletRequest request){
		try{
//System.out.println(person.getTime());
			personInfoservice.addPerson(person);
			return "{success:true, message:'添加成功！'}";
		}catch(DataIntegrityViolationException e){
			System.out.println("已有该员工信息，不可重复添加！");
			return "{success:false, errors: '添加失败！'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors: '添加失败！'}";
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value="addPerson1", produces="text/json;charset=UTF-8")
	public void addPersonInfo1(@RequestBody String Person){//理解因为加了@RequestBody所以只能是String
		System.out.println(Person);
	}
	
	/**
	 * 批量删除
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="deleteAll",produces="text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			String persons = request.getParameter("data");
//System.out.println("persons:" + PersonInfos);
			personInfoservice.deleteAll(persons);
			return "删除成功";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败!";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="updatePerson", produces="text/json;charset=UTF-8")
	public String updatePersonInfo(PersonInfo person){
		try{
			personInfoservice.updatePerson(person);
			return "{success:true, message: '修改成功!'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors: '修改失败!'}";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="updateAll", produces="text/json;charset=UTF-8")
	public String updateAll(HttpServletRequest request){
		try{
//System.out.print(PersonInfos);
			personInfoservice.updateAll(request.getParameter("data"));
			return "批量修改成功";
		}catch(Exception e){
			e.printStackTrace();
			return "批量修改失败!";
		}
	}
	/**
	 * 查找
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="findByParams", produces="text/json;charset=UTF-8")
	public String findByParams(HttpServletRequest request){
		try{
			String did = request.getParameter("did");
System.out.println("did:" + did);
			String start  = request.getParameter("start");
			String limit = request.getParameter("limit");
//System.out.println(limit);
			return personInfoservice.findByParams(did,start, limit);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(true);
        //定义指定日期格式的本地日期解析/编辑器
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);   
    }
}
