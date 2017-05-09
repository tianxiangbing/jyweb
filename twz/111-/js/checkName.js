// JavaScript Document


function checkName(username)
{
	if(username.length<2)
	{      
    	document.getElementById("showArea").innerHTML ="<span class=red>用户名不得少于2个字符</span>";
    	return false;
    }	
	if(!/^([\u4e00-\u9fa5]|[A-Za-z0-9_])*$/.test(username))
	{
		document.getElementById("showArea").innerHTML ="<span class=red>用户名应为字母、数字、中文或下划线</span>";							 
	    return false; 
	}

	loadXMLDoc("../checkreguser.asp?username="+username);

}

var xmlhttp;
function loadXMLDoc(url)
{
	xmlhttp=null;
	if (window.XMLHttpRequest)
	{// code for all new browsers
	  xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE5 and IE6
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp!=null)
	{
	  xmlhttp.onreadystatechange=state_Change;
	  xmlhttp.open("GET",url,true);  
	  //初始化 HTTP 请求参数， METHOD,URL 和 HTTP 方法，但是并不发送请求。
	  //第三个参数规定请求是否异步处理  True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。
	  xmlhttp.send(null);//发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
	  
	  //xmlhttp.open("post",url,true);   //POST提交数据
	  //xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//向一个打开但未发送的请求设置或添加一个 HTTP 请求。
	  //xmlhttp.send("username="+username);
	}
	else
	{
	  alert("Your browser does not support XMLHTTP.");
	}
}

function state_Change()
{
if (xmlhttp.readyState==4)
  {// 4 = "loaded"
  if (xmlhttp.status==200)
    {// 200 = OK
    // ...our code here...
	//alert(xmlhttp.responseText);
    }
  else
    {
    alert("Problem retrieving XML data");
    }
  }
}

function state_Change()
{
	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
	//alert(xmlhttp.status);
	  if (xmlhttp.status==200)
		{// 200 = OK
		// ...our code here...
			result = xmlhttp.responseText; 
			//alert(result);
			if(parseInt(result)==0)
			{
			   //  document.getElementById("showArea").style.display='';
			   
				document.getElementById("showArea").innerHTML ="<span style='color:green'>恭喜,此用户名可以注册!</span>";
				//document.getElementById("chk").value="0";
			}
			else if(parseInt(result)>0)
			{
			   //  document.getElementById("showArea").style.display='';
				document.getElementById("showArea").innerHTML ="<span style='color:red'>遗憾,此用户名已被注册,请更换一个!</span>";
				//document.getElementById("chk").value="1";
			 }
		}
		else
	   {	
		 document.getElementById("showArea").innerHTML = "<img src='images/loading.gif' border='0'>正在检验用户名是否可用……";   
	   }
	}
	else
	{
		 //alert("Problem retrieving XML data");
		 document.getElementById("showArea").innerHTML = "<img src='images/loading.gif' border='0'>正在检验用户名是否可用……";   
	}	
}
