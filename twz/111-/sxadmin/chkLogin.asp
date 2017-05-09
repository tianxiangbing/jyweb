<!--#include file="inc/config.asp"-->
<!--#include file="inc/killsqlin.asp"-->
<!--#include file="inc/DB.asp"-->
<!--#include file="conn.asp" -->
<!--#include file="inc/md5.asp"-->
<!--#include file="inc/function.asp"-->
<!--#include file="inc/common.asp"-->

<%
     if not IsSelfPost then
	 	erro "请通过网站提交数据!"
	 end if
	 
	 dim username,userpwd,passcode,thesoft,vOs,mdUserpwd,rs,userIp,errorPwd
	
	 username = LCase(htmlencode(request.form("username")))
	 userpwd = LCase(htmlencode(request.form("userpwd")))
	 passcode=htmlencode(request.form("passcode"))
	' response.Write(username)
'	 response.Write(userpwd)
'	 response.End()
	 
	 if username = "" or userpwd = "" or passcode="" then
		Call erro("登录失败!请详细填写登录信息!")
	 end if	

	 
	 if  IsNumeric(passcode)=false then erro "验证码为数字,请重新输入!"
	 passcode = clng(passcode)
	 if passcode <> Session("GetCode") then
	    Session("GetCode")=""
		call okJump("验证码错误,请重新输入!","index.html")
	 end if
	 
	 
	    thesoft=Request.ServerVariables("HTTP_USER_AGENT")
           if instr(thesoft,"Windows NT 5.0") then
	          vOS="Win2000"
           elseif instr(thesoft,"Windows NT 5.2") then
	          vOs="Win2003"
           elseif instr(thesoft,"Windows NT 5.1") then
	          vOs="WinXP"
           elseif instr(thesoft,"Windows NT") then
	          vOs="WinNT"
           elseif instr(thesoft,"Windows 9") then
	          vOs="Win9x"
           elseif instr(thesoft,"unix") or instr(thesoft,"linux") or instr(thesoft,"SunOS") or instr(thesoft,"BSD") then
	          vOs="类Unix"
           elseif instr(thesoft,"Mac") then
	          vOs="Mac"
           else
	          vOs="Other"
           end if
		   
	    mdUserpwd=md5(userpwd)	'md5加密
		
		userIp=GetIP()

		set rs = conn.execute("select * from PsAdmin where username='"&username&"' and userpwd='"&mdUserpwd&"'")
		
		if rs.eof then	'登录失败时，记录登录信息
			conn.execute("insert into log(username,errorPwd,userIp,os) values('"&username&"','"&userpwd&"','"&userIp&"','"&vOs&"')")
		    Call okJump("登录失败!请检查用户名和密码!","index.html") '刷新验证码
		else
		   session("login")=true
		   session("admin")=username
		   
		   session.timeout=60
		   
		   conn.execute("insert into log(username,userIp,os) values('"&username&"','"&userIp&"','"&vOs&"')")	'登陆信息
		   conn.execute("update psadmin set lastLoginDate='"&rs("thisLoginDate")&"',lastLoginIp='"&rs("thisLoginIP")&"' where username='"&username&"'")'更新上次登录时间,上次登录IP,登录次数
		   conn.execute("update psadmin set thisLoginDate=now(),loginTime=loginTime+1,thisLoginIP='"&userIp&"' where username='"&username&"'")'更新本次登录信息

		   response.Redirect("main.asp")
		end if
		
		closeRs(rs)
 	    		
%>