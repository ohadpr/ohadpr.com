<%
Dim savefile
Dim tempFile

tempFile = Request.Form("file")
				
savefile = Server.MapPath(tempFile)
Dim fs
Set fs=Server.CreateObject("Scripting.FileSystemObject")
If fs.FileExists(savefile) = true Then
    fs.DeleteFile(savefile)
End If
Set fs=nothing

Response.Write(savefile)
Response.Status = 200
%>