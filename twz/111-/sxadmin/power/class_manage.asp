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
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <tr>
      <td align="left"><a href="class_add.asp"><strong>添加根菜单</strong></a></td>
    </tr>
  </table>
  <br />
  <table width="99%" border="0" align="center"  cellpadding="0" cellspacing="1" class="table_style">
    <tr>
      <td colspan="4" align="center" class="table_title">菜单管理</td>
    </tr>
    <tr class="left_title_2">
      <td width="8%" align="center">排序</td>
      <td width="15%" align="center">名称</td>
      <td width="20%" align="center">链接地址</td>
      <td width="57%" align="center">操作</td>
    </tr>
	 <%
	 Const ClassTableName="leftMenu"
	 
	if request.querystring("action")="del" then
	 	conn.execute("delete from "&ClassTableName&" where ClassId="&request.querystring("id"))
	end if 
	
showClassT 0,0  
sub showClassT(id,nSpace) '递归显示分类
	dim rs,delStr
	
	sql="select * from "&ClassTableName&" where ClassPId="&id&" order by power desc"
	set rs=conn.execute(sql)
	
	do while not rs.eof
	ssubstr=""
		for i=1 to nSpace
			ssubstr=ssubstr+"&nbsp;&nbsp;&nbsp;&nbsp;"
		next
		if nSpace<>0 then	ssubstr1="├┄"
		%>
	<tr    onMouseOut="this.className=''" onMouseOver="this.className ='trOnMouseOver'">
      <td height="20"  align="center"><% =rs("Power") %></td>
      <td align="left">&nbsp;<%= ssubstr&ssubstr1&rs("ClassName") %></td>
      <td align="left" >&nbsp;<%= rs("url") %></td>
      <td ><table width="60%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td width="82"><%if nSpace+1<2 then response.write("<a href='class_add.asp?id="&rs(0)&"' >添加子栏目</a>")%>&nbsp;</td>
              <td width="51" align="left"><a href="class_modify.asp?id=<%=rs(0)%>">修改</a></td>
              <td width="63">
			  <% set cRs=conn.execute("select * from "&ClassTableName&" where ClassPId="&rs(0))'判断是否显示删除,当有子类别时,无删除功能
			  	if cRs.eof then	response.write "<a href='?action=del&id="&rs(0)&"' onclick=""return confirm('确定删除？')"" >删除</a>&nbsp;"
			   %>&nbsp;			  </td>
            </tr>
            </table></td>
    </tr>
	<%	call  showClassT(rs(0),nSpace+1)
		rs.movenext
	loop
end sub

%>
  </table>
</div>
</body>
</html>
