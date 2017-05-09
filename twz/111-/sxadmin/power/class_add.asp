<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
</head>
<!--#include file="../inc/subCode.asp"-->
<body>
<div id="container">
<%  
	Const ClassTableName="leftMenu"
	
	id=request.querystring("id")
	if id="" then  id=0
	checkId(id)
	
	if request.QueryString("action")="add" then	'添加数据
		'if id="" then id=0
		classNames=htmlencode(request.form("className"))
		url=htmlencode(request.form("url"))
		power=htmlencode(request.form("power"))
		detailModule=htmlencode(replace(request.form("detailModule")," ",""))
		conn.execute("insert into "&ClassTableName&"(ClassName,url,ClassPId,power,detailModule) values('"&ClassNames&"','"&url&"',"&id&","&power&",'"&detailModule&"')")
		ok "添加成功!","class_manage.asp"
	end if
	
	%>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/power/class_add.asp?action=add&id=<%= id %>" onsubmit="return chkAddClass()">
	<tr>
      <td colspan="2" align="center" class="table_title">添加菜单</td>
    </tr>
    <tr>
      <td width="18%" align="right" class="left_title_2">跟菜单名称：</td>
      <td width="82%">
<% 	  if id=0 then
	  	response.write("根类别")
	  else
	  	response.write(conn.execute("select ClassName from "&ClassTableName&" where ClassId="&id)(0))
	  end if %>
	  </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">菜单名称：</td>
      <td><input name="className" type="text" id="className" size="25" maxlength="25"  /></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">链接地址：</td>
      <td><input name="url" type="text" id="url" size="35" maxlength="35"  /></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">模块内容：</td>
      <td>
	  <%
	    set mRs=conn.execute("select * from powerDName order by paixu desc")
		do while not mRs.eof
			response.write("<input type='checkbox' name='detailModule' value='"&mRs(0)&"'>"&mRs("powerDName")&"&nbsp; ")
			mRs.movenext
		loop
		closeRs(mRs)
	  
	  %></td>
	</tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="4" maxlength="8" value="0" /> 
      须为整数(默认值为0)</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="提交" />	<input type="button" name="Submit" value="返回" onclick="location.href='class_manage.asp'" /></td>
    </tr> </form>     
  </table>

</div>
</body>
</html>
