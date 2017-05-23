package com.ecs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.ContactDao;
import com.ecs.dto.ContactMenu;
import com.ecs.model.Contact;
import com.ecs.model.Organization;
import com.ecs.service.ContactService;
import com.ecs.util.JsonBuilder;
import com.ecs.util.MenuUtil;

@Service(value="contactservice")
public class ContactServiceImpl implements ContactService{

	@Resource(name="contactdao")
	private ContactDao contactdao;
	
	private static JsonBuilder jb = new JsonBuilder();
	
	@Override
	public String loadMenu() {
		@SuppressWarnings("unchecked")
		List<Organization> list = (List<Organization>)contactdao.loadMenu();
		List<ContactMenu> treelist = new MenuUtil().menu2Tree(list,"0");
//System.out.print(treelist.get(1).getText());
		String json = jb.treelist2json(treelist);
		return json;
	}

	@Override
	public String findById(String id) {
		List list = contactdao.findById(id);
		if(list != null && list.size() != 0){
			return jb.object2json(list.get(0));
		}else{
			return null;
		}
	}

	@Override
	public void saveorupdate(Contact contact) {
		contactdao.saveorupdate(contact);
	}

}
