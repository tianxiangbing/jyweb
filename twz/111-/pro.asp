

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>杭州捷曼计算机网络有限公司</title>
<link href="css/css.css" rel="stylesheet" type="text/css" />
</head>

<body>
<!--#include file="top.asp"-->
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td>
    <img src="images/109.jpg" width="100%" height="300" /></td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="margin-top:13px;">
  <tr>
    <td width="210" valign="top">
    <!--#include file="left2.asp"-->
    </td>
    <td width="15"></td>
    <td valign="top">
<%
classid = GetSafeInt(request.QueryString("classid"),0)  '得到类别的ID
classid2 = GetSafeInt(request.QueryString("classid2"),0)  '得到类别的ID
'set rsclass=conn.execute("select * from proClass where ClassId="&classid&"")

if classid<>0 then 
	set RsC=conn.execute("select * from proClass where classid="&classid&"")
end if 

if classid2<>0 then 
	set RsC=conn.execute("select * from proClass where classid="&classid2&"")
	set RsC2=conn.execute("select * from proClass where classid="&RsC("classpid")&"")
end if 
%>	
    <table width="778" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td><table width="778" border="0" cellpadding="0" cellspacing="0" class="table_bottom2">
          <tr>
           <td width="123" class="t_left">产品中心</td>
            <td align="right" class="t_right">您所在的位置： 首页 > 产品中心
			<% IF classid<>0 THEN  %> > <% =RsC("classname") %><% end  if  %>
            <% if classid2<>0 then  %> > <% =trim(RsC2("classname")) %> > <% =trim(RsC("classname")) %><% end if %>

             </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td align="left" valign="top" style="padding-top:10px; padding-bottom:30px;">
        <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
          <tr>
    <%
set rs=conn.execute("select * from proClass  where ClassPId="&classid&" order by power desc,classid desc")
if not rs.eof then 
 j=0  '换行
do while not rs.eof
%>
            <td height="30" align="left" valign="top"><table width="30%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" valign="middle" class="pro_type_img">
                <img src="<% =trim(rs("proPic")) %>" />
                <p class="pro_type_name"><% =trim(rs("ClassName")) %></p>
                </td>
              </tr>
              <tr>
                <td>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <Td width="8%" height="10">&nbsp;</Td>
                  <Td width="92%">&nbsp;</Td>
                </tr>
                                         <%
set RsPro=conn.execute("select top 4  * from products where classid="&rs("ClassId")&" order by power desc,id desc")
if not RsPro.eof then 
do while not RsPro.eof
%>
                  <tr>

                    <td height="20">&nbsp;</td>
                    <td><a href="pro_info.asp?ProId=<% =RsPro("id") %>&classid=<% =classid %>">
                      <% =trim(RsPro("proname")) %>
                    </a></td>

                  </tr>
                                             <%
RsPro.movenext()
loop
end if
%>	 <tr>
                                               <Td height="10">&nbsp;</Td>
                                               <Td>&nbsp;</Td>
                                             </tr>
                </table>
                
                </td>
              </tr>
            </table></td>
<%
j=j+1
if j mod 3=0 then response.Write("</tr><tr>") 
rs.movenext()
loop
end if 
rs.close:set rs=nothing
%>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="bottom.asp"-->
</body>
</html>
