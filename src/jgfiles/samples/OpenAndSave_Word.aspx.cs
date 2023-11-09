using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Web.SessionState;

using iWebOffice.ocx.c.net;

using Supermore;
using Supermore.Files;
using Supermore.Data.DataProviders;
using Supermore.Data;
using Supermore.EntityFramework;
using Supermore.EntityFramework.Templates;
using Supermore.EntityFramework.Entities;
using Supermore.Configuration;
using Youyou.HRCore;
using Youyou.Files;

namespace WebClient.jgfiles.samples.OpenAndSave
{

    public partial class OpenAndSave_WordDataBase : System.Web.UI.Page
    {
        string instanceId = "";
        Supermore.CallContext caller;
        public string PageTitle;
        public string mSubject;
        public string mStatus;
        public string mAuthor;
        public string mFileName;
        public string mFileDate;
        public string mHTMLPath;

        public string mDisabled;
        public string mDisabledSave;

        public string mHttpUrl;
        public string mScriptName;
        public string mServerName;
        public string mServerUrl;

        public string mRecordID;
        public string mTemplate;
        public string mFileType;
        public string mEditType;
        public string mUserName;
        public string mShowType;

        string _objectTypeCode = "";//���ġ��������ļ�����
        public string _fileSource = "";
        public iDBManage2000 DBAobj;

        public string mWord;
        public string mExcel;
        string _organizationId = "";
        public String strSessionID;
        protected void Page_Load(object sender, System.EventArgs e)
        {
            instanceId = Request["id"];
            _objectTypeCode = Request["objectTypeCode"];
            _fileSource = Request["filesource"];
            _organizationId = Request["OrganizationId"];
            //mHTMLPath = "";
            //mDisabled = "";
            ////�Զ���ȡOfficeServer��OCX�ļ�����URL·��
            mScriptName = "DocEditor.aspx";
            mServerName = "/jgfiles/OfficeServerDB.aspx?OrganizationId="+ _organizationId+ "&filesource="+ _fileSource;

            strSessionID = Session.SessionID;

            //string remoteAddr = Request.ServerVariables["REMOTE_ADDR"];
            //string reverseProxyLocalIP = Settings.GetSetting("SiteRoot.ReverseProxy.LocalIP"); //����������������IP
            //string reverseProxyProxyIP = Settings.GetSetting("SiteRoot.ReverseProxy.ProxyIP");
            //if (MainUtil2.IsProxySet())
            //{
            //    if (remoteAddr == reverseProxyLocalIP) //������� �÷������ķ�������ַ
            //    {
            //        mHttpUrl = Settings.GetSetting("SiteRoot.Proxy") + Request.ServerVariables["SCRIPT_NAME"];
            //    }
            //    else
            //    {
            //        //if(Request.Url.Port!=80)
            //        mHttpUrl = string.Format("http://{0}:{1}{2}", Request.ServerVariables["HTTP_HOST"], Request.Url.Port, Request.ServerVariables["SCRIPT_NAME"]);
            //        //else
            //        //    mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
            //    }
            //}
            //else
            //{
            //    if (Request.Url.Port != 80)
            //    {
            //        int pos = -1;
            //        string url = Request.Url.ToString();
            //        pos = url.IndexOf('?');
            //        mHttpUrl = url.Substring(0, pos);
            //        //mHttpUrl = string.Format("http://{0}:{1}{2}", Request.ServerVariables["HTTP_HOST"], Request.Url.Port, Request.ServerVariables["SCRIPT_NAME"]);
            //    }
            //    else
            //        mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
            //}
            ////foreach (var key1 in Request.ServerVariables)
            ////{
            ////    string name = key1.ToString();
            ////    Supermore.Diagnostics.Trace.LogError(string.Format("ServerVariables:{0}:{1}", key1.ToString(), Request.ServerVariables[name]));
            ////}
            ////mHttpUrl = string.Format("http://{0}:{1}{2}", Request.ServerVariables["HTTP_HOST"], Request.Url.Port, Request.ServerVariables["SCRIPT_NAME"]);
            ////}
            //Supermore.Diagnostics.Trace.LogError("mHttpUrl:" + mHttpUrl);

            ////mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            //ȡ��OfficeServer�ļ�������URL
            string secure = HttpContext.Current.Request.ServerVariables["HTTPS"];
            string httpProtocol = (secure == "on" ? "https://" : "http://");
            mHttpUrl = httpProtocol + Request.ServerVariables["HTTP_HOST"];
            if (Request.Url.Port != 80)
            {
                mHttpUrl = mHttpUrl;//+ ":" + Request.Url.Port;
            }
            //mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"];
            mServerUrl = mServerName;
            Supermore.Diagnostics.Trace.Log("mHttpUrl:" + mHttpUrl);
            Supermore.Diagnostics.Trace.Log("mServerUrl:"+mServerUrl);
            //if (Request["OrganizationId"] != null)
            //{
            //    if (mServerUrl.IndexOf("?") > -1)
            //        mServerUrl += "&OrganizationId=" + Request["OrganizationId"]+ "&filesource="+_fileSource;
            //    else
            //        mServerUrl += "?OrganizationId=" + Request["OrganizationId"]+ "&filesource="+_fileSource;;
            //}
            // �ڴ˴������û������Գ�ʼ��ҳ��
            //DBAobj = (iDBManage2000)Session["DBDemo"];
            //mHTMLPath = "";
            //mDisabled = "";
            //�Զ���ȡOfficeServer��OCX�ļ�����URL·��
            //mScriptName = "DocumentEdit.aspx";
            //mServerName = "OfficeServer.aspx";
            //mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
            //mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            //mServerUrl = mHttpUrl + mServerName;  //ȡ��OfficeServer�ļ�������URL
            mRecordID = Request["id"];              //ȡ��Ψһֵ(mRecordID)
            mTemplate = Request["Template"];
            mFileType = Request.QueryString["FileType"];
            mEditType = Request.QueryString["EditType"];
            mShowType = Request.QueryString["ShowType"];
            mUserName = Request.QueryString["UserName"];

            #region new
            //caller = AppDataSource.GetCallContext();
            try
            {
                caller = AppDataSource.GetCallContext();
                if (caller == null)
                {
                    if (!string.IsNullOrEmpty(_organizationId))
                    {
                        if (caller.CustomerID.ToLower() != _organizationId.ToLower())
                        {
                            caller = AppDataSource.GetCallerByCustomerId(new Guid(_organizationId));
                        }
                    }
                }
                else
                {
                    _organizationId = caller.CustomerID;
                }
                mUserName = caller.FullName;

                LoadTemplateOptions();
            }
            catch (Exception e1)
            {
                //string err = e1.ToString();
                Supermore.Diagnostics.Trace.LogException(e1);
            }

            // �ڴ˴������û������Գ�ʼ��ҳ��
            //DBAobj = (iDBManage2000)Session["DBDemo"];
            DBAobj = new iDBManage2000(caller);
            DBAobj.Open();
            #endregion

            //ȡ�ñ��
            if (mRecordID == null)
            {
                mRecordID = "";	//���Ϊ��
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
                mUserName = caller.UserName;
            }
            //ȡ��ģ��
            if (mTemplate == null)
            {
                mTemplate = "";	// Ĭ��û��ģ��
            }

            ////�����ݿ�            
            string strSelectCmd = "Select * From Document Where RecordID='" + mRecordID + "'";
            SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
            SqlDataReader mReader = mCommand.ExecuteReader();
            try
            {
                if (mReader.Read())
                {
                    mRecordID = mReader["RecordID"].ToString();
                    mTemplate = mReader["Template"].ToString();
                    mSubject = mReader["Subject"].ToString();
                    mAuthor = mReader["Author"].ToString();
                    mFileDate = mReader["FileDate"].ToString();
                    mStatus = mReader["Status"].ToString();
                    mFileType = mReader["FileType"].ToString();
                    mHTMLPath = mReader["HTMLPath"].ToString();
                }
                else
                {
                    if (Request["filesource"] == ObjectTypeCodes.File.ToString())
                    {
                        Supermore.Diagnostics.Trace.Log("filesource:1");
                        GetEntityFile();
                    }
                    else if (Request["filesource"] == ObjectTypeCodes.MailAttach.ToString())
                    {
                        Supermore.Diagnostics.Trace.Log("filesource:2");
                        GetEntityEmailFile();
                    }
                    else
                    {
                        Supermore.Diagnostics.Trace.Log("filesource:3");
                        GetEntityAttach();
                    }
                    System.DateTime SystemTime;
                    SystemTime = DateTime.Now;
                    if (!string.IsNullOrEmpty(instanceId))
                        mSubject = EntityManager.GetEntityName(caller, EntityTemplateIDs.WFProcessInstance, new Guid(instanceId));

                    //mRecordID = Guid.NewGuid().ToString();
                    //mTemplate = mTemplate;
                    //mSubject = "����������";
                    mAuthor = mUserName;
                    mFileDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    mStatus = "DERF";
                    //mFileType = mFileType;
                    mHTMLPath = "";
                }
            }
            catch (Exception ex)
            {
                Supermore.Diagnostics.Trace.LogException(ex);
            }
            mReader.Close();

            //ȡ��ģʽ
            if (string.IsNullOrEmpty(mEditType))
            {
                mEditType = "0";        // �ĵ��༭����  ��һλ����Ϊ0,1,2,3 ����:0���ɱ༭;1���Ա༭,�޺ۼ�;2���Ա༭,�кۼ�,�����޶�;3���Ա༭,�кۼ�,���޶���
                                        //'�ڶ�λ����Ϊ0,1 ����:0������ע,1������ע�����Բο�iWebOffice2006��EditType���ԣ���ϸ�ο�������Ƥ��
                mDisabled = "disabled";
                mDisabledSave = "disablde";
                PageTitle = mSubject + "��ֻ����";
            }
            else if (mEditType == "0")
            {
                mEditType = "0";
                mDisabled = "disabled";
                mDisabledSave = "disabled";
                PageTitle = mSubject + "��ֻ����";
            }
            else if (mEditType == "1")
            {
                mEditType = "1";
                PageTitle = mSubject + "����д/�޺ۡ�";
            }
            else if (mEditType == "2")
            {
                mEditType = "2";
                PageTitle = mSubject + "����д/���ۡ�";
            }
            else if (mEditType == "3")
            {
                mEditType = "3";
                PageTitle = mSubject + "����д/���ۡ�";
            }
            else
            {
                mEditType = "0";
                mDisabled = "disabled";
                mDisabledSave = "disabled";
                PageTitle = mSubject + "��ֻ����";
            }
            if (string.IsNullOrEmpty(mFileName))
                mFileName = mRecordID + mFileType;
            if (mFileType == ".doc" || mFileType == ".docx" || mFileType == ".wps" || mFileType == "doc" || mFileType == "docx")
            {
                mWord = "";
                mExcel = "disabled";
            }
            else if (mFileType == ".xls" || mFileType == ".xlsx")
            {
                mWord = "disabled";
                mExcel = "";
            }
            else
            {
                mDisabled = "disabled";
            }


            DBAobj.Close();
        }



        /// <summary>
        /// �ļ���Դ�� ����
        /// </summary>
        void GetEntityAttach()
        {
            Entity entity = EntityManager.GetEntity(caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
            Supermore.Diagnostics.Trace.Log("filesource:4");
            Supermore.Diagnostics.Trace.Log("filesource:5,"+ EntityTemplateIDs.RelatedAttachment);
            string virtualPath = "";
            string realPath = "";
            string rootPath = "";
            string filePath = "";
            string fileName = "";
            string fileExtension = "";
            if (entity != null)
            {
                //virtualPath = StringUtil.GetString(entity.Fields["FileLocation"].Value);
                //realPath = virtualPath.Replace("/", "\\");
                //rootPath = IOPaths.AttachFiles;
                //filePath = rootPath + realPath;
                mSubject = StringUtil.GetString(entity.Fields["Name"].Value);
                mFileType = StringUtil.GetString(entity.Fields["FileExtension"].Value);
                if (!string.IsNullOrEmpty(mFileType))
                {
                    if (mFileType.Substring(0, 1) != ".")
                    {
                        mFileType = "." + mFileType;
                    }
                }
                /*
                mRecordID = mReader["RecordID"].ToString();
                mTemplate = mReader["Template"].ToString();
                mSubject = mReader["Subject"].ToString();
                mAuthor = mReader["Author"].ToString();
                mFileDate = mReader["FileDate"].ToString();
                mStatus = mReader["Status"].ToString();
                mFileType = mReader["FileType"].ToString();
                mHTMLPath = mReader["HTMLPath"].ToString();
                 */

                //����������־
                FilelibManager mgr = new FilelibManager();
                FileLogModel fileLog = new FileLogModel();
                fileLog.FileId = mRecordID;
                fileLog.RegardingObjectTypeCode = ObjectTypeCodes.RelatedAttachment;
                fileLog.IpAddr = Request.UserHostAddress;
                fileLog.BrowserName = Request.Browser + Request.Browser.Version;
                fileLog.ModifiedBy = caller.UserID;
                fileLog.ModifiedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                fileLog.CreatedBy = caller.UserID;
                fileLog.CreatedBy = caller.UserID;
                fileLog.CreatedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                fileLog.UserName = caller.UserName;
                fileLog.IsDownload = 0;
                fileLog.OwningUser = caller.UserID;
                fileLog.ValueId = Guid.NewGuid().ToString();

                mgr.AddFileLog(caller, fileLog);
            }
        }
        /// <summary>
        /// �ļ���Դ�� �ļ�����
        /// </summary>
        void GetEntityFile()
        {
            string virtualPath = "";
            string realPath = "";
            string rootPath = "";
            string filePath = "";
            //string fileName = "";
            string fileExtension = "";
            FileEntity fileEntity = FileManager.GetFile(this.caller, new Guid(mRecordID));
            //FileEntity file = FileManager.GetFile(_caller, new Guid(fileId));
            if (fileEntity != null)
            {
                mSubject = fileEntity.Name;
                //virtualPath = fileEntity.VirtualPath;
                //realPath = virtualPath.Replace("/", "\\");
                //rootPath = IOPaths.Files;
                //filePath = rootPath + realPath;
                fileExtension = fileEntity.FileExtension;

                if (!string.IsNullOrEmpty(fileExtension))
                {
                    if (fileExtension.Substring(0, 1) != ".")
                    {
                        fileExtension = "." + fileExtension;
                    }
                }
                mFileType = fileExtension;

                //ʹ�ü�¼
                FileManager.FileHitUse(this.caller, new Guid(mRecordID));

                //����������־
                FilelibManager mgr = new FilelibManager();
                FileLogModel fileLog = new FileLogModel();
                fileLog.FileId = mRecordID;
                fileLog.RegardingObjectTypeCode = ObjectTypeCodes.File;
                fileLog.IpAddr = Request.UserHostAddress;
                fileLog.BrowserName = Request.Browser + Request.Browser.Version;
                fileLog.ModifiedBy = caller.UserID;
                fileLog.ModifiedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                fileLog.CreatedBy = caller.UserID;
                fileLog.CreatedBy = caller.UserID;
                fileLog.CreatedOn = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

                fileLog.UserName = caller.UserName;
                fileLog.IsDownload = 0;
                fileLog.OwningUser = caller.UserID;
                fileLog.ValueId = Guid.NewGuid().ToString();

                mgr.AddFileLog(caller, fileLog);
            }
        }

        void GetEntityEmailFile()
        {
            string virtualPath = "";
            string realPath = "";
            string rootPath = "";
            string filePath = "";
            //string fileName = "";
            string fileExtension = "";

            //�ʼ�����
            Entity entity = EntityManager.GetEntity(this.caller, ObjectTypeCodes.MailAttach, new Guid(mRecordID));


            if (entity != null)
            {
                virtualPath = StringUtil.GetString(entity.Fields["FileLocation"].Value);
                realPath = virtualPath.Replace("/", "\\");
                rootPath = IOPaths.EmailAttachFiles;
                filePath = rootPath + realPath;
                mSubject = StringUtil.GetString(entity.Fields["Name"].Value);

                fileExtension = StringUtil.GetString(entity.Fields["FileExtension"].Value);


                if (!string.IsNullOrEmpty(fileExtension))
                {
                    if (fileExtension.Substring(0, 1) != ".")
                    {
                        fileExtension = "." + fileExtension;
                    }
                }
                mFileType = fileExtension;

                //ʹ�ü�¼
                FileManager.FileHitUse(this.caller, new Guid(mRecordID));

              

            }
        }

        public void LoadTemplateOptions()
        {
            try
            {
                string strSelectCmd = "Select RecordID,FileName From Template_File Where IsPublic=1 OR CreatedBy='{0}' OR OwningBusinessUnit='{1}'";
                strSelectCmd = string.Format(strSelectCmd, this.caller.UserID, this.caller.BussinessUnitId);

                DataSet ds = AppDataSource.GetDataSet(this.caller, strSelectCmd);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string recordID = StringUtil.GetString(dr["RecordID"]);
                    string fileName = StringUtil.GetString(dr["FileName"]);
                    this.TemplateOptions += string.Format("<option value='{0}'>{1}</option>", recordID, fileName);
                }

            }
            catch (Exception ex)
            {
                Supermore.Diagnostics.Trace.LogException(ex);
            }
        }
        public bool IsIE()
        {
            return MainUtil2.IsIEBrowser();
        }
        public string TemplateOptions { set; get; }

        public string InstanceId
        {
            get { return instanceId; }
            set { instanceId = value; }
        }

        public string FileSource
        {
            get { return _fileSource; }
            set { _fileSource = value; }
        }
        public string ObjectTypeCode
        {
            get { return _objectTypeCode; }
            set { _objectTypeCode = value; }
        }
    }
}
