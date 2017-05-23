package com.ecs.dao;

import java.util.Date;
import java.util.List;

import com.ecs.model.CallRecord;


public interface CallRecordDao {
	
	public void addCallRecord(CallRecord call);
	
	public void deleteAll(CallRecord[] calls);
	
	
	public List<CallRecord> findByParams(String caller,String called, Date start_date, Date end_date,int start, int limit);
	public int getTotal();
	
}
