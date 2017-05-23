package com.ecs.dao;

import java.util.List;

import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.User;


public interface UserDao {
	
	
	public void deleteAll(User[] users);
	
	public void saveorupdate(User user);
	
	
	public List<User> findAll(int start, int limit);
	
	public List<Role> findrole();
	
	public List<Access> findAccessByIds(List<Integer> ids);
	
	public String findUser(String username, String password);
	
	
	public int getTotal();
	
}
