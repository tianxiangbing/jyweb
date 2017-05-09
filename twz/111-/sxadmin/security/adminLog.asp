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
	dim sql,rs,page,totalPageCount,i
	
  if request.Form("selectId")<>"" then
  	 dim selectid
     selectid=request.Form("selectid")
	 sql = "delete * from log where id in ("&selectId&")"
	 conn.execute sql
	 'response.Redirect "adminLog.asp"
  end if	 
 %>

<table width="95%"  border="0" align="center" cellpadding="0" cellspacing="1" class="table_style" >
  <tr>
    <td height="25" colspan="3" align="center" class="table_title">后台日志管理</td> 
  </tr>
  <tr>
    <td width="9%" height="25" align="center"  class="left_title_2">ID</td>
    <td width="86%" align="center"  class="left_title_2">详情</td>
    <td align="center">&nbsp;</td>
  </tr>
  <form action="?" name="myform" method="post" onSubmit="return del('selectId');">
<%
   sql = "select * from log order by id desc"
   call pageRs(rs,sql,15,page,totalPageCount)
   if not rs.eof then
	 for i = 1 to rs.pagesize
	   if rs.eof then exit for
	 
%>  

  
  <tr>  
  <td height="25" align="center"><%= rs(0) %></td>
    <td height="25">
<% if rs("errorPwd")<>"" then %>
    &nbsp;<font color="#0000FF">非法登录--></font>
	用户名：<font color="#FF0000"><% =rs("username") %></font>&nbsp;&nbsp;
	密码：<font color="#FF0000"><% =rs("errorPwd") %></font>&nbsp;&nbsp;	
	登录IP：<font color="#FF0000"><% =rs("userIp") %></font>&nbsp;&nbsp;
	登录日期：<font color="#FF0000"><% =rs("LoginDate") %></font>&nbsp;&nbsp;
	操作系统：<font color="#FF0000"><% =rs("os") %></font>
<% else %>
   	&nbsp;用户名：<% =rs("username") %>&nbsp;&nbsp;
	登录IP：<% =rs("userIp") %>&nbsp;&nbsp;
	登录日期：<% =rs("LoginDate") %>&nbsp;&nbsp;
	操作系统：<% =rs("os") %>
<% end if %>	</td>
	
	<td width="5%" align="center"><input type="checkbox" name="selectId" value="<% =rs("id") %>"></td>
  </tr>
<%
  rs.movenext
  next
  else
   response.Write "<tr><td colspan='3' align='center'>暂无记录!</td></tr>"
 end if

%>  
  <tr bgcolor="#ffffff">
    <td colspan="3" height="25" align="right">全选&nbsp;
	<input type="checkbox" name="checkAll" onClick="selectAll(this.form);" >&nbsp;
    <input type="submit" name="submit2" value="删 除" class="button2">&nbsp;</td>
  </tr>
</form>    
</table>
<table width="95%"  border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="30" align="center"><% if i>0 then showPage "?" %>
</td>
  </tr>
</table>

</div>
</body>
</html>
