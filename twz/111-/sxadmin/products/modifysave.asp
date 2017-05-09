<!--#include file="../inc/subCode.asp"-->
<%
 if request.querystring("action")="edit" then' 取提交过来的数据
 id=request.QueryString("id")
 checkId(id)
 page=request.QueryString("page")
 
'注意取产品内容的方法，因为对大表单的自动处理，一定要使用循环，否则大于100K的内容将取不到，单个表单项的限制为102399字节（100K左右）
	Dim  sContent, proPic, proClass, isSuggest, IsNew, EnProName, proName, power
	proClass = Request.Form("proClass")
	proName = htmlEncode(Request.Form("proName"))
	EnProName = htmlEncode(Request.Form("EnProName"))
	power = Request.Form("power")
	languages = Request.Form("languages")
	proPic = Request.Form("proPic")
	isSuggest=request.Form("isSuggest")
	IsNew=request.Form("IsNew")
	
	' 开始：eWebEditor编辑区取值-----------------
	scontent = ""
	For i = 1 To Request.Form("content").Count
		scontent = scontent & Request.Form("content")(i)
	Next
	scontent=getSafeContent(scontent)
	
	EnContent = ""
	For i = 1 To Request.Form("EnContent").Count
		EnContent = EnContent & Request.Form("EnContent")(i)
	Next
	EnContent=getSafeContent(EnContent)
	' 结束：eWebEditor编辑区取值-----------------

	' 上传后保存到本地服务器的文件名（不带路径），多个以"|"分隔
	Dim sSaveFileName,sSavePathFileName
	' 上传后保存到本地服务器的路径文件名，多个以"|"分隔
	SaveFileName = GetSafeStr(Request.Form("d_savefilename"))
	SavePathFileName = GetSafeStr(Request.Form("d_savepathfilename"))
	
	SaveFileName=CheckSaveFileNamePic(SaveFileName,scontent)	'主要解决编辑器中删除图片后，保存图片字段的调整。
	SavePathFileName=CheckSaveFileNamePic(SavePathFileName,scontent)
	'
'	sql="update products set ProName='"&ProName&"',ClassId="&proClass&",content='"&scontent&"',Power="&Power&",isSuggest="&isSuggest&",editTime=now(),proPic='"&proPic&"',ProSmallPic='"&ProSmallPic&"',d_savefilename='"&SaveFileName&"',d_savepathfilename='"&SavePathFileName&"' where id="&id
'	conn.execute(sql)
'	ok "修改成功！","manage.asp?page="&page

'保存内容
'on error resume next
set oRs = server.CreateObject("adodb.recordset")
sql = "select * from products where ProId="&Cint(id)
response.Write(sql)
oRs.open sql,conn,3,2

oRs("proName") = proName
oRs("EnProName") = EnProName
oRs("ClassId") = Cint(proClass)

oRs("proPic") = proPic
if len(proPic)>16 then
	oRs("ProSmallPic")="upfile/product"&"small_"&right(proPic,len(proPic)-16)
end if 

oRs("power") = Cint(power)
oRs("languages") = languages
oRs("sContent") = sContent
oRs("EnContent") = EnContent
oRs("d_savefilename") = d_savefilename
oRs("d_savepathfilename") = d_savepathfilename
oRs("addtime") = Now()

if oRs("isSuggest") = yes then 
	oRs("isSuggest") = true
else
	oRs("isSuggest") = false
end if 

if oRs("IsNew") = yes then
	oRs("IsNew") = true
else
	oRs("IsNew") = false
end if 
oRs.update
if err<>0 then
	erro("修改失败，请检查字段") 
else
	ok "修改成功","manage.asp?page="&page
end if 
oRs.close
set oRs=nothing
end if
%>