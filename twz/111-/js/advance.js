// JavaScript Document



// 1. initialize XMLDOM

// eg .A
//xmlDoc=loadXMLDoc("/example/xdom/books.xml");
function loadXMLDoc(dname) 
{
	var xmlDoc;
	// code for IE
	if (window.ActiveXObject)
	  {
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  }
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	  {
	  xmlDoc=document.implementation.createDocument("","",null);
	  }
	else
	  {
	  alert('Your browser cannot handle this script');
	  }
	xmlDoc.async=false;
	xmlDoc.load(dname);
	return(xmlDoc);
}

//eg .B
try //Internet Explorer
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async="false";
  xmlDoc.loadXML(text);
  }  
catch(e)
  {
  try // Firefox, Mozilla, Opera, etc.
    {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(text,"text/xml");
    }
  catch(e)
    {
    alert(e.message);
    return;
    }
  }


// 2. initialize xmlhttp

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

