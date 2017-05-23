package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.Conference;


public interface ConferenceDao {
	
	public void addConference(Conference conference);
	
	public void deleteAll(Conference[] conferences);
	
	public void updateConference(Conference conference);
	
	public void updateAll(Conference[] conferences);
	
	public List<Conference> findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
	
	public List<Conference> findAll(int start, int limit);
	/**
	 * 获取总数
	 * @return
	 */
	public int getTotal();
	
}
