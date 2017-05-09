<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="chat.aspx.cs" Inherits="WebChat._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        body{
            background-color: gray;
            width:290px;height:300px;overflow:auto;overflow-x:hidden;
            }
        .style1
        {
            width: 100%;
        }
        .style2
        {
            width: 53px;
        }
        .style3
        {
            width: 12px;
        }
        .style4
        {
            width: 150px;
        }
        #showMsg{font-size:12px;color:#eee;}
        input{border:1px solid #444444;}
        .uname{color:blue;}
        .content{font-size:12px;color:#333333;}
        .date{font-size:12px;color:#ccc;}
        p{line-height:1.2;}
    </style>
    <script src="Scripts/jquery-1.4.1.min.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#txtMsgContent").keyup(function (event) {
                if (event.keyCode == 13) {
                    $("#btn_send").click();
                }
            });
            $("#btn_send").click(function () {
                if (document.getElementById("txtMsgContent").value.length == 0 || document.getElementById("txtUserName").value.length == 0) {
                    return false;
                } else {
                    $.post("Chat.ashx", { act: "sendMsg", uname: $("#txtUserName").val(), msg: $("#txtMsgContent").val() }, function (r) {
                        $("#showMsg").html(r);
                    });
                    $("#txtMsgContent").val("")
                }
            });
            setInterval(showAll, 10000);
            showAll();
            function showAll() {
                $.post("Chat.ashx", { act: "getAllMsg" }, function (r) {
                    $("#showMsg").html(r);
                });
            }
        });
        function check() {
            if (document.getElementById("txtMsgContent").value.length == 0 || document.getElementById("txtUserName").value.length == 0) {
                return false;
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <div id="sendMsg">        
        <table class="style1">
            <tr>
                <td class="style2">
                    <asp:TextBox ID="txtUserName" runat="server" Width="52px" MaxLength="8"></asp:TextBox></td>
                <td class="style3">说:</td>
                <td class="style4">
                    <asp:TextBox
            ID="txtMsgContent" runat="server" Width="150px" MaxLength="50"></asp:TextBox></td>
                <td>
                    <input type="button" value="发送" id="btn_send"/></td>
            </tr>
        </table>
        </div>
    <div id="showMsg"></div>
    </div>
    </form>
</body>
</html>
