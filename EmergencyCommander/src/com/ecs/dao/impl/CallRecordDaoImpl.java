package com.ecs.dao.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.ecs.dao.CallRecordDao;
import com.ecs.model.CallRecord;

@Repository(value="calldao")
public class CallRecordDaoImpl implements CallRecordDao{
	
	@Resource(name="sf")
	private SessionFactory sf;

	private static int total = 0;
	
	@Override
	public void addCallRecord(CallRecord call) {
		sf.getCurrentSession().save(call);
	}

	@Override
	public void deleteAll(CallRecord[] calls) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<calls.length; i++){
				session.delete(calls[i]);
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
	public List<CallRecord> findByParams(String caller,String called, Date start_date, Date end_date, int start, int limit){
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(CallRecord.class);//相当于from eventinformation
		criteria.add(Restrictions.between("time", start_date, end_date));
		if(caller != null && caller != ""){
			criteria.add(Restrictions.eq("caller", caller));
		}
		if(called != null && called != ""){
			criteria.add(Restrictions.eq("called", called));
		}
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
