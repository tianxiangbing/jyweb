<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
</head>
<!--#include file="../inc/subCode.asp"-->
<!--#include file="../fckeditor/fckeditor.asp" -->
<body>
<div id="container">
<% 
	 ' 传入参数：新闻ID
	Dim ID
	ID = Trim(Request.QueryString("id"))
	checkId(id)
	' 从数据库中取初始值
	
	set rs =conn.execute("SELECT * FROM Info WHERE id=" & ID)
	If  rs.Eof Then
		call erro("无效的ID，请点页面上的链接进行操作！")
	End If
	
	if request.querystring("action")="add" then' 取提交过来的数据
		scontent = ""
		For i = 1 To Request.Form("content").Count
			scontent = scontent & Request.Form("content")(i)
		Next
		scontent=getSafeContent(scontent)
		conn.execute("update Info set InfoContent='"&scontent&"' where id="&id)
	    ok "修改成功！","infoList.asp"
	end if

 %>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
 <form action="../../sxadmin/info/Info.asp?action=add&id=<%=ID%>" method="post" name="form1" onSubmit="return chkInfo();">
	<tr>
      <td colspan="2" class="table_title"><%= rs("infoName") %></td>
    </tr>
    <tr>
      <td width="12%" align="right" class="left_title_2">信息内容：</td>
      <td width="88%">
      <%
	  Set oFCKeditor = New FCKeditor 
	  oFCKeditor.BasePath = "../FCKeditor/"  '基本路径，见意不要改动。
	 ' //设置编辑器的路径，我站点根目录下的一个目录 
	 oFCKeditor.ToolbarSet = "Default"   '采用哪几种工具条，有Default,base,具体   										                                          fckconfig.js里面设定.   
	 oFCKeditor.Width = "100%" '这里设定宽度,可以按 % 和值来选定.   
	 oFCKeditor.Height = "400" 
	 oFCKeditor.Value = rs("InfoContent") '//这个是给编辑器初始值 
	 oFCKeditor.Create "Content" '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>
      </td>
    </tr>
    <tr bgcolor="#FFFFFF">
      <td class="left_title_2">&nbsp;</td>
      <td><input type="submit" name="btnsubmit" value="修 改" class="button2"> &nbsp; 
      <input type="reset" name="btnreset" value="重 写" class="button2"></td>
    </tr>  </form>
  </table>
</div>
</body>
</html>
