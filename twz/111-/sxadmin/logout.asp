<!--#include file="inc/function.asp"-->
<%
	session("login")=""
	session("adminName")=""
	session("lastLogin")=""  '上次登陆时间
	session("lastLoginIp")="" '上次登陆IP
	'session.Abandon()
	ok "你已退出系统,谢谢惠顾!","index.html"
%>