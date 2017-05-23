package com.ecs.service;

import java.util.Date;

import com.ecs.model.OnDutyManage;

public interface OnDutyService {
	
	public boolean addduty(OnDutyManage om);
	public String findAll(String start, String limit);
	
	public void updateAll(String json);
	
	public void deleteAll(String json);
	
	public void update(OnDutyManage om);
	public String findByParams(String name, Date start_date, Date end_date,String shift,String start,String limit);
}
