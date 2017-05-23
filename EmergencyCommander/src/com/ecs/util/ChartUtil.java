package com.ecs.util;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.ecs.dto.Casualty;
import com.ecs.dto.LevelPieDTO;
import com.ecs.dto.Rough_levelDTO;
import com.ecs.dto.Rough_typeDTO;
import com.ecs.dto.TypePieDTO;
import com.ecs.model.EventInformation;


public class ChartUtil{
	
	//json转换工具类实例
	public static JsonBuilder jb = new JsonBuilder();

	public String level2json(List<EventInformation> list, Date start_month, int diff){
//System.out.println("list_size:" + list.size());
//System.out.println("diff:" + diff);
		int[][] data = this.levelData(list, start_month, diff);
		List<Rough_levelDTO> result = new ArrayList<Rough_levelDTO>();
		DateUtil du = new DateUtil();//创建日期根据对象
		Calendar basic = Calendar.getInstance();
		basic.setTime(start_month);
		Date date;
		for(int i=0; i<diff;i++){
			Rough_levelDTO rl = new Rough_levelDTO();
			date = basic.getTime();
			rl.setMonth(du.date2String(date, "yyyy-MM"));
			rl.setLevel1(data[i][0]);
			rl.setLevel2(data[i][1]);
			rl.setLevel3(data[i][2]);
			rl.setLevel4(data[i][3]);
			result.add(rl);
			basic.add(Calendar.MONTH, 1);
		}
		return jb.list2json(result);
	}
	
	public String type2json(List<EventInformation> list, Date start_month, int diff){
//System.out.println("list_size:" + list.size());
		//System.out.println("diff:" + diff);
				int[][] data = this.typeData(list, start_month, diff);
				List<Rough_typeDTO> result = new ArrayList<Rough_typeDTO>();
				DateUtil du = new DateUtil();//创建日期根据对象
				Calendar basic = Calendar.getInstance();
				basic.setTime(start_month);
				Date date;
				for(int i=0; i<diff;i++){
					Rough_typeDTO rl = new Rough_typeDTO();
					date = basic.getTime();
					rl.setMonth(du.date2String(date, "yyyy-MM"));
					rl.setType1(data[i][0]);
					rl.setType2(data[i][1]);
					rl.setType3(data[i][2]);
					rl.setType4(data[i][3]);
					result.add(rl);
					basic.add(Calendar.MONTH, 1);
				}
				return jb.list2json(result);
			}

	private int[][] typeData(List<EventInformation> list, Date start_month,int diff) {
		int[][] data = new int[diff][4];
		EventInformation event;
		int k = 0;
		Calendar bound = Calendar.getInstance();
		bound.setTime(start_month);
		Date date;
		for(int i=0; i<diff; i++){
			bound.add(Calendar.MONTH, 1);//每次增加一个月份用于比较
			date = bound.getTime();//calendar转成date
			for(int j=k; j<list.size(); j++){
				event = list.get(j);
				if(event.getHtime().before(date)){
					switch(event.getType()){
						case "一类": ++data[i][0]; break;//跳出当前switch语句
						case "二类": ++data[i][1]; break;
						case "三类": ++data[i][2]; break;
						case "四类": ++data[i][3]; break;
					}
					k++;
				}else{
					break;
				}
			}
		}
		return data;
	}

	public int[][] levelData(List<EventInformation> list, Date start_month, int diff){
		int[][] data = new int[diff][4];
//System.out.println("未初始化"+data[0][0]);
		EventInformation event;
		int k = 0;
		Calendar bound = Calendar.getInstance();
		bound.setTime(start_month);
		Date date;
		for(int i=0; i<diff; i++){
			bound.add(Calendar.MONTH, 1);//每次增加一个月份用于比较
			date = bound.getTime();//calendar转成date
			for(int j=k; j<list.size(); j++){
				event = list.get(j);
				if(event.getHtime().before(date)){
					switch(event.getLevel()){
						case "一级": ++data[i][0]; break;//跳出当前switch语句
						case "二级": ++data[i][1]; break;
						case "三级": ++data[i][2]; break;
						case "四级": ++data[i][3]; break;
					}
					k++;
				}else{
					break;
				}
			}
		}
		return data;
	}

	public String levelpiejson(List<EventInformation> list){
		List<LevelPieDTO> result = new ArrayList<LevelPieDTO>();
		int data[] = new int[4];
		for(EventInformation event : list){
			switch(event.getLevel()){
				case "一级": ++data[0];break;
				case "二级": ++data[1];break;
				case "三级": ++data[2];break;
				case "四级": ++data[3];break;
			}
		}
		for(int i=0; i<4; i++){
			LevelPieDTO lp = new LevelPieDTO();
			lp.setLevel((i+1)+"级");
			lp.setCount(data[i]);
			result.add(lp);
		}
		return jb.list2json(result);
	}
	
	public String typepiejson(List<EventInformation> list){
		List<TypePieDTO> result = new ArrayList<TypePieDTO>();
		int data[] = new int[4];
		for(EventInformation event : list){
			switch(event.getType()){
				case "一类": ++data[0];break;
				case "二类": ++data[1];break;
				case "三类": ++data[2];break;
				case "四类": ++data[3];break;
			}
		}
		for(int i=0; i<4; i++){
			TypePieDTO tp = new TypePieDTO();
			tp.setType((i+1)+"类");
			tp.setCount(data[i]);
			result.add(tp);
		}
		return jb.list2json(result);
	}
	
	public String casualtyjson(EventInformation event){
		List<Casualty> result = new ArrayList<Casualty>();
		Casualty c1 = new Casualty();
		Casualty c2 = new Casualty();
		Casualty c3 = new Casualty();
		Casualty c4 = new Casualty();
		c1.setName("死亡人数");
		c2.setName("受伤人数");
		c3.setName("失踪人数");
		c4.setName("总伤亡人数");
		c1.setCount(event.getDeath());
		c2.setCount(event.getHurt());
		c3.setCount(event.getMiss());
		c4.setCount(event.getCasualty());
		result.add(c1);
		result.add(c2);
		result.add(c3);
		result.add(c4);
		return jb.list2json(result);
	}

}