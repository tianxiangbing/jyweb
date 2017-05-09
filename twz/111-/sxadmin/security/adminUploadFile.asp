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
<table width="95%"  border="0" align="center" cellpadding="0" cellspacing="1" class="table_style" >
  <tr>
    <td height="25" align="center" class="table_title">上传文件管理</td> 
  </tr>
  <tr>  
    <td height="25">
      <table width="97%" border="0" align="center" cellpadding="0" cellspacing="2" class="border">
        <tr bgcolor="#C0C0C0" class="title">
          <td width="69" align="center">序号</td>
          <td width="159" align="center">缩略图</td> 
          <td width="321" height="25" align="center">文件名</td>
          <td width="102" height="20" align="center">文件大小</td>
          <td width="164" height="20" align="center">文件类型</td>
          <td width="143" height="20" align="center">最后修改时间</td>
          <td width="59" height="20" align="center">操作</td>
        </tr>
<%
const MaxPerPage=20
const SaveUpFilesPath="upfile/"        '存放上传文件的目录
dim strFileName
dim totalPut,CurrentPage,TotalPages
dim UploadDir,TruePath,fso,theFolder,theFile,whichfile,thisfile,FileCount,TotleSize

if not IsObjInstalled("Scripting.FileSystemObject") then
	Response.Write "<b><font color='red'>你的服务器不支持 FSO(Scripting.FileSystemObject)! 不能使用本功能</font></b>"
    response.end()
end if

if right(SaveUpFilesPath,1)<>"/" then
	UploadDir="../../" & SaveUpFilesPath & "/"
else
	UploadDir="../../" & SaveUpFilesPath
end if

TruePath=Server.MapPath(UploadDir)
  
set fso=CreateObject("Scripting.FileSystemObject")
if not fso.FolderExists(TruePath) then
	response.write "系统找不到指定文件夹！"
	response.end
end if  
	

page=request("page") 
if page="" or not isNumeric(page)   then
	page=1
end if
if page<=0 then
	page=1
end if




if request.QueryString("action")="del" then
	'response.Write(Server.MapPath(Request("FileName")))
	'response.End()
	DoDelFile(Request.querystring("FileName"))
end if

totalNumber=0
TotleSize=0

set objFolder=fso.GetFolder(TruePath) '创建文件夹对象

 for each objSubFolder in objFolder.Subfolders
   for each theFile in objSubFolder.Files
		totalNumber=totalNumber+1
		TotleSize=TotleSize+theFile.Size
	next
next
   
dim c
FileCount=0

        ' response.Write(totalNumber)      
for each objSubFolder in objFolder.Subfolders
   for each theFile in objSubFolder.Files
   	   'Response.Write objSubFolder.name
	   ' Response.Write theFile.name
		tempNum=tempNum+1
		if tempNum>MaxPerPage*(page-1) then
			if FileCount>=MaxPerPage then exit for
	%>
		  <tr bgcolor="#E3E3E3" class="tdbg">
		    <td align="center"><%= tempNum %></td>
		    <td align="center"><a href="<%=(UploadDir & objSubFolder.name& "/" & theFile.Name)%>" target="_blank">
			<% if instr("jpg,gif,bmp,png",right(lcase(theFile.Name),3))>0  then %>
				<img src="<%=(UploadDir & objSubFolder.name& "/" & theFile.Name)%>" width="60" height="50" border="0" alt="点击查看" />
			<%
			  else 
			  	response.write right(lcase(theFile.Name),3)&"文件"
			 end if %>
			</a></td> 
			<td height="22" align="center"><a href="<%=(UploadDir & objSubFolder.name& "/" & theFile.Name)%>" title="点击查看" target="_blank"><strong><%=theFile.Name%></strong></a></td>
			<td width="102" align="center"><%= CheckSize(theFile.size)%></td>
			<td width="164" align="center"><%=theFile.type%></td>
			<td width="143" align="center"><%=theFile.DateLastModified%></td>
			<td width="59" align="center"><a href="?action=del&page=<%= page %>&FileName=<%=UploadDir&objSubFolder.name&"/"&theFile.Name%>" onClick="return ConfirmDel()">删除</a></td>
		  </tr>
	<%
			FileCount=FileCount+1
			'TotleSize=TotleSize+theFile.Size
		end if
	Next
	
next

set theFolder=nothing
set fso=nothing
%>
      </table>
	
<% if tempNum>1 then showpage2 "?",totalnumber,MaxPerPage %>

</td>
	</tr>
</table>


</div>
</body>
</html>
