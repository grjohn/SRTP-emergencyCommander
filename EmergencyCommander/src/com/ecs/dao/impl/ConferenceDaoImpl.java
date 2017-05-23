package com.ecs.dao.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.ecs.dao.ConferenceDao;
import com.ecs.model.Conference;
import com.ecs.model.EventInformation;

@Repository(value="conferencedao")
public class ConferenceDaoImpl implements ConferenceDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	
	private static int total;

	@Override
	public void addConference(Conference conference) {
		sf.getCurrentSession().save(conference);
	}

	@Override
	public void deleteAll(Conference[] conferences) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<conferences.length; i++){
				session.delete(conferences[i]);
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
	public void updateConference(Conference conference) {
		sf.getCurrentSession().update(conference);
	}

	@Override
	public void updateAll(Conference[] conferences) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<conferences.length; i++){
				session.update(conferences[i]);
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
	public List<Conference> findByParams(String ename, String type,String level, Date start_date, Date end_date, int start, int limit){
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(EventInformation.class);//相当于from eventinformation
		criteria.add(Restrictions.between("htime", start_date, end_date));
		if(ename != null && ename != ""){
			criteria.add(Restrictions.eq("ename", ename));
		}
		if(type != null && type != ""){
			criteria.add(Restrictions.eq("type", type));
		}
		if(level != null && level != ""){
			criteria.add(Restrictions.eq("level", level));
		}
		total = criteria.list().size();
		
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
		criteria.addOrder(Order.asc("time"));
		return criteria.list();
	}

	@Override
	public List<Conference> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from Conference order by time asc";
		Query query = session.createQuery(hql);
		total = query.list().size();
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}
	
	public int getTotal(){
		return this.total;
	}


}
