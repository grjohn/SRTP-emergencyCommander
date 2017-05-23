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

import com.ecs.model.CallRecord;
import com.ecs.service.CallRecordService;
import com.ecs.util.DateUtil;

@Controller
@RequestMapping(value="callrecord")
public class CallRecordController {
	
	@Resource(name="callservice")
	private CallRecordService callservice;
	
	private static DateUtil du = new DateUtil();
	
	/*@ResponseBody
	@RequestMapping(value="addCall", produces="text/html;charset=UTF-8")
	private void call(){
		UsbDll mydll = UsbDll.instance;
		HWND handle = User32.INSTANCE.FindWindow(null, null);
		mydll.BindWindow(handle);
		String s = "18628346560";
		mydll.StartDial(0,s);
	}*/
	
	@ResponseBody
	@RequestMapping(value="addCall", produces="text/html;charset=UTF-8")
	public String addCallRecord(CallRecord call,HttpServletRequest request){
		try{
			//获取各个参数并构造成一个callrecord对象
			Date time = du.str2Date(request.getParameter("time"), "yyyy-MM-dd,HH时mm分ss秒");
			String caller = request.getParameter("caller");
			String called = request.getParameter("called");
			String id = request.getParameter("id");
			String timelong = request.getParameter("timelong");
			
			callservice.addCallRecord(new CallRecord(id,time,caller,called,timelong));
			return "通话记录成功";
		}catch(Exception e){
			e.printStackTrace();
			return "通话记录失败！";
		}
		
	}

	
	@ResponseBody
	@RequestMapping(value="deleteAll",produces="text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			String calls = request.getParameter("data");
//System.out.println("calls:" + calls);
			callservice.deleteAll(calls);
			return "删除成功";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败!";
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value="findByParams", produces="text/json;charset=UTF-8")
	public String findByParams(HttpServletRequest request){
		try{
			String caller = request.getParameter("caller");
			String called = request.getParameter("called");
//System.out.println("caller:" + caller);
			Date start_date = du.str2Date(request.getParameter("start_date"), "yyyy-MM-dd,HH时mm分ss秒");
			Date end_date = du.str2Date(request.getParameter("end_date"), "yyyy-MM-dd,HH时mm分ss秒");
			String start  = request.getParameter("start");
			String limit = request.getParameter("limit");
//System.out.println("起始时间:" + start_date);
//System.out.println("limit:" + limit);
			return callservice.findByParams(caller,called,start_date,end_date,start, limit);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value="sendMsg",produces="text/json;charset=UTF-8")
	public String sendMsg(HttpServletRequest request){
		try{
			String called = request.getParameter("called");
//System.out.println("呼叫" + called);	
			//new SendMsg().send(called);
		}catch(Exception e){
			e.printStackTrace();
			return "信息发送失败！";
		}
		return "信息发送成功！";
	} 
	
	
	
	@InitBinder   
    public void initBinder(WebDataBinder binder) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd,HH时mm分ss秒");   
        dateFormat.setLenient(false);
        //定义指定日期格式的本地日期解析/编辑器
        CustomDateEditor dateEditor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, dateEditor);   
    }
}
