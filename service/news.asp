<!--#include file="inc/conn.asp"-->
<%
dim action 
action = request("action")
select case action
	case "getType"
	getType()
	case "GetTopNews"
	GetTopNews(request("typename"))
	case "getnewslist"
	GetNewList()
	case "addnews"
	addNews()
	case "newsInfo"
	newsInfo()
end select
function newsInfo()
	dim sql,newsid
	newsid= request("id")
	sql = "select a.*,b.email,b.username from news a,users b where a.publisher=b.email and a.id=" & newsid
	set rs = server.createobject("ADODB.Recordset")
	'response.write sql
	rs.open sql,conn,1,1
	set r = server.createobject("scripting.dictionary")	
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function addNews()
	sql = "select * from news"
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
			rs("desc")=request("desc")
			rs("content")=request("content")
			rs("publisher")=request.Cookies("email")
			rs("source")=request("source")
			rs("audit")=true
			rs("typename")=request("typename")
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
function getType()
	sql="select * from newstype order by id asc"
	set rs=server.createobject("ADODB.Recordset")
	rs.open sql,conn,1,1
	set r = server.createobject("scripting.dictionary")
	r.add "count",rs.Recordcount
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function GetTopNews(typeid)
	set r = server.createobject("scripting.dictionary")
	set rs =server.createobject("ADODB.Recordset")
	newsql = "select top 10 * from [news] where typename='"&typeid&"' order by publishdate desc"
	rs.open newsql,conn,1,1
	r.add "count",rs.Recordcount
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function
function GetNewList()
sql = "SELECT t.id,t.title,t.typename,t.publishdate FROM news AS t WHERE id IN  (SELECT TOP 5 id FROM news WHERE typename = t.typename order by publishdate desc) order by typename"
	set rs =server.createobject("ADODB.Recordset")
	set r = server.createobject("scripting.dictionary")
	rs.open sql,conn,1,1
	r.add "count",rs.Recordcount
	r.add "data",rs
	response.write toJSON (r,false)
	rs.close:set rs = nothing
end function

%>