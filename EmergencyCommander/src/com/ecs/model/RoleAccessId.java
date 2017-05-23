package com.ecs.model;


/**
 * role与access表的联合主键类
 *
 */
public class RoleAccessId implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Integer accessid;
	private Integer roleid;
	
	public RoleAccessId(String roleid, String accessid){
		this.accessid = Integer.parseInt(accessid);
		this.roleid = Integer.parseInt(roleid);
	}
	
	public Integer getAccessid() {
		return accessid;
	}
	public void setAccessid(Integer accessid) {
		this.accessid = accessid;
	}
	public Integer getRoleid() {
		return roleid;
	}
	public void setRoleid(Integer roleid) {
		this.roleid = roleid;
	}
	
	@Override
	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof RoleAccessId))
			return false;
		RoleAccessId castOther = (RoleAccessId) other;

		return ((this.getRoleid() == castOther.getRoleid()) || 
				(this.getRoleid() != null&& castOther.getRoleid() != null && this.getRoleid().equals(
				castOther.getRoleid())))
				&& ((this.getAccessid() == castOther.getAccessid()) || (this.getAccessid() != null
						&& castOther.getAccessid() != null && this
						.getAccessid().equals(castOther.getAccessid())));
	}

	@Override
	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getRoleid() == null ? 0 : this.getRoleid().hashCode());
		result = 37 * result
				+ (getAccessid() == null ? 0 : this.getAccessid().hashCode());
		return result;
	}
}
