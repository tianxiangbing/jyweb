<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
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
</head>
<!--#include file="../inc/subCode.asp"-->
<%

 id=request.QueryString("id")
 checkId(id)
 

 if request.querystring("action")="edit" then' 取提交过来的数据
	
	fileClass = trim(Request.Form("fileClass"))
	filename = trim(Request.Form("filename"))
	languages = trim(Request.Form("languages"))
	Enfilename = trim(Request.Form("Enfilename"))
	power = trim(Request.Form("power"))
	sizes = trim(Request.Form("sizes"))
	filepath = Request.Form("filepath")
	fileContent =htmlEncode(Request.Form("fileContent"))
	
	sql="update download set filename='"&filename&"',fileClass="&fileClass&",filepath='"&filepath&"',languages='"&languages&"',Power="&Power&",fileContent='"&fileContent&"',Enfilename='"&Enfilename&"' where id="&id
	'response.write sql
	'response.end
	conn.execute(sql)
	ok "修改成功！","manage.asp"
end if


set rs=conn.execute("select * from download where id="&id)
if rs.eof then
	erro "无效ID"
end if
 %>
<body onLoad="change('<%=rs("languages")%>')">
<!--<div id="container">-->
<table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/download/modify.asp?action=edit&amp;id=<%= rs(0) %>" onSubmit="return chkAddFile();">
	<input type="hidden" name="sizes" value="<%= rs("sizes") %>">
	<tr>
      <td colspan="2" class="table_title">修改文件</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">文件类别：</td>
      <td width="85%"><select name="fileClass" id="fileClass"  style="background-color:#ECF3FF;">
     <%  showClass 0,0,rs("fileClass"),"downloadClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>
        <tr> 
      <td height="30" align="right" bgcolor="#FFFFFF">语言选择：</td>
      <td bgcolor="#FFFFFF">
	  <select name="languages" id="languages" onChange="change(this.value)">
        <option value="0" <% if rs("languages")=0 then response.Write("selected") end if %>>中文</option>
        <option value="1" <% if rs("languages")=1 then response.Write("selected") end if %>>英文</option>
		<option value="2" <% if rs("languages")=2 then response.Write("selected") end if %>>中英文</option>
      </select>  
      </td>
</tr>
    <tr id="filename">
      <td align="right"  width="13%" class="left_title_2">中文文件名称：</td>
      <td>
        <input name="filename" type="text" id="filename" size="45" maxlength="100" value="<%= rs("filename") %>" />
        <span class="red">*</span>      </td>
    </tr>
    <tr id="Enfilename">
      <td width="13%" align="right" class="left_title_2">英文文件名称：</td>
      <td width="87%"><span class="red">
        <input name="Enfilename" type="text" id="Enfilename" value="<%= rs("Enfilename") %>" size="45" maxlength="400" />
        *</span>
      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="6" maxlength="6" value="<%= rs("power") %>" /><span class="red">*</span></td>
    </tr>
    <tr> 
      <td height="30" align="right" class="left_title_2">文件图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="filepath" type="text"  id="filepath" value="<%= rs("filepath") %>" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=filepath&uppath=upfile/download&filelx=<%= EnableUploadFile %>&enfileSize=<%= EnableUploadFileSize %>" width="350" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe><span id="uploadInfo"></span> <br />
    &nbsp;<font color="#FF0000">文件格式：<%=EnableUploadFile%> *</font></td>
    </tr>
    <!--<tr> 
      <td height="30" align="right"  class="left_title_2">简要说明：</td>
      <td><textarea name="fileContent" cols="50" rows="5" ><%= htmlDecode(rs("fileContent")) %></textarea></td>
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
