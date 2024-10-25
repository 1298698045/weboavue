<template>
  <div class="PrintMeetingBasic" :style="{height: height+'px'}">
      <div class="panel">
          <div class="panel-head">
            <b>{{ (title?title+' ':'')+'' }}</b>
            <div class="panel-btn noprint">
                <a-button type="primary" class="ml10" @click="openPrint()">打印</a-button>
            </div>
          </div>
          <!-- <div class="panel-info"><span>会议名称：{{title}}</span><span>会议开始时间：{{meetingStart}}</span></div> -->
          <div class="panel-bd">
              <div class="panelPrintMeetingBasic">
                  <div class="PrintMeetingBasic">
                    <div id="main-content">
                          <table class="table1">
                              <tr class="table1top">
                                <td colspan="1"></td>
                                <td colspan="1"></td>
                                <td colspan="1"><div style="width: 200px;"></div></td>
                                <td colspan="1"></td>
                                <td colspan="1"></td>
                                <td colspan="1"></td>
                                <td colspan="1"></td>
                              </tr>
                              <tr>
                                  <td colspan="7"><b>会议概况</b></td>
                              </tr>
                              <tr>
                                  <td colspan="2" class="trtitle">会议主题：</td>
                                  <td colspan="5" class="righttd">{{detailData.Name?detailData.Name.value:''}}</td>
                              </tr>
                              <tr>
                                  <td colspan="2" class="trtitle">会议时间：</td>
                                  <td colspan="5" class="righttd">{{detailData.ScheduledStart&&detailData.ScheduledStart.value?dayjs(detailData.ScheduledStart.value).format("YYYY-MM-DD HH:mm"):''}}&nbsp;&nbsp;止&nbsp;&nbsp;{{detailData.ScheduledEnd&&detailData.ScheduledEnd.value?dayjs(detailData.ScheduledEnd.value).format("YYYY-MM-DD HH:mm"):''}}</td>
                              </tr>
                              <tr>
                                  <td colspan="2" class="trtitle">会议地点：</td>
                                  <td colspan="5" class="righttd">{{detailData.RoomId?detailData.RoomId.displayValue:''}}</td>
                              </tr>
                              <tr>
                                  <td colspan="2" class="trtitle">会议内容：</td>
                                  <td colspan="5" class="righttd"><div style="min-height: 80px;" v-html="detailData.Description?detailData.Description.value:''"></div></td>
                              </tr>
                              <tr>
                                  <td colspan="2" class="trtitle">参会人：</td>
                                  <td colspan="5" class="righttd">{{detailData.Attachs?detailData.Attachs.value:''}}</td>
                              </tr>
                              <tr>
                                  <td colspan="7"><b>会议议题</b></td>
                              </tr>
                              <tr>
                                  <td colspan="1" class="trtitle">序号</td>
                                  <td colspan="2" class="trtitle">议题内容</td>
                                  <td colspan="1" class="trtitle">审批状态</td>
                                  <td colspan="1" class="trtitle">提交科室</td>
                                  <td colspan="1" class="trtitle">提交人</td>
                                  <td colspan="1" class="trtitle">提交时间</td>
                              </tr>
                              <template v-if="listData&&listData.length">
                                  <tr v-for="(item,index) in listData" :key="index">
                                      <td colspan="1"><div style="width: 50px;">{{index+1}}</div></td>
                                      <td colspan="2"><div style="width: auto;">{{item.Description||''}}</div></td>
                                      <td colspan="1"><div style="width: 80px;">{{item.StatusCode||''}}</div></td>
                                      <td colspan="1"><div style="width: 80px;">{{item.OwningBusinessUnit||''}}</div></td>
                                      <td colspan="1"><div style="width: 80px;">{{item.CreatedBy||''}}</div></td>
                                      <td colspan="1"><div style="width: 80px;">{{item.CreatedOn||''}}</div></td>
                                  </tr>
                              </template>
                          </table>
                      </div>
                  </div>
                  <!-- <div class="pagination">
                      <a-pagination v-model:current="page" :total="total" show-less-items @change="ChangePage" :show-total="total => `共 ${total} 条`" />
                  </div> -->
              </div>
          </div>
      </div>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, defineProps } from "vue";
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  import calendar from 'dayjs/plugin/calendar';
  import weekday from 'dayjs/plugin/weekday';
  import localeData from 'dayjs/plugin/localeData';

  dayjs.extend(calendar);
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  import { UserOutlined } from "@ant-design/icons-vue";
  import { notification } from 'ant-design-vue';
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import { useRouter, useRoute } from "vue-router";
  import QRCode from "qrcode";
import Topics from "../../../components/meeting/meetingCalendar/Topics.vue";
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const qrcodeimg = ref();
  const props = defineProps({
      id:String
  })
  
  const data = reactive({
      title:'',
      listData: [],
      page: 1,
      rows: 10,
      total: 0,
      DynamicSign: "",
      id: route.query.id,
      height:0,
      tableHeight:0,
      pagination:{
          hideOnSinglePage:true,
          showSizeChanger:false,
          showQuickJumper:true,
          total:0,//数据总数
          pageSize:1000,
          current:1,
          showTotal:((total)=>{
              return `共${total}条`
          })
      },
      type:route.query.type,
      columns:[],
      checkInUrl:'{!SiteRoot.Mobile}/_ui/meeting/checkin?method=meeting.attend.checkin',
      checkOutUrl:'{!SiteRoot.Mobile}/_ui/meeting/checkin?method=meeting.attend.checkout',
      meetingStart:'',
      detailData:{},
  })
  const { detailData,listData, page, rows, total, DynamicSign, id, height, tableHeight, pagination, type, columns,meetingStart,title } = toRefs(data);
  const getPrintMeetingTopicsList = () => {
      data.listData=[];
      data.pagination.total = 0;
      let filterQuery='\nMeetingId\teq\t'+data.id;
      proxy.$post(Interface.list2, {
          filterId:'',
          objectTypeCode:'5001',
          entityName:'MeetingItem',
          filterQuery:filterQuery,
          search:data.searchVal,
          page: 1,
          rows: 50,
          sort:'ModifiedOn',
          order:'desc',
          displayColumns:'Name,OwningBusinessUnit,Description,CreatedBy,CreatedOn,StatusCode'
      }).then(res => {
          var list = [];
          data.pagination.total = res.pageInfo?res.pageInfo.total:0;
          for (var i = 0; i < res.nodes.length; i++) {
              var item = res.nodes[i];
              for(var cell in item){
                  if(cell!='id'&&cell!='nameField'){
                      item[cell]=girdFormatterValue(cell,item);
                  }
                  if(cell=='CreatedOn'){
                      item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                  }
                  if(cell=='StatusCode'){
                    if(item[cell]*1==0){
                      item[cell]='草稿'
                    }
                    if(item[cell]*1==1){
                      item[cell]='审批中'
                    }
                    if(item[cell]*1==3){
                      item[cell]='审批通过'
                    }
                  }
              }
              list.push(item)
          }
          if(res.nodes.length){
            if(res.nodes.length>10){}else{
                for (var i = 0; i < (10-res.nodes.length); i++){
                  list.push({
                    Name:''
                  })
                }
            }
          }
          else{
              for (var i = 0; i < 10; i++){
                list.push({
                  Name:''
                })
              }
          }
          data.listData = list;
      })
  }
  //改变页码
  // const ChangePage=(page, pageSize)=>{
  //     data.page=page;
  //     getPrintMeetingTopicsList();
  // }
  //改变页码
  const handleTableChange=(pag, filters, sorter)=>{
    data.pagination.current=pag.current;
    getPrintMeetingTopicsList();
  }
  //生成二维码
  const generateQRCode=()=>{
    let url=data.checkInUrl;
    if(data.type*1==1){
      url=data.checkOutUrl;
    }
    else{
      url=data.checkInUrl;
    }
    url+="&id=" + data.id;
    let nowtime = new Date();
    let timestamp = nowtime.getTime() * 1 + 300000;
    url += "&expiredOn=" + timestamp;
    let opts = {
        errorCorrectionLevel: "H",//容错级别
        type: "image/png",//生成的二维码类型
        quality: 1,//二维码质量
        margin: 0,//二维码留白边距
        width: 500,//宽
        height: 500,//高
        text: url,//二维码内容
        color: {
            dark: "#333333",//前景色
            light: "#fff"//背景色
        }
    };
    data.DynamicSign = url; //生成的二维码为URL地址js
    let msg = document.getElementById("qrcodeimg");
    // 将获取到的数据（val）画到msg（canvas）上
    QRCode.toCanvas(msg, data.DynamicSign, opts, function (error) {
        console.log(error)
    });
  }
  const getDetail = () => {
  let d = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                recordId: data.id,
                apiName:'MeetingRec',
                objTypeCode: '5000'
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(Interface.detail,obj).then(res=>{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
            let fields=res.actions[0].returnValue.fields;
               data.title=fields.Name.displayValue;
               data.detailData=fields;
               //data.meetingStart=fields.ScheduledStart&&fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("YYYY-MM-DD HH:mm"):'';
            }
        })
};
  onMounted(() => {
        data.height = document.documentElement.clientHeight;
        data.tableHeight = data.height-180;
        // if(data.type*1==1){
        //   data.columns=columns1;
        // }
        // else{
        //   data.columns=columns0;
        // }
        getDetail();
        getPrintMeetingTopicsList();
        setTimeout(function(){
          window.print();
        },1000)
        //generateQRCode();
        // setInterval(function () {
        //   getPrintMeetingTopicsList();
        // }, 10000)
        // setInterval(function () {
        //   generateQRCode();
        // }, 5000)
  })
  const openPrint=()=>{
    window.print();
  }
</script>
<style lang="less">
@media print {
  @page {
    size: auto;
    margin: 5mm;
  }

  .noprint {
    display: none;
  }
}
  .PrintMeetingBasic{
      width: 100%;
      height: 100%;
      .panel{
        height: 100%;
        border-radius: 0;
        //background: #f0f2f6 !important;
        //color: #fff !important;
        //font-weight: bold !important;
        font-size: 14px;
        overflow: hidden;
        b{
          font-size: 15px !important;
        }
        .panel-head{
          font-size: 25px !important;
          justify-content: center;
          margin-bottom: 25px !important;
          position: relative;
          b{
            font-size: 25px !important;
          }
          .panel-btn{
            position: absolute;
            right: 20px;
            top: 0;
          }
        }
        .panel-info{
          padding-left: 10px;
          span{
            font-size: 18px !important;
            min-width: 200px;
            display: inline-block;
            text-align: left !important;
            margin-right: 30px;
          }
          margin-bottom: 10px !important;
          text-align: left !important;
        }
        .qrcodeimg-top{
          margin-top: 20px;
          margin-bottom: 35px;
        }
        .qrcodeimg-bottom1{
          margin-top: 35px;
        }
        .qrcodeimg-bottom2{
          margin-top: 30px;
        }
        .ant-table-cell{
          line-height: 1;
        }
        .ant-table-cell::before{
          display: none !important;
        }
        .ant-table-cell-scrollbar{
          display: none !important;
        }
        *{
          //background: #165dff !important;
          //color: #fff !important;
          //font-weight: bold !important;
          font-size: 14px;
          //text-align: center !important;
        }
        .panel-bd{
          height: 100%;
          display: flex;
        }
      }
      .panelDynamicQrcodeWrap{
        width: 600px;
        height: 100%;
        margin-right: 70px;
      }
      .panelPrintMeetingBasic{
          flex: 1;
          padding: 0 0px;
          .DynamicSignBox{
              display: flex;
              .leftAvatar{
                  margin-right: 12px;
              }
              .rightTextare{
                  flex: 1;
                  border-radius: 2px;
                  .textarea{
                      width: 100%;
                      height: 100px;
                      min-height: 22px;
                      border-radius: 2px;
                      background: #f2f3f5;
                      padding-top: 6px;
                      padding-left: 12px;
                      font-size: 14px;
                      border: none;
                      outline: 0;
                      resize: vertical;
                  }
              }
          }
          .optionalWrap{  
              text-align: right;
              padding-top: 10px;
          }
          .PrintMeetingBasic{
              .DynamicSignItemBox{
                  display: flex;
                  margin-top: 20px;
                  .leftAvatar{
                      font-size: 36px;
                      color: #C9CDD4;
                      margin-right: 12px;
                  }
                  .rightDynamicSign{
                      flex: 1;
                      overflow: hidden;
                      line-height: 15px;
                      position: relative;
                      top: 5px;
                      .DynamicSignName{
                          font-size: 14px;
                          color: #ff7d00;
                      }
                      .DynamicSignContent{
                          margin: 6px 0;
                      }
                      .DynamicSignTime{
                          font-size: 12px;
                          color: #86909c;
                      }
                  }
              }
          }
          .pagination{
              margin-top: 20px;
              text-align: right;
              max-height: 74px;
          }
      }

      #main-content td {
            border: 1px solid #333;
            min-width: 60px;
            box-sizing: border-box;
            padding: 5px;
            width: 60px;
            word-break: break-all;
        }

        #main-content tr td:first-child {
            max-width: 60px;
        }

        #main-content td.title {
            font-weight: 700;
        }

        .dataspan {
            border-bottom: 1px solid #333;
        }

        .printbtn {
            width: 98%;
            text-align: right;
            padding-top: 15px;
        }

        #main-content {
            padding: 0 10px;
        }

        .formtitle {
            font-size: 26px;
            line-height: 40px;
            /*font-weight:700;*/
            text-align: center;
        }

        #main-content tr {
            line-height: 28px;
        }

        #main-content tr td p.text {
            text-align: left;
            margin-left: 15px;
        }

        #main-content tr td .opinion {
            text-align: left;
            width: 120px;
            margin-left: 70%;
            margin-top: 10px;
            height: 70px;
            overflow: hidden;
        }

        .table1 {
            border-collapse: collapse;
            width: 100%;
            text-align: center;
            font-size: 14px;
        }

        .formtitle {
            font-family: SimHei;
            font-size: 30px;
            margin-bottom: 15px;
        }

        .formtitlebottom {
            height: 30px;
            text-align: right;
            margin-top: 40px;
            font-size: 21px;
            font-family: FangSong;
        }

        #main-content {
            width: 700px;
            margin: 0 auto;
            text-align: left;
            color: #000;
        }

        .table1 {
            margin-bottom: 20px;
            border-radius: 4px;
            .righttd{
                text-align: left !important;
                text-indent: 12px;
            }
            .trtitle{
              font-weight: bold;
            }
            .table1top{
              visibility: hidden !important;height: 0;margin: 0;padding: 0;
              td{
                padding: 0 !important;
                border: none !important;
              }
            }
        }

        #main-content .table1 tr td {
            min-width: 60px;
            text-align: center;
            border-color: #666;
        }
        #main-content .table1 tr td.formtd{
            border:0;
            border-bottom:1px solid #000;
        }
  }
</style>