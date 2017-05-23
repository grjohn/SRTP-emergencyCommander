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

import com.ecs.model.Conference;
import com.ecs.service.ConferenceService;
import com.ecs.util.DateUtil;


@Controller
@RequestMapping(value="conference")
public class ConferenceController {
	
	@Resource(name="conferenceservice")
	private ConferenceService conferenceservice;
	
	private static DateUtil du = new DateUtil();
	
	
	@ResponseBody
	@RequestMapping(value="addconference", produces="text/json;charset=UTF-8")
	public String addconference(Conference conference,HttpServletRequest request){
		try{
	System.out.println(conference.getEtime());
			conferenceservice.addConference(conference);
			return "{success:true, message:'添加成功！'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors: '添加失败！'}";
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value="addConference1", produces="text/json;charset=UTF-8")
	public void addconference1(@RequestBody String Conference){//理解因为加了@RequestBody所以只能是String
		System.out.println(Conference);
	}
	
	
	@ResponseBody
	@RequestMapping(value="deleteAll",produces="text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			String conferences = request.getParameter("data");
//System.out.println("conferences:" + conferences);
			conferenceservice.deleteAll(conferences);
			return "删除成功";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败!";
		}
	}
	
	/**
	 * 修改一条记录
	 * @param conference
	 */
	@ResponseBody
	@RequestMapping(value="updateconference", produces="text/json;charset=UTF-8")
	public String updateconference(Conference conference){
		try{
			conferenceservice.updateConference(conference);
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
//System.out.print(conferences);
			conferenceservice.updateAll(request.getParameter("data"));
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
//System.out.println(ename);
			String type = request.getParameter("type");
			String level = request.getParameter("level");
			int start  = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
//System.out.println(limit);
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM-dd");
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM-dd");
			return conferenceservice.findByParams(ename, type, level, start_date, end_date, start, limit);
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
//System.out.println(limit);
		return conferenceservice.findAll(start, limit);
	} 
	
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd,HH时mm分ss秒");
        dateFormat.setLenient(true);
        //定义指定日期格式的本地日期解析/编辑器
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);
    }
}
