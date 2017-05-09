<!--#include file="inc/conn.asp"-->
<!--#include file="inc/md5.asp"-->
<%
dim action 
action = request("action")
select case action
	case "login"
	Login()
	case "regist"
	Regist()
end select
function Login()
	dim sql,user
	set user = new USER
	user.email = request("email")
	ismd5 = request("ismd5")
	if ismd5 then
		user.password = request("password")
		else
		user.password = md5(request("password") )
	end if 
	sql="select * from users where email='"&user.email&"'"
	set rs=server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,3
	'response.write rs.RecordCount
	set r = server.createobject("scripting.dictionary")
	if rs.RecordCount >0 then
		user.id=rs("id")
		user.registdate = rs("registdate")
		user.lastlogindate = rs("lastlogindate")
		user.corp = rs("corp")
		user.username = rs("username")
		user.avatar = rs("avatar")
		if(user.password =rs("password")) then
			r.add "state",true
			r.add "userInfo",user
			rs("lastlogindate") = now()
			rs.update			
		else
			r.add "state",-1	'密码不对	
		end if 
	else
		r.add "state",0		'用户名不存在
	end if
	rs.close:set rs = nothing
	response.write toJSON (r,false)
end function
function Regist()
	dim user ,sql
	set user = new USER
	user.email = request("email")
	user.password = request("password")
	user.corp = request("corp")
	user.desc = request("desc")
	user.avatar = request("avatar")
	user.registdate = now()
	user.lastlogindate = now()
	user.password = md5( user.password)
	if request("email")&""="" or request("password")="" then
	response.write toJSON ("用户名密码都不填，你让我说你什么好！",true)
	else
		'response.write(( user.password))
		'response.write(md5(user. password))
		'response.end()
		set rs = server.createobject("adodb.Recordset")
		sql = "select * from users where email = '"& user.email&"'"
		rs.open sql,conn,1,3
		set r = server.createobject("scripting.dictionary")
		if rs.RecordCount >0 then
			r.add "state",0 	'已存在用户
		else
			rs.addnew
			rs("email") = user.email
			rs("password")=user.password
			rs("corp") = user.corp
			rs("desc") = user.desc
			rs("avatar") = user.avatar
			rs.update
			temp = rs.bookmark 
			rs.bookmark = temp 
			'Response.write rs("id") 
			user.id=rs("id") 
			r.add "state" ,true 	'成功
			r.add "userInfo",user
		end if
		rs.close:set rs = nothing
		response.write toJSON (r,false)
	end if
end function

class USER
	public id
	public email
	public password
	public username
	public corp
	public desc
	public avatar
	public registdate
	public lastlogindate
	public function reflect()
	    set reflect = server.createObject("scripting.dictionary")
	    with reflect
	        .add "id", id
	        .add "email", email
	        .add "password", password
	        .add "username", username
	        .add "corp", corp
	        .add "desc", desc
	        .add "avatar", avatar
	        .add "registdate", registdate
	        .add "lastlogindate", lastlogindate
	    end with
	end function
end class
%>