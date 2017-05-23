package com.ecs.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.OnDutyManage;
import com.ecs.service.OnDutyService;
import com.ecs.util.DateUtil;

@Controller
@RequestMapping(value = "/onduty")
public class OnDutyController {
	
	@Resource(name="ondutyservice")
	private OnDutyService ondutyservice;
	
	
	@ResponseBody
	@RequestMapping(value = "add",produces = "text/json;charset=UTF-8",method = RequestMethod.POST)//一定要加上produces = "text/json;charset=UTF-8"否则返回给前台的中文会乱码
	public String addduty(OnDutyManage om,HttpServletRequest request){
//System.out.println(om.getId());
//System.out.println(request);
		boolean status = ondutyservice.addduty(om);
		if(status){
			return "{success:true,message:'添加成功！'}";
		}else{return "{success:false,errors:'添加失败！'}";}
	}
	
	
	@ResponseBody
	@RequestMapping(value="findAll",produces = "text/json;charset=UTF-8")
	public String findAll(HttpServletRequest request){
//System.out.println(ondutyservice.findAll().get(0).getName());
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
//System.out.println("开始：" + start + "结束：" + limit);
		return ondutyservice.findAll(start,limit);
	}
	
	
	@ResponseBody
	@RequestMapping(value="updateAll",produces = "text/json;charset=UTF-8",method = RequestMethod.POST)
	public String updateAll(HttpServletRequest request){
//System.out.println("data:"+request.getParameter("data"));
		try{
			ondutyservice.updateAll(request.getParameter("data"));
			return "批量更新成功！";
		}catch(Exception e){
			e.printStackTrace();
			return "批量更新失败！";
		}
	}
	
	@ResponseBody
	@RequestMapping(value="deleteAll",produces = "text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			ondutyservice.deleteAll(request.getParameter("data"));
			return "删除记录成功！";
		}catch(Exception e){
			e.printStackTrace();
			return "删除记录失败！";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="update",produces = "text/json;charset=UTF-8")
	public String update(OnDutyManage om){
//System.out.println(om.getId());
		try{
			ondutyservice.update(om);
			return "{success:true,message:'更新记录成功！'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false,errors:'更新记录失败！'}";
		}
	}
	
	@ResponseBody
	@RequestMapping(value="findByParams",produces = "text/json;charset=UTF-8")
	public String findByParams(HttpServletRequest request){
		String name = request.getParameter("name");
		String start_date = request.getParameter("start_date");
		String end_date = request.getParameter("end_date");
		DateUtil du = new DateUtil();
System.out.println("start_date:" + start_date);
System.out.println("end_date:" + end_date);
		Date start_date1 = du.str2Date(start_date, "yyyy-MM-dd");
		Date end_date1 = du.str2Date(end_date, "yyyy-MM-dd");
		String shift = request.getParameter("shift");
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
System.out.println("start:" + start);
System.out.println("end:" + limit);
		return ondutyservice.findByParams(name, start_date1, end_date1, shift, start, limit);
	}
	
	
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(true);
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);   
    }
}
