using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Runtime.InteropServices;
using System.Threading;
using iWebOffice2015;
using System.Data.SqlClient;
using Supermore.Data;
using Supermore;
using iWebOffice.ocx.c.net;
using iWebOffice2015_New;

namespace iWebOffice2015
{
    public partial class OfficeServer : System.Web.UI.Page
    {
        private string mOption;
        private string mUserName;
        private string mRecordID;
        private string mFileName;
        //    private string mFileType;
        private byte[] mFileBody;
        //    private int mFileSize = 0;
        private string mFilePath;

        private String mImageName;  //远程图片名称
        private String mTemplate; // 模板文件
        private String mCommand;   //自定义接受
        private String mOfficePrints; //打印份数次数  
        int mCopies; //打印份数的控制
        private String mDirectory; //保存HTML路径
        private iMsgServer2015 MsgObj;

        private String SessionID; //获取Session
        //更新打印份数
        private bool UpdataCopies(int mLeftCopies)
        {
            bool mResult = true;
            //该函数可以把打印减少的次数记录到数据库
            //根据自己的系统进行扩展该功能
            return mResult;
        }
        //CallContext _caller = null;
        //private iDBManage2000 DBAobj;

        protected void Page_Load(object sender, EventArgs e)
        {

            //// 在此处放置用户代码以初始化页面
            //_caller = AppDataSource.GetCallContext();

         //   DBAobj = new iDBManage2000(_caller);
            //DBAobj.Open();


            MsgObj = new iMsgServer2015();
            mFilePath = Server.MapPath(".");
            try
            {
                MsgObj.setSendType("JSON");
                MsgObj.Load(Request);  //解析请求

                SessionID = Session.SessionID;
                mOption = MsgObj.GetMsgByName("OPTION");//请求参数
                mUserName = MsgObj.GetMsgByName("USERNAME");  //取得系统用户
                if (mOption == "LOADFILE")
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");//取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");//取得文档名称
                    MsgObj.MsgTextClear();//清除文本信息
                    string filePath = @"D:\Work3\MyOA\Web30\Document\Temone.doc";
                    MsgObj.SendLocalFile(Response, filePath);
                    //  MsgObj.SendLocalFile(Response, mFilePath + "\\word\\" + mFileName);

                    //if (LoadFile())
                    //{
                    //    MsgObj.MsgFileBody(mFileBody);				                                  //将文件信息打包
                    //    MsgObj.SetMsgByName("STATUS", "打开成功!.");                                  //设置状态信息
                    //                                                                              // MsgObj.MsgError("");		                                                  //清除错误信息
                    //}
                    //else
                    //{
                    //    //  MsgObj.MsgError("打开失败!");		                                          //设置错误信息
                    //}
                    //return;

                }
                else if (mOption == "SAVEFILE")
                {
                    mRecordID = MsgObj.GetMsgByName("RECORDID");//取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");//取得文档名称
                    MsgObj.MsgTextClear();//清除文本信息
                    if (MsgObj.MsgFileSave(Request,mFilePath + "\\Document\\" + mFileName))
                    {
                        Console.WriteLine(mRecordID + "文档已经保存成功");
                    }
                }
                else if (mOption == "SAVEPDF")
                {
                    Console.WriteLine("文档转PDF");
                    mRecordID = MsgObj.GetMsgByName("RECORDID");//取得文档编号
                    mFileName = MsgObj.GetMsgByName("FILENAME");//取得文档名称
                    MsgObj.MsgTextClear();//清除文本信息
                    if (MsgObj.MsgFileSave(Request,mFilePath + "\\PDF\\" + mFileName))
                    {
                        Console.WriteLine(mRecordID + "文档已经保存成功");
                    }

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
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE"); // 取得模板文档类型
                    // 本段处理是否调用文档时打开模版，还是套用模版时打开模版。
                    MsgObj.SendLocalFile(Response, mFilePath + "\\Document\\" + mTemplate);
                    return;
                }
                else if (mOption == "SAVETEMPLATE")
                { // 下面的代码为打开服务器数据库里的模板文件
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");// 取得模板名称
                    Console.WriteLine(mTemplate + "模板上传中");
                    MsgObj.MsgTextClear();// 清除文本信息
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\Document\\" + mTemplate))
                    {
                        Console.WriteLine(mTemplate + "模板保存成功");
                    }
                }
                else if (mOption == "SAVEIMAGE")
                {                     //下面的代码为将OFFICE存为HTML图片页面
                    mFileName = MsgObj.GetMsgByName("FILENAME");                        //取得文件名称
                    Console.WriteLine("保存HTML图片失败" + mFileName);
                    mDirectory = MsgObj.GetMsgByName("DIRECTORY");                      //取得目录名称 
                    MsgObj.MsgTextClear();
                    if (mDirectory.Trim().Equals(""))
                    {
                        mFilePath = mFilePath + "\\HTMLIMAGE";
                    }
                    else
                    {
                        mFilePath = mFilePath + "\\HTMLIMAGE\\" + mDirectory;
                    }
                    MsgObj.MakeDirectory(mFilePath);                                    //创建路径
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\" + mFileName))
                    {             //保存HTML文件
                        MsgObj.SetMsgByName("STATUS", "保存HTML图片成功!");               //设置状态信息
                    }
                    else
                    {
                        Console.WriteLine("保存HTML图片失败");
                    }

                }
                else if (mOption == "INSERTFILE")
                { // 下面的代码为打开服务器数据库里的模板文件
                    Console.WriteLine("进入INSERTFILE");
                    mTemplate = MsgObj.GetMsgByName("TEMPLATE");// 取得模板名称
                    Console.WriteLine(mTemplate + "模板上传中");
                    MsgObj.MsgTextClear();// 清除文本信息
                    MsgObj.SendLocalFile(Response, mFilePath + "\\Document\\" + mTemplate);
                    return;

                }
                else if (mOption == "PUTFILE")
                {
                    Console.WriteLine("本地文件上传到服务器");
                    mFileName = MsgObj.GetMsgByName("REMOTEFILE");// 取得文档名称
                    MsgObj.MsgTextClear();// 清除文本信息
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\PDF\\" + mFileName))
                    {
                        Console.WriteLine(mRecordID + "文档已经上传成功");
                    }
                }
                else if (mOption == "GETFILE")
                {
                    Console.WriteLine("下载服务器文件到本地");
                    mFileName = MsgObj.GetMsgByName("REMOTEFILE");// 取得文档名称
                    MsgObj.MsgTextClear();// 清除文本信息
                    if (MsgObj.MsgFileSave(Request, mFilePath + "\\PDF\\" + mFileName))
                    {
                        Console.WriteLine(mRecordID + "文档已经下载成功");
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
                }
                Console.WriteLine("SendPackage");
                MsgObj.Send(Response);
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        //调出文档，将文档内容保存在mFileBody里，以便进行打包
        private bool LoadFile()
        {
            bool mResult = false;
            string strSelectCmd = "SELECT FileBody FROM Document_File WHERE RecordID='" + mRecordID + "'";
            SqlConnection conn = new SqlConnection() { ConnectionString = "Server=192.168.1.200;DataBase=Hospital;User Id=hospital;Password=oaAdmin@8989;" };
            conn.Open();
            SqlCommand mCommand = new SqlCommand(strSelectCmd, conn);
            SqlDataReader mReader = mCommand.ExecuteReader();
            if (mReader.Read())
            {
                mFileBody = mReader.GetSqlBinary(0).Value;
                mResult = true;
            }
            else
            {
                // return GetEntityAttach();
                //mResult = false;
            }
            mReader.Close();
            return (mResult);
        }
    }


}