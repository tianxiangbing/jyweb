 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312 " />
</head>
<style>
body{
font-size:12px;}
</style>
<body>
<!--#include file="inc/conn.asp"-->
<%
if request.QueryString("date")<>"" then
add_date=cdate(request.QueryString("date"))
sql="select content,add_date,sourse from news where str(add_date)='"&add_date&"'"
'response.Write(sql)
set rs=server.CreateObject("ADODB.recordset")
rs.open sql,conn,1,1
if not rs.eof then
response.Write(rs("add_date")&rs("sourse")&"<br/><hr/><br/>")
response.Write(rs("content"))
end if
rs.close:set rs=nothing
end if
%>
  <script>
  print();
  window.close(); 
  </script>
  </body>
  </html>