package com.ecs.service;

import java.util.Date;

import com.ecs.model.CallRecord;



public interface CallRecordService {

	
	public void addCallRecord(CallRecord call);
	
	public void deleteAll(String calls);
	
	public String findByParams(String caller,String called, Date start_date, Date end_date, String start, String limit);
}
