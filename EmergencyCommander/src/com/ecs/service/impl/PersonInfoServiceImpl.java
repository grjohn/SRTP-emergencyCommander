package com.ecs.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.PersonInfoDao;
import com.ecs.model.PersonInfo;
import com.ecs.service.PersonInfoService;
import com.ecs.util.JsonBuilder;

@Service(value="personInfoservice")
public class PersonInfoServiceImpl implements PersonInfoService{
	private static JsonBuilder jb = new JsonBuilder(); 
	
	@Resource(name="personInfodao")
	private PersonInfoDao personInfodao;

	@Override
	public void addPerson(PersonInfo person) {
		personInfodao.addPerson(person);
	}

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		PersonInfo[] persons = (PersonInfo[])jb.json2Objects(json, "Person");
		personInfodao.deleteAll(persons);
	}

	@Override
	public void updatePerson(PersonInfo person) {
		personInfodao.updatePerson(person);
	}

	@Override
	public void updateAll(String json) {
		PersonInfo[] persons = (PersonInfo[])jb.json2Objects(json, "person");
		personInfodao.updateAll(persons);
	}

	@Override
	public String findByParams(String did,String start, String limit) {
		
		List<?> list =  personInfodao.findByParams(did,Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		return jb.list2json(list, total);
	}

	public int getTotal(){
		return personInfodao.getTotal();
	}

}
