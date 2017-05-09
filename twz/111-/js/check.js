//JS

function chkLogin()    //登陆校验
{
	if(form1.username.value=="")
	{
		alert("请输入用户名!");
		return false;
	}
	else if(form1.userPwd.value=="")
	{
		alert("请输入密码!");
		return false;
	}
	else if(form1.mofei.value=="")
	{
		alert("请输入验证码!");
		return false;
	}
	else
	return true;
}


function chkLawyerBack()    //回复校验
{
	if(form1.content.value=="")
	{
		alert("请输入回复内容!");
		return false;
	}
	else
	return true;
}

function chkSearch()    //搜索内容校验
{
	if(form3.keywords.value=="")
	{
		alert("请输入搜索内容!");
		return false;
	}
	else
	return true;
}

function chkUser()  //个人用户注册校验
{
	if(form1.username.value=="")
	{
		alert("请输入用户名!");
		form1.username.focus();
		return false;
	}
	if(!/^[\w\-\u4e00-\u9fa5]{4,16}$/.test(form1.username.value))
	{
		alert("用户名为4-16位字母,数字,下划线,汉字!");
		form1.username.focus();
		return false;
	}
	else if(form1.userPwd.value=="")
	{
		alert("请输入密码!");
		return false;
	}
	else if(form1.userPwd2.value=="")
	{
		alert("请输入确认密码!");
		return false;
	}
	else if(form1.userPwd.value!=form1.userPwd2.value)
	{
		alert("两次密码输入不一致!");
		return false;
	}
	else if(form1.realname.value=="")
	{
		alert("请输入真实姓名!");
		return false;
	}
	else if(form1.tel.value=="")
	{
		alert("请输入电话!");
		return false;
	}
	else if(form1.email.value=="")
	{
		alert("请输入邮箱!");
		return false;
	}
	else if(!/^[a-zA-Z0-9_\-\.]{2,20}@\w+(\.\w{2,3}){1,3}$/ig.test(document.form1.email.value))
    {  
        alert('电子邮箱格式不正确！');
        document.form1.email.focus();
        return  false
     }	
	else if(form1.prov.value=="0")
	{
		alert("请选择省份!");
		return false;
	}
	
	return true;
}

function chkUserModify()
{
	if(form1.userPwd.value!=""&&form1.userPwd.value!=form1.userPwd2.value)
	{
		alert("两次密码输入不一致!");
		return false;
	}
	/*else if(form1.realname.value=="")
	{
		alert("请输入真实姓名!");
		return false;
	}*/
	else if(form1.tel.value=="")
	{
		alert("请输入电话!");
		return false;
	}
	else if(form1.email.value=="")
	{
		alert("请输入邮箱!");
		return false;
	}
	else if(!/^[a-zA-Z0-9_\-\.]{2,20}@\w+(\.\w{2,3}){1,3}$/ig.test(document.form1.email.value))
      {  
            alert('电子邮箱格式不正确！');
            document.form1.email.focus();
            return  false
        }
	else	
		return true;
}


function chkmessage() //校验留言
{
	if(form2.CName.value=="")
	{
		alert("请输入姓名!");
		return false;
	}
	else if(form2.email.value=="")
	{
		alert("请输入邮箱!");
		return false;
	}
	else if(!/^[a-zA-Z0-9_\-\.]{2,20}@\w+(\.\w{2,3}){1,3}$/ig.test(document.form1.email.value))
      {  
            alert('电子邮箱格式不正确！');
            document.form2.email.focus();
            return  false
        }
else if(form2.content.value=="")
	{
		alert("请输入留言内容!");
		return false;
	}
	else	
		return true;
}

function chkGetPwd() //校验取回密码
{
	if(form1.username.value=="")
	{
		alert("请输入用户名!");
		return false;
	}
	else if(form1.email.value=="")
	{
		alert("请输入邮箱!");
		return false;
	}
	else if(!/^[a-zA-Z0-9_\-\.]{2,20}@\w+(\.\w{2,3}){1,3}$/ig.test(document.form1.email.value))
      {  
            alert('电子邮箱格式不正确！');
            document.form1.email.focus();
            return  false
        }
	else	
		return true;
}


function DrawImage(ImgD,FitWidth,FitHeight)
{ 
    var image=new Image();   
	image.src=ImgD.src;  
	if(image.width>0 && image.height>0)
	{ 
		if(image.width/image.height>= FitWidth/FitHeight)
		{   
			if(image.width>FitWidth)
			{     
				ImgD.width=FitWidth;     
				ImgD.height=(image.height*FitWidth)/image.width;    
			}
			else
			{
				ImgD.width=image.width;
				ImgD.height=image.height; 
			} 
		}
		else
		{
		 if(image.height>FitHeight)
		 { 
		   ImgD.height=FitHeight; 
		   ImgD.width=(image.width*FitHeight)/image.height;
		  }
		  else
		  {
		    ImgD.width=image.width;
			ImgD.height=image.height; 
		  } 
	   } 
	} 
}