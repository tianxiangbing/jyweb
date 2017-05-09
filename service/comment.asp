<!--#include file="inc/conn.asp"-->
<%
dim action 
action = request("action")
select case action
	case "getComment"
	getComment()
	case "addComment"
	addComment()
end select
function getComment()
	dim id,ctype,sql
	id = request("id")
	ctype = request("type")
	sql = "select  top 100 users.email as email, * from comment,users where comment.email = users.email and type="&ctype&" and relevanceId="&id&" order by publishTime desc"
	'response.write sql
	set rs = server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,1
	set r = server.createobject("scripting.dictionary")	
	r.add "data",rs
	r.add "count",rs.RecordCount
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function addComment()
	dim sql 
	if request.Cookies("email")&"" ="" then
		response.write toJSON ("请先登录!",true)
		response.end
	end if
	if request("comment")&""="" then
		response.write toJSON ("你是猴子派来的逗比吗?填个内容吧!",true)
		response.end
	end if 
	sql = "select * from comment where email = '"&request.Cookies("email")&"' order by publishTime desc"
	response.write sql
	set r = server.createobject("scripting.dictionary")
	set rs = server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,3
	'if not rs.eof and DateDiff("s",cdate(rs("publishTime")),now()) <10 then
	'	response.write toJSON ( "休息一会，广告之后马上回来!",true)
	'	response.end
	'end if
	r.add "time",DateDiff("s",cdate(rs("publishTime")),now())
	rs.addnew
	rs("email") = request.Cookies("email")
	rs("comment") = request("comment")
	rs("type") = request("type")
	rs("relevanceId") = request("id")
	'rs.update
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
%>