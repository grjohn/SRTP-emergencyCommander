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

import com.ecs.dao.OnDutyDao;
import com.ecs.model.OnDutyManage;

@Repository(value="ondutydao")
public class OnDutyDaoImpl implements OnDutyDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	
	private static int total;//用于记录取到的记录数

	@Override
	public boolean addduty(OnDutyManage om) {
		try{
			sf.getCurrentSession().save(om);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		} 
		
	}
	
	@Override
	public void updateAll(OnDutyManage[] oms) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		OnDutyManage om;
		//开启事务管理
		try{
			for(int i=0; i<oms.length; i++){
				om = oms[i];
				session.update(om);
				if((i+1)%20 == 0){
					session.flush();
					session.clear();
				}
			}
			ts.commit();
		}catch(Exception e){
			e.printStackTrace();
			ts.rollback();
		}finally{
			session.close();
		}
	}

	@Override
	public void deleteAll(OnDutyManage[] oms) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		OnDutyManage om;
		try{
			for(int i=0; i< oms.length; i++){
				om = oms[i];
				session.delete(om);
				if((i+1) == 20){
					session.flush();
					session.clear();
				}
			}
			ts.commit();
		}catch(Exception e){
			ts.rollback();
		}finally{
			session.close();
		}
	}

	@Override
	public void update(OnDutyManage om) {
		sf.getCurrentSession().update(om);
	}
	
	@Override
	public List<OnDutyManage> findAll(String start, String limit) {
		int s = Integer.parseInt(start);
		int l = Integer.parseInt(limit);
		String sql = "from OnDutyManage order by date asc";
		Query query = sf.getCurrentSession().createQuery(sql);
		total = query.list().size();
		query.setFirstResult(s);
		query.setMaxResults(l);
		List<OnDutyManage> list = query.list();
//System.out.println(list.size());
		return list;
	}

	@Override
	public List<OnDutyManage> findByParams(String name, Date start_date, Date end_date,String shift, String start, String limt) {
		Session session = sf.getCurrentSession();
//System.out.println(name);
		Criteria c = session.createCriteria(OnDutyManage.class);
		c.add(Restrictions.between("date", start_date, end_date));
		if(name != null && name != ""){
			c.add(Restrictions.eq("name", name));
		}
		if(shift != null && shift != ""){
			c.add(Restrictions.eq("shift", shift));
		}
		int start1 = Integer.parseInt(start);
		int limit1 = Integer.parseInt(limt);
		total = c.list().size();
		c.setFirstResult(start1);
		c.setMaxResults(limit1);
		c.addOrder(Order.asc("date"));
		List<OnDutyManage> list = c.list();
		return list;
	}
	
	
	public int getTotal(){
		return total;
	}

}
