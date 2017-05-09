<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>杭州兼职建站网|杭州兼职做网站|兼职网站-最便宜的兼职网络服务</title>
<meta name="keywords" content="杭州个人建站工作室|应城人工作室|建站|免费建站|开设网页|免费域名|免费空间|企业网站|门户网站|源码下载|HTML|ASP动网|.net|ASP|图片|电脑|计算机|浙江建站|杭州建站服务|应城人在杭州|应城人工作室|个人博客" />
<meta name="description" content="杭州私人网络建站工作室是专门为个人、中小型企业等提供建站服务的平台。功能全面，价格优惠，服务周到，绝对是您值得放心的选择。便宜的不一定是就差，我们拥有年轻优秀的团队，绝对给予您满意的服务和优质的产品。邮箱:yoooyeeey@163.com" />
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
 <marquee height="0"><a href="http://www.yingchengshi.cn" target="_blank">兼职建站</a><a href="http://www.yingchengshi.cn" target="_blank">兼职做网站</a><a href="http://www.yingchengshi.cn" target="_blank">杭州做网站</a><a href="http://www.yingchengshi.cn" target="_blank">兼职网站设计</a><a href="http://www.yingchengshi.cn" target="_blank">网站兼职</a><a href="http://www.yingchengshi.cn" target="_blank">杭州网站兼职</a></marquee>
 </div>
 <%else
 %>
 <div style="width:200px;">
 <marquee height="0"><a href="http://hz.yingchengshi.cn" target="_blank">兼职建站</a><a href="http://hz.yingchengshi.cn" target="_blank">兼职做网站</a><a href="http://hz.yingchengshi.cn" target="_blank">杭州做网站</a><a href="http://hz.yingchengshi.cn" target="_blank">兼职网站设计</a><a href="http://hz.yingchengshi.cn" target="_blank">网站兼职</a><a href="http://hz.yingchengshi.cn" target="_blank">杭州网站兼职</a></marquee>
 </div>
 <%
 	end if
 %>
<!--#include file="menu.htm"-->
<table width="90%" height="234" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="85"><table width="100%">
      <tr>
        <td width="200px" height="100%" valign="top"><!--#include file="left.asp"-->
        </td>
        <td align="center" valign="top"  class="sx"><div id="editContent">
            <div class="tb" ></div>
			<h2>您现在的位置:<a href="http://hz.yingchengshi.cn" target="_blank">应城人工作室</a>&gt;门户网站</h2>
			<hr class="solidhr" />
			<table width="98%" height="146" border="0" cellpadding="0" cellspacing="0">
              <tr>
			  <!--循环出所有的企业网站-->
			  	  <!--循环出所有的展示网站-->
			  <%
			  sql="select ProId,ProName,ProPic,Addtime,Power,ProClass  from Products where ReCycle=false and ProClass in(69,75)"
			  set rs=conn.execute(sql)
			  do while not rs.eof
			  %>
                <td align="left" valign="top">
				<table class="proall" width="183" height="201" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td height="112" align="center" valign="middle"><a href="particular.asp?id=<%=rs("ProId")%>"><img src="<%=rs("ProPic")%>" width="150" alt="<%=trim(rs("ProName"))%>" height="150" border="0"/></a></td>
                  </tr>
                  <tr>
                    <td height="26" align="center" valign="middle"><a href="particular.asp?id=<%=rs("ProId")%>">
					<%=left(trim(rs("ProName")),10)%>
					<%if len(trim(rs("ProName")))>10 then response.write "..."%></a></td>
                  </tr>
                </table>
				</td>
			  <%
			  rs.movenext()
			  loop
			  %>
				<!--结束-->
              </tr>
            </table>
			<div class="STYLE4"></div>
          <div></div>
        </div></td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="bottom.htm"-->
</body>
</html>
