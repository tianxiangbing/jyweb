<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
</head>
<!--#include file="../inc/subCode.asp"-->
<script>
function change(val){
		switch(val){
			case "0":
				document.getElementById("filename").style.display = "table-row";				
				document.getElementById("Enfilename").style.display = "none";
				break;
			case "1":
				document.getElementById("filename").style.display = "none";				
				document.getElementById("Enfilename").style.display = "table-row";
				break;
			case "2":
				document.getElementById("filename").style.display = "table-row";
				document.getElementById("Enfilename").style.display = "table-row";
				break;
		}
	
	}
</script>
<body  onLoad="change('0')">
<!--<div id="container">
--><% if request.querystring("action")="add" then' 取提交过来的数据
	' 注意取文件内容的方法，因为对大表单的自动处理，一定要使用循环，否则大于100K的内容将取不到，单个表单项的限制为102399字节（100K左右）
	Dim  sTitle, sContent, sPicture,class_news,d_autor,isSuggest
	
	fileClass = trim(Request.Form("fileClass"))
	filename = trim(Request.Form("filename"))
	Enfilename = trim(Request.Form("Enfilename"))
	languages = trim(Request.Form("languages"))
	sizes = trim(Request.Form("sizes"))
	power = trim(Request.Form("power"))
	filepath = Request.Form("filepath")
	fileContent = htmlEncode(Request.Form("fileContent"))
	
	sql="insert into download(filename,filepath,Power,fileContent,Enfilename,languages,fileClass) values('"&filename&"','"&filepath&"',"&Power&",'"&fileContent&"','"&Enfilename&"','"&languages&"',"&fileClass&")"
	'response.write sql
	'response.end
	conn.execute(sql)
	
	ok "提交成功！","add.asp"
end if

 %>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/download/add.asp?action=add" onSubmit="return chkAddFile();">
	<input type="hidden" name="sizes" value="">
	<tr>
      <td colspan="2" class="table_title">上传文件</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">文件类别：</td>
      <td width="85%"><select name="fileClass"  style="background-color:#ECF3FF;">
      <option value="">请选择类别</option>
     <%  showClass 0,0,0,"downloadClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>
        <tr> 
      <td height="30" align="right" class="left_title_2" bgcolor="#FFFFFF">语言选择：</td>
      <td bgcolor="#FFFFFF">
	  <select name="languages" id="languages" onChange="change(this.value)">
        <option value="0" selected>中文</option>
        <option value="1">英文</option>
		 <option value="2">中英文</option>
      </select>
      </td>
  </tr>
    <tr id="filename">
      <td width="15%" align="right" class="left_title_2">中文文件名称：</td>
      <td width="85%">
        <input name="filename" type="text" id="filename" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    <tr id="Enfilename">
      <td width="13%" align="right" class="left_title_2">英文文件名称：</td>
      <td width="87%"><span class="red">
        <input name="Enfilename" type="text" id="Enfilename" size="45" maxlength="400" />
        *</span>
      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" value="0" size="6" maxlength="6" /><span class="red">*</span></td>
    </tr>
    <tr> 
      <td height="30" align="right" class="left_title_2">上传文件：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="filepath" type="text"  id="filepath" value="" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=filepath&uppath=upfile/download&filelx=<%= EnableUploadFile %>&enfileSize=<%= EnableUploadFileSize %>" width="350" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe>&nbsp;<span id="uploadInfo"></span><br />
    <font color="#FF0000">文件</font><font color="#FF0000">格式：<%=EnableUploadFile%> *</font> </td>
    </tr>
   <!-- <tr> 
      <td height="30" align="right"  class="left_title_2">简要说明：</td>
      <td><textarea name="fileContent" cols="50" rows="5" ></textarea></td>
    </tr>-->
    <tr bgcolor="#FFFFFF">
      <td class="left_title_2">&nbsp;</td>
      <td><input type="submit" name="btnsubmit" value="提 交" class="button2"> &nbsp; 
      <input type="reset" name="btnreset" value="重 写" class="button2"></td>
    </tr>  </form>
  </table>
<!--</div>-->
</body>
</html>
