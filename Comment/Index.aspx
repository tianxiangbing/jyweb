<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" CodeBehind="Index.aspx.cs"
    Inherits="UserControls.Index" %>

<%@ Register Src="Comment.ascx" TagName="Comment" TagPrefix="uc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <uc1:Comment ID="Comment1" runat="server" ModelID="2" ArticleID="2" />
    </div>
    </form>
</body>
</html>
