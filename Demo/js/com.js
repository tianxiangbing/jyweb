// JavaScript Document
function addfavorite()
{
	if (document.all)
	{ 
	window.external.addFavorite(window.location.href,"QQ网站开发技术群技术分享");
	}
	else if (window.sidebar)
	{ window.sidebar.addPanel('QQ网站开发技术群技术分享',window.location, ""); }
} 
function copy(){
	var stringAnything="QQ技术群5678537或70210212欢迎您的加入，群官方网站:http://www.lovewebgames.com/demo."+ document.title+":"+window.location;
	copyToClipboard(stringAnything);
	}
function copyToClipboard(txt) {    
 if(window.clipboardData) {    
		 window.clipboardData.clearData();    
		 window.clipboardData.setData("Text", txt);    
 } else if(navigator.userAgent.indexOf("Opera") != -1) {    
	  window.location = txt;    
 } else if (window.netscape) {    
	  try {    
		   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");    
	  } catch (e) {    
		   alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");    
	  }    
	  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);    
	  if (!clip)    
		   return;    
	  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);    
	  if (!trans)    
		   return;    
	  trans.addDataFlavor('text/unicode');    
	  var str = new Object();    
	  var len = new Object();    
	  var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);    
	  var copytext = txt;    
	  str.data = copytext;    
	  trans.setTransferData("text/unicode",str,copytext.length*2);    
	  var clipid = Components.interfaces.nsIClipboard;    
	  if (!clip)    
		   return false;    
	  clip.setData(trans,null,clipid.kGlobalClipboard);      
 }    
	  alert("已成功复制到剪切板，您可以粘贴后发送至好友！")  
}  