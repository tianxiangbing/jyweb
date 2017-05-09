<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="杭州兼职建站,杭州做网站,杭州兼职做网站,应城人,建站|免费建站|开设网页|企业网站|门户网站|ASP动网|.net|ASP|图片|电脑|计算机|浙江建站|杭州建站服务|应城人在杭州|应城人工作室|个人博客" />
<meta name="description" content="杭州兼职建站网是专门为个人、中小型企业等提供建站服务的平台,杭州建网站就找杭州兼职建站网。功能全面，价格优惠，服务周到，绝对是您值得放心的选择。便宜的不一定是就差，我们拥有年轻优秀的团队，绝对给予您满意的服务和优质的产品。邮箱:yoooyeeey@163.com" />
<meta name="author" content="杭州兼职建站：田想兵">
<META NAME="COPYRIGHT" CONTENT="杭州兼职建站">
<title>杭州兼职建站网|杭州兼职做网站|兼职网站-最便宜的兼职网络服务</title>
<link href="theam/gray/tb.css" rel="stylesheet" type="text/css" disabled="disabled"  title="gray"/>
<link href="theam/blue/tb.css" rel="stylesheet" type="text/css"title="blue"/>

<script language="javascript" type="text/javascript" src="script/index.js"></script>
<style type="text/css">
.tdmoney {
	background-image: url(images/bjb.gif);background-repeat:no-repeat;
	height:100px;
	width:185px;
	padding-top: 30px;
	text-indent: 5px;
}
    </style>
</head>

<body>
<!--#include file="top.htm"-->
<%
 server_name=Request.ServerVariables("Server_Name")
 if server_name="hz.yingchengshi.cn" then
 %>
 <div style="width:200px;">
 <marquee height="0"><a href="http://lovewebgames.com" target="_blank">兼职建站</a><a href="http://lovewebgames.com" target="_blank">兼职做网站</a><a href="http://lovewebgames.com" target="_blank">杭州做网站</a><a href="http://lovewebgames.com" target="_blank">兼职网站设计</a><a href="http://lovewebgames.com" target="_blank">网站兼职</a><a href="http://lovewebgames.com" target="_blank">杭州网站兼职</a></marquee>
 </div>
 <%else
 %>
 <div style="width:200px;">
 <marquee height="0"><a href="http://lovewebgames.com" target="_blank">兼职建站</a><a href="http://lovewebgames.com" target="_blank">兼职做网站</a><a href="http://lovewebgames.com" target="_blank">杭州做网站</a><a href="http://lovewebgames.com" target="_blank">兼职网站设计</a><a href="http://lovewebgames.com" target="_blank">网站兼职</a><a href="http://lovewebgames.com" target="_blank">杭州网站兼职</a><a href="http://lovewebgames.com/jianren.asp?keyword=贱人" target="_blank">贱人</a></marquee>
 </div>
 <%
 	end if
 %>
	<!--#include file="menu.htm"-->
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="85"><table width="100%">
      <tr>
        <td width="200px" height="100%" valign="top"><!--#include file="left.asp"--></td>
        <td  class="sx"><div id="editContent">
            <div class="tb" >
              <table class="tb" >
                <tr>
                  <td colspan="4"><span class="STYLE4">产品类型</span>
                      <hr class="hr1"/></td>
                </tr>
                <tr class="tb">
                  <td><img src="images/qywz.gif" alt="企业网站" height="135px" onmouseover="showInfo('qyimg');" id="qyimg" /></td>
                  <td><img src="images/mhwz.gif" alt="门户网站"  onmouseover="showInfo('mhimg');" height="135px"/></td>
                  <td><img src="images/grwy.gif" alt="个人博客"   onmouseover="showInfo('bkimg');" height="135px"/></td>
                  <td><img src="images/zywz.gif"  onmouseover="showInfo('zyimg');" alt="专业网站"  height="135px"/></td>
                </tr>
                <tr class="tb">
                  <td align="center"><div id="jt1"><img src="images/jt_1.gif" height="100px"  onload="showInfo('qyimg');"/></div></td>
                  <td align="center"><div id="jt2"></div></td>
                  <td align="center"><div id="jt3"></div></td>
                  <td align="center"><div id="jt4"></div></td>
                </tr>
                <tr>
                  <td colspan="4"><div id="content" style="height:60px;"><P>&nbsp;&nbsp;&nbsp;&nbsp;智能建站已经成为企业网站建设的主要方式，建立个性化企业网站是企业品牌形象的体现；具有强大灵活的网站功能、HTML生成、搜索引擎优化和个性化模版定制，现有简体、繁体、英文三种语言可选用。赶快申请，立即拥有个性化企业网站...</P></div></td>
                </tr>
              </table>
            </div>
          <div class="STYLE4"> 案例展示
            <hr class="hr1"/>
            </div>
          <div class="style12">
              <marquee direction="left" onmouseover="stop();" onmouseout="start();">
            
			    <table border="0" cellpadding="0" cellspacing="0">
			      <tr>
				  <!--循环出所有的展示网站-->
			  <%
			  sql="select ProId,ProName,ProPic,Addtime,Power,ProClass,ProLink,ProSmallPic  from Products where ReCycle=false and IsSuggest=true "
			  set rs=conn.execute(sql)
			  do while not rs.eof
			  %>
				<td>
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" valign="middle">
				  <a href="particular.asp?id=<%=rs("ProId")%>" target="_blank">
				  <img src="<%=rs("ProSmallPic")%>" alt="<%=trim(rs("ProName"))%>" title="<%=trim(rs("ProName"))%>" longdesc="<%=rs("ProLink")%>" height="100px" width="120px" /></a></td>
                </tr>
                <tr>
                  <td align="center"><a href="particular.asp?id=<%=rs("ProId")%>" target="_blank" ><%=trim(rs("ProName"))%></a></td>
                </tr>
              </table></td>
			   <%
			  rs.movenext()
			  loop
			  %>
			  </tr></table>
                </marquee>
            </div>
          <div class="STYLE4">服务收费信息
            <hr class="hr1"/>
            </div>
          <div>
		    <%
		  sql3="select ProClassId,ProClassName,ProClassPId,Power,Price from ProClass where ProClassPId=0 order by power asc"
		  set classPro=conn.execute(sql3)
		  do while not classPro.eof
		  %>
		 <span style="float:left;">
		    <table  style="height:200px;width:175px;" border="0" cellpadding="0" cellspacing="0" align="left">
                <tr>
                  <td ><strong><%=trim(classPro("ProClassName"))%></strong></td>
                  </tr>
                <tr>
                  <td class="tdmoney"><p><%=trim(classPro("ProClassName"))%> </p>
                      <p>&nbsp;</p>
                    <p class="STYLE13">价格：<%=classPro("Price")%></p>
                    <div align="center"><a href="contact.asp" target="_blank"><img src="images/qq.gif" width="34" height="15" /></a></div></td>
                  </tr>
                <tr>
                  <td><hr /></td>
                  </tr>
              </table>		  
		 </span>		
		    <%
			  classPro.movenext()
			  loop
			  classPro.close
			  %>	
          </div>
        </div></td>
      </tr>
    </table></td>
  </tr>
</table>
<div style="margin:0 auto; width:970px;height:45px;border:1px solid #f5f5f5;padding:5px;">
<strong>友情链接:</strong>
<a href="http://www.lovewebgames.com" target="_blank">爱上网页游戏</a>

</div>
<!--#include file="bottom.htm"-->
</body>
</html>
