package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.EventInformation;


public interface ChartDao {

	public List<EventInformation> getEventByParams(Date start_date, Date end_date);
	
	public List<EventInformation> getEventByParams(String level, String type, Date start_date, Date end_date );
	
	public EventInformation findById(String id);
	
	public int getTotal();
}
