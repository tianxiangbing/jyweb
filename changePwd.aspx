<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Main.Master" CodeBehind="changePwd.aspx.cs" Inherits="Web.changePwd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
    <form id="myform" runat="server">
 	<div class="form-cont login-form">
    	<div class="form-item clearfix">
            <label class="label">
                用户名
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_userName" TabIndex="1" runat="server" CssClass="login_input txt_userName"></asp:TextBox>
            </div>
        </div>
        <div class="form-item clearfix">
            <label class="label">
                新密码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_password"  TabIndex="2" runat="server" CssClass="login_input txt_password" 
                    TextMode="Password"></asp:TextBox>
            </div>
        </div>
        <div class="form-item clearfix">
            <label class="label">
                重复密码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_passwordAgain"  TabIndex="2" runat="server" CssClass="login_input txt_passwordAgain" 
                    TextMode="Password"></asp:TextBox>
            </div>
        </div>
        <div class="form-item clearfix">
            <label class="label">
                验证码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_validate"  TabIndex="3" CssClass="login_input validate txt_validate" runat="server" Width="55px"></asp:TextBox>
                <img src="validateCode.html" id="validate" class="code-img" onclick="document.getElementById('validate').src='validateCode_'+Math.round(Math.random()*10000)+'.html';"/>
            </div>
            <div class="tips-area">
                <a href="javascript:void(0)" onclick="document.getElementById('validate').src='validateCode_'+Math.round(Math.random()*10000)+'.html';return false;">看不清，换一张</a>
            </div>
        </div>
        <div class="form-item-2">
            <asp:Button ID="btnSumbit" CssClass="btnSumbit btn" TabIndex="4" runat="server" Text="修改" />
            <input type="button" class="btn" value="注册" onclick="location.href='reg.aspx'" />
        </div>
    </div>
    </form>
</asp:Content>
