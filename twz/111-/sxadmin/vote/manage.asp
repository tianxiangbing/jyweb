<!--#include file="../inc/subCode.asp"-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<script type="text/javascript" src="../js/checkForm.js"></script>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
</head>

<body>
<div id="container">
  
<% 
	 if request.querystring("action")="del" then
	 	id=request.QueryString("id")
		checkId(id)
	 	conn.execute("delete * from vote where id="&id)	'删除数据库中记录	
	 end if
  	
%>
<br />
<table width="99%" height="66" border="0" align="center" class="table_style">
  <tr>
    <td height="14" colspan="2">投票主题 ：<%= conn.execute("select ClassName from voteClass")(0) %> </td>
  </tr>
  <tr>
    <td width="9%" height="24"><a href="classModify.asp" style="color:#CC6600">修改主题</a></td>
    <td width="91%"><a href="add.asp"><strong>添加投票</strong></a></td>
  </tr>
</table>
<br />
<table width="99%" border="0" align="center" cellpadding="0" cellspacing="1" class="table_style">
<tr>
      <td colspan="7" class="table_title">投票列表</td>
    </tr>
  <tr align="center"> 
          <td width="141" height="25" class="left_title_2">序号</td>
          <td width="361" class="left_title_2">标题</td>
          <td width="261" class="left_title_2">比例</td>
          <td width="106" class="left_title_2">票数</td>
		  <td width="99" class="left_title_2">排序</td>
		  <td colspan="2" class="left_title_2">管理</td>
  </tr>
 <form action="../../sxadmin/vote/delete.asp" name="myform" method="post">
<%

  total=conn.execute("select sum(voteNum) from vote")(0)

  sql = "SELECT * FROM vote ORDER BY power desc ,id desc"
  set rs=conn.execute(sql)
  i=0
  
  do while not rs.eof
  
%>
        <tr align="center" > 
          <td height="40"><%= i %></td>
          <td><%= rs("voteTitle") %></td>
          <td>
		  <% if total<>0 then %>
		  <img src=vote_<%= i mod 3 %>.gif width="<%= Int(rs("voteNum")/total*100) %>" height="6" > <%= round(rs("voteNum")/total*100,2)%>%</font>
		  <% else%>
		  	<img src=vote_<%= i mod 3 %>.gif width="1" height="6" > 0 %
		 <% end if %>
		  </td>
          <td height="25"><font color="#FF0000"><%= rs("voteNum")  %></font></td>
          <td ><% =rs("power") %></td>
          <td width="103" height="25" ><a href="modify.asp?id=<% =rs(0) %>">修改</a></td>
          <td width="93"><a href="../../sxadmin/vote/manage.asp?action=del&id=<% =rs(0) %>" onClick="return confirm('确定删除？')" >删除</a></td>
  </tr>
<%i=i+1
  rs.movenext
  loop
%>  
        <tr align="right" > 
          <td height="25" colspan="7" align="left">共有<font color="#FF0000"><strong><%=total%></strong></font>人参加投票</td>
  </tr>
</form>  
</table>
</div>
</body>
</html>
