package com.ecs.dao.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.ecs.dao.ChartDao;
import com.ecs.dto.Rough_levelDTO;
import com.ecs.model.EventInformation;

@Repository(value="chartdao")
public class ChartDaoImpl implements ChartDao{
	
	@Resource(name="sf")
	private SessionFactory sf;


	private static int total = 0;
	
	/**
	 * QBC查询
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<EventInformation> getEventByParams(Date start_date,Date end_date) {
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(EventInformation.class);
		criteria.add(Restrictions.between("htime", start_date, end_date));
		criteria.addOrder(Order.asc("htime"));
		return criteria.list();
	}

	@Override
	public List<EventInformation> getEventByParams(String level, String type,Date start_date, Date end_date) {
		Session session = sf.getCurrentSession();
		Criteria criteria = session.createCriteria(EventInformation.class);
		criteria.add(Restrictions.between("htime", start_date, end_date));
		criteria.addOrder(Order.asc("htime"));
		if(level != null && level != ""){
			criteria.add(Restrictions.eq("level", level));
		}
		if(type != null && type != ""){
			criteria.add(Restrictions.eq("type", type));
		}
		List list = criteria.list();
		if(list != null && list.size() != 0){
			total = list.size();
		}
		return list;
	}
	
	public EventInformation findById(String id){
		Session session = sf.getCurrentSession();
		String hql = "from EventInformation where id=" + id;
		return (EventInformation) session.createQuery(hql).list().get(0);
	}

	public int getTotal(){
		return total;
	}
}
