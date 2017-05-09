<!--#include file="inc/conn.asp"-->
<%
dim action 
action = request("action")
select case action
	case "getTop"
	GetTopActive()
	case "info"
	GetInfo()
	case "add"
	add()
	case "getMember"
	getMember()
	case "addMember"
	addMember()
	case "delMember"
	delMember()
end select
function delMember()
	dim sql 
	sql = "delete from activemember where email='"& request.Cookies("email")&"' and activeid="&request("id")
	set r = server.createobject("scripting.dictionary")
	set rs =server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,3
	'rs.close:set rs = nothing
	r.add "data",1
	response.write toJSON (r,false)
end function
function getMember()
	dim sql 
	sql = "SELECT  * FROM activemember where activeid="&request("id")&" order by [time] desc"
	set r = server.createobject("scripting.dictionary")
	set rs =server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,1
	r.add "count",rs.Recordcount
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function addMember()
	set rs = server.createobject("ADODB.Recordset")
	set r = server.createobject("scripting.dictionary")		
	if request.Cookies("email")&"" ="" then
		response.write toJSON ("请先登录!",true)
		response.end
	end if
	sql = "select * from activemember where email='"& request.Cookies("email")&"' and activeid="&request("id")
	rs.open sql,conn,1,3
	if not rs.eof then 
		response.write toJSON ("您已经参加过了!",true)
		response.end
	else
	rs.addnew
		rs("email")=request.Cookies("email")
		rs("activeid")=request("id")
	rs.update
	temp = rs.bookmark 
	rs.bookmark = temp 
	'Response.write rs("id") 
	r.add "id",cint(rs("id"))
	response.write toJSON (r,false)
	end if 
	rs.close:set rs = nothing
end function
function add()
	sql = "select * from active"
	set rs = server.createobject("ADODB.Recordset")
	set r = server.createobject("scripting.dictionary")		
	if request("title")&""<>"" then
		if request.Cookies("email")&"" ="" then
			response.write toJSON ("请先登录!",true)
			response.end
		end if
		rs.open sql,conn,1,3
		rs.addnew
			rs("title")=request("title")
			rs("desc")=request("content")
			rs("publisher")=request.Cookies("email")
			rs("startTime")=request("stime")
			rs("endTime")=request("etime")
			rs("place")=request("place")
		rs.update
		temp = rs.bookmark 
		rs.bookmark = temp 
		'Response.write rs("id") 
		r.add "id",cint(rs("id"))
		response.write toJSON (r,false)
		rs.close:set rs = nothing
		else
		response.write toJSON ("尼玛填个标题会怀孕啊?",true)
	end if
end function
function GetTopActive()
	dim sql 
	sql = "SELECT top 3 * FROM active where startTime>date() or endTime>date() order by startTime asc"
	set r = server.createobject("scripting.dictionary")
	set rs =server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,1
	r.add "count",rs.Recordcount
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function GetInfo()
	dim sql 
	sql = "SELECT * FROM active where id="&request("id")
	set r = server.createobject("scripting.dictionary")
	set rs =server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,1
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
%>