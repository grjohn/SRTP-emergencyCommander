package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.ConferenceDao;
import com.ecs.model.Conference;
import com.ecs.service.ConferenceService;
import com.ecs.util.JsonBuilder;

@Service(value="conferenceservice")
public class ConferenceServiceImpl implements ConferenceService{
	private static JsonBuilder jb = new JsonBuilder(); 
	
	@Resource(name="conferencedao")
	private ConferenceDao conferencedao;
	@Override
	public void addConference(Conference conference) {
		conferencedao.addConference(conference);
	}

	@Override
	public void deleteAll(String json) {
		Conference[] statuses = (Conference[])jb.json2Objects(json, "conference");
		conferencedao.deleteAll(statuses);
	}

	@Override
	public void updateConference(Conference conference) {
		conferencedao.updateConference(conference);
	}

	@Override
	public void updateAll(String json) {
		Conference[] statuses = (Conference[])jb.json2Objects(json, "conference");
		conferencedao.updateAll(statuses);
	}

	@Override
	public String findByParams(String ename, String type, String level, Date start_date, Date end_date, int start, int limit) {
		List<?> list =  conferencedao.findByParams(ename, type, level, start_date, end_date, start, limit);
		int total = list.size();
		return jb.list2json(list, total);
	}

	@Override
	public String findAll(String start, String limit) {
		List<Conference> list = conferencedao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		String json = jb.list2json(list, total);
		return json;
	}
	
	public int getTotal(){
		return conferencedao.getTotal();
	}

}
