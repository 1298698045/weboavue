﻿using iWebOffice.ocx.c.net;
using Supermore;
using Supermore.Data;
using Supermore.EntityFramework.Entities;
using Supermore.Files;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Youyou.Files;

namespace WebClient.jgfiles.KGBrowser
{
    public partial class Word : System.Web.UI.Page
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

        string _objectTypeCode = "";//正文、附件、文件管理
        public string _fileSource = "";
        public iDBManage2000 DBAobj;

        public string mWord;
        public string mExcel;
        string _organizationId = "";
        public String strSessionID;
        protected void Page_Load(object sender, System.EventArgs e)
        {

            //WebOfficeObj.ServerUrl = "<%=mHttpUrl%>";
            //WebOfficeObj.SaveServlet = "/OfficeServer.aspx";
            //WebOfficeObj.UserName = "演示人";            // 用户名
            //WebOfficeObj.FileName = "Temone.doc";       //  被打开的文件名
            //WebOfficeObj.FileType = ".doc";            //   文件类型  .doc  .xls
            //WebOfficeObj.ShowMenu = 0;                   // 不显示菜单
            //WebOfficeObj.ShowToolBar = 0;                // 不显示工具条
            //WebOfficeObj.WebOpen();                      // 打开文件
            //WebOfficeObj.SaveServlet = "/jgfiles/OfficeServer.aspx";
            //WebOfficeObj.UserName = "演示人";            // 用户名
            //WebOfficeObj.FileName = "/Document/Temone.doc";       //  被打开的文件名
            //WebOfficeObj.FileType = ".doc";            //   文件类型  .doc  .xls

            //WebOfficeObj.ServerUrl = "<%=mHttpUrl%>";
            //WebOfficeObj.SaveServlet = "<%=mServerUrl%>";
            //WebOfficeObj.RecordID = "<%=mRecordID%>"; //文件ID
            //WebOfficeObj.Template = "<%=mTemplate%>";            //Template:模板编号
            //WebOfficeObj.UserName = "<%=mUserName%>";            //UserName:操作用户名，痕迹保留需要
            //WebOfficeObj.FileName = "<%=mFileName%>";            //FileName:文档名称
            //WebOfficeObj.FileType = "<%=mFileType%>";            //FileType:文档类型  .doc  .xls  .wps
            //WebOfficeObj.EditType = "<%=mEditType%>";           //EditType:编辑类型  方式一、方式二  <参考技术文档>  
            //WebOfficeObj.fileSource = "<%=_fileSource%>";//1001:附件  100100:文件

            instanceId = Request["id"];
            _objectTypeCode = Request["objectTypeCode"];
            _fileSource = Request["filesource"];
            _organizationId = Request["OrganizationId"];
            mScriptName = "DocEditor.aspx";
            strSessionID = Session.SessionID;
            //取得OfficeServer文件的完整URL
            string secure = HttpContext.Current.Request.ServerVariables["HTTPS"];
            string httpProtocol = (secure == "on" ? "https://" : "http://");
            //服务器地址
            mHttpUrl = httpProtocol + Request.ServerVariables["HTTP_HOST"];
            if (Request.Url.Port != 80)
            {
                mHttpUrl = mHttpUrl; //+ ":" + Request.Url.Port;
            }
            //文件服务路径
            mServerUrl = "/jgfiles/OfficeServerDB.aspx?OrganizationId=" + _organizationId + "&filesource=" + _fileSource;
            //打开文件名称
           
            //if (Request["OrganizationId"] != null)
            //{
            //    if (mServerUrl.IndexOf("?") > -1)
            //        mServerUrl += "&OrganizationId=" + Request["OrganizationId"]+ "&filesource="+_fileSource;
            //    else
            //        mServerUrl += "?OrganizationId=" + Request["OrganizationId"]+ "&filesource="+_fileSource;;
            //}
            // 在此处放置用户代码以初始化页面
            //DBAobj = (iDBManage2000)Session["DBDemo"];
            //mHTMLPath = "";
            //mDisabled = "";
            //自动获取OfficeServer和OCX文件完整URL路径
            //mScriptName = "DocumentEdit.aspx";
            //mServerName = "OfficeServer.aspx";
            //mHttpUrl = "http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"];
            //mHttpUrl = mHttpUrl.Substring(0, mHttpUrl.Length - mScriptName.Length);
            //mServerUrl = mHttpUrl + mServerName;  //取得OfficeServer文件的完整URL
            mRecordID = Request["id"];              //取得唯一值(mRecordID)
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
                        if (caller!=null && caller.CustomerID.ToLower() != _organizationId.ToLower())
                        {
                            caller = AppDataSource.GetCallerByCustomerId(new Guid(_organizationId));
                        }
                        else
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

            // 在此处放置用户代码以初始化页面
            //DBAobj = (iDBManage2000)Session["DBDemo"];
            DBAobj = new iDBManage2000(caller);
            DBAobj.Open();
            #endregion

            //取得编号
            if (mRecordID == null)
            {
                mRecordID = "";	//编号为空
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
                mUserName = caller.UserName;
            }
            //取得模板
            if (mTemplate == null)
            {
                mTemplate = "";	// 默认没有模板
            }

            ////打开数据库            
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
                        GetEntityFile();
                    }
                    else if (Request["filesource"] == ObjectTypeCodes.MailAttach.ToString())
                    {
                        GetEntityEmailFile();
                    }
                    else
                    {
                        GetEntityAttach();
                    }
                    System.DateTime SystemTime;
                    SystemTime = DateTime.Now;
                    if (!string.IsNullOrEmpty(instanceId))
                        mSubject = EntityManager.GetEntityName(caller, EntityTemplateIDs.WFProcessInstance, new Guid(instanceId));

                    //mRecordID = Guid.NewGuid().ToString();
                    //mTemplate = mTemplate;
                    //mSubject = "请输入主题";
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

            //取得模式
            if (string.IsNullOrEmpty(mEditType))
            {
                mEditType = "0";        // 文档编辑类型  第一位可以为0,1,2,3 其中:0不可编辑;1可以编辑,无痕迹;2可以编辑,有痕迹,不能修订;3可以编辑,有痕迹,能修订；
                                        //'第二位可以为0,1 其中:0不可批注,1可以批注。可以参考iWebOffice2006的EditType属性，详细参考技术白皮书
                mDisabled = "disabled";
                mDisabledSave = "disablde";
                PageTitle = mSubject + "【只读】";
            }
            else if (mEditType == "0")
            {
                mEditType = "0";
                mDisabled = "disabled";
                mDisabledSave = "disabled";
                PageTitle = mSubject + "【只读】";
            }
            else if (mEditType == "1")
            {
                mEditType = "1";
                PageTitle = mSubject + "【读写/无痕】";
            }
            else if (mEditType == "2")
            {
                mEditType = "2";
                PageTitle = mSubject + "【读写/留痕】";
            }
            else if (mEditType == "3")
            {
                mEditType = "3";
                PageTitle = mSubject + "【读写/留痕】";
            }
            else
            {
                mEditType = "0";
                mDisabled = "disabled";
                mDisabledSave = "disabled";
                PageTitle = mSubject + "【只读】";
            }
            if (string.IsNullOrEmpty(mFileName))
                mFileName = mRecordID + mFileType;
            //mFileName = "/123/2023/05/10/9ACD443D-B4A7-4FA9-9AE7-2839D9DDF161.doc";
            //
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
        /// 文件来源是 附件
        /// </summary>
        void GetEntityAttach()
        {
            Entity entity = EntityManager.GetEntity(caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
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

                //保存下载日志
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
        /// 文件来源是 文件管理
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

                //使用记录
                FileManager.FileHitUse(this.caller, new Guid(mRecordID));

                //保存下载日志
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

            //邮件附件
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

                //使用记录
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