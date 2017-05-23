package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.OnDutyManage;

public interface OnDutyDao {

	public boolean addduty(OnDutyManage om);
	public  List<OnDutyManage> findAll(String start, String limit);
	public int getTotal();
	
	public void updateAll(OnDutyManage[] oms);
	
	public void deleteAll(OnDutyManage[] oms);
	
	public void update(OnDutyManage om);
	
	public List<OnDutyManage> findByParams(String name,Date start_date,Date end_date,String shift,String start, String limit);
}
