<%@ Page Language="C#" MasterPageFile="~/Main.Master" Async="true" AutoEventWireup="true" CodeBehind="Regist.aspx.cs" Inherits="Web.Regist" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <title>注册</title>
    <script src="Scripts/CheckUser.js" type="text/javascript"></script>
    </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
	<form id="myform" runat="server">
	<div class="form-cont">
    	<div class="form-area">
            <div class="form-item clearfix">
                <label class="label">
                    <em>*</em>用户名
                </label>
                <div class="input-area">
                    <asp:TextBox ID="txt_name" runat="server" CssClass="login_input txt_name"></asp:TextBox>
                </div>
                <div class="tips-area">
                    
                </div>
            </div>
        </div>
    	<div class="form-area">
            <div class="form-item clearfix">
                <label class="label">
                    <em>*</em>昵称
                </label>
                <div class="input-area">
                    <asp:TextBox ID="txt_nickName" runat="server" CssClass="login_input txt_nickName"></asp:TextBox>
                </div>
                <div class="tips-area">
                    
                </div>
            </div>
        </div>
        <div class="form-area">
            <div class="form-item clearfix">
                <label class="label">
                    <em>*</em>密码
                </label>
                <div class="input-area">
                    <asp:TextBox ID="txt_pwd" runat="server" TextMode="Password" CssClass="login_input txt_pwd"></asp:TextBox>
                </div>
                <div class="tips-area">
                    
                </div>
            </div>
            
            <div class="form-item clearfix">
                <label class="label">
                    <em>*</em>重复密码
                </label>
                <div class="input-area">
                    <asp:TextBox ID="txt_pwd_again" runat="server" TextMode="Password" CssClass="login_input txt_pwd_again"></asp:TextBox>
                </div>
                <div class="tips-area">
                    
                </div>
            </div>
            
            <div class="form-item clearfix">
                <label class="label">
                    <em>*</em>邮箱
                </label>
                <div class="input-area">
                    <asp:TextBox ID="txt_email" runat="server" CssClass="login_input txt_email"></asp:TextBox>
                </div>
                <div class="tips-area">
                    
                </div>
            </div>
        </div>
        
        <div class="form-item clearfix">
            <label class="label">
                QQ
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_QQ" runat="server" CssClass="login_input txt_QQ"></asp:TextBox>
            </div>
            <div class="tips-area">
                
            </div>
        </div>
        
        <div class="form-item clearfix">
            <label class="label">
                验证码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_Code" runat="server" Width="60px" CssClass="login_input txt_Code"></asp:TextBox>
                <img src="validateCode.aspx" id="validate" class="code-img" onclick="document.getElementById('validate').src='validateCode.aspx?r='+Math.round(Math.random()*10000);"/>
            </div>
            <div class="tips-area">
                
            </div>
        </div>
        
        <div class="form-item-2 agreement">
            <input type="checkbox" class="input-chk" checked />
            我已经仔细阅读并且同意
            <a href="registAgreement.aspx">《用户注册协议》</a>
        </div>
        
        <div class="form-item-2">
            <asp:Button ID="btnSumbit" runat="server" CssClass="btnSumbit btn" Text="注册" OnClick="Button_Sumbit_Click" />
            <input id="Reset1" type="reset" value="重置" class="btn" />
        </div>
    </div>
    </form>
</asp:Content>
