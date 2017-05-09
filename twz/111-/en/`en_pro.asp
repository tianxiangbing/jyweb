

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
    <td>
    <img src="../images/80.jpg" width="100%" height="300" /></td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top">
    <!--#include file="en_left.asp"-->
    </td>
    <td width="15"></td>
    <td valign="top">
<%
classid = GetSafeInt(request.QueryString("classid"),0)  '得到类别的ID
classid2 = GetSafeInt(request.QueryString("classid2"),0)  '得到类别的ID
'set rsclass=conn.execute("select * from proClass where ClassId="&classid&"")

if classid<>0 then 
	set RsC=conn.execute("select * from proClass where classid="&classid&"")
end if 

if classid2<>0 then 
	set RsC=conn.execute("select * from proClass where classid="&classid2&"")
	set RsC2=conn.execute("select * from proClass where classid="&RsC("classpid")&"")
end if 
%>	
    <table width="778" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="778" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" class="t_left">PRODUCTS</td>
            <td align="right" class="t_right">LOCATION：HOME > PRODUCTS
			<% IF classid<>0 THEN  %> > <% =RsC("enclassname") %><% end  if  %>
            <% if classid2<>0 then  %> > <% =trim(RsC2("enclassname")) %> > <% =trim(RsC("enclassname")) %><% end if %>

             </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="padding-top:10px; padding-bottom:30px;">
        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
<%
keys = trim(request.Form("keys"))
'response.Write(keys)
'sql="select id,classid,proname,ProSmallPic,propic from products where 1=1"
'if keys<>"" then sql=sql&" and ProName LIKE '%"&keys&"%'"
'IF classid<>0 THEN sql=sql&" and ClassId="&ClassId&" " 
'sql=sql
'sql=sql&" order by power,id desc"


if classid<>0 then 
	sql="select * from products where classid in (select classid from proClass where classpid="&classid&") or classid="&classid&" order by power,id desc"
end if 
if classid2<>0 then 
	sql="select * from products where classid="&ClassId2&" order by power,id desc"
end if

if keys<>"" then sql="select * from products where ProName LIKE '%"&keys&"%' order by power,id desc"

if classid=0 and classid2=0 and keys=""  then 
	sql="select * from products order by power,id desc"
end if

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
	response.Write("No related types of products")
	response.write("</div>")
end if  

rs.pagesize=6
if curpage <= 0 then curpage=1 end if 
if curpage >= rs.pagecount then curpage=rs.pagecount end if 
if not rs.eof then
	rs.absolutepage=curpage  
 end if
 
 j=0  '换行
for i=1 to rs.pagesize
if rs.eof then exit for
if rs("ProPic")<>"" then 
	IMGPath = rs("ProPic")
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
            <td align="left" valign="top">
            <table width="33%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="200" align="center" style="border:1px solid rgb(216, 216, 216);padding:5px;">
                <a href="en_pro_info.asp?ProId=<% =rs("id") %>">
                <img src="../<% =trim(rs("propic")) %>" width="<% =W %>" height="<% =H %>" title="<% =trim(rs("EnProName")) %>"/>
                </a></td>
              </tr>
              <tr>
                <td height="30" align="center"><a href="en_pro_info.asp?ProId=<% =rs("id") %>" title="<% =trim(rs("EnProName")) %>"><% =trim(rs("EnProName")) %></a></td>
              </tr>
            </table>
            </td>
<%
j=j+1
if j mod 3=0 then response.Write("</tr><tr>") 
rs.movenext()
next
%> 
            </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="40" align="center">
				<% if rs.RecordCount>0 then %>  
<% if i>0 then enshowpage("en_pro.asp?classid="&classid&"&") %>
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
