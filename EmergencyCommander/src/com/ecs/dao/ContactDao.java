package com.ecs.dao;

import java.util.List;

import com.ecs.model.Contact;

public interface ContactDao {
	
	
	public List<?> loadMenu();
	
	
	public List findById(String id);
	
	
	public void saveorupdate(Contact contact);
}
