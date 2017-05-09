<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>杭州捷曼计算机网络有限公司</title>
<link href="css/css.css" rel="stylesheet" type="text/css" />
</head>

<body>
<!--#include file="top.asp"-->
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td style="background:url(images/113.jpg) no-repeat center center;height:350px;"></td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top">
    <!--#include file="left_type.asp"-->
    </td>
    <td width="20"></td>
    <td valign="top"><table width="773" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="773" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" class="t_left"><span class="t_right">服务中心</span></td>
            <td align="right" class="t_right">您所在的位置： 首页 > 服务中心 </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="padding-top:10px; padding-bottom:40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
        <tR><td height="30">&nbsp;</td></tR>
        <tr>
        <%
	sql="select * from download order by power desc,id asc"		
'response.Write(sql)

Dim sql,curpage
if isempty(request("curpage")) then 
	curpage=1
else
	curpage=cint(request("curpage"))
end if

set rs=server.CreateObject("adodb.recordset")
rs.open sql,conn,1,3 
		  
if rs.pagecount = 0 then 
response.write("<div style='text-align:center;padding-top:20px;width:600px;height:25px;'>")
response.Write("暂无相关类型的信息")
response.write("</div>")
end if  
		  
rs.pagesize=10
if curpage <= 0 then curpage=1 end if 
if curpage >= rs.pagecount then curpage=rs.pagecount end if 
if not rs.eof then
	rs.absolutepage=curpage  
end if

for i=1 to rs.pagesize
 if rs.eof then exit for
%>
        <td align="left" valign="middle" >
        <div style="border-bottom: 1px dashed rgb(225, 225, 225);padding-bottom:15px;">
        <table border="0" align="center" cellpadding="0" cellspacing="0" width="100%" <% if j mod 2=0 then %>class="down_right"<% end if %>>
          <tr>
            <td width="100" rowspan="2" align="center" valign="middle" ><img src="images/pdf.png" width="60" height="60" /></td>
            <td width="563" height="30" align="left" valign="middle"><a href="<% =trim(rs("filepath")) %>"  style="font-size:14px; font-weight:bold;">
              <% =trim(rs("filename")) %>
            </a></td>
            <td width="108" align="left" valign="middle">&nbsp;</td>
          </tr>
          <tr>
            <td height="30" align="right" valign="middle"><a href="<% =trim(rs("filepath")) %>"><img src="images/download.png" width="70" height="22" /></a></td>
            <td align="right" valign="middle">&nbsp;</td>
          </tr>
          </table>
          </div>
          </td>
<%
j=j+1
if j mod 2=0 then response.Write("</tr><tr>") 
rs.movenext()
next
%>      
        </tr>
        </table>
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="50" align="center"><% if rs.RecordCount>0 then %>  
  <% if i>0 then showpage("download.asp?classid="&classid&"&") %>
  <%
rs.close
set rs=nothing
%> 
  <% end if %></td>
  </tr>
</table>

          </td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="bottom.asp"-->
</body>
</html>
