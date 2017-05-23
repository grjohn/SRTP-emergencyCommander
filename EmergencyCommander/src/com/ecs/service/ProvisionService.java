package com.ecs.service;

import java.util.Date;

import com.ecs.model.Provision;

public interface ProvisionService {

	
	public void addProvision(Provision provision);
	
	public void deleteAll(String provisions);
	
	public void updateProvision(Provision provision);
	
	public void updateAll(String provisions);
	
	public String findAll(String start, String limit);
	
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
}
