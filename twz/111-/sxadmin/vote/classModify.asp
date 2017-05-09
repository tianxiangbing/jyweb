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


<% if request.querystring("action")="edit" then
	conn.execute("update voteClass set ClassName='"&request.form("voteTitle")&"'")
	ok "修改成功!","manage.asp"
end if %>
<br />
<table width="99%" height="115" border="0" align="center" cellpadding="0" cellspacing="1"  class="table_style">
        <tr>
      <td colspan="7" class="table_title">投票主题</td>
    </tr>
		<form name="myform" action="../../sxadmin/vote/classModify.asp?action=edit" method="post" onSubmit="return chkModifyTopic();">
          <tr> 
            <td width="460" height="55" align="right" bgcolor="#FFFFFF">投票主题：</td>
            <td width="674" bgcolor="#FFFFFF"><input name="voteTitle" type="text" value="<%= conn.execute("select voteClassName from voteClass")(0) %> " size="45" maxlength="50" ></td>
          </tr>
         
          <tr> 
            <td align="center"></td>
            <td><input type="submit" name="tj" value="修 改">
              &nbsp;&nbsp;&nbsp;
              <input type="button" name="tj2" value="返 回" onClick="javascript:history.go(-1)"></td>
          </tr>
        </form>
</table>
 </div>
</body>
</html>
