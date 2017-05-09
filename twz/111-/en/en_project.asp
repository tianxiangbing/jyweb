

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
    <td style=" background:url(../images/fuwu.jpg) no-repeat center center; height:350px;">
   </td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top">
    <!--#include file="en_project_left.asp"-->
    </td>
    <td width="15"></td>
    <td valign="top"><table width="778" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="778" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" class="t_left">PROJECT</td>
            <td align="right" class="t_right">LOCATION：HOME > PROJECT</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="padding-top:10px; padding-bottom:20px;"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
<%
keys = trim(request.Form("keys"))
'response.Write(keys)
'sql="select id,classid,proname,ProSmallPic,propic from products where 1=1"
'if keys<>"" then sql=sql&" and ProName LIKE '%"&keys&"%'"
'IF classid<>0 THEN sql=sql&" and ClassId="&ClassId&" " 
'sql=sql
'sql=sql&" order by power,id desc"


	sql="select * from pic order by power,id desc"

'response.write(sql)
Dim sql,curpage
if isempty(request("curpage")) then 
	curpage=1
else
	curpage=cint(request("curpage"))
end if

set rs=server.CreateObject("adodb.recordset")
rs.open sql,conn,1,3 

if rs.pagecount = 0 then 
	response.write("<div style='text-align:center;padding-top:20px;width:500px;height:25px;font-size:12px;'>")
	response.Write("No related types of information")
	response.write("</div>")
end if  

rs.pagesize=8
if curpage <= 0 then curpage=1 end if 
if curpage >= rs.pagecount then curpage=rs.pagecount end if 
if not rs.eof then
	rs.absolutepage=curpage  
 end if
 
 j=0  '换行
for i=1 to rs.pagesize
if rs.eof then exit for
if rs("newsPic")<>"" then 
	IMGPath = rs("newsPic")
	Set PP = New ImgWHInfo 
	W = PP.imgW(Server.Mappath(IMGPath)) 
	H = PP.imgH(Server.Mappath(IMGPath)) 
	Set pp = Nothing 
	if W>240 or H>200 then
		if W/240>H/200 then
			H = H / (W/240)
			W = 240
		else
			W = W / (H/200)
			H = 200
		end if
	end if
	if W=0 Then W=240
	if H=0 Then H=200
end if 
%> 
            <td align="left" valign="top" height="230"><table width="50%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="330" height="180" align="center" valign="middle" style="border:1px solid rgb(216, 216, 216);">
                <a href="en_project_info.asp?id=<% =rs("id") %>"><img src="../<% =IMGPath %>" width="330" height="180" title="<% =trim(rs("Entitle")) %> "/></a></td>
              </tr>
              <tr>
                <td height="35" align="left"><a href="en_project_info.asp?id=<% =rs("id") %>">project name：<% =trim(rs("Entitle")) %></a></td>
              </tr>
              </table></td>
<%
j=j+1
if j mod 2=0 then response.Write("</tr><tr>") 
rs.movenext()
next
%>
            </tr>
        </table>
         <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="30" align="center">
				<% if rs.RecordCount>0 then %>  
<% if i>0 then enshowpage("en_project.asp?classid="&classid&"&") %>
<%
rs.close
set rs=nothing
%> 
<% end if %> </td>
              </tr>
            </table>
          </td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="en_bottom.asp"-->
</body>
</html>
