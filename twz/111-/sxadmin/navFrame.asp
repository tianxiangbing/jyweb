<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<title>管理导航区域</title>
</head>
<!--#include file="judge.asp"-->
<script  type="text/javascript">
var preClassName = "man_nav_1";
function list_sub_nav(Id,sortname){
   if(preClassName != ""){
      getObject(preClassName).className="bg_image";
   }
   if(getObject(Id).className == "bg_image"){
      getObject(Id).className="bg_image_onclick";
      preClassName = Id;
	  showInnerText(Id);
	  window.top.frames['leftFrame'].outlookbar.getdefaultnav(sortname);
   }
}

function showInnerText(Id){
    var switchId = parseInt(Id.substring(8));
	var showText = "后台管理";
	switch(switchId){
	    case 1:
		   showText =  "欢迎使用后台管理系统!";
		   break;
	    case 2:
		   showText =  "安全设置";
		   break;
	    case 3:
		   showText =  "";
		   break;		   
	    case 4:
		   showText =  "";
		   break;	
	    case 5:
		   showText =  "";
		   break;		   		   
	}
	getObject('show_text').innerHTML = showText;
}
 //获取对象属性兼容方法
 function getObject(objectId) {
    if(document.getElementById && document.getElementById(objectId)) {
	// W3C DOM
	return document.getElementById(objectId);
    } else if (document.all && document.all(objectId)) {
	// MSIE 4 DOM
	return document.all(objectId);
    } else if (document.layers && document.layers[objectId]) {
	// NN 4 DOM.. note: this won't find nested layers
	return document.layers[objectId];
    } else {
	return false;
    }
}
</script>
<body>
<div id="nav">
  <ul>
	<li id="man_nav_1"   class="bg_image_onclick"><a href="main.asp" target="_top">管理首页</a></li>
	<!--<li id="man_nav_2" onclick="list_sub_nav(id,'安全设置')"  class="bg_image">安全设置</li>
	<li id="man_nav_3" onclick="list_sub_nav(id,'账户管理')"  class="bg_image">账户管理</li>
	<li id="man_nav_4" onclick="list_sub_nav(id,'易货管理')"  class="bg_image">易货管理</li>
	<li id="man_nav_5" onclick="list_sub_nav(id,'广告新闻')"  class="bg_image">广告新闻</li>-->
  </ul>
</div>
<div id="sub_info">&nbsp;&nbsp;<img src="images/hi.gif" />&nbsp;<span id="show_text">欢迎使用后台管理系统!</span></div>
</body>
</html>
