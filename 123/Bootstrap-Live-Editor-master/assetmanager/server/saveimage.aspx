<%@ Page Language="VB" %>
<%@ Import Namespace="System.Collections.Generic"%>
<%@ Import Namespace="System.Web.UI"%>
<%@ Import Namespace="System.Web.UI.WebControls"%>
<%@ Import Namespace="System.IO"%>
<script runat="server">
    Protected Sub Page_Load(sender As Object, e As System.EventArgs)

        Dim imageData As String = Request.Form("hidImage")
        Dim tempPath As String = Request.Form("hidPath") '"/LiveEditor/images/"        
        Dim filename As String = Request.Form("hidFile")
        
        Dim savepath As String = Context.Server.MapPath(tempPath)
        Dim filenew As String = ""
        Dim results As New ArrayList
        
        Dim suffix As String = DateTime.Now.ToString().Replace("/", "-").Replace(" ", "-").Replace(":", "")
        filenew = tempPath + filename + "-" + suffix + ".png"
        
        Dim fileNameWitPath As String = savepath + filename + "-" + suffix + ".png"
        Dim fs As FileStream = New FileStream(fileNameWitPath, FileMode.Create)
        Using fs
            Dim bw As BinaryWriter = New BinaryWriter(fs)
            Using bw

                'Dim data As Byte() = Convert.FromBase64String(imageData)

                bw.Write(Convert.FromBase64String(imageData))

                bw.Close()
            End Using
        End Using
        Response.Write("<html><body onload=""parent.imageSaved('" & filenew & "')""></body></html>")
    End Sub
</script>

