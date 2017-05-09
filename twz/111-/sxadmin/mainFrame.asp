<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<title>管理区域</title>
</head>
<body>
<!--#include file="judge.asp"-->
<div id="container">
<% '**************************************************
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
End Function %>
  <table width="97%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <tr>
      <td colspan="2" align="center" class="table_title">服务器信息统计</td>
    </tr>
    <tr>
      <td width="45%" align="left" >服务器：<%= Request.ServerVariables("SERVER_NAME") %>(IP:<%=Request.ServerVariables("LOCAL_ADDR")%>) 端口:
	  <%=Request.ServerVariables("SERVER_PORT")%></td>
      <td width="55%">脚本解释引擎：
      <% =ScriptEngine & "/"& ScriptEngineMajorVersion &"."&ScriptEngineMinorVersion&"."& ScriptEngineBuildVersion %></td>
    </tr>
    <tr>
      <td>站点物理路径：<% =request.ServerVariables("APPL_PHYSICAL_PATH") %></td>
      <td>FSO文本读写：
          <% if not IsObjInstalled("Scripting.FileSystemObject") then %>
            <font color="#FF0000"><b>×</b></font>
            <% else %>
            <font color="009a00"><b>√</b></font>
            <% end if %>   </td>
    </tr>
    <tr>
      <td>IIS版本： <%=Request.ServerVariables("SERVER_SOFTWARE")%></td>
      <td>Jmail组件支持：
          <% if not isobjinstalled("JMail.SMTPMail") then %>
            <font color="#FF0000"><b>×</b></font>
            <% else %>
            <font color="009a00"><b>√</b></font>
            <% end if %></td>
    </tr>
    <tr>
      <td>Persits.Jpeg (ASPJpeg)：<% if not IsObjInstalled("Persits.Jpeg") then %>
            <font color="#FF0000"><b>×</b></font>
            <% else %>
            <font color="009a00"><b>√</b></font>
            <% end if %>  </td>
      <td>&nbsp;</td>
    </tr>
	<tr>
      <td class="left_title_2">&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td colspan="2" align="center" class="table_title">相关说明</td>
    </tr>
    <tr>
      <td colspan="2">1.我们在各个管理界面为您提供了引导性的提示，根据这些提示您可以方便地进行网站内容的添加、发布、修改、排序、删除等等。相信您很快就会发现管理网站原来如此简单。</td>
    </tr>
    <tr>
      <td colspan="2"> 2.开发工具：WINDOWS2003 IIS + Microsoft Access 2003 + SQLserver2000</td>
    </tr>
    
    <tr>
      <td colspan="2" class="left_title_2">&nbsp;</td>
    </tr>
    <tr bgcolor="#FFFFFF">
      <td class="left_title_2">&nbsp;</td>
      <td><a href="serverInfo.asp">点此查看更详细的服务器信息>>></a></td>
    </tr>
  </table>
</div>
</body>
</html>
