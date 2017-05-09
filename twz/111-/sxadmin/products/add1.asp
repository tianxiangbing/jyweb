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
<body>
<% 
if request.querystring("action")="add" then   '取提交过来的数据
'注意取产品内容的方法，因为对大表单的自动处理，一定要使用循环，否则大于100K的内容将取不到，单个表单项的限制为102399字节（100K左右）
	Dim  sTitle, sContent, proPic, proClass, d_autor, isSuggest, EnproName, Encontent
	proClass = Request.Form("proClass")
	proName = Request.Form("proName")
	EnproName = Request.Form("EnproName")
	power = Request.Form("power")
	proPic = Request.Form("proPic")
	languages = "2"
	isSuggest=request.Form("isSuggest")
	IsNew=request.Form("IsNew")
	
	' 开始：eWebEditor编辑区取值-----------------
	scontent = ""
	For i = 1 To Request.Form("Content").Count
		scontent = scontent & Request.Form("Content")(i)
	Next
	scontent=getSafeContent(scontent)
	
	Encontent = ""
	For i = 1 To Request.Form("Encontent").Count
		Encontent = Encontent & Request.Form("Encontent")(i)
	Next
	Encontent=getSafeContent(Encontent)
	' 结束：eWebEditor编辑区取值-----------------


	' 上传后保存到本地服务器的文件名（不带路径），多个以"|"分隔
	Dim d_savefilename
	' 上传后保存到本地服务器的路径文件名，多个以"|"分隔
	Dim d_savepathfilename
	d_savefilename=GetSafeStr(Request.Form("d_savefilename"))
	d_savepathfilename=GetSafeStr(Request.Form("d_savepathfilename"))
	
	d_savefilename=CheckSaveFileNamePic(d_savefilename,scontent)	'主要解决编辑器中删除图片后，保存图片字段的调整。
	d_savepathfilename=CheckSaveFileNamePic(d_savepathfilename,scontent)
	
	'sql="insert into products(ProName,EnProName,ClassId,content,Encontent,Power,isSuggest,ProPic,ProSmallPic,d_savefilename,d_savepathfilename) values('"&ProName&"','"&EnProName&"',"&proClass&",'"&scontent&"','"&Encontent&"',"&Power&","&isSuggest&",'"&ProPic&"','"&ProSmallPic&"','"&d_savefilename&"','"&d_savepathfilename&"')"
	'conn.execute(sql)
	'ok "发布成功！","add.asp"
	
	'on error resume next
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Products where 1=0"
	rs.open sql,conn,3,2
	rs.addnew
	rs("ProName") = ProName
	rs("EnProName") = EnProName
	rs("ClassId") = Cint(proClass)
	rs("Content") = scontent
	rs("EnContent") = Encontent
	rs("Power") = Cint(Power)
	
	rs("ProPic") = ProPic
	if len(proPic)>16 then
		rs("ProSmallPic")="upfile/products/"&"small_"&right(proPic,(len(proPic)-16))
		'response.Write("</br>")
		'response.Write(ProSmallPic)
		'response.End()
	end if
	
	rs("languages") = languages
	rs("d_savefilename") = d_savefilename
	rs("d_savepathfilename") = d_savepathfilename
	rs("Addtime") = Now()
	
	if IsNew <> "" then 
		rs("IsNew") = true
	else
		rs("IsNew") = false
	end if 
	
	if IsSuggest <> "" then 
		rs("IsSuggest") = true
	else
		rs("IsSuggest") = false
	end if 
	'rs.update
	if err<>0 then
		erro("添加失败，请检查字段")
    else
		ok "发布成功","add.asp"
	end if 
	rs.close
	set rs=nothing
end if
%>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/products/add.asp?action=add" onSubmit="return chkAddPro();">
	<input type="hidden" name="d_savefilename">
    <input type="hidden" name="d_savepathfilename" onChange="doChange(this,document.form1.d_picture)">
	<tr>
      <td colspan="2" class="table_title">发布产品</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">产品类别：</td>
      <td width="85%">
      <select name="proClass"  style="background-color:#ECF3FF;">
      <option value="">请选择类别</option>
     <%  showClass 0,0,0,"proClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">中文产品标题：</td>
      <td>
        <input name="proName" type="text" id="proName" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    
     <tr >
      <td align="right" class="left_title_2">英文产品标题：</td>
      <td>
        <input name="EnproName" type="text" id="EnproName" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" value="0" size="6" maxlength="6" /><span class="red">*(按降序排列，即数字越大越在前面)</span></td>
    </tr>
    <tr> 
      <td height="30" align="right" class="left_title_2">产品图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="proPic" type="text"  id="proPic" value="" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=proPic&uppath=upfile/products&filelx=<%= EnableUploadPic %>&enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe><span id="uploadInfo"></span>&nbsp;<font color="#FF0000">图片格式：<%= EnableUploadPic %> * 图片尺寸大小：500*500</font></td>
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
	 oFCKeditor.Value = "" '//这个是给编辑器初始值 
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
	 oFCKeditor.Value = "" '//这个是给编辑器初始值 
	 oFCKeditor.Create "EnContent" '//以后编辑器里的内容都是由这个logbody取得，命名由你定
	 %>
      </td>
    </tr>
    <!--<tr>
      <td align="right" class="left_title_2">是否推荐：</td>
      <td><input name="isSuggest" type="checkbox" id="isSuggest" value="true" >
      <font color="#FF0000">点选此项设为推荐
      <input name="IsNew" type="checkbox" id="IsNew" value="true" />
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
