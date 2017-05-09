<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Comment.ascx.cs" Inherits="UserControls.Comment" %>
<style type="text/css">
    body
    {
        font-size: 14px;
    }
    a
    {
        color: #1e50a2;
        text-decoration: none;
    }
    a:hover
    {
        color: #ba2636;
        text-decoration: underline;
    }
    .comment
    {
        padding: 10px;
        border: 1px #c4d6ec solid;
        background-color: #f8fcff;
        clear: both;
        word-break: break-all;
    }
    .comment_item
    {
        border-bottom: 1px silver dashed;
        padding: 20px 0 40px 0;
    }
    /*评论首部*/
    .comment_head
    {
        font-size: 13px;
        color: #1e50a2;
        margin-top: 5px;
    }
    .comment_head div
    {
        float: left;
        padding-right: 5px;
    }
    .comment_head_address
    {
    }
    .comment_head_username
    {
        font-weight: bold;
    }
    /*评论中部*/
    .comment_middle
    {
        font-size: 14px;
        clear: both;
        word-break: break-all;
        padding: 10px 0;
    }
    .comment_quote
    {
        border: 1px #999999 solid;
        background-color: #ffffee;
        padding: 5px;
        height: 100%;
    }
    .comment_quote_address
    {
        float: left;
        width: 90%;
    }
    .comment_quote_turn
    {
        float: right;
        text-align: right;
    }
    .comment_reply_content
    {
        padding: 10px 0;
        clear: both;
    }
    /*评论底部*/
    .comment_foot
    {
        font-size: 13px;
        color: #1e50a2;
    }
    .comment_foot_function div
    {
        float: right;
        padding-left: 15px;
    }
    .comment_reply
    {
        clear: both;
        display: none;
    }
    .comment_bottom
    {
        clear: both;
        margin: 20px;
    }
    .comment_bottom_head
    {
        font-size: 20px;
        font-family: 黑体;
        padding: 5px;
    }
    .paging div
    {
        float: left;
        margin: 5px;
    }
</style>
<script type="text/javascript">
    //Begin AJAX

    var xmlHttp;

    function createXMLHttpRequest() {
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest(); //mozilla浏览器
        }
        else if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE老版本
            }
            catch (e) { }
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE新版本
            }
            catch (e) { }
            if (!xmlHttp) {
                window.alert("不能创建XMLHttpRequest对象实例！");
                return false;
            }
        }
    }

    $ = function (id) {
        return document.getElementById(id)
    }

    //分页跳转
    function goto(pageIndex) {
        $("commentList").innerHTML = "正在获取评论信息..."
        createXMLHttpRequest();
        xmlHttp.onreadystatechange = requestCommentList;
        var url = "commenthandler.ashx?modelid=" + $("modelID").value + "&articleid=" + $("articleID").value + "&pageindex=" + pageIndex + "&pagesize=" + $("pageSize").value + "&showpaging=" + $("showPaging").value + "&" + new Date()
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
    requestCommentList = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                $("commentList").innerHTML = xmlHttp.responseText
            }
        }
    }

    window.onload = function () {
        reg = /#(\d+)/
        if (reg.test(location))
            pageIndex = location.href.match(reg)[1]
        else
            pageIndex = 1
        goto(pageIndex)
        //goto($("pageIndex").value)
    }

    var objID
    //支持
    Support = function (obj, commentid) {
        objID = obj
        createXMLHttpRequest();
        xmlHttp.onreadystatechange = requestComment;
        var url = "commenthandler.ashx?id=" + commentid + "&act=support"
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
    //反对
    Oppose = function (obj, commentid) {
        objID = obj
        createXMLHttpRequest();
        xmlHttp.onreadystatechange = requestComment;
        var url = "commenthandler.ashx?id=" + commentid + "&act=oppose"
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
    requestComment = function () {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                if (xmlHttp.responseText == "success") {
                    $(objID).innerHTML = parseInt($(objID).innerHTML) + 1
                }
            }
        }
    }

    //回复功能显示/隐藏
    Reply = function (m) {
        for (i = 1; i <= $("pageSize").value; i++) {
            if (i == m) {
                if ($("reply" + i).style.display == "block")
                    $("reply" + i).style.display = "none"
                else
                    $("reply" + i).style.display = "block"
            }
            else
                if ($("reply" + i) != null)
                    $("reply" + i).style.display = "none"
            }
        }

        commentID = "";
        //回复评论
        ReplyComment = function (id) {
            commentID = id
            replayContent = $("replycontent" + commentID)
            content = $("replycontent" + commentID).value
            if (content.replace(/\s/g, "") == "") {
                alert("请输入回复内容")
                replayContent.value = ""
                replayContent.focus()
                return
            }
            createXMLHttpRequest();
            xmlHttp.onreadystatechange = requestReplyComment;
            var url = "commenthandler.ashx?id=" + id + "&content=" + escape(content) + "&act=reply" + "&" + new Date()
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        }
        requestReplyComment = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    if (xmlHttp.responseText == "Faile") {
                        alert("服务器正忙，请稍后再试")
                    }
                    else if (xmlHttp.responseText == "请输入评论内容") {
                        alert(xmlHttp.responseText)
                    }
                    else {
                        app = document.createElement("div")
                        app.innerHTML = xmlHttp.responseText
                        //alert("添加成功")
                        //$("replycomment" + commentID).insertBefore(app, null)
                        $("replycomment" + commentID).appendChild(app)
                        $("replycontent" + commentID).value = ""
                        for (i = 1; i <= $("pageSize").value; i++) {
                            if ($("reply" + i) != null)
                                $("reply" + i).style.display = "none"
                        }
                    }
                }
            }
        }
</script>
<div class="comment">
    <a name="#" id="#"></a>
    <input type="hidden" id="modelID" value="<%= ModelID %>" />
    <input type="hidden" id="articleID" value="<%= ArticleID %>" />
    <input type="hidden" id="pageIndex" value="<%= CurrentPageIndex %>" />
    <input type="hidden" id="pageSize" value="<%= PageSize %>" />
    <input type="hidden" id="showPaging" value="<%= AlwaysShowPaging %>" />
    <div class="comment_list" id="commentList">
        <%--<div class="comment_item">
            <div class="comment_head">
                <div class="comment_head_address">
                    网易湖北省黄石市大冶市网友
                </div>
                <div class="comment_head_username">
                    [6254938]
                </div>
            </div>
            <div class="comment_middle">
                <div class="comment_reply_content">
                    终于又到一年冬季结束时，今年可以吃什么呢，腊肉？
                </div>
                <div class="comment_quote">
                    <!--开始循环引用-->
                    <div class="comment_quote">
                        <div class="comment_head">
                            <div class="comment_quote_address">
                                网易湖北省黄石市大冶市网友 [6254938] 的原贴：
                            </div>
                            <div class="comment_quote_turn">
                                1
                            </div>
                        </div>
                        <div class="comment_reply_content">
                            我骄傲
                        </div>
                    </div>
                    <!--结束循环引用-->
                    <div class="comment_head">
                        <div class="comment_quote_address">
                            网易湖北省黄石市大冶市网友 [6254938] 的原贴：
                        </div>
                        <div class="comment_quote_turn">
                            2000
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment_foot">
                <div class="comment_foot_function">
                    <div>
                        <a href="javascript:;" onclick="reply(1)">回复</a>
                    </div>
                    <div>
                        <a href="javascript:;">支持(0)</a>
                    </div>
                    <div>
                        <a href="javascript:;">反对(0)</a>
                    </div>
                    <div>
                        <a href="javascript:;">举报</a>
                    </div>
                </div>
                <div id="reply1" class="comment_reply">
                    <div>
                        <textarea id="replycontent1" rows="4" cols="20">123</textarea>
                    </div>
                    <div>
                        <input type="button" value="发 表" />
                    </div>
                </div>
            </div>
        </div>--%>
    </div>
    <div class="comment_bottom">
        <div class="comment_bottom_head">
            发表评论
        </div>
        <div>
            <asp:TextBox ID="txtCommentContent" runat="server" TextMode="MultiLine" Height="70px"
                Width="574px"></asp:TextBox>
        </div>
        <div>
            <asp:Button ID="btnPost" runat="server" Text="发 表" OnClick="btnPost_Click" />
        </div>
    </div>
    <script type="text/javascript">
        commentContent = $("<%= txtCommentContent.ClientID %>")
        $("<%= btnPost.ClientID %>").onclick = function () {
            if (commentContent.value.replace(/\s/g, "") == "") {
                alert("请输入评论内容")
                commentContent.value = ""
                commentContent.focus()
                return false
            }
        }
    </script>
</div>
