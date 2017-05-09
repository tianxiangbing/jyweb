<%@ Page Title="友情提示" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Tip.aspx.cs" Inherits="Web.Tip" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
    <asp:Panel ID="Panel1" runat="server" Height="300px">
    <div style="padding:150px;">友情提示：您的邮件已发送成功，请至<asp:Label ID="lb_email" runat="server" Text=""></asp:Label>查收邮件!或返回<a href="index.html">首页</a>!</div>
    </asp:Panel>
</asp:Content>
