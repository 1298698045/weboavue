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
            //�Զ���ȡOfficeServer��OCX�ļ�����URL·��
            mScriptName = "DocumentEdit.aspx";
            mServerName = "/OfficeServer.aspx";	
           // mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
           // mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] ;
           //  mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            mServerUrl = mHttpUrl + mServerName;                           //ȡ��OfficeServer�ļ�������URL
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
            //ȡ�ñ��
            if (mRecordID == null)
            {
                mRecordID = "";	//���Ϊ��
            }
            //ȡ��ģʽ
            if (mEditType == null || mEditType == "")
            {
                mEditType = "1,1";		// �ĵ��༭����  ��һλ����Ϊ0,1,2,3 ����:0���ɱ༭;1���Ա༭,�޺ۼ�;2���Ա༭,�кۼ�,�����޶�;3���Ա༭,�кۼ�,���޶���
                //'�ڶ�λ����Ϊ0,1 ����:0������ע,1������ע�����Բο�iWebOffice2006��EditType���ԣ���ϸ�ο�������Ƥ��
            }
            //ȡ����ʾģʽ
            if (mShowType == null || mShowType == "")
            {
                mShowType = "1";	// �ĵ���ʾ��ʽ  1:��ʾ������ע  2:��ʾ��д��ע  0:��ʾ�ĵ��˸�
            }

            //ȡ������
            if (mFileType == null || mFileType == "")
            {
                mFileType = ".doc";	// Ĭ��Ϊ.doc�ĵ�
            }
            //ȡ���û���
            if (mUserName == null || mUserName == "")
            {
                mUserName = "���Ƽ�";
            }

            //ȡ��ģ��
            if (mTemplate == null)
            {
                mTemplate = "";	// Ĭ��û��ģ��
            }

            //���ô򿪵�ֵ
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
         mFileName = mRecordID + mFileType;  //ȡ���������ĵ�����
        }

		#region Web ������������ɵĴ���
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: �õ����� ASP.NET Web ���������������ġ�
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// �����֧������ķ��� - ��Ҫʹ�ô���༭���޸�
		/// �˷��������ݡ�
		/// </summary>
		private void InitializeComponent()
		{    
		}
		#endregion

}
}
