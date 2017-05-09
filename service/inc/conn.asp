<%@ language="vbscript" codepage="65001" %>
<!--#include file="DB.asp"-->
<!--#include file="JSON.asp"-->
<% 	
Session.codepage=65001
Response.Charset="utf-8"
session.timeout=100
	dim conn,dbPath
	dbPath="../../databases/web.mdb"
	call initialize(conn,dbPath)
%>