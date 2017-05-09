

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>杭州捷曼计算机网络有限公司</title>
<link href="../css/css.css" rel="stylesheet" type="text/css" />
</head>

<body>
<!--#include file="en_top.asp"-->
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td style=" background:url(../images/fuwu.jpg) no-repeat center center; height:350px;"></td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top"><!--#include file="en_project_left.asp"--></td>
    <td width="15"></td>
    <td valign="top">
<%
NewsId=request.QueryString("id")
set rs22=conn.execute("select * from pic where id="&NewsId&"")
if rs22("newspic")<>"" then 
	IMGPath = rs22("newspic")
	Set PP = New ImgWHInfo 
	W = PP.imgW(Server.Mappath(IMGPath)) 
	H = PP.imgH(Server.Mappath(IMGPath)) 
	Set pp = Nothing 
	if W>500 or H>500 then
		if W/500>H/500 then
			H = H / (W/500)
			W = 500
		else
			W = W / (H/500)
			H = 500
		end if
	end if
	if W=0 Then W=500
	if H=0 Then H=500
end if 

'得到类别
set RsC22=conn.execute("select * from newsClass where classid="&rs22("classid")&"")
%> 
    <table width="778" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="778" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" class="t_left"><span style="padding-right:5px;">PROJECT</span></td>
            <td align="right" class="t_right">LOCATION：HOME  &gt;PROJECT </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="padding-top:10px; padding-bottom:40px;" height="300" valign="top">
        	<div style="padding:0px 5px 2px 5px;">
    <div style="text-align:center;font-weight:bold; font-size:14px; padding:5px 0 5px 0px; "><% =trim(rs22("entitle")) %></div>
    <div style="text-align:right; line-height:22px; color:#999; padding-bottom:5px;">Time：<% =ForMatDatetime(rs22("addtime"),2) %> </div>
     <div style="text-align:center; line-height:22px; color:#999; padding-bottom:5px;"><img src="../<% =IMGPath %>" style="margin-top:20px;"alt="" width="<% =W %>" height="<% =H %>" /></div>
    <div style="line-height:180%;"><div class="Section0" style="layout-grid:  15.6pt none">
    Details：<% =trim(rs22("encontent")) %>
	</div>
	</div>
    <div style="text-align:center;margin-top:20px;font-weight:bold;"><a href="javascript:history.back();">[Back]</a></div>
</div>
        </td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="en_bottom.asp"-->
</body>
</html>
