package com.ecs.service;

import com.ecs.model.Contact;

public interface ContactService {
	
	
	public String loadMenu();

	public String findById(String id);
	
	public void saveorupdate(Contact contact);
}
