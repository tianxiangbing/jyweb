<%

'on error resume next


' ********************************************
' 以下为常用函数
' ********************************************

  sub erro(str)  '显示信息
      response.Write "<script type='text/javascript'>alert ('"&str&"');"
	  response.Write "javascript:history.go(-1)</script>"
	  response.End()
  end sub
  
  sub ok(str,url)
      response.Write "<script type='text/javascript'>alert ('"&str&"');"
	  response.Write "window.document.location.href='"&url&"';"
	  response.Write "</script>"
  end sub
  
  sub okJump(str,url)
  	 response.Write "<script type='text/javascript'>alert ('"&str&"');"
	 response.Write "window.document.location.href='"&url&"';"
	 response.Write "</script>"
	 response.End()
  end sub
  
  sub msgTest(str)
  	 response.Write "<script type='text/javascript'>alert ('"&str&"');"
	 response.Write "</script>"
  end sub
  
 
  ' ============================================
	' * 对传入的ID校验
  ' ============================================
  sub CheckID(id)
    'id=request.querystring("id")
	if id="" or IsNumeric(id)=false then 
		erro "无效ID，请重试!"
	end if
  end sub
  
  ' ============================================
' 得到安全字符串,在查询中或有必要强行替换的表单中使用
' str 要替换的字符串
' ============================================
Function GetSafeStr(str)
	GetSafeStr = Replace(Replace(Replace(Trim(str), "'", ""), Chr(34), ""), ";", "")
	'GetSafeStr = Replace(Replace(Replace(Replace(Replace(str,"'","‘"),"""","“"),"&",""),"<","&lt;"),">","&gt;")
End Function


function getSafeContent(fString)
	'fString = replace(fString, ">", "&gt;")
	'fString = replace(fString, "<", "&lt;")
	fString = replace(fString, "'", "&#39;")
	getSafeContent=	fString
end function

'**************************************************
'函数名：IsValidStr
'作  用：检查字符是否在有效范围内
'参  数：str ----要检查的字符
'返回值：True  ----字符合法
'        False ----字符不合法
'**************************************************
Function IsValidStr(ByVal str)
    Dim i, c
    For i = 1 To Len(str)
        c = LCase(Mid(str, i, 1))
        If InStr("abcdefghijklmnopqrstuvwxyz1234567890", c) <= 0 Then
            IsValidStr = False
            Exit Function
        End If
    Next
    If IsNumeric(Left(str, 1)) Then
        IsValidStr = False
    Else
        IsValidStr = True
    End If
End Function


' ============================================
' * 判断请求是否来自外部
' * @return 返回布尔值
' ============================================
Function IsSelfPost()
    Dim HTTP_REFERER,SERVER_NAME
    HTTP_REFERER = Cstr(Request.ServerVariables("HTTP_REFERER"))
    SERVER_NAME = Cstr(Request.ServerVariables("SERVER_NAME"))
    IsSelfPost = False 
    If Mid(HTTP_REFERER,8,len(SERVER_NAME)) = SERVER_NAME Then IsSelfPost = True 
End Function
'以下为示例应用
'If IsSelfPost Then
	'statement 
'end if
  
' ============================================
' 截取字符长度
' ============================================
 function cutstr(str,lenstr)
	if len(str)>lenstr then
		cutstr=left(str,lenstr)&"…"
	else
		cutstr=str
	end if
 end function
	
 function cutStr2(str,lenght)  '截取字符
 	Dim str2,newstr
	str2 = str
	Set Reg = New RegExp
    Reg.Ignorecase = True
    Reg.Global = True
    Dim Matches,Match
    Reg.Pattern = "<(.+?)>(.+?)</.+?>"
    Set Matches = Reg.Execute(str2)

	For Each Match In Matches
		if len(Match.SubMatches(1))>lenght then
			newstr=left(Match.SubMatches(1),lenght)&"..."
		else
			newstr= Match.SubMatches(1)
		end if
		newstr = "<"&Match.SubMatches(0)&">" & newstr & "<span>"
		'newstr=newstr 
		'response.Write("[["&newstr&"]]")
		'response.End()
    Next
	if newstr = "" then 
		if len(str)>lenght then
			newstr=left(str,lenght)&"..."
		else
			newstr= str
		end if
	End if
	cutStr2 = newstr
 end function 	
	
	function cutStr3(str,length)	' 截取字符长度,汉字一个算两个字符，英文算一个字符
		dim strLen,y
		str=trim(str)
		str=replace(replace(replace(replace(replace(replace(str,"&nbsp;",""),CHR(9),""),CHR(13), ""), CHR(10) & CHR(10),""),"<BR>", "")," ","")
		strLen = len(str)
		y = 0
		if strLen >= length then
			for i = 1 to strLen
				if asc(mid(str,i,1)) < 0 or asc(mid(str,i,1)) >255 then '如果是汉字
					y = y + 2
				else
					y = y + 1
				end if
			
				if y >= length then 
					str = left(str,i)&"…" '字符串限长
					exit for
				end if
			next
		end if
		cutStr3 = str
	End Function 


'**************************************************
'函数名：IsObjInstalled
'作  用：检查组件是否已经安装
'参  数：strClassString ----组件名
'返回值：True  ----已经安装
'       False ----没有安装
'**************************************************
Function IsObjInstalled(strClassString)
	On Error Resume Next
	IsObjInstalled = False
	Err = 0
	Dim xTestObj
	Set xTestObj = Server.CreateObject(strClassString)
	If 0 = Err Then IsObjInstalled = True
	Set xTestObj = Nothing
	Err = 0
End Function 

' 删除指定的文件
Sub DoDelFile(sPathFile)
	'response.Write Server.MapPath(sPathFile)
	Dim oFSO
	Set oFSO = Server.CreateObject("Scripting.FileSystemObject")
	if oFSO.FileExists(Server.MapPath(sPathFile)) then
		oFSO.DeleteFile(Server.MapPath(sPathFile))
	end if
	Set oFSO = Nothing
End Sub	

' ============================================
    ' * jMail组件发送邮件
' ============================================ 
	'call setMail(username,subjects,email,content)
	
	sub setMail(sendName,subjects,receiveMail,mailContent)
		if IsObjInstalled("Jmail.Message")=false then
			response.Write("服务器不支持Jmail控件，请联系服务器供应商。")
			exit sub
		end if	
		
		Set Jmail= Server.CreateObject ("Jmail.Message")
		Jmail.Silent = true '如果设置为true,JMail不会抛出例外错误
		Jmail.Charset = "gb2312"
		JMail.ContentType = "text/html"  '缺省是"text/plain"，如果你以HTML格式发送邮件, 改为"text/html"即可。
		Jmail.From = "search456@163.com"	'"发件人信箱"
		Jmail.FromName =sendName '"发件人姓名"
		Jmail.ReplyTo ="search456@163.com" '"回复信箱"
		Jmail.Subject = subjects
		Jmail.AddRecipient receiveMail '"收件人信箱"
		Jmail.Body = mailContent
		Jmail.MailServerUserName = "search456"'"发件人SMTP帐号"
		Jmail.MailServerPassWord = "123456789"'"发件人SMTP密码"
		JMail.Priority=3 '邮件等级，范围在1-5之间 1 高优先级.2 也是高优先级 3 普通优先级 4 低优先级5 最低的优先级
		Jmail.Send("smtp.163.com")
		Jmail.Close
		Set Jmail = nothing
	end sub
	
	'自动添加错误信息到数据库,并且发送到邮箱.
	'call AutoErrInfo()
	sub AutoErrInfo()
		if err.number<>0 then
			set errRs=conn.execute("select * from errLog where fullPath='"&GetFullUrl&"' ")
			if errRs.eof then
				sql="insert into errLog(ip,http_referer,fullPath,errNumber,errDescription,errSource,err) values('"&GetIP&"','"&request.ServerVariables("HTTP_REFERER")&"','"&GetFullUrl&"','"&err.number&"','"&err.description&"','"&err.source&"','"&err&"')"
				conn.execute(sql)
				content="<div><ul><li>IP:"&GetIP&"</li><li>http_referer:"&request.ServerVariables("HTTP_REFERER")&"</li><li>URL:"&GetFullUrl&"</li><li>err.number:"&err.number&"</li><li>err.description:"&err.description&"</li><li>err.source:"&err.source&"</li><li>err:"&err&"</li><li>时间:"&now()&"</li></ul></div>"
				call setMail(request.ServerVariables("HTTP_HOST"),"网站出错信息","search789@163.com",content)
			end if	
		end if
	end sub	  

' ============================================
    ' * 输出随机字符串
    ' * @params 长整型 随机位数
    ' * @return 字符串
' ============================================
    Public Function RandStr(intNum)
        Dim strChar,strCode,i,j,k
        strChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        j = Len(strChar)
        Randomize
        For i = 1 To intNum				'Int((upperbound - lowerbound + 1) * Rnd + lowerbound) '生成某个范围内的随机整数,
		  k = Int(j * Rnd ) + 1 		'upperbound 是随机数范围的上限，而 lowerbound 则是随机数范围的下限。  
          strCode = strCode & Mid(strChar,k,1)  'k为1到36
        Next
        RandStr = strCode
    End Function
	
	'随机文件名，格式"14位时间+5位随机数"
	function randName()
		randomize
		ranNum=int(90000*rnd)+10000
		randName=year(now)&AddZero(month(now))&AddZero(day(now))&AddZero(hour(now))&AddZero(minute(now))&AddZero(second(now))&ranNum
	end function
	
	' ============================================
    ' * 补充位数,加0函数
    ' * @params 需填充字符
    ' * @return 字符串
' ============================================  
    Public Function AddZero(ByVal strVal)
        Dim strZero,strlen
		strZero=""
		maxLen=2
		if strVal&"a"="a" then exit Function
		For i = Len(strVal) To maxLen - 1
        	strZero = strZero & "0"
        Next
		AddZero = strZero & strVal
    End Function
	

' ============================================
    ' * 对部份JS字符转义
' ============================================
    Public Function JSEncode(ByVal strHTML)
        If Not IIsEmpty(strHTML) Then
            strHTML = Replace(strHTML, "\", "\\")
            strHTML = Replace(strHTML, Chr(34), "\""")
            strHTML = Replace(strHTML, Chr(39), "\'")
            strHTML = Replace(strHTML, Chr(10), "\n")
            strHTML = Replace(strHTML, Chr(13), "\r")
            JSEncode = strHTML
        Else
            JSEncode = Empty
        End If
    End Function

' ============================================
    ' * 还原被转义的JS字符
' ============================================
    Public Function JSDecode(ByVal strHTML)
        If Not IIsEmpty(strHTML) Then
            strHTML = Replace(strHTML, "\\","\")
            strHTML = Replace(strHTML, "\""",Chr(34))
            strHTML = Replace(strHTML, "\'",Chr(39))
            strHTML = Replace(strHTML, "\n",Chr(10))
            strHTML = Replace(strHTML, "\r",Chr(13))
            JSDecode = strHTML
        Else
            SDecode = Empty
        End If
    End Function


  
'功能类似于server.HTMLEncode，是server.HTMLEncode它的加强及完善函数，
'对指定的字符串进行HTML编码，从而使该字符串以所需的形式显示出来.
'原因，留言防止出现脚本，insert不会因'而出错
function HTMLEncode(fString)
	if not isnull(fString) then
		'fString=trim(fString)
		fString=server.HTMLEncode(fString)
		fString = replace(fString, ">", "&gt;")
		fString = replace(fString, "<", "&lt;")
		fString = Replace(fString, CHR(32), "&nbsp;")
		fString = Replace(fString, CHR(9), "&nbsp;")	'Chr(9)在记事本中按一个Tab键的效果
		fString = Replace(fString, CHR(34), "&quot;")	'双引号
		fString = Replace(fString, CHR(39), "&#39;")	'单引号
		fString = Replace(fString, CHR(13), "") 	'  Chr(10) 是个换行符  chr(13) 是一个回车
		fString = Replace(fString, CHR(10) & CHR(10), "</P><P>")
		fString = Replace(fString, CHR(10), "<BR>")		
		HTMLEncode = fString
	end if
end function

'对字符编码，不去除字符。
function HTMLDecode(fString)
	if not isnull(fString) then
		fString = replace(fString, "&gt;",">")
		fString = replace(fString, "&lt;","<")
		fString = Replace(fString, "&nbsp;",CHR(32))
		'fString = Replace(fString, "&nbsp;",CHR(9))	'Chr(9)在记事本中按一个Tab键的效果
		fString = Replace(fString, "&quot;",CHR(34))	'双引号
		fString = Replace(fString, "&#39;",CHR(39))	'单引号
		'fString = Replace(fString, CHR(13), "") 	'  Chr(10) 是个换行符  chr(13) 是一个回车
		fString = Replace(fString, "</P><P>",CHR(10) & CHR(10))
		fString = Replace(fString, "<BR>",CHR(10))
		
		HTMLDecode = fString
	end if
end function

 Function nohtml(str)  '去除HTML
	dim re 
	Set re=new RegExp 
	re.IgnoreCase =true 
	re.Global=True 
	str = replace(str,"<br>","{br}")
	re.Pattern="(\<.[^\<]*\>)" 
	str=re.replace(str," ") 
	re.Pattern="(\<\/[^\<]*\>)" 
	str=re.replace(str," ") 
	str = replace(str,"{br}","<br>")
	nohtml=str 
	set re=nothing 
end function 

''''''''''替换模块START''''''''''''
Function ReplaceText(fString,patrn,replStr)
	Set regEx = New RegExp   	' 建立正则表达式。
		regEx.Pattern = patrn   ' 设置模式。
		regEx.IgnoreCase = True ' 设置是否区分大小写。
		regEx.Global = True     ' 设置全局可用性。 
		ReplaceText = regEx.Replace(""&fString&"",""&replStr&"") ' 作替换。
	Set regEx=nothing
End Function
''''''''''替换模块END''''''''''''

Function RegExpTest(patrn, strng)
	Set regEx = New RegExp   		' 建立正则表达式。
		regEx.Pattern = patrn   	' 设置模式。
		regEx.IgnoreCase = True 	' 设置是否区分大小写。
		regEx.Global = True     	' 设置全局可用性。 
		RegExpTest = regEx.Test(strng) ' 执行搜索。
	Set regEx=nothing
End Function


' ===============================================
' 初始化下拉框
'	s_FieldName	: 返回的下拉框名	
'	a_Name		: 定值名数组
'	a_Value		: 定值值数组
'	v_InitValue	: 初始值
'	s_Sql		: 从数据库中取值时,select name,value from table
'	s_AllName	: 空值的名称,如:"全部","所有","默认"
' ===============================================
Function InitSelect(s_FieldName, a_Name, a_Value, v_InitValue, s_Sql, s_AllName)
	Dim i
	InitSelect = "<select name='" & s_FieldName & "' size=1>"
	If s_AllName <> "" Then
		InitSelect = InitSelect & "<option value=''>" & s_AllName & "</option>"
	End If
	If s_Sql <> "" Then
		oRs.Open s_Sql, oConn, 0, 1
		Do While Not oRs.Eof
			InitSelect = InitSelect & "<option value=""" & inHTML(oRs(1)) & """"
			If oRs(1) = v_InitValue Then
				InitSelect = InitSelect & " selected"
			End If
			InitSelect = InitSelect & ">" & outHTML(oRs(0)) & "</option>"
			oRs.MoveNext
		Loop
		oRs.Close
	Else
		For i = 0 To UBound(a_Name)
			InitSelect = InitSelect & "<option value=""" & inHTML(a_Value(i)) & """"
			If a_Value(i) = v_InitValue Then
				InitSelect = InitSelect & " selected"
			End If
			InitSelect = InitSelect & ">" & outHTML(a_Name(i)) & "</option>"
		Next
	End If
	InitSelect = InitSelect & "</select>"
End Function

Function inHTML(str)	'此段和下段，用于上面函数
	Dim sTemp
	sTemp = str
	inHTML = ""
	If IsNull(sTemp) = True Then
		Exit Function
	End If
	sTemp = Replace(sTemp, "&", "&amp;")
	sTemp = Replace(sTemp, "<", "&lt;")
	sTemp = Replace(sTemp, ">", "&gt;")
	sTemp = Replace(sTemp, Chr(34), "&quot;")
	inHTML = sTemp
End Function
' ============================================
' 把字符串进行HTML解码,替换server.htmlencode
' 去除Html格式，用于显示输出
' ============================================
Function outHTML(str)
	Dim sTemp
	sTemp = str
	outHTML = ""
	If IsNull(sTemp) = True Then
		Exit Function
	End If
	sTemp = Replace(sTemp, "&", "&amp;")
	sTemp = Replace(sTemp, "<", "&lt;")
	sTemp = Replace(sTemp, ">", "&gt;")
	sTemp = Replace(sTemp, Chr(34), "&quot;")
	sTemp = Replace(sTemp, Chr(10), "<br>")
	outHTML = sTemp
End Function

function CheckSaveFileNamePic(objSavePic,objContent)	'主要解决编辑器中删除图片后，保存图片字段的调整。
	if(objSavePic="" or objSavePic=null) then exit function
	tFileName=""
	arrFile = Split(objSavePic,"|")
	for i=0 to ubound(arrFile)
	  if Instr(objContent,arrFile(i))>0 then tFileName = tFileName & "|" & arrFile(i)
    next
	if left(tFileName,1) = "|" then tFileName = right(tFileName,(len(tFileName)-1))
	if instr(tFileName,"||")>0 then tFileName = trim(replace(tFileName,"||","|"))
	CheckSaveFileNamePic=tFileName
end function

' ============================================
	'*显示验证码
' ============================================
Function getcode() 
	Dim test
	'On Error Resume Next
	Set test=Server.CreateObject("Adodb.Stream")
	Set test=Nothing
	If Err Then
		Dim zNum
		Randomize timer
		zNum = cint(8999*Rnd+1000)
		Session("GetCode") = zNum
		getcode= Session("GetCode")		
	Else
		getcode= "<img src=""ValidationCode/getcode.asp"">"		
	End If
End Function

' ============================================
' * 得到当前完整URL
' ============================================
Function GetFullUrl()
   dim httpHost,scriptName,queryStr
   httpHost=request.ServerVariables("HTTP_HOST")
   scriptName=Request.ServerVariables("SCRIPT_NAME")
   queryStr=request.ServerVariables("QUERY_STRING")
  	if queryStr<>"" then
		queryStr="?"&queryStr
	end if
  	GetFullUrl=lcase("http://"&httpHost&scriptName&queryStr)
End Function

' ============================================
' * 得到当前页文件名
' ============================================
function getFileName()
	scriptName=Request.ServerVariables("SCRIPT_NAME")
	getFileName=lcase(right(scriptName,len(scriptName)-InstrRev(scriptName,"/")))
end function



'''''''''''''''''''''''''''''''''''''''''''

' ============================================
' * 得到 IP 地址
' ============================================
Function GetIP()
 if(Request.ServerVariables("REMOTE_ADDR") = "") Then
  GetIP = Request.ServerVariables("HTTP_X_FORWARDED_FOR") '代理IP地址
 else
  GetIP = Request.ServerVariables("REMOTE_ADDR")
 end if
End Function


'**************************************************
'过程名：ipsource
'作  用：显示用户来源
'参  数：sip
'**************************************************
Function ipsource(sip)
	dim iprs,ipsql,ipconn,ipconnstr
	if isnumeric(left(sip,2)) then
		if sip="127.0.0.1" then sip="192.168.0.1"
		str1=left(sip,instr(sip,".")-1)
		sip=mid(sip,instr(sip,".")+1)
		str2=left(sip,instr(sip,".")-1)
		sip=mid(sip,instr(sip,".")+1)
		str3=left(sip,instr(sip,".")-1)
		str4=mid(sip,instr(sip,".")+1)
		if isNumeric(str1)=0 or isNumeric(str2)=0 or isNumeric(str3)=0 or isNumeric(str4)=0 then
	
		else
			num=cint(str1)*256*256*256+cint(str2)*256*256+cint(str3)*256+cint(str4)-1

			ipsql="select Top 1 country,city from address where ip1 <="&num&" and ip2 >="&num&""
			set iprs=ipConn.execute(ipsql)
			if iprs.eof and iprs.bof then 
				country="亚洲"
				city=""
			else
				country=iprs("country")
				city=iprs("city")
			end if
			
			iprs.close
			set iprs=nothing
			ipconn.close
			set ipconn=nothing
		end if
			ipsource=country&city
	else
		ipsource="未知"
	end if
end function

'附件水印

Function JpegPersits(FileName)
	WatermarkType=0  '水印样式,0为水印文字,1为水印图片
	widthposition="left" '水印位置,left,center,right
	'HeightPosition="left" '垂直位置,top,center,bottom

	if WatermarkType=0 then
		Set Jpeg = Server.CreateObject("Persits.Jpeg") ' 建立对象
		'response.Write server.MapPath("../"&FileName)
		Jpeg.Open Server.MapPath("../"&FileName)  ' 图片所在位置
		Jpeg.Canvas.Font.Color =&HCCCCCC	'颜色
		Jpeg.Canvas.Font.Family = "宋体" 		'字体
		Jpeg.Canvas.Font.size =25		'大小
		Jpeg.Canvas.Font.Bold = false	'是否加粗
		'Jpeg.Canvas.Font.ShadowXoffset = 10		'水印文字阴影向右偏移的像素值，输入负值则向左偏移
		'Jpeg.Canvas.Font.ShadowYoffset = 10		'水印文字阴影向下偏移的像素值，输入负值则向右偏移
		Title = "water"  '水印文字
		TitleWidth = Jpeg.Canvas.GetTextExtent(Title)
		'if Jpeg.Width<TitleWidth then exit function	'图片比水印文字小，则不加水印
		select case widthposition
		case "left"
			PositionWidth=10
		case "center"
			PositionWidth=(Jpeg.Width - TitleWidth) / 2
		case "right"
			PositionWidth= Jpeg.Width - TitleWidth - 10
		end select
		Jpeg.Canvas.Print PositionWidth, 10, Title
		 
		Jpeg.Save  Server.mappath("../"&FileName)  ' 保存文件
		Set Jpeg = Nothing
		'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
	elseif WatermarkType=1 then
		Set Jpeg2 = Server.CreateObject("Persits.Jpeg")
		Jpeg2.Open Server.MapPath("upfile/water.jpg")  '水印图片位置
		Jpeg2Width=Jpeg2.OriginalWidth
		Jpeg2Height=Jpeg2.OriginalHeight
		if Jpeg.Width<Jpeg2Width or Jpeg.Height<Jpeg2Height*2 then exit function	'图片比水印图片小，则不加水印
		select case widthposition
		case "left"
			PositionWidth=10
		case "center"
			PositionWidth=(Jpeg.Width - Jpeg2Width) / 2
		case "right"
			PositionWidth= Jpeg.Width - Jpeg2Width - 10
		end select
		select case HeightPosition
		case "top"
			PositionHeight=10
		case "center"
			PositionHeight=(Jpeg.Height - Jpeg2Height) / 2
		case "bottom"
			PositionHeight= Jpeg.Height - Jpeg2Height - 10
		end select
		Jpeg.Canvas.DrawImage PositionWidth, PositionHeight, Jpeg2, 1, &HFFFFFF	'透明度, 透明颜色
	end if
End Function



'**************************************************
'过程名：WriteErrMsg
'作  用：显示错误提示信息
'参  数：无
'**************************************************
sub WriteErrMsg(errMsgs)
	dim strErr
	strErr=strErr & "<html><head><title>错误提示页面</title><meta http-equiv='Content-Type' content='text/html; charset=gb2312'>" & vbcrlf
	strErr=strErr & "</head><body><br><br>" & vbcrlf
	strErr=strErr & "<table cellpadding=5 cellspacing=0 border=0 width=400 class='border' align=center>" & vbcrlf
	strErr=strErr & "  <tr><td  align='center'><strong>错误信息</strong></td></tr>" & vbcrlf
	strErr=strErr & "  <tr><td height='100' valign='top'><b>产生错误的可能原因：</b>" & errMsgs &"</td></tr>" & vbcrlf
	strErr=strErr & "  <tr><td  align='center'><input type=button onclick='history.go(-1)' value=' 返回 '>&nbsp;&nbsp;<input type=button onclick='window.close();' value=' 关闭 '></td></tr>" & vbcrlf
	strErr=strErr & "</table>" & vbcrlf
	strErr=strErr & "</body></html>" & vbcrlf
	response.write strErr
end sub



'**************************************************
	'过程名：CheckSize
	'由转换显示的大小
	'参  数：ByteSize
'**************************************************
Function CheckSize(ByteSize)  
	if ByteSize>=1073741824 then
		ByteSize=formatnumber(ByteSize/1073741824,2)&" GB"
	elseif ByteSize>=1048576 then
		ByteSize=formatnumber(ByteSize/1048576,2)&" MB"
	elseif ByteSize>=1024 then
		ByteSize=formatnumber(ByteSize/1024,2)&" KB"
	else
		ByteSize=ByteSize&" Byte"
	end if
	CheckSize=ByteSize
End Function


Private Function CheckPath(ByVal sPath)
 If Right(sPath,1)<>"\" Then
 	sPath = sPath & "\"
 End If
 CheckPath = sPath
End Function



 %>