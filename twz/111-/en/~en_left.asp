<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="35" class="type_name">Product classification</td>
  </tr>
  <tr>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <%
set rs=conn.execute("select * from proClass  where ClassPId=0 order by power desc,classid desc")
if not rs.eof then 
do while not rs.eof
%>
      <tr class="xian">
        <td width="8%">&nbsp;</td>
        <td width="9%" height="30"><img src="../images/jian.png" alt="" width="11" height="11" /></td>
        <td width="83%" height="38"> <a class=" one_type" href="../en_PRO.asp?classid=<% =rs("classid") %>" title="<% =trim(rs("EnClassName")) %>"><% =trim(rs("EnClassName")) %></a> </td>
      </tr>
      <%
			sql2="select * from proClass  where ClassPId="&rs("ClassID")&" order by power desc,classid desc"
			'response.Write(sql2)
				set rs22=conn.execute(sql2)
				if not rs22.eof then 
				do while not rs22.eof
				%> 
      <tr>
        <td>&nbsp;</td>
        <td height="30">&nbsp;</td>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
         
          <tr class="xian">
            <td width="4%"><img src="../images/dian.png" width="3" height="3" /></td>
            <td width="94%" height="35"><a href="../en_pro.asp?classid2=<% =rs22("classid") %>" class="two_type" title="<% =trim(rs22("EnClassName")) %>"><% =trim(rs22("EnClassName")) %></a></td>
          </tr>
        	
        </table></td>
      </tr>
      <%
				rs22.movenext()
				loop
				end if 
				rs22.close:set rs22=nothing
				%>
<%
rs.movenext()
loop
end if 
rs.close:set rs=nothing
%>
     <!-- <tr class="xian">
        <td>&nbsp;</td>
        <td height="30"  class="one_type_click"><img src="images/jia.png" width="12" height="12" /></td>
        <td height="38"><a href="" class="one_type_click">接口转换器系列</a></td>
      </tr>-->
    
    </table></td>
  </tr>
</table>