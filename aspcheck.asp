<%@ Language="VBScript" CODEPAGE="936"%>
<% Option Explicit %>
<%
Response.Buffer = True
'####################################
'#                                  #
'#      ITlearner ASP探针 V1.4      #
'#                                  #
'#     http://www.itlearner.com     #
'#                                  #
'#    转载本程序时请保留这些信息    #
'#                                  #
'####################################


	Dim startime,FileName,WebName,WebUrl,SysName,SysNameE,SysVersion
	startime=timer()


'####################################
'#                                  #
'#      各类函数和过程              #
'#                                  #
'####################################

	'检查组件是否被支持
	Function IsObjInstalled(strClassString)
		On Error Resume Next
		Dim xTestObj
		Set xTestObj = Server.CreateObject(strClassString)
		If Err Then
			IsObjInstalled = False
		else
			IsObjInstalled = True
		end if
		Set xTestObj = Nothing
	End Function

	'检查组件版本
	Function getver(Classstr)
		On Error Resume Next
		Dim xTestObj
		Set xTestObj = Server.CreateObject(Classstr)
		If Err Then
			getver=""
		else
		 	getver=xTestObj.version
		end if
		Set xTestObj = Nothing
	End Function

  '得到组件信息并输出
	Sub GetObjInfo(startnum,endnum)
  '组件数组
  Dim theTestObj(25,2)

	theTestObj(0,0) = "MSWC.AdRotator"
	theTestObj(1,0) = "MSWC.BrowserType"
	theTestObj(2,0) = "MSWC.NextLink"
	theTestObj(7,0) = "WScript.Shell"
	theTestObj(8,0) = "Microsoft.XMLHTTP"
	theTestObj(9,0) = "Scripting.FileSystemObject"
	theTestObj(9,1) = "(FSO 文本文件读写)"
	theTestObj(10,0) = "ADODB.Connection"
	theTestObj(10,1) = "(ADO 数据对象)"

	theTestObj(11,0) = "SoftArtisans.FileUp"
	theTestObj(11,1) = "(SA-FileUp 文件上传)"
	theTestObj(12,0) = "Persits.Upload"
	theTestObj(12,1) = "(ASPUpload 文件上传)"
	theTestObj(13,0) = "LyfUpload.UploadFile"
	theTestObj(13,1) = "(刘云峰的文件上传组件)"
	theTestObj(14,0) = "SoftArtisans.ImageGen"
	theTestObj(14,1) = "(SA 的图像读写组件)"
	theTestObj(15,0) = "Persits.Jpeg"
	theTestObj(15,1) = "(ASPJPEG:图像读写组件)"

	'邮件发送
	theTestObj(16,0) = "JMail.SmtpMail"
	theTestObj(16,1) = "(Dimac JMail 邮件收发)"
	theTestObj(17,0) = "CDONTS.NewMail"
	theTestObj(17,1) = "(虚拟 SMTP 发信)"
	theTestObj(18,0) = "Persits.MailSender"
	theTestObj(18,1) = "(ASPemail 发信)"

		Dim i,Outstr,theObj
		For i=startnum To endnum
      theObj = theTestObj(i,0)
      If theObj <> "" then
	      	Outstr = Outstr & "<tr class=""hx_tr1""><td>" & theObj
	      	if theTestObj(i,1) <> "" then Outstr = Outstr & "<span class=""font_1"">"&theTestObj(i,1)&"</span>"
	      	Outstr = Outstr & "</td>"
	    	If Not IsObjInstalled(theTestObj(i,0)) Then
	      	Outstr = Outstr & "<td><span class=""font_2""><b>×</b></span></td>"
	    	Else
	      	Outstr = Outstr & "<td><span class=""font_3""><b>√</b></span> " & getver(theTestObj(i,0)) & "</td>"
			End If
	      	Outstr = Outstr & "</tr>" & vbCrLf
	    End If
		next
		Response.Write(Outstr)
	End Sub

  '格式化大小
	Function formatdsize(dsize)
	    if dsize>=1073741824 then
			formatdsize=Formatnumber(dsize/1073741824,2) & " GB"
	    elseif dsize>=1048576 then
	    	formatdsize=Formatnumber(dsize/1048576,2) & " MB"
	    elseif dsize>=1024 then
			formatdsize=Formatnumber(dsize/1024,2) & " KB"
		else
			formatdsize=dsize & "B"
		end if
	End Function

  '格式化输出
	Function formatvariables(str)
		on error resume next
		str = cstr(server.htmlencode(str))
		formatvariables=replace(str,chr(10),"<br/>")
	End Function

  '页尾输出
	Sub ShowFooter()
		dim Endtime,Runtime,OutStr
		Endtime=timer()
		OutStr = "<div id=""bottom"">"
		OutStr = OutStr & "<p><a href=""http://www.itlearner.com"" target=""_blank"">IT学习者</a> | <a href=""http://www.9enjoy.com"" target=""_blank"">作者Blog</a> | <a href=""http://www.aspcheck.org/"" target=""_blank"">下载最新版</a><br/>" & vbcrlf
	 	Runtime=FormatNumber((endtime-startime)*1000,2)
		if Runtime>0 then
			if Runtime>1000 then
				OutStr = OutStr & "页面执行时间：约"& FormatNumber(runtime/1000,2) & "秒"
			else
				OutStr = OutStr & "页面执行时间：约"& Runtime & "毫秒"
			end if
		end if
		OutStr = OutStr & "&nbsp;&nbsp;"
		OutStr = OutStr & "<a href=""http://www.asp" & "check.org"" target=""_blank"">ITlearner AspCheck " & SysVersion & "</a>"
		OutStr = OutStr & "</p></div>"
		Response.Write(OutStr)
	End Sub

	Function getEngVerVBS()
		getEngVerVBS = ScriptEngineMajorVersion() & "." & ScriptEngineMinorVersion() & "." & ScriptEngineBuildVersion()
	End Function

	'系统参数
	WebName   ="IT学习者"
	WebUrl    ="http://www.itlearner.com"
	SysName   ="ASP探针"
	SysNameE  ="AspCheck"
	SysVersion="V1.4"
	FileName  =Request.ServerVariables("SCRIPT_NAME")
	if InStr(FileName,"/") then FileName = right(FileName,len(FileName)-InStrRev(FileName,"/"))

dim action
action=request("action")
select case action
case ""
  Call HeadInfo("")
  Call SystemTest
  Call ObjTest
  Call CalcuateTest
case "Custom_ObjInfo"
  Call HeadInfo("服务器组件情况")
%><div class="frame_box"><%Call Custom_ObjInfo%></div><%
case "DriveTest"
  Call HeadInfo("服务器磁盘信息")
  Call DriveTest
case "CalcuateTest"
  Call HeadInfo("服务器运算能力")
  Call CalcuateTest
case "SpeedTest"
  Call HeadInfo("服务器连接速度")
  Call SpeedTest
case "SystemCheck"
  Call HeadInfo("系统用户(组)和进程检测")
	Call SystemCheck
case else
  Call HeadInfo("")
  Call SystemTest
end select

Call ShowFooter

Sub HeadInfo(str)
  dim pagetitle
  pagetitle = "IT学习者ASP探针(ITlearner AspCheck) " & SysVersion
  if str <> "" then pagetitle = str & "_" & pagetitle
%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312" />
<title><%=pagetitle%></title>
<style type="text/css">
<!--
body		{font-size:12px;margin-left:50px;background:#FFF;line-height:1.5;font-family:宋体,arial;color:#000;}
td,span {font-size:12px;word-wrap:break-word;word-break:break-all;overflow:hidden;line-height:1.2;}
form		{margin:0;}
a       {color:#000;text-decoration:none}
a:hover {color:#F00;text-decoration:underline;}
#top		{width:600px;margin:8px 0;text-align:center;}
#bottom	{border:1px dotted #183789;width:598px;margin-top:10px;text-align:center;padding:5px 0;}
h1			{font-size:30px;margin:0;}
h1 sub	{font-size:14px;font-weight:normal;}
.input  {border:1px solid #0099CF;}
.btn_c  {background:#0099CF;border:1px solid #0099CF;color:#FFF;font-size:12px;}
.PicBar {background:#0099CF;border:1px solid #000;height:12px;vertical-align:middle;float:left;}
.PicTxt {float:left;}
#txt_speed{position:absolute;height:30px;z-index:1000;}
.frame_box{border:0;width:600px;margin-top:5px;clear:both;}
.frame_box h3{background:#0099CF;text-align:center;color:#FFF;padding:3px;font-weight:bold;margin:0;font-size:12px;width:594px;}
.item_content{width:600px;}
.hx_tr1{text-indent:8px;background:#FFF;}
.hx_tr2{background:#FFF;}
.hx_tr3{text-align:center;background:#FFF;height:18px;}
.font_1{color:#888;}
.font_2{color:#080;}
.font_3{color:#F00;}
.table1{background:#0099CF;width:100%;border:0;}
th{background:#9CF;text-indent:6px;font-weight:normal;text-align:left;}
.table2{background:#0099CC;width:600px;}
-->
</style>
</head>
<body>
<a name="top"></a>
<div id="top">
<h1><a href="<%=FileName%>">ASP探针</a><sub> - <a href="http://www.aspcheck.org" target="_blank"><%=SysVersion%></a>(<a href="http://www.itlearner.com" target="_blank">ITlearner</a>)</sub></h1>
</div>
<div id="menu">选项：<a href="<%=FileName%>#SystemTest">服务器有关参数</a> | <a href="<%=FileName%>#ObjTest">服务器组件情况</a> | <a href="?action=CalcuateTest">服务器运算能力</a> | <a href="?action=DriveTest">服务器磁盘信息</a> | <a href="?action=SpeedTest">服务器连接速度</a><br/>
安全：<a href="?action=SystemCheck">系统用户(组)和进程检测</a></div>
<%
End Sub

Sub SystemTest
on error resume next
Dim ServerName,ServerOS,Processors_no
ServerName = Request.ServerVariables("SERVER_NAME")
ServerOS = Request.ServerVariables("OS")
Processors_no = Request.ServerVariables("NUMBER_OF_PROCESSORS")
'win2003无法读出，改用下面的读取方式 080728
if ServerOS = "" or Processors_no = "" then
  Set WshShell = server.CreateObject("WScript.Shell")
  Set WshSysEnv = WshShell.Environment("SYSTEM")
  ServerOS = WshSysEnv("OS")
  Processors_no = WshSysEnv("NUMBER_OF_PROCESSORS")
  Set WshShell = nothing
end if
'禁用了WScript.Shell，就获取不到 080802
if ServerOS = "" then ServerOS = "不详"
if Processors_no = "" then
  Processors_no = "不详"
else
  Processors_no = Processors_no & "个"
end if
%>
<script language="JavaScript" runat="server">
	function getEngVerJs(){
		try{
			return ScriptEngineMajorVersion() +"."+ScriptEngineMinorVersion()+"."+ ScriptEngineBuildVersion() + " ";
		}catch(e){
			return "服务器不支持此项检测";
		}
	}
</script>
<a name="SystemTest"></a>
<div class="frame_box">
	<h3>服务器有关参数</h3>
	<div class="item_content" id="submenu0">
		<table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr class="hx_tr1">
          <td width="100">服务器名</td>
          <td width="185"><%=ServerName%></td>
          <td width="100">服务器操作系统</td>
          <td width="184"><%=ServerOS%></td>
        </tr>
        <tr class="hx_tr1">
          <td>服务器IP</td>
          <td><%=Request.ServerVariables("LOCAL_ADDR")%></td>
          <td>服务器端口</td>
          <td><%=Request.ServerVariables("SERVER_PORT")%></td>
        </tr>
        <tr class="hx_tr1">
          <td>服务器时间</td>
          <td><%=now%></td>
          <td>服务器CPU通道数</td>
          <td><%=Processors_no%></td>
        </tr>
        <tr class="hx_tr1">
          <td>IIS版本</td>
          <td><%=Request.ServerVariables("SERVER_SOFTWARE")%></td>
          <td>脚本超时时间</td>
          <td><%=Server.ScriptTimeout%> 秒</td>
        </tr>
        <tr class="hx_tr1">
          <td>Application变量</td>
          <td><%Response.Write(Application.Contents.Count & "个 ")
		  if Application.Contents.count>0 then Response.Write("[<a href=""?action=showapp"">遍历Application变量</a>]")%>
          </td>
          <td>Session变量</td>
          <td><%Response.Write(Session.Contents.Count&"个 ")
		  if Session.Contents.count>0 then Response.Write("[<a href=""?action=showsession"">遍历Session变量</a>]")%>
          </td>
        </tr>
        <tr class="hx_tr1">
          <td><a href="?action=showvariables">所有服务器参数</a></td>
          <td><%Response.Write(Request.ServerVariables.Count&"个 ")
		  if Request.ServerVariables.Count>0 then Response.Write("[<a href=""?action=showvariables"">遍历服务器参数</a>]")%>
          </td>
          <td>服务器环境变量</td>
          <td><%
			dim WshShell,WshSysEnv
			Set WshShell = server.CreateObject("WScript.Shell")
			Set WshSysEnv = WshShell.Environment
			if err then
				Response.Write("服务器不支持WScript.Shell组件")
				err.clear
			else
				Response.Write(WshSysEnv.count &"个 ")
				if WshSysEnv.count>0 then Response.Write("[<a href=""?action=showwsh"">遍历环境变量</a>]")
		 	end if
		  %>
          </td>
        </tr>
        <tr class="hx_tr1">
          <td>服务器解译引擎</td>
          <td colspan="3">JScript: <%= getEngVerJs() %> | VBScript: <%=getEngVerVBS()%></td>
        </tr>
        <tr class="hx_tr1">
          <td>本文件实际路径</td>
          <td colspan="3"><%=server.mappath(Request.ServerVariables("SCRIPT_NAME"))%></td>
        </tr>
      </table>
      <%
if action="showapp" or action="showsession" or action="showvariables" or action="showwsh" then
	showvariable(action)
end if
%>
	</div>
</div>
<%
End Sub

Sub showvariable(action)
%>
<table border="0" cellpadding="3" cellspacing="1" class="table2">
  <tr>
    <th colspan="2">
      <%
	'on error resume next
	dim Item,xTestObj,outstr
		Response.Write("· ")
	if action="showapp" then
		Response.Write("遍历Application变量")
		set xTestObj=Application.Contents
	elseif action="showsession" then
		Response.Write("遍历Session变量")
		set xTestObj=Session.Contents
	elseif action="showvariables" then
		Response.Write("遍历服务器参数")
		set xTestObj=Request.ServerVariables
	elseif action="showwsh" then
		Response.Write("遍历环境变量")
		dim WshShell
		Set WshShell = server.CreateObject("WScript.Shell")
		set xTestObj=WshShell.Environment
	end if
		Response.Write "(<a href="""&FileName&""">关闭</a>)"
	%>
    </th>
  </tr>
  <tr class="hx_tr2">
    <td width="100">变量名</td>
    <td width="485">值</td>
  </tr>
  <%
	if err then
		outstr = "<tr class=""hx_tr2""><td colspan=""2"">没有符合条件的变量</td></tr>"
		err.clear
	else
		dim w
		if action="showwsh" then
			for each Item in xTestObj
				w=split(Item,"=")
				outstr = outstr & "<tr class=""hx_tr2"">"
				outstr = outstr & "<td width=""100"">" & w(0) & "</td>"
				outstr = outstr & "<td width=""485"">" & w(1) & "</td>"
				outstr = outstr & "</tr>"
			next
		else
			dim i
			for each Item in xTestObj
				outstr = outstr & "<tr class=""hx_tr2"">"
				outstr = outstr & "<td width=""100"">" & Item & "</td>"
				outstr = outstr & "<td width=""485"">"
        if IsObject(xTestObj(Item)) then
          outstr = outstr & formatvariables(xTestObj(Item))
          if err then
            outstr = outstr & "[对象]"
          end if
        elseif IsArray(xTestObj(Item)) then
          outstr = outstr & "[数组]"
        else
          outstr = outstr & formatvariables(xTestObj(Item))
        end if
				outstr = outstr & "</td>"
				outstr = outstr & "</tr>"
			next
		end if
	end if
		Response.Write(outstr)
		set xTestObj=nothing
		%>
</table>
<%End Sub%>
<%Sub ObjTest

%>
<script type="text/javascript">
<!--
function Checksearchbox(form1){
if(form1.classname.value == "")
{
	alert("请输入你要检测的组件名！");
	form1.classname.focus();
	return false;
}
}
-->
</script>
<a name="ObjTest"></a>
<div class="frame_box">
	<h3>服务器组件情况</h3>
	<div class="item_content" id="submenu1">
			<table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="2">· IIS自带的ASP组件</th>
        </tr>
        <tr class="hx_tr1">
          <td width="440">组 件 名 称</td>
          <td width="145">支持及版本</td>
        </tr>
        <%GetObjInfo 0,10%>
        <tr>
          <th colspan="2">· 网站常用组件 </th>
        </tr>
        <tr class="hx_tr1">
          <td>组 件 名 称</td>
          <td>支持及版本</td>
        </tr>
        <%GetObjInfo 11,20%>
				<tr class="hx_tr1">
          <td colspan="2"><a href="http://www.9enjoy.com/post/295/" target="_blank">常见ASP组件下载和使用方法</a></td>
        </tr>
      </table>
      <%Call Custom_ObjInfo()%>
	</div>
</div>
<%
End Sub
Sub Custom_ObjInfo%>
      <table border="0" cellspacing="1" cellpadding="3" class="table1">
				<tr>
          <th>· 其他组件支持情况检测 </th>
        </tr>
        <tr class="hx_tr2">
          <td height="30">
          <form action="?action=Custom_ObjInfo" method="post">
          输入你要检测的组件的ProgId或ClassId
              <input class="input" type="text" value="" name="classname" size="40" />
              <input type="submit" value="确定" class="btn_c" name="submit1" onclick="return Checksearchbox(this.form);" />
          </form>
          </td>
				</tr>
<%
		Dim strClass
    strClass = Trim(Request.Form("classname"))
    If strClass <> "" then

    Response.Write "<tr class=""hx_tr2""><td height=""30"">您指定的组件的检查结果："
      If Not IsObjInstalled(strClass) then
        Response.Write "<span class=""font_3"">很遗憾，该服务器不支持" & strclass & "组件！</span>"
      Else
        Response.Write "<span class=""font_3"">"
		Response.Write " 恭喜！该服务器支持" & strclass & "组件。"
		If getver(strclass)<>"" then
		Response.Write " 该组件版本是：" & getver(strclass)
		End if
		Response.Write "</span>"
      End If
      Response.Write "</td></tr>"
    end if
%>
      </table>

<%End Sub

Sub CalcuateTest
%><a name="CalcuateTest"></a>
<div class="frame_box">
	<h3>服务器运算能力</h3>
	<div class="item_content" id="submenu2">
			<table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="3">· 让服务器执行50万次加法(整数运算)和20万次开方(浮点运算)，记录其所使用的时间。
          </th>
        </tr>
        <tr class="hx_tr3">
          <td width="400">可 供 参 考 的 服 务 器 列 表</td>
          <td width="100">整数运算</td>
          <td width="100">浮点运算</td>
        </tr>
        <tr class="hx_tr1">
          <td><a href="http://www.9enjoy.com/post/277/" target="_blank">ITlearner08年新配的电脑</a> (CPU:酷睿2 E4500 2.2G 内存:2G)</td>
          <td>93.75 毫秒</td>
          <td>109.38 毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td><a href="http://www.itlearner.com" target="_blank">ITlearner05年的老服务器</a> (CPU:P4 3.0G(1M) 内存:1.5G)</td>
          <td>187.50 毫秒</td>
          <td>171.88 毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td><a href="http://www.aspcheck.org/aspcheck.asp" target="_blank">Godaddy的Windows服务器(Deluxe Plan)</a> [2008/07/29]</td>
          <td>93.99 毫秒</td>
          <td>125.00 毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td><a href="http://www.iva.cn" target="_blank">伊瓦科技虚拟主机</a>&nbsp; [2008/07/29]</td>
          <td>109.38 毫秒</td>
          <td>109.86 毫秒</td>
        </tr>
        <%
	dim i,t1,t2,tempvalue,runtime1,runtime2
	'开始计算50万次加法所需时间
	t1=timer()
	for i=1 to 500000
		tempvalue= 1 + 1
	next
	t2=timer()
	runtime1=formatnumber((t2-t1)*1000,2)

	'开始计算20万次开方所需时间
	t1=timer()
	for i=1 to 200000
		tempvalue= 2^0.5
	next
	t2=timer()
	runtime2=formatnumber((t2-t1)*1000,2)
%>
        <tr class="hx_tr1">
          <td><span class="font_3">您正在使用的这台服务器</span>&nbsp; <input name="button" type="button" class="btn_c"  onclick="document.location.href='<%=FileName%>?action=CalcuateTest'" value="重新测试" />
          </td>
          <td><span class="font_3"><%=runtime1%> 毫秒</span></td>
          <td><span class="font_3"><%=runtime2%> 毫秒</span></td>
        </tr>
      </table>
	</div>
</div>
<%
End Sub
Sub DriveTest
	On Error Resume Next
	Dim fo,d,xTestObj
	set fo=Server.Createobject("Scripting.FileSystemObject")
	set xTestObj=fo.Drives
%>
<a name="DriveTest"></a>
<div class="frame_box">
	<h3>服务器磁盘信息</h3>
	<div class="item_content" id="submenu4">
		<%if IsObjInstalled("Scripting.FileSystemObject") then%>
      <table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="7">· 服务器磁盘信息</th>
        </tr>
        <tr class="hx_tr1">
          <td width="90">磁盘类型</td>
          <td width="60">盘符</td>
          <td width="40">可用</td>
          <td width="80">卷标</td>
          <td width="80">文件系统</td>
          <td width="100">可用空间</td>
		      <td width="100">总空间</td>
        </tr>
		<%
  Dim dtype
  dtype = Array("未知","可移动磁盘","本地硬盘","网络磁盘","CD-ROM","RAM 磁盘")
	for each d in xTestObj
		Response.write "<tr class=""hx_tr1"">"
		Response.write "<td>"&dtype(d.DriveType)&"</td>"
		Response.write "<td>"&d.DriveLetter&"</td>"
		if d.DriveLetter = "A" then
		Response.Write "<td colspan=""5"">为防止影响服务器，不检查软驱</td>"
		else
		Response.write "<td>"
		if d.isready then
			Response.Write "√"
			Response.write "</td>"
			Response.write "<td>"&d.VolumeName&"</td>"
			Response.write "<td>"&d.FileSystem&"</td>"
			Response.write "<td>"&formatdsize(d.FreeSpace)&"</td>"
			Response.write "<td>"&formatdsize(d.TotalSize)&"</td>"
		else
			Response.Write "×"
			Response.Write "<td colspan=4>&nbsp;可能是磁盘有问题，或者程序没有读取权限</td>"
		end if
		end if
	next%>
      </table>
	  <%
	Dim filePath,fileDir,fileDrive
	filePath = server.MapPath(".")
	set fileDir = fo.GetFolder(filePath)
	set fileDrive = fo.GetDrive(fileDir.Drive)
	  %>
      <table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="6">· 当前文件夹信息 (<%=filePath%>)</th>
        </tr>
        <tr class="hx_tr3">
          <td width="90">已用空间</td>
          <td width="80">可用空间</td>
          <td width="50">文件夹数</td>
          <td width="50">文件数</td>
          <td width="143">创建时间</td>
          <td width="144">修改时间</td>
        </tr>
        <%
		Response.write "<tr class=""hx_tr3"">"
		Response.write "<td>"&formatdsize(fileDir.Size)&"</td>"
		Response.write "<td>"
		Response.write formatdsize(fileDrive.AvailableSpace)
		if err then Response.write "没有权限读取" : error.clear
		Response.write "</td>"
		Response.write "<td>"&fileDir.SubFolders.Count&"</td>"
		Response.write "<td>"&fileDir.Files.Count&"</td>"
		Response.write "<td>"&fileDir.DateCreated&" </td> "
		Response.write "<td>"&fileDir.DateLastModified&" </td> "
%>
      </tr></table>
<%
	Dim i,t1,t2,runtime,TestFileName
	Dim tempfo
	t1= timer()
	for i=1 to 30
	TestFileName=server.mappath("Hx_Test_"&i&".txt")
	set tempfo=fo.CreateTextFile(TestFileName,true)
		tempfo.WriteLine "Create:It's a hxtest file."
	set tempfo=nothing
	if err then err.clear
	set tempfo=fo.OpenTextFile(TestFileName,8,0)
		tempfo.WriteLine "Appending:It's a hxtest file."
	set tempfo=nothing
	set tempfo=fo.GetFile(TestFileName)
		tempfo.delete True
	set tempfo=nothing
	if err then
	  runtime = "当前目录没有权限创建文件，无法测试!"
		error.clear
		Exit For
	end if
	next

	if runtime = "" then
	t2=	timer()
	runtime=formatnumber((t2-t1)*1000,2)
	if runtime = 0 then
		runtime = "当前目录没有权限创建文件，无法测试!"
	else
		runtime = runtime & "毫秒"
	end if
  end if
%>
      <a name="filetest"></a>
      <table border="0" cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="2">· 磁盘文件操作速度测试 (重复创建、写入、追加和删除文本文件30次，记录其所使用的时间)</th>
        </tr>
        <tr class="hx_tr3">
          <td width="400">可 供 参 考 的 服 务 器 列 表</td>
          <td width="200">完成时间</td>
        </tr>
        <tr class="hx_tr1">
          <td>ITlearner08年新配的电脑 (CPU:酷睿2 E4500 2.2G 内存:2G)</td>
          <td>62.50 ~ 78.13 毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td>ITlearner05年的老服务器 (CPU:P4 3.0G(1M) 内存:1.5G)</td>
          <td>46.88 ~ 62.50 毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td>Godaddy的Windows服务器(Deluxe Plan) [2008/07/29]</td>
          <td>15.63 ~ 16.11毫秒</td>
        </tr>
        <tr class="hx_tr1">
          <td><span class="font_3">您正在使用的这台服务器</span>&nbsp; <input name="button2" type="button" class="btn_c" onclick="document.location.reload()" value="重新测试" />
          </td>
          <td><span class="font_3"><%=runtime%></span></td>
        </tr>
      </table>
      <%
	  	else
		Response.write "&nbsp;您的服务器或租用的空间不支持FSO组件，无法进行此项测试!"
	end if%>
	</div>
</div>
<%
End Sub
Sub SpeedTest
%>
<a name="SpeedTest"></a>
<div class="frame_box">
	<h3>服务器连接速度</h3>
<%	if action="SpeedTest" then%>
	<div id="txt_speed">网速测试中，请稍候...</div>
<%	end if%>
	<div class="item_content" id="submenu3">
			<table cellspacing="1" cellpadding="3" class="table1">
        <tr>
          <th colspan="3">· 向客户端输出100k字节，记录所需时间，计算出连接速度</th>
        </tr>
        <tr class="hx_tr1">
          <td width="65">接入设备</td>
          <td width="400">连接速度(理想值，单位bps)</td>
          <td width="113">下载速度(理想值)</td>
        </tr>
        <tr class="hx_tr1">
          <td>56k Modem</td>
          <td><div class="PicBar" style="width:2px"></div><div class="PicTxt">56K</div></td><td>7.0 k/s</td>
        </tr>
        <tr class="hx_tr1">
          <td>2M ADSL</td>
          <td><div class="PicBar" style="width:80px"></div><div class="PicTxt">2M</div></td><td>250.0 k/s</td>
        </tr>
        <tr class="hx_tr1">
          <td>5M FTTP</td>
          <td><div class="PicBar" style="width:200px"></div><div class="PicTxt">5M</div></td><td>625.0 k/s</td>
        </tr>
        <tr class="hx_tr1">
          <td>当前连接</td>
          <td>
          <%
		dim i
		With Response
		.Write("<script language=""JavaScript"" type=""text/javascript"">var tSpeedStart=new Date();</script>")
		.Write("<!--") & chr(13) & chr(10)
		for i=1 to 1000
		.Write("ITlearner-AspCheck-v1.4#############################################################################") & chr(13) & chr(10)
		next
		.Write("-->") & chr(13) & chr(10)
		.Write("<script type=""text/javascript"">var tSpeedEnd=new Date();</script>") & chr(13) & chr(10)
		.Write("<script type=""text/javascript"">")
		.Write("var iSpeedTime=(tSpeedEnd - tSpeedStart) / 1000;")
		.Write("iKbps = (iSpeedTime>0) ? Math.round(Math.round(100 * 8 / iSpeedTime * 10.5) / 10) : 10000 ;")
		.Write("var iSpeed = (iKbps > 1000) ? Math.round(iKbps/100)/10 + 'M' : iKbps + 'K';")
		.Write("var iSpeedwidth=Math.round(iKbps / 100 * 4);")
		.Write("if(iSpeedwidth<1) iSpeedwidth=1;  else if(iSpeedwidth>350) iSpeedwidth=350;")
		.Write("</script>") & chr(13) & chr(10)
		.Write("<script type=""text/javascript"">")
		.Write("document.write('<div class=""PicBar"" style=""width:' + iSpeedwidth + 'px""></div>');")
		.Write("document.write('<div style=""float:left"">'+iSpeed+'</div>');")
		.Write("</script>") & chr(13) & chr(10)
		.Write("</td><td class=""font_3"">")
		.Write("<script type=""text/javascript"">")
		.Write("document.write(Math.round(iKbps/8*10)/10+ ' k/s');")
		.Write("</script>") & chr(13) & chr(10)
		.Write("<script type=""text/javascript"">")
		.Write("document.getElementById(""txt_speed"").style.display=""none"";")
		.Write("</script>") & chr(13) & chr(10)
		End With
%>
          </td>
        </tr>
        <tr class="hx_tr1"><td colspan="3">建议多测几次，取平均值，这样会比较接近真实值，[<a href="?action=SpeedTest" title="重新测试连接速度">点击重新测试！</a>]</td></tr>
      </table>
	</div>
</div>
<%End Sub%>
<%Sub SystemCheck()%>
<div class="frame_box">
	<h3>系统用户(组)和进程检测</h3>
	<div class="item_content">
  <table cellspacing="1" cellpadding="3" class="table1">
    <tr>
			<th colspan="2">· 如果下面列出了系统用户(组)和进程，则说明系统可能存在安全隐患。</th>
    </tr>
    <tr bgcolor="#EFEFEF">
      <td width="80" align="center">类 型</td><td width="400">名称及详情</td>
    </tr>
<%	dim obj
  	on error resume next
    for each obj in getObject("WinNT://.")
%>
    <tr bgcolor="#FFFFFF">
      <td align="center"><!--<%=obj.path%>-->
<%  if err=438 then Response.Write "系统用户(组)" : else Response.Write "系统进程"%>
      </td>
      <td><%Response.Write obj.Name
	  if not error then Response.Write " (" & obj.displayname & ")<br/>" & obj.path%>
      </td>
    </tr>
<%	err.clear
		next
%>
  </table>
  </div>
</div>
<%
End Sub%>
</body>
</html>