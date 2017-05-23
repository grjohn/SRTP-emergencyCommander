package com.ecs.util;

import java.util.ArrayList;
import java.util.List;

import com.ecs.dto.ContactMenu;
import com.ecs.dto.MainMenuDTO;
import com.ecs.dto.TreeNodeDTO;
import com.ecs.model.Access;
import com.ecs.model.Organization;


public class MenuUtil {
/*************************************************通讯录树相关*******************************************************/	
	public List<ContactMenu> menu2Tree(List<Organization> list, String pid){
		
		List<ContactMenu> result = new ArrayList<ContactMenu>();
//System.out.println("pid:"+pid);
		List<Organization> children = this.findChildren(list, pid);
		//ContactMenu cm = new ContactMenu();
		for(Organization child : children){
			ContactMenu cm = new ContactMenu();
			cm.setId(child.getId());
			cm.setText(child.getName());
			cm.setIconCls(child.getIconCls());
			cm.setLeaf(child.isIsleaf());
			if(!child.isIsleaf()){
//System.out.println("id:"+child.getId());
				cm.setChildren(this.menu2Tree(list,child.getId()));
			}else{
				cm.setChildren(null);
			}
			result.add(cm);
		}
		return result;
	} 
	
	public List<Organization> findChildren(List<Organization> list, String pid){
		List<Organization> result = new ArrayList<Organization>();
		for(Organization org : list){
			if(org.getPid() != null &&org.getPid().equalsIgnoreCase(pid)){
				result.add(org);
			}
		}
		return result;
	}
/*******************************************************权限树相关*************************************************/	
public List<TreeNodeDTO> access2Tree(List<Access> list, List roleaccess, int pid){
		
		List<TreeNodeDTO> result = new ArrayList<TreeNodeDTO>();
		List<Access> children = this.findChildrenNode(list, pid);
		for(Access child : children){
			TreeNodeDTO node = new TreeNodeDTO();
			node.setId(child.getAccessid());
			if(roleaccess.contains(child.getAccessid())){
				node.setChecked(true);
			}else{
				node.setChecked(false);
			}
			node.setIconCls(child.getIcon());
			node.setText(child.getAname());
			node.setLeaf(child.getLeaf());
			if(!child.getLeaf()){//若还有儿子，递归调用
//System.out.println("id:"+child.getId());
				node.setChildren(this.access2Tree(list, roleaccess, child.getAccessid()));
			}else{
				node.setChildren(null);
			}
			result.add(node);
		}
		return result;
	} 
	
	public List<Access> findChildrenNode(List<Access> list, int pid){
		List<Access> result = new ArrayList<Access>();
		for(Access access : list){
			if(access.getPid() != -1 && access.getPid() == pid){
				result.add(access);
			}
		}
		return result;
	}
	
/******************************************************主菜单树相关*******************************************************/
	
	public List<MainMenuDTO> mainmenu2tree(List<Access> accesslist, int pid){
		List<MainMenuDTO> result = new ArrayList<MainMenuDTO>();
		List<Access> children = this.findChildrenAccess(accesslist, pid);
		for(Access child : children){
			MainMenuDTO mmd = new MainMenuDTO();
			mmd.setId(child.getAccessid());
			mmd.setText(child.getAname());
			mmd.setIconCls(child.getIcon());
			mmd.setLeaf(child.getLeaf());
			mmd.setUrl(child.getAccessurl());
			if(!child.getLeaf()){//若非叶子节点，则递归调用
				mmd.setChildren(this.mainmenu2tree(accesslist, child.getAccessid()));
			}else{
				mmd.setChildren(null);
			}
			result.add(mmd);
		}
		return result;
	}
	
	public List<Access> findChildrenAccess(List<Access> list, int pid){
		List<Access> result = new ArrayList<Access>();
		for(Access access : list){
			if(access.getPid() == pid){
				result.add(access);
			}
		}
		return result;
	}
	
}
