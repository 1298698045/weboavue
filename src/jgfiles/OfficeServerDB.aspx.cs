using System;
using System.IO;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

using System.Runtime.InteropServices;
using System.Threading;
using iWebOffice.ocx.c.net;
using iWebOffice2015;
using iWebOffice2015_New;
using Supermore.Data;
using Supermore;
using Supermore.EntityFramework.Entities;
using Supermore.Files;
using Youyou.Files;

namespace WebClient.jgfiles
{
    public partial class OfficeServerDB : System.Web.UI.Page
    {
        private string mOption;
        private string mUserName;   //用户名
        private string mRecordID;   //文档ID
        private string mFileName;   //文件名
        private string mFileType;   //文件类型
        private byte[] mFileBody;   //文件Body
        private int mFileSize = 0;  //文件大小
        private string mFilePath;   //文件路径
        private String mFileDate;   //日期
        private String mDescript;   //文件描述
        private String mTemplate; // 模板文件
        private String mCommand;   //自定义接受
        private String mOfficePrints; //打印份数次数  
        private string mFileID;
        private string mDateTime;
        private string mBookmark;
        private string mMarkList;
        private string mMarkName;
        private string mPassword;
        private string mHostName;
        private string mMarkGuid;
        private string mDirectory;
        private string mHtmlName;
        private string mLocalFile;
        private string mRemoteFile;
        int mCopies; //打印份数的控制
        private iMsgServer2015 MsgObj;
        private DBstep.iMsgServer2000 MsgObj2000;
        private iDBManage2000 DBAobj;
        private string mError;
        private String mImageName; //远程图片名称

        string orgId = "";
        CallContext _caller = null;
        private string customerCode = "";//客户代码

        string _objectTypeCode = "";//正文、附件、文件管理
        string _fileSource = "";

        protected void Page_Load(object sender, EventArgs e)
        {

            // 在此处放置用户代码以初始化页面
            try
            {
                _caller = AppDataSource.GetCallContext();
                if (_caller == null)
                {
                    //_caller = AppDataSource.GetCallerByCustomerId(new Guid(orgId));
                    //WebContext.SetCallContext(_caller, false);
                    orgId = Request["OrganizationId"];
                    if (!string.IsNullOrEmpty(orgId))
                    {
                        _caller = AppDataSource.GetCallerByCustomerId(new Guid(orgId));
                        WebContext.SetCallContext(_caller, false);
                    }
                }
                else
                {
                    orgId = _caller.CustomerID;
                }
                customerCode = _caller.CustomerCode;
            }
            catch(Exception ex)
            {
                Supermore.Diagnostics.Trace.LogException(ex);
                Supermore.Diagnostics.Trace.LogError(" WebClient.jgfiles,_caller 为空。");
                Supermore.Diagnostics.Trace.LogError(this.Request.RawUrl);
                return;
            }

            DBAobj = new iDBManage2000(_caller);
            DBAobj.Open();
            MsgObj = new iMsgServer2015();
            MsgObj2000 = new DBstep.iMsgServer2000();

            mFilePath = Server.MapPath(".");
            try
            {


                MsgObj.setSendType("JSON");
                MsgObj.Load(Request);  //解析请求
                mOption = MsgObj.GetMsgByName("OPTION");//请求参数
                mUserName = MsgObj.GetMsgByName("USERNAME");  //取得系统用户
                if (mOption == "LOADFILE")
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                              //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");	                                  //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");	                                  //取得文档类型
                    MsgObj.MsgTextClear();//清除文本信息
                    // if (MsgObj.MsgFileLoad(mFilePath + "\\Document\\" + mFileName))
                    if (LoadFile())
                    {
                        Supermore.Diagnostics.Trace.LogError("LoadFile IS True.");
                        //MsgObj.MsgFileLoad(@"D:\OAFiles\20200716\AttachFiles\20466\2021\12\27\F141D3C0-F72E-4976-A0A8-B09824A20B46.doc");                      
                        MsgObj.MsgFileBody(mFileBody);//把数据库的文件流装入进去
                        MsgObj.SendFile(Response, mFileName);
                        return;
                    }
                }
                else if (mOption == "SAVEFILE")
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");//取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");//取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");                        //取得文档类型
                    mUserName = MsgObj.GetMsgByName("USERNAME");                                      //取得保存用户名称
                    mFileSize = MsgObj.MsgFileSize();					                              //取得文档大小
                    mFileDate = DBAobj.GetDateTime();                                               //取得文档时间
                    mFileBody = MsgObj.MsgFileBody();					                              //取得文档内容

                    _fileSource = MsgObj.GetMsgByName("fileSource");					    //取得客户端文件类型 正文，附件，文件管理
                    _objectTypeCode = MsgObj.GetMsgByName("objectTypeCode");
                    //mUserName = mUserName;                                           //取得保存用户名称
                    mDescript = "通用版本";                                             //版本说明


                    MsgObj.MsgTextClear();//清除文本信息
                                          //  if (MsgObj.MsgFileSave(mFilePath + "\\Document\\" + mFileName))
                    if (SaveFile())
                    {
                        MsgObj.SetMsgByName("STATUS", "保存成功!");	                                  //设置状态信息
                        MsgObj2000.MsgError("");						                                  //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存失败!");		                                          //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();
                }
                else if (mOption == "SAVEPDF")
                {
                    Console.WriteLine("文档转PDF");
                    mRecordID = MsgObj.GetMsgByName("RECORDID");//取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");//取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");                        //取得文档类型
                    MsgObj.MsgTextClear();//清除文本信息
                    var pdfUrl = this.GetPDFPath() + mFileName;
                    if (MsgObj.MsgFileSave(Request, pdfUrl))
                    {
                        MsgObj.SetMsgByName("PDFURL", pdfUrl);
                        MsgObj.SetMsgByName("STATUS", "保存成功!");	                                  //设置状态信息
                        Console.WriteLine(mRecordID + "文档已经保存成功");
                    }

                }
                else if (mOption == "GETPDFFILE")
                {
                    Console.WriteLine("下载服务器文件到本地");
                    mFileName = MsgObj.GetMsgByName("REMOTEFILE");// 取得文档名称
                    MsgObj.MsgTextClear();// 清除文本信息
                    var pdfUrl = this.GetPDFPath() + mFileName;
                    MsgObj.SendLocalFile(Response, pdfUrl);
                    return;

                }
                else if (mOption == "SENDMESSAGE")
                {                   //下面的代码为Web页面请求信息[扩展接口]
                    mCommand = MsgObj.GetMsgByName("COMMAND");                          //取得自定义的操作类型
                    mOfficePrints = MsgObj.GetMsgByName("OFFICEPRINTS");                //取得Office文档的打印次数
                    mUserName = MsgObj.GetMsgByName("USERNAME");
                    MsgObj.MsgTextClear();
                    if (mCommand == null || mCommand == "")
                    {
                        mCommand = "INPORTTEXT";
                    }

                    if (mCommand == "COPIES")
                    {                     //打印份数控制功能
                        Console.WriteLine("mOfficePrints:" + mOfficePrints);
                        mCopies = Convert.ToInt32(mOfficePrints);                        //获得客户需要打印的份数
                        Console.WriteLine("mCopies:" + mCopies);
                        if (mCopies <= 2)
                        {                                               //比较打印份数，拟定该文档允许打印的总数为2份，注：可以在数据库中设置好文档允许打印的份数
                            if (UpdataCopies(2 - mCopies))
                            {                                //更新打印份数
                                MsgObj.SetMsgByName("STATUS", "1");                           //设置状态信息，允许打印
                                Console.WriteLine("在打印范围内开始打印");
                            }
                        }
                        else
                        {
                            MsgObj.SetMsgByName("STATUS", "0");                             //不允许打印
                            Console.WriteLine("超过打印限度不允许打印");
                        }
                    }
                    else if (mCommand == "INPORTTEXT")
                    {
                        MsgObj.SetMsgByName("RETURNINFO", mUserName);
                        Console.WriteLine("发送数据到前台名为UserName");
                    }

                }
                else if (mOption == "LOADTEMPLATE")
                { // 下面的代码为打开服务器数据库里的模板文件
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");		                              //取得模板文档类型
                    //本段处理是否调用文档时打开模版，还是套用模版时打开模版。
                    mCommand = MsgObj.GetMsgByName("COMMAND");                                      //取得客户端定义的变量COMMAND值
                    if (mCommand.Equals("INSERTFILE"))
                    {
                        MsgObj.MsgTextClear();                                                        //清除文本信息
                        //从文件夹调入模板文档
                        if (MsgObj.MsgFileLoad(mFilePath + "\\Document\\" + mTemplate))
                        {
                            MsgObj.SetMsgByName("STATUS", "打开模板成功!");		                      //设置状态信息
                            MsgObj2000.MsgError("");		                                                  //清除错误信息
                        }
                        else
                        {
                            MsgObj2000.MsgError("打开模板失败!");		                                      //设置错误信息
                        }
                    }
                    else
                    {
                        MsgObj.MsgTextClear();
                        //从数据库调入模板文档
                        if (LoadTemplate())
                        {
                            MsgObj.MsgFileBody(mFileBody);				                              //将文件信息打包
                            MsgObj.SetMsgByName("FILETYPE", mFileType);
                            MsgObj.SetMsgByName("STATUS", "打开模板成功!");		                      //设置状态信息
                            MsgObj2000.MsgError("");		                                                  //清除错误信息
                        }
                        else
                        {
                            MsgObj2000.MsgError("打开模板失败!");		                                      //设置错误信息
                        }
                    }



                    //mTemplate = MsgObj.GetMsgByName("TEMPLATE"); // 取得模板文档类型
                    //MsgObj.SendLocalFile(Response, mFilePath + "\\Document\\" + mTemplate);
                    return;
                    // 本段处理是否调用文档时打开模版，还是套用模版时打开模版。
                    //if (MsgObj.MsgFileLoad(mFilePath + "\\Document\\" + mTemplate)) { // 从服务器文件夹中调入模板文档
                    //	Console.WriteLine(mTemplate + "文档已经转换成功"); // 清除错误信息
                    //	}
                }
                else if (mOption == "SAVETEMPLATE")
                {
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");		                              //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");		                              //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");		                              //取得文档类型
                    mUserName = MsgObj.GetMsgByName("USERNAME");                                    //取得保存用户名称
                    mFileSize = MsgObj.MsgFileSize();					                              //取得文档大小
                    mFileDate = DBAobj.GetDateTime();                                               //取得文档时间
                    mFileBody = MsgObj.MsgFileBody();					                              //取得文档内容
                    mDescript = "通用模板";                                                         //版本说明
                    MsgObj.MsgTextClear();                                                          //清除文本信息
                    //保存模板内容到数据库中
                    if (SaveTemplate())
                    {
                        MsgObj.SetMsgByName("STATUS", "保存模板成功!");		                          //设置状态信息
                        MsgObj2000.MsgError("");						                                  //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存模板失败!");					                          //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();
                }
                //下面的代码为打开版本列表
                else if (mOption.Equals("LISTVERSION"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                              //取得文档编号
                    mUserName = MsgObj.GetMsgByName("USERNAME");                                    //取得保存用户名称
                    MsgObj.MsgTextClear();                                                          //清除文本信息
                    //生成版本列表
                    if (ListVersion())
                    {
                        MsgObj.SetMsgByName("FILEID", mFileID);		                                  //将文档号列表打包
                        MsgObj.SetMsgByName("DATETIME", mDateTime);	                                  //将日期时间列表打包
                        MsgObj.SetMsgByName("USERNAME", mUserName);	                                  //将用户名列表打包
                        MsgObj.SetMsgByName("DESCRIPT", mDescript);	                                  //将说明信息列表打包
                        MsgObj.SetMsgByName("STATUS", "版本列表成功!");	                              //设置状态信息
                        MsgObj2000.MsgError("");				                                          //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("版本列表失败!");			                                  //设置错误信息
                    }
                }
                //下面的代码为打开版本文档
                else if (mOption.Equals("LOADVERSION"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                              //取得文档编号
                    mFileID = MsgObj.GetMsgByName("FILEID");		                                  //取得版本文档号
                    MsgObj.MsgTextClear();                                                          //清除文本信息
                    //调入该版本文档
                    if (LoadVersion(mFileID))
                    {
                        MsgObj.MsgFileBody(mFileBody);		                                          //将文档信息打包
                        MsgObj.SetMsgByName("STATUS", "打开版本成功!");                               //设置状态信息
                        MsgObj2000.MsgError("");			                                              //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("打开版本失败!");			                                  //设置错误信息
                    }
                }
                //下面的代码为保存版本文档
                else if (mOption.Equals("SAVEVERSION"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                       //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");		                       //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");		                       //取得文档类型
                    mUserName = MsgObj.GetMsgByName("USERNAME");                             //取得保存用户名称
                    mDescript = MsgObj.GetMsgByName("DESCRIPT");		                       //取得说明信息
                    mFileSize = MsgObj.MsgFileSize();			                               //取得文档大小
                    mFileDate = DBAobj.GetDateTime();                                        //取得文档时间
                    mFileBody = MsgObj.MsgFileBody();			                               //取得文档内容
                    MsgObj.MsgTextClear();
                    //保存版本文档
                    if (SaveVersion())
                    {
                        MsgObj.SetMsgByName("STATUS", "保存版本成功!");	                   //设置状态信息
                        MsgObj2000.MsgError("");				                               //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存版本失败!");		                           //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();				                                   //清除文档内容
                }
                //下面的代码为取得文档标签
                else if (mOption.Equals("LOADBOOKMARKS"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                      //取得文档编号
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");		                      //取得模板编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");		                      //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");		                      //取得文档类型
                    MsgObj.MsgTextClear();
                    if (LoadBookMarks())
                    {
                        MsgObj2000.MsgError("");				                             //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("打开标签信息失败!");		                    //设置错误信息
                    }
                }
                //下面的代码为取得标签文档内容
                else if (mOption.Equals("SAVEBOOKMARKS"))
                {
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");		                   //取得模板编号
                    if (SaveBookMarks())
                    {
                        MsgObj2000.MsgError("");			                               //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存标签信息失败!");	                       //设置错误信息
                    }
                    MsgObj.MsgTextClear();
                }
                //下面的代码为显示标签列表
                else if (mOption.Equals("LISTBOOKMARKS"))
                {
                    MsgObj.MsgTextClear();                                            //清除文本信息
                    if (ListBookmarks())
                    {
                        MsgObj.SetMsgByName("BOOKMARK", mBookmark);	                  //将用户名列表打包
                        MsgObj.SetMsgByName("DESCRIPT", mDescript);	                  //将说明信息列表打包
                        MsgObj2000.MsgError("");			                              //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("调入标签失败!");			                  //设置错误信息
                    }
                }
                //下面的代码为创建印章列表
                else if (mOption.Equals("LOADMARKLIST"))
                {
                    MsgObj.MsgTextClear();                                            //清除文本信息
                    if (LoadMarkList())
                    {
                        MsgObj.SetMsgByName("MARKLIST", mMarkList);                    //显示签章列表
                        MsgObj2000.MsgError("");				                          //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("创建印章列表失败!");			              //设置错误信息
                    }
                }
                //下面的代码为打开印章文件
                else if (mOption.Equals("LOADMARKIMAGE"))
                {
                    mMarkName = MsgObj.GetMsgByName("IMAGENAME");	                     //取得签名名称
                    mUserName = MsgObj.GetMsgByName("USERNAME");		                 //取得用户名称
                    mPassword = MsgObj.GetMsgByName("PASSWORD");		                 //取得用户密码
                    mFileType = ".jpg";                                                //默认为.jpg类型
                    MsgObj.MsgTextClear();
                    //调入签名信息
                    if (LoadMarkImage(mMarkName, mPassword))
                    {
                        MsgObj.SetMsgByName("IMAGETYPE", mFileType);                  //设置签名类型
                        MsgObj.MsgFileBody(mFileBody);			                     //将文件信息打包
                        MsgObj.SetMsgByName("STATUS", "打开成功!");  	             //设置状态信息
                        MsgObj2000.MsgError("");				                         //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("签名或密码错误!");		                     //设置错误信息
                    }
                }
                //下面的代码为保存签章基本信息
                else if (mOption.Equals("SAVESIGNATURE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		                //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");		                //取得标签文档内容
                    mMarkName = MsgObj.GetMsgByName("MARKNAME");		                //取得签名名称
                    mUserName = MsgObj.GetMsgByName("USERNAME");		                //取得用户名称
                    mDateTime = MsgObj.GetMsgByName("DATETIME");		                //取得签名时间
                    mHostName = Request.ServerVariables["REMOTE_ADDR"].ToString();    //取得用户IP
                    mMarkGuid = MsgObj.GetMsgByName("MARKGUID");                      //取得唯一编号
                    MsgObj.MsgTextClear();                                          //清除文本信息
                    //保存签章基本信息
                    if (SaveSignature())
                    {
                        MsgObj.SetMsgByName("STATUS", "保存成功!");  	            //设置状态信息
                        MsgObj2000.MsgError("");				                        //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存印章失败!");		                    //设置错误信息
                    }
                }

                //下面的代码为调出签章基本信息
                else if (mOption.Equals("LOADSIGNATURE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		               //取得文档编号
                    MsgObj.MsgTextClear();                                         //清除文本信息
                    //调出签章基本信息
                    if (LoadSignature())
                    {
                        MsgObj.SetMsgByName("MARKNAME", mMarkName);                 //将签名名称列表打包
                        MsgObj.SetMsgByName("USERNAME", mUserName);                 //将用户名列表打包
                        MsgObj.SetMsgByName("DATETIME", mDateTime);                 //将时间列表打包
                        MsgObj.SetMsgByName("HOSTNAME", mHostName);                 //将说明信息列表打包
                        MsgObj.SetMsgByName("MARKGUID", mMarkGuid);
                        MsgObj.SetMsgByName("STATUS", "调入成功!");  	           //设置状态信息
                        MsgObj2000.MsgError("");				                       //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("调入印章失败!");		                   //设置错误信息
                    }
                }
                //下面的代码为存为HTML页面
                else if (mOption.Equals("SAVEASHTML"))
                {
                    mHtmlName = MsgObj.GetMsgByName("HTMLNAME");		               //取得标签文档内容
                    mDirectory = MsgObj.GetMsgByName("DIRECTORY");	               //取得标签文档内容
                    MsgObj.MsgTextClear();
                    if (mDirectory.Equals(""))
                    {
                        mFilePath = mFilePath + "\\HTML";
                    }
                    else
                    {
                        mFilePath = mFilePath + "\\HTML\\" + mDirectory;
                    }
                    MsgObj.MakeDirectory(mFilePath);							   //创建路径
                    string htmlPath = mFilePath + "\\" + mHtmlName;
                    if (File.Exists(htmlPath))
                    {
                        File.Delete(htmlPath);
                    }
                    if (MsgObj.MsgFileSave(Request, htmlPath))
                    {
                        Supermore.Diagnostics.Trace.LogError("save html template:" + htmlPath);
                        MsgObj2000.MsgError("");                                       //清除错误信息
                        MsgObj.SetMsgByName("STATUS", "保存成功");                  //设置状态信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存失败");                               //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();
                }
                //下面的代码为存为HTML图片页面
                else if (mOption.Equals("SAVEIMAGE"))
                {
                    mFileName = MsgObj.GetMsgByName("HTMLNAME");	                  //取得文件名称
                    mDirectory = MsgObj.GetMsgByName("DIRECTORY");                  //取得目录名称
                    MsgObj.MsgTextClear();				                          //清除文本信息
                    if (mDirectory.Equals(""))
                    {
                        mFilePath = mFilePath + "\\HTMLIMAGE";
                    }
                    else
                    {
                        mFilePath = mFilePath + "\\HTMLIMAGE\\" + mDirectory;
                    }
                    MsgObj.MakeDirectory(mFilePath);                              //创建路径
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\" + mFileName))             //保存HTML图片文件
                    {
                        MsgObj2000.MsgError("");				                      //清除错误信息
                        MsgObj.SetMsgByName("STATUS", "保存HTML图片成功!");	      //设置状态信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存HTML图片失败!");			          //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();				                          //清除文档内容
                }

                //下面的代码为存为HTML图片页面
                else if (mOption.Equals("SAVEASPAGE"))
                {
                    mHtmlName = MsgObj.GetMsgByName("HTMLNAME");	                  //取得文件名称
                    mDirectory = MsgObj.GetMsgByName("DIRECTORY");                  //取得目录名称
                    MsgObj.MsgTextClear();				                          //清除文本信息
                    if (mDirectory.Equals(""))
                    {
                        mFilePath = mFilePath + "\\HTML";
                    }
                    else
                    {
                        mFilePath = mFilePath + "\\HTML\\" + mDirectory;
                    }
                    MsgObj.MakeDirectory(mFilePath);                              //创建路径
                    //保存HTML图片文件
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\" + mHtmlName))
                    {
                        MsgObj2000.MsgError("");				                      //清除错误信息
                        MsgObj.SetMsgByName("STATUS", "保存批注HTML图片成功!");	      //设置状态信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存批注HTML图片失败!");			          //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();				                          //清除文档内容
                }
                //下面的代码为插入文件
                else if (mOption.Equals("INSERTFILE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");				      //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");			          //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");			          //取得文档类型

                    string fieldName = MsgObj.GetMsgByName("FIELDNAME");
                    string fieldID = MsgObj.GetMsgByName("FIELDID");


                    MsgObj.MsgTextClear();                                        //清除文本信息
                    //调入文档
                    //if (LoadFile())

                    if (MsgObj.MsgFileLoad(mFilePath + "\\field.htm"))
                    {

                        // MsgObj.MsgFileBody(mFileBody);						      //将文件信息打包
                        MsgObj.SetMsgByName("POSITION", "Content");			      //设置插入的位置[书签] 
                        MsgObj.SetMsgByName("STATUS", "插入文件成功!.");			  //设置状态信息
                        MsgObj2000.MsgError("");								      //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("插入文件失败!");						 //设置错误信息
                    }
                }
                //下面的代码为更新保存文件
                else if (mOption.Equals("UPDATEFILE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");				     //取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");				     //取得文档名称
                    mFileType = MsgObj.GetMsgByName("FILETYPE");				     //取得文档类型
                    mUserName = MsgObj.GetMsgByName("USERNAME");				     //取得保存用户名称
                    mDescript = "定稿版本";									     //定稿版本说明
                    mFileSize = MsgObj.MsgFileSize();							     //取得文档大小
                    mFileDate = DBAobj.GetDateTime();							     //取得文档时间
                    mFileBody = MsgObj.MsgFileBody();							     //取得文档内容
                    MsgObj.MsgTextClear();
                    //保存版本文档 也可以根据实际需要,保存到其他数据库中
                    if (SaveVersion())
                    {
                        MsgObj.SetMsgByName("STATUS", "保存版本成功!");		     //设置状态信息
                        MsgObj2000.MsgError("");								     //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存版本失败!");					     //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();                                       //清除文档内容
                }
                //下面的代码为请求上传文件操作
                else if (mOption.Equals("PUTFILE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");                   //取得文档编号
                    mLocalFile = MsgObj.GetMsgByName("LOCALFILE");                 //取得 本地文件名称
                    mRemoteFile = MsgObj.GetMsgByName("REMOTEFILE");               //取得远程文件名称
                    mFilePath = mFilePath + "\\Document\\" + mRemoteFile;              //上传文件在服务器的完整路径
                    mFileBody = MsgObj.MsgFileBody();                               //取得文档内容
                    MsgObj.MsgTextClear();                                       //清除文本信息
                    //保存文档内容
                    if (MsgObj.MsgFileSave(Request, mFilePath))
                    {
                        MsgObj.SetMsgByName("STATUS", "保存上传文件成功!");       //设置状态信息
                        MsgObj2000.MsgError("");                                     //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存上传文件失败!");                    //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();                                       //清除文档内容
                }

                //下面的代码为请求下载文件操作
                else if (mOption.Equals("GETFILE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");		    //取得文档编号
                    mLocalFile = MsgObj.GetMsgByName("LOCALFILE");		    //取得本地文件名称
                    mRemoteFile = MsgObj.GetMsgByName("REMOTEFILE");	    //取得远程文件名称
                    MsgObj.MsgTextClear();				    //清除文本信息
                    mFilePath = mFilePath + "\\Document\\" + mRemoteFile;
                    //调入文档内容
                    if (MsgObj.MsgFileLoad(mFilePath))
                    {
                        MsgObj.SetMsgByName("STATUS", "保存下载文件成功!");       //设置状态信息
                        MsgObj2000.MsgError("");		                    //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("下载文件失败!");			    //设置错误信息
                    }
                }
                else if (mOption == "INSERTIMAGE")
                {                   //下面的代码为插入服务器图片
                    mRecordID = MsgObj.GetMsgByName("RECORDID");                        //取得文档编号
                    mImageName = MsgObj.GetMsgByName("IMAGENAME");                      //图片名
                    mFilePath = mFilePath + "\\Document\\" + mImageName;                //图片在服务器的完整路径
                    MsgObj.MsgTextClear();
                    MsgObj.SendLocalFile(Response, mFilePath);
                    return;
                    // if (MsgObj.MsgFileLoad(mFilePath)) {                                //调入图片
                    //   Console.WriteLine("插入图片成功!");    
                    //  }
                    //  else {
                    //      Console.WriteLine("插入图片失败!");                                    //设置错误信息
                    //  }
                }
                //下面的代码为保存为全文批注格式文件
                else if (mOption.Equals("SAVEPAGE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");                      //取得文档编号
                    mFilePath = mFilePath + "\\Document\\" + mRecordID + ".pgf";          //全文批注文件的完整路径
                    MsgObj.MsgTextClear();                                          //清除文体信息
                    //保存全文批注文件
                    if (MsgObj.MsgFileSave(Request, mFilePath))
                    {
                        MsgObj.SetMsgByName("STATUS", "保存全文批注成功!");                  //设置状态信息
                        MsgObj2000.MsgError("");                                        //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("保存全文批注失败!");                       //设置错误信息
                    }
                    MsgObj2000.MsgFileClear();                                           //清除文本信息
                }
                //下面的代码为调入全文批注格式文件
                else if (mOption.Equals("LOADPAGE"))
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");                       //取得文档编号
                    mFilePath = mFilePath + "\\Document\\" + mRecordID + ".pgf";          //全文批注文件的完整路径
                    MsgObj.MsgTextClear();                                           //清除文本信息
                    if (MsgObj.MsgFileLoad(mFilePath))                                //调入全文批注文件
                    {
                        MsgObj.SetMsgByName("STATUS", "打开全文批注成功!");                   //设置状态信息
                        MsgObj2000.MsgError("");                                         //清除错误信息
                    }
                    else
                    {
                        MsgObj2000.MsgError("打开全文批注失败!");                         //设置状态信息
                    }
                }
                else
                {
                    MsgObj2000.MsgError("Error:packet message");
                    MsgObj.MsgTextClear();
                    MsgObj2000.MsgFileClear();
                }
                //	 Console.WriteLine("SendPackage");
                MsgObj.Send(Response);
                DBAobj.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
        //更新打印份数
        private bool UpdataCopies(int mLeftCopies)
        {
            bool mResult = true;
            //该函数可以把打印减少的次数记录到数据库
            //根据自己的系统进行扩展该功能
            return mResult;
        }

        //调出文档，将文档内容保存在mFileBody里，以便进行打包
        private bool LoadFile()
        {
            _fileSource = Request["filesource"];
            bool mResult = false;
            try
            {
                if (_fileSource == "1001")
                {
                    return GetEntityAttach();
                }
                else if (_fileSource == "20021")
                {
                    return GetEntityAttach();
                }
                string strSelectCmd = "SELECT FileBody FROM Document_File WHERE RecordID='" + mRecordID + "'";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                if (mReader.Read())
                {
                    mFileBody = mReader.GetSqlBinary(0).Value;
                    mResult = true;
                }
                else
                {
                    return GetEntityAttach();
                    //mResult = false;
                }
                mReader.Close();
                return (mResult);
            }
            catch (Exception ex)
            {
                Supermore.Diagnostics.Trace.LogException(ex);
                return (mResult);
            }
            
        }
        bool GetEntityAttach()
        {
            string virtualPath = "";
            string realPath = "";
            string rootPath = "";
            string filePath = "";
            string fileName = "";
            string fileExtension = "";
            bool mResult = true;
            try
            {
                //Supermore.Diagnostics.Trace.LogError("GetEntityAttach,Start");
                Supermore.Diagnostics.Trace.LogError("GetEntityAttach,Id:"+ mRecordID);
                if (mRecordID.Length < 36)
                    return false;
                Entity entity = null;
                               
                if (_fileSource == ObjectTypeCodes.MailAttach.ToString())
                {
                    entity = EntityManager.GetEntity(_caller, ObjectTypeCodes.MailAttach, new Guid(mRecordID));
                    if (entity != null)
                    {
                        //rootPath = IOPaths.EmailAttachFiles;
                        rootPath = FileStorage.GetEmailRoot(_caller);
                    }
                }
                else  if (_fileSource == ObjectTypeCodes.File.ToString())
                {
                    return GetEntityFile();
                }
                else // if (_fileSource == ObjectTypeCodes.RelatedAttachment.ToString())
                {
                    rootPath = FileStorage.GetAttachRootPath(_caller);
                    entity = EntityManager.GetEntity(_caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
                    if (string.IsNullOrEmpty(rootPath))
                        rootPath = IOPaths.AttachFiles;
                    if (entity == null)
                        return GetEntityFile();
                }
                if (entity != null)
                {
                    virtualPath = StringUtil.GetString(entity.Fields["FileLocation"].Value);
                    realPath = virtualPath.Replace("/", "\\");
                    
                    filePath = rootPath + realPath;
                    fileName = StringUtil.GetString(entity.Fields["Name"].Value);
                    fileExtension = StringUtil.GetString(entity.Fields["FileExtension"].Value);

                    if (!string.IsNullOrEmpty(fileExtension))
                    {
                        if (fileExtension.Substring(0, 1) != ".")
                        {
                            mFileType = "." + fileExtension;
                        }
                    }
                }
                else
                {
                    return false;
                }
                Supermore.Diagnostics.Trace.LogError("GetEntityAttach,filePath:" + filePath);
                //byte[] buffer = new byte[1024];
                //int length = 0;
                if (File.Exists(filePath))
                {
                    using (FileStream fsRead = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        //mFileBody = new byte[fs.Length];
                        int fsLen = (int)fsRead.Length;
                        mFileBody = new byte[fsLen];
                        fsRead.Read(mFileBody, 0, mFileBody.Length);
                        fsRead.Seek(0, SeekOrigin.Begin);
                        //Supermore.IO.FileUtil.SaveObject(@"C:\1.docx", mFileBody);                        
                        //File.WriteAllBytes(@"C:\trace\1.docx", mFileBody);
                        //fs.Seek(0, SeekOrigin.Begin);
                        //fs.Read(mFileBody, 0, fs.Length);       
                        //string myStr = System.Text.Encoding.UTF8.GetString(mFileBody);
                        //Supermore.Diagnostics.Trace.LogToFile(myStr,"officeServerdb.txt");
                    }
                    mResult = true;
                }
                else
                {
                    Supermore.Diagnostics.Trace.LogError("OfficeServerDB:"+filePath + " file donload failure.");
                    Response.Write("文件不存在");
                    mResult = false;
                }
            }
            catch (Exception ex)
            {
                //Response.Write(ex.Message);
                //Supermore.Diagnostics.Trace.LogError(file + " file donload failure.");
                Supermore.Diagnostics.Trace.LogException(ex);
                mResult = false;
            }
            return mResult;
        }
        /// <summary>
        /// 取文件管理数据
        /// </summary>
        /// <returns></returns>
        bool GetEntityFile()
        {
            //Entity entity = EntityManager.GetEntity(_caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
            if (mRecordID.Length < 36)
                return false;
            FileEntity entity = FileManager.GetFile(_caller, new Guid(mRecordID));
            string virtualPath = "";
            string realPath = "";
            string rootPath = "";
            string filePath = "";
            string fileName = "";
            string fileExtension = "";
            if (entity != null)
            {
                virtualPath = StringUtil.GetString(entity.VirtualPath);
                realPath = virtualPath.Replace("/", "\\");
                rootPath = FileStorage.GetFileRootPath(_caller);

                if (string.IsNullOrEmpty(rootPath))
                    rootPath = IOPaths.Files;

                filePath = rootPath + realPath;
                fileName = StringUtil.GetString(entity.Name);
                fileExtension = entity.FileExtension;

                if (!string.IsNullOrEmpty(fileExtension))
                {
                    if (fileExtension.Substring(0, 1) != ".")
                    {
                        mFileType = "." + fileExtension;
                    }
                }
            }
            else
            {
                return false;
            }
            try
            {
                //byte[] buffer = new byte[1024];
                //int length = 0;
                if (File.Exists(filePath))
                {
                    using (FileStream fs = new FileStream(filePath, FileMode.Open))
                    {
                        mFileBody = new byte[fs.Length];
                        fs.Read(mFileBody, 0, mFileBody.Length);
                        fs.Seek(0, SeekOrigin.Begin);
                        //fs.Read(mFileBody, 0, fs.Length);                       
                    }
                    Supermore.Diagnostics.Trace.LogError("mFileBody:" + mFileBody.Length);
                    return true;
                }
                else
                {
                    Supermore.Diagnostics.Trace.LogError(filePath + " file donload failure.FileBase fileid:" + mRecordID);
                }
            }
            catch (Exception ex)
            {
                //Response.Write(ex.Message);
                //Supermore.Diagnostics.Trace.LogError(file + " file donload failure.");
                Supermore.Diagnostics.Trace.LogException(ex);
            }
            return false;
        }
        //保存文档，如果文档存在，则覆盖，不存在，则添加
        private bool SaveFile()
        {
            bool mResult = false;

            SqlCommand nCommand;
            string strUpdateCmd;
            string strInsertCmd;
            //附件、文件管理的修改保存不支持
            if (_fileSource == "1001") //附件
            {
                //存储附件路径
            }
            if (_fileSource == "100100") //文件
            {
                //存储文件路径
            }

            string strSelectCmd = "SELECT * FROM Document_File WHERE RecordID='" + mRecordID + "'";
            SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
            SqlDataReader mReader = mCommand.ExecuteReader();
            if (mReader.Read())
            {
                strUpdateCmd = "update Document_File set RecordID=@RecordID,FileName=@FileName,FileType=@FileType,FileSize=@FileSize,FileDate=@FileDate,FileBody=@FileBody,FilePath=@FilePath,UserName=@UserName,Descript=@Descript WHERE RecordID='" + mRecordID + "'";
                nCommand = new SqlCommand(strUpdateCmd, DBAobj.Connection);
            }
            else
            {
                strInsertCmd = "insert into Document_File (RecordID,FileName,FileType,FileSize,FileDate,FileBody,FilePath,UserName,Descript) values (@RecordID,@FileName,@FileType,@FileSize,@FileDate,@FileBody,@FilePath,@UserName,@Descript)";
                nCommand = new SqlCommand(strInsertCmd, DBAobj.Connection);
            }
            mReader.Close();
            try
            {
                nCommand.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.VarChar, 50));
                nCommand.Parameters["@RecordID"].Value = mRecordID;


                nCommand.Parameters.Add(new SqlParameter("@FileName", SqlDbType.VarChar, 100));
                nCommand.Parameters["@FileName"].Value = mFileName;


                nCommand.Parameters.Add(new SqlParameter("@FileType", SqlDbType.VarChar, 4));
                nCommand.Parameters["@FileType"].Value = mFileType;


                nCommand.Parameters.Add(new SqlParameter("@FileSize", SqlDbType.BigInt));
                nCommand.Parameters["@FileSize"].Value = mFileSize;


                nCommand.Parameters.Add(new SqlParameter("@FileDate", SqlDbType.DateTime));
                nCommand.Parameters["@FileDate"].Value = mFileDate;

                nCommand.Parameters.Add(new SqlParameter("@FileBody", SqlDbType.Image));
                nCommand.Parameters["@FileBody"].Value = mFileBody;

                nCommand.Parameters.Add(new SqlParameter("@FilePath", SqlDbType.VarChar, 100));
                nCommand.Parameters["@FilePath"].Value = mFilePath;

                nCommand.Parameters.Add(new SqlParameter("@UserName", SqlDbType.VarChar, 50));
                nCommand.Parameters["@UserName"].Value = mUserName;

                nCommand.Parameters.Add(new SqlParameter("@Descript", SqlDbType.VarChar, 100));
                nCommand.Parameters["@Descript"].Value = mDescript;
                int iRes = nCommand.ExecuteNonQuery();
                mResult = true;
                if (mResult) //同步 分表
                {
                    string sql = string.Format(@"MERGE INTO Document d using Document_File df on  d.RecordID =df.RecordID AND df.RecordID ='{0}' WHEN MATCHED THEN
	                            UPDATE SET d.FileDate =df.FileDate,d.FileType=df.FileType WHEN not MATCHED THEN 	INSERT (RecordID,FileDate,FileType) 	VALUES(df.RecordID,df.FileDate,df.FileType);", mRecordID);
                    AppDataSource.ProcessDBUpdate(this._caller, sql);

                }
                string filePath = "";
                //保存附件
                if (mResult)
                {
                    if (_fileSource == "1001")//附件
                    {
                        Entity entity = EntityManager.GetEntity(_caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
                        if (entity != null)
                        {
                            if (entity.Fields["FileLocation"].Value != null)
                            {
                                string fileLocation = StringUtil.GetString(entity.Fields["FileLocation"].Value).Replace("/", "\\");
                                string rootPath = FileStorage.GetAttachRootPath(_caller);
                                if (string.IsNullOrEmpty(rootPath))
                                {
                                    rootPath = IOPaths.AttachFiles;
                                }
                                //var isSave = MsgObj2000.MsgFileSave(rootPath + fileLocation);
                                /*
                                foreach (string key in Request.Files.Keys)
                                {
                                    HttpPostedFile file = Request.Files.Get(key);
                                   
                                    file.SaveAs(rootPath + fileLocation);
                                }
                                */
                                filePath = rootPath + fileLocation;
                                Supermore.Diagnostics.Trace.LogError(filePath);
                                if (!File.Exists(filePath))
                                {
                                    //File.Move(filePath, fullPathFromNewName);
                                    File.Delete(filePath);
                                }
                                Supermore.IO.FileUtil.WriteToFile(filePath, ref mFileBody);
                            }
                        }
                    }
                    else if (_fileSource == "100100")//文件
                    {
                        Entity entity = EntityManager.GetEntity(_caller, EntityTemplateIDs.File, new Guid(mRecordID));
                        if (entity != null && entity.Fields["VirtualPath"].Value != null)
                        {
                            string fileLocation = StringUtil.GetString(entity.Fields["VirtualPath"].Value).Replace("/", "\\");
                            string rootPath = FileStorage.GetFileRootPath(_caller);
                            if (string.IsNullOrEmpty(rootPath))
                            {
                                rootPath = IOPaths.Files;
                            }
                            //var isSave = MsgObj2000.MsgFileSave(rootPath + fileLocation);
                            /*foreach (string key in Request.Files.Keys)
                            {
                                HttpPostedFile file = Request.Files.Get(key);
                                filePath = rootPath + fileLocation;
                                Supermore.Diagnostics.Trace.LogError(filePath);
                                file.SaveAs(filePath);
                            }*/
                            filePath = rootPath + fileLocation;
                            Supermore.Diagnostics.Trace.LogError(filePath);
                            if (!File.Exists(filePath))
                            {
                                //File.Move(filePath, fullPathFromNewName);
                                File.Delete(filePath);
                            }
                            Supermore.IO.FileUtil.WriteToFile(filePath, ref mFileBody);
                            
                        }
                    }
                    else if (_fileSource == "20022")//邮件附件
                    {
                        Entity entity = EntityManager.GetEntity(_caller, 20022, new Guid(mRecordID));
                        if (entity != null && entity.Fields["FileLocation"].Value != null)
                        {
                            string fileLocation = StringUtil.GetString(entity.Fields["FileLocation"].Value).Replace("/", "\\");
                            string rootPath = IOPaths.EmailAttachFiles;
                            //var isSave = MsgObj2000.MsgFileSave(rootPath + fileLocation);
                            filePath = rootPath + fileLocation;
                            Supermore.Diagnostics.Trace.LogError(filePath);
                            if (!File.Exists(filePath))
                            {
                                //File.Move(filePath, fullPathFromNewName);
                                File.Delete(filePath);
                            }
                            Supermore.IO.FileUtil.WriteToFile(filePath, ref mFileBody);
                        }
                    }
                    //Entity entity = EntityManager.GetEntity(_caller, EntityTemplateIDs.RelatedAttachment, new Guid(mRecordID));
                    //if (entity != null)
                    //{
                    //    if (entity.Fields["FileLocation"].Value != null)
                    //    {
                    //        string fileLocation = StringUtil.GetString(entity.Fields["FileLocation"].Value).Replace("/", "\\");
                    //        string rootPath = FileStorage.GetAttachRootPath(_caller);
                    //        if (string.IsNullOrEmpty(rootPath))
                    //        {
                    //            rootPath = IOPaths.AttachFiles;
                    //        }
                    //        var isSave = MsgObj2000.MsgFileSave(rootPath + fileLocation);
                    //    }
                    //}
                }
            }
            catch (SqlException ex)
            {
                mError = ex.ToString();
                Supermore.Diagnostics.Trace.LogException(ex);
                mResult = false;
            }
            return (mResult);
        }
        private bool LoadTemplate()
        {
            bool mResult = false;
            string strSelectCmd = "SELECT FileBody,FileType FROM Template_File WHERE RecordID='" + mTemplate + "'";
            SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
            SqlDataReader mReader = mCommand.ExecuteReader();
            if (mReader.Read())
            {
                mFileBody = mReader.GetSqlBinary(0).Value;
                mFileType = mReader["FileType"].ToString();
                mResult = true;
            }
            else
            {
                mResult = false;
            }
            mReader.Close();
            return (mResult);
        }


        //保存模板文档，如果模板文档存在，则覆盖，不存在，则添加
        private bool SaveTemplate()
        {
            bool mResult = false;

            SqlCommand nCommand;
            string strUpdateCmd;
            string strInsertCmd;

            string strSelectCmd = "SELECT * FROM Template_File WHERE RecordID='" + mTemplate + "'";
            SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
            SqlDataReader mReader = mCommand.ExecuteReader();
            bool isUpdated = false;
            if (mReader.Read())
            {
                strUpdateCmd = @"UPDATE Template_File set RecordID=@RecordID,Name=@Name,FileName=@FileName,FileType=@FileType,FileSize=@FileSize,FileDate=@FileDate,FileBody=@FileBody,FilePath=@FilePath,UserName=@UserName,Descript=@Descript 
                                    ,ModifiedBy=@ModifiedBy,ModifiedOn = Getdate()
                                    WHERE RecordID='" + mTemplate + "'";
                nCommand = new SqlCommand(strUpdateCmd, DBAobj.Connection);
                isUpdated = true;
            }
            else
            {
                strInsertCmd = @"INSERT INTO Template_File (RecordID,Name,FileName,FileType,FileSize,FileDate,FileBody,FilePath,UserName,Descript,CreatedBy,OwningBusinessUnit,OrganizationId) 
                                values (@RecordID,@Name,@FileName,@FileType,@FileSize,@FileDate,@FileBody,@FilePath,@UserName,@Descript,@CreatedBy,@OwningBusinessUnit,@OrganizationId)";
                nCommand = new SqlCommand(strInsertCmd, DBAobj.Connection);
            }
            mReader.Close();
            try
            {
                nCommand.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.VarChar, 36));
                nCommand.Parameters["@RecordID"].Value = mTemplate;

                nCommand.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar, 100));
                nCommand.Parameters["@Name"].Value = mFileName;

                nCommand.Parameters.Add(new SqlParameter("@FileName", SqlDbType.VarChar, 100));
                nCommand.Parameters["@FileName"].Value = mFileName;

                nCommand.Parameters.Add(new SqlParameter("@FileType", SqlDbType.VarChar, 10));
                nCommand.Parameters["@FileType"].Value = mFileType;

                nCommand.Parameters.Add(new SqlParameter("@FileSize", SqlDbType.BigInt));
                nCommand.Parameters["@FileSize"].Value = mFileSize;

                nCommand.Parameters.Add(new SqlParameter("@FileDate", SqlDbType.DateTime));
                nCommand.Parameters["@FileDate"].Value = mFileDate;

                nCommand.Parameters.Add(new SqlParameter("@FileBody", SqlDbType.Image));
                nCommand.Parameters["@FileBody"].Value = mFileBody;

                nCommand.Parameters.Add(new SqlParameter("@FilePath", SqlDbType.VarChar, 100));
                nCommand.Parameters["@FilePath"].Value = mFilePath;

                nCommand.Parameters.Add(new SqlParameter("@UserName", SqlDbType.VarChar, 50));
                nCommand.Parameters["@UserName"].Value = mUserName;

                nCommand.Parameters.Add(new SqlParameter("@Descript", SqlDbType.VarChar, 100));
                nCommand.Parameters["@Descript"].Value = mDescript;
                if (isUpdated)
                {
                    nCommand.Parameters.Add(new SqlParameter("@ModifiedBy", SqlDbType.UniqueIdentifier));
                    nCommand.Parameters["@ModifiedBy"].Value = new Guid(this._caller.UserID);
                }
                else
                {
                    nCommand.Parameters.Add(new SqlParameter("@CreatedBy", SqlDbType.UniqueIdentifier));
                    nCommand.Parameters["@CreatedBy"].Value = new Guid(this._caller.UserID);

                    nCommand.Parameters.Add(new SqlParameter("@OwningBusinessUnit", SqlDbType.UniqueIdentifier));
                    nCommand.Parameters["@OwningBusinessUnit"].Value = this._caller.BussinessUnitId;

                    nCommand.Parameters.Add(new SqlParameter("@OrganizationId", SqlDbType.UniqueIdentifier));
                    nCommand.Parameters["@OrganizationId"].Value = new Guid(this._caller.CustomerID);
                }

                int iRes = nCommand.ExecuteNonQuery();
                if (iRes > 0)
                    mResult = true;
            }
            catch (SqlException ex)
            {
                Supermore.Diagnostics.Trace.LogException(ex);
                mError = ex.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //列出所有版本信息
        private bool ListVersion()
        {
            bool mResult = false;

            mFileID = "\r\n";
            mDateTime = "保存时间\r\n";
            mUserName = "用户名\r\n";
            mDescript = "版本说明\r\n";
            try
            {
                string strSelectCmd = "SELECT FileID,FileDate,UserName,Descript FROM Version_File WHERE RecordID='" + mRecordID + "'";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                while (mReader.Read())
                {
                    mFileID += mReader["FileID"].ToString() + "\r\n";                  //文件号列表
                    mDateTime += mReader["FileDate"].ToString() + "\r\n";                           //日期列表
                    mUserName += mReader["UserName"].ToString() + "\r\n";                           //用户名列表
                    mDescript += mReader["Descript"].ToString() + "\r\n";                           //如果说明信息里有回车，则将回车变成>符号
                }
                mReader.Close();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //调入选中版本，通过文件号调用mFileID,并把文件放入mFileBody里，以便进行打包
        private bool LoadVersion(string mFileID)
        {
            bool mResult = false;
            try
            {
                string strSelectCmd = "SELECT FileBody FROM Version_File WHERE RecordID='" + mRecordID + "' and  FileID=" + mFileID;
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                if (mReader.Read())
                {
                    mFileBody = mReader.GetSqlBinary(0).Value;
                    mResult = true;
                }
                else
                {
                    mResult = false;
                }
                mReader.Close();
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }

        //保存版本，将该版本文件存盘，并将说明信息也保存起来
        private bool SaveVersion()
        {
            bool mResult = false;
            SqlCommand nCommand;
            string strInsertCmd;

            strInsertCmd = "insert into Version_File (RecordID,FileName,FileType,FileSize,FileDate,FileBody,FilePath,UserName,Descript) values (@RecordID,@FileName,@FileType,@FileSize,@FileDate,@FileBody,@FilePath,@UserName,@Descript)";
            nCommand = new SqlCommand(strInsertCmd, DBAobj.Connection);
            try
            {
                nCommand.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.VarChar, 16));
                nCommand.Parameters["@RecordID"].Value = mRecordID;


                nCommand.Parameters.Add(new SqlParameter("@FileName", SqlDbType.VarChar, 64));
                nCommand.Parameters["@FileName"].Value = mFileName;


                nCommand.Parameters.Add(new SqlParameter("@FileType", SqlDbType.VarChar, 4));
                nCommand.Parameters["@FileType"].Value = mFileType;


                nCommand.Parameters.Add(new SqlParameter("@FileSize", SqlDbType.Int));
                nCommand.Parameters["@FileSize"].Value = mFileSize;


                nCommand.Parameters.Add(new SqlParameter("@FileDate", SqlDbType.DateTime));
                nCommand.Parameters["@FileDate"].Value = mFileDate;


                nCommand.Parameters.Add(new SqlParameter("@FileBody", SqlDbType.Image));
                nCommand.Parameters["@FileBody"].Value = mFileBody;


                nCommand.Parameters.Add(new SqlParameter("@FilePath", SqlDbType.VarChar, 64));
                nCommand.Parameters["@FilePath"].Value = mFilePath;


                nCommand.Parameters.Add(new SqlParameter("@UserName", SqlDbType.VarChar, 32));
                nCommand.Parameters["@UserName"].Value = mUserName;


                nCommand.Parameters.Add(new SqlParameter("@Descript", SqlDbType.VarChar, 64));
                nCommand.Parameters["@Descript"].Value = mDescript;
                nCommand.ExecuteNonQuery();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //装入书签
        private bool LoadBookMarks()
        {
            bool mResult = false;
            try
            {
                string strSelectCmd = "select b.BookMarkName,b.BookMarkText from Template_BookMarks a,BookMarks b where a.BookMarkname=b.BookMarkName and a.RecordID='" + mTemplate + "'";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                while (mReader.Read())
                {
                    //说明：我们测试程序把SQL语句直接写到替换标签内容
                    //实际使用中，这个标签内容是通过Sql语句得到的。
                    //生成SQL查询语句  result.getString("BookMarkText") & "条件"
                    //当前纪录号位 mRecordID
                    //BookMarkValue=生成SQL运行结果
                    string mBookMarkName = mReader["BookMarkName"].ToString();
                    string mBookMarkValue = mReader["BookMarkText"].ToString();
                    MsgObj.SetMsgByName(mBookMarkName, mBookMarkValue);
                }
                mReader.Close();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //保存模板对应的标签，第7个标签开始，0-6是iWebOffice全局变量(DBSTEP OPTION RECORDID TEMPLATE FILENAME FILETYPE USERNAME)
        private bool SaveBookMarks()
        {
            bool mResult = false;

            string mBookMarkName;
            int mIndex;
            try
            {
                string strDeleteCmd = "DELETE FROM Template_BookMarks Where RecordID='" + mTemplate + "'";
                SqlCommand nCommand = new SqlCommand(strDeleteCmd, DBAobj.Connection);
                nCommand.ExecuteNonQuery();

                for (mIndex = 7; mIndex <= MsgObj2000.GetFieldCount() - 1; mIndex++)
                {
                    mBookMarkName = MsgObj2000.GetFieldName(mIndex);
                    string strInsertCmd = "insert into Template_BookMarks (RecordId,BookMarkName) values ('" + mTemplate + "','" + mBookMarkName + "')";
                    SqlCommand mCommand = new SqlCommand(strInsertCmd, DBAobj.Connection);
                    mCommand.ExecuteNonQuery();
                }
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //创建标签列表
        private bool ListBookmarks()
        {

            bool mResult = false;

            mBookmark = "";
            mDescript = "";

            try
            {
                string strSelectCmd = "SELECT * FROM Bookmarks ";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                while (mReader.Read())
                {
                    mBookmark += mReader["BookMarkName"] + "\r\n";                              //用户名列表
                    mDescript += mReader["BookMarkDesc"] + "\r\n";                             //如果说明信息里有回车，则将回车变成>符号
                }
                mReader.Close();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        //创建签章名称列表
        private bool LoadMarkList()
        {
            bool mResult = false;
            try
            {
                mMarkList = "";
                string strSelectCmd = "SELECT MarkName FROM Signature";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                while (mReader.Read())
                {
                    mMarkList += mReader["MarkName"].ToString() + "\r\n";
                }
                mReader.Close();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }

        //调出签章图案
        private bool LoadMarkImage(string vMarkName, string vPassWord)
        {
            bool mResult = false;
            try
            {
                string strSelectCmd = "SELECT MarkBody,MarkType,MarkPath FROM Signature WHERE MarkName='" + vMarkName + "' and PassWord='" + vPassWord + "'";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                if (mReader.Read())
                {
                    string markPath = StringUtil.GetString(mReader["MarkPath"]);
                    Supermore.Diagnostics.Trace.LogTest(markPath);
                    //if (mReader["MarkBody"] != System.DBNull.Value)
                    //    mFileBody = (byte[])mReader["MarkBody"];
                    //if (mFileBody == null)
                    //{
                    if (!string.IsNullOrEmpty(markPath))
                    {
                        mFileBody = Supermore.IO.FileUtil.ReadBinaryFile(markPath);
                    }
                    //}
                    mFileType = StringUtil.GetString(mReader["MarkType"]);
                    Supermore.Diagnostics.Trace.LogTest(mFileType);
                    mResult = true;
                }
                else
                {
                    mResult = false;
                }
                mReader.Close();
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);

        }

        //保存印章，将该印章存盘，并将说明信息也保存起来
        private bool SaveSignature()
        {
            bool mResult = false;
            SqlCommand nCommand;
            string strInsertCmd;

            strInsertCmd = "insert into Document_Signature ([RecordID],[MarkName],[UserName],[DateTime],[HostName],[MarkGuid]) values (@RecordID,@MarkName,@UserName,@DateTime,@HostName,@MarkGuid) ";
            nCommand = new SqlCommand(strInsertCmd, DBAobj.Connection);

            try
            {
                nCommand.Parameters.Add(new SqlParameter("@RecordID", SqlDbType.VarChar, 16));
                nCommand.Parameters["@RecordID"].Value = mRecordID;


                nCommand.Parameters.Add(new SqlParameter("@MarkName", SqlDbType.VarChar, 64));
                nCommand.Parameters["@MarkName"].Value = mMarkName;


                nCommand.Parameters.Add(new SqlParameter("@UserName", SqlDbType.VarChar, 32));
                nCommand.Parameters["@UserName"].Value = mUserName;


                nCommand.Parameters.Add(new SqlParameter("@DateTime", SqlDbType.DateTime));
                nCommand.Parameters["@DateTime"].Value = mDateTime;


                nCommand.Parameters.Add(new SqlParameter("@HostName", SqlDbType.VarChar, 64));
                nCommand.Parameters["@HostName"].Value = mHostName;


                nCommand.Parameters.Add(new SqlParameter("@MarkGuid", SqlDbType.VarChar, 64));
                nCommand.Parameters["@MarkGuid"].Value = mMarkGuid;

                nCommand.ExecuteNonQuery();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }


        //列出所有版本信息
        private bool LoadSignature()
        {
            bool mResult = false;

            try
            {
                mMarkName = "印章名称\r\n";
                mUserName = "签名人\r\n";
                mDateTime = "签章时间\r\n";
                mHostName = "客户端IP\r\n";
                mMarkGuid = "序列号\r\n";

                string strSelectCmd = "SELECT [MarkName],[UserName],[DateTime],[HostName],[MarkGuid] FROM Document_Signature WHERE RecordID='" + mRecordID + "'";
                SqlCommand mCommand = new SqlCommand(strSelectCmd, DBAobj.Connection);
                SqlDataReader mReader = mCommand.ExecuteReader();
                while (mReader.Read())
                {
                    mMarkName += mReader["MarkName"].ToString() + "\r\n";                  		     //文件号列表
                    mUserName += mReader["UserName"].ToString() + "\r\n";                           //日期列表
                    mDateTime += mReader.GetDateTime(2).ToString("yyyy-MM-dd HH:mm:ss") + "\r\n";                           //用户名列表
                    mHostName += mReader["HostName"].ToString() + "\r\n";                           //如果说明信息里有回车，则将回车变成>符号
                    mMarkGuid += mReader["MarkGuid"].ToString() + "\r\n";
                }
                mReader.Close();
                mResult = true;
            }
            catch (SqlException e)
            {
                mError = e.ToString();
                mResult = false;
            }
            return (mResult);
        }
        string GetPDFPath()
        {
            string text = IOPaths.RootPath;
            CallContext callContext = AppDataSource.GetCallContext();
            text = text + "\\" + callContext.CustomerCode + "\\Files\\PDF\\";
            if (!System.IO.Directory.Exists(text))
            {
                System.IO.Directory.CreateDirectory(text);
            }
            return text;
        }

    }



}