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
	set rs=conn.execute("select * from "&ClassTableName&" where ClassId="&id)

	
	
	if request.querystring("action")="edit" then
		classNameS=request.form("className")
		url=request.form("url")
		power=request.form("power")
		detailModule=replace(request.form("detailModule")," ","")
		conn.execute("update "&ClassTableName&" set className='"&classNameS&"',url='"&url&"',power="&power&",detailModule='"&detailModule&"' where ClassId="&id)
		ok "修改成功！","class_manage.asp"
	end if		
	
	%>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/power/class_modify.asp?action=edit&id=<%= id %>" onsubmit="return chkAddClass()">
	<tr>
      <td colspan="2" align="center" class="table_title">修改类别</td>
    </tr>
    <tr>
      <td width="18%" align="right" class="left_title_2">父类名称：</td>
      <td width="82%"><%= GetPName(rs("ClassPId"),"leftMenu") %></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">分类名称：</td>
      <td><input name="className" type="text" id="className" value="<%= rs("ClassName") %>" /></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">链接地址：</td>
      <td><input name="url" type="text" id="url" size="35" maxlength="35"  value="<%= rs("url") %>" /></td>
    </tr>
	<tr>
      <td align="right" class="left_title_2">模块内容：</td>
      <td><%
	    detailModule=conn.execute("select detailModule from leftMenu where classId="&id)(0)
	    set mRs=conn.execute("select * from powerDName order by paixu desc")
		do while not mRs.eof
			response.write("<input type='checkbox' name='detailModule' value='"&mRs(0)&"' ")
			arrModule=split(detailModule,",")
			for i=0 to ubound(arrModule)
				if cint(arrModule(i))=mRs(0) then response.Write("checked=checked")
			next
			 response.write(">"&mRs("powerDName")&"&nbsp; ")
			mRs.movenext
		loop
		closeRs(mRs)
	  
	  %></td>
	</tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="8" maxlength="8" value="<%= rs("power") %>" /> 须为整数(默认值为0)</td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" name="Submit" value="修改" />&nbsp;&nbsp;
        <input type="reset" name="Submit2" value="重置"  /></td>
    </tr> </form>     
  </table>

</div>
</body>
</html>
