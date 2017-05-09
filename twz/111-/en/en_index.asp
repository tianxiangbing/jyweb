<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>杭州捷曼计算机网络有限公司</title>
<link href="../css/css.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
</head>

<body>
<!--#include file="en_top.asp"-->
<table border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top"><table border="0" align="center" cellpadding="0" cellspacing="0" width="100%"  height="516">
      <tr>
        <td valign="top" class="index_ban">
		  <script language="javascript" type="text/javascript">
            linkarr = new Array();
            picarr = new Array();
            textarr = new Array();
            var swf_width=1423;
            var swf_height=516;
            var files = "../images/b2.jpg|../images/b3.jpg|../images/b1.jpg";
            var links = "|||";
            var texts = "";
            for(i=1;i<picarr.length;i++){
              if(files=="") files = picarr[i];
              else files += "|"+picarr[i];
            }
            for(i=1;i<linkarr.length;i++){
              if(links=="") links = linkarr[i];
              else links += "|"+linkarr[i];
            }
            for(i=1;i<textarr.length;i++){
              if(texts=="") texts = textarr[i];
              else texts += "|"+textarr[i];
            }
            document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
            document.write('<param name="movie" value="../images/indexpic.swf"><param name="quality" value="high">');
            document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
            document.write('<param name="FlashVars" value="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'">');
            document.write('<embed src="../images/indexpic.swf" wmode="opaque" FlashVars="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'& menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object>');
          </script>
          </td>
      </tr>
    </table></td>
  </tr>
</table>
<table width="1002" border="0" align="center" cellpadding="0" cellspacing="0" style="padding-top:12px;">
  <tr>
    <td width="306" align="center" valign="top"><table width="298" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding-bottom:20px;"><table width="298" border="0" cellspacing="0" cellpadding="0" class="table_bottom">
          <tr>
            <td height="33" align="left"><img src="../images/news_title.png" width="124" height="17" /></td>
            <td align="right"><a href="en_news.asp"><img src="../images/more.jpg" /></a></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td valign="top">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <%
set RsPro=conn.execute("select top 8 id,classid,Entitle,isSuggest,content,addtime,newsPic from news order by power desc,id desc")
if not RsPro.eof then 
do while not RsPro.eof
%>
  <tr>
    <td width="17" class="tr_bot"><img src="../images/news_icon.png" alt="" /></td>
    <td width="201" class="tr_bot" height="30"><a href="../news_show.asp?newsid=<% =RsPro("id") %>" title="<% =trim(RsPro("Entitle")) %>">
      <% =GetcutStr(trim(RsPro("Entitle")),25) %>
    </a></td>
    <td width="97" class="tr_bot" align="right">[
      <% =ForMatDatetime(RsPro("addtime"),2) %>
      ]</td>
  </tr>
           <%
RsPro.movenext()
loop
end if
%>
</table>

        </td>
      </tr>
    </table></td>
    <td width="18" align="left" style="padding-left:13px;"><img src="../images/index_22.jpg" width="1" height="217" /></td>
    <td width="408" valign="top"><table width="408" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding-bottom:20px;">
        <table width="402" border="0" cellspacing="0" cellpadding="0" class="table_bottom">
          <tr>
            <td height="33"><img src="../images/about_title.png" width="143" height="18" /></td>
            <td align="right"><a href="en_about.asp"><img src="../images/more.jpg" /></a></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style="line-height:24px; padding:0px 8px;"><img src="../images/index_about.jpg" class="index_about" />
        <p>American Neil Mann (Madsyman ElectronicCo., Ltd.) Was founded in 1989 and headquartered in Santa Clara County, California (South San Francisco), with cabling and development, production, sales and system solutions based on To become a world leader in network infrastructure equipment manufacturers and service providers. The company has 12 plants around the world, mainly in the United States, Finland, Singapore and China. The company has a highly automated production line, logistics, quality, high-tech product...</p></td>
      </tr>
    </table></td>
    <td width="30" align="left" style="padding-left:8px;"><img src="../images/index_22.jpg" width="1" height="217" /></td>
    <td width="240" valign="top"><table width="240" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td style="padding-bottom:20px;"><table class="table_bottom" width="240" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="172" align="left"><img src="../images/contact_title.png" width="140" height="17" /></td>
            <td width="68" height="33" align="right"><a href="en_contact.asp"><img src="../images/more.jpg" /></a></td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td height="220" align="left" valign="top" style="background:url(../images/index_contact.png) right bottom no-repeat;">
        <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="25" colspan="2"><strong><span class="bottom">&nbsp;&nbsp;</span>雷蒙德（中国）运营中心</strong></td>
            </tr>
          <tr>
            <td width="18%" height="25" align="right">地址：</td>
            <td width="82%">浙江省杭州市天苑花园4栋901</td>
          </tr>
          <tr>
            <td height="25" align="right">网址：</td>
            <td>http://www.lemoodelectrons.com&nbsp;</td>
          </tr>
          <tr>
            <td height="25" align="right">电话：</td>
            <td>&nbsp;0571-88923829</td>
          </tr>
          <tr>
            <td height="25" align="right">传真：</td>
            <td>&nbsp;0571-87671105</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>-->
   <!--     <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td height="25" colspan="2"><strong><span class="bottom">&nbsp;&nbsp;</span>雷蒙德（中国）运营中心</strong></td>
        </tr>
        <tr>
            <td width="18%" height="25" align="right">Address：</td>
            <td width="82%">Hangzhou province Zhejiang City Tianyuan Garden 4 901</td>
        </tr>
        <tr>
            <td height="25" align="right">Website：</td>
            <td>http://www.lemoodelectrons.com&nbsp;</td>
        </tr>
        <tr>
            <td height="25" align="right">Tel：</td>
            <td>&nbsp;0571-88923829</td>
        </tr>
        <tr>
            <td height="25" align="right">Fax：</td>
            <td>&nbsp;0571-87671105</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
</table>-->
        <% InFoNum(23) %>
        </td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="en_bottom.asp"-->
<script>
$(function(){
    var win_width = $(window).width();
    var win_hei = $(window).height();
    $("object").find("embed").width(win_width);
    $("object").find("embed").height(win_hei);
    $(".bottom_table").width(win_width);
})
</script>
</body>
</html>
