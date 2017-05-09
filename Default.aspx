<%@ Page Language="C#" MasterPageFile="~/Main.Master" Title="网上恋爱游戏" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
   <div>
   <h1>网站最新动态</h1>
       <asp:Literal ID="lt_log" runat="server"></asp:Literal>
       <div class="page">
       </div>
    </div>
</asp:Content>
