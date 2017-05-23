package com.ecs.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.ecs.dao.ContactDao;
import com.ecs.model.Contact;

@Repository(value="contactdao")
public class ContactDaoImpl implements ContactDao{

	@Resource(name="sf")
	private SessionFactory sf;

	@Override
	public List<?> loadMenu() {
		return sf.getCurrentSession().createQuery("from Organization").list();
	}

	@Override
	public List findById(String id) {
		List list = sf.getCurrentSession().createQuery("from Contact where id=" + id).list();
		return list;
	}

	@Override
	public void saveorupdate(Contact contact) {
		Session session = sf.getCurrentSession();
		session.saveOrUpdate(contact);
	}
}
