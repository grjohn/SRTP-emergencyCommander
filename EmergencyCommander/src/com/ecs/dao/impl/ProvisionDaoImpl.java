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

import com.ecs.dao.ProvisionDao;
import com.ecs.model.Provision;
import com.ecs.model.EventInformation;

@Repository(value="provisiondao")
public class ProvisionDaoImpl implements ProvisionDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	
	private static int total = 0;

	@Override
	public void addProvision(Provision provision) {
		sf.getCurrentSession().save(provision);
	}

	@Override
	public void deleteAll(Provision[] provisions) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<provisions.length; i++){
				session.delete(provisions[i]);
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
	public void updateProvision(Provision provision) {
		sf.getCurrentSession().update(provision);
	}

	@Override
	public void updateAll(Provision[] provisions) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<provisions.length; i++){
				session.update(provisions[i]);
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
	 * 使用QBC查询
	 */
	@Override
	public List<Provision> findByParams(String ename, String type,String level, Date start_date, Date end_date, int start, int limit){
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
	public List<Provision> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from Provision order by time asc";
		Query query = session.createQuery(hql);
		//获取记录总数
		total = query.list().size();
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}
	
	public int getTotal(){
		return this.total;
	}


}
