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
<BR>
  <table width="850"  border="0" align="center" cellpadding="0" cellspacing="1" class="table_style" >
   <tr>
		<td height="25" align="center" colspan="2" class="table_title">数 据 库 管 理</td>
	</tr>
	<tr class="a4">
		<td width="75" height="30">&nbsp;<span style="color:#CC6600;">管理导航：</span></td>
    <td height="30">&nbsp;<a href="?action=backup" class="left_title_2">备份数据库</a> | <a href="?action=restore" class="left_title_2">恢复数据库</a> |  <a href="?action=spaceSize" class="left_title_2">系统空间占用情况</a>
	  </td>
	</tr>
  </table>
<BR>

<%
if not IsObjInstalled("Scripting.FileSystemObject") then
	Response.Write "<b><font color='red'>你的服务器不支持 FSO(Scripting.FileSystemObject)! 不能使用本功能</font></b>"
    response.end()
else
	dim fso
	set fso = server.createObject("Scripting.FileSystemObject")	
end if

dim dbPath2	'数据库路径
const db="../../db/ch#$%shixiang.asa"
dbPath2=Server.MapPath(db)
dim dbBackupPath '数据库备份路径
dbBackupPath=server.MapPath("../../db/dbBackup")

select case trim(request.QueryString("action"))
	case "backup"
		call showBackup()
	case  "restore"
		call showRestore()
	case  "compact"	
		call ShowCompact()
	case  "spaceSize"
		call SpaceSize()
	case else
		call SpaceSize()
end select


'--------备份数据库--------
sub showBackup()
	dim backupName
	backupName=request.form("backupName")
	backupName=replace(replace(backupName,"/",""),"\","")
	if backupName<>"" then
		fso.copyfile dbPath2,dbBackupPath &"/"& backupName & ".asa",true	'文件存在时覆盖。
		if err then
     		err.clear
			erro "非法名字！请重新输入"
		end if
		erro "备份成功！"
	End if

%>
<table width="850"  border="0" align="center" cellpadding="0" cellspacing="1" class="table_style" >
<form name="form1" method="post" action="?action=backup" onsubmit="return chkBackData()">
 
  <tr>
    <td align="center" height="25" ><font color="#CC0000"><b>备 份 数 据 库</b></font></td>
  </tr>
  <tr>
	<td align="center" height="25" >
       <span class="left_title_2">备份名称：</span>
       <input  type="text" name="backupName" id="backupName" value="<%= "ch#$%shixiang"&date() %>" size=30 />
       填写数据库名称，后缀不用填写，文件存在时将自动覆盖。</td>
  </tr>
   <tr class="a4">
     <td height="40" align="center"><input name="submit" type=submit value=" &nbsp;开始备份&nbsp; "  style="cursor: hand;background-color: #cccccc;"></td>
   </tr>
</form>
</table>
<%
end sub


'--------恢复数据库--------
sub showRestore()

	dim fileName,operate
	fileName=request.querystring("fileName")
	operate=request.querystring("operate")
	select case operate
		case "compact"	'压缩数据库
			call CompactData(fileName)
		case "restore"
		  if fso.fileExists(dbBackupPath &"/"&fileName) then
		  	fso.copyFile dbBackupPath &"/"&fileName,dbPath2,true
		  	ok "恢复成功！","?action=restore"
		  else
			erro "此备份文件失效，找不到指定的备份文件！"		
		  end if	
		case "del"
		  if fso.fileExists(dbBackupPath &"/"&fileName) then	fso.deleteFile dbBackupPath &"/"&fileName
		case else
			'erro "参数错误"
	end select
%>
<table width="850"  border="0" align="center" cellpadding="0" cellspacing="1" class="table_style" >
<form method="post" action="?action=restore">
  <tr>
	<td colspan="7" align="center" height="25"><FONT COLOR="#CC0000"><b>数 据 库 恢 复</b></FONT></td>
  </tr>
  <tr>
    
    <td width="292" align="center" >数据库名</td>
    <td width="199" align="center" >占用大小</td>
    <td width="199" align="center" >备份日期</td>
    <td width="199" align="center" >数据库在线压缩</td>
    <td width="199" height="25" align="center" >恢复数据库</td>
    <td width="122" height="25" align="center" >操作</td>
  </tr>
  <% 	
  dim fles
  for each fles in fso.GetFolder(dbBackupPath).files %>
  <tr>
    <td align="center" ><%= fles.name %></td>
    <td align="center" ><%= CheckSize(fles.size) %></td>
    <td align="center" ><%= fles.DateLastModified  %></td>
    <td align="center" ><a href="?action=restore&operate=compact&fileName=<%= server.urlencode(fles.name) %>"  onclick="return confirm('压缩数据库有一定的风险，建议先备份，是否压缩？')">压缩</a></td>
    <td align="center" height="25" ><a href="?action=restore&operate=restore&fileName=<%= server.urlencode(fles.name) %>"  onclick="return confirm('恢复后将覆盖现有数据库!确定用此数据库恢复？')">恢复</a></td>
    <td align="center" height="25" ><a href="?action=restore&operate=del&fileName=<%= server.urlencode(fles.name) %>" onclick="return confirm('确定删除？删除后将不可恢复！')">删除</a></td>
  </tr>
	<% next %>
	<tr align="center"> 
		<td colspan="7" align="left" valign="middle" style="line-height: 150%"><br>
		  <font color="#FF6600"><b>注1：</b></font>如果数据库不是很庞大，建议不用压缩，以免发生意外错误。 <br>
		<font color="#FF6600"><b>注2：</b></font>请选择正确的数据库进行恢复，以免由此带来的数据丢失。</td>
	</tr>
</form>
</table>
<%
end sub



'--------统空间占用情况--------
sub SpaceSize()
	
%>
<table cellpadding="2" cellspacing="1" border="0" width="850" align="center" class="a2">
  <tr>
	<td colspan="2" align="center" height="25" class="a1"><FONT COLOR="#CC0000"><b>系 统 空 间 占 用 情 况</b></FONT></td>
	</tr>
  <tr class="a4"> 
    <td width="100%" height="150" valign="middle">
	<blockquote><br>
      系统数据占用空间：&nbsp;<img src="../images/bar.gif" width=<%=drawBar(showFileSize(db))%> height=10>&nbsp; <%= checkSize(showFileSize(db))%>
      <br>
      <br>
      备份数据占用空间：&nbsp;<img src="../images/bar.gif" width=<%= drawBar(showFolderSize("../../db/DbBackup")) %> height=10>&nbsp; <%= checkSize(showFolderSize("../../db/DbBackup"))%>
      <br>
      <br>
      系统图片及文件占用空间：&nbsp;<img src="../images/bar.gif" width=<%= drawBar(showFolderSize("../../upfile")) %> height=10>&nbsp;<%= checkSize(showFolderSize("../../upfile"))%>
      <br>
      <br>
      网站占用空间总计：&nbsp;<img src="../images/bar.gif" width=400 height=10>&nbsp;<%= checkSize(showFolderSize("/")) %>
	</blockquote> 	
    </td>
  </tr>
</table>
<%
end sub


'--------压缩数据库--------
sub CompactData(fileName) 
	Dim Engine 
	response.write dbBackupPath&"/"&fileName
	If fso.FileExists(dbBackupPath&"/"&fileName) Then
		Set Engine = CreateObject("JRO.JetEngine")
		Engine.CompactDatabase "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & dbBackupPath&"/"&fileName," Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & dbBackupPath & "/" & "temp.mdb"
		fso.CopyFile dbBackupPath & "/" & "temp.mdb",dbPath2
		fso.DeleteFile(dbBackupPath & "/" & "temp.mdb")
		Set Engine = nothing
		ok "数据库压缩成功!","?action=restore"
	Else
		erro "数据库没有找到!"
	End If
end sub

function showFileSize(objFile)	'显示文件大小
	dim fil
	set fil=fso.getFile(server.MapPath(objFile))
	showFileSize=fil.size
end function

function showFolderSize(objFolder)	'显示文件夹大小
	dim flder
	set flder=fso.getFolder(server.MapPath(objFolder))
	showFolderSize=flder.size
end function

 	

Function drawBar(sSize)
	dim totalsize,barsize
	totalsize=showFolderSize("/")
	barsize=cint((sSize/totalsize)*400)
	drawBar=barsize
End Function 	


%>
<BR>

</div>
</body>
</html>