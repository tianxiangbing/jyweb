<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
</head>
<!--#include file="../inc/subCode.asp"-->
<body>
<div id="container">
 
  <table width="99%" border="0" align="center"  cellpadding="0" cellspacing="1" class="table_style">
    <tr>
      <td colspan="3" align="center" class="table_title">网站内容管理</td>
    </tr>
    <tr class="left_title_2">
      <td width="26%" align="center">ID</td>
      <td width="48%" align="center">标题</td>
      <td width="26%" align="center">操作</td>
    </tr>
	 <%
	set rs =conn.execute("SELECT * FROM Info order by power desc")
	do while not rs.eof
		%>
	<tr    onMouseOut="this.className=''" onMouseOver="this.className ='trOnMouseOver'">
      <td height="20"  align="center"><% =rs(0) %></td>
      <td><a href="Info.asp?id=<% =rs(0) %>" ><%= rs("InfoName") %></a></td>
      <td align="center"><a href="Info.asp?id=<% =rs(0) %>" >修改</a></td>
    </tr>
	<%	
	rs.movenext
	loop
	%>
  </table>
</div>
</body>
</html>
