package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.WorkStatusDao;
import com.ecs.model.WorkStatus;
import com.ecs.service.WorkStatusService;
import com.ecs.util.JsonBuilder;

@Service(value="workstatusservice")
public class WorkStatusServiceImpl implements WorkStatusService{
	private static JsonBuilder jb = new JsonBuilder(); 
	
	
	@Resource(name="workstatusdao")
	private WorkStatusDao workstatusdao;

	@Override
	public void addStatus(WorkStatus status) {
		workstatusdao.addStatus(status);
	}

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		WorkStatus[] statuses = (WorkStatus[])jb.json2Objects(json, "status");
		workstatusdao.deleteAll(statuses);
	}

	@Override
	public void updateStatus(WorkStatus status) {
		workstatusdao.updateStatus(status);
	}

	@Override
	public void updateAll(String json) {
		WorkStatus[] statuses = (WorkStatus[])jb.json2Objects(json, "status");
		workstatusdao.updateAll(statuses);
	}

	@Override
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit) {
		List<?> list =  workstatusdao.findByParams(ename, type, level, start_date, end_date, start, limit);
		int total = list.size();
		return jb.list2json(list, total);
	}

	@Override
	public String findAll(String start, String limit) {
		List<WorkStatus> list = workstatusdao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		String json = jb.list2json(list, total);
		return json;
	}
	
	public int getTotal(){
		return workstatusdao.getTotal();
	}

}
