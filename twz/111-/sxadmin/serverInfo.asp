<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!--#include file="judge.asp"-->
<%
' *************************************************

'  阿江ASP探针 V1.93 20060602
'  阿江守候 http://www.ajiang.net

' *************************************************

' 不使用输出缓冲区，直接将运行结果显示在客户端
Response.Buffer = true

' 网页立即超时，防止缓存导致测速失败。
Response.Expires = -1

' 将检测的组件的列表
Dim OtT(3,15,1)
' 服务器变量
dim okCPUS, okCPU, okOS
' 检测组件变量
dim isobj,VerObj,TestObj


%>

<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<TITLE>服务器信息</TITLE>
<style>
<!--
h1 {font-size:14px;color:#3F8805;font-family:Arial;margin:15px 0px 5px 0px}
h2 {font-size:12px;color:#000000;margin:15px 0px 8px 0px}
h3 {font-size:12px;color:#3F8805;font-family:Arial;margin:7px 0px 3px 12px;font-weight: normal;}
BODY,TD{FONT-FAMILY: 宋体;FONT-SIZE: 12px;word-break:break-all}
tr{BACKGROUND-COLOR: #EEFEE0}
A{COLOR: #3F8805;TEXT-DECORATION: none}
A:hover{COLOR: #000000;TEXT-DECORATION: underline}
A.a1{COLOR: #000000;TEXT-DECORATION: none}
A.a1:hover{COLOR: #3F8805;TEXT-DECORATION: underline}
table{BORDER: #3F8805 1px solid;background-color:#3F8805;margin-left:12px}
p{margin:5px 12px;color:#000000}
.input{BORDER: #111111 1px solid;FONT-SIZE: 9pt;BACKGROUND-color: #F8FFF0}
.backs{BACKGROUND-COLOR: #3F8805;COLOR: #ffffff;text-align:center}
.backq{BACKGROUND-COLOR: #EEFEE0}
.backc{BACKGROUND-COLOR: #3F8805;BORDER: medium none;COLOR: #ffffff;HEIGHT: 18px;font-size: 9pt}
.fonts{	COLOR: #3F8805}
-->
</STYLE>
</HEAD>
<body>





<%


' *******************************************************************************
' 　　[ A ] 是否支持ASP
' *******************************************************************************

%>
<h2>是否支持ASP</h2>
  <table border=0 width=500 cellspacing=1 cellpadding=3>
    <tr><td>
    出现以下情况即表示您的空间不支持ASP：
    <br>1、访问本文件时提示下载。
    <br>2、访问本文件时看到类似“&lt;&#x25;&#x40;&#x20;&#x4C;&#x61;&#x6E;&#x67;&#x75;&#x61;&#x67;&#x65;&#x3D;&#x22;&#x56;&#x42;&#x53;&#x63;&#x72;&#x69;&#x70;&#x74;&#x22;&#x20;&#x25;&gt;”的文字。
    </td></tr>
  </table>
<%







' *******************************************************************************
' 　　[ B ] 服务器概况
' *******************************************************************************

%>
  <h2>服务器概况</h2>
	<table border=0 width=500 cellspacing=1 cellpadding=3>
	  <tr>
		<td width="110">服务器地址</td><td width="390">名称 <%=Request.ServerVariables("SERVER_NAME")%>(IP:<%=Request.ServerVariables("LOCAL_ADDR")%>) 端口:<%=Request.ServerVariables("SERVER_PORT")%></td>
	  </tr>
	  <%
	  tnow = now():oknow = cstr(tnow)
	  if oknow <> year(tnow) & "-" & month(tnow) & "-" & day(tnow) & " " & hour(tnow) & ":" & right(FormatNumber(minute(tnow)/100,2),2) & ":" & right(FormatNumber(second(tnow)/100,2),2) then oknow = oknow & " (日期格式不规范)"
	  %>
	  <tr>
		<td>服务器时间</td><td><%=oknow%></td>
	  </tr>
	  <tr>
		<td>IIS版本</td><td><%=Request.ServerVariables("SERVER_SOFTWARE")%></td>
	  </tr>
	  <tr>
		<td>脚本超时时间</td><td><%=Server.ScriptTimeout%> 秒</td>
	  </tr>
	  <tr>
		<td>本文件路径</td><td><%=Request.ServerVariables("PATH_TRANSLATED")%></td>
	  </tr>
	  <tr>
		<td>服务器脚本引擎</td><td><%=ScriptEngine & "/"& ScriptEngineMajorVersion &"."&ScriptEngineMinorVersion&"."& ScriptEngineBuildVersion %> , <%="JScript/" & getjver()%></td>
	  </tr>
	  <%getsysinfo()  '获得服务器数据%>
	  <tr>
		<td>服务器操作系统</td><td><%=okOS%></td>
	  </tr>
	  <tr>
		<td>全局和会话变量</td><td>Application 变量 <%=Application.Contents.count%> 个<%if Application.Contents.count>0 then Response.Write "[<a href=""?T=C"">列表</a>]"%>, 
		Session 变量 <%=Session.Contents.count%> 个  <%if Session.Contents.count>0 then Response.Write "[<a href=""?T=D"">列表</a>]"%></td>
	  </tr>
	  <tr>
		<td>ServerVariables</td><td><%=Request.ServerVariables.Count%> 个  <%if Request.ServerVariables.Count>0 then Response.Write "[<a href=""?T=E"">Request.ServerVariables 列表</a>]"%></td>
	  </tr>
	  <tr>
		<td>服务器CPU通道数</td><td><%=okCPUS%> 个</td>
	  </tr>
	  <%
	  call ObjTest("WScript.Shell")
	  if isobj then
	    set WSshell=server.CreateObject("WScript.Shell")
	  %>
	  <tr>
		<td>服务器CPU详情</td><td><%=okCPU%></td>
	  </tr>
	  <tr>
		<td>全部服务器环境</td><td><%=WSshell.Environment.count%> 个  <%if WSshell.Environment.count>0 then Response.Write "[<a href=""?T=F"">WSshell.Environment 列表</a>]"%></td>
	  </tr>
	  <%
	  end if
	  %>
	</table>
<%


%>
<SCRIPT language="JScript" runat="server">
function getJVer(){
  //获取JScript 版本
  return ScriptEngineMajorVersion() +"."+ScriptEngineMinorVersion()+"."+ ScriptEngineBuildVersion();
}
</SCRIPT>
<%

' 获取服务器常用参数
sub getsysinfo()
  on error resume next
  Set WshShell = server.CreateObject("WScript.Shell")
  Set WshSysEnv = WshShell.Environment("SYSTEM")
  okOS = cstr(WshSysEnv("OS"))
  okCPUS = cstr(WshSysEnv("NUMBER_OF_PROCESSORS"))
  okCPU = cstr(WshSysEnv("PROCESSOR_IDENTIFIER"))
  if isempty(okCPUS) then
    okCPUS = Request.ServerVariables("NUMBER_OF_PROCESSORS")
  end if
  if okCPUS & "" = "" then
    okCPUS = "(未知)"
  end if
  if okOS & "" = "" then
    okOS = "(未知)"
  end if
end sub






' *******************************************************************************
' 　　[ C ] Application 变量列表
' *******************************************************************************

%>
<h2>Application 变量列表</h2>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="110">变 量 名 称</td><td width="390">值</td></tr>
  <%for each apps in Application.Contents%>
  <tr><td width="110"><%=apps%></td><td width="390"><%
  if isobject(Application.Contents(apps)) then
    Response.Write "[对象]"
  elseif isarray(Application.Contents(apps)) then
    Response.Write "[数组]"
  else
    Response.Write cHtml(Application.Contents(apps))
  end if
  %></td></tr><%next%>
</table>
<%







' *******************************************************************************
' 　　[ D ] Session 变量列表
' *******************************************************************************

%>
<h2>Session 变量列表</h2>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="110">变 量 名 称</td><td width="390">值</td></tr>
  <%for each sens in Session.Contents%>
  <tr><td width="110"><%=sens%></td><td width="390"><%
  if isobject(Session.Contents(sens)) then
    Response.Write "[对象]"
  elseif isarray(Session.Contents(sens)) then
    Response.Write "[数组]"
  else
    Response.Write cHtml(Session.Contents(sens))
  end if
  %></td></tr><%next%>
</table>
<%




' *******************************************************************************
' 　　[ G ] 组件检测
' *******************************************************************************

  on error resume next
  OtT(0,0,0) = "MSWC.AdRotator"
  OtT(0,1,0) = "MSWC.BrowserType"
  OtT(0,2,0) = "MSWC.NextLink"
  OtT(0,3,0) = "MSWC.Tools"
  OtT(0,4,0) = "MSWC.Status"
  OtT(0,5,0) = "MSWC.Counters"
  OtT(0,6,0) = "IISSample.ContentRotator"
  OtT(0,7,0) = "IISSample.PageCounter"
  OtT(0,8,0) = "MSWC.PermissionChecker"
  OtT(0,9,0) = "Microsoft.XMLHTTP"
	OtT(0,9,1) = "(Http 组件, 常在采集系统中用到)"
  OtT(0,10,0) = "WScript.Shell"
	OtT(0,10,1) = "(Shell 组件, 可能涉及安全问题)"
  OtT(0,11,0) = "Scripting.FileSystemObject"
	OtT(0,11,1) = "(FSO 文件系统管理、文本文件读写)"
  OtT(0,12,0) = "Adodb.Connection"
	OtT(0,12,1) = "(ADO 数据对象)"
  OtT(0,13,0) = "Adodb.Stream"
	OtT(0,13,1) = "(ADO 数据流对象, 常见被用在无组件上传程序中)"
	
  OtT(1,0,0) = "SoftArtisans.FileUp"
	OtT(1,0,1) = "(SA-FileUp 文件上传)"
  OtT(1,1,0) = "SoftArtisans.FileManager"
	OtT(1,1,1) = "(SoftArtisans 文件管理)"
  OtT(1,2,0) = "Ironsoft.UpLoad"
	OtT(1,2,1) = "(国产免费, 上传组件)"
  OtT(1,3,0) = "LyfUpload.UploadFile"
	OtT(1,3,1) = "(刘云峰的文件上传组件)"
  OtT(1,4,0) = "Persits.Upload.1"
	OtT(1,4,1) = "(ASPUpload 文件上传)"
  OtT(1,5,0) = "w3.upload"
	OtT(1,5,1) = "(Dimac 文件上传)"

  OtT(2,0,0) = "JMail.SmtpMail"
	OtT(2,0,1) = "(Dimac JMail 邮件收发) <a href='http://www.ajiang.net/products/aspcheck/coms.asp'>中文手册下载</a>"
  OtT(2,1,0) = "CDONTS.NewMail"
	OtT(2,1,1) = "(CDONTS)"
  OtT(2,2,0) = "CDO.Message"
	OtT(2,2,1) = "(CDOSYS)"
  OtT(2,3,0) = "Persits.MailSender"
	OtT(2,3,1) = "(ASPemail 发信)"
  OtT(2,4,0) = "SMTPsvg.Mailer"
	OtT(2,4,1) = "(ASPmail 发信)"
  OtT(2,5,0) = "DkQmail.Qmail"
	OtT(2,5,1) = "(dkQmail 发信)"
  OtT(2,6,0) = "SmtpMail.SmtpMail.1"
	OtT(2,6,1) = "(SmtpMail 发信)"
	
  OtT(3,0,0) = "SoftArtisans.ImageGen"
	OtT(3,0,1) = "(SA 的图像读写组件)"
  OtT(3,1,0) = "W3Image.Image"
	OtT(3,1,1) = "(Dimac 的图像读写组件)"
  OtT(3,2,0) = "Persits.Jpeg"
	OtT(3,2,1) = "(ASPJpeg)"
  OtT(3,3,0) = "XY.Graphics"
	OtT(3,3,1) = "(国产免费, 图像/图表处理)"
  OtT(3,4,0) = "Ironsoft.DrawPic"
	OtT(3,4,1) = "(国产免费, 图像/图形处理)"
  OtT(3,5,0) = "Ironsoft.FlashCapture"
	OtT(3,5,1) = "(国产免费, 多功能 FLASH 截图)"
  OtT(3,6,0) = "dyy.zipsvr"
	OtT(3,6,1) = "(国产免费, 呆呆文件压缩解压组件)"
  OtT(3,7,0) = "hin2.com_iis"
	OtT(3,7,1) = "(国产免费, 呆呆IIS管理组件)"
  OtT(3,8,0) = "Socket.TCP"
	OtT(3,8,1) = "(Dimac 公司的 Socket 组件)"
	
%>


<h3>■ 操作系统自带的组件</h3>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="380">组件名称及简介</td><td width="120">支持/版本</td></tr>
  <%
  k=0
  for i=0 to 13
    call ObjTest(OtT(k,i,0))
  %>
  <tr><td width="380"><%=OtT(k,i,0) & " <font color='#888888'>" & OtT(k,i,1) & "</font>"%></td><td width="120" title="<%=VerObj%>"><%=cIsReady(isobj) & " " & left(VerObj,10)%></td></tr>
  <%next%>
</table>

<h3>■ 常见文件上传和管理组件</h3>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="380">组件名称及简介</td><td width="120">支持/版本</td></tr>
  <%
  k=1
  for i=0 to 5
    call ObjTest(OtT(k,i,0))
  %>
  <tr><td width="380"><%=OtT(k,i,0) & " <font color='#888888'>" & OtT(k,i,1) & "</font>"%></td><td width="120" title="<%=VerObj%>"><%=cIsReady(isobj) & " " & left(VerObj,10)%></td></tr>
  <%next%>
</table>

<h3>■ 常见邮件处理组件</h3>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="380">组件名称及简介</td><td width="120">支持/版本</td></tr>
  <%
  k=2
  for i=0 to 6
    call ObjTest(OtT(k,i,0))
  %>
  <tr><td width="380"><%=OtT(k,i,0) & " <font color='#888888'>" & OtT(k,i,1) & "</font>"%></td><td width="120" title="<%=VerObj%>"><%=cIsReady(isobj) & " " & left(VerObj,10)%></td></tr>
  <%next%>
</table>

<h3>■ 其它常见组件</h3>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr class="backs"><td width="380">组件名称及简介</td><td width="120">支持/版本</td></tr>
  <%
  k=3
  for i=0 to 8
    call ObjTest(OtT(k,i,0))
  %>
  <tr><td width="380"><%=OtT(k,i,0) & " <font color='#888888'>" & OtT(k,i,1) & "</font>"%></td><td width="120" title="<%=VerObj%>"><%=cIsReady(isobj) & " " & left(VerObj,10)%></td></tr>
  <%next%>
</table>

<p>
<%
	







' *******************************************************************************
' 　　[ H ] 磁盘信息
' *******************************************************************************

  on error resume next

  ObjTest("Scripting.FileSystemObject")
  if isobj then
	set fsoobj=server.CreateObject("Scripting.FileSystemObject")

%>

<h2>磁盘和文件夹</h2>

<h3>■ 服务器磁盘信息</h3>

<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr align=center class="backs">
	<td width="100">盘符和磁盘类型</td>
	<td width="50">就绪</td>
	<td width="110">卷标</td>
	<td width="80">文件系统</td>
	<td width="80">可用空间</td>
	<td width="80">总空间</td>
  </tr>
<%

	' 测试磁盘信息的想法来自“COCOON ASP 探针”
	
	set drvObj=fsoobj.Drives
	for each d in drvObj
%>
  <tr align="center" class="backq">
	<td align="right"><%=cdrivetype(d.DriveType) & " " & d.DriveLetter%>:</td>
<%
	if d.DriveLetter = "A" then	'为防止影响服务器，不检查软驱
		Response.Write "<td></td><td></td><td></td><td></td><td></td>"
	else
%>
	<td><%=cIsReady(d.isReady)%></td>
	<td><%=d.VolumeName%></td>
	<td><%=d.FileSystem%></td>
	<td align="right"><%=cSize(d.FreeSpace)%></td>
	<td align="right"><%=cSize(d.TotalSize)%></td>
<%
	end if
%>
  </tr>
<%
	next
%>
</td></tr>
</table>
<p>“<font color=red><b>×</b></font>”表示磁盘没有就绪或者当前IIS站点没有对该磁盘的操作权限。

<h3>■ 当前文件夹信息</h3>
<%

Response.Flush


	dPath = server.MapPath("./")
	set dDir = fsoObj.GetFolder(dPath)
	set dDrive = fsoObj.GetDrive(dDir.Drive)
%>
<p>文件夹: <%=dPath%></p>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr height="18" align="center" class="backs">
	<td width="75">已用空间</td>
	<td width="75">可用空间</td>
	<td width="75">文件夹数</td>
	<td width="75">文件数</td>
	<td width="200">创建时间</td>
  </tr>
  <tr height="18" align="center" class="backq">
	<td><%=cSize(dDir.Size)%></td>
	<td><%=cSize(dDrive.AvailableSpace)%></td>
	<td><%=dDir.SubFolders.Count%></td>
	<td><%=dDir.Files.Count%></td>
	<td><%=dDir.DateCreated%></td>
  </tr>
</td></tr>
</table>

<%
Response.Flush

end if






' *******************************************************************************
' 　　[ J ] 脚本运算速度
' *******************************************************************************

%>
<h2>ASP脚本解释和运算速度测试</h2><p>
<%
Response.Flush

	'感谢网际同学录 http://www.5719.net 推荐使用timer函数
	'因为只进行50万次计算，所以去掉了是否检测的选项而直接检测
	
	Response.Write "整数运算测试，正在进行50万次加法运算..."
	dim t1,t2,lsabc,thetime,thetime2
	t1=timer
	for i=1 to 500000
		lsabc= 1 + 1
	next
	t2=timer
	thetime=cstr(int(( (t2-t1)*10000 )+0.5)/10)
	Response.Write "...已完成！<font color=red>" & thetime & "毫秒</font>。<br>"


	Response.Write "浮点运算测试，正在进行20万次开方运算..."
	t1=timer
	for i=1 to 200000
		lsabc= 2^0.5
	next
	t2=timer
	thetime2=cstr(int(( (t2-t1)*10000 )+0.5)/10)
	Response.Write "...已完成！<font color=red>" & thetime2 & "毫秒</font>。<br>"
%></p>
<table border=0 width=500 cellspacing=1 cellpadding=3>
  <tr align=center class="backs">
	<td width=350>供对照的服务器及完成时间(毫秒)</td>
    <td width=75>整数运算</td><td width=75>浮点运算</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.100u.com?come=aspcheck&keyword=虚拟主机"
	>百优科技 100u 主机, <font color=#888888>2003-11-1</font></a></td><td>&nbsp;181～233</td><td>&nbsp;156～218</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.west263.net/index.asp?ads=ajiang"
	>西部数码 west263 主机, <font color=#888888>2003-11-1</font></a></td><td>&nbsp;171～233</td><td>&nbsp;156～171</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.163n.com "
	>数码城市 163n 主机,  <font color=#888888>2006-1-4</font></a></td><td>&nbsp;156～171</td><td>&nbsp;140～156</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.9s5.com/"
	>就是我www.9s5.com全功能(ASP+PHP+JSP)主机,<font color=#888888>2003-11-1</font></a></td><td>&nbsp;171～187</td><td>&nbsp;156～171</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.dnsmy.com/"
	>永讯网络 Dnsmy 主机, <font color=#888888>2003-11-1</font></a></td><td>&nbsp;155～180</td><td>&nbsp;122～172</td>
  </tr>
  <tr>
	<td><a class="a1" target="_blank" href="http://www.senye.com"
	>胜易网 senye.com 主机, <font color=#888888>2004-3-28</font></a></td><td>&nbsp;156～171</td><td>&nbsp;140～156</td>
  </tr>
  <tr>
	<td><font color=red>这台服务器: <%=Request.ServerVariables("SERVER_NAME")%></font>&nbsp;</td><td>&nbsp;<font color=red><%=thetime%></font></td><td>&nbsp;<font color=red><%=thetime2%></font></td>
  </tr>
</table>

<%


' *******************************************************************************
' 　　其他函数和子程序
' *******************************************************************************





' 转换字串为HTML代码
function cHtml(iText)
  cHtml = iText
  cHtml = server.HTMLEncode(cHtml)
  cHtml = replace(cHtml,chr(10),"<br>")
end function

' 转换磁盘类型为中文
function cdrivetype(tnum)
  Select Case tnum
    Case 0: cdrivetype = "未知"
    Case 1: cdrivetype = "可移动磁盘"
    Case 2: cdrivetype = "本地硬盘"
    Case 3: cdrivetype = "网络磁盘"
    Case 4: cdrivetype = "CD-ROM"
    Case 5: cdrivetype = "RAM 磁盘"
  End Select
end function

' 将是否可用转换为对号和错号
function cIsReady(trd)
  Select Case trd
    case true: cIsReady="<font class=fonts><b>√</b></font>"
    case false: cIsReady="<font color='red'><b>×</b></font>"
  End Select
end function

' 转换字节数为简写形式
function cSize(tSize)
  if tSize>=1073741824 then
    cSize=int((tSize/1073741824)*1000)/1000 & " GB"
  elseif tSize>=1048576 then
    cSize=int((tSize/1048576)*1000)/1000 & " MB"
  elseif tSize>=1024 then
    cSize=int((tSize/1024)*1000)/1000 & " KB"
  else
    cSize=tSize & "B"
  end if
end function

'检查组件是否被支持及组件版本的子程序
sub ObjTest(strObj)
  on error resume next
  IsObj=false
  VerObj=""
  set TestObj=server.CreateObject (strObj)
  If -2147221005 <> Err then		'感谢网友iAmFisher的宝贵建议
    IsObj = True
    VerObj = TestObj.version
    if VerObj="" or isnull(VerObj) then VerObj=TestObj.about
  end if
  set TestObj=nothing
End sub

%>

<br>
<span style=" text-align:center;"><a href="mainFrame.asp">【返回管理首页】</a></span>
<br>
 
</body>
</html>