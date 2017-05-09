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
	if id="" then id=0
	checkId(id)
	
	if request.QueryString("action")="add" then	'添加数据
		classNames=request.form("className")
		EnclassName=request.form("EnclassName")
		power=htmlencode(request.form("power"))
		proPic = request.Form("proPic")
		conn.execute("insert into "&ClassTableName&"(ClassName,EnclassName,ClassPId,power,proPic) values('"&ClassNames&"','"&EnclassName&"',"&id&","&power&",'"&proPic&"')")
		ok "添加成功!","class_manage.asp"
	end if
	
	%>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/products/class_add.asp?action=add&id=<%= id %>" onsubmit="return chkAddClass()">
	<tr>
      <td colspan="2" align="center" class="table_title">添加类别</td>
    </tr>
    <tr>
      <td width="18%" align="right" class="left_title_2">父类名称：</td>
      <td width="82%">
<% 	  if id=0 then
	  	response.write("根类别")
	  else
	  	response.write(conn.execute("select ClassName from "&ClassTableName&" where ClassId="&id)(0))
	  end if %>
	  </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">中文名称：</td>
      <td><input name="className" type="text" id="className"  /></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">英文名称：</td>
      <td><input name="EnclassName" type="text" id="EnclassName" size="40"  /></td>
    </tr>
     <tr> 
      <td height="30" align="right" class="left_title_2">类别图片</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="proPic" type="text"  id="proPic" value="" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=proPic&uppath=upfile/products&filelx=<%= EnableUploadPic %>&enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe><span id="uploadInfo"></span>&nbsp;<BR /><font color="#FF0000">图片格式：<%= EnableUploadPic %> * 图片大小：241*194</font>(二级栏目添加图片，一级栏目不用)</td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="8" maxlength="8" value="0" /> <span class="red">*须为整数(默认值为0，按降序排列，即数字越大越在前面)</span></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="提交" />	<input type="button" name="Submit" value="返回" onclick="location.href='class_manage.asp'" /></td>
    </tr> </form>     
  </table>

</div>
</body>
</html>
