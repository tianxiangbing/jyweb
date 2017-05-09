 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_bor">
  <tr>
    <td height="40" class="type_name">产品中心</td>
  </tr>
  </table>
   <div class="project_box">
    <%
set rs=conn.execute("select * from proClass  where ClassPId=0 order by power desc,classid desc")
if not rs.eof then 
do while not rs.eof
%>
   		<a href="pro.asp?classid=<% =rs("classid") %>" title="<% =trim(rs("classname")) %>"><% =trim(rs("classname")) %></a>
<%
rs.movenext()
loop
end if 
rs.close:set rs=nothing
%>  
   </div>