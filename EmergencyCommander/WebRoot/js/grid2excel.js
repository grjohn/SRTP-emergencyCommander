/** 
* Created with IntelliJ IDEA. 
* User: zhuhq 
* Date: 14-3-17 
* Time: 下午12:26 
* To change this template use File | Settings | File Templates. 
*/ 
/** 
* 
* function grid2Excel(grid,filename) 
* @param grid Extjs grid panel 
* @param filename Excel 文件名称 
* 
* **/ 
(function(){ 
    var Base64 = (function() { 
        // private property 
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; 

        // private method for UTF-8 encoding 
        function utf8Encode(string) { 
            string = string.replace(/\r\n/g,"\n"); 
            var utftext = ""; 
            for (var n = 0; n < string.length; n++) { 
                var c = string.charCodeAt(n); 
                if (c < 128) { 
                    utftext += String.fromCharCode(c); 
                } 
                else if((c > 127) && (c < 2048)) { 
                    utftext += String.fromCharCode((c >> 6) | 192); 
                    utftext += String.fromCharCode((c & 63) | 128); 
                } 
                else { 
                    utftext += String.fromCharCode((c >> 12) | 224); 
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128); 
                    utftext += String.fromCharCode((c & 63) | 128); 
                } 
            } 
            return utftext; 
        } 

        // public method for encoding 
        return { 
            //encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) { 
            encode : function (input) { 
                var output = ""; 
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4; 
                var i = 0; 
                input = utf8Encode(input); 
                while (i < input.length) { 
                    chr1 = input.charCodeAt(i++); 
                    chr2 = input.charCodeAt(i++); 
                    chr3 = input.charCodeAt(i++); 
                    enc1 = chr1 >> 2; 
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); 
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); 
                    enc4 = chr3 & 63; 
                    if (isNaN(chr2)) { 
                        enc3 = enc4 = 64; 
                    } else if (isNaN(chr3)) { 
                        enc4 = 64; 
                    } 
                    output = output + 
                        keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
                        keyStr.charAt(enc3) + keyStr.charAt(enc4); 
                } 
                return output; 
            } 
        }; 
    })(); 
    var  format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }; 
    var tableToExcel = function(table,fileName) { 
        var uri = 'data:application/vnd.ms-excel;base64,' 
            ,fileName = fileName || 'excelexport' 
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"' + 
            ' xmlns:x="urn:schemas-microsoft-com:office:exc el" xmlns="http://www.w3.org/TR/REC-html40"><head>' + 
            '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+ 
            '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' + 
            '<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' + 
            '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>' + 
            '<![endif]--></head><body>{table}</body></html>'; 

        var ctx = {worksheet:'Worksheet', table: table}; 
        var a = document.createElement('a'); 
        document.body.appendChild(a); 
        a.hreflang = 'zh'; 
        a.charset = 'utf8'; 
        a.type="application/vnd.ms-excel"; 
        a.href = uri + Base64.encode(format(template,ctx)); 
        a.target = '_blank'; 
        a.download = fileName + '.xls'; 
        a.click(); 

    }; 
    window.grid2Excel = function(grid,fileName) { 
        var columns = grid.initialConfig.columns|| [], 
            store = grid.getStore(), 
            headLevel1 = [],headLevel2 = [],headLevel = 1,isGroup = false, 
            dataIndex =[],tableStr = '<table><thead>{thead}</thead><tbody>{tbody}</tbody></table>'; 

        columns.forEach(function(column) { 
                if(!column.dataIndex) { 
                    isGroup = true; 
                    return false; 
                } 

        }); 
        if(isGroup) { 
            headLevel = 2;  //只支持二级表头 
        } 
        columns.forEach(function(column) { 
            if(column.dataIndex) { 
                column.colspan = 1; 
                column.rowspan = headLevel; 
                headLevel1.push(column); 
                dataIndex.push(column); 
            }else { 
                var items = column.columns ||[]; 
                column.colspan = items.length; 
                column.rowspan = 1; 
                headLevel1.push(column); 
                items.forEach(function(item) { 
                    item.colspan = 1; 
                    item.rowspan = 1; 
                    headLevel2.push(item); 
                    dataIndex.push(item); 
                }) 
            } 
        }); 
        var headLevel1Str = '<tr>'; 
        headLevel1.forEach(function(head) { 
            headLevel1Str += '<th colspan = "'+head.colspan+ 
                '" rowspan="'+head.rowspan+'">'+head.text+'</th>'; 

        }); 
        headLevel1Str += '</tr>'; 

        var headLevel2Str = ''; 
        if(headLevel2.length > 0) { 
            headLevel2Str += '<tr>'; 
            headLevel2.forEach(function(head) { 
                headLevel2Str += '<th colspan = "'+head.colspan+ 
                    '" rowspan="'+head.rowspan+'">'+head.text+'</th>'; 
            }); 
            headLevel2Str += '</tr>' 
        } 
        var theadStr = headLevel1Str + headLevel2Str, 
            tbodyStr = '',defRenderer = function(value) { 
                return value; 
            }; 

        store.each(function(r) { 
            tbodyStr += '<tr>'; 
            dataIndex.forEach(function(c) { 
                var renderere = c.renderer || defRenderer; 
                tbodyStr += '<td>'+renderere.call(r,r.get(c.dataIndex))+'</td>' 
            }); 
            tbodyStr +='</tr>' 
        }); 
        tableStr = format(tableStr,{ 
            thead:theadStr, 
            tbody:tbodyStr 
        }); 

        tableToExcel(tableStr,fileName); 

    } 
})() 