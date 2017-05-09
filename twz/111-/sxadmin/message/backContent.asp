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
	

		id=request.QueryString("id")
		action=request.QueryString("action")
		sql = "SELECT * FROM Message where id="&Cint(id)
		set rs=conn.execute(sql)
		if not rs.eof then
		  backContent=rs("backContent")
		 end if 
		'response.Write Cint(id)
		'response.Write sql
	  if action="add" then
		'if id="" then response.Redirect("messageManage.asp")
		backContent=request.Form("backContent")
		sql="update message set backContent='"&backContent&"' where ID="&Cint(id)
		conn.execute(sql)
		'response.Write sql
		response.redirect("manage.asp")
	  end if
		
	%>
	
  <table width="89%" height="169" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
  <form name="form1" method="post" action="../../sxadmin/message/backContent.asp?action=add&amp;id=<%= id %>">
  <tr>
    <td width="802" align="center">
      <textarea name="backContent" cols="80" rows="5" id="backContent"><%= backContent %></textarea>    </td>
    <td width="217">&nbsp;</td>
  </tr>
  <tr>
    <td align="center"><input type="submit" name="Submit" value="回复" />
      &nbsp;&nbsp;<input type="reset" name="Submit2"  value="重置" /></td>
    <td>&nbsp;</td>
    </tr></form>
</table>


</div>
</body>
</html>





