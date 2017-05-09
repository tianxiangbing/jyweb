<%
	
	function needCheck()	'判断文件名存在左边菜单的权限,不存在的,另外判断
	   dim havePower,tPower,powerRs,getPower,i,getSmallPower,arrmenuName,fileStr,arrFileStr,j,arrLeftMenu
	   needCheck=false
	    for i=0 to ubound(leftMenu,1)	'读取菜单的所有主导菜单值，
		    if isempty(leftMenu(i,0)) then exit for
			for j=1 to  ubound(leftMenu,2)	'读取子菜单的所有值，
				if isempty(leftMenu(i,j)) then exit for
				arrLeftMenu=split(leftMenu(i,j),",")
				if(lcase(arrLeftMenu(1))=getScriptName) then
					'needCheck=true
					docheckPower
					exit function
				end if
			 next
		next	
	 end function
	 
	sub doCheckPower()
		   dim havePower,tPower,powerRs,getPower,i,getSmallPower 
		   havePower=false
		   tPower=conn.execute("select power from psadmin where username='"&session("admin")&"'")(0)
		   set powerRs=conn.execute("select * from power where id="&tPower)
		   getPower=split(powerRs("power"),",")
		   closeRs(powerRs)
		   for i=0 to ubound(getPower)
			 getSmallPower=split(getPower(i),"_")
			 'response.write menuFileName(getSmallPower(0),getSmallPower(1))
			 if(menuFileName(getSmallPower(0),getSmallPower(1))=getScriptName) then
				 havePower=true
				 exit for
			 end if 
		   next
			
			 '排除不需要权限的文件
		   dim fileStr,arrFileStr,scriptName
		   fileStr="security/adminUploadFile.asp,security/database.asp"
		   arrFileStr=split(fileStr,",")
		   for i=0 to ubound(arrFileStr)
			  if(scriptName=lcase(arrFileStr(i))) then
				 havePower=true
				 exit for
			  end if
		   next
			 
		   if havePower=false then erro "权限不够，不能访问此页面。"
	   'end if
   end sub
   
   function getScriptName()
   	  dim scriptName
      scriptName=request.ServerVariables("SCRIPT_NAME")
	  'response.Write(scriptName) 
	  'response.Write(right(scriptName,len(scriptName)-instr(2,scriptName,"/")))
	  getScriptName=lcase(right(scriptName,len(scriptName)-instr(2,scriptName,"/")))
	  
   end function
   
   
   function menuFileName(fid,pid)  '根据数组菜单的ID，得到文件名
   		dim arrMenuName
   		arrMenuName=split(leftMenu(fid,pid),",")
		menuFileName=lcase(arrmenuName(1))
   end function
   
'---------------------------------------------------------权限细分判断
	'参数说明 
	'mePid 菜单父ID
	'meid  菜单子ID
	'sId   权限细分ID
	'effectInt  0或者1   0为页面直接调用使用,1返回Boolean值
   function PowerDetailInfo(mePid,meid,sId,effectInt)  '判断权限详细情况，包括修改，删除。
   	   gPower=conn.execute("select power from psadmin where username='"&session("admin")&"'")(0)
	   gpowerD=conn.execute("select powerDetail from power where id="&gPower)(0)
	   dim havePowerDetail
	   havePowerDetail=false
	   if gpowerD<>"" then
	   	set dRs=conn.execute("select * from powerDetail where id in("&gpowerD&") and MenuPId="&mePid&" and MenuId="&meId&" and PowerName="&sId&" ")
		if not dRs.eof then havePowerDetail=true
		closeRs(dRs)
	   end if
	   
	   if effectInt=0 then
		   if not havePowerDetail then
				erro "权限不够，不能访问此页面。"
		   end if
		else
		   if havePowerDetail then  '返回Boolean值
			  PowerDetailInfo=true
		   else
			  PowerDetailInfo=false
		   end if
		end if   
   end function
 
   
   function getPowerName(powerId)	'取权限名字
   		getPowerName=conn.execute("select powerDName from powerDName where id="&powerId)(0)
   end function
   
%>