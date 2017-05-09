<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<%
response.Buffer = true
'on error resume next
db="DB/ch#$%shixiang.asa"
set conn = server.CreateObject("adodb.connection")
connstr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath(db)
conn.open connstr
if err then
 err.clear
 set conn = nothing
 response.Write "数据库连接出错，请检查连接字符串"
 response.End()
end if
sub closeconn()
  set conn = nothing
end sub	


Function my_replace(ContentStr,reg,new_str)

  Dim ClsTempLoseStr,regEx
  ClsTempLoseStr = Cstr(ContentStr)
  Set regEx = New RegExp
  regEx.Pattern = reg
  regEx.IgnoreCase = True '是否忽略大小写
  regEx.Global = True
  ClsTempLoseStr = regEx.Replace(ClsTempLoseStr,new_str)
  my_replace = ClsTempLoseStr
  Set regEx = Nothing
End Function



Function CloseDatabase'关闭总数据库
	Conn.close
	Set conn = Nothing
End Function

function setRs(rs,sql,conn,a,b)
	set rs=server.CreateObject("adodb.recordset")
	rs.open sql,conn,a,b
end function

function DisRs(rs)
	rs.close
	set rs=nothing
end function
'const RecordsetVal="adodb.recordset"   	 
%>
<%
  sub erro(str)
      response.Write "<script language=javascript>alert ('"&str&"');"
	  response.Write "javascript:history.go(-1)</script>"
	  response.End()
  end sub
  sub ok(str,url)
      response.Write "<script language=javascript>alert ('"&str&"');"
	  response.Write "window.document.location.href='"&url&"';"
	  response.Write "</script>"
  end sub

'提示信息
sub info(a,rul)
	response.write("<script>alert('"&a&"');location.href='"&rul&"'</script>")
end sub
%>
<% function HTMLEncode(fString)
if not isnull(fString) then
fString = replace(fString, ">", "&gt;")
fString = replace(fString, "<", "&lt;")

fString = Replace(fString, CHR(32), "&nbsp;")
fString = Replace(fString, CHR(9), "&nbsp;")
fString = Replace(fString, CHR(34), "&quot;")
fString = Replace(fString, CHR(39), "&#39;")
fString = Replace(fString, CHR(13), "")
fString = Replace(fString, CHR(10) & CHR(10), "</P><P> ")
fString = Replace(fString, CHR(10), "<BR> ")

HTMLEncode = fString
end if
end function
%>

<%
'去掉标签
Function RemoveHTML( strText ) 
    nPos1 = InStr(strText, "<") 
    Do While nPos1 > 0 
        nPos2 = InStr(nPos1 + 1, strText, ">") 
        If nPos2 > 0 Then 
            strText = Left(strText, nPos1 - 1) & Mid(strText, nPos2 + 1) 
        Else 
            Exit Do 
        End If 
        nPos1 = InStr(strText, "<") 
    Loop 
    
    RemoveHTML = strText 
End Function 

'分页显示
private sub showPage(CurrentPageName) '分页带跳转显示
	'response.write("<br /><div style='font-size:12px;text-align:center;' class='xwlbb'>")
	response.write("当前第 <font color=""#FF0000"">"&curpage&"</font> 页/总 <font color=""#FF0000"">"&rs.pagecount&"</font> 页&nbsp;&nbsp;")
	if(curpage=1) then 
		response.write("首页 上一页&nbsp;&nbsp;")
	else
		response.Write("<a href='"&CurrentPageName&"curpage=1'>首页</a>&nbsp;&nbsp;<a href='"&CurrentPageName&"curpage="&curpage-1&"'>上一页</a>&nbsp;&nbsp;")
	end if
 
	if curpage<rs.pagecount then 
		response.Write("<a  href='"&CurrentPageName&"curpage="&curpage+1&"'>下一页</a> <a href='"&CurrentPageName&"curpage="&rs.pagecount&"'>尾页</a>")
	else 
		response.write("下一页 尾页")
	end if

	
	response.Write("<form action='"&CurrentPageName&"' name='pageform' method='post' style='margin:0px;padding:0px;display:inline;'>")
	response.Write("&nbsp;&nbsp;转到：<select name='curpage' onChange='javascript:document.pageform.submit();'>")
    for i = 1 to rs.pagecount
		response.Write "<option style='color:#F00;' value="&i
		if i = curpage then response.Write " selected" 
		response.Write(">"& i &"</option>")
	next 
	response.Write(" </select></form>" )
	'response.write("</div>")
end sub


'分页显示
private sub enshowPage(CurrentPageName) '分页带跳转显示
	'response.write("<br /><div style='font-size:12px;text-align:center;' class='xwlbb'>")
	response.write("Current <font color=""#FF0000"">"&curpage&"</font> page/Total <font color=""#FF0000"">"&rs.pagecount&"</font> page&nbsp;&nbsp;")
	if(curpage=1) then 
		response.write("Home Previous&nbsp;&nbsp;")
	else
		response.Write("<a href='"&CurrentPageName&"curpage=1'>Home</a>&nbsp;&nbsp;<a href='"&CurrentPageName&"curpage="&curpage-1&"'>Previous</a>&nbsp;&nbsp;")
	end if
 
	if curpage<rs.pagecount then 
		response.Write("<a  href='"&CurrentPageName&"curpage="&curpage+1&"'>Next</a> <a href='"&CurrentPageName&"curpage="&rs.pagecount&"'>Last Page</a>")
	else 
		response.write("Next Last Page")
	end if

	
	response.Write("<form action='"&CurrentPageName&"' name='pageform' method='post' style='margin:0px;padding:0px;display:inline;'>")
	response.Write("&nbsp;&nbsp;Go：<select name='curpage' onChange='javascript:document.pageform.submit();'>")
    for i = 1 to rs.pagecount
		response.Write "<option style='color:#F00;' value="&i
		if i = curpage then response.Write " selected" 
		response.Write(">"& i &"</option>")
	next 
	response.Write(" </select></form>" )
	'response.write("</div>")
end sub

'对html标签进行过滤
function nohtml(str)
	dim re
	Set re=new RegExp    ' 建立正则表达式
	re.IgnoreCase =true  '设置是否区分字符大小写。 
	re.Global=True       ' 设置全局可用性
	re.Pattern="(\<.[^\<]*\>)"
	str=re.replace(str," ")
	re.Pattern="(\<\/[^\<]*\>)"
	str=re.replace(str," ")
	nohtml=str
	set re=nothing
end function

function getSafeContent2(fString)
	fString = replace(fString, "&gt;", ">")
	fString = replace(fString, "&lt;", "<")
	fString = replace(fString, "'", "&#39;")
	getSafeContent=	fString
end function


' ===================================================
' 得到安全字符串,在查询中或有必要强行替换的表单中使用
' str 要替换的字符串
' ===================================================
'Function GetSafeStr(str)
''	GetSafeStr = Replace(Replace(Replace(Trim(str), "'", ""), Chr(34), ""), ";", "")
'	GetSafeStr = Replace(Replace(Replace(Replace(Replace(str,"'","‘"),"""","“"),"&",""),"<","&lt;"),">","&gt;")
'End Function

'************************************************** 
'函数名：GetcutStr 
'作 用：截取指定长度字符串 
'参 数：str ----字串资料 
'参 数：strlen ----截取长度 
'返回值：截取到的字符串 
'************************************************** 
Function GetcutStr(str, cutlen) 
If str="" or isnull(str) then Exit Function 
Dim strlength, codeid, i 
t = 0 
For i = 1 To len(str) 
	codeid = Abs(Asc(Mid(str, i, 1))) 
	If codeid > 255 Then 
		strlength = strlength + 2 
	Else 
		strlength = strlength + 1 
	End If 
	
	If strlength >= cutlen Then 
		GetcutStr = Left(str, i) & "..." 
		Exit For 
	Else 
		GetcutStr = str 
	End If 
Next 

GetcutStr = Replace(GetcutStr, Chr(10), "") 
End Function


'======================================
'=========网站内容管理=================
'=======根据ID得到相关的信息===========
'============id->传进来的id============
Function InFoNum(id)
	Dim rs
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Info where ID="&id&""
	set rs=conn.execute(sql)
	response.Write rs("InfoContent")
	rs.close
	set rs=nothing
End Function

Function InFoNum2(id)
	Dim rs
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Info where ID="&id&""
	set rs=conn.execute(sql)
	response.Write RemoveHTML(rs("InfoContent"))
	rs.close
	set rs=nothing
End Function

Function InFoNum3(id)
	Dim rs
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Info where ID="&id&""
	set rs=conn.execute(sql)
	response.Write nohtml(rs("InfoContent"))
	rs.close
	set rs=nothing
End Function


'======================================
'=========网站内容管理=================
'=======根据ID得到相关的信息===========
'==========对其进行截取================
'===id->传进来的ID,num->截取的字数=====
Function InFoNumCount(id,num)
	Dim rs
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Info where ID="&id&""
	set rs=conn.execute(sql)
	response.Write left(RemoveHTML(rs("InfoContent")),num)
	'response.Write(rs("InfoContent"))
	if len(rs("InfoContent"))>num then response.Write "..."
	rs.close:set rs=nothing
End Function

Function closedate(cRs)
	set cRs=close:set cRs=nothing
End Function

Function InFoNumCount2(id,num)
	Dim rs
	set rs=server.CreateObject("adodb.recordset")
	sql="select * from Info where ID="&id&""
	set rs=conn.execute(sql)
	response.Write left(rs("InfoContent"),num)
	'response.Write(rs("InfoContent"))
	if len(rs("InfoContent"))>num then response.Write "..."
	rs.close:set rs=nothing
End Function

Function closedate(cRs)
	set cRs=close:set cRs=nothing
End Function

' ============================================
' 判断是否是数字，否则用默认值替换
' iCheck 要替换的变量,iDefault 默认值
' ============================================
Function GetSafeInt(iCheck,iDefault) 
	If Trim(iCheck)="" Then
		GetSafeInt = iDefault
		Exit Function
	End If

	If IsNumeric(iCheck)=false Then
		GetSafeInt = iDefault
		Exit Function
	End If
	
	GetSafeInt = iCheck
End Function
%>

