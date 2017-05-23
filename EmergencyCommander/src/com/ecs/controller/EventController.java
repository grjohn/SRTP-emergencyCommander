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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.EventInformation;
import com.ecs.service.EventService;
import com.ecs.util.DateUtil;


@Controller
@RequestMapping(value="event")
public class EventController {
	
	@Resource(name="eventservice")
	private EventService eventservice;
	
	private static DateUtil du = new DateUtil();
	
	
	@ResponseBody
	@RequestMapping(value="addEvent", produces="text/json;charset=UTF-8")
	public String addEvent(EventInformation event){
		try{
			eventservice.addEvent(event);
			return "{success:true, message:'添加成功！'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors: '添加失败！'}";
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value="addEvent1", produces="text/json;charset=UTF-8")
	public void addEvent1(@RequestBody String event){
		System.out.println(event);
	}
	
	
	@ResponseBody
	@RequestMapping(value="deleteAll",produces="text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			String events = request.getParameter("data");
//System.out.println("events:" + events);
			eventservice.deleteAll(events);
			return "删除成功";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败!";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="updateEvent", produces="text/json;charset=UTF-8")
	public String updateEvent(EventInformation event){
		try{
			eventservice.updateEvent(event);
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
//System.out.print(events);
			eventservice.updateAll(request.getParameter("data"));
			return "批量修改成功";
		}catch(Exception e){
			e.printStackTrace();
			return "批量修改失败!";
		}
	}

	@ResponseBody
	@RequestMapping(value="findByParams", produces="text/json;charset=UTF-8")
	public String findByParams(HttpServletRequest request){
		try{
			String ename = request.getParameter("ename");
System.out.println("level:" + request.getParameter("level"));
			String type = request.getParameter("type");
			String level = request.getParameter("level");
			int start  = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
System.out.println(limit);
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM-dd");
System.out.println(start_date);
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM-dd");
			return eventservice.findByParams(ename, type, level, start_date, end_date, start, limit);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value="findAll", produces="text/json;charset=UTF-8")
	public String findAll(HttpServletRequest request){
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
System.out.println("findall");
		//return null;
		return eventservice.findAll(start, limit);
	} 
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(false);
        //定义指定日期格式的本地日期解析/编辑器
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);   
    }
}
