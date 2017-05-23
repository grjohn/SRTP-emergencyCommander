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
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.service.ChartService;
import com.ecs.util.DateUtil;

@Controller
@RequestMapping(value="chart")
public class ChartController {
	
	@Resource(name="chartservice")
	private ChartService chartservice;
	
	private static DateUtil du = new DateUtil();
	
	
	@ResponseBody
	@RequestMapping(value="rough_level",produces="text/html;charset=UTF-8")
	public String rough_level(HttpServletRequest request){
		try{
//System.out.println("start_date:"+request.getParameter("start_date"));
//System.out.println("start_date:"+request.getParameter("end_date"));
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
			return chartservice.rough_level(start_date, end_date);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="rough_type",produces="text/json;charset=UTF-8")
	public String rough_type(HttpServletRequest request){
		try{
//System.out.println("start_date:"+request.getParameter("start_date"));
//System.out.println("start_date:"+request.getParameter("end_date"));
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
			return chartservice.rough_type(start_date, end_date);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="pie_level",produces="text/json;charset=UTF-8")
	public String pie_level(HttpServletRequest request){
		Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
		Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
		return chartservice.pie_level(start_date, end_date);
	}
	
	
	@ResponseBody
	@RequestMapping(value="pie_type",produces="text/json;charset=UTF-8")
	public String pie_type(HttpServletRequest request){
		Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
		Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
		return chartservice.pie_type(start_date, end_date);
	}
	
	
	@ResponseBody
	@RequestMapping(value="at_level",produces="text/json;charset=UTF-8")
	public String at_level(HttpServletRequest request){
		String level = request.getParameter("level");
		String type = request.getParameter("type");
		Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
		Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
		return chartservice.at_level(level, type, start_date, end_date);
	}
	
	@ResponseBody
	@RequestMapping(value="at_type", produces="text/json;charset=UTF-8")
	public String at_type(HttpServletRequest request){
		String level = request.getParameter("level");
		String type = request.getParameter("type");
//System.out.println("type:" + type);
		Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
		Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
		return chartservice.at_type(level, type, start_date, end_date);
	}
	
	@ResponseBody
	@RequestMapping(value="findByParams", produces="text/json;charset=UTF-8")
	public String findByParams(HttpServletRequest request){
		try{
			String level = request.getParameter("level");
			String type = request.getParameter("type");
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM");
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM");
			return chartservice.findByParams(level, type, start_date, end_date);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value="casualty", produces="text/json;charset=UTF-8")
	public String casualty(HttpServletRequest request){
		try{
			String id = request.getParameter("id");
System.out.println("id" + id);
			return chartservice.casualty(id);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	

	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM");   
        dateFormat.setLenient(false);
        //定义指定日期格式的本地日期解析/编辑器
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);   
    }

}
