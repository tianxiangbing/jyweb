<%
'--------定义部份------------------
Dim Fy_Post,Fy_Get,Fy_In,Fy_Inf,Fy_Xh
Fy_In = Fy_In = "'中华建站;中华建站and中华建站exec中华建站insert中华建站select中华建站delete中华建站update中华建站count中华建站*中华建站%中华建站chr中华建站mid中华建站master中华建站truncate中华建站char中华建站decl"
'----------------------------------
%>
<%
Fy_Inf = split(Fy_In,"中华建站")
'--------POST部份------------------
If Request.Form<>"" Then
	For Each Fy_Post In Request.Form
		For Fy_Xh=0 To Ubound(Fy_Inf)
			If Instr(LCase(Request.Form(Fy_Post)),Fy_Inf(Fy_Xh))<>0 Then
				'--------写入数据库,专门设一个记录非法操作的表------------------------------------
				'set rs=server.createobject("adodb.recordset")
				'sql="insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_cs,SqlIn_nr,sqlin_time) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','POST','"&Fy_Post&"','"&replace(Request.Form(Fy_Post),"'","''")&"','"&now&"')"
				'rs.open sql,conn,3,2
				'set rs=nothing
				'---------------------------------------------------------------------------------
				Response.Write "<Script Language=JavaScript>alert('请不要在参数中包含非法字符！-----"&Fy_Inf(Fy_Xh)&"\n\n');"
				'Response.Write "非法操作！系统做了如下记录↓<br>"
				'Response.Write "操作ＩＰ："&Request.ServerVariables("REMOTE_ADDR")&"<br>"
				'Response.Write "操作时间："&Now&"<br>"
				'Response.Write "操作页面："&Request.ServerVariables("URL")&"<br>"
				'Response.Write "提交方式：ＰＯＳＴ<br>"
				'Response.Write "提交参数："&Fy_Post&"<br>"
				'Response.Write "提交数据："&Request.Form(Fy_Post)
				response.Write "javascript:history.go(-1)</script>"
				Response.End
			End If
		Next
	Next
End If


'--------GET部份-------------------
If Request.QueryString<>"" Then
	For Each Fy_Get In Request.QueryString
		For Fy_Xh=0 To Ubound(Fy_Inf)
			If Instr(LCase(Request.QueryString(Fy_Get)),Fy_Inf(Fy_Xh))<>0 Then
				'--------------------------------------写入数据库-----------------------------------------
				'set rs=server.createobject("adodb.recordset")
				'sql="insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_cs,SqlIn_nr) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','POST','"&Fy_Post&"','"&replace(Request.Form(Fy_Post),"'","''")&"','"&now&"')"
				'rs.open sql,conn,3,2
				'rs.close
				'set rs=nothing
				'-----------------------------------------------------------------------------------------
				Response.Write "<Script Language=JavaScript>alert('SQL防注入系统提示↓\n\n请不要在参数中包含非法字符尝试注入！\n\n');</Script>"
				Response.Write "非法操作！系统做了如下记录↓<br>"
				Response.Write "操作ＩＰ："&Request.ServerVariables("REMOTE_ADDR")&"<br>"
				Response.Write "操作时间："&Now&"<br>"
				Response.Write "操作页面："&Request.ServerVariables("URL")&"<br>"
				Response.Write "提交方式：ＧＥＴ<br>"
				Response.Write "提交参数："&Fy_Get&"<br>"
				Response.Write "提交数据："&Request.QueryString(Fy_Get)
				Response.End
			End If
		Next
	Next
End If
%>