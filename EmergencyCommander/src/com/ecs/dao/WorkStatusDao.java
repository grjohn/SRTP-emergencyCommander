package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.WorkStatus;


public interface WorkStatusDao {
	
	public void addStatus(WorkStatus Status);
	
	public void deleteAll(WorkStatus[] Statuss);
	
	public void updateStatus(WorkStatus Status);
	
	public void updateAll(WorkStatus[] Statuss);
	
	public List<WorkStatus> findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
	
	public List<WorkStatus> findAll(int start, int limit);
	public int getTotal();
	
}
