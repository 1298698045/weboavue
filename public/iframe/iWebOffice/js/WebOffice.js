function WebOffice2015() {
	this.dVersion="3.0.0.2";
    this.dUpdateDate="2016-12-15";
    var ISO;//服务器返回值
    
	var png2 = "hex:89504E470D0A1A0A0000000D4948445200000018000000180806000000E0773DF8000000097048597300000B1200000B1201D2DD7EFC00000122494441544889ED95BD4AC35018869F98C645842A1497CECE422797A290730552C824F5127A25E7120A5D1208DE408EA064C91470EAE05010BA8883A368A59F4B23A50D6D6C9A0EE23B9D9FEFBC0F7C2FE71C4B44A8527B95BAEF0250CB064AA9ADF6CA18630120228808AEEBCAA27CDF5F5A2B5233F34244FE4006FF80B5AAAD2B0882A03A80E779457D9C85F9A410A0A06C601AA6B106E8B4DABD288AEC6D016C603A484C3F190DBB00EF9F1FF5EB73759315940979C91C20190DBB83C4F4CB029C3CF33CC8C62D0AD358E799CF438E0F0E9FADECC3514A8931A6A8BF037C013CBD8C2FF4DDEDFDFC66CFBDBA3C3D693EC0E62D9A00859EF7DDDE64A5D4AF0E6BADD96FD457D6FC645046611AEBF1DBEB1940F3A8F1D869B57B5B05AC52E5197C03B5E7B70EA44B70540000000049454E44AE426082";

	
    this.Ashell = null;
    
	this.RecvPercent = 0;
    this.nTotleBytes = -1;
    this.nRecvedBytes = -1;
    this.nSendedBytes = -1;
    this.FileType = ""; // FileType:文档类型 .doc .xls .wps
    this.obj; 					// obj：object 对象
    this.Status = "";               //Status：状态信息
    // 枚举显示系统和控件定义的相关对话框内容
    this.ShowDialog = {
        DialogNew: 0, // 新建对象
        DialogOpen: 1, // 打开
        DialogSaveAs: 2, // 另存为
        DialogSaveCopyAs: 3, // 另存为拷贝
        DialogPrint: 4, // 打印
        DialogPageSetup: 5, // 打印设置
        DialogProperties: 6
        // 文档属性
    }
    this.FileName = ""; 		//FileName:文档名称

    this.EditType = 0;

	this.UserName ="";
    this.setObj = function (object) {// 设置2015对象
        this.obj = object;
        this.WebObject = this.obj; //设置VBA调用对象

    }

    this.DocType = {// 枚举所有文档类型这里只列举word 0,execl 1
        WORD: 0,
        EXECL: 1
    };
    this.HttpMethod = {
        Get: 0,        //Http对象get方式
        Post: 1      //Http对象post方式
    };

    this.DownloadedFileTempPathName = "";
    this.DOWN = "\\WebOffice\\Down\\"//指定隐藏路径并设置名称
    this.UP = "\\WebOffice\\Up\\"//指定隐藏路径并设置名称

    this.FilePath = null;  //文档路径
    this.TmpFile = null;   //临时下载的文档名称（含完整路径）
    this.tempInsertName = ""; //插入文件的文件名称

    this.DocTypeValue = { DOC: 0, DOCX: 16, XLS: 56, XLSX: 51, WPS: 0, ET: 56 }; //枚举所有的文档类型值用户保存用

    this.DocSuffixType = { 0: ".doc", 12: ".docx", 56: ".xls", 51: ".xlsx", 0: ".wps", 56: ".et" }; //根据打开文档类型，来获取后缀名称

    this.setVersion = -1;
    this.OfficeVersion = { v2003: 1, vOther: 0}  //判断Office版本，这个只要用于保存到本地

    this.WebObject = null; //设置WebObject对象，方便调用VBA 方法

    this.sendMode = null //设置异步调用模式

    this.iWebOfficeTempName = "iWebOfficeTempName.doc"

   //设置控件标题
    this.Caption = "DEMO演示平台";
    this.SetCaption = function(){
	this.Caption="\""+this.UserName+"\"正在编辑文档";
	this.obj.Caption =this.Caption;
    }
    //设置手写签批用户
    this.SetUser = function(username){
		this.obj.User = username;
	}

    this.CheckFile = function(vaul){


        this.obj.bCheckFile = vaul;
    }

    /*
    * @deprecated:新建一个文档。
    */
    this.CreateFile = function () {
		
        var docType = this.getDocType(this.FileType); // 获取文档类型
		
        switch (docType) {
            case this.DocType.WORD:
				
                this.obj.CreateNew("Word.Document"); // 创建word
                break;
            case this.DocType.EXECL:
                this.obj.CreateNew("Excel.Sheet"); // 创建execl
                break;
       
            case this.DocType.PICTURE:
                this.obj.CreateNew("iWebPicture.iWebPictureMain"); // 创建
                break;
            default:
                this.obj.CreateNew("Word.Document"); // 默认创建word文档
                break;
        }
    }

    /*保存文件*/
    this.WebSave = function () {
        var httpclient = this.obj.Http; //设置http对象 
        httpclient.Clear();               
        this.WebSetMsgByName("USERNAME", this.UserName);
        this.WebSetMsgByName("RECORDID", this.RecordID);
        this.WebSetMsgByName("TEMPLATE", this.Template);
        this.WebSetMsgByName("SUBJECT", this.Subject);
        this.WebSetMsgByName("AUTHOR", this.Author);
        this.WebSetMsgByName("HTMLPATH", this.HTMLPath);
        this.WebSetMsgByName("FILETYPE", this.FileType);
        this.WebSetMsgByName("OPTION", "SAVEFILE");
        this.WebSetMsgByName("FILENAME", this.FileName); //加载FileName
		var res = this.WebSaveLocalFile(this.getFilePath() + this.FileName);
		//this.FuncExtModule.alert(this.obj.DocMd5);
		this.WebSetMsgByName("MD5", this.obj.DocMd5); //把前台文档md5值发送给后台
		//alert(res);
		//alert(this.getFilePath() + this.FileName);
		//文档本地保存失败时，不上传到服务器，以免损坏服务器上的原文档
		if(res == 0){
			this.sendMode = "SaveFile";
			if (this.SAVEFILE(httpclient, this.FilePath + this.FileName)) {
				var aaa=httpclient.GetResponseHeader("ISO");//获取返回值
				//this.FuncExtModule.alert("服务器返回值:"+aaa);
				this.Status = aaa;
				//this.FuncExtModule.alert("123");
				//this.Close();
				return true;
			}
			else
			{
				this.Status = "保存文档失败";
				return false;        	
			}
		}else{
			this.Status = "保存文档失败";
			return false; 
		}

    }

     //禁用修订，更正
    //ReviewShowMarkupMenu显示标记
    //ReviewReviewingPaneMenu审阅窗格
    //ReviewTrackChangesMenu修订
    //ReviewAcceptChangeMenu接受
    //ReviewRejectChangeMenu拒绝
    //ReviewNewComment新建批注
    //ReviewDeleteCommentsMenu删除批注
    this.ModifyReview2 = function()
    {
	    var strCustomUI = '<customUI xmlns="http://schemas.microsoft.com/office/2006/01/customui" onLoad="OnLoad" loadImage="LoadImage"> \
	        <commands> \
	    	    <command idMso="ReviewReviewingPaneMenu" enabled="false"/> \
	    		<command idMso="ReviewShowMarkupMenu" enabled="false"/> \
	        	<command idMso="ReviewTrackChangesMenu" enabled="false"/> \
	        	<command idMso="ReviewRejectChangeMenu" enabled="false"/> \
				<command idMso="ReviewAcceptChangeMenu" enabled="false"/> \
	        	<command idMso="ReviewNewComment" enabled="false"/> \
	    		<command idMso="ReviewDeleteCommentsMenu" enabled="false"/> \
	        </commands> \
	      </customUI>';
	    for ( i = 1 ; i <= this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Count; i++ )
		{
			if( this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).ID == 1715 )
				this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).Enabled = false;
			if( this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).ID == 1716 )
				this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).Enabled = false;
			if( this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).ID == 2041 )
				this.obj.ActiveDocument.Application.CommandBars("Track Changes").Controls.Item(i).Enabled = false;
		}
    	this.obj.RibbonCustomUI = strCustomUI;
    }

    this.ModifyReview = function()
    {
	    this.obj.FuncExtModule.RibbonUIXML = '' +
  '<customUI xmlns="http://schemas.microsoft.com/office/2006/01/customui">' +
  '<commands>'+
  '   <command idMso="ReviewAcceptChangeMenu" enabled="false" />' +     //禁用接受修订
  '   <command idMso="ReviewRejectChangeMenu" enabled="false" />' +     //禁用拒绝修订
'</commands>'+
  '</customUI>';
    }

    this.SAVEFILE = function (httpclient, FileName) {//时发生交互OPTION值为：SAVEFILE
        httpclient.AddForm("FormData", this.WebSendMessage());
        httpclient.AddFile("FileData", FileName);    //需要上传的文件
        this.WebClearMessage();
	     httpclient.ShowProgressUI = true;           //隐藏进度条
//alert( this.WebUrl);
        if (httpclient.Open(this.HttpMethod.Post, this.WebUrl, false)) ////true 异步方式 false同步
        {
            if (!httpclient.Send()) {

            	return false;
            }else{            
           httpclient.Clear();
            return true;
            }
        }     
        return false;
    }
    /*从服务器上取文档并打开，打开RecordID指定的文件 */
    this.WebOpen = function (mBoolean) {
    	if(this.nRecvedBytes != -1)
            return false;
    	
    	//alert("WebOpen 1");
        var httpclient = this.obj.Http; //设置http对象
        httpclient.Clear();
        this.WebSetMsgByName("USERNAME", this.UserName); //加载UserName
        this.WebSetMsgByName("FILENAME", this.FileName); //加载FileName
        this.WebSetMsgByName("FILETYPE", this.FileType); //加载FileType
        this.WebSetMsgByName("RECORDID", this.RecordID); //加载RecordID
        this.WebSetMsgByName("OPTION", "LOADFILE");     //发送请求LOADFILE
        httpclient.AddForm("FormData", this.WebSendMessage()); //这里是自定义json 传输格式。
        this.WebClearMessage();                         //清除所有WebSetMsgByName参数
        this.sendMode = "OpenFile";
        //alert(this.LOADFILE(httpclient));
		
		if (this.LOADFILE(httpclient)) {                //Http下载服务器文件
			var httpclient = WebOffice.WebObject.Http;
	        var aaa=httpclient.GetResponseHeader("ISO");//获取返回值
	        //alert("服务器返回值:"+aaa);
	        this.Status=aaa;
        	//alert("WebOpen 2");
            //this.Status = "打开文档成功";               //Status：状态信息 
            return true;
        }
    	//alert("WebOpen 3");
        this.Status = "打开文档失败";               //Status：状态信息 
        return false;
    }
    
    this.LOADFILE = function (httpclient) 
    { 
    	//Http 下载文档
    	//alert("LOADFILE 1");
    	httpclient.ShowProgressUI = true;//隐藏进度条
		//alert(this.WebUrl);
        if (httpclient.Open(this.HttpMethod.Post, this.WebUrl, false)) //true 异步方式 false同步
        {
        	//这里采用异步方式打开文档
        	//alert("LOADFILE 2");
            if (httpclient.Send()) 
            {
            	//alert("LOADFILE 3"); 
                if (httpclient.GetResponseHeader("MsgError") == "404") 
                {
                	//alert("LOADFILE 4");
                	//判断服务器是否存在文件
                    this.CreateFile();
                    //alert(" CreateFile sucess");
					var ret = this.getOfficeVersion();//打开文档后，判断当前office版本
                    //alert(ret);
					httpclient.Clear();
                    return true;
                }
                httpclient.Clear();
                if (this.hiddenSaveLocal(httpclient, this, false, false/*, Math.round(Math.random() * 100000)*/)) 
                {
                	//下载成功时
                	//alert("download to temp file:" + this.DownloadedFileTempPathName);
                	
				    if(this.OpenLocalFile(this.DownloadedFileTempPathName)==0)
				    { //打开本地磁盘文件
				    	
						this.getOfficeVersion();//打开文档后，判断当前office版本
				    	return true;
				    }
				    else
				    {
				    	var windows = window.confirm("打开文档错误，可能当前编辑软件不支持当前格式！\r\r单击“确定”关闭。单击“取消”继续。");
				    	if(windows == 1)
				    	{
				    		window.close(); 
				    	}
				    	return false;
				    }
                }
            }
            return false;
        }
    }
	


    this.EnableSignature = function (vaul) {

        try {
            this.obj.ActiveDocument.Application.COMAddIns.Item("iSignatureWord.WordApp").Connect = vaul;
        }
        catch (e) {
            return;
        }

    }
	
	/*设置打开文档是否显示进度条*/
	this.ShowOpenProgress = function(mValue)
	{
		//alert(mValue);
		this.obj.Style.ShowOpenProgress = mValue;
		//alert("1234555");
	}
	
	/*设置没有安装Office360签章时，控件中打开文档后是否进行验章及刷章工作*/
	this.UpdateSignature = function(mValue)
	{
		//alert(mValue);
		this.obj.Style.UpdateSignature = mValue;
	}
    
    /*打开本地磁盘文件*/
    this.OpenLocalFile = function (filePath) {
    	//alert(filePath);
        if (this.getDocType(this.FileType) == this.DocType.PICTURE) {
            try {
                //this.obj.CreateNew("iWebPicture.iWebPictureMain");
                this.obj.ActiveDocument.WebOpenLocalFile(filePath);
                return 0;
            }
            catch (e) {
                return -1;
            }
        }
		var res = this.obj.Open(filePath);
		if(res == 0)
		{
			//alert("0文档打开成功");
			//alert(this.obj.FileSystem.GetFileSize(filePath));
		}else if(res == 1)
		{
			alert("1copyright设置不对");
		}else if(res == 2)
		{
			alert("2文件不存在");
		}else if(res == 3)
		{
			alert("3没有权限");
		}else if(res == 4)
		{
			alert("4文档损坏");
		}else if(res == 5)
		{
			alert("5未找到CLSID");
		}else if(res == 6)
		{
			alert("6文件被占用");
		}else if(res == -1)
		{
			alert("-1其他未知错误");
		}
		return res;
    }

    /*保存到本地  isHidden 是否隐藏文件；isInsertFile是否是插入文件*/
    this.hiddenSaveLocal = function (httpclient, webOffice, isHidden, isInsertFile, OtherName) {
        if (isHidden) {
            httpclient.Hidden = true; //隐藏文件
        }
        var tempName = "";
        var fs = webOffice.obj.FileSystem; //WebOffice外面对象名称：
        var filePath = fs.GetSpecialFolderPath(0x1a) + webOffice.DOWN;
        //var filePath = fs.GetSpecialFolderLocation(0x20) + webOffice.DOWN +  fs.GetFolderEncryptCode(1) + "\\";
		//var filePath = fs.GetSpecialFolderLocation(0x1a) + webOffice.DOWN +  fs.GetFolderEncryptCode(1) + "\\";
        //alert(filePath);
        fs.CreateDirectory(filePath);

        webOffice.FilePath = filePath; //这个保存的路径方便打开的时候再取。
        if (httpclient.Status == 200) {
            if (isInsertFile == undefined || isInsertFile == true) {
                tempName = "temp" + webOffice.RecordID;
                webOffice.tempInsertName = tempName + webOffice.FileName;
            }
            if (OtherName == undefined || OtherName == "") {
                OtherName = webOffice.FileName;
                OtherName = Math.random() * 100000 + this.FileType;
            }
            this.DownloadedFileTempPathName = filePath + tempName + OtherName;
            httpclient.ResponseSaveToFile(this.DownloadedFileTempPathName); //临时文件
        	httpclient.Clear();
            return true;
        }
        httpclient.Clear();
        return false;
    }

    
    //获取office版本信息
    this.getOfficeVersion = function () {
    	var getVersion = 0.0;
        try {
    		if(this.setVersion == -1){
    			 getVersion = parseFloat(this.obj.ActiveDocument.Application.Version);
    			 this.setVersion = getVersion;
    		}else{
    			getVersion = this.setVersion;
    		}
            if (getVersion == 11.0) {
                return this.OfficeVersion.v2003;
            } else {
                return this.OfficeVersion.vOther;
            }
        } catch (e) {
            return this.OfficeVersion.v2003;
        }
    }


    //关闭文档
    this.Close = function () {
        this.obj.Close();
    }
	
    
    /*获取临时路径*/
    this.getFilePath = function () {
        var fs = this.obj.FileSystem; //创建file对象：
        var filePath = fs.GetSpecialFolderPath(0x1a) + this.UP; //设置临时路径
        //var filePath = fs.GetSpecialFolderLocation(0x20) + this.UP + fs.GetFolderEncryptCode(1) + "\\"; //设置临时路径
        //var filePath = fs.GetSpecialFolderLocation(0x1a) + this.UP + fs.GetFolderEncryptCode(1) + "\\";
		fs.CreateDirectory(filePath); //创建路径
	
        this.FilePath = filePath; //给对象赋值，方便删除和打开
        return this.FilePath;
    }
    
    /*
    * 获取文档类型
    */
    this.getDocType = function (fileType) {
        if (fileType == ".doc" || fileType == ".docx" || fileType == ".wps") {// word
            return this.DocType.WORD;
        }
        if (fileType == ".xls" || fileType == ".xlsx" || fileType == ".et") {// execl
            return this.DocType.EXECL;
        }
 
        if (fileType == ".tif" || fileType == ".jpg" ) {// execl
            return this.DocType.PICTURE;
        }
    }

    this.HookEnabled = function () {//解决在Firefox和chrome浏览器下调用iWebPlugin崩溃崩溃的问题需要在load()函数下加如下代码
        if (this.getDocType(this.FileType) == this.DocType.WORD) {
            this.obj.Style.ShowToolSpace = true;
            this.obj.SelectionInformationEnabled = false;
        }
        if (!((window.ActiveXObject != undefined) || (window.ActiveXObject != null) || "ActiveXObject" in window)) {
            this.obj.HookEnabled = false;
        }
    }

    /******一下是打开本地窗口代码******/
    // 打开本地窗口
    this.WebOpenLocal = function () {
		//alert("111");
		//alert(this.getOpenDocSuffix(this.FileType));
		//this.obj.ShowDialog(1, this.getOpenDocSuffix(this.FileType));
		
		//alert(this.ShowDialog.DialogOpen);
		//alert(this.getOpenDocSuffix(this.FileType));
		
        this.setShowDialog(this.ShowDialog.DialogOpen, this
				.getOpenDocSuffix(this.FileType));
    }
    // 获取打开窗口的后缀
    this.getOpenDocSuffix = function (fileType) {
        if (fileType.length == 5) {
            fileType = fileType.substring(0, 4);
        }
        var exts;
		exts = "";
		//exts =   "Word Files(*.doc;*.docx;*.docm;*.dot;*.dotx;*.dotm;*.rtf)|*.doc;*.docx;*.docm;*.dot;*.dotx;*.dotm;*.rtf";
		
		if(this.isWPS() || !this.getOfficeVersion()){//如果是office2003是不支持x格式的文档
			exts += "*" + fileType + "x|*" + fileType + "x|";
		}
        exts += "*" + fileType + "|*" + fileType + "|";
		exts += this.getOpenSuffixName(fileType) + "(*" + fileType
		if(this.isWPS() || !this.getOfficeVersion()){//如果是office2003是不支持x格式的文档
			exts +=  ";*"+ fileType + "x"
		}
		exts +=  ")|*" + fileType
        if(this.isWPS()|| !this.getOfficeVersion()){//如果是office2003是不支持x格式的文档
        	exts += ";*" + fileType + "x";
        }
		exts += "|All File(*.*)|*.*";
		
		exts +="|";
        return exts;
    }
    //返回当前编辑器
    this.getEditVersion = function (){
       return this.obj.AppName;
    }
    //获取打开文档类型名称
    this.getOpenSuffixName = function (fileType) {
        var openSuffixName;
        switch (fileType) {
            case this.DocType.WORD: openSuffixName = "Word Files"; break; //创建word后缀名称
            case this.DocType.EXECL: openSuffixName = "Excel Files"; break; //创建execl后缀名称
            default: openSuffixName = "Word Files"; break;
        }
        return openSuffixName;
    }

    //设置打开窗口的类型，这里统一设置
    this.setShowDialog = function (thisType, exts) {
    	switch (thisType) {
            case this.ShowDialog.DialogOpen: this.obj.ShowDialog(thisType, exts, 0); break; //打开本地文档
            case this.ShowDialog.DialogNew: //新建对象
            case this.ShowDialog.DialogPageSetup: //打印设置
            case this.ShowDialog.DialogPrint: //打印
            case this.ShowDialog.DialogProperties: //文档属性
            case this.ShowDialog.DialogSaveCopyAs: //另存为拷贝
            case this.ShowDialog.DialogSaveAs: //另存为
            //  this.blnIE() ? this.obj.ShowDialog(thisType) : this.obj.ExecuteScript(thisType + "", "ActiveObject.ShowDialog(" + thisType + ")"); break; //打开窗口
            
			this.obj.ShowDialog(thisType);
			default: ; break;
        }
    }
    /******End 打开本地窗口代码******/

    /*文档保存到本地（有对话框）*/
    this.WebSaveLocal = function () {
		//alert("33333");
		//alert(this.ShowDialog.DialogSaveCopyAs);
        this.setShowDialog(this.ShowDialog.DialogSaveCopyAs);
		
		//this.obj.ShowDialog(2, true);
		
	/*	var exts;
		exts =  "所有支持的文件格式(*.docx;*.doc;*.xlsx;*.xls;*.pdf)|*.docx;*.doc;*.xlsx;*.xls;*.pdf";
		exts += "|Word 文档(*.docx)|*.docx";
		exts += "|Word 97-2003文档(*.doc)|*.doc";
		exts += "|Excel 工作簿(*.xlsx)|*.xlsx";
		exts += "|Excel 97-2003工作簿(*.xls)|*.xls";
		exts += "|PDF文档(*.pdf)|*.pdf";
		exts += "||";
		
		var filename = this.obj.FileSystem.FileSaveAs(exts, "默认文件名.doc");
		var ext = filename.substring(filename.length - 3,filename.length);
		
		if(ext == "pdf")
		{
			this.obj.ActiveDocument.ExportAsFixedFormat(filename, 17);
		}
		else
		{
			//alert(filename);
			var res = this.Save(filename, 0);
			//alert(res);
		}*/
    }
    /*2015自带有窗口的页面设置*/
    this.WebPageSetup = function () {
        this.setShowDialog(this.ShowDialog.DialogPageSetup);
    }
    /*2015自带有窗口的打印设置*/
    this.WebOpenPrint = function () {
		this.obj.Activate(true);
        this.setShowDialog(this.ShowDialog.DialogPrint);
    }

    this.DeleteFirstRecent = function(ver)
    {
	    var register = this.obj.Register;
	    var idx = 1;
	    while(true)
	    {
		    keyA = "Item " + idx;
		    idx++;
		    keyB = "Item " + idx;
		
		    var itemB = register.QueryStringValue(0x80000001,"Software\\Microsoft\\Office\\" + ver + "\\Word\\File MRU", keyB);
		    if(itemB == null)
		    break;
		    register.SetStringValue(0x80000001,"Software\\Microsoft\\Office\\" + ver + "\\Word\\File MRU", keyA, itemB);
	    }
	    var ret = register.DeleteSubKey(0x80000001,"Software\\Microsoft\\Office\\" + ver + "\\Word\\File MRU","Item " + (idx - 1) );
    }	
    /*关闭文档*/
    this.WebClose = function(){ //多浏览器调用关闭
    	if (navigator.userAgent.indexOf("Firefox") >= 0){//卸载时候，火狐不能使用close方法
    		return;
    	}
		
    	this.Close();
/*		this.DeleteFirstRecent("16.0");
		this.DeleteFirstRecent("15.0");
		this.DeleteFirstRecent("14.0");
		this.DeleteFirstRecent("13.0");
		this.DeleteFirstRecent("12.0");
		this.DeleteFirstRecent("11.0");
		this.DeleteFirstRecent("10.0");*/
    }

    //打印预览
    this.PrintPreview = function () {
        var ret = this.obj.PrintPreview();
		//alert(ret);
		
    }
    //退出打印预览
    this.PrintPreviewExit = function () {
        this.obj.PrintPreviewExit();
        this.obj.ActiveDocument.ActiveWindow.View.ShowFieldCodes = false;
		
    }

    /*给文件菜单添加下拉菜单。提供的接口 */
    var MenuFile;
    this.AppendMenu = function (index, Caption) {
        var custommenu = this.obj.CustomMenu;
        if (MenuFile == undefined || MenuFile == null) {
            custommenu.Clear();
            MenuFile = custommenu.CreatePopupMenu();
            custommenu.Add(MenuFile, "文件(&F)");
        }
        custommenu.AppendMenu(MenuFile, index, false, Caption);
        custommenu.Update();
    }

    this.AddCustomMenu = function () {
        var custommenu = this.obj.CustomMenu;
        //创建文件菜单的条目
        var menufile = custommenu.CreatePopupMenu();
        var menufilelv2 = custommenu.CreatePopupMenu();
        custommenu.AppendMenu(menufilelv2, 6, false, "自定义二级菜单一");
        custommenu.AppendMenu(menufilelv2, 7, false, "自定义二级菜单二");
        custommenu.AppendMenu(menufilelv2, 0, false, "-");
        var menufilelv3 = custommenu.CreatePopupMenu();
        custommenu.AppendMenu(menufilelv3, 8, false, "自定义三级菜单一");
        custommenu.AppendMenu(menufilelv3, 0, false, "-");
        custommenu.AppendMenu(menufilelv3, 9, false, "自定义三级菜单二");

        custommenu.AppendMenu(menufilelv2, menufilelv3, true, "自定义三级菜单");

        custommenu.AppendMenu(menufilelv2, 10, false, "自定义二级菜单三");
        custommenu.AppendMenu(menufile, menufilelv2, true, "自定义二级菜单");
        //将文件菜单添加到顶级主菜单
        custommenu.AppendMenu(menufile, 17, false, "启用保存");
        custommenu.AppendMenu(menufile, 18, false, "禁止保存");
        custommenu.AppendMenu(menufile, 0, false, "-");
        custommenu.AppendMenu(menufile, 19, false, "启用打印");
        custommenu.AppendMenu(menufile, 20, false, "禁止打印");
        custommenu.Add(menufile, "编辑(&E)");

        //创建语言
        var menuLang = custommenu.CreatePopupMenu();
        custommenu.AppendMenu(menuLang, 22, false, "简体中文");
        custommenu.AppendMenu(menuLang, 23, false, "繁体中文(TW)");
        custommenu.AppendMenu(menuLang, 24, false, "繁体中文(HK)")
        custommenu.AppendMenu(menuLang, 25, false, "英文");
		custommenu.AppendMenu(menuLang, 26, false, "葡萄牙语");
        custommenu.Add(menuLang, "多语言(&N)");

        //通知系统更新菜单
        custommenu.Update();
    }
	
	//自定义工具栏添加按钮
	this.AddToolButton = function(){
		
		var customtoolbar = this.obj.CustomToolbar;
		customtoolbar.AddToolButton(2,"保存文档"," ", "保存文档",0);
        customtoolbar.AddToolButton(3,"打开本地文档"," ", "打开本地文档",0);
        customtoolbar.AddToolButton(4,"打印文档"," ", "打印文档",0);

	}
	
	this.ChangeLanguage = function(lcid) {
		//alert(lcid);
        this.obj.Lcid = lcid;
    }

    /*保存到本地路径 FileName：绝对路径*/
    this.WebSaveLocalFile = function (FileName) {
        this.WebDelFile(FileName);
		//alert(FileName);
		//alert(this.getOfficeVersion());
		//alert(this.FileType.substring(1).toUpperCase());
		
        var res = this.Save(FileName, this.getOfficeVersion(), this.FileType.substring(1).toUpperCase());
		
		return res;
    }

    /*office2003的接口和其他的不一样，所有保存到本地要区分开来*/
    this.Save = function (FileName, is2003, FileType)
    {


        if (this.getDocType(this.FileType) == this.DocType.PICTURE)
        {

            var res = this.obj.ActiveDocument.WebSaveLocalFile(FileName);
            return res;

        }
        if (is2003)
        {
            var res = this.obj.Save(FileName);
            return res;
        }

		//alert(FileName);
		//alert(eval("this.DocTypeValue." + FileType));
        var res = this.obj.Save(FileName, eval("this.DocTypeValue." + FileType), true);
		
		
		if(res == 0)
		{
			var filevalid = this.obj.CheckOleFileValid(FileName);  //检测保存到本地文档的是否损坏，控件调用ole方法再次打开此文档，以确定文档是否损坏
		    if(filevalid){
				return res; 
			}else{
				this.obj.FuncExtModule.alert("文档保存到本地已损坏！");
				res = -1;
			}
			//alert(filevalid);
			//alert("0文档保存成功");
		}else if(res == 1)
		{
			alert("1copyright设置不对");
		}else if(res == 3)
		{
			alert("3没有权限");
		}else if(res == 6)
		{
			alert("6文件被占用");
		}else if(res == 7)
		{
			alert("7文件未打开或未创建");
		}else if(res == -1)
		{
			alert("-1其他未知错误");
		}
		
		return res;
    }

   
    //获取焦点
    this.Activate = function(blnValue){
    	this.obj.Activate(blnValue);
    }
    //设置word的页码 ,IE和其他浏览器有区别，所以封装起来
    this.WebPageCode = function () {
        var FunctionString = "ActiveObject.ActiveDocument.Application.Dialogs(294).Show()";
		this.obj.ActiveDocument.Application.Dialogs.Item(294).Show();
   }


    /*ExecuteScript可将同步函数转换为异步，解决在FireFox、Chrome浏览器中有弹框或运行时间过长导致弹出不响应提示框的问题。*/
    this.ExecuteScript = function (mValue, StringObject) {
        this.obj.ExecuteScript(mValue, StringObject);
    }

    /*控制2015标题栏*/
    this.ShowTitleBar = function (mValue) {
        var style = this.obj.Style;
        style.ShowTitleBar = mValue;
    }

    /*控制2015自定义菜单栏*/
    this.ShowCustomToolBar = function (mValue) {
        var style = this.obj.Style;
        style.ShowCustomToolbar = mValue;
    }

    /*控制2015菜单栏*/
    this.ShowMenuBar = function (mValue) {
        var style = this.obj.Style;
        style.ShowMenuBar = mValue;
    }

    /*控制Office工具栏*/
    this.ShowToolBars = function (mValue) {
    	var style = this.obj.Style;
        style.ShowToolBars = mValue;
		style.ShowToolSpace = mValue;
    }

    /*控制2015状态栏*/
    this.ShowStatusBar = function (mValue) {
        var style = this.obj.Style;
        style.ShowStatusBar = mValue;
    }

    /*控制2015全屏*/
    this.FullSize = function (mValue) {
    	this.obj.FullSize = mValue;
    }
	
	/*控制2015全屏窗口功能*/
    this.FullWindowStyle = function (mValue) {
    	this.obj.FullWindowStyle = mValue;
    }
	
    /*
    * 显示和隐藏痕迹
    * 隐藏痕迹时之前的痕迹不受影响
    */
    this.WebShow = function (blnValue) {
        if (this.getDocType(this.FileType) == this.DocType.WORD) {
            this.VBAShowRevisions(blnValue);
        }
    }

    //是否启用iWebOffice对象内文档的保存功能
    this.SaveEnabled = function (mBoolean) {
        this.obj.SaveEnabled = mBoolean;
    }

    //是否启用iWebOffice对象内文档的打印功能
    this.PrintEnabled = function (mBoolean) {
        this.obj.PrintEnabled = mBoolean;
    }

    /*设置保护文档*/
    this.WebSetProtect = function (Boolean, password) {
        var docType = this.getDocType(this.FileType);
        if (password == "") {
            password = "123456";
        }
        Boolean ? this.VBAProtectDocument(docType, password) : this.VBAUnProtectDocument(docType, password);
    }

    /*设置书签植*/
    /*this.WebSetBookmarks = function (vbmName, vbmValue) {
        this.VBASetBookmarks(vbmName, vbmValue);
    }*/
	
	 // 将信息设置到书签位置
	this.WebSetBookmarks = function(vbmName, vbmValue) {
		try {
			if (this.obj.ActiveDocument.BookMarks.Exists(vbmName)) {// 判断是否存在该书签
				var vRange = this.obj.ActiveDocument.Bookmarks.Item(vbmName).Range;
				vRange.text = vbmValue;
				this.obj.ActiveDocument.Bookmarks.Add(vbmName, vRange);
			}
		} catch (e) {
			this.Status = "名称为<" + vbmName + ">的书签在文档中不存在";
			return false;
		}
	}
	
    //打开书签窗口
    this.WebOpenBookMarks = function(){
    	//var FunctionString = "ActiveObject.ActiveDocument.Application.Dialogs(168).Show()";
	
	this.obj.ActiveDocument.Application.Dialogs.Item(168).Show();
   }

  //光标处添加书签
    this.WebAddBookMarks = function(BMarksName,BMarksValue){
	     if(!this.obj.ActiveDocument.BookMarks.Exists(BMarksName)){//判断是否存在该书签
		var BMVLength = BMarksValue.length;
              this.obj.ActiveDocument.Application.Selection.TypeText(BMarksValue);//插入内容
              this.obj.ActiveDocument.Application.Selection.MoveLeft(Unit = 1, Count = BMVLength);
              var StartR = this.obj.ActiveDocument.Application.Selection.Start;
              var EndR = this.obj.ActiveDocument.Application.Selection.Start + BMVLength;
              this.obj.ActiveDocument.Range(Start = StartR, End = EndR).Select();
			  //this.obj.ActiveDocument.Range.Select();
              this.obj.ActiveDocument.Bookmarks.Add(BMarksName);//添加书签
	     }
    }
    //书签定位
    this.WebFindBookMarks = function(BMarksName){
		var range = this.obj.Range;
		//alert(BMarksName);
		range = this.obj.ActiveDocument.Bookmarks.Item(BMarksName).Range;
		range.Select();
    }
   //删除书签
    this.WebDelBookMarks = function(BMarksName){
    	if(this.obj.ActiveDocument.BookMarks.Exists(BMarksName)){//判断是否存在该书签
	    this.obj.ActiveDocument.Bookmarks(BMarksName).Delete();//删除书签
       }
    }

    /*获取当前文档打开类型，以后缀名来区别*/
    this.WebGetDocSuffix = function () {
    	try{
        var docType = this.getDocType(this.FileType); //判断是文档还是表格
        var FileTypeValue = 0;  //判断打开文档的值 0：doc，12：docx，51：xls，56：xlsx
        if (docType == this.DocType.WORD) {  //word 获取vba值的方法
	    		this.Activate(true);
            FileTypeValue = this.obj.ActiveDocument.SaveFormat;
        }
        if (docType == this.DocType.EXECL) { //Execl 获取方法
            this.obj.ExitExcelEditMode(); // 退出当前编辑模式
            FileTypeValue = this.obj.ActiveDocument.FileFormat;
		    	    if(FileTypeValue <0){ //2003不支持该属性
		    	    	FileTypeValue = 56;
        }
	    	}
        return this.DocSuffixType[FileTypeValue];
    	}catch(e){
    		return this.FileType;
    	}
    }
    //iWebOffice打开的文档全路径。
    this.WebFullName = function () {
        return this.obj.FullName;
    }

/*
    this.BookMark = "";
    this.ImageName = "";
    
    this.WebInsertImage = function (BookMark, ImageName) {//插入远程图片：BookMark插入的书签的位置;ImageName远程图片的名称
        var httpclient = this.obj.Http;
        this.sendMode = "LoadImage";
        this.BookMark = BookMark;
        this.ImageName = ImageName;
    try {
    	 var URL = this.WebUrl.substring(0, this.WebUrl.lastIndexOf("/"));
 		httpclient.ShowProgressUI = false;//隐藏进度条
        if (httpclient.Open(this.HttpMethod.Post, URL + "/Document/" + ImageName, true)) {  //true 异步方式 false同步
         			//alert(URL + "/Document1/" + ImageName);
             		httpclient.Send();
 		    		httpclient.Clear();
         }
	} catch (e) {
		// TODO: handle exception
		
		this.Status(e.description);
		
	}   
    }

    //更加书签插入图片
    this.InsertImageByBookMark = function () {
        if (this.BookMark == null || this.BookMark == 'null' || this.BookMark == "") {
            this.obj.ActiveDocument.Application.Selection.GoTo(-1, 0, 0, this.BookMark);
        }
        try {
            this.obj.ActiveDocument.Application.Selection.InlineShapes.AddPicture(this.FilePath + this.ImageName);
            this.obj.ActiveDocument.InlineShapes.Item(1).ConvertToShape();   //转为浮动型
            this.obj.ActiveDocument.Shapes.Item(1).WrapFormat.Type = 5;     //0:四周型  1：紧密型  2：穿越型环绕 3：浮于文字上方 4：上下型环绕 5：衬于文字下方  6：浮于文字上方
            return true;
		} catch (e) {
			alert(e.description);
			
		}
    
    }
*/
    this.BookMark = "";
    this.ImageName = "";
    this.WebInsertImage = function (BookMark, ImageName) {//插入远程图片：BookMark插入的书签的位置;ImageName远程图片的名称
        var httpclient = this.obj.Http;
        this.sendMode = "LoadImage";
        this.BookMark = BookMark;
        this.ImageName = ImageName;
        var URL = this.WebUrl.substring(0, this.WebUrl.lastIndexOf("/"));
		httpclient.ShowProgressUI = false;//隐藏进度条
		//alert(URL);
        if (httpclient.Open(this.HttpMethod.Post, URL + "/Document/" + ImageName, true)) {
			//alert(URL + "/Document/" + ImageName);
            httpclient.Send();
			
			//alert("send");
		    httpclient.Clear();
			//alert("Clear");
        }
    }

    //更加书签插入图片
    this.InsertImageByBookMark = function () {
        if (this.BookMark == null || this.BookMark == 'null' || this.BookMark == "") {
            this.obj.ActiveDocument.Application.Selection.GoTo(-1, 0, 0, this.BookMark);
        }
		//alert("123");
        this.obj.ActiveDocument.Application.Selection.InlineShapes.AddPicture(this.FilePath + this.ImageName);
        //alert(this.FilePath + this.ImageName);
		this.obj.ActiveDocument.InlineShapes.pm_Item(1).ConvertToShape();   //转为浮动型
        this.obj.ActiveDocument.Shapes.pm_Item(1).WrapFormat.Type = 5;     //0:四周型  1：紧密型  2：穿越型环绕 3：浮于文字上方 4：上下型环绕 5：衬于文字下方  6：浮于文字上方
        return true;
    }
    
    //根据文档名称插入文档   
    this.WebInsertFile = function () {
        var httpclient = this.obj.Http; //设置http对象
        this.WebSetMsgByName("FILENAME", this.FileName); //加载FileName
        this.WebSetMsgByName("OPTION", "LOADFILE");     //发送请求LOADFILE
        httpclient.AddForm("FormData", this.WebSendMessage()); //这里是自定义json 传输格式。
        this.WebClearMessage();                         //清除所有WebSetMsgByName参数
        if (this.LOADFILE(httpclient)) {                //Http下载服务器文件
            this.Status = "打开文档成功";               //Status：状态信息
            return true;
        }
        this.Status = "打开文档失败";               //Status：状态信息
        return false;


    }

    //下载文档
    this.DownloadToFile = function (DownFileName, SavePathName) {
        var httpclient = this.obj.Http;
        var URL = this.WebUrl.substring(0, this.WebUrl.lastIndexOf("/"));
        httpclient.ShowProgressUI = true;//隐藏进度条
        if (httpclient.Open(this.HttpMethod.Get, URL + "/Document/" + DownFileName, false)) {//指定下载模板的名称
			if (httpclient.Send()) {
                if (httpclient.Status == 200) {
                	httpclient.ResponseSaveToFile(SavePathName + DownFileName);
                	httpclient.Clear();
                    return true;
                }
            }
        }
        httpclient.Close();
        return false;
    }


    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 公共方法
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */
    /*用来存储Http发送的表单数据*/
    this.ArrayList = function () {
        this.ObjArr = {}; //列表
        this.Count = 0; // 数量
        this.Add = function (key, value) {//添加
            this.ObjArr[key] = value;
            this.Count++;
            return true;
        }
        this.Clear = function () {//清空
            this.ObjArr = {}; this.Count = 0;
        }
        //按json格式输出
        this.toString = function () {
            var newArray = new Array(); //存储json字符串
            var i = 0; for (var i in this.ObjArr) {
                newArray.push("'" + i + "':'" + this.ObjArr[i] + "'");
            }
            return "{" + newArray + "}";
        }
    }
    this.ht = new this.ArrayList();
    /**
    * @deprecated:设置相应字段域值，等待发送给服务器
    * @param FieldName
    * @param FieldValue
    * @return
    */
    this.WebSetMsgByName = function (FieldName, FieldValue) {
        this.ht.Add(FieldName, FieldValue);
    }
	
	this.WebGetMsgByName = function(FieldName) 
	{
		return this.ht.Get(FieldName);
	}

    /*按json格式发送数据*/
    this.WebSendMessage = function () {
        return this.ht.toString();
    }
    /*@deprecated:清除由WebSetMsgByName设置的值*/
    this.WebClearMessage = function () {
        this.ht.Clear();
    }


    /*判断浏览器类型*/
    this.blnIE = function () {
        //return (window.ActiveXObject != undefined) || (window.ActiveXObject != null) || ("ActiveXObject" in window)
    	if(browser == "chrome")
    		return false;
    	else
    		return true;
    }
     /*判断是否是WPS*/
     this.isWPS = function(){
    	 return this.FileType.toUpperCase()  == ".WPS" || this.FileType.toUpperCase()  == ".ET";
     }
    /*
    * 控件版本
    */
    this.Version = function () {
        return this.obj.Version;
    }

    //是否启用iWebOffice对象内的拷贝功能。非控件的不受影响
    this.WebEnableCopy = function (mValue) {
        switch (mValue) {
            case 0:
            case false:
            case "0": this.obj.CopyEnabled = false; break; //启用
            case 1:
            case "1":
            case true: this.obj.CopyEnabled = true; break; //关闭
            default: ; return;
        }
    }

    //删除文件
    this.WebDelFile = function (FileName) {
        var fs = this.obj.FileSystem;
        fs.DeleteFile(FileName);
    }

    //设置状态
    this.setEditType = function (type) {
    	try{
        switch (type) {
            case "0": this.VBAProtectDocument(this.getDocType(this.FileType), "123"); break;
            case "1": this.WebShow(false); break;
            case "2": this.WebShow(true); break;
            default: ;
        }
    	}catch(e){
  			return false;
    }
     }
    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * End 公共方法
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */




    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * VBA专区
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */
    //显示痕迹和隐藏痕迹
    this.VBAShowRevisions = function (mValue) {
    	if(this.getDocType(this.FileType)== this.DocType.WORD && this.obj.ActiveDocument.ProtectionType == "-1"){
        this.obj.ActiveDocument.TrackRevisions = mValue; //显示标记和隐藏标记
        this.obj.ActiveDocument.ShowRevisions = mValue; //显示痕迹或隐藏
	    	return true;
    }
    	return false;
     }
    //根据文档保护文档
    this.VBAProtectDocument = function (docType, password) {
        if (docType == this.DocType.WORD) {//word 保护模式
    		 if(this.obj.ActiveDocument.ProtectionType == "-1"){
            //alert("112");
			this.obj.ActiveDocument.Protect(3, false, password);
            return true;
        }
    	 }
		 
        if (docType == this.DocType.EXECL) {//word 保护模式，这里只保护表单1的其他的安自己需求编写
    		 if(!this.obj.ActiveDocument.Application.Sheets.Item(1).ProtectContents){ //判断表单是否是保护的
            this.obj.ActiveDocument.Application.Sheets.Item(1).Protect(password);
    		 }
            return true;
        }
    	 return false
    }

    //根据密码解除保护
    this.VBAUnProtectDocument = function (docType, password) {
        if (docType == this.DocType.WORD) {//word 保护模式
            this.obj.ActiveDocument.Unprotect(password); ;
            return;
        }

        if (docType == this.DocType.EXECL) {//word 保护模式，这里只保护表单1的其他的安自己需求编写
            this.obj.ActiveDocument.Application.Sheets.Item(1).Unprotect(password);
            return;
        }
    }


    //设置书签
    this.VBASetBookmarks = function (vbmName, vbmValue) {
		//alert(vbmName);
		//alert(vbmValue);
    	 try{
        this.obj.ActiveDocument.Bookmarks.Item(BookMarkName).Range.Text = BookMarkValue;
		
		//alert(BookMarkValue);
		
    	 }catch(e){
    		 return false;
    }
     } 
	 
    this.VBAInsertFile = function (Position, FileName) {
        
		//alert("VBAInsertFile");
		try {
            this.obj.ActiveDocument.Application.Selection.GoTo(-1, 0, 0, Position);
            this.obj.Activate(true);
            this.obj.ActiveDocument.Application.Selection.InsertFile(FileName, "", false, false, false);
            return true;
        } catch (e) {
            return false;
        }
    }
	
	//把文档插入到指定的书签位置  （该功能已完整实现）
  this.VBAInsertFile_bak = function(Position, FileName)
  {
    this.ConsoleOut("<VBAInsertFile> 开始。。。 ");
    try {
      var docType = this.getDocType(this.FileType);
      this.ConsoleOut("<VBAInsertFile> 判断是否是WORD。。。 ");
      if (docType == this.DocType.WORD) {
        this.ConsoleOut("<VBAInsertFile> 判断书签是否存在。。。 ");
        this.obj.Activate(true);
        if (this.obj.ActiveDocument.BookMarks.Exists(Position)) {
          //this.obj.ActiveDocument.Bookmarks(Position).Range.Select(); //测试
          setTimeout(this.obj.ActiveDocument.Application.Selection.GoTo(-1, 0, 0, Position),200);
          this.ConsoleOut("<VBAInsertFile> 跳转到书签指定位置。。。 ");
        }
        this.obj.Activate(true);
        this.ConsoleOut("<VBAInsertFile> 激活当前对象。。。 ");
        this.obj.ActiveDocument.Application.Selection.InsertFile(FileName, "", false, false, false);
        this.ConsoleOut("<VBAInsertFile> 插入。。。 "+FileName+"...成功");
        return true;
      } else {
        this.Status = "非Office文档，无法执行插入文档操作";
        this.ConsoleOut("<VBAInsertFile> 非Office文档，无法执行插入文档操作。。。 ");
        return false;
      }
    } catch (e) {
      this.Status = "插入文档失败，错误原因：" + e.description;
      this.ConsoleOut("插入文档失败，错误原因：" + e.description);
      return false;
    }
  }

    //接受所有痕迹
    this.WebAcceptAllRevisions = function () {
        try {
            this.obj.Activate(true);
            this.obj.ActiveDocument.Revisions.AcceptAll();
            return this.obj.ActiveDocument.Revisions.Count >= 0 ? true : false;
        } catch (e) {
            return false;
        }
    }
    //设置WORD用户名
    this.VBASetUserName = function (UserName) {
    	 try{ 
        this.obj.ActiveDocument.Application.UserName = UserName;
		
    	 }catch(e){
    		 return false;
    }
     }
     //设置域
     this.ShowField  = function(){
    	try{
    	 this.obj.ActiveDocument.ActiveWindow.View.ShowDrawings = true;
    	// this.obj.ActiveDocument.ActiveWindow.View.ShowFieldCodes = true;
    	}catch(e){
    		return false;
    	}
     }

     //区域保护
     this.WebAreaProtect = function(BMarksName){
		 //alert(BMarksName);
		 //alert(this.obj.ActiveDocument.BookMarks.Exists(BMarksName));
	    if(!this.obj.ActiveDocument.BookMarks.Exists(BMarksName)){//判断是否存在该书签
	    	alert("文件内没有名称为'"+BMarksName+"'的书签 ,请先添加书签!");
	    	return;
		}
    	//var range = this.obj.Range;
    	var range = this.obj.ActiveDocument.Bookmarks.Item(BMarksName).Select();
    	//range.Select();
    	this.obj.ActiveDocument.bookmarks.Item(BMarksName).range.editors.add(-1); //常量：wdeditoreveryone=-1
    	this.obj.ActiveDocument.Protect(3,false,"123",false,false);//常量：wdAllowOnlyReading=3
    	this.obj.ActiveDocument.Application.Selection.MoveLeft(Unit = 1, Count = 1);
    	this.obj.ActiveDocument.ActiveWindow.View.ShadeEditableRanges = false;//取消"突出显示可编辑区域"
        }
     //取消区域保护
     this.WebAreaUnprotect = function(BMarksName){
	 	if(this.obj.ActiveDocument.BookMarks.Exists(BMarksName)){//判断是否存在该书签
	 	try{
	 		this.obj.ActiveDocument.Unprotect("123");//解保护
	 		//var range = this.obj.Range;
	 		var range = this.obj.ActiveDocument.Bookmarks.Item(BMarksName).Range;
	 		range.Select();//选定书签内容
	 		this.obj.ActiveDocument.DeleteAllEditableRanges(-1); //去掉突出显示
	 	 }catch(e){
	 	 }
	 	}else{
	 		alert("不存在该书签!");
	 		return;
	 	}
		
		 
     }


    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * End VBA专区
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */



    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 皮肤
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */
    this.Skin = function (typeColor) {//设置边框的演示，使得iWebOffice更好看
        var titleBarColor;
        var menuBarStartColor;
        var menuBarButtonStartColor;
        var menuBarButtonEndColor;
        var menuBarButtonFrameColor;
        var CustomToolbarStartColor;
        switch (typeColor) {
            case "purple": titleBarColor = 0xCC99CC; CustomToolbarStartColor = 0xCC99CC;menuBarStartColor = 0xCC99CC; menuBarButtonStartColor = 0xFFFFFF; menuBarButtonEndColor = 0xAD8DAD; menuBarButtonFrameColor = 0x663366; break;
            case "black": titleBarColor = 0x646464; CustomToolbarStartColor = 0x646464;menuBarStartColor = 0xB7B5B4; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "white": titleBarColor = 0xC6C1BE; CustomToolbarStartColor = 0xC6C1BE;menuBarStartColor = 0xF5F3F2; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "blue": titleBarColor = 0xD5B69F; CustomToolbarStartColor = 0xD5B69F;menuBarStartColor = 0xFCF3EF; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "yellow": titleBarColor = 0x00CCFF; CustomToolbarStartColor = 0x00CCFF;menuBarStartColor = 0x6AB9FF; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
        }
        var style = this.obj.Style;
        style.TitleBarColor = titleBarColor;
        style.TitleBarTextColor = 0x000000;
        style.MenuBarStartColor = menuBarStartColor;
        style.MenuBarEndColor = 0xFFFFFF;
        style.MenuBarTextColor = 0x000000;
        style.MenuBarHighlightTextColor = 0x000000;
        style.MenuBarButtonStartColor = menuBarButtonStartColor;
        style.MenuBarButtonEndColor = menuBarButtonEndColor;
        style.MenuBarButtonFrameColor = menuBarButtonFrameColor;
        style.CustomToolbarStartColor=CustomToolbarStartColor;
        style.Invalidate();

    }
    this.setColor = function (typeColor) {   //设置边框演示
    	var titleBarColor;
        var menuBarStartColor;
        var menuBarButtonStartColor;
        var menuBarButtonEndColor;
        var menuBarButtonFrameColor;
        var CustomToolbarStartColor;
        switch (typeColor) {
            case "purple": titleBarColor = 0xCC99CC; CustomToolbarStartColor = 0xCC99CC;menuBarStartColor = 0xCC99CC; menuBarButtonStartColor = 0xFFFFFF; menuBarButtonEndColor = 0xAD8DAD; menuBarButtonFrameColor = 0x663366; break;
            case "black": titleBarColor = 0x646464; CustomToolbarStartColor = 0x646464;menuBarStartColor = 0xB7B5B4; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "white": titleBarColor = 0xC6C1BE; CustomToolbarStartColor = 0xC6C1BE;menuBarStartColor = 0xF5F3F2; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "blue": titleBarColor = 0xD5B69F; CustomToolbarStartColor = 0xD5B69F;menuBarStartColor = 0xFCF3EF; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
            case "yellow": titleBarColor = 0x00CCFF; CustomToolbarStartColor = 0x00CCFF;menuBarStartColor = 0x6AB9FF; menuBarButtonStartColor = 0xF2EAF5; menuBarButtonEndColor = 0xF2EAF5; menuBarButtonFrameColor = 0xF2EAF5; break;
        }
        var style = this.obj.Style;
        style.TitleBarColor = titleBarColor;
        style.TitleBarTextColor = 0x000000;
        style.MenuBarStartColor = menuBarStartColor;
        style.MenuBarEndColor = 0xFFFFFF;
        style.MenuBarTextColor = 0x000000;
        style.MenuBarHighlightTextColor = 0x000000;
        style.MenuBarButtonStartColor = menuBarButtonStartColor;
        style.MenuBarButtonEndColor = menuBarButtonEndColor;
        style.MenuBarButtonFrameColor = menuBarButtonFrameColor;
        style.CustomToolbarStartColor=CustomToolbarStartColor;
        style.Invalidate();
    }
    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * End 皮肤
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */


    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 手写签批功能
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */
    //添加手写签批工具栏
    this.AddToolbar=function() {
    	//this.obj.Style.ShowCustomToolbar=true;
    	this.obj.Handwritting.Show = !this.obj.Handwritting.Show;
    	var URL = this.WebUrl.substring(0, this.WebUrl.lastIndexOf("/"));
	    var customtoolbar = this.obj.CustomToolbar;
		customtoolbar.AddToolButton(301,"手写签名",URL+"/HandWrite/"+"shouxie24.png", "手写签名",0);
		customtoolbar.AddToolButton(302,"停止手写",URL+"/HandWrite/"+"tingzhi24.png","停止手写",0);
		customtoolbar.AddToolButton(303,"文字签名",URL+"/HandWrite/"+"wenzi24.png","文字签名",0);
		customtoolbar.AddToolButton(300,"-","","",1);
		customtoolbar.AddToolButton(304,"图形签名",URL+"/HandWrite/"+"tuxing24.png","图形签名",0);
		customtoolbar.AddToolButton(305,"取消上一个签批",URL+"/HandWrite/"+"quxiao24.png","取消上一个签批",0);
		customtoolbar.AddToolButton(306,"显示用户签批",URL+"/HandWrite/"+"xianshi24.png","显示用户签批",0);
	}
	
	//隐藏手写签批工具栏
    this.VisibleToolsButton=function() {
    	//this.obj.Style.ShowCustomToolbar=true;
    	this.obj.Handwritting.Show = !this.obj.Handwritting.Show;
    	var URL = this.WebUrl.substring(0, this.WebUrl.lastIndexOf("/"));
	    var customtoolbar = this.obj.CustomToolbar;
		customtoolbar.DisableToolsButton("手写签名",1);
		customtoolbar.DisableToolsButton("停止手写",1);
		customtoolbar.VisibleToolsButton("文字签名",1);
		customtoolbar.AddToolButton(300,"-","","",1);
		customtoolbar.VisibleToolsButton("图形签名",0);
		customtoolbar.VisibleToolsButton("取消上一个签批",0);
		customtoolbar.VisibleToolsButton("显示用户签批",0);
		
		this.obj.Style.Invalidate();
	}

  //手写签批
    this.HandWriting = function(penColor,penWidth){
    	var handwritting = this.obj.Handwritting;
		var handsetting = handwritting.DrawingSetting;
		handsetting.PenThicker = penWidth;
		handsetting.PenColor = penColor;
		handwritting.AnnotateDraw();
		this.ShowMenuBar(false);//签批时隐藏菜单栏
		this.ShowToolBars(false);//签批时隐藏工具栏


    }
    //停止手写签批
    this.StopHandWriting = function(){
    	var handwritting = this.obj.Handwritting;
			handwritting.StopAnnotate();
			this.ShowMenuBar(true);//停止签批时显示菜单栏
			this.ShowToolBars(true);//停止签批时显示工具栏
    }
    //文字签名
    this.TextWriting = function(){
    	var handwritting = this.obj.Handwritting;
		var textsetting = handwritting.TextSetting;
		textsetting.TextSize = 32;
		textsetting.TextColor = 0xbb00ff;
		textsetting.FontName = "宋体";
		handwritting.AnnotateText();
		this.ShowMenuBar(false);//签批时隐藏菜单栏
		this.ShowToolBars(false);//签批时隐藏工具栏

    }
    //图形签批
    this.ShapeWriting = function(){
    	var handwritting = this.obj.Handwritting;
		var shapesetting = handwritting.ShapeSetting;
		shapesetting.ShapeType = 0;
		shapesetting.BackgroundColor = 0xffffff;
		shapesetting.BorderColor = 0xff0000;
		shapesetting.BorderWidth = 6;
		handwritting.AnnotateShape();
		this.ShowMenuBar(false);//签批时隐藏菜单栏
		this.ShowToolBars(false);//签批时隐藏工具栏
    }
    //取消上一次签批
    this.RemoveLastWriting = function(){
    	var handwritting = this.obj.Handwritting;
		handwritting.RemoveLast();
    }
    //显示某用户的签批
    this.ShowWritingUser = function(bVal,username){
    	var strxml = this.obj.GetAnnotations();
    	var json = eval('(' + strxml + ')');
		if (username != "" && username != null && username!=undefined) {
			for(var i=0;i<json.Annotations.length;i++)
			{
				if(json.Annotations[i].Annotation.User != username) {
					var id = json.Annotations[i].Annotation.ID;
					this.obj.GetAnnotationByID(id).Visible = bVal;
				}
			}
		}else {
			for(var i=0;i<json.Annotations.length;i++)
			{
				var id = json.Annotations[i].Annotation.ID;
				this.obj.GetAnnotationByID(id).Visible = bVal;
			}
		}
    }
    //显示/隐藏手写签批工具栏
    this.ShowCustomToolbar = function(bVal){
    	this.obj.Style.ShowCustomToolbar=bVal;
    	//if(bVal==true) this.obj.Style.CustomToolbarStartColor=0xDDA0DD; //设置签批工具栏颜色
    }
    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 手写签批功能
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */

    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 扩展功能
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××

    */
    //保存为PDF
    this.WebSavePDF = function(){
    	var httpclient = this.obj.Http; //设置http对象
        httpclient.Clear();
	   	this.WebSetMsgByName("RECORDID",this.RecordID);
	   	this.WebSetMsgByName("OPTION","SAVEPDF");
	   	this.WebSetMsgByName("FILENAME",this.RecordID + ".pdf");//加载FileName
	   	this.SaveAsPdf(this.getFilePath()+this.RecordID + ".pdf");
		//alert(this.getFilePath()+this.RecordID + ".pdf");
	   	if(this.SAVEFILE(httpclient,this.getFilePath()+this.RecordID + ".pdf")){
   		 this.Status = "保存文件成功";
   		 this.obj.FuncExtModule.alert("保存PDF成功!");
   		 return true;
	   	}
   	 this.Status = "保存文件失败";
   	 return false;
   }



    this.SaveAsPdf = function(FilePath){
    	//var FilePath=this.getFilePath() + this.RecordID + ".pdf";
    	if ((this.FileType  == ".doc") || (this.FileType  == ".docx") || (this.FileType  == ".wps"))
		  {
		  	try
				{
		  		//this.obj.ActiveDocument.ExportAsFixedFormat(FilePath, 17, false, 0, 0, 1, 1, 0, true, true, 0, true, true, true);
				
				//解决Office360签章另存为PDF后，pdf文档上印章显示为黑底
				//this.obj.ActiveDocument.ExportAsFixedFormat(FilePath, 17,false,0,0,0,0,0,false,true,0,true,true,false);
				this.obj.ActiveDocument.ExportAsFixedFormat(FilePath, 17,false, 0,0,0,0,0, true, true,2,true,true,false);
				}
				catch (e)
				{
					this.Status = e.description;
					return false;
		  	}
				return true;
		  }
	  }
	  
	  this.CreateNewOFD = function(){
		  this.obj.CreateNew("{7017318C-BC50-4DAF-9E4A-10AC8364C364}");
	  }

    //保存为html
    this.SaveAsHtml = function(FilePath){
    	if ((this.FileType  == ".doc") || (this.FileType  == ".docx") || (this.FileType  == ".wps"))
  	  {
  	  	try
  			{
  	  			var ret = this.obj.ActiveDocument.SaveAs(FilePath,8,false,"",false,"",false,false,false,false,false,0);
  			   	this.obj.ActiveDocument.Application.ActiveWindow.View.type = 3;//3是页面视图
  			}
  			catch (e)
  			{
  				this.Status = e.description;
  				return false;
  	  	}
  	  	return true;;
  	  	}
    }

    this.WebSaveHtml = function(){
	  	if(this.SaveAsHtml("C:\\"+this.RecordID + ".html"))
	  	{
		  	alert("保存Html成功!\n保存路径:  "+"C:\\"+this.RecordID + ".html");
			
			var htmlpath = "C:\\"+this.RecordID + ".html";
		  
		  //alert(this.obj.GetHTML(htmlpath));
	  	}
    }

	//图片章
	this.WebOpenSignature = function ()
    {
    	//alert("111");
		var funExt = this.obj.FuncExtModule;
    	funExt.ServerType = 1;
    	funExt.SetDocument(this.obj.ActiveDocument);
    	funExt.WebUrl = this.WebUrl;
    	funExt.WebOpenSignature();
    }

	//FuncExtModule接口测试
	this.FuncExtModule = function()
	{
		alert(this.obj.FuncExtModule);
		alert('当前控件版本为：'+this.obj.FuncExtModule.Version());
	}

	//执行宏
    this.WebRunMacro = function(MarcroName,MacroValue){
    	try{
    		   var VBAStr =  MacroValue;
    		   var VBCom;
    		   VBCom = this.obj.ActiveDocument.VBProject.VBComponents.Add(1);
    		   VBCom.CodeModule.AddFromString(VBAStr);
    		   this.obj.ActiveDocument.Application.Run(MarcroName);
    		   return true;
    	     	}catch(e){
    	     		return false;
    	     	}
     }
    this.WebDownloadFile = function(fn) {
    	this.Status = '';
    	var httpclient = this.obj.Http; //设置http对象
      httpclient.Clear();
      this.WebSetMsgByName("USERNAME", this.UserName); 	//加载UserName
      this.WebSetMsgByName("FILENAME", fn); 						//加载FileName
      this.WebSetMsgByName("FILETYPE", this.FileType); 	//加载FileType
      this.WebSetMsgByName("RECORDID", this.RecordID); 	//加载RecordID
      this.WebSetMsgByName("OPTION", "LOADFILE");     	//发送请求LOADFILE
      httpclient.AddForm("FormData", this.WebSendMessage()); //这里是自定义json 传输格式。
      this.WebClearMessage();                         //清除所有WebSetMsgByName参数

      httpclient.ShowProgressUI = true;//显示进度条
      if (httpclient.Open(this.HttpMethod.Post, this.WebUrl, false)) {//这里采用同步方式打开文档。我要返回值
      	if (httpclient.Send()) {
        	if (httpclient.GetResponseHeader("MsgError") == "404") { //判断服务器是否存在文件
						this.Status = '文档【' + fn + '】下载失败，请确认该文档在服务器上是否存在';
          	httpclient.Clear();
            return false;
          }
          httpclient.Clear();
          if (this.hiddenSaveLocal(httpclient, this, false, false, fn)) {//下载成功时
          	this.Status = '文档下载成功';
          	return true;
		 			}
		 			else {
		 				this.Status = '文档下载失败';
          	return false;
		 			}
    		}
    	}
    }
    this.WebDocumentCompare = function(FileName1, FileName2){
    	//与当前打开的文档进行对比
    	this.Status = '';
    	var fs = this.obj.FileSystem; //创建file对象：
    	var filePath = fs.GetSpecialFolderPath(0x1a) + this.DOWN;
    	var saveFilePath = filePath + Math.round(Math.random() * 100000000) + '.doc';
    	if ((FileName1 == null) || (FileName1 == '')) {
    		if ((FileName2 == null) || (FileName2 === '')) {
    			this.Status = '【FileName2】不能为空!';
    			return false;
    		}
    		else {
    			//开始下载FileName2
    			if (this.WebDownloadFile(FileName2)) {
    				FileName1 = this.FileName;
    				this.WebSaveLocalFile(filePath + FileName1);
    				this.WebClose();
    				var bRet = this.obj.FuncExtModule.WebDocumentCompare(filePath + FileName1, filePath + FileName2, saveFilePath);
        		if (bRet == true) {
            	this.obj.Open(saveFilePath);
            	this.obj.ActiveDocument.Application.ActiveWindow.View.type = 3;
            	this.obj.ActiveDocument.Application.ActiveWindow.View.SplitSpecial = 20;
            	return true;
        		}
        		else {
        			this.Status = '文档对比失败,请确认待对比的文档是否能够正常打开!';
        			return false;
        		}
    			}
    			else {
    				this.Status = '文件【' + FileName2 + '】下载失败，该文档可能在服务器不存在!';
    				return false;
    			}
    		}
    	}
    	//与指定的后台两个文档进行对比
    	else{
    		if ((FileName2 == null) || (FileName2 == '')) {
    			this.Status = '【FileName2】不能为空!';
    			return false;
    		}
    		else {
    			//开始分别下载指定的两个文件
    			if (this.WebDownloadFile(FileName1)) {
    				if ((this.WebDownloadFile(FileName2))) {
    					this.WebClose();
    					var bRet = this.obj.FuncExtModule.WebDocumentCompare(filePath + FileName1, filePath + FileName2, saveFilePath);
        			if (bRet == true) {
            		this.obj.Open(saveFilePath);
            		this.obj.ActiveDocument.Application.ActiveWindow.View.type = 3 //
            		this.obj.ActiveDocument.Application.ActiveWindow.View.SplitSpecial = 20;
            		return true;
        			}
        			else {
        				this.Status = '文档对比失败,请确认待对比的文档是否能够正常打开!';
        				return false;
        			}
    				}
    				else {
    					this.Status = '文件【' + FileName2 + '】下载失败，该文档可能在服务器不存在!';
    					return false;
    				}
    			}
    			else {
    				this.Status = '文件【' + FileName1 + '】下载失败，该文档可能在服务器不存在!';
    				return false;
    			}
    		}
    	}
    }
	
	// 清理Rounded痕迹
    this.ClearMarks = function()
    {
    	//this.obj.ActiveDocument.Shapes(1).Name;
    	var shapeCount = this.obj.ActiveDocument.Shapes.Count;
    	for(var i=shapeCount; i>=1; i--)
    	{
    		var shapeName = this.obj.ActiveDocument.Shapes(i).Name;
    		if( shapeName.indexOf("Rounded Rectangle") != -1 )
    		{
    			this.obj.ActiveDocument.Shapes(i).Delete();	
    		}
    	}
    	
    }
	
	
	/* 按设置的打印份数进行打印 */
	this.PrintByCopies = function(Copies, Show) {
		var mAPIObj;
    	var mApiName;
    	var mAppName;
		//this.obj.FuncExtModule.alert("1234");
		//this.obj.FuncExtModule.alert(this.obj.ActiveDocument.Application.Name);
    	mAppName = this.obj.ActiveDocument.Application.Name;
		//this.obj.FuncExtModule.alert(mAppName);
    	if(mAppName == "Microsoft Word"){
    		mAPIObj = this.obj.ActiveDocument.Application.Dialogs.Item(88);
    		if(Show){
    			mAPIObj.NumCopies = Copies;
    			if(mAPIObj.Display == -1){
    				mAPIObj.Execute;
    				this.Status = "打印成功";
    				return true;
    			}else{
    				this.Status = "启用打印机窗口失败";
    				return false;
    			}
    		}else{
    			//this.obj.FuncExtModule.alert(Copies);
				//mAPIObj.NumCopies = Copies;
				//this.obj.FuncExtModule.alert("222");
    			mAPIObj.Execute();
    			this.Status = "打印成功";
    			return true;
    		}
    	}else{
    		this.Status = "文档不是word类型";
    		return false;
    	}
	}
	
    /**
    ×××××××××××××××××××××××××××××××××××××××××××××××××××
    * 扩展功能
    * ×××××××××××××××××××××××××××××××××××××××××××××××××××
    */
	
	//科大讯飞定制插入尾注, contentText正文内容, endnotesText尾注信息
	this.WebSetEndnotes = function(contentText, endnotesText){
		var selection = this.WebObject.ActiveDocument.Application.Selection;
		selection.Text = contentText;
		var endnoteOptions = selection.EndnoteOptions;
        endnoteOptions.Location = 1;
        endnoteOptions.NumberingRule = 0;
        endnoteOptions.StartingNumber = 1;
        endnoteOptions.NumberStyle = 28;
        
        selection.Endnotes.Add(selection.Range, "", endnotesText);
	}
	
    this.AddZoneDomain = function(domain)
    {
    	 var WshShell=new ActiveXObject("WScript.Shell");
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + domain, "");
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + domain + "\\www","");
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Domains\\" + domain + "\\www\\http","2","REG_DWORD");
    }
    this.AddZoneRange = function(range)
    {
    	 var WshShell=new ActiveXObject("WScript.Shell");
    	 
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range100\\","");
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range100\\http","2","REG_DWORD");
    	 WshShell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\ZoneMap\\Ranges\\Range100\\:Range",range);
    }  
    
    this.IsItHasTrusted = function(version, app)
	{
		var ret = this.regRead("HKCU\\Software\\Microsoft\\Office\\" + version + "\\" + app + "\\Security\\Trusted Locations\\");  
		if(ret != null)
			return true;
		else
			return false;
	}
	this.SetTrustedLocation = function (version, app, location)
	{
		var ret = this.regWrite("HKCU\\Software\\Microsoft\\Office\\" + version + "\\" + app + "\\Security\\Trusted Locations\\Location99\\Path",location);  
		return ret;
	}
	this.DeleteTrustedLocation = function(version, app)
	{
		var ret = this.regDelete("HKCU\\Software\\Microsoft\\Office\\" + version + "\\" + app + "\\Security\\Trusted Locations\\Location99\\");  
		return ret;
	}
	
	/**
	*判断文档是否被修改，打开文档后先获取文档内容,传入参数0, 保存时传入参数1，判断文档是否被修改，提示是否要保存
	*/
	this.IsModify = function(value)
	{
		//alert(value);
		var ret = this.obj.IsModify(value);
		
		return ret;
	}
	
	/** 
	 * 注册表编辑器，封装对注册表的操作 
	 */  

	/** 返回名为 strName 的注册键或值。 
	 * @param strName 要读取的键或值。如果 strName 以反斜线 (\) 结束，本方法将返回键，而不是值 
	 * @return 名为 strName 的注册键或值 
	 */  
	this.regRead = function (strName)
	{  
		var WshShell= new ActiveXObject("WScript.Shell");

	    var val = null;  
	    try {  
	        val = WshShell.regRead(strName);
	    } catch (e) {  
	        //alert(e.message);  
	    }

	    return val;  
	}  
	   
	/** 设置 strName 指定的注册键或值 
	 * @param strName 要写的键或值的名称.如果 strName 以反斜线 (\) 结束，本方法将返回键，而不是值 
	 * @param anyValue 要写入键或注册表值中的值 
	 * @param strType 可选项。要保存到注册表中的值的数据类型REG_SZ、REG_EXPAND_SZ、REG_DWORD、REG_BINARY 
	 */  
	this.regWrite = function (strName,anyValue,strType)
	{
		var WshShell= new ActiveXObject("WScript.Shell");

	    if(strType == null)  
	        strType = "REG_SZ";  
	    WshShell.regWrite(strName,anyValue,strType);  
	}  
	   
	/** 从注册表中删除 strName 指定的键或值。 
	 * @param strName 要删除的键或值的名字。如果 strName 以反斜线 (\) 结束，本方法将删除键，而不是值 
	 */  
	this.regDelete = function (strName)
	{  
		var WshShell= new ActiveXObject("WScript.Shell");
		WshShell.regDelete(strName);  
	}  
	////////////////注册表编辑类end//////////////////////

}