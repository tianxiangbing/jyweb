<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
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

function change(val){
		switch(val){
			case "0":
				document.getElementById("Cn_title").style.display = "block";
				document.getElementById("Cn_content").style.display = "block";	
				document.getElementById("En_title").style.display = "none";
				document.getElementById("En_content").style.display = "none";	
				break;
			case "1":
				document.getElementById("Cn_title").style.display = "none";
				document.getElementById("Cn_content").style.display = "none";	
				document.getElementById("En_title").style.display = "block";
				document.getElementById("En_content").style.display = "block";	
				break;
			case "2":
				document.getElementById("Cn_title").style.display = "block";
				document.getElementById("Cn_content").style.display = "block";	
				document.getElementById("En_title").style.display = "block";
				document.getElementById("En_content").style.display = "block";	
				break;
		}
	}
</script>

</head>
<!--#include file="../inc/subCode.asp"-->
<% if request.querystring("action")="add" then' 取提交过来的数据
	Dim EnlinkName, linkname, linkpic,linkSmallPic, linkUrl, power, linkContent, EnlinkContent, languages
	linkname = htmlEncode(trim(Request.Form("linkname")))
	EnlinkName = htmlEncode(trim(Request.Form("linkname")))
	linkpic = htmlEncode(trim(Request.Form("linkpic")))
	if len(linkpic)>18 then
		linkSmallPic="upfile/friendlink/"&"small_"&right(linkpic,(len(linkpic)-18))
	end if
	linkUrl = trim(replace(Request.Form("linkUrl"),"'",""))
	power = trim(replace(Request.Form("power"),"'",""))
	linkContent = htmlEncode(Request.Form("linkContent"))
	EnlinkContent = htmlEncode(Request.Form("EnlinkContent"))
	languages = htmlEncode(Request.Form("languages"))
	
	'on error resume next
	sql="insert into friendlink(linkname,EnlinkName,linkpic,linkSmallPic,linkUrl,Power,linkContent,EnlinkContent,languages) values('"&linkname&"','"&EnlinkName&"','"&linkpic&"','"&linkSmallPic&"','"&linkUrl&"',"&Power&",'"&linkContent&"','"&EnlinkContent&"','"&languages&"')"
	conn.execute(sql)
	ok "添加成功！","add.asp"
end if
%>
<body onLoad="change('0')">
<!--<div id="container">-->

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/friendlink/add.asp?action=add" onSubmit="return chkAddFL();">
	<tr>
      <td colspan="2" class="table_title">添加友情链接</td>
    </tr>
     <tr>
     <td class="left_title_2" align="right">语言选择：</td>
    <td><select name="languages" id="languages" onchange="change(this.value)">
       <option value="0" selected>中文</option>
       <option value="1">英文</option>
       <option value="2">中英文</option>
      </select></td>
    </tr>
    <tr id="Cn_title">
      <td width="17%" align="right" class="left_title_2">中文友情链接名称：</td>
      <td width="83%">
        <input name="linkName" type="text" id="linkName" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    <tr id="En_title">
      <td width="17%" align="right" class="left_title_2">英文友情链接名称：</td>
      <td width="83%">
        <input name="EnlinkName" type="text" id="EnlinkName" size="45" maxlength="100" />
        <span class="red">*</span>
      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">排　　序：</td>
      <td><input name="power" type="text" id="power" value="0" size="6" maxlength="6" /><span class="red">*</span></td>
    </tr>
    <tr> 
      <td height="30" align="right" class="left_title_2">友情链接图片：</td>
    <td valign="bottom" bgcolor="#FFFFFF"><input name="linkPic" type="text"  id="linkPic" value="" size="25" readonly="">
    &nbsp;<iframe src="../inc/sctp.asp?formname=form1&editname=linkPic&uppath=upfile/friendlink&filelx=<%= EnableUploadPic %>&enFileSize=<%= EnableUploadPicSize %>" width="320" height="35" frameborder="0" scrolling="no" style="vertical-align:middle"  id="uploadFrame" ></iframe><span id="uploadInfo"></span> &nbsp;<font color="#FF0000">图片格式：<%= EnableUploadPic %> *</font></td>
    </tr>
   <tR>
      <td height="30" align="right"  class="left_title_2">友情链接地址：</td>
      <td><input name="linkUrl" type="text"  id="linkUrl" size="50" value="http://">　
      <font color="#FF0000">*</font></td>
    </tr>
    <tr id="Cn_content">
      <td align="right" class="left_title_2"> 中文备注：</td>
      <td><textarea name="linkContent" cols="50" rows="5" id="linkContent" ></textarea></td>
    </tr>
    <tr id="En_content">
      <td align="right" class="left_title_2">英文备注：</td>
      <td><textarea name="EnlinkContent" cols="50" rows="5" id="EnlinkContent" ></textarea></td>
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
