 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_bor">
  <tr>
    <td height="40" class="type_name">Products</td>
  </tr>
  </table>
   <div class="project_box">
    <%
set rs=conn.execute("select * from proClass  where ClassPId=0 order by power desc,classid desc")
if not rs.eof then 
do while not rs.eof
%>
   		<a href="en_pro.asp?classid=<% =rs("classid") %>" title="<% =trim(rs("classname")) %>"><% =trim(rs("enclassname")) %></a>
<%
rs.movenext()
loop
end if 
rs.close:set rs=nothing
%>  
   </div>