package com.ecs.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.RoleDao;
import com.ecs.dao.UserDao;
import com.ecs.dto.ComboDTO;
import com.ecs.dto.MainMenuDTO;
import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.User;
import com.ecs.service.UserService;
import com.ecs.util.JsonBuilder;
import com.ecs.util.MenuUtil;

@Service(value="userservice")
public class UserServiceImpl implements UserService{
	//json串构造工具类
	private static JsonBuilder jb = new JsonBuilder();
	
	@Resource(name="userdao")
	private UserDao userdao;
	
	@Resource(name="roledao")
	private RoleDao roledao;
	

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		User[] users = (User[])jb.json2Objects(json, "user");
		userdao.deleteAll(users);
	}

	@Override
	public void saveorupdate(User user) {
		userdao.saveorupdate(user);
	}

	
	@Override
	public String findAll(String start, String limit) {
		List<User> list = userdao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		String json = jb.list2json(list, total);
		return json;
	}
	
	public String findrole(){
		List<Role> list = userdao.findrole();
		if(list != null){
			List<ComboDTO> result = new ArrayList<ComboDTO>();
			for(Role r : list){
				ComboDTO combo = new ComboDTO();
				combo.setKey(r.getId());
				combo.setValue(r.getRolename());
				result.add(combo);
			}
			String json = jb.list2json(result);
//System.out.println(json);
			return json;
		}else{
			return null;
		}
	}
	
	public int getTotal(){
		return userdao.getTotal();
	}

	@Override
	public String loadMainMenu(int roleid) {
		List<Integer> list = roledao.findAccessByRoleId(roleid);
		List<Access> accesslist = userdao.findAccessByIds(list);
		List<MainMenuDTO> treelist = new MenuUtil().mainmenu2tree(accesslist, 0);
		String json = jb.list2json(treelist);
//System.out.println(json);
		return json;
	}

	@Override
	public String findUser(String username, String password) {
		String roleid = userdao.findUser(username, password);
		return roleid;
	}

}
