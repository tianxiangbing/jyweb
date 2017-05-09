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
<!--<div id="container">
--><% if request.querystring("action")="add" then' 取提交过来的数据

	adClass = trim(replace(Request.Form("adClass"),"'",""))
	adName = htmlEncode(trim(Request.Form("adName")))
	adPic = htmlEncode(trim(Request.Form("adPic")))
	if len(adPic)>17 then
		adSmallPic="upfile/advertise/"&"small_"&right(adPic,(len(adPic)-17))
	end if
	adUrl = trim(replace(Request.Form("adUrl"),"'",""))
	content = htmlEncode(Request.Form("content"))
	
	sql="insert into ad(adClass,adName,adPic,adSmallPic,adUrl,content) values("&adClass&",'"&adName&"','"&adPic&"','"&adSmallPic&"','"&adUrl&"','"&content&"')"
	'response.write sql
	'response.end
	conn.execute(sql)
	
	ok "添加成功！","add.asp"
end if

 %>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/advertise/add.asp?action=add" onSubmit="return chkAddAd();">
	<tr>
      <td colspan="2" class="table_title">添加广告</td>
    </tr>
    <tr>
      <td width="15%" align="right" class="left_title_2">广告类别：</td>
      <td width="85%"><select name="adClass"  style="background-color:#ECF3FF;">
      <option value="">请选择类别</option>
     <%  showClass 0,0,0,"AdClass"	%>
      </select>	 <span class="red">*</span></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">广告名称：</td>
      <td>
        <input name="adName" type="text" id="adName" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    
    <tr> 
      <td height="30" align="right" class="left_title_2">广告图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="adPic" type="text"  id="adPic" value="" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formName=form1&editname=adPic&uppath=upfile/advertise&filelx=<%= EnableUploadAd %>&enfileSize=<%= EnableUploadAdSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle" id="uploadFrame" ></iframe><span id="uploadInfo"></span> &nbsp;<font color="#FF0000">图片格式：<%=EnableUploadAd%> *</font></td>
    </tr>
	<tr> 
      <td height="30" align="right"  class="left_title_2">广告地址：</td>
      <td><input name="adUrl" type="text"  id="adUrl" size="50" value="http://">　
      <font color="#FF0000">*</font></td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">备注：</td>
      <td><textarea name="content" cols="50" rows="5" id="content" ></textarea></td>
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
