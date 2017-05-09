<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!--#include file="sjlj.asp"-->
<%
if request.ServerVariables("REQUEST_METHOD")="POST" then
	mg_title=request.Form("newsTitle")
	contact=request.Form("con_sort")&"->"&request.Form("contact")
	mg_content=request.Form("content")
	mg_addr=request.Form("mg_addr")
	sql="select top 1*from message"
	set rs=server.CreateObject("adodb.recordset")
	on error resume next
	rs.open "select * from Messages",conn,1,3
	rs.addnew
	rs("mg_title")=mg_title
	rs("contact")=contact
	rs("mg_addr")=mg_addr
	rs("mg_content")=mg_content
	rs.Update	
	rs.close:set rs=nothing
	response.Write("<script>alert('ÒÑ·¢³öÁôÑÔ!');location.href='contact.asp';</script>")
end if
%>