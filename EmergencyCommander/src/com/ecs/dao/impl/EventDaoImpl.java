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

import com.ecs.dao.EventDao;
import com.ecs.model.EventInformation;

@Repository(value="eventdao")
public class EventDaoImpl implements EventDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	private static int total;

	@Override
	public void addEvent(EventInformation event) {
		sf.getCurrentSession().save(event);
	}

	@Override
	public void deleteAll(EventInformation[] events) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<events.length; i++){
				session.delete(events[i]);
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
	public void updateEvent(EventInformation event) {
		sf.getCurrentSession().update(event);
	}

	@Override
	public void updateAll(EventInformation[] events) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<events.length; i++){
				session.update(events[i]);
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
	public List<EventInformation> findByParams(String ename, String type,String level, Date start_date, Date end_date, int start, int limit){
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(EventInformation.class);
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
		criteria.addOrder(Order.asc("htime"));
		return criteria.list();
	}

	@Override
	public List<EventInformation> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from EventInformation order by htime asc";
		Query query = session.createQuery(hql);
		total = query.list().size();
		
		query.setFirstResult(start);
		query.setMaxResults(limit);
//System.out.println(query.list().get(0));
		return query.list();
	}

	@Override
	public int getTotal() {
		return total;
	}

}
