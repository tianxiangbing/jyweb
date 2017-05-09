<%@ Page Title="个人主页" ValidateRequest="false" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="Web.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
    function chkNumber(obj) {
        var No = 240 - obj.value.len();
        if (No < 0) {
            obj.value = obj.value.substr(0, 240);
        }
        document.getElementById("number").innerHTML = 240 - obj.value.len();
    }
    $(function () {
        $("#<%=btn_sendMiniBlog.ClientID %>").click(function () {
            if ($.trim($("#txtContent").val()).len() == 0) {
                alert("请先填写内容!"); return false;
            } else
                return true;
        });
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cph" runat="server">
    <form runat=server id="myform">
  <div class="userInfo">
    <div class="user_l">
    <div><img src="<%=face==""?"/css/img/noImg.jpg":face%>" class="bigface"/></div>
    <ul>
    <li><a href="/UserCenter/UploadImg.aspx">上传头像</a></li>
    <li><a href="#">写博文</a>|<a href="/findFriend.aspx">搜寻好友</a></li>
    </ul>
    </div>
    <div class="user_r">
     <div class="miniblog">
     <div><textarea class="txtContent" name="txtContent" id="txtContent" onkeyup="chkNumber(this)"></textarea></div>
     <div class="btn">
     <span id="number"></span>
         <asp:Button ID="btn_sendMiniBlog" class="bigbtn" runat="server" Text="分享" /></div>
     </div>
     
    <div>
   <h1>
       所有动态</h1>
       <asp:Literal ID="lt_log" runat="server"></asp:Literal>
    </div>
    </div>
    <div class="clear"></div>
    </div>

    </form>
</asp:Content>
