<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="杭州个人建站工作室|应城人工作室|建站|免费建站|开设网页|免费域名|免费空间|企业网站|门户网站|源码下载|HTML|ASP动网|.net|ASP|图片|电脑|计算机|浙江建站|杭州建站服务|应城人在杭州|应城人工作室|个人博客" />
<meta name="description" content="杭州私人网络建站工作室是专门为个人、中小型企业等提供建站服务的平台。功能全面，价格优惠，服务周到，绝对是您值得放心的选择。便宜的不一定是就差，我们拥有年轻优秀的团队，绝对给予您满意的服务和优质的产品。邮箱:yoooyeeey@163.com" />
<title>会员注册-应城人工作室,杭州企业建站,杭州自助建站,杭州便宜网站 |杭州兼职建站网|杭州兼职做网站|兼职网站-最便宜的兼职网络服务|应城人在外地</title>
<link href="theam/gray/tb.css" rel="stylesheet" type="text/css" disabled="disabled"  title="gray"/>
<link href="theam/blue/tb.css" rel="stylesheet" type="text/css"title="blue"/>
<script language="javascript" type="text/javascript" src="script/index.js"></script>
<script language="javascript" type="text/javascript" src="script/jquery.js"></script>
<script language="javascript">
var t1=false;
var t2=false;
var t3=false;
var t4=false;
var t5=false;
	
//判断用户名
function checkuname()
{
    var t=document.getElementById("username");
	var f=/^[a-zA-Z0-9_]{5,16}$/;
	var e=document.getElementById("infoname");
	if(t.value==""||t.value==null)
	{
		e.innerHTML="<font color='blue'> 用户名不能为空!</font>";
		t.focus();
		t1=false;
		return false;
	}
	else
	{
	 	if(f.test(t.value))
	   	{
		    var url="checkUserName.asp?rnd="+Math.random(10000);
			$.get(url,{"uname":$("#username").val()},function(xml){
				if(xml==1){
					e.innerHTML="<font color='blue'> 可以使用!</font>";
					t1=true; 
					return true;
				}else
				{
					t1=false;
					e.innerHTML="<font color='blue'> 用户名已经存在!</font>";
					return false;
				}
			})		
			
			return true;
		}
		else
		{
			 e.innerHTML="<font color='blue'> 用户名必须大于5个字符小于16个字符</font>";
			 t.focus();
			 t1=false;
			 return false;
		}
	}	
}
function checkpwd1()
{
	if(!$("#pwd1").val()||$("#pwd1").val().length<6||$("#pwd1").val().length>16){
		$("#pwd1info").html("<font color='blue'>为了您的信息安全,请填写6-16位长度的密码!</font>");
		t2=false;
		return false;
	}else
	{
		$("#pwd1info").html("√");
		t2=true;
		return true;
	}
}
function checkpwd2()
{
	if($("#pwd1").val()!=$("#pwd2").val()){
		$("#pwd2info").html("<font color='blue'>两次输入不一致!</font>");
		t3=false;
		return false;
	}else
	{
		$("#pwd2info").html("√");
		t3=true;
		return true;
	}
}
 function checkEmail()
 {
	var vEmail=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	var email=$("#email").val();
	if(!vEmail.test(email))
	{
		$("#sm").css("color","blue");
		document.getElementById("sm").innerHTML="<font color='blue'>邮箱格式不正确!</font>";  
		t4=false;      
		return false;
	}else
	{    
		document.getElementById("sm").innerHTML='√';
		t4=true;
		return true;    
	}
 }
function checkQQ(){
	if(!$("#qq").val())
	{
		$("#qqinfo").html("<font color='blue'>不能为空!</font>");
		t5=false;
		return false;
	}else
	{
		t5=true;
		$("#qqinfo").html("√");
		return true;
	}
}
function checkall()
{	alert(checkuname()+"-"+checkpwd1()+"-"+checkpwd2()+"-"+checkEmail()+"-"+checkQQ())
	if(checkuname()&&checkpwd1()&&checkpwd2()&&checkEmail()&&checkQQ()){
		return true;
	}else
	{		
		alert('请将资料填写完整!');
		return false;
	}
}
</script>
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
<!--#include file="menu.htm"-->
<table width="90%" height="234" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="85"><table width="100%">
      <tr>
        <td width="200px" height="100%" valign="top"><!--#include file="left.asp"--></td>
        <td  class="sx">
		<div id="editContent">
          <div>                <form id="form1" name="form1" method="post" action="execute.asp?action=add" onsubmit="return checkall();" >
			  <table width="100%" height="200" border="0" cellpadding="0" cellspacing="0">

                  <tr>
                    <td height="25" colspan="2">注：<span class="font6">*</span>为必填项</td>
                    <td width="20%" align="right">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="18%" height="24" align="center">
                      会员名称：</td>
                    <td colspan="2"><input name="username" type="text" id="username" onblur="checkuname();"/><span id="infoname">*
                      5-16个字符(包括小写字母、数字、下划线)！</span></td>
                  </tr>
                  <tr>
                    <td height="26" align="center">会员密码：</td>
                    <td height="25" colspan="2">
                      <input name="pwd1" type="password" id="pwd1" onblur="checkpwd1();"/>
                      <span class="font6" id="pwd1info">*</span>
					  </td>
				  </tr> 
                  <tr>
                    <td height="26" align="center">重复密码：</td>
                    <td height="25" colspan="2">
                      <input name="pwd2" type="password" id="pwd2" onblur="checkpwd2();" onchange="checkpwd2();"/>
                      <span class="font6" id="pwd2info">*</span></td>
					</tr> 
                  <tr>
                    <td height="25" align="center">真实姓名：</td>
                    <td colspan="2"><input name="userrel" type="text" id="userrel" /></td>
                  </tr>
                  <tr>
                    <td height="25" align="center">电子邮箱：</td>
                    <td colspan="2"><input name="email" type="text" id="email" onblur="checkEmail()"/>
                      <span  id="sm">* xxx@xxx.xxx</span></td>
                  </tr>
                  <tr>
                    <td height="25" align="center">QQ/MSN：</td>
                    <td colspan="2">
                      <input name="qq" type="text" id="qq" onblur="checkQQ()"/> <span id="qqinfo">
                        *</span></td>
                  </tr>
                  <tr>
                    <td height="25" align="center">移动电话：</td>
                    <td colspan="2"><span class="font6" id="email">
                      <input name="mobile" type="text" id="mobile" size="15"/>
                        </span></td>
                  </tr>
                  <tr>
                    <td height="25">&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                  </tr>
                  <tr>
                    <td height="25">&nbsp;</td>
                    <td colspan="2">
					<input type="submit" name="tijiao" id="tijiao" value="注册确认" /> 
                    <input type="reset" name="button2" id="button2" value="重新填写" /></td>
                  </tr>
              </table></form>
		      </div>
        </div></td>
      </tr>
    </table></td>
  </tr>
</table>
<!--#include file="bottom.htm"-->
</body>
</html>
