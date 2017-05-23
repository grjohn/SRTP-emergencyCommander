package com.ecs.service;

import java.util.Date;

import com.ecs.model.WorkStatus;

public interface WorkStatusService {

	
	public void addStatus(WorkStatus status);
	
	public void deleteAll(String statuses);
	
	public void updateStatus(WorkStatus status);
	
	public void updateAll(String statuses);
	
	public String findAll(String start, String limit);
	
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
}
