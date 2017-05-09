<%@ Page Title="寻朋找友" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="findFriend.aspx.cs" Inherits="Web.findFriend" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
<%--<ul class="friend">
<li>
<div><img  src="css/img/noImg.jpg" width="60px" height="60px" alt="昵称" title="用户名"/></div>
<div><a href="/user.aspx?user=">昵称</a> (女)</div>
<div>来自：地区</div>
<div><a href="javascript:void(0)" onclick="return add('')">加为好友</a> <a href="javascript:void(0)">打招呼</a></div>
</li>
</ul>--%>
<div id="fr_con">
    <asp:Literal ID="lt_userList" runat="server"></asp:Literal>

</div>
</asp:Content>
