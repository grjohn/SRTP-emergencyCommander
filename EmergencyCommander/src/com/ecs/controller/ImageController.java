package com.ecs.controller;

import java.io.IOException;
import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * chart图片保存处理程序
 * @author Administrator
 *
 */
@Controller
@RequestMapping(value="image")
public class ImageController {
	
	
	@RequestMapping(value="/svg",produces="text/json;charset=UTF-8", method=RequestMethod.POST)
    private void svgServer(HttpServletRequest request,HttpServletResponse response) throws IOException{
        String svgString = request.getParameter("svg");
       
        String type = request.getParameter("type");
        response.setContentType(type);
        /**
         * 文件名中不可含有逗号,否则会报如下错误：
         * 系统收到了多个不同的 Content-Disposition 标头。为了避免遭到 HTTP 响应拆分攻击，这种情况是不允许的
         */
        String filename =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"." + type.substring(6);
        response.setHeader("Content-disposition","attachment;filename=" + filename);
       
        JPEGTranscoder t = new JPEGTranscoder();
        t.addTranscodingHint(JPEGTranscoder.KEY_QUALITY,new Float(.8));
        TranscoderInput input = new TranscoderInput(new StringReader(svgString));
        try {
            TranscoderOutput output = new TranscoderOutput(response.getOutputStream());
            t.transcode(input, output);
            response.getOutputStream().flush();
            response.getOutputStream().close();
        }catch (Exception e){
            response.getOutputStream().close();
            e.printStackTrace();
        }
    }

}
