<%
 ' Option Explicit
  Dim db,conn,connstr
  response.Buffer = true
  'on error resume next
  db="ycadmin/DB/ch#$%sx.asa"
  set conn = server.CreateObject("adodb.connection")
  connstr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath(db)
  conn.open connstr
  if err then
     err.clear
	 set conn = nothing
	 response.Write "数据库连接出错，请检查连接字符串。"
	 response.End()
  end if
  sub closeconn()
      set conn = nothing
  end sub	  	 
%>
<%
  sub erro(str)
      response.Write "<script language=javascript>alert ('"&str&"');"
	  response.Write "javascript:history.go(-1)</script>"
	  response.End()
  end sub
  sub ok(str,url)
      response.Write "<script language=javascript>alert ('"&str&"');"
	  response.Write "window.document.location.href='"&url&"';"
	  response.Write "</script>"
  end sub
%>