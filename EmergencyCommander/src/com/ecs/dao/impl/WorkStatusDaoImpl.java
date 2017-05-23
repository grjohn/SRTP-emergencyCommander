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

import com.ecs.dao.WorkStatusDao;
import com.ecs.model.EventInformation;
import com.ecs.model.WorkStatus;

@Repository(value="workstatusdao")//仓库的意思,用于将数据访问层 (DAO 层 ) 的类标识为 Spring Bean
public class WorkStatusDaoImpl implements WorkStatusDao{
	
	@Resource(name="sf")//我们在bean中已经配置了这个，所以可用注解
	private SessionFactory sf;

	private static int total = 0;
	
	@Override
	public void addStatus(WorkStatus event) {
		sf.getCurrentSession().save(event);
	}

	@Override
	public void deleteAll(WorkStatus[] statuses) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<statuses.length; i++){
				session.delete(statuses[i]);
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
	public void updateStatus(WorkStatus event) {
		sf.getCurrentSession().update(event);
	}

	@Override
	public void updateAll(WorkStatus[] events) {
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

	
	@Override
	public List<WorkStatus> findByParams(String ename, String type,String level, Date start_date, Date end_date, int start, int limit){
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(EventInformation.class);
		criteria.add(Restrictions.between("htime", start_date, end_date));
		if(ename != null && ename != ""){
			//Criterion是一个接口,Restrictions是其一个实现子类
			criteria.add(Restrictions.eq("ename", ename));
		}
		if(type != null && type != ""){
			criteria.add(Restrictions.eq("type", type));
		}
		if(level != null && level != ""){
			criteria.add(Restrictions.eq("level", level));
		}
		total = criteria.list().size();
		criteria.addOrder(Order.asc("htime"));
		criteria.setFirstResult(start);
		criteria.setMaxResults(limit);
		return criteria.list();
	}

	@Override
	public List<WorkStatus> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from WorkStatus order by rtime asc";
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
