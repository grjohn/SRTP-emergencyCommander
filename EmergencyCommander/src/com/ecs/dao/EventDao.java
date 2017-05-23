package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.Conference;
import com.ecs.model.EventInformation;

public interface EventDao {
	
	public void addEvent(EventInformation event);
	
	public void deleteAll(EventInformation[] events);
	
	public void updateEvent(EventInformation event);
	
	public void updateAll(EventInformation[] events);
	
	public List<EventInformation> findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
	
	public List<EventInformation> findAll(int start, int limit);
	
	public int getTotal();
}
