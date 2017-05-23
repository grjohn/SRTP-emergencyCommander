package com.ecs.service;

import java.util.Date;

import com.ecs.model.EventInformation;

public interface EventService {

	
	public void addEvent(EventInformation event);
	
	public void deleteAll(String events);
	
	public void updateEvent(EventInformation event);
	
	public void updateAll(String events);
	
	public String findAll(String start, String limit);
	
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
}
