<!--#include file="inc/conn.asp"-->
<%
	Response.Charset="gb2312"

	Dim CmdSP
	Dim adoRS
	Dim adCmdSPStoredProc
	Dim adParamReturnValue
	Dim adParaminput
	Dim adParamOutput
	Dim adInteger
	Dim iVal
	Dim oVal
	Dim adoField
	Dim adVarChar
	
	adCmdSPStoredProc = 4
	adParamReturnValue = 4
	adParaminput = 1
	adParamOutput = 2
	adInteger = 3
	adVarChar = 200
	
	iVal = 5
	oVal = 3
'if request.ServerVariables("Request_method") <> "POST" then Response.End
set rs=server.CreateObject("ADODB.recordset")
select case request.querystring("menu")
	case "zzsc"
		'response.write("ok<img/><a href=''>h</a>")
		id =cint(request.QueryString("id"))
		sql="select content from news where id="&id&""	
		'response.Write(sql)
		rs.open sql,conn,1,1
		if not rs.eof then
			if len(rs("content"))>200 then
			 response.write( (left(rs("content"),200)))
			else
			response.Write((rs("content")))
			end if 
		else
		response.Write("暂无信息!")
		end if
		myClose
	case "showzzsc"
		id =cint(request.QueryString("id"))
		sql="select content from news where id="&id&""	
		'response.Write(sql)
		rs.open sql,conn,1,1
		if not rs.eof then
			response.Write(rs("content"))
		end if
		myClose
	case "login"
		if session("uid")<>""then 
			call Check( Trim(session("uName")) ,session("pwd"))
		else
			if request.QueryString("val")="" or request.QueryString("uid")="" or request.QueryString("val")="pwd" then 
			ShowError("请输入完整！")
			else
				if cint(session("tianxiangbing"))<>cint(request.QueryString("val")) then
					ShowError("验证码输入错误")
					set session("tianxiangbing")=nothing				
					response.End
				else		
					IsUser(Trim(request.querystring("uid")))
					call Check( Trim(request.querystring("uid")) ,request.QueryString("pwd"))
				end if
				myClose
			end if
		end if
	case "reg"
		RegInfo
		myClose
end select
'***************************'
'******释放资源*************'
'***************************'
Sub myClose
	conn.Close
	set rs=nothing
	set conn=nothing
End Sub

'*******************************'
'*****验证用户是否存在**********'
'*******************************'
Sub IsUser(uid)
	sql="select * from user_info where username=@username"
	set Cmd = Server.CreateObject("ADODB.Command")
	Cmd.CommandText=sql
	Cmd.activeConnection=conn
	Cmd.Parameters.Append Cmd.CreateParameter("@username", adVarChar, adParaminput, 50, uid)
	set rs=Cmd.Execute()
	if rs.eof then 
		ShowError("用户不存在！")
		response.End		
	end if
	rs.close
End Sub

Sub Check1(uid,pwd)
	sql="select *from user_info where userName='"&uid&"' and pwd='"&pwd&"'"
	rs.open sql,conn,1,1
	if rs.eof then
		ShowError("密码输入有误！")
		response.End
	else
		'ShowError("成功!")
		session("uid")=rs("uid")
		session("uName")=rs("userName")
		session("pwd")=rs("pwd")
		LoginSucceed
	End if
	rs.close
End Sub
'*************************************************'
'*****验证用户登录********************************'
'*****参数uid:用户名******************************'
'*****参数pwd:用户密码****************************'
'*************************************************'
Sub Check(uid,pwd)
	sql="select *from user_info where userName=@username and pwd=@pwd"
	set Cmd = Server.CreateObject("ADODB.Command")
	Cmd.CommandText=sql
	Cmd.activeConnection=conn
	Cmd.Parameters.Append Cmd.CreateParameter("@username", adVarChar, adParaminput, 50, uid)
	Cmd.Parameters.Append Cmd.CreateParameter("@pwd", adVarChar, adParaminput, 50, pwd)
	set rs=Cmd.Execute()

	if rs.eof then
		ShowError("密码输入有误！")
		response.End
	else
		'ShowError("成功!")
		session("uid")=rs("uid")
		session("uName")=rs("userName")
		session("pwd")=rs("pwd")
		LoginSucceed
	End if
	rs.close
End Sub

Sub MessageBox(Message)
	%>
	<Script language="JavaScript">
	alert('<%=Message%>');
	</script>
	<%
End Sub

'********************************************'
'************显示错误信息********************'
'********************************************'
Sub ShowError(Message)
	response.write("<div style='color:blue;'>"&Message&"</div>")
	userLogin
End Sub

Sub userLogin
%>
<table>
<tr><td colspan="2"><img src="images/login.gif" /></Td></tr>
  <tr><td align="right" valign="middle" nowrap="nowrap">会员名：</td>
<td><input class="input" id="userName" >
</input></td>
</tr>
	<tr>
	  <td align="right" valign="middle">密码：</td>
	  <td><input class="input" id="pwd" type="password" size="32"/></td></tr>
	<tr>
	  <td align="right" valign="middle">验证：</td>
	  <td><input class="val" id="val" size="4"/><img src="inc/verifycode.asp" onclick="this.src='inc/verifycode.asp'" height="12px"width="40px" /></td></tr>
	<tr><td colspan="2" align="center"><input type="submit" name="submit" value="登录" onclick="check();"/>
	    <input type="button" name="btnReg" value="注册"/></td></tr>
		<tR><td colspan="2" align="center"><span class="btn" onclick="">忘记密码点这里重设</span>
		</td></tr>
</table>
<%
End Sub
'********************************'
'***********登录成功*************'
'********************************'
Sub LoginSucceed
%>
<table class="login">
<tr><td colspan="2" align="left" valign="top" style="padding:10px 5px 5px 5px;">
<font color="#aa00ff">
<%response.write(session("uName"))%></font> 欢迎您!
</td>
</tr>
<tr><td align="center" colspan="2"><img height="100px" width="100px" src="<%
if rs("photo")<>"" then
	response.write(rs("photo"))
else
	if rs("sex") then
		response.write("images/man.gif")
	else
		response.write("images/woman.gif")	
	end if
end if
%>"/>
</td>
</tr>
<tr><td align="right">
昵称:  </td>
<td align="left"><%response.write(rs("nickName"))%></td>
</tr>
<tr><td align="right">
积分:  </td>
<td align="left"><%response.write(rs("integral"))%></td>
</tr>
<tr>
  <td colspan="2" align="center">
管理中心|购物车|退出   </td>
</tr>
</table>
<%
End Sub
%>
<%
Sub RegInfo
sql="select *from config where configName='注册信息'"
rs.open sql,conn,1,1
if not rs.eof then 
%>
	<div style="text-align:center;color:blue;font-weight:bold;font-size:14px;"><%=rs("title")%></div>
	<div><%=rs("content")%><div>
	<div></div>
<%
end if
rs.close
End Sub
%>







