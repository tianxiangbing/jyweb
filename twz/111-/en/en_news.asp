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
    <td style="background:url(../images/news.jpg) center center no-repeat; height:298px;">
    </td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top">
    <!--#include file="en_news_left.asp"-->
    </td>
    <td width="15"></td>
    <td valign="top">
<%
classid =cint(request.QueryString("classid"))
if classid<>0 then 
set RsC=conn.execute("select * from newsClass where classid="&classid&"")
end if 
%>
    <table width="778" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="778" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" height="35" class="t_left">NEWS</td>
            <td align="right" class="t_right">LOCATION：HOME  &gt; NEWS<% if classid<>0 then  %>  &gt; <% =trim(RsC("EnClassName")) %> <% end if %></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="padding-top:10px; padding-bottom:40px;" height="350" valign="top">
 
<%
 if classid <> 0 then
	sql = "select id,entitle,ClassId,addtime,power from news where ClassId="&classid&" order by power desc,classid asc"
	else
	sql="select id,entitle,ClassId,addtime,power from news order by power desc,classid asc"		
end if
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
response.Write("No related types of news")
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
        	
<table width="99%" border="0" align="center" cellpadding="0" cellspacing="0">					 
 <tr>
 <td width="21" style="border-bottom:dotted 1px #ccc"><span class="tr_bot"><img src="../images/news_icon.png" alt="" /></span></td>				
    <td width="610" align="left" style="border-bottom:dotted 1px #ccc; padding-left:9px;" valign="middle">
      <a href="en_news_show.asp?NewsId=<% =rs("id") %>" title="<% =trim(rs("entitle")) %>"><font style="color:;"><% =trim(rs("entitle")) %></font></a>
   </td>
    <td width="139" style="border-bottom:dotted 1px #ccc" height="30" align="center">[<% =ForMatDatetime(rs("addtime"),2) %>]</td>
</tr>
<tr>
    <td valign="top" colspan="4"><div class="fgx"></div></td>
</tr>
</table>
<%
rs.movenext()
next
%>

<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
<tr>
  <td height="30" align="center">&nbsp;</td>
</tr>
<tr><td height="30" align="center"><% if rs.RecordCount>0 then %>  
  <% if i>0 then enshowpage("en_news.asp?classid="&classid&"&") %>
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
