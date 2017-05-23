package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.EventDao;
import com.ecs.model.EventInformation;
import com.ecs.model.WorkStatus;
import com.ecs.service.EventService;
import com.ecs.util.JsonBuilder;

@Service(value="eventservice")
public class EventServiceImpl implements EventService{
	private static JsonBuilder jb = new JsonBuilder(); 

	@Resource(name="eventdao")
	private EventDao eventdao;

	@Override
	public void addEvent(EventInformation event) {
		eventdao.addEvent(event);
	}

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		EventInformation[] events = (EventInformation[])jb.json2Objects(json, "event");
		eventdao.deleteAll(events);
	}

	@Override
	public void updateEvent(EventInformation event) {
		eventdao.updateEvent(event);
	}

	@Override
	public void updateAll(String json) {
		EventInformation[] events = (EventInformation[])jb.json2Objects(json, "event");
		eventdao.updateAll(events);
	}

	@Override
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit) {
		List<?> list =  eventdao.findByParams(ename, type, level, start_date, end_date, start, limit);
		int total = eventdao.getTotal();
		return jb.list2json(list, total);
	}

	@Override
	public String findAll(String start, String limit) {
		List<EventInformation> list = eventdao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = eventdao.getTotal();
//System.out.println(total);
		String json = jb.list2json(list, total);
		return json;
	}

}
