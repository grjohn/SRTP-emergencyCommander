package com.ecs.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.ecs.dao.UserDao;
import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.User;

@Repository(value="userdao")
public class UserDaoImpl implements UserDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	
	private static int total = 0;

	

	@Override
	public void deleteAll(User[] users) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<users.length; i++){
				session.delete(users[i]);
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
	public List<User> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from User order by roleid asc";
		Query query = session.createQuery(hql);
		//获取记录总数
		total = query.list().size();
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}
	
	public int getTotal(){
		return total;
	}

	@Override
	public List<Role> findrole() {
		String hql = "from Role";
		Session session = sf.getCurrentSession();
		Query query = session.createQuery(hql);
		return query.list();
	}

	@Override
	public void saveorupdate(User user) {
		Session session = sf.getCurrentSession();
		session.saveOrUpdate(user);
	}

	@Override
	public List<Access> findAccessByIds(List<Integer> ids) {
		Session session = sf.getCurrentSession();
		String hql = "from Access where accessid in(";
		for(int i=0; i<ids.size(); i++){
			if(i != 0){
				hql += ",";
			}
			hql = hql + ids.get(i);
		}
		hql += ")";
//System.out.println(hql);
		@SuppressWarnings("unchecked")
		//获取到该角色的所有权限
		List<Access> list = (List<Access>) session.createQuery(hql).list();
//System.out.println(list.get(1).getAname());
		return list;
	}



	@Override
	public String findUser(String username, String password) {
		Session session = sf.getCurrentSession();
		Query query = session.createQuery("from User where name= ? and password= ?");
		query.setParameter(0, username);
		query.setParameter(1, password);
		List list = query.list();
		if(list != null && list.size() != 0){
			User user = (User)list.get(0);
			return String.valueOf(user.getRoleid());
		}else{return null;}
		
	}
}
