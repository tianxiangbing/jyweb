<%
'**************************
	'后台程序配置文件
	'定义常量,首字母大写
'**************************
'Option Explicit
'on error resume next
response.Buffer = true


Const IsSqlDataBase=0					'定义数据库类别，0为Access数据库，1为SQL数据库

Const NewsClassNum=1 					'新闻分类数
Const ProClassNum=1 					'产品分类数
Const DownloadClassNum=1 				'下载类别

Const EnableUploadPic="jpg|gif"			'允许上传的产品图片格式
Const EnableUploadPicSize=1048576		'允许上传的产品图片大小 单位Byte(字节) 1M 注意:1KB≠1000B 而是 1KB=1024B
Const EnableUploadAd="jpg|gif|swf"		'允许上传的广告文件格式
Const EnableUploadAdSize=1048576		'允许上传的广告文件大小 单位Byte(字节) 1M
Const EnableUploadFile="doc|xls|pdf|rar|zip|txt"		'允许上传的文档格式
Const EnableUploadFileSize=10485760		'允许上传的文档大小  10M

'Const EnableMessageCheck="Yes"        '是否启用留言审核功能
'Const EnableMessageReply="Yes"        '是否启用留言回复功能





%>
