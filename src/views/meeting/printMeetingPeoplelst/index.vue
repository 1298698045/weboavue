<template>
  <div class="PrintMeetingPeoplelst" :style="{height: height+'px'}">
      <div class="panel">
          <div class="panel-head" v-if="type==0">
            {{ (title?title+' ':'')+'参会人员名单' }}
            <div class="panel-btn noprint">
                <a-button type="primary" class="ml10" @click="openPrint()">打印</a-button>
            </div>
          </div>
          <div class="panel-head" v-if="type==1">
              {{ (title?title+' ':'')+'未参会人员名单' }}
            <div class="panel-btn noprint">
                <a-button type="primary" class="ml10" @click="openPrint()">打印</a-button>
            </div>
          </div>
          <div class="panel-info"><span>会议名称：{{title}}</span><span>会议开始时间：{{meetingStart}}</span></div>
          <div class="panel-bd">
              <div class="panelPrintMeetingPeoplelst">
                  <div class="PrintMeetingPeoplelst">
                      <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight }" :pagination="data.pagination" @change="handleTableChange">
                        <!-- <template #bodyCell="{ column, index, record }">
                          <template v-if="column.key === 'Action'">
                            <a-button type="text" size="small" @click="handleDelete(record.id)">删除</a-button>
                          </template>
                        </template> -->
                        <template #bodyCell="{ column, index, record }">
                            <template v-if="column.key === 'index'">
                            <div>
                              {{ index + 1 }}
                            </div>
                          </template>
                        </template>
                      </a-table>
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
  const { proxy } = getCurrentInstance();
  const router = useRouter();
  const route = useRoute();
  const qrcodeimg = ref();
  const props = defineProps({
      id:String
  })
  var columns0 = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80
  },
  {
      title: "单位部门",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit"
  },
  {
      title: "姓名",
      dataIndex: "InviteeId",
      key: "InviteeId"
  },
  {
      title: "签到时间",
      dataIndex: "Checkin",
      key: "Checkin"
  },
  {
      title: "签退时间",
      dataIndex: "CheckOut",
      key: "CheckOut"
  },
  {
      title: "备注",
      dataIndex: "Description",
      key: "Description"
  },
  ];
  var columns1 = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80
  },
  {
      title: "单位部门",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit"
  },
  {
      title: "姓名",
      dataIndex: "InviteeId",
      key: "InviteeId"
  },
  {
      title: "工号",
      dataIndex: "EmployeeNo",
      key: "EmployeeNo"
  },
  {
      title: "岗位",
      dataIndex: "PostId",
      key: "PostId"
  },
  {
      title: "备注",
      dataIndex: "Description",
      key: "Description"
  },
  ];
  
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
      meetingStart:''
  })
  const { listData, page, rows, total, DynamicSign, id, height, tableHeight, pagination, type, columns,meetingStart,title } = toRefs(data);
  const getPrintMeetingPeoplelst = () => {
      data.listData=[];
      data.pagination.total = 0;
      let filterQuery='\nMeetingId\teq\t'+data.id;
      proxy.$post(Interface.list2, {
          filterId:'',
          objectTypeCode:'5002',
          entityName:'MeetingAudience',
          filterQuery:filterQuery,
          search:data.searchVal,
          page: data.pagination.current,
          rows: data.pagination.pageSize,
          sort:'ModifiedOn',
          order:'desc',
          displayColumns:'InviteeId,OwningBusinessUnit,Checkin,name,Checkout,StatusCode,CheckinStatus,Description,ModifiedOn,EmployeeNo,PostId'
      }).then(res => {
          var list = [];
          data.pagination.total = res.pageInfo?res.pageInfo.total:0;
          for (var i = 0; i < res.nodes.length; i++) {
              var item = res.nodes[i];
              for(var cell in item){
                  if(cell!='id'&&cell!='nameField'){
                      item[cell]=girdFormatterValue(cell,item);
                  }
              }
              list.push(item)
          }
          data.listData = list;
      })
  }
  //改变页码
  // const ChangePage=(page, pageSize)=>{
  //     data.page=page;
  //     getPrintMeetingPeoplelst();
  // }
  //改变页码
  const handleTableChange=(pag, filters, sorter)=>{
    data.pagination.current=pag.current;
    getPrintMeetingPeoplelst();
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
               data.meetingStart=fields.ScheduledStart&&fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("YYYY-MM-DD HH:mm"):'';
            }
        })
};
  onMounted(() => {
        data.height = document.documentElement.clientHeight;
        data.tableHeight = data.height-180;
        if(data.type*1==1){
          data.columns=columns1;
        }
        else{
          data.columns=columns0;
        }
        getDetail();
        getPrintMeetingPeoplelst();
        //generateQRCode();
        // setInterval(function () {
        //   getPrintMeetingPeoplelst();
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
  .PrintMeetingPeoplelst{
      width: 100%;
      height: 100%;
      .panel{
        height: 100%;
        border-radius: 0;
        background: #f0f2f6 !important;
        //color: #fff !important;
        font-weight: bold !important;
        font-size: 14px;
        .panel-head{
          font-size: 25px !important;
          justify-content: center;
          margin-bottom: 15px !important;
          position: relative;
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
          font-weight: bold !important;
          font-size: 14px;
          text-align: center !important;
        }
        .panel-head .panel-title{
          //color:#fff !important;
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
      .panelPrintMeetingPeoplelst{
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
          .PrintMeetingPeoplelst{
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
  }
</style>