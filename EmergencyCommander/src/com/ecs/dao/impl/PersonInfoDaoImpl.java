package com.ecs.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.ecs.dao.PersonInfoDao;
import com.ecs.model.PersonInfo;

@Repository(value="personInfodao")
public class PersonInfoDaoImpl implements PersonInfoDao{
	
	@Resource(name="sf")
	private SessionFactory sf;

	private static int total = 0;
	
	@Override
	public void addPerson(PersonInfo person) {
		sf.getCurrentSession().save(person);
	}

	@Override
	public void deleteAll(PersonInfo[] persones) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<persones.length; i++){
				session.delete(persones[i]);
				if((i+1) == 20){
					session.flush();
					session.clear();
				}
			}
			ts.commit();
		}catch(Exception e){
			e.printStackTrace();
			ts.rollback();
		}finally{
			if(session != null){
				session.close();
			}
		}
	}

	@Override
	public void updatePerson(PersonInfo persone) {
		sf.getCurrentSession().update(persone);
	}

	@Override
	public void updateAll(PersonInfo[] persones) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<persones.length; i++){
				session.update(persones[i]);
				if((i+1) == 20){
					session.flush();
					session.clear();
				}
			}
			ts.commit();
		}catch(Exception e){
			e.printStackTrace();
			ts.rollback();
		}finally{
			if(session != null){
				session.close();
			}
		}
	}

	/**
	 * QBC查询
	 */
	@Override
	public List<PersonInfo> findByParams(String did, int start, int limit){
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(PersonInfo.class);//相当于from eventinformation
		criteria.add(Restrictions.eq("did", did));
		total = criteria.list().size();
		criteria.addOrder(Order.asc("id"));
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
		return criteria.list();
	}

	@Override
	public int getTotal() {
		return total;
	}

	


}
