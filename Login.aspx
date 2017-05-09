<%@ Page Title="登录" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Web.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

       <script type="text/javascript">
           $(document).ready(function () {
               $(".txt_userName").focus();
               $(".btnSumbit").click(function () {
                   if (!$(".txt_userName").val()) {
                       //jtip($(".txt_userName"), "请填写用户名!", 0); 
                       alert("请填写用户名!")
                       $(".txt_userName").focus();
                       return false;
                   }
                   if (!$(".txt_password").val()) {
                       alert("请填写密码!")
                       $(".txt_password").focus();
                       return false;
                   }
                   if (!$(".txt_validate").val()) {
                       alert("请填写验证码!")
                       $(".txt_validate").focus();
                       return false;
                   }
                   return true;
               });
               $(".validate").click(function () {
                   var rnd = Math.random(new Date().getMilliseconds());
                   $(".validate").attr("src", "validate.aspx?rnd=" + rnd);
               });
           });
    </script>
    </asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
    <form id="myform" runat="server">
 	<div class="form-cont login-form">
    	<div class="form-item clearfix">
            <label class="label">
                登录名
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_userName" TabIndex="1" runat="server" CssClass="login_input txt_userName"></asp:TextBox>
            </div>
            <div class="tips-area">
                <a href="regist.html">注册账号</a>
            </div>
        </div>
        <div class="form-item clearfix">
            <label class="label">
                密码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_password"  TabIndex="2" runat="server" CssClass="login_input txt_password" 
                    TextMode="Password"></asp:TextBox>
            </div>
            <div class="tips-area">
                <a href="FindPassWord.html">忘记密码</a>
            </div>
        </div>
        <div class="form-item clearfix">
            <label class="label">
                验证码
            </label>
            <div class="input-area">
                <asp:TextBox ID="txt_validate"  TabIndex="3" CssClass="login_input validate txt_validate" runat="server" Width="55px"></asp:TextBox>
                <img src="validateCode.html" id="validate" class="code-img" onclick="document.getElementById('validate').src='validateCode.aspx?r='+Math.round(Math.random()*10000);"/>
            </div>
            <div class="tips-area">
                <a href="javascript:void(0)" onclick="document.getElementById('validate').src='validateCode_'+Math.round(Math.random()*10000)+'.html';return false;">看不清，换一张</a>
            </div>
        </div>
        <div class="form-item-2">
            <asp:Button ID="btnSumbit" CssClass="btnSumbit bigbtn" TabIndex="4" runat="server" Text="登录" />
            <input type="button" class="bigbtn" value="注册" onclick="location.href='regist.html'" />
        </div>
    </div>
    </form>
</asp:Content>
