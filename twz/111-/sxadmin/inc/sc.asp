<!--#include file="config.asp"-->
<!--#include file="../judge2.asp"-->
<!--#include file="sc.inc"-->
<!--#include file="function.asp"-->
<!--#include file="common.asp"-->
<style>
td{font-size:9pt;line-height:120%;color:#353535} 
body{font-size:9pt;line-height:120%} 

a:link          { color: #000000; text-decoration: none }
a:visited       { color: #000000; text-decoration: none }
a:active        { color: #000000; text-decoration: none }
a:hover         { color: #336699; text-decoration: none; position: relative; right: 0px; top: 1px }
</style>
<%
response.Write("<script type='text/javascript'>parent.document.getElementById(""uploadInfo"").innerHTML='';</script>")
response.Write("<script type='text/javascript'>parent.document.getElementById(""uploadFrame"").width=350;</script>")
response.Write("<script type='text/javascript'>parent.document.getElementById(""uploadFrame"").height=35;</script>")

if not IsSelfPost then
 	erro "请通过网站提交数据!"
end if

'on error resume next
server.ScriptTimeout=300 '单位秒 即5分钟 
dim upload,file,formName,formPath

set upload=new upload_file '建立上传对象

if err then
	'err.clear
	'ErrInfo Err.Description
	'ErrInfo "文件太大,请重新上传"
end if

'接收表单值
filepath=trim(upload.form("filepath"))''得到上传目录
filelx=trim(upload.form("filelx"))'得到允许的文件类型
enfileSize=cLng(trim(upload.form("enfileSize")))'得到允许的文件大小
parentFormName=upload.form("FormName")
EditName=upload.form("EditName")

if filepath="" then 
 ErrInfo "请先输入上传目录!"
end if
if right(filepath,1)<>"/" then filepath=filepath&"/"  ''在目录后加(/)

for each formName in upload.objFile ''列出所有上传了的文件
	set file=upload.file(formName)  ''生成一个文件对象
	fileExt=lcase(file.FileExt)	'得到文件的扩展名.
 
	if file.FileSize<0 then         ''如果 FileSize > 0 说明有文件数据
		ErrInfo "请先选择你要上传的文件！"
	end if	

	if instr(lcase(filelx),lcase(fileExt))=0 then 	
		ErrInfo "只能上传"&filelx&"格式的文件！"
	end if
	
	if file.filesize>enfileSize then
			ErrInfo "最大只能上传 "&CheckSize(enfileSize)&" 的文件！"
	end if
	
	filenamepre=randName	'randName函数
	
	file.SaveAs Server.mappath("../../"&filepath&filenamepre&"."&fileExt)   ''保存文件
	
	if(fileext="jpg" or fileext="gif") then
		call smallpic(filepath&filenamepre&"."&fileExt)'缩略图
		'call JpegPersits(FileName)  '水印
  	end if 

	response.write "<script>parent."&parentFormName&"."&EditName&".value='"&filepath&filenamepre&"."&fileExt&"'</script>"  '返回上传路径
 	if filelx="doc" then 
      response.write "<script>parent."&parentFormName&".sizes.value='"&file.FileSize&"'</script>"
	end if


	response.Write("上传成功，<a href='#' onclick=history.go(-1) >我要重新上传。</a>")
	
	set file=nothing
next
  
set upload=nothing


	
sub ErrInfo(Msg)
 set upload=nothing
 response.write "<span style=""font-family: 宋体; font-size: 9pt;color:red;"">"&Msg&"　[ <a href='javascript:history.back()'>重新上传</a> ]</span>"
 response.end
end sub

sub smallpic(FileName)  '产生缩略图
	Set Jpeg = Server.CreateObject("Persits.Jpeg")
	Path = Server.MapPath("../../"&FileName)
	Jpeg.Open Path
	
	w=Jpeg.Width   '读取原图宽高
	h=Jpeg.Height 
	
	sw=200	'设置转换值
	sh=200 	
		
	'高或宽比框大时处理图片的缩放 框大小为88*73 先考虑w,h与框架的关系,再考虑w与h的关系(包括w=h)
	if(w>sw or h>sh) then  
		if w>h then
		   h=(sw*h)/w
		   w=sw
		elseif w<h then
		   w=(sh*w)/h
		   h=sh
		else  'w=h时 设置转换值小的为定值
		   if sw>sh then
			 w=(sh*w)/h
			 h=sh
		   elseif sw<sh then
		     w=sh
			 h=(sw*h)/w
		   else
		   	 w=sw 'todo
			 h=sh
		   end if	 
		end if
	else
		 '图片比框小或相等时,即图片在框内,不处理
	end if

	'response.Write w
	'response.Write h
	
	Jpeg.Width=w    '图片的最终值
	Jpeg.Height=h
	
	
	'Jpeg.Width = 60
	'Jpeg.Height = 50	'Jpeg.Width,Jpeg.Height给他准确的数值，比如Jpeg.Width=120
	'Jpeg.Width = Jpeg.OriginalWidth / 2 
	'Jpeg.Height = Jpeg.OriginalHeight / 2 
	'设置缩略图大小（比例设定为50%），
	Jpeg.Save Server.MapPath("../../"&filepath&"small_"&filenamepre&"."&fileExt)
	
	Set Jpeg = Nothing
End sub	
	

%>
