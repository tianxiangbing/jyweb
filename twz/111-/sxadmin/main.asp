<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<link rel="stylesheet" href="css/common.css" type="text/css" />
<title>后台管理系统</title>
</head>
<!--#include file="judge.asp"-->
<frameset rows="58px,*,25px" cols="*" frameborder="0"   border="0" framespacing="0" >
  <frame src="topFrame.asp" name="topFrame"  id="topFrame" frameborder="no" scrolling="No" noresize="noresize"/><!--顶部-->
    
  <!--中间部份-->
  <frameset  id="middleFrame" cols="199,7,*" frameborder="no" border="0" framespacing="0">
    <frame src="leftFrame.asp" name="leftFrame"  frameborder="0" scrolling="auto" noresize="noresize" /><!--中间（左）-->
	<frame src="switchFrame.html" name="midFrame"  id="midFrame" frameborder="0" scrolling="No" noresize="noresize"  /><!--中间（中）-->
    <frameset rows="59,*" cols="*"  frameborder="0" border="0" framespacing="0" >
    	<frame src="navFrame.asp" name="navFrame" id="navFrame" frameborder="no" scrolling="No"  noresize="noresize"  /><!--中间主体（左上导航）-->
        <frame src="mainFrame.asp" name="mainFrame"id="mainFrame"  frameborder="no" scrolling="auto" noresize="noresize" /><!--中间主体-->
    </frameset>
  </frameset>	
  
  <frame src="bottomFrame.asp" name="bottomFrame"  id="bottomFrame"  frameborder="no" scrolling="No" noresize="noresize" /><!--底部-->
</frameset>
<noframes><body>
</body>
</noframes>
</html>
