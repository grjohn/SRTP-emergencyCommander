package com.ecs.service;


import com.ecs.model.PersonInfo;

public interface PersonInfoService {

	
	public void addPerson(PersonInfo person);
	
	public void deleteAll(String persones);
	
	public void updatePerson(PersonInfo person);
	
	public void updateAll(String json);
	
	public String findByParams(String did, String start, String limit);
}
