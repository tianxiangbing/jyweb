<%@ Page Title="找回密码" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="FindPassWord.aspx.cs" Inherits="Web.FindPassWord" %>
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
                注册邮箱
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_email"  TabIndex="2" runat="server" CssClass="login_input txt_email" 
                    ></asp:TextBox>
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
            <asp:Button ID="btnSumbit" CssClass="btnSumbit btn" TabIndex="4" runat="server" Text="确认找回" />
            <input id="Reset1" type="reset" value="重置" class="btn" />
        </div>
    </div>
    </form>
</asp:Content>

