<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<!--#include file="../inc/subCode.asp"-->
<!--#include file="../fckeditor/fckeditor.asp" -->
<script type="text/javascript" src="../js/checkForm.js"></script>
<script type="text/javascript">
function doChange(objText, objDrop){
		if (!objDrop) return;
		var str = objText.value;
		var arr = str.split("|");
		var nIndex = objDrop.selectedIndex;
		objDrop.length=1;
		for (var i=0; i<arr.length; i++){
			objDrop.options[objDrop.length] = new Option(arr[i], arr[i]);
		}
		objDrop.selectedIndex = nIndex;
	}
</script>
</head>
<%
 id=request.QueryString("id")
 checkId(id)
 page=request.QueryString("page")
 if request.querystring("action")="edit" then' 取提交过来的数据
 
'注意取产品内容的方法，因为对大表单的自动处理，一定要使用循环，否则大于100K的内容将取不到，单个表单项的限制为102399字节（100K左右）
	Dim  sContent, proPic, proClass, isSuggest, IsNew, EnProName, proName, power
	proClass = Request.Form("proClass")
	proName = Request.Form("proName")
	EnProName = Request.Form("EnProName")
	power = Request.Form("power")
	languages = "2"
	proPic = Request.Form("proPic")
	if len(proPic)>16 then
		ProSmallPic="upfile/products/"&"small_"&right(proPic,(len(proPic)-16))
	end if
	isSuggest=request.Form("isSuggest")
	if isSuggest="" then isSuggest=false end if
	IsNew=request.Form("IsNew")
	if IsNew="" then IsNew=false end if
	if proClass="" then proClass=0 end if

	
	' 开始：eWebEditor编辑区取值-----------------
	scontent = ""
	For i = 1 To Request.Form("content").Count
		scontent = scontent & Request.Form("content")(i)
	Next
	scontent=getSafeContent(scontent)
	
	EnContent = ""
	For i = 1 To Request.Form("EnContent").Count
		EnContent = EnContent & Request.Form("EnContent")(i)
	Next
	EnContent=getSafeContent(EnContent)
	' 结束：eWebEditor编辑区取值-----------------

	' 上传后保存到本地服务器的文件名（不带路径），多个以"|"分隔
	Dim sSaveFileName,sSavePathFileName
	' 上传后保存到本地服务器的路径文件名，多个以"|"分隔
	SaveFileName = GetSafeStr(Request.Form("d_savefilename"))
	SavePathFileName = GetSafeStr(Request.Form("d_savepathfilename"))
	
	SaveFileName=CheckSaveFileNamePic(SaveFileName,scontent)	'主要解决编辑器中删除图片后，保存图片字段的调整。
	SavePathFileName=CheckSaveFileNamePic(SavePathFileName,scontent)
	
	on error resume next
	sql="update products set ProName='"&ProName&"',ClassId="&proClass&",content='"&scontent&"',Power="&Power&",isSuggest="&isSuggest&",editTime=now(),proPic='"&proPic&"',ProSmallPic='"&ProSmallPic&"',d_savefilename='"&SaveFileName&"',d_savepathfilename='"&SavePathFileName&"',languages='"&languages&"',EnProName='"&EnProName&"',EnContent='"&EnContent&"',IsNew="&IsNew&" where id="&id
	conn.execute(sql)
	ok "修改成功！","manage.asp?page="&page
end if 

set rs=conn.execute("select * from products where id="&id)
if rs.eof then
	erro "无效ID"
end if
%>
<body>
  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
  <form id="form1" name="form1" method="post" action="../../sxadmin/products/modify.asp?action=edit&page=<%= page %>&id=<%= rs(0) %>" onSubmit="return chkAddPro();">
	<input type="hidden" name="d_savefilename" value="<%= rs("d_savefilename") %>">
    <input type="hidden" name="d_savepathfilename" value="<%= rs("d_savepathfilename") %>" onChange="doChange(this,document.form1.newsPic)">
	<tr>
      <td colspan="2" class="table_title">修改产品</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">产品类别：</td>
      <td width="85%"><select name="proClass" id="proClass"  style="background-color:#ECF3FF;">
     <%  showClass 0,0,rs("ClassId"),"proClass"	%>
      </select>	 <span class="red">*(按降序排列，即数字越大越在前面)</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2"> 中文产品标题：</td>
      <td>
        <input name="proName" type="text" id="proName" size="45" maxlength="100" value="<%= rs("proName") %>" />
        <span class="red">*</span>      </td>
    </tr>
      <tr>
      <td align="right" class="left_title_2">英文产品标题：</td>
      <td>
        <input name="EnProName" type="text" id="EnProName" size="45" maxlength="100" value="<%= rs("EnProName") %>" />
        <span class="red">*</span>      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" size="6" maxlength="6" value="<%= rs("power") %>" /><span class="red">*</span></td>
    </tr>
    <tr> 
      <td height="30" align="right" class="left_title_2">产品图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="proPic" type="text"  id="proPic" value="<%= rs("proPic") %>" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=proPic&uppath=upfile/products&filelx=<%= EnableUploadPic %>&enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle"  id="uploadFrame" ></iframe><span id="uploadInfo"></span>&nbsp;<font color="#FF0000">图片格式：<%=EnableUploadPic%> *图片尺寸大小：500*500</font></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">中文产品内容：</td>
      <td>
      <%
	  Set oFCKeditor = New FCKeditor 
	  oFCKeditor.BasePath = "../FCKeditor/"  '基本路径，见意不要改动。
	 ' //设置编辑器的路径，我站点根目录下的一个目录 
	 oFCKeditor.ToolbarSet = "Default"   '采用哪几种工具条，有Default,base,具体   										                                          fckconfig.js里面设定.   
	 oFCKeditor.Width = "100%" '这里设定宽度,可以按 % 和值来选定.   
	 oFCKeditor.Height = "400" 
	 oFCKeditor.Value = rs("Content") '//这个是给编辑器初始值 
	 oFCKeditor.Create "Content" '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>
      </td>
    </tr>
     <tr>
      <td align="right" class="left_title_2">英文产品内容：</td>
      <td>
      <%
	  Set oFCKeditor = New FCKeditor 
	  oFCKeditor.BasePath = "../FCKeditor/"  '基本路径，见意不要改动。
	 ' //设置编辑器的路径，我站点根目录下的一个目录 
	 oFCKeditor.ToolbarSet = "Default"   '采用哪几种工具条，有Default,base,具体   										                                          fckconfig.js里面设定.   
	 oFCKeditor.Width = "100%" '这里设定宽度,可以按 % 和值来选定.   
	 oFCKeditor.Height = "400" 
	 oFCKeditor.Value = rs("EnContent") '//这个是给编辑器初始值 
	 oFCKeditor.Create "EnContent" '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>
      </td>
    </tr>
   <!-- <tr>
      <td align="right" class="left_title_2">是否推荐：</td>
      <td><input name="isSuggest" type="checkbox" id="isSuggest" value="true" <% 'if rs("isSuggest")=true then response.Write("checked='checked'") end if  %> >
      <font color="#FF0000">点选此项设为产品推荐
      <input name="IsNew" type="checkbox" id="IsNew" value="true" <%' if rs("IsNew")=true then response.Write("checked='checked'") end if  %> />
      <font color="#FF0000">点选此项设为最新产品</font></font></td>
    </tr>-->
    
    <tr bgcolor="#FFFFFF">
      <td class="left_title_2">&nbsp;</td>
      <td><input type="submit" name="btnsubmit" value="提 交" class="button2"> &nbsp; 
      <input type="reset" name="btnreset" value="重 写" class="button2"></td>
    </tr>  </form>
  </table>
<!--</div>-->
</body>
</html>
