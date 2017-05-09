<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<script type="text/javascript" src="../js/checkForm.js"></script>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
</head>
<!--#include file="../inc/subCode.asp"-->
<body>
<div id="container">
  
<% 

	 if request.Form("selectId")<>"" then
		 selectid=request.Form("selectid")
		 If Not selectid="" Then
			arrIdList = Split(selectid,",")
			For i = 0 To UBound(arrIdList)
				iId = Clng(arrIdList(i))
				 Call DelNews(iId)
			Next
		 Else
			 Call erro("请至少选择一条信息记录！")
		 End If
	  end if	
	 
	  sub DelNews(Idstr)
		  set dRs=conn.execute("select * from friendlink where id="&Idstr)
		  if not dRs.eof then
		  	
		    Call DoDelFile("../../"&dRs("linkpic"))
			Call DoDelFile("../../"&dRs("linkSmallPic"))
			
			conn.execute("delete * from friendLink where id="&Idstr)	'删除数据库中记录
			 
		  end if
		  closeRs(dRs)
		end sub

  	
	 %>

  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <tr>
      <td colspan="8" class="table_title">友情链接列表</td>
    </tr>
	<form action="../../sxadmin/friendlink/manage.asp?" method="post" name="myform" onSubmit="return del('selectId');">	
    <tr>
      <td width="6%" align="center" class="left_title_2">选定</td>
      <td width="9%" align="center" class="left_title_2">链接图片</td>
      <td width="28%" align="center" class="left_title_2">链接名称（中英文）</td>
       <td width="11%" align="center" class="left_title_2">语言</td>
      <td width="21%" align="center" class="left_title_2">链接地址</td>
      <td width="6%" align="center" class="left_title_2">排序</td>
      <td width="13%" align="center" class="left_title_2">发布时间</td>
      <td width="6%" align="center" class="left_title_2">操作</td>
    </tr>
	<% 
	
	sql = "SELECT * FROM friendlink order by addtime desc "
	call pageRs(rs,sql,20,page,totalPageCount)
	if not rs.eof then
		
		for i=1 to rs.pageSize
		  if rs.eof then exit for %>
   	 <tr align="center">
      <td><input type="checkbox" name="selectId" value="<% =rs(0) %>"></td>
      <td><a href="../../<%=rs("linkPic")%>" target="_blank"><img src="../../<%=rs("linkSmallpic")%>" width="60" height="50" border="0"/></a></td>
      <td><%= rs("linkName") %> / <%= rs("EnlinkName") %></td>
      <td><%= GetLanguage(rs("languages")) %></td>
      <td><%= rs("linkurl") %></td>
      <td><%= rs("power")  %></td>
      <td><%= FormatDatetime(rs("addtime"),2)  %></td>
      <td><a href="modify.asp?id=<% =rs(0) %>">修改</a></td>
    </tr>
	<% 
		rs.movenext
		next
		 %>
		
    <tr bgcolor="#FFFFFF">
      <td colspan="8">&nbsp; <input type="checkbox" name="checkAll" onClick="selectAll(this.form);" >
        &nbsp;全选&nbsp; 
      <input type="submit" name="submit2" value="删除"  class="button2">
      &nbsp;&nbsp; </td>
    </tr>
	</form>
	<% 
	else
		response.write("<tr bgcolor='#FFFFFF'><td colspan='6' align='center'>暂无内容</td></tr>")
	end if %>
  </table>
  <table width="95%"  border="0" align="center" cellpadding="0" cellspacing="0">
   <tr>
     <td height="30" align="center"><% if i>0 then showPage "?" %></td>
   </tr>
  </table>
</div>
</body>
</html>
