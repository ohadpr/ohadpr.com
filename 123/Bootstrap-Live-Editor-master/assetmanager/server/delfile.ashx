<%@ WebHandler Language="VB" Class="UploadVB" %>

Imports System
Imports System.Web
Imports System.IO

Public Class UploadVB : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim postedFile As HttpPostedFile = context.Request.Files("Filedata")

        Dim savefile As String = ""
        Dim tempFile As String = ""

        tempFile = context.Request("file")
				
        savefile = context.Server.MapPath(tempFile)
        If File.Exists(savefile) Then
            File.Delete(savefile)
        End If

        context.Response.Write(savefile)
        context.Response.StatusCode = 200
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class