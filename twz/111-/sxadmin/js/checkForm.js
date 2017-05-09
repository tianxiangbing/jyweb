//CheckForm JS

function chkLogin()	//用户登陆校验
{
	if (document.form1.username.value=="")
	 {
	  alert ("请输入用户名！");
	  document.form1.username.focus();
	  return false;
	 }
	 if (document.form1.userpwd.value=="")
	 {
	  alert ("请填写登录密码！");
	  document.form1.userpwd.focus();
	  return false;
	 }
	  if (document.form1.passcode.value==""||isNaN(document.form1.passcode.value))
	 {
	  alert ("验证码不能为空,且为数字！");
	  document.form1.passcode.focus();
	  return false;
	 }

 	return true

}

function del(obj)  //删除记录
{
	for(i=0;i<document.getElementsByName(obj).length;i++)
	{
	  if(document.getElementsByName(obj)[i].checked) return confirm("你确认你要执行的操作吗？");
	}	
	alert("至少选择一条信息记录！");
	return false;
}


function selectAll(form)
{		//全选功能
	for(var i=0;i<form.elements.length;i++)
	{
		if(form.elements[i].name=="selectId")
		{
			form.elements[i].checked=form.checkAll.checked;
		}
	}
}

function chkAddManager()	//添加管理员
{
	if(form1.username.value=="")
	{
		alert("请输入管理员账号！");
		document.form1.username.focus();
		return false;
	}
	if(form1.userpwd.value=="")
	{
		alert("请输入管理员密码！");
		document.form1.userpwd.focus();
		return false;
	}
	if(form1.userpwd2.value=="")
	{
		alert("请输入管理员确认密码！");
		document.form1.userpwd2.focus();
		return false;
	}
	if(form1.userpwd.value!=form1.userpwd2.value)
	{
		alert("两次密码输入不一致，请重新输入！");
		document.form1.userpwd.focus();
		return false;
	}
	
}

function chkEditManager()	//修改管理员
{
	if(form1.userpwd.value=="")
	{
		alert("请输入管理员密码！");
		document.form1.userpwd.focus();
		return false;
	}
	if(form1.userpwd2.value=="")
	{
		alert("请输入管理员确认密码！");
		document.form1.userpwd2.focus();
		return false;
	}
	if(form1.userpwd.value!=form1.userpwd2.value)
	{
		alert("两次密码输入不一致，请重新输入！");
		document.form1.userpwd.focus();
		return false;
	}
	
}

function chkAddClass()	//添加类别
{
	if(form1.className.value=="")
	{
		alert("请输入类别名称！");
		document.form1.className.focus();
		return false;
	}
	if (form1.power.value==""||isNaN(form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
	}

}

function chkAddMenu()	//添加类别
{
	if(form1.className.value=="")
	{
		alert("请输入菜单名称！");
		document.form1.className.focus();
		return false;
	}
	if (form1.power.value==""||isNaN(form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
	}

}



function doChange(objText, objDrop){	
		if (!objDrop) return;
		var str = objText.value;
		var arr = str.split("|");
		var nIndex = objDrop.selectedIndex;
		objDrop.length=1;
		for (var i=0; i<arr.length; i++){
			objDrop.options[objDrop.length] = new Option(arr[i], arr[i]);
		}
		objDrop.selectedIndex = nIndex;
	}

function show(obj)
{
	if (obj.style.display==""){
	obj.style.display="none";
	}
	else
	{
	obj.style.display="";
	}
}

function chkNews(){		//添加新闻
		if (document.form1.newsClass.value==""){
			alert("请选择新闻类别！");
			document.form1.newsClass.focus();
			return false;
		}
		if (document.form1.title.value==""){
			alert("标题不能为空！");
			document.form1.title.focus();
			return false;
		}
		if (document.form1.power.value==""||isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		if (eWebEditor1.getHTML()==""){
			alert("新闻内容不能为空！");
			return false;
		}
		
		return true;
}

function chkAddPro(){		//添加产品
		if (document.form1.proClass.value==""){
			alert("请选择产品类别！");
			document.form1.proClass.focus();
			return false;
		}
		if (document.form1.proName.value==""){
			alert("请输入产品名称！");
			document.form1.proName.focus();
			return false;
		}
		//if (document.form1.proPic.value==""){
//			alert("请上传图片！");
//			document.form1.proPic.focus();
//			return false;
//		}
		if (document.form1.power.value!=""&&isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		
		return true;
}

function chkInfo()
{
	if (eWebEditor1.getHTML()==""){
		alert("信息内容不能为空！");
		return false;
	}
}

function chkAddFL(){
		
		if (document.form1.linkName.value==""){
			alert("请输入友情链接名称！");
			document.form1.linkName.focus();
			return false;
		}
		if (document.form1.linkPic.value==""){
			alert("请上传链接图片！");
			document.form1.linkPic.focus();
			return false;
		}
		if (document.form1.power.value!=""&&isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		
		return true;
}
	
function chkAddFile(){
		if (document.form1.fileClass.value==""){
			alert("请选择文件类别！");
			document.form1.fileClass.focus();
			return false;
		}
		if (document.form1.filename.value==""){
			alert("请输入文件名称！");
			document.form1.filename.focus();
			return false;
		}
		if (document.form1.power.value!=""&&isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		if (document.form1.filepath.value==""){
			alert("请上传文件！");
			document.form1.filepath.focus();
			return false;
		}
		
		return true;
}

function chkAddAd(){
		if (document.form1.adClass.value==""){
			alert("请选择广告类别！");
			document.form1.adClass.focus();
			return false;
		}
		if (document.form1.adName.value==""){
			alert("请输入广告名称！");
			document.form1.adName.focus();
			return false;
		}
		
		if (document.form1.adPic.value==""){
			alert("请上传图片！");
			document.form1.adPic.focus();
			return false;
		}
		
		return true;
}


function chkAddTP(){
		
		if (document.form1.voteTitle.value==""){
			alert("请输入投票名称！");
			document.form1.voteTitle.focus();
			return false;
		}
		if (isNaN(document.form1.voteNum.value)){
			alert("请正确输入票数数字！");
			document.form1.voteNum.focus();
			return false;
		}
		if (document.form1.power.value!=""&&isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		
		return true;
	}

function chkModifyTopic()
	{
		
		if (document.form1.voteTitle.value==""){
			alert("投票主题不能为空！");
			document.form1.voteTitle.focus();
			return false;
		}
	}

function ConfirmDel()
{
	return confirm("你真的要删除此文件吗？删除后将不可恢复。");
}

function reConfirm()
{
	return confirm("确定操作?");
}

function chkAddJob(){
		
		if (document.form1.jobName.value==""){
			alert("请输入招聘岗位！");
			document.form1.jobName.focus();
			return false;
		}
		if (document.form1.jobNum.value==""||isNaN(document.form1.jobNum.value)){
			alert("请正确输入招聘人数！");
			document.form1.jobNum.focus();
			return false;
		}
		if (document.form1.endTime.value==""){
			alert("请输入载止时间！");
			document.form1.endTime.focus();
			return false;
		}
		if (document.form1.power.value!=""&&isNaN(document.form1.power.value)){
			alert("请正确输入排序数字！");
			document.form1.power.focus();
			return false;
		}
		if (document.form1.content.value==""){
			alert("请输入岗位描述！");
			document.form1.content.focus();
			return false;
		}
		return true;
	}

function chkBackData()
{
	if(document.form1.backupName.value=="")
	{
		alert("请输入备份路径！");
		document.form1.backupName.focus();
		return false;
	}	
}

function chkAddRole()
{
	if(document.form1.username.value=="")
	{
		alert("请输入角色名字！");
		document.form1.username.focus();
		return false;
	}	
}