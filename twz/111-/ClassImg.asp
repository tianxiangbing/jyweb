<%
Class ImgWHInfo '获取图片宽度和高度的类，支持JPG，GIF，PNG，BMP
    Dim ASO
    Private Sub Class_Initialize
        Set ASO=Server.CreateObject("ADODB.Stream")
        ASO.Mode=3
        ASO.Type=1
        ASO.Open
    End Sub
    Private Sub Class_Terminate
        Err.Clear
        Set ASO=Nothing
    End Sub 

    Private Function Bin2Str(Bin)
        Dim I, Str
        For I=1 To LenB(Bin)
            clow=MidB(Bin,I,1)
            If ASCB(clow)<128 Then
                Str = Str & Chr(ASCB(clow))
            Else
                I=I+1
                If I <= LenB(Bin) Then Str = Str & Chr(ASCW(MidB(Bin,I,1)&clow))
            End If
        Next
        Bin2Str = Str
    End Function
      
    Private Function Num2Str(Num,Base,Lens)
        Dim Ret
        Ret = ""
        While(Num>=Base)
            Ret = (Num Mod Base) & Ret
            Num = (Num - Num Mod Base)/Base
        Wend
        Num2Str = Right(String(Lens,"0") & Num & Ret,Lens)
    End Function
      
    Private Function Str2Num(Str,Base) 
        Dim Ret,I
        Ret = 0 
        For I=1 To Len(Str) 
            Ret = Ret *base + Cint(Mid(Str,I,1)) 
        Next 
        Str2Num=Ret 
    End Function 
      
    Private Function BinVal(Bin) 
        Dim Ret,I
        Ret = 0 
        For I = LenB(Bin) To 1 Step -1 
            Ret = Ret *256 + AscB(MidB(Bin,I,1)) 
        Next 
        BinVal=Ret 
    End Function 
      
    Private Function BinVal2(Bin) 
        Dim Ret,I
        Ret = 0 
        For I = 1 To LenB(Bin) 
            Ret = Ret *256 + AscB(MidB(Bin,I,1)) 
        Next 
        BinVal2=Ret 
    End Function 
      
    Private Function GetImageSize(filespec)
        Dim bFlag
        Dim Ret(3) 
        ASO.LoadFromFile(filespec) 
        bFlag=ASO.Read(3) 
        Select Case Hex(binVal(bFlag)) 
        Case "4E5089": 
            ASO.Read(15) 
            ret(0)="PNG" 
            ret(1)=BinVal2(ASO.Read(2)) 
            ASO.Read(2) 
            ret(2)=BinVal2(ASO.Read(2)) 
        Case "464947": 
            ASO.read(3) 
            ret(0)="gif" 
            ret(1)=BinVal(ASO.Read(2)) 
            ret(2)=BinVal(ASO.Read(2)) 
        Case "535746": 
            ASO.read(5) 
            binData=ASO.Read(1) 
            sConv=Num2Str(ascb(binData),2 ,8) 
            nBits=Str2Num(left(sConv,5),2) 
            sConv=mid(sConv,6) 
            While(len(sConv)<nBits*4) 
                binData=ASO.Read(1) 
                sConv=sConv&Num2Str(AscB(binData),2 ,8) 
            Wend 
            ret(0)="SWF" 
            ret(1)=Int(Abs(Str2Num(Mid(sConv,1*nBits+1,nBits),2)-Str2Num(Mid(sConv,0*nBits+1,nBits),2))/20) 
            ret(2)=Int(Abs(Str2Num(Mid(sConv,3*nBits+1,nBits),2)-Str2Num(Mid(sConv,2*nBits+1,nBits),2))/20) 
        Case "FFD8FF": 
            Do 
            Do: p1=binVal(ASO.Read(1)): Loop While p1=255 And Not ASO.EOS 
            If p1>191 And p1<196 Then Exit Do Else ASO.read(binval2(ASO.Read(2))-2) 
            Do:p1=binVal(ASO.Read(1)):Loop While p1<255 And Not ASO.EOS 
            Loop While True 
            ASO.Read(3) 
            ret(0)="JPG" 
            ret(2)=binval2(ASO.Read(2)) 
            ret(1)=binval2(ASO.Read(2)) 
        Case Else: 
            If left(Bin2Str(bFlag),2)="BM" Then 
                ASO.Read(15) 
                ret(0)="BMP" 
                ret(1)=binval(ASO.Read(4)) 
                ret(2)=binval(ASO.Read(4)) 
            Else 
                    ret(0)="" 
            End If 
        End Select 
        ret(3)="width=""" & ret(1) &""" height=""" & ret(2) &"""" 
        getimagesize=ret 
    End Function 
      
    Public Function imgW(IMGPath)
        Dim FSO,IMGFile,FileExt,Arr
        Set FSO = Server.CreateObject("Scripting.FileSystemObject") 
        If (FSO.FileExists(IMGPath)) Then 
            Set IMGFile = FSO.GetFile(IMGPath) 
            FileExt=FSO.GetExtensionName(IMGPath) 
            Select Case FileExt 
                Case "gif","bmp","jpg","png": 
                Arr=GetImageSize(IMGFile.Path) 
                imgW = Arr(1) 
            End Select 
            Set IMGFile=Nothing 
        Else
            imgW = 0
        End If     
        Set FSO=Nothing 
    End Function 
     
    Public Function imgH(IMGPath)
        Dim FSO,IMGFile,FileExt,Arr
        Set FSO = server.CreateObject("Scripting.FileSystemObject") 
        If (FSO.FileExists(IMGPath)) Then 
            Set IMGFile = FSO.GetFile(IMGPath) 
            FileExt=FSO.GetExtensionName(IMGPath) 
            Select Case FileExt 
                Case "gif","bmp","jpg","png": 
                Arr=getImageSize(IMGFile.Path) 
                imgH = Arr(2) 
            End Select 
            Set IMGFile=Nothing 
        Else
            imgH = 0 
        End If     
        Set FSO=Nothing 
    End Function 
End Class
%>