using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;




namespace iWebOffice2015
{

    public partial class OpenAndSave_PPT : System.Web.UI.Page
	{
        public string mSubject;
        public string mStatus;
        public string mAuthor;
        public string mFileName;
        public string mFileDate;
        public string mHTMLPath;
        public string mFileVlaue;

        public string mDisabled;
        public string mDisabledSave;

        public string mHttpUrl;
        public string mScriptName;
        public string mServerName;
        public string mServerUrl;
        public String strSessionID;


        public string mRecordID;
        public string mTemplate;
        public string mFileType;
        public string mEditType;
        public string mUserName;
        public string mShowType;
        public bool isNewDocument=false;
        public String mFilePath;

        public string mWord;
        public string mExcel;
        public string mWPS;

        protected void Page_Load(object sender, System.EventArgs e)
        {


            mHTMLPath = "";
            mDisabled = "";
            //自动获取OfficeServer和OCX文件完整URL路径
            mScriptName = "DocumentEdit.aspx";
            mServerName = "/OfficeServer.aspx";	
           // mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
           // mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] ;
           //  mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            mServerUrl = mHttpUrl + mServerName;                           //取得OfficeServer文件的完整URL
            mFilePath = (Server.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath.ToString())).Replace("\\","\\\\");

            mRecordID = Request.QueryString["RecordID"];
            mTemplate = Request.QueryString["Template"];
            mFileType = Request.QueryString["FileType"];
            mEditType = Request.QueryString["EditType"];
            mShowType = Request.QueryString["ShowType"];
            mUserName = Request.QueryString["UserName"];
          //  mUserName = Request["UserName"].ToString();
            mFileVlaue = Request.QueryString["FileVal"];

            strSessionID = Session.SessionID;
            //取得编号
            if (mRecordID == null)
            {
                mRecordID = "";	//编号为空
            }
            //取得模式
            if (mEditType == null || mEditType == "")
            {
                mEditType = "1,1";		// 文档编辑类型  第一位可以为0,1,2,3 其中:0不可编辑;1可以编辑,无痕迹;2可以编辑,有痕迹,不能修订;3可以编辑,有痕迹,能修订；
                //'第二位可以为0,1 其中:0不可批注,1可以批注。可以参考iWebOffice2006的EditType属性，详细参考技术白皮书
            }
            //取得显示模式
            if (mShowType == null || mShowType == "")
            {
                mShowType = "1";	// 文档显示方式  1:表示文字批注  2:表示手写批注  0:表示文档核稿
            }

            //取得类型
            if (mFileType == null || mFileType == "")
            {
                mFileType = ".doc";	// 默认为.doc文档
            }
            //取得用户名
            if (mUserName == null || mUserName == "")
            {
                mUserName = "金格科技";
            }

            //取得模板
            if (mTemplate == null)
            {
                mTemplate = "";	// 默认没有模板
            }

            //设置打开的值
            if (mFileVlaue == null)
            {
                mFileVlaue = "1";
            }


            if (mEditType == "0")
            {
                mDisabled = "disabled";
                mDisabledSave = "disabled";
            }else
            {
                if (mFileType == ".doc" || mFileType==".docx")
                {
                    mWPS = "";
                    mWord = "";
                    mExcel = "disabled";
                }
                else if (mFileType==".wps")
                {
                    mWPS = "disabled";
                    mWord = "";
                    mExcel = "disabled";
                }
                else if (mFileType==".xls" || mFileType==".xlsx")
                {
                    mWord = "disabled";
                    mWPS = "";
                    mExcel = "";
                }
                else
                {
                    mDisabled = "disabled";
                }
            }
         mFileName = mRecordID + mFileType;  //取得完整的文档名称
        }

		#region Web 窗体设计器生成的代码
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: 该调用是 ASP.NET Web 窗体设计器所必需的。
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// 设计器支持所需的方法 - 不要使用代码编辑器修改
		/// 此方法的内容。
		/// </summary>
		private void InitializeComponent()
		{    
		}
		#endregion

}
}
