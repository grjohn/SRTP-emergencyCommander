package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.Provision;


public interface ProvisionDao {
	
	public void addProvision(Provision provision);
	
	public void deleteAll(Provision[] provisions);
	
	public void updateProvision(Provision provision);
	
	public void updateAll(Provision[] provisions);
	
	public List<Provision> findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
	
	public List<Provision> findAll(int start, int limit);
	
	public int getTotal();
	
}
