<!--#include file="../inc/subCode.asp"-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>后台管理</title>
<link rel="stylesheet" href="../css/common.css" type="text/css" />
<script type="text/javascript" src="../js/checkForm.js"></script>
<script type="text/javascript">
function selectMenu(obj,tValue)
{
	//alert(obj);
	//alert(tValue);
	//alert(document.all.item("0_1").value);
	if(tValue)
	{	
		document.all(obj).checked="checked";
	}
}

</script>
</head>
<body>
<div id="container">
<% if request.querystring("action")="add" then' 取提交过来的数据
		
		 username = htmlEncode(trim(Request.Form("username")))
		 power = htmlEncode(replace(Request.Form("power")," ",""))
		 powerDetail = htmlEncode(replace(Request.Form("powerDetail")," ",""))
		 describe = htmlEncode(trim(Request.Form("describe")))
		 
		 if username="" then erro "请输入角色名称"
		 if power="" then erro "必须选择一个查看权限!"
		 num=conn.execute("select count(*) from power where username='"&username&"'")(0)
		 if num>0 then
		   erro "此角色名称已存在，请重新输入！"
		 end if 
		 
		' response.write power
'		 response.write powerdetail
'		 response.end
		
		sql="insert into [power]([username],[power],[powerDetail],[describe]) values('"&username&"','"&power&"','"&powerDetail&"','"&describe&"')"
		'response.write sql
		'response.end
		conn.execute(sql)
		
		ok "添加成功！","add.asp"
	end if

 %>

  <table width="100%" border="0" align="center"  cellpadding="3" cellspacing="1" class="table_style">
    <form id="form1" name="form1" method="post" action="../../sxadmin/power/module.asp?action=add" onSubmit="return chkAddRole();">
	<tr>
      <td colspan="2" class="table_title">添加角色</td>
    </tr>
    
    <tr>
      <td width="14%" align="right" class="left_title_2">角色名称：</td>
      <td>
        <input name="username" type="text" id="username" size="25" maxlength="40" />
        <span class="red">*</span>      </td>
    </tr>
    <tr>
      <td align="right" class="left_title_2">角色权限：</td>
      <td align="left"><table width="100%" border="0" cellpadding="3" cellspacing="1" class="table_style">
        <% for i=0 to ubound(leftMenu,1)
			if isempty(leftMenu(i,0)) then exit for  %>
        <tr>
          <td width="12%" align="center"><%= leftMenu(i,0) %> </td>
          <td>
		   
				 
				  <table width="80%" border="0" cellspacing="0" cellpadding="0">
                     <% 
			    for j=1 to  ubound(leftMenu,2)
				  if isempty(leftMenu(i,j)) then exit for
				  arrLeftMenu=split(leftMenu(i,j),",") %>
				  
                    <tr>
                      <td width="17%" align="left"> <%= arrLeftMenu(0) %> </td>
                      <td width="83%" align="left" valign="middle">
					  <input type="checkbox" name="power" id="<%= i&"_"&j %>"  value="<%= i&"_"&j %>" />
					  控制
					  <% set tRs=conn.execute("select * from powerDetail where MenuPId="&i&" and MenuId="&j&" order by paixu desc ") 
					  	do while not tRs.eof%>
						 <input type="checkbox" name="powerDetail"  value="<%= tRs("id") %>" onClick="selectMenu('<%= i&"_"&j %>',this.checked)" /><%= getPowerName(tRs("PowerName")) %>
						<%tRs.movenext
						loop
						closeRs(tRs)%>					  </td>
                    </tr>
					<% next %>
                  </table>					  </td>
          </tr>
		<% next %>
      </table>        </td>
      </tr>
     <tr>
      <td width="14%" align="right" class="left_title_2">角色描述：</td>
      <td>
        <textarea name="describe" cols="50" rows="3"></textarea>       </td>
    </tr>
    
    
     <tr bgcolor="#FFFFFF">
       <td class="left_title_2"></td>
       <td height="40" valign="bottom"><span class="red">注意：修改，删除权限必须在“控制”的权限上操作。</span></td>
     </tr>
     <tr bgcolor="#FFFFFF">
      <td class="left_title_2"></td>
      <td height="40" valign="bottom"><input type="submit" name="btnsubmit" value="添 加" class="button2"> &nbsp; 
      <input type="reset" name="btnreset" value="重 写" class="button2"></td>
    </tr>  </form>
  </table>
</div>
</body>
</html>
