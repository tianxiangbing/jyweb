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
<table width="97%" border="0" align="center" cellpadding="0" cellspacing="1" class="table_style">
  <tr>
    <td height="30" bgcolor="#FFFFFF"><strong>冗余数据处理</strong></td>
  </tr>
</table>
<p>
<% 
if request.querystring("action")="edit" then
	'冗余处理,根据物理文件名是否存在数据库中，如果没有，则删除物理文件
	
	'文件夹,表格,大图字段,小图字段,	
	Redundancy "products","products","propic","proSmallpic" 'products文件夹
	Redundancy "news","Article","NewsPic","NewsSmallPic" 'News文件夹
	Redundancy "guangGao","ad","AdPic","AdSmallPic" 'guangGao[广告]文件夹
	Redundancy "download","download","filepath","filepath" '下载文件夹
	Redundancy "friendlink","Friendlink","FriPic","FriSmallPic" '友情链接文件夹
	
	'dim str	
	'eWebEditorFile "article"
	'eWebEditorFile "products"
	'response.Write str&"s"
	
	response.Write("<script>alert('操作成功！');</script>")
end if

sub Redundancy(aFloder,aTable,bPic,sPic) '冗余处理
	dim oFSO,folder,items '读取文件夹下所有文件,
	Set oFSO = Server.CreateObject("Scripting.FileSystemObject")
	set folder = oFSO.GetFolder(Server.MapPath("../upfile/"&aFloder&""))
	
	for each items in folder.Files
		set rs=server.CreateObject("adodb.RecordSet")
		sql="select * from ["&aTable&"]" '读取数据库中数据
		rs.Open sql, conn, 1,3
		i=0
		do while not rs.eof
			if "upfile/"&aFloder&"/"&items.name=rs(""&bPic&"") or "upfile/"&aFloder&"/"&items.name=rs(""&sPic&"") then 
				exit do
			end if	
			rs.movenext
			i=i+1
		loop
		'response.write rs.recordCount=i
		if rs.recordCount=i then oFSO.DeleteFile(Server.MapPath("../upfile/"&aFloder&"/"&items.name))
		'if rs.recordCount=i then 	response.write("upfile/"&aFloder&"/"&items.name)
		rs.close
		set rs=nothing
	next
	Set oFSO = Nothing
	Set folder = Nothing
end sub


'if instr(str,"upfile/"&aFloder&"/"&items.name)=0 then  oFSO.DeleteFile(Server.MapPath("../upfile/eWebeditor/"&items.name))

sub eWebEditorFile(aTable)
	dim oFSO,folder,items '读取文件夹下所有文件,
	Set oFSO = Server.CreateObject("Scripting.FileSystemObject")
	set folder = oFSO.GetFolder(Server.MapPath("../upfile/eWebeditor"))
	
	for each items in folder.Files
		set rs=conn.execute("select d_savepathfilename from ["&aTable&"]") '读取数据库中数据
		do while not rs.eof
			str=str&"|"&rs("d_savepathfilename")
			rs.movenext
		loop
		
		rs.close
		set rs=nothing
	next
	Set oFSO = Nothing
end sub

%>
<table width="97%" border="0" align="center" cellpadding="0" cellspacing="1" class="tablebg">
  <tr > 
    <td height="20" colspan="2" align="center"><font color="#000">冗余数据、文件处理</font></td>
  </tr>
  <tr >
    <td width="26%" height="80" align="right">说明：</td>
    <td width="74%" align="left">1、随着数据库运行时间的增长,冗余数据也会增多,可用此功能处理冗余数据.<br/>
      <br/>	
    2、根据物理文件名是否存在数据库中，如果没有，则删除物理文件。</td>
  </tr>
  <tr >
    <td height="25" colspan="2" align="center"><a href="?action=edit" onclick="return reConfirm()">处理</a></td>
  </tr>
</table>
</div>
</body>
</html>