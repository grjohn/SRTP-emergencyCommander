package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.OnDutyDao;
import com.ecs.model.OnDutyManage;
import com.ecs.service.OnDutyService;
import com.ecs.util.JsonBuilder;

@Service(value="ondutyservice")
public class OnDutyServiceImpl implements OnDutyService{
	public static JsonBuilder jb = new JsonBuilder();
	
	@Resource(name="ondutydao")
	private OnDutyDao ondutydao;

	@Override
	public boolean addduty(OnDutyManage om) {
		if(ondutydao.addduty(om)){
			return true;
		}else{return false;}
	}

	@Override
	public String findAll(String start, String limit) {
		List<OnDutyManage> list = ondutydao.findAll(start, limit);
		int total = ondutydao.getTotal();
		String json = jb.list2json(list,total);
		return json;
	}

	@Override
	public void updateAll(String json) {
		OnDutyManage[] oms = (OnDutyManage[])jb.json2Objects(json, "onduty");
		ondutydao.updateAll(oms);
		//System.out.println(oms[0]);
	}

	@Override
	public void deleteAll(String json) {
		OnDutyManage[] oms = (OnDutyManage[])jb.json2Objects(json, "onduty");
		ondutydao.deleteAll(oms);
	}

	@Override
	public void update(OnDutyManage om) {
		ondutydao.update(om);
	}

	@Override
	public String findByParams(String name, Date start_date, Date end_date, String shift, String start, String limit) {
		List<OnDutyManage> list = ondutydao.findByParams(name, start_date, end_date, shift,start, limit);
		int total = this.getTotal();
		String json = jb.list2json(list,total);
		return json;
	}

	private int getTotal() {
		return ondutydao.getTotal();
	}
	
}
