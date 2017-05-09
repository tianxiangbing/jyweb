<table width="204" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="35"  class="type_name" >新闻中心</td>
  </tr>
  <tr>
    <td><table width="204" border="0" cellspacing="0" cellpadding="0" class="prolist">
     <%
    set rs=conn.execute("select * from newsClass  where ClassPId=0 order by power desc,classid desc")
    if not rs.eof then 
    do while not rs.eof
    %> 
      <tr>
        <td height="30"> <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr class="xian">
            <td width="10%">&nbsp;</td>
            <td width="90%" height="35"><a href="news.asp?classid=<% =rs("classid") %>" class="one_type" >
              <% =trim(rs("classname")) %>
            </a></td>
          </tr>
        </table></td>
      </tr>
   <%
    rs.movenext()
    loop
    end if 
    rs.close:set rs=nothing
    %>
   
    </table></td>
  </tr>
</table>