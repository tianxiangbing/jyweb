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
<!--<div id="container">-->
<!--#include file="../fckeditor/fckeditor.asp" -->
<%
 'call PowerDetailInfo(0,3,3,0) '判断权限

 id=request.QueryString("id")
 checkId(id)
 page=request.QueryString("page")

 if request.querystring("action")="edit" then' 取提交过来的数据
	' 注意取新闻内容的方法，因为对大表单的自动处理，一定要使用循环，否则大于100K的内容将取不到，单个表单项的限制为102399字节（100K左右）
	Dim  sTitle, sContent, sPicture,class_news,d_autor,isSuggest
	
	title = Request.Form("title")
	Entitle = Request.Form("Entitle")
	newsClass = Request.Form("newsClass")
	power = Request.Form("power")
	newsPic = Request.Form("newsPic")
	isSuggest=request.Form("isSuggest")
	if isSuggest="" then isSuggest=false
	if newsClass="" then newsClass=0

	' 开始：eWebEditor编辑区取值-----------------
	scontent = ""
	For i = 1 To Request.Form("content").Count
		scontent = scontent & Request.Form("content")(i)
	Next
	scontent=getSafeContent(scontent)
	
	Encontent = ""
	For i = 1 To Request.Form("Encontent").Count
		Enscontent = Encontent & Request.Form("Encontent")(i)
	Next
	Encontent=getSafeContent(Enscontent)
	' 结束：eWebEditor编辑区取值-----------------

	' 以下为所有通过编辑器上传的所有文件相关信息，包括编辑区手动上传的和自动远程上传的
	' GetSafeStr函数为过滤一些特殊字符，
	
	' 上传后保存到本地服务器的文件名（不带路径），多个以"|"分隔
	Dim sSaveFileName,sSavePathFileName
	' 上传后保存到本地服务器的路径文件名，多个以"|"分隔
	SaveFileName = GetSafeStr(Request.Form("d_savefilename"))
	SavePathFileName = GetSafeStr(Request.Form("d_savepathfilename"))
	
	SaveFileName=CheckSaveFileNamePic(SaveFileName,scontent)	'主要解决编辑器中删除图片后，保存图片字段的调整。
	SavePathFileName=CheckSaveFileNamePic(SavePathFileName,scontent)
 
	sql="update [pic] set title='"&title&"',Entitle='"&Entitle&"',ClassId="&newsClass&",content='"&scontent&"','"&Encontent&"',Power="&Power&",isSuggest="&isSuggest&",editTime=now(),newsPic='"&newsPic&"',d_savefilename='"&SaveFileName&"',d_savepathfilename='"&SavePathFileName&"' where id="&id
	conn.execute(sql)
	
	
	ok "修改成功！","manage.asp?page="&page&"&newsClass_type="&newsClass&""
end if

set rs=conn.execute("select * from [pic] where id="&id)
if rs.eof then
	erro "无效ID"
end if

		sPicture = rs("newsPic")
		sSaveFileName = rs("d_savefilename")
		sSavePathFileName = rs("d_savepathfilename")

' 把带"|"的字符串转为数组，用于初始下拉框表单

		Dim aSavePathFileName
		aSavePathFileName = Split(rs("d_savepathfilename"), "|")

	' 根据新闻内容中相关上传文件为数据，初始下拉框表单
	' 函数InitSelect，根据数组值及初始值返回下拉框输出字串，具体请见startup.asp文件中函数的说明部分
		Dim sOptionSavePath
		sOptionSavePath = InitSelect("newsPic", aSavePathFileName, aSavePathFileName, sPicture, "", "无")
%>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="modify.asp?action=edit&page=<%= page %>&amp;id=<%= rs(0) %>" onSubmit="return chkNews();">
	<input type="hidden" name="d_savefilename" value="<%= rs("d_savefilename") %>">
    <input type="hidden" name="d_savepathfilename" value="<%= rs("d_savepathfilename") %>" onChange="doChange(this,document.form1.newsPic)">
	<tr>
      <td colspan="2" class="table_title">修改图片</td>
    </tr>
   <!-- <tr>
      <td width="15%" align="right" class="left_title_2">信息类别：</td>
      <td width="85%">
	  <select name="newsClass"  style="background-color:#ECF3FF;">
     <%  'showClass 0,0,rs("ClassId"),"picClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>-->
    <tr>
      <td align="right" class="left_title_2">中文信息标题：</td>
      <td>
        <input name="title" type="text" id="title" size="45" maxlength="100" value="<%= rs("title") %>" /><span class="red">*</span>
      </td>
    </tr>
     <tr>
      <td align="right" class="left_title_2">英文信息标题：</td>
      <td>
        <input name="Entitle" type="text" id="Entitle" size="45" maxlength="100" value="<%= rs("Entitle") %>" /><span class="red">*</span>      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="6" maxlength="6" value="<%= rs("power") %>" /><span class="red">*(按降序排列，即数字越大的越在前面)</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">上传图片：</td>
      <td><input name="newsPic" type="text"  id="newsPic" value="<%=rs("newsPic")%>" size="25" readonly="" />
&nbsp;
<iframe src="../inc/sctp.asp?formname=form1&editname=newsPic&amp;uppath=upfile/pic&filelx=<%= EnableUploadPic %>&amp;enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="No" style="vertical-align:middle" id="uploadFrame" ></iframe>
<span id="uploadInfo"></span><% if rs("newsPic")<> "" then %><a href="../../<%=rs("newsPic")%>" target="_blank"><img src="../../<%=rs("newsPic")%>" style="max-width:100px;border:1px solid #eee;" height="50" /></a><% end if %><bR /><font color="#FF0000">图片格式：<%= EnableUploadPic %> * 图片尺寸大小：300*180</font></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">信息内容：</td>
      <td>
       <%
	  Set oFCKeditor = New FCKeditor 
	  oFCKeditor.BasePath = "../FCKeditor/"  '基本路径，见意不要改动。
	 ' //设置编辑器的路径，我站点根目录下的一个目录 
	 oFCKeditor.ToolbarSet = "Default"   '采用哪几种工具条，有Default,base,具体   										                                          fckconfig.js里面设定.   
	 oFCKeditor.Width = "100%" '这里设定宽度,可以按 % 和值来选定.   
	 oFCKeditor.Height = "400" 
	 oFCKeditor.Value = rs("content") '//这个是给编辑器初始值 
	 oFCKeditor.Create "content" '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>
      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">英文新闻内容：</td>
      <td>
      <%
	  Set oFCKeditor = New FCKeditor 
	  oFCKeditor.BasePath = "../FCKeditor/"  '基本路径，见意不要改动。
	  '设置编辑器的路径，我站点根目录下的一个目录 
	 oFCKeditor.ToolbarSet = "Default"   '采用哪几种工具条，有Default,base,具体   										                                          fckconfig.js里面设定.   
	 oFCKeditor.Width = "100%"    '这里设定宽度,可以按 % 和值来选定.   
	 oFCKeditor.Height = "400" 
	 oFCKeditor.Value = rs("Encontent") '//这个是给编辑器初始值 
	 oFCKeditor.Create "Encontent"  '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>      </td>
    </tr>
    <tr bgcolor="#FFFFFF">
      <td class="left_title_2">&nbsp;</td>
      <td><input type="submit" name="btnsubmit" value="提 交" class="button2"> &nbsp; 
      <input type="reset" name="btnreset" value="重 写" class="button2"></td>
    </tr>  </form>
  </table>
<!--</div>-->
</body>
</html>
