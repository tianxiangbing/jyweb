<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
</head>
<!--#include file="../inc/subCode.asp"-->
<body>
<!--<div id="container">-->
<%

 id=request.QueryString("id")
 checkId(id)

 if request.querystring("action")="edit" then' 取提交过来的数据
	
	adClass = trim(replace(Request.Form("adClass"),"'",""))
	adName = htmlEncode(trim(Request.Form("adName")))
	adPic = htmlEncode(trim(Request.Form("adPic")))
	if len(adPic)>17 then
		adSmallPic="upfile/advertise/"&"small_"&right(adPic,(len(adPic)-17))
	end if
	adUrl = trim(replace(Request.Form("adUrl"),"'",""))
	content = htmlEncode(Request.Form("content"))
	

	
	sql="update ad set adClass="&adClass&",adName='"&adName&"',adPic='"&adPic&"',adSmallPic='"&adSmallPic&"',adUrl='"&adUrl&"',content='"&content&"' where id="&id
	'response.write sql
	'response.end
	conn.execute(sql)
	
	ok "修改成功！","manage.asp"
end if


set rs=conn.execute("select * from ad where id="&id)
if rs.eof then
	erro "无效ID"
end if



 %>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/advertise/modify.asp?action=edit&amp;id=<%= rs(0) %>" onSubmit="return chkAddAd();">
	<tr>
      <td colspan="2" class="table_title">修改广告</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">广告类别：</td>
      <td width="85%"><select name="adClass" id="fileClass"  style="background-color:#ECF3FF;">
     <%  showClass 0,0,rs("adClass"),"adClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">广告名称：</td>
      <td>
        <input name="adName" type="text" id="adName" size="45" maxlength="100" value="<%= rs("adName") %>" />
        <span class="red">*</span></td>
    </tr>
    
    <tr> 
      <td height="30" align="right" class="left_title_2">广告图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="adPic" type="text"  id="adPic" value="<%= rs("adPic") %>" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=adPic&uppath=upfile/advertise&filelx=<%= EnableUploadAd %>&enfileSize=<%= EnableUploadAdSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle"  id="uploadFrame" ></iframe><span id="uploadInfo"></span>&nbsp;<font color="#FF0000">图片格式：<%=EnableUploadAd%> *</font></td>
    </tr>
	<tr> 
      <td height="30" align="right"  class="left_title_2">广告地址：</td>
      <td><input name="adUrl" type="text"  id="adUrl" size="50" value="<%= rs("adUrl") %>">　
      <font color="#FF0000">*</font></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">备注：</td>
      <td><textarea name="content" cols="50" rows="5" id="content" ><%= htmlDecode(rs("content")) %></textarea></td>
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
