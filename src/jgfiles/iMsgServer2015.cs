using System;
using System.Collections.Generic;
using System.Web;
using System.Collections;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;
using System.Runtime.InteropServices;
using System.Threading;

namespace iWebOffice2015_New
{

    public class iMsgServer2015
    {
        private Dictionary<string, string> saveFormParam = new Dictionary<string, string>();
        private Dictionary<string, string> sendFormParam = new Dictionary<string, string>();
        private FileStream fileContentStream;
        //   private String fileName = "";
        private byte[] mFileBody = null;
        private bool isLoadFile = false;
        private string sendType = "";
        //private File mFile;
        private int FFileSize = 0;
        public string getSendType()
        {
            return sendType;
        }
        public void setSendType(string sendType)
        {
            this.sendType = sendType;
        }

        public void Load(HttpRequest request)
        {

            request.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");
            string strJson = string.Empty;
            strJson = request.Params["FormData"];
            if (!string.IsNullOrEmpty(strJson))
            {
                strJson = strJson.Substring(1, strJson.Length - 2);
            }
            else
            {
                strJson = "";
            }
            string[] strArray = strJson.Split(',');
            saveFormParam.Clear();
            for (int i = 0; i < strArray.Length; i++)
            {
                string[] strTemp = strArray[i].Split(':');
                if (strTemp.Length == 2)//标准键值对
                {
                    strTemp[0] = strTemp[0].Substring(1, strTemp[0].Length - 2);
                    strTemp[1] = strTemp[1].Substring(1, strTemp[1].Length - 2);
                    saveFormParam.Add(strTemp[0], strTemp[1]);
                } else if (strTemp.Length > 2) //解决盘符有冒号情况
                {
                    string value = "";
                    for (int j = 1; j < strTemp.Length; j++)
                    {
                        value += strTemp[j];
                        if (j != strTemp.Length - 1)
                            value += ":";
                    }
                    strTemp[0] = strTemp[0].Substring(1, strTemp[0].Length - 2);
                    value = value.Substring(1, value.Length - 2);
                    saveFormParam.Add(strTemp[0], value);
                }

            }
            if (request.Files.Count > 0)
            {
                HttpPostedFile hf = request.Files["FileData"];
                mFileBody = new Byte[hf.ContentLength];
                BinaryReader reader = new BinaryReader(hf.InputStream);
                mFileBody = reader.ReadBytes(mFileBody.Length);
            }
        }


        public String GetMsgByName(string fieldName)
        {
            string sTemp = string.Empty;
            if (saveFormParam.ContainsKey(fieldName))
            {
                saveFormParam.TryGetValue(fieldName, out sTemp);

            }
            return sTemp;
        }

        public void SetMsgByName(String fieldName, String nameValue)
        {
            saveFormParam.Add(fieldName, nameValue);
        }

        public void MsgTextClear()
        {
            saveFormParam.Clear();
        }

        public byte[] MsgFileBody()
        {
            // mFileBody = null;
            // mFileBody = new byte[fileContentStream.Length];
            // fileContentStream.Read(mFileBody, 0, mFileBody.Length);
            // fileContentStream.Seek(0, SeekOrigin.Begin);
            // fileContentStream.Close();
            /* FileStream fs = new FileStream();
             BinaryWriter output = new BinaryWriter(fs);            
             output.Write(mFileBody);
             output.Close();
             fs.Close();*/
            return mFileBody;
        }

        //文档大小
        public int MsgFileSize()
        {
            return (int)FFileSize;
        }

        public void MsgFileBody(byte[] Value)
        {
            // 数据库文件读取
            MsgTextClear();
            try
            {
                /* //测试从数据库读取出来的流是否正常
                           FileStream fs = File.Open("C:\\test.doc",FileMode.OpenOrCreate,FileAccess.Write);
                           BinaryWriter output = new BinaryWriter(fs);
                           output.Write(Value);
                           output.Close();
                           fs.Close();*/

            }
            catch (Exception e)
            {

                e.ToString();
            }
            isLoadFile = true;
            mFileBody = Value;
            FFileSize = Value.Length;
        }

        public bool MsgFileLoad(String fileName)
        {
            if (File.Exists(fileName))
            {
                fileContentStream = new FileStream(fileName, FileMode.Open, FileAccess.Read);
                MsgFileBody();
            }
            else
            {
                mFileBody = new byte[0];
            }
            isLoadFile = true;
            return true;
        }

        //创建文件夹
        public bool MakeDirectory(String FilePath)
        {
            if (!File.Exists(@FilePath))
            {
                try
                {
                    //创建文件
                    // FileStream fs = new FileStream(@FilePath, FileMode.Create, FileAccess.ReadWrite);
                    // StreamWriter sw = new StreamWriter(fs);
                    if (!Directory.Exists(FilePath))
                        Directory.CreateDirectory(FilePath);
                    return true;

                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

        }

        public bool MsgFileSave(HttpRequest request, string outputFile)
        {
            try
            {
                HttpPostedFile hf = request.Files["FileData"];
                hf.SaveAs(outputFile);
                
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("错误出现在：" + ex.Message);
                return false;
            }
        }

        //public bool MsgFileSave(string outputFile)
        //{
        //    FileStream outStream = null;

        //    try
        //    {
        //        outStream = new FileStream(outputFile, FileMode.OpenOrCreate, FileAccess.Write);
        //        outStream.Seek(0, SeekOrigin.Begin);
        //        outStream.Write(mFileBody, 0, mFileBody.Length);
        //        outStream.Close();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception("错误出现在：" + ex.Message);
        //        return false;
        //    }
        //}

        //获取setMsgByName的值并把封装成JSON数据
        public String GetHashToJson()
        {

            /* method 1*/
            //ArrayList eventList = new ArrayList();
            Hashtable hash = new Hashtable();
            foreach (var item in saveFormParam)
            {
                hash.Add(item.Key, item.Value);
            }
            //eventList.Add(hash);

            JavaScriptSerializer ser = new JavaScriptSerializer();
            String jsonStr = ser.Serialize(hash);

            return jsonStr;
        }

        //发送文件
        public void SendLocalFile(HttpResponse response, String fullPath)
        {
            String getJsonStr = GetHashToJson();
            if (getJsonStr.Length > 0)
            {
                byte[] byteArray = System.Text.UTF8Encoding.UTF8.GetBytes(getJsonStr);
                getJsonStr = System.Text.UTF8Encoding.UTF8.GetString(byteArray);
            }

            response.Clear();
            response.BufferOutput = true;
            response.ContentEncoding = System.Text.Encoding.GetEncoding("UTF-8");
            response.Charset = "UTF-8";
            response.ContentType = "text/html;charset=UTF-8";
            response.AddHeader("RName", getJsonStr);
            response.Charset = "UTF-8";
            //这句话的意思，是告诉servlet用UTF-8转码，而不是用默认的ISO8859  
            response.ContentType = "application/x-msdownload;charset=UTF-8";
            try
            {
                if (System.IO.File.Exists(fullPath) == false)//如果不存在就创建空白文档
                {
                    response.AddHeader("MsgError", "404");
                }
                else
                {
                    response.TransmitFile(fullPath);
                    response.End();
                }
            }
            catch (ThreadAbortException ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        public void setFileToLocal(String fileName)
        {
            //begin FileBody生成到本地
            try
            {
                if (!File.Exists(fileName))
                {
                    FileStream file = new FileStream(fileName, FileMode.CreateNew);
                    file.Seek(0, SeekOrigin.Begin);
                    file.Write(mFileBody, 0, mFileBody.Length); //byData传进来的字节数组,用以接受FileStream对象中的数据,第2个参数是字节数组中开始写入数据的位置,它通常是0,表示从数组的开端文件中向数组写数据,最后一个参数规定从文件读多少字符.
                    file.Close();
                }
                else
                {
                    File.Delete(fileName);
                    FileStream file = new FileStream(fileName, FileMode.CreateNew);
                    file.Seek(0, SeekOrigin.Begin);
                    file.Write(mFileBody, 0, mFileBody.Length); //byData传进来的字节数组,用以接受FileStream对象中的数据,第2个参数是字节数组中开始写入数据的位置,它通常是0,表示从数组的开端文件中向数组写数据,最后一个参数规定从文件读多少字符.
                    file.Close();
                }

            }
            catch (IOException e)
            {
            }
        }

        public void SendFile(HttpResponse response, String fileName)
        {

            //设置本地临时目录
            fileName = "C:\\Windows\\Temp\\" + fileName;
            if (mFileBody.Length != 0 || mFileBody != null)
            {
                try
                {
                    setFileToLocal(fileName);
                    response.TransmitFile(fileName);
                    response.End();
                }
                catch (ThreadAbortException ex)
                {
                    //删除本地临时文件
                    // File.Delete(fileName);
                }
            }
            else
            {
                response.AddHeader("MsgError", "404");
            }

        }

        public void Send(HttpResponse response)
        {
            String getJsonStr = GetHashToJson();
            if (getJsonStr.Length > 0)
            {
                byte[] byteArray = System.Text.UTF8Encoding.UTF8.GetBytes(getJsonStr);
                getJsonStr = System.Text.UTF8Encoding.UTF8.GetString(byteArray);
            }

            //try
            //{
            //    FileStream file = new FileStream("E:\\test.dat", FileMode.CreateNew);
            //    file.Seek(0, SeekOrigin.Begin);
            //    file.Write(byteArray, 0, byteArray.Length); //byData传进来的字节数组,用以接受FileStream对象中的数据,第2个参数是字节数组中开始写入数据的位置,它通常是0,表示从数组的开端文件中向数组写数据,最后一个参数规定从文件读多少字符.
            //    file.Close();
            //}
            //catch (IOException e)
            //{ 
            //}
            response.Clear();
            response.BufferOutput = true;
            response.ContentEncoding = System.Text.Encoding.GetEncoding("utf-8");
            response.ContentType = "text/html;charset=utf-8";
            response.AddHeader("RName", getJsonStr);

            if (mFileBody == null || mFileBody.Length == 0)//如果不存在就创建空白文档
            {
                response.AddHeader("MsgError", "404");
            }
            if (fileContentStream != null)
                fileContentStream.Close();
        }

    }
}