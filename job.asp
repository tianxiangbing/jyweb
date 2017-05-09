<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/main.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="杭州个人建站工作室|应城人工作室|建站|免费建站|开设网页|免费域名|免费空间|企业网站|门户网站|源码下载|HTML|ASP动网|.net|ASP|图片|电脑|计算机|浙江建站|杭州建站服务|应城人在杭州|应城人工作室|个人博客" />
<meta name="description" content="杭州私人网络建站工作室是专门为个人、中小型企业等提供建站服务的平台。功能全面，价格优惠，服务周到，绝对是您值得放心的选择。便宜的不一定是就差，我们拥有年轻优秀的团队，绝对给予您满意的服务和优质的产品。邮箱:yoooyeeey@163.com" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>杭州九头鸟工作室  |杭州网站建设|杭州网站开发</title>
<!-- InstanceEndEditable -->

<link href="theam/gray/tb.css" rel="stylesheet" type="text/css" title="gray"/>
<link href="theam/blue/tb.css" rel="stylesheet" type="text/css" disabled="disabled" title="blue"/>

<script language="javascript" type="text/javascript" src="script/index.js">

</script>
<!-- InstanceBeginEditable name="head" --><!-- InstanceEndEditable -->
</head>

<body >
<div class="divcss">
<!--#include file="Top.htm"-->
</div>
<!--#include file="menu.htm"-->
<div class="divcss">
  <table width="100%">
  <tr><td width="200px" height="100%" valign="top">
<!--#include file="left.asp"--></td>
  <td valign="top"  class="sx"><div id="editContent"><!-- InstanceBeginEditable name="EditContent" -->
  以下内容均来源于51job.com<br/>
<!--#include file="inc/conn.asp"-->
<%
sql="select distinct 公司名称, * from job order by 编号 desc "
set rs=server.CreateObject("ADODB.recordset")
rs.open sql,conn,1,1
while not rs.eof
response.Write(rs("公司名称")&"-----"&rs("职位名称")&"------"&rs("发布日期")&"<br/>")
%>
<%
response.Write("联系人:"&rs("联系人")&"电话:"&rs("电话")&"移动电话:"&rs("移动电话")&"电子邮箱:"&rs("电子邮箱")&"公司网站:"&rs("公司网站")&"传真:"&rs("传真")&"<hr/>")
rs.movenext
wend

rs.close:set rs=nothing
%>
  <script type="text/javascript"><!--
google_ad_client = "pub-5582667370460391";
/* 234x60, 创建于 08-7-29 */
google_ad_slot = "0734503347";
google_ad_width = 234;
google_ad_height = 60;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
<script type="text/javascript"><!--
google_ad_client = "pub-5582667370460391";
/* 120x90, 创建于 08-8-6 */
google_ad_slot = "6133072211";
google_ad_width = 120;
google_ad_height = 90;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
  
  <!-- InstanceEndEditable --></div></td>
</tr></table>
</div>

<!--#include file="bottom.htm"-->
</body>
<!-- InstanceEnd --></html>
