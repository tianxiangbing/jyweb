<!--#include file="../inc/subCode.asp"-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
</head>
<body>
<div id="container">
<%  
	Const ClassTableName="proClass"
	
	id=request.querystring("id")
	set rs=conn.execute("select * from "&ClassTableName&" where ClassId="&id)
	
	if request.querystring("action")="edit" then  
		classNameS=request.form("className")
		EnclassName=request.form("EnclassName")
		power=request.form("power")
		proPic = request.Form("proPic")
		conn.execute("update "&ClassTableName&" set className='"&classNameS&"',EnclassName='"&EnclassName&"',power="&power&",proPic='"&proPic&"' where ClassId="&id)
		ok "修改成功！","class_manage.asp"
	end if		
	
	%>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/products/class_modify.asp?action=edit&id=<%= id %>" onsubmit="return chkAddClass()">
	<tr>
      <td colspan="2" align="center" class="table_title">修改类别</td>
    </tr>
    <tr>
      <td width="18%" align="right" class="left_title_2">父类名称：</td>
      <td width="82%"><%= GetPName(rs("ClassPId"),"proClass") %></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">分类名称：</td>
      <td><input name="className" type="text" id="className" value="<%= rs("ClassName") %>" /></td>
    </tr>
     <tr>
      <td align="right" class="left_title_2">分类名称：</td>
      <td><input name="EnclassName" type="text" id="EnclassName" value="<%= rs("EnclassName") %>" size="40" /></td>
    </tr>
    <tr>
      <td height="30" align="right" class="left_title_2">类别图片：</td>
      <td width="56%" valign="top" bgcolor="#FFFFFF"><input name="proPic" type="text"  id="proPic" value="<%= rs("proPic") %>" size="25" readonly="" />
        &nbsp;
        <iframe src="../inc/sctp.asp?formname=form1&editname=proPic&uppath=upfile/products&filelx=<%= EnableUploadPic %>&enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe>
        <span id="uploadInfo"></span>&nbsp;<br />
        <font color="#FF0000">图片格式：<%= EnableUploadPic %> * 图片大小：241*194</font>(二级栏目添加图片，一级栏目不用)</td>
    </tr>
    <tr>
    <td></td>
    <td><% if rs("proPic") <>"" then %><a href="../../<%= rs("proPic") %>" target="_blank"><img src="../../<%= rs("proPic") %>" width="100" /></a><% end if %></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="8" maxlength="8" value="<%= rs("power") %>" /> <span class="red">*须为整数(默认值为0，按降序排列，即数字越大越在前面)</span></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="修改" />&nbsp;&nbsp;
        <input type="reset" name="Submit2" value="重置"  /></td>
    </tr> </form>     
  </table>

</div>
</body>
</html>
