<table align="center" border="0" width="100%" cellpadding="0" cellspacing="0" style="background:#e9eaeb; height:93px;margin-top:10px;"><!--bgcolor="#1255ab"-->
  <tr>
    <td><table width="1423" class="bottom_table" border="0" align="center" cellpadding="0" cellspacing="0" style="line-height:30px; color:#333;">
  <tr>
    <td align="center" class="bottom">
    <!--LEMOOD(雷蒙德)中国区运营中心 版权所有&nbsp;&nbsp;&nbsp;地址：浙江省杭州市天苑花园4栋901F&nbsp;&nbsp;&nbsp;服务热线：0571-88923829-->
    <!--<p>Copyright 2015-2020  LEMOOD (Raymond) China Operations Center All Rights Reserved.</p>
 	<p>E-mail：171465661@qq.com Address：Hangzhou Tian Yuan Garden 4 901F</p>
    <p>Tel：0571-88923829  Fax：0571-88923829</p>-->
    <% InFoNum(25) %>
    </td>
  </tr>
</table>
<!--<div id="QQFloat" style="Z-INDEX:100000;right:1px;padding-top:200px;VISIBILITY:visible;WIDTH:107px;POSITION:absolute;TOP:100px;HEIGHT:100px;">
<div id="QQFloat" style="Z-INDEX:20;LEFT:895px;VISIBILITY:visible;WIDTH:106px;POSITION:absolute;TOP:300px;HEIGHT:300px;"-->
<!--<table border="0" width="107" cellspacing="0" cellpadding="0" style="font-size:13px;">
<tr>
		<td valign="middle" width="107" height="61" background="qq/kefu_up.gif"></td>
	</tr>
	<tr>
		<td height="5" background="qq/kefu_middle.gif" ></td>
	</tr>
	<tr>
		<td valign="middle"  background="qq/kefu_middle.gif" height="25">
<table  border="0" cellspacing="0" cellpadding="2" style="margin-left:10px;">
  <tr>
    <td width="25" align="right" style="padding-right:3px;"><a  href="tencent://message/?uin=359330723&amp;Site=zskenbo.cn&amp;Menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=1:359330723:4" alt="销售客服1" /></a></td>
    <td><a  href="tencent://message/?uin=359330723&amp;Site=zskenbo.cn&amp;Menu=yes"><span class="qq">在线客服</span></a></td>
  </tr>
  
</table>      </td>
	</tr>
	<tr>
		<td height="2" background="qq/kefu_middle.gif" ></td>
	</tr>
	<tr>
		<td background="qq/kefu_middle.gif"></td>
	</tr>
	<tr>
		<td background="qq/kefu_down.gif" width="107" height="28"></td>
	</tr>
</table>
</div>-->
<script src="../js/jquery-1.9.1.min.js" type="text/javascript"></script>
<script>
$(function(){
    var win_width = $(window).width();
    var win_hei = $(window).height();
    $(".index_ban").find("object").find("embed").width(win_width);
    $(".index_ban").find("object").find("embed").height(win_hei);
    $(".bottom_table").width(win_width);
})
</script>
<script type="text/javascript">
//<![CDATA[
var tips; var theTop = 65/*这是默认高度,越大越往下*/; var old = theTop;
function initFloatTips() {
  tips = document.getElementById('QQFloat');
  moveTips();
};
function moveTips() {
  var tt=30;
  if (window.innerHeight) {
    pos = window.pageYOffset
  }
  else if (document.documentElement && document.documentElement.scrollTop) {
    pos = document.documentElement.scrollTop
  }
  else if (document.body) {
    pos = document.body.scrollTop;
  }
  pos=pos-tips.offsetTop+theTop;
  pos=tips.offsetTop+pos/10;
 
  if (pos < theTop) pos = theTop;
  if (pos != old) {
    tips.style.top = pos+"px";
    tt=10;
  //alert(tips.style.top);
  }
 
  old = pos;
  setTimeout(moveTips,tt);
}

initFloatTips();
</script></td>
  </tr>
</table>