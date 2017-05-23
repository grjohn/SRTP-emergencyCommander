package com.ecs.service;


import com.ecs.model.User;

public interface UserService {

	
	public void deleteAll(String user);
	
	public void saveorupdate(User user);
	
	public String findAll(String start, String limit);
	
	public String findrole();
	
	public String findUser(String username, String password);
	
	public String loadMainMenu(int roleid);
	
}
