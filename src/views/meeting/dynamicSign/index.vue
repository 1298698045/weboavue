<template>
  <div class="DynamicSignWrap" :style="{height: height+'px'}">
      <div class="panel">
          <div class="panel-bd">
              <div class="panelDynamicQrcodeWrap">
                <div class="qrcodeimg-top">签到二维码</div>
                <canvas id="qrcodeimg"></canvas>
                <div class="qrcodeimg-bottom1">使用app【扫一扫】功能扫描二维码即可签到</div>
                <div class="qrcodeimg-bottom2">应到0人 实到0人 未到0人</div>
              </div>
              <div class="panelDynamicSignWrap">
                  <div class="DynamicSignList">
                      <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight }" :pagination="data.pagination" @change="handleTableChange">
                        <!-- <template #bodyCell="{ column, index, record }">
                          <template v-if="column.key === 'Action'">
                            <a-button type="text" size="small" @click="handleDelete(record.id)">删除</a-button>
                          </template>
                        </template> -->
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
      title: "姓名",
      dataIndex: "InviteeId",
      key: "InviteeId"
  },
  {
      title: "部门",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit"
  },
  {
      title: "签到时间",
      dataIndex: "Checkin",
      key: "Checkin"
  },
  {
      title: "签到状态",
      dataIndex: "CheckinStatus",
      key: "CheckinStatus"
  },
  ];
  var columns1 = [
  {
      title: "姓名",
      dataIndex: "InviteeId",
      key: "InviteeId"
  },
  {
      title: "部门",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit"
  },
  {
      title: "签退时间",
      dataIndex: "Checkout",
      key: "Checkout"
  },
  {
      title: "原因",
      dataIndex: "Description",
      key: "Description"
  },
  ];
  
  const data = reactive({
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
          pageSize:12,
          current:1,
          showTotal:((total)=>{
              return `共${total}条`
          })
      },
      exitQcode:route.query.exitQcode,
      columns:[],
      checkInUrl:'{!SiteRoot.Mobile}/_ui/meeting/checkin?method=meeting.attend.checkin',
      checkOutUrl:'{!SiteRoot.Mobile}/_ui/meeting/checkin?method=meeting.attend.checkout',
  })
  const { listData, page, rows, total, DynamicSign, id, height, tableHeight, pagination, exitQcode, columns } = toRefs(data);
  const getDynamicSignList = () => {
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
          displayColumns:'InviteeId,OwningBusinessUnit,Checkin,name,Checkout,StatusCode,CheckinStatus,Description,ModifiedOn'
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
  //     getDynamicSignList();
  // }
  //改变页码
  const handleTableChange=(pag, filters, sorter)=>{
    data.pagination.current=pag.current;
    getDynamicSignList();
  }
  //生成二维码
  const generateQRCode=()=>{
    let url=data.checkInUrl;
    if(data.exitQcode*1==1){
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
  onMounted(() => {
        data.height = document.documentElement.clientHeight;
        data.tableHeight = data.height-150;
        if(data.exitQcode*1==1){
          data.columns=columns1;
        }
        else{
          data.columns=columns0;
        }
        getDynamicSignList();
        generateQRCode();
        setInterval(function () {
          getDynamicSignList();
        }, 10000)
        setInterval(function () {
          generateQRCode();
        }, 5000)
  })
</script>
<style lang="less">
  .DynamicSignWrap{
      width: 100%;
      height: 100%;
      .panel{
        height: 100%;
        border-radius: 0;
        background: #165dff !important;
        color: #fff !important;
        font-weight: bold !important;
        font-size: 20px;
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
        .ant-table-cell::before{
          display: none !important;
        }
        .ant-table-cell-scrollbar{
          display: none !important;
        }
        *{
          background: #165dff !important;
          color: #fff !important;
          font-weight: bold !important;
          font-size: 20px;
          text-align: center !important;
        }
        .panel-head .panel-title{
          color:#fff !important;
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
      .panelDynamicSignWrap{
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
          .DynamicSignList{
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
                      line-height: 23px;
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