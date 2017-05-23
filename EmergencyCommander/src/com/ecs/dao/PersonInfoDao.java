package com.ecs.dao;

import java.util.List;

import com.ecs.model.PersonInfo;


public interface PersonInfoDao {
	
	public void addPerson(PersonInfo person);
	
	public void deleteAll(PersonInfo[] persons);
	
	public void updatePerson(PersonInfo person);
	
	public void updateAll(PersonInfo[] persons);
	
	public List<PersonInfo> findByParams(String did,int start, int limit);
	public int getTotal();
	
}
