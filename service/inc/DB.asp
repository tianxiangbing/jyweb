<%
	private sub initialize(objConn,tDbPath)
		dim connStr
		If IsSqlDataBase=0 Then
	 		connStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath(dbPath)
  		else	''' SQL数据库设置 ''''''''''
	 		dim sqlDataBase
			sqlDataBase	= "ch#$%shixiang.asa"		'数据库名	
			connStr="Provider=SQLOLEDB; User ID=sa; Password=123456; Initial CataLog="&SqlDataBase&"; Data Source=(local);"
		end If
		
		set objConn = server.CreateObject("adodb.connection")
		objConn.open connStr	
  
		if err then
	 		err.clear
			set objConn = nothing
			response.Write "数据库连接出错，请检查连接字符串。"
			response.End()
		end if
	end sub

	sub closeRs(objRs)
  		objRs.close()
		set objRs = nothing
	end sub
  
	sub closeConn()
  		conn.close()
		set conn = nothing
	end sub	
%>