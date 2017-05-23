package com.ecs.util;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.ecs.dto.ContactMenu;
import com.ecs.model.CallRecord;
import com.ecs.model.Conference;
import com.ecs.model.EventInformation;
import com.ecs.model.OnDutyManage;
import com.ecs.model.PersonInfo;
import com.ecs.model.Provision;
import com.ecs.model.Role;
import com.ecs.model.User;
import com.ecs.model.WorkStatus;

public class JsonBuilder {
	
	private static class JsonHolder{
		private static final JsonBuilder JSON_BUILDER = new JsonBuilder();
		private static ObjectMapper mapper = new ObjectMapper();
	}
	
	public String list2json(List list){
		try {
			return JsonHolder.mapper.writeValueAsString(list);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String list2json(List<?> list, int total){
		if(list != null && total!= 0){
			StringBuffer sb = new StringBuffer();
			sb.append("{total:" + total + ",root:[");
			Object obj = null;
			for(int i=0; i<list.size(); i++){
				try {
					obj = list.get(i);
					sb.append(JsonHolder.mapper.writeValueAsString(obj));
					if(i < total-1){
						sb.append(",");
					}
				} catch (JsonGenerationException e) {
					e.printStackTrace();
				} catch (JsonMappingException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			sb.append("]}");
			return sb.toString();
		}else return null;
	}

	public Object[] json2Objects(String json, String type){
//System.out.println("得到的json串："+json);
		if(type.equalsIgnoreCase("onduty")){
			return this.json2ondutylist(json);
		}else if(type.equalsIgnoreCase("event")){
			return this.json2eventlist(json);
		}else if(type.equalsIgnoreCase("status")){
			return this.json2statuslist(json);
		}else if(type.equalsIgnoreCase("conference")){
			return this.json2conferencelist(json);
		}else if(type.equalsIgnoreCase("provision")){
			return this.json2provisionlist(json);
		}else if(type.equalsIgnoreCase("person")){
			return this.json2personlist(json);
		}else if(type.equalsIgnoreCase("call")){
			return this.json2calllist(json);
		}else if(type.equalsIgnoreCase("user")){
			return this.json2userlist(json);
		}else if(type.equalsIgnoreCase("role")){
			return this.json2rolelist(json);
		}else{return null;}
	}
	
	private Role[] json2rolelist(String json){
		try {
			return JsonHolder.mapper.readValue(json, Role[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private User[] json2userlist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, User[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private CallRecord[] json2calllist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, CallRecord[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private PersonInfo[] json2personlist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, PersonInfo[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private Provision[] json2provisionlist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, Provision[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private Conference[] json2conferencelist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, Conference[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	private WorkStatus[] json2statuslist(String json) {
		try {
			return JsonHolder.mapper.readValue(json, WorkStatus[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	public OnDutyManage[] json2ondutylist(String json){
		try {
			return JsonHolder.mapper.readValue(json, OnDutyManage[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public EventInformation[] json2eventlist(String json){
		try {
			return JsonHolder.mapper.readValue(json, EventInformation[].class);
		} catch (JsonParseException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	public String treelist2json(List<ContactMenu> treelist){
		try {
//System.out.println(JsonHolder.mapper.writeValueAsString(treelist));
			return JsonHolder.mapper.writeValueAsString(treelist);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}


	public String object2json(Object obj){
		try {
			String json = JsonHolder.mapper.writeValueAsString(obj);
			return json;
		} catch (JsonGenerationException e) {
			e.printStackTrace();
			return null;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
