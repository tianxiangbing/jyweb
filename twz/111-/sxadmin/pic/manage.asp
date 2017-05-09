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
  
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1">
  <form action="manage.asp?" method="post" name="searchForm">   <!--搜索部分开始-->
    <tr>
      <td><strong>搜索：</strong> 
        <input type="text" name="keywords">&nbsp;&nbsp;<select name="newsClass"  style="background-color:#ECF3FF;"> <option value="">请选择类别</option>
    <%  showClass 0,0,0,"picClass"	%>
      </select>
<input type="submit" name="ss" value="搜 索"></td>
    </tr>
	</form> 
  </table>
</p>
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
  set dRs=conn.execute("select d_savepathfilename from [pic] where id="&Idstr)
  if not dRs.eof then
  
	if dRs(0)<>"" then	
		' 把带"|"的字符串转为数组
		Dim aSavePathFileName
		aSavePathFileName = Split(dRs(0), "|")
	
		' 删除相关的文件，从文件夹中
		Dim j
		For j = 0 To UBound(aSavePathFileName)
			' 按路径文件名删除文件
			'response.write(Server.MapPath("../../"&aSavePathFileName(j)))
			Call DoDelFile("../../"&aSavePathFileName(j))
		Next
	 end if
	 
	 conn.execute("delete * from pic where id="&Idstr)	'删除数据库中记录
	 
	end if
	closeRs(dRs)
 end sub

keywords=trim(request("keywords"))
newsClass=trim(request("newsClass"))
newsClass_type = trim(request("newsClass_type"))

sql="select * from pic where 1=1 "
If keywords <> "" Then sql=sql&" and Title LIKE '%"&keywords&"%'"
If newsClass <> "" Then sql=sql&" and classId = "&newsClass
If newsClass_type <> "" Then sql=sql&" and classId = "&newsClass_type
sql=sql&" order by power desc,id desc"
'response.Write(newsClass_type&"aaaaaaaaaaaaaaaaaaa")
'response.Write(sql)

call pageRs(rs,sql,20,page,totalPageCount)	
%>
  <table width="99%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <tr>
      <td colspan="7" class="table_title">图片列表</td>
    </tr>
	<form action="manage.asp?page=<%=page%>" method="post" name="myform" onSubmit="return del('selectId');">	
    <tr>
      <td width="5%" align="center" class="left_title_2">选定</td>
      <td width="11%" align="center" class="left_title_2">预览</td>
      <td width="30%" align="center" class="left_title_2">标题</td>
      <td width="15%" align="center" class="left_title_2">所属类</td>
      <td width="11%" align="center" class="left_title_2">排序</td>
      <td width="21%" align="center" class="left_title_2">发布时间</td>
      <td width="7%" align="center" class="left_title_2">操作</td>
    </tr>
	<% 
	if not rs.eof then
		for i=1 to rs.pageSize
		  if rs.eof then exit for %>
   	 <tr onMouseOut="this.className=''" onMouseOver="this.className ='trOnMouseOver'">
      <td align="center"><input type="checkbox" name="selectId" value="<% =rs(0) %>"></td>
      <td align="center"><a href="../../<%=rs("newsPic")%>" target="_blank"><img src="../../<%=rs("newsPic")%>" width="60" height="50" border="0"/></a></td>
      <td align="left"><%= trim(rs("title"))  %>/<%= trim(rs("entitle"))  %></td>
      <td align="center"><%= className(rs("ClassId"),"picClass") %></td>
      <td align="center"><%= rs("power")  %></td>
      <td align="center"><%= rs("addtime")  %></td>
      <td align="center"><a href="modify.asp?page=<%= page %>&amp;id=<%= rs(0) %>">修改</a></td>
    </tr>
	<% 
    rs.movenext
    next
    %>		
    <tr bgcolor="#FFFFFF">
      <td colspan="7">&nbsp; <input type="checkbox" name="checkAll" onClick="selectAll(this.form);" >
        &nbsp;全选&nbsp; 
      <input type="submit" name="submit2" value="删除"  class="button2">
      &nbsp;&nbsp; </td>
    </tr>
	</form>
<% 
else
	response.write("<tr bgcolor='#FFFFFF'><td colspan='6' align='center'>暂无内容</td></tr>")
end if 
rs.close
set rs=nothing
%>
  </table>
  <table width="95%"  border="0" align="center" cellpadding="0" cellspacing="0">
   <tr>
    <td height="30" align="center">
	<% if i>0 then showPage "?keywords="&server.urlEncode(keywords)&"&newsClass="&newsClass&"&" %></td>
   </tr>
  </table>
</div>
</body>
</html>
