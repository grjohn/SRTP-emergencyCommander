package com.ecs.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.ecs.dao.RoleDao;
import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.RoleAccess;

@Repository(value="roledao")
public class RoleDaoImpl implements RoleDao{
	
	@Resource(name="sf")
	private SessionFactory sf;
	
	private static int total = 0;


	@Override
	public void deleteAll(Role[] roles) {
		Session session = sf.openSession();
		Transaction ts = session.beginTransaction();
		try{
			for(int i=0; i<roles.length; i++){
				session.delete(roles[i]);
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
	public List<Role> findAll(int start, int limit) {
		Session session = sf.getCurrentSession();
		String hql = "from Role order by id asc";
		Query query = session.createQuery(hql);
		//获取记录总数
		total = query.list().size();
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}
	
	@Override
	public void saveorupdate(Role role) {
		Session session = sf.getCurrentSession();
		session.saveOrUpdate(role);
	}
	
	public int getTotal(){
		return total;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Access> findAllAccess() {
		Session session = sf.getCurrentSession();
		return session.createQuery("from Access").list(); 
	}

	@Override
	public List<Integer> findAccessByRoleId(int roleid) {
		Session session = sf.getCurrentSession();
		String hql = "select accessid from RoleAccess where roleid=" + roleid; 
//System.out.println(hql);
		//System.out.println(session.createSQLQuery(hql).list().get(0).getClass());
		return session.createSQLQuery(hql).list(); 
	}

	@Override
	public void saveorupdate(RoleAccess ra) {
		Session session = sf.getCurrentSession();
		session.saveOrUpdate(ra);
	}



	@Override
	public void deleteRoleAccess(RoleAccess ra) {
		Session session = sf.getCurrentSession();
		session.delete(ra);
	}

}
