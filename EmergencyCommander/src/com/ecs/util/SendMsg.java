/*package com.ecs.util;

import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;

*//**
 * 短信发送
 * @author Administrator
 *
 *//*
public class SendMsg {
	
	
	public void send(String called){
		String url="http://gw.api.taobao.com/router/rest";
		String appkey="23340390";
		String secret="579b08dfe23280b2b5adad88d6eca951";
		TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		req.setSmsType("normal");
		req.setSmsFreeSignName("大鱼测试");
		String json="{\"name\":\"" + called + "\"}";
		req.setSmsParamString(json);
		req.setRecNum(called);
		req.setSmsTemplateCode("SMS_7490270");
		try {
		    AlibabaAliqinFcSmsNumSendResponse rsp = client.execute(req);
		    System.out.println(rsp.getBody());
		} catch (Exception e) {
		}
	}
	
}
*/