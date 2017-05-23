package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.ProvisionDao;
import com.ecs.model.Provision;
import com.ecs.service.ProvisionService;
import com.ecs.util.JsonBuilder;

@Service(value="provisionservice")
public class ProvisionServiceImpl implements ProvisionService{
	private static JsonBuilder jb = new JsonBuilder(); 
	
	@Resource(name="provisiondao")
	private ProvisionDao provisiondao;
	
	@Override
	public void addProvision(Provision provision) {
		provisiondao.addProvision(provision);
	}

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		Provision[] statuses = (Provision[])jb.json2Objects(json, "provision");
		provisiondao.deleteAll(statuses);
	}

	@Override
	public void updateProvision(Provision provision) {
		provisiondao.updateProvision(provision);
	}

	@Override
	public void updateAll(String json) {
		Provision[] statuses = (Provision[])jb.json2Objects(json, "provision");
		provisiondao.updateAll(statuses);
	}

	@Override
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit) {
		List<?> list =  provisiondao.findByParams(ename, type, level, start_date, end_date, start, limit);
		int total = list.size();
		return jb.list2json(list, total);
	}

	@Override
	public String findAll(String start, String limit) {
		List<Provision> list = provisiondao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		String json = jb.list2json(list, total);
		return json;
	}
	
	public int getTotal(){
		return provisiondao.getTotal();
	}

}
