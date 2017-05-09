 <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_bor">
  <tr>
    <td height="40" class="type_name">项目分类</td>
  </tr>
  </table>
   <div class="project_box">
             <%
set RsPro=conn.execute("select * from pic order by power desc,id desc")
if not RsPro.eof then 
do while not RsPro.eof
%>
   		<a href="project_info.asp?id=<% =RsPro("id") %>" title="<% =trim(RsPro("title")) %>"><% =trim(RsPro("title")) %></a>
           <%
RsPro.movenext()
loop
end if
%>  
   </div>