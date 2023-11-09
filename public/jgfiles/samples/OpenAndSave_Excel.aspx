<%@ Page Language="c#" Inherits="WebClient.jgfiles.samples.OpenAndSave_Excel" CodeBehind="OpenAndSave_Excel.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>在线打开/保存Excel文档</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="/js/jquery/1.7.1/jquery.min.js"></script>
    <script src="/js/jqueryui/1.8.17/jquery-ui.min.js"></script>
    <script src="/js/CommonUtils.js" type="text/javascript"></script>
    <script src="/jgfiles/js/WebOffice.js?v=1227"></script>
    <style>
        html, body {
            height: 100%;
        }
        .warningtext{
            font-size:13px;
            color:red;
            margin:6px;
        }
        body #iframe {
            position: fixed;
            background-color: white;
            width: 60%;
            left: 20%;
            top: 50%;
            margin-top: -300px;
            border-radius: 7px;
            display: block;
            height: 620px;
            border: 0;
            overflow: hidden;
            z-index: 9999;
            display: none;
        }
        .popup-mask {
            background: url(/img/bgOverlayDialogBackground.png);
            background-color: transparent;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            z-index: 999;
        }
    </style>
    <script type="text/javascript">
        var WebOfficeObj = new WebOffice2015(); //创建WebOffice对象
        var IsIWebOffice2015 = false;
        function DownIWebOffice2015() {
            if (!IsIWebOffice2015) {
                var mFlag = window.confirm("检测到未安装插件，是否下载插件？");
                if (mFlag) {
                    window.open("/jgfiles/resource/iWebOffice2015.msi");
                }
            }
        }
    </script>
    <script language="javascript">

        // 金格MultiPart方式在线打开文档
        function Load() {

            try {
                <%--WebOfficeObj.RecordID = "<%=mRecordID%>";            //RecordID:本文档记录编号
                WebOfficeObj.Template = "<%=mTemplate%>";            //Template:模板编号
                WebOfficeObj.FileName = "<%=mFileName%>";            //FileName:文档名称
                WebOfficeObj.FileType = "<%=mFileType%>";            //FileType:文档类型  .doc  .xls  .wps
                WebOfficeObj.UserName = "<%=mUserName%>";            //UserName:操作用户名，痕迹保留需要
                WebOfficeObj.EditType = "<%=mEditType%>";            //EditType:编辑类型  方式一、方式二  <参考技术文档>
                //第一位可以为0,1,2,3 其中:0不可编辑;1可以编辑,无痕迹;2可以编辑,有痕迹,不能修订;3可以编辑,有痕迹,能修订；
                //第二位可以为0,1 其中:0不可批注,1可以批注。可以参考iWebOffice2009的EditType属性，详细参考技术白皮书
                WebOfficeObj.MaxFileSize = 4 * 1024;               //最大的文档大小控制，默认是8M，现在设置成4M。
                WebOfficeObj.Language = "CH";                        //Language:多语言支持显示选择   CH简体 TW繁体 EN英文
                //webform.WebOffice.ShowWindow = true;                  //控制显示打开或保存文档的进度窗口，默认不显示
                WebOfficeObje.PenColor = "#FF0000";                   //PenColor:默认批注颜色
                wWebOfficeObj.PenWidth = "1";                         //PenWidth:默认批注笔宽
                wWebOfficeObj.Print = "1";                            //Print:默认是否可以打印:1可以打印批注,0不可以打印批注
                wWebOfficeObj.ShowToolBar = "0";                      //ShowToolBar:是否显示工具栏:1显示,0不显示
                
                //以下为自定义工具栏按钮↓ 参数一:Index按钮编号,参数二:Caption按钮显示内容,参数三:Icon图标名称
                ///webform.WebOffice.AppendTools("11", "隐藏手写批注", 11);  //在OnToolsClick中的 vIndex=11 ,vCaption="隐藏手写批注";
                ///webform.WebOffice.AppendTools("12", "显示手写批注", 12);  //在OnToolsClick中的 vIndex=12 ,vCaption="显示手写批注";
                ///webform.WebOffice.AppendTools("13", "-", 0);
                //以上为自定义工具栏按钮↑

                WebOfficeObj.ShowMenu = "1";                         //控制整体菜单显示
                //以下为自定义菜单↓
                WebOfficeObj.AppendMenu("1", "打开本地文件(&L)");
                WebOfficeObj.AppendMenu("2", "保存本地文件(&S)");
                WebOfficeObj.AppendMenu("3", "保存远程文件(&U)");
                WebOfficeObj.AppendMenu("4", "-");
                ///webform.WebOffice.AppendMenu("5", "签名印章(&Q)");
                /// webform.WebOffice.AppendMenu("6", "验证签章(&Y)");
                ///webform.WebOffice.AppendMenu("7", "-");
                ///webform.WebOffice.AppendMenu("8", "保存版本(&B)");
                ///webform.WebOffice.AppendMenu("9", "打开版本(&D)");
                ///webform.WebOffice.AppendMenu("10", "-");
                ///webform.WebOffice.AppendMenu("11", "保存并退出(&E)");
                ///webform.WebOffice.AppendMenu("12", "-");
                WebOfficeObj.AppendMenu("13", "打印文档(&P)");
                //以上为自定义菜单↑
                ///webform.WebOffice.DisableMenu("宏(&M);选项(&O)...");    //禁止某个（些）菜单项
                WebOfficeObj.ShowType = "<%=mShowType%>";          --%>    //文档显示方式  1:表示文字批注  2:表示手写批注  0:表示文档核稿
                
                WebOfficeObj.ServerUrl = "<%=mHttpUrl%>";
                WebOfficeObj.SaveServlet = "<%=mServerUrl%>";
                WebOfficeObj.RecordID = "<%=mRecordID%>"; //文件ID
                WebOfficeObj.Template = "<%=mTemplate%>";            //Template:模板编号
                WebOfficeObj.UserName = "<%=mUserName%>";            //UserName:操作用户名，痕迹保留需要
                WebOfficeObj.FileName = "<%=mFileName%>";            //FileName:文档名称
                WebOfficeObj.FileType = "<%=mFileType%>";            //FileType:文档类型  .doc  .xls  .wps
                WebOfficeObj.EditType = "<%=mEditType%>";           //EditType:编辑类型  方式一、方式二  <参考技术文档>  
                WebOfficeObj.fileSource = "<%=_fileSource%>";//1001:附件  100100:文件
                WebOfficeObj.ShowMenu = 0;
                WebOfficeObj.ShowToolBar = 0;

                SetGraySkin(); 		//设置控件皮肤
                WebOfficeObj.obj.FuncExtModule.FileType = WebOfficeObj.FileType;
                WebOfficeObj.obj.FuncExtModule.WebCreateProcess();          //创建空进程优化打开慢
                WebOfficeObj.WebObject.Style.ShowOpenProgress = true; //开启打开文档时的进度条

                // 下载文件时访问OfficeServer与其他网页页面session保持一致的说明 （开始）
                // 为了让/OfficeServer这个Servlet和浏览器的其他页面保持session一致，需要在访问OfficeServer之前把其他页面的cookie发送到服务端去，通过调用
                // INetSetCookie方法，参数是服务器url和cookie值。
                mycookie = 'ASP.NET_SessionId=' + "<%=strSessionID%>";
                if (browser == "chrome")
                    WebOfficeObj.INetSetCookie(WebOfficeObj.ServerUrl + "<%=mServerUrl%>", mycookie);
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
                if (WebOfficeObj.WebOpen2("/Document/sample.xlsx"))  // 文件在服务器上的相对路径 FileName
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
                var downloadLink = "<%=mHttpUrl%>" + "/FileDownload.aspx?FileName=" + "/Document/sample.xlsx";
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
            WebOfficeObj.FileName = "sample.xlsx";
            WebOfficeObj.FileType = ".xlsx";
            if (WebOfficeObj.WebSave()) {    //交互OfficeServer的OPTION="SAVEFILE"
                WebOfficeObj.WebClose();
                window.close();
            } else {
                alert(WebOfficeObj.Status);
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
    <!--以下是多浏览器的事件方法 -->
    <script>
        function OnReady() {
            WebOfficeObj.setObj(document.getElementById('WebOffice')); //给2015对象赋值
            //Load();//避免页面加载完，控件还没有加载情况
            setTimeout(window.onload = function () { Load() }, 500); //IE和谷歌可以直接调用Load方法，火狐要在页面加载完后去调用
        }
    </script>
    <script language="javascript" for="WebOffice" event="OnReady()">
	 WebOfficeObj.setObj(document.getElementById('WebOffice'));
     Load();//避免页面加载完，控件还没有加载情况
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
    <script type="text/javascript" src="/js/alert.js"></script>
</head>
<body onunload="OnUnLoad()" onbeforeunload="OnUnLoad()">
    <div style="width: 100%; height: 100%">
          <div style="width: 100%; text-align: right;">
                <select name="dropOpenType" id="dropOpenType" onchange="linkDisabled(0)" style="height: 23px;position: relative;top:-1px;">
                     <option selected="selected" value="0">新建文档</option>
                    <option  value="1">Word文档</option>
                    <option value="2">Excel文档</option>
                    <%--     <option value="3">新建PDF文档</option>--%>
                </select>
                <%--<select id="DropDownTemplate" name="DropDownTemplate" style="height: 25px;">
                    <option value="">--选择模板--</option>
                    <%=TemplateOptions%>
                </select>&nbsp;--%>
                <input type="button" id="RunKGBrowser" class="btn_RunKGBrowser" onclick="javascript: RunKGBrowser()"
                    value="用KGBrowser查看" />
                <input type="button" id="btnloadtemp" class="btn_shuaxin" onclick="javascript: LoadTemplate(); return false;"
                    value="应用模板" />
                <input type="button" class="btn_sjbd" onclick="javascript: WebOpenSignature(); return false;"
                    value="电子签章" />
                <!--WebShowSignature
                <input type="button" class="btn_sjbd" onclick="javascript:WebDesign();return false;"
                    value="设计表单" />&nbsp;-->
                <input type="button" class="btn_shuaxin" onclick="javascript: WebReFresh(); return false;"
                    value="刷新" />
                <input type="button" class="btn_cxzr" onclick="javascript: LoadDocument(); return false;"
                    value="重新载入" />
                <input type="button" class="btn_print" onclick="javascript: WebOpenPrint();" value="打印" />
                <input type="button" class="btn_cwbd" onclick="javascript: WebSaveLocal();" value="另存为本地" />
                <input type="button" class="btn_cwbd" onclick="javascript: WebSaveLocalPDF();" value="另存为本地PDF" />
                <!--<input type="button" class="btn_ylbd" onclick="javascript:PreViewHtml();" value="预览表单" />&nbsp;
                <input type="button" class="btn_open" onclick="javascript:WebOpenLocal();" value="打开本地" />&nbsp;                
                <input type="button" class="btn_delete" onclick="javascript:CallDelete();" value="删除" />&nbsp;-->
                <input type="button" class="btn_delete" value="文字批注"  <%=mDisabled%> <%=mDisabledSave%> onclick='webform.WebOffice.FuncExtModule.EditType = 1;' />
                <input type="button" class="btn_revision" value="显示痕迹" <%=mDisabled%> <%=mDisabledSave%> onclick="ShowRevision(true)">
                <input type="button" class="btn_revision" value="隐藏痕迹" <%=mDisabled%> <%=mDisabledSave%> onclick="ShowRevision(false)">
                <%--<input type="button" class="btn_revision" value="获取痕迹" <%=mDisabled%> <%=mWord%>onclick="WebGetRevisions()">--%>
                <!--<input type=button class="btn_revision" value="清除痕迹" <%=mDisabled%> <%=mDisabledSave%> onClick="WebAcceptAllRevisions()">-->

                <input type="button" class="" value="接受修订" <%=mDisabled%> <%=mDisabledSave%> onclick="WebAcceptEdit()" />
                <input type="button" id="btnsavedb" class="btn_preserve" <%=mDisabled%> <%=mDisabledSave%> onclick="javascript: CallSave();" value="  保存 " />
                <input type="button" id="btnFullScreen" class="btn_preserve" style="display: none" onclick="javascript: window.open(window.location);" value="全屏" />
                <input type="button" id="btnClose" class="btn_close" style="display: none" onclick="javascript: window.close();" value="关闭返回上一页" />
            </div>
        <div id="OfficeDiv" style="width: 100%; height: 98%;">
            <script type="text/javascript" src="../js/iWebOffice2015.js"></script>
            <object></object></div>
    </div>
     <iframe id="iframe" frameborder="0" src=""></iframe>
    <div class="popup-mask"></div>
    
</body>
</html>
