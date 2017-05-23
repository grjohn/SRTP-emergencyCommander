package com.ecs.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.ChartDao;
import com.ecs.model.EventInformation;
import com.ecs.service.ChartService;
import com.ecs.util.ChartUtil;
import com.ecs.util.DateUtil;
import com.ecs.util.JsonBuilder;

@Service(value="chartservice")
public class ChartServiceImpl implements ChartService{
	
	@Resource(name="chartdao")
	private ChartDao chartdao;
	private static JsonBuilder jb = new JsonBuilder();
	public DateUtil du = new DateUtil(); 
	public static ChartUtil cu = new ChartUtil();

	@Override
	public String rough_level(Date start_date, Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(start_date, end_date);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		c1.setTime(start_date);
		c2.setTime(end_date);
//System.out.println("startdate:"+start_date);
//System.out.println("enddate:"+end_date);
		int diff = (c2.get(Calendar.YEAR) - c1.get(Calendar.YEAR))*12 + (c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH));
		
		String json = cu.level2json(list,start_date,diff);
//System.out.println(json);
		return json;
	}

	@Override
	public String rough_type(Date start_date, Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(start_date, end_date);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		c1.setTime(start_date);
		c2.setTime(end_date);
//System.out.println("startdate:"+start_date);
//System.out.println("enddate:"+end_date);
		int diff = (c2.get(Calendar.YEAR) - c1.get(Calendar.YEAR))*12 + (c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH));
		String json = cu.type2json(list,start_date,diff);
//System.out.println(json);
		return json;
	}

	@Override
	public String pie_level(Date start_date, Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(start_date, end_date);
		return cu.levelpiejson(list);
	}

	@Override
	public String pie_type(Date start_date, Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(start_date, end_date);
		return cu.typepiejson(list);
	}
	
	@Override
	public String at_level(String level, String type, Date start_date,Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(level, type, start_date, end_date);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		c1.setTime(start_date);
		c2.setTime(end_date);
		int diff = (c2.get(Calendar.YEAR) - c1.get(Calendar.YEAR))*12 + (c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH));
		String json = cu.type2json(list, start_date, diff); 
		return json;
	}

	@Override
	public String at_type(String level, String type, Date start_date,Date end_date) {
		List<EventInformation> list = chartdao.getEventByParams(level, type, start_date, end_date);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		c1.setTime(start_date);
		c2.setTime(end_date);
		int diff = (c2.get(Calendar.YEAR) - c1.get(Calendar.YEAR))*12 + (c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH));
		String json = cu.level2json(list, start_date, diff); 
		return json;
	}
	
	@Override
	public String findByParams(String level, String type, Date start_date,Date end_date) {
		List list = chartdao.getEventByParams(level, type, start_date, end_date);
		int total = this.getTotal();
		return jb.list2json(list, total);
	}
	
	public String casualty(String id){
		EventInformation event = chartdao.findById(id);
		String json = cu.casualtyjson(event);
		return json;
	}
	
	@Override
	public int getTotal() {
		return chartdao.getTotal();
	}
}
