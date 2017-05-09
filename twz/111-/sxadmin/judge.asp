<%
  if session("login") <> true or session("admin") = "" then
     response.Write "<script type='text/javascript'>alert ('你未登录该页面或登录超时，请重新登陆!');"
	 response.Write "window.parent.location.href='index.html';"
	 response.Write "</script>"
	 response.End()
  end if	 
%>