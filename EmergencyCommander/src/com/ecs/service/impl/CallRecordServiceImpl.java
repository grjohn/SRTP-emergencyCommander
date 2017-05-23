package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.CallRecordDao;
import com.ecs.model.CallRecord;
import com.ecs.service.CallRecordService;
import com.ecs.util.JsonBuilder;

@Service(value="callservice")
public class CallRecordServiceImpl implements CallRecordService{
	private static JsonBuilder jb = new JsonBuilder(); 
	
	
	@Resource(name="calldao")
	private CallRecordDao calldao;

	@Override
	public void addCallRecord(CallRecord call) {
		calldao.addCallRecord(call);
	}

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		CallRecord[] CallRecords = (CallRecord[])jb.json2Objects(json, "call");
		calldao.deleteAll(CallRecords);
	}

	@Override
	public String findByParams(String caller,String called, Date start_date, Date end_date, String start, String limit) {
		
		List<?> list =  calldao.findByParams(caller, called, start_date, end_date,Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		return jb.list2json(list, total);
	}

	public int getTotal(){
		return calldao.getTotal();
	}

}
