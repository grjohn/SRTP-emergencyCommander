package com.ecs.service;

import java.util.Date;

import com.ecs.model.Conference;

public interface ConferenceService {

	
	public void addConference(Conference conference);
	
	public void deleteAll(String conferences);
	
	public void updateConference(Conference conference);
	
	public void updateAll(String conferences);
	
	public String findAll(String start, String limit);
	
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit);
}
