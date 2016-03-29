<%

Private Function RSBinaryToString(xBinary)

    Dim Binary
    'MultiByte data must be converted To VT_UI1 | VT_ARRAY first.
    If vartype(xBinary)=8 Then Binary = MultiByteToBinary(xBinary) Else Binary = xBinary

    Dim RS, LBinary
    Const adLongVarChar = 201
    Set RS = CreateObject("ADODB.Recordset")
    LBinary = LenB(Binary)

    If LBinary>0 Then
        RS.Fields.Append "mBinary", adLongVarChar, LBinary
        RS.Open
        RS.AddNew
        RS("mBinary").AppendChunk Binary
        RS.Update
        RSBinaryToString = RS("mBinary")
    Else
        RSBinaryToString = ""
    End If
End Function

Function MultiByteToBinary(MultiByte)

    Dim RS, LMultiByte, Binary
    Const adLongVarBinary = 205
    Set RS = CreateObject("ADODB.Recordset")
    LMultiByte = LenB(MultiByte)
    If LMultiByte>0 Then
        RS.Fields.Append "mBinary", adLongVarBinary, LMultiByte
        RS.Open
        RS.AddNew
        RS("mBinary").AppendChunk MultiByte & ChrB(0)
        RS.Update
        Binary = RS("mBinary").GetChunk(LMultiByte)
    End If
    MultiByteToBinary = Binary
End Function

Dim imageData
Dim tempPath
Dim filename

imageData = Request.Form("hidImage")
tempPath = Request.Form("hidPath") '"/LiveEditor/images/"
filename= Request.Form("hidFile")

Dim savepath
savepath = Server.MapPath(tempPath)

Dim filenew
Dim suffix
suffix = year(date) & "-" & month(date)  & "-" & day(date) & "-" & hour(time) & "-" & minute(time) & "-" & second(time)

filenew = tempPath & filename & "-" & suffix & ".png"

Dim fileNameWitPath

fileNameWitPath = savepath & "\" & filename & "-" & suffix & ".png"
Set tmpDoc = Server.CreateObject("MSXML2.DomDocument")

'convert to binary
Set nodeB64 = tmpDoc.CreateElement("b64")
nodeB64.DataType = "bin.base64" ' stores binary as base64 string
nodeB64.Text = Mid(imageData, InStr(imageData, ",") + 1) ' append data text (all data after the comma)

'save to file
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.CreateTextFile(fileNameWitPath)
objFile.Write(RSBinaryToString(nodeB64.NodeTypedValue))
objFile.Close
Set objFile=Nothing
Set objFSO=Nothing

Response.Write("<html><body onload=""parent.imageSaved('" & filenew & "')""></body></html>")


%>
