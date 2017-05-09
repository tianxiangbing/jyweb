<!--#include file="../inc/subCode.asp"-->
<!--#include file="../Inc/md5.asp"-->
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
	dim action,done,pRs
	action=request.querystring("action")	'判断是添加还是修改
	
	if action="" then
	  done=request.QueryString("done")
	  if done="addSave" then
	  	dim username,userpwd,power,num
		username=htmlEncode(request.form("username"))
		userpwd=htmlEncode(request.form("userpwd"))
		power=htmlEncode(request.form("power"))
		num=conn.execute("select count(*) from psadmin where username='"&username&"'")(0)
		if num>0 then
		  erro "此账户已存在！"
		else
		 conn.execute("insert into psadmin (username,userpwd,power) values('"&username&"','"&md5(userpwd)&"',"&power&")")
		 ok "添加成功！","manager.asp"
		end if 
	  end if
	 %>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1"  class="table_style">
    <form id="form1" name="form1" method="post" action="?done=addSave" onsubmit="return chkAddManager()">
	<tr>
      <td colspan="2" align="center" class="table_title">添加管理员</td>
    </tr>
    <tr>
      <td width="45%" align="right" class="left_title_2">账号：</td>
      <td width="55%">
        <input name="username" type="text" id="username" size="20" maxlength="16" /><span class="red">*</span>
        </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">密码：</td>
      <td><input name="userpwd" type="password" id="userpwd" size="21" maxlength="16" /><span class="red">*</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">重复密码：</td>
      <td><input name="userpwd2" type="password" id="userpwd2" size="21" maxlength="16" /><span class="red">*</span></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">角色：</td>
      <td><select name="power">
	  <%
	  set pRs=conn.execute("select * from power order by paiXu desc ")
	  do while not pRs.eof
	  %>
	  <option value="<%= pRs("ID")%>"><%= pRs("username") %></option>
	  <%
	  pRs.movenext
	  loop
	  closeRs(pRs)%>
	  </select><span class="red">*</span></td>
	</tr>
    <tr>
      <td ></td>
      <td><input type="submit" name="Submit" value="提交" />&nbsp;&nbsp;
        <input type="reset" name="Submit2" value="重置" /></td>
    </tr></form> 
  </table>
  <% end if %>
  
  
  <% if action="edit" then
  		id=request.queryString("id")
		
		set eRs=conn.execute("select * from psadmin where id="&id)
		
  	  done=request.QueryString("done")
	  if done="editSave" then
		userpwd=htmlEncode(request.form("userpwd"))
		power=htmlEncode(request.form("power"))
		
		num=conn.execute("select count(*) from psadmin where power=1")(0)
		if num<2 and power<>1 then
		  erro "必须有一个超级管理员！"
		else
			conn.execute("update psadmin set userpwd='"&md5(userpwd)&"',power="&power&" where id="&id)
			ok "修改成功！","manager.asp"
		end if 
		
		
	  end if
   %>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="managerOperate.asp?action=edit&done=editSave&id=<%= id %>" onsubmit="return chkEditManager()">
	<tr>
      <td colspan="2" align="center" class="table_title">修改管理员信息</td>
    </tr>
    <tr>
      <td width="45%" align="right" class="left_title_2">账号：</td>
      <td width="55%"><%= eRs("username") %></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">密码：</td>
      <td><input name="userpwd" type="password" id="userpwd" size="21" maxlength="16" /><span class="red">*</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">重复密码：</td>
      <td><input name="userpwd2" type="password" id="userpwd2" size="21" maxlength="16" /><span class="red">*</span></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">角色：</td>
      <td><select name="power">
	  <%set pRs=conn.execute("select * from power order by paiXu desc ")
	  do while not pRs.eof%>
	  <option value="<%= pRs("ID")%>" <% if pRs("Id")=eRs("power") then response.Write(" selected='selected'") %>><%= pRs("username") %></option>
	  <%
	  pRs.movenext
	  loop
	  closeRs(pRs)%>
	  </select><span class="red">*</span></td>
	</tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="修改" />
        <input type="button" name="Submit2" value="返回" onClick="location.href='manager.asp'" /></td>
    </tr></form> 
  </table>
  <% end if %>
</div>
</body>
</html>
