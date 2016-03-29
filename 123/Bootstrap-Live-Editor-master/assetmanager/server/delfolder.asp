<%
Dim savefile
Dim tempFile

tempPath = Request.Form("folder")
				
savePath = Server.MapPath(tempPath)
Dim fs
Set fs=Server.CreateObject("Scripting.FileSystemObject")
if fs.FolderExists(savePath) = true then
    fs.DeleteFolder(savePath)
End If
Set fs=nothing

Response.Write(tempPath)
Response.Status = 200
%>