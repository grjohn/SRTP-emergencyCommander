package com.ecs.service;

import java.util.Date;


public interface ChartService {
	
	
	public String rough_level(Date start_date, Date end_date);
	
	public String rough_type(Date start_date, Date end_date);
	
	public String pie_level(Date start_date, Date end_date);
	
	public String pie_type(Date start_date, Date end_date);
	
	public String at_level(String level, String type, Date start_date, Date end_date);
	
	public String at_type(String level, String type, Date start_date, Date end_date);
	
	public String findByParams(String level, String type, Date start_date, Date end_date);
	
	public String casualty(String id);
	
	public int getTotal();
}
