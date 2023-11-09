<%@ Page language="c#" Inherits="iWebOffice2015.OpenAndSave_PPT" CodeFile="OpenAndSave_PPT.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>在线打开/保存PPT文档</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script src="/js/jquery/1.7.1/jquery.min.js"></script>
<script src="/js/jqueryui/1.8.17/jquery-ui.min.js"></script>
<script src="/js/CommonUtils.js" type="text/javascript"></script>
<script src="/jgfiles/js/WebOffice.js?v=1227"></script>
    <style>
        html, body
        {
            height: 100%;
        }
    </style>

<script type="text/javascript">
 	var WebOfficeObj = new WebOffice2015(); //创建WebOffice对象
</script>


<script language="javascript">
    // 金格MultiPart方式在线打开文档
    function Load() {
        try {
            WebOfficeObj.ServerUrl = "<%=mHttpUrl%>";
            WebOfficeObj.SaveServlet = "/OfficeServer.aspx";
            WebOfficeObj.UserName = "演示人";
            WebOfficeObj.FileName = "iWebOffice2015.pptx";
            WebOfficeObj.FileType = ".pptx";             //FileType:文档类型  .doc  .xls
            WebOfficeObj.ShowWindow = true; 			//true显示进度条//false隐藏进度条
            WebOfficeObj.EditType = "1"; 			//设置加载文档类型 0 锁定文档，1无痕迹模式，2带痕迹模式
            WebOfficeObj.ShowMenu = 0;
            WebOfficeObj.ShowToolBar = 0;
            // WebOfficeObj.SetCaption(WebOfficeObj.UserName + "正在编辑文档");
            SetGraySkin(); 		//设置控件皮肤
            WebOfficeObj.WebObject.Style.ShowOpenProgress = true; //开启打开文档时的进度条

            // 下载文件时访问OfficeServer与其他网页页面session保持一致的说明 （开始）
            // 为了让/OfficeServer这个Servlet和浏览器的其他页面保持session一致，需要在访问OfficeServer之前把其他页面的cookie发送到服务端去，通过调用
            // INetSetCookie方法，参数是服务器url和cookie值。
            mycookie = 'ASP.NET_SessionId=' + "<%=strSessionID%>";
            if (browser == "chrome")
                WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl + "/OfficeServer.aspx", mycookie);
            // 但如果浏览器设置了禁止cookie，那么document.cookie则获取不到有效cookie值，这时候可以通过在客户端创建一个
            // 跟cookie内容值一样的字符串，再把这个字符串当成cookie发送给服务器，也能实现session保持一致
            // 创建的字符串是这样的形式：JSESSIONID=XXXXXXXXXXXXXXXXXXXXXX,
            // XXXX...XXX是服务端的sessionid，可以通过jsp变量的形式发送给客户端
            // varMyCookie = "JSESSIONID=" + "<%=strSessionID%>";	
            // WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl, varMyCookie);	
            // 下载文件时访问OfficeServer与其他网页页面session保持一致的说明 （结束）

            if (WebOfficeObj.WebOpen()) {
                StatusMsg(WebOfficeObj.Status);
            }
        }
        catch (e) {
            StatusMsg(e.description);
        }
    }

    //URL地址打开文档
    function LoadURL() {
        try {
            WebOfficeObj.ServerUrl = "<%=mHttpUrl%>"; //服务器地址
            WebOfficeObj.ShowMenu = 0;
            WebOfficeObj.ShowToolBar = 0;
            SetGraySkin(); 		//设置控件皮肤
            if (WebOfficeObj.WebOpen2("/Document/iWebOffice2015.pptx"))  // 文件在服务器上的相对路径 FileName
            {
                StatusMsg(WebOfficeObj.Status);
            }
        }
        catch (e) {
            StatusMsg(e.description);
        }
    }

    //服务端Servlet方式打开文档
    function LoadServlet() {
        try {
            WebOfficeObj.ServerUrl = "<%=mHttpUrl%>";               // 用来保存文件的Server
            var downloadLink = "<%=mHttpUrl%>" + "/FileDownload.aspx?FileName=" + "/Document/iWebOffice2015.pptx";
            WebOfficeObj.ShowMenu = 0;
            WebOfficeObj.ShowToolBar = 0;
            SetGraySkin(); 		//设置控件皮肤
            if (WebOfficeObj.WebOpen3(downloadLink))  // 文件在服务器上的相对路径 FileName
            {
                StatusMsg(WebOfficeObj.Status);
            }
        }
        catch (e) {
            StatusMsg(e.description);
        }
    }

    //保存文档
    function SaveDocument() {
        WebOfficeObj.FileName = "iWebOffice2015.pptx";
        WebOfficeObj.FileType = ".pptx";
        if (WebOfficeObj.WebSave()) {    //交互OfficeServer的OPTION="SAVEFILE"
            WebOfficeObj.WebClose();
            window.close();
        } else {
            WebOfficeObj.Alert(WebOfficeObj.Status);
            StatusMsg(WebOfficeObj.Status);
        }
    }

    //设置页面中的状态值
    function StatusMsg(mValue) {
        try {
            document.getElementById('StatusBar').value = mValue;
        } catch (e) {
            return false;
        }
    }

    //烟枪灰皮肤
    function SetGraySkin() {
        //参数顺序依次为：控件标题栏颜色、自定义菜单开始颜色、自定义工具栏按钮开始颜色、自定义工具栏按钮结束颜色、
        //自定义工具栏按钮边框颜色、自定义工具栏开始颜色、控件标题栏文本颜色（默认值为：0x000000）
        if (!WebOfficeObj.WebSetSkin(0xdbdbdb, 0xeaeaea, 0xeaeaea, 0xdbdbdb, 0xdbdbdb, 0xdbdbdb, 0x000000))
            WebOfficeObj.Alert(WebOfficeObj.Status);
    }

    function OnUnLoad() {
        WebOfficeObj.WebClose();
    }


</script>

<script language="javascript" for="WebOffice" event="OnReady()">
   WebOfficeObj.setObj(document.getElementById('WebOffice'));//给2015对象赋值
   Load();//避免页面加载完，控件还没有加载情况
</script>

<!--以下是多浏览器的事件方法 -->
<script>
    function OnReady() {
        WebOfficeObj.setObj(document.getElementById('WebOffice')); //给2015对象赋值
       // Load();//避免页面加载完，控件还没有加载情况
        setTimeout(window.onload = function () { Load() }, 500); //IE和谷歌可以直接调用Load方法，火狐要在页面加载完后去调用
    }
</script>
<script type="text/javascript">
    var KGBrowser = new KGBrowser();
    function RunKGBrowser() {
        var strOptions = '$skin=1$tabshow=1';
        var str2 = "/jgfiles/KGBrowser/Word.aspx" + window.location.search;
        KGBrowser.openWindowBrowser(str2 + "$skin=0$titlecolor=f6f6f6$tabshow=1", strOptions, false);
    }
    var abc = isSupportOfficePlug();
    if (!abc) {
        RunKGBrowser();
        setTimeout(function () {
            if (parent && parent.$('.file-preview-head-right')) {
                parent.$('.file-preview-head-right').trigger('click');
            }
        }, 2000);
    }
</script>
</head>

<body  onbeforeunload="OnUnLoad()" onUnload="OnUnLoad();">
	<div style="width: 100%; height: 100%">
		<div style="width: 100%;">
            <input type="button" id="RunKGBrowser" class="btn_RunKGBrowser" onclick="javascript: RunKGBrowser()" value="用KGBrowser查看" />
        	<!-- 以MultiPart方式下载文档,设置文件处理Servelet，打开和保存都用这个Servelet处理 -->
			<input style="color:Red;" type=button value="MultiPart方式打开文档" onclick="OnUnLoad();Load()">
			<!-- URL地址打开文档，WebOpen2的参数是文件在服务器上的相对路径 -->
			<input style="color:Red;" type=button value="URL地址打开文档" onclick="OnUnLoad();LoadURL()">
			<!-- 服务端Servlet打开文档，WebOpen3的参数是文件在服务器上的相对路径 -->
			<input style="color:Red;" type=button value="服务端Servlet打开文档" onclick="OnUnLoad();LoadServlet()">
			<input style="color:Red;" type=button value="保存文档到服务器" onclick="SaveDocument();">
			<input style="color:Red;" type=button value="打开本地文档(有窗口)" onclick="WebOfficeObj.WebOpenLocal()">
			<input style="color:Red;" type=button value="保存本地文档(有窗口)" onclick="WebOfficeObj.WebSaveLocal()">
			<input style="color:Red;" id="StatusBar" type="text" name="StatusBar" readonly  style="WIDTH:40%">&nbsp;|←状态信息
		</div>
		<div id="OfficeDiv" style="width: 100%; height: 98%;" ><script type="text/javascript" src="../js/iWebOffice2015.js"></script><object></object></div>
	</div>
    
</body>
</html>