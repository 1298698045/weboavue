<template>
    <div class="TopicsWrap" ref="TopicsLst">
        <div class="panel" :style="{ minHeight: (300) + 'px',marginBottom:'15px !important' }">
        <div class="panel-head">
          <div class="panel-title">会议概况</div>
          <div class="panel-btn">
             <a-button class="ml10" type="primary" @click="printForm">打印</a-button>
          </div>
        </div>
        <div class="panel-bd panel-bd1">
            <div id="main-content">
                <table class="table1">
                    <tr>
                        <td colspan="1" class="trtitle">会议主题：</td>
                        <td colspan="2" class="righttd">{{detailData.Name?detailData.Name.value:''}}</td>
                    </tr>
                    <tr>
                        <td colspan="1" class="trtitle">会议时间：</td>
                        <td colspan="2" class="righttd">{{detailData.ScheduledStart&&detailData.ScheduledStart.value?dayjs(detailData.ScheduledStart.value).format("YYYY-MM-DD HH:mm"):''}}&nbsp;&nbsp;止&nbsp;&nbsp;{{detailData.ScheduledEnd&&detailData.ScheduledEnd.value?dayjs(detailData.ScheduledEnd.value).format("YYYY-MM-DD HH:mm"):''}}</td>
                    </tr>
                    <tr>
                        <td colspan="1" class="trtitle">会议地点：</td>
                        <td colspan="2" class="righttd">{{detailData.RoomId?detailData.RoomId.displayValue:''}}</td>
                    </tr>
                    <tr>
                        <td colspan="1" class="trtitle">会议内容：</td>
                        <td colspan="2" class="righttd"><div style="min-height: 80px;" v-html="detailData.Description?detailData.Description.value:''"></div></td>
                    </tr>
                    <tr>
                        <td colspan="1" class="trtitle">参会人：</td>
                        <td colspan="2" class="righttd">{{detailData.Attachs?detailData.Attachs.value:''}}</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
      <div class="panel" :style="{ height: (height-330) + 'px'}">
        <div class="panel-head">
          <div class="panel-title">会议议题</div>
          <div class="panel-btn">
            <a-button class="ml10" type="primary" @click="handleNew">新建</a-button>
            <a-button class="ml10" type="primary">添加议题</a-button>
          </div>
        </div>
        <div class="panel-bd panel-bd1">
          <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight-310 }" :pagination="false" @change="handleTableChange">
            <template #bodyCell="{ column, index,record }">
                <template v-if="column.key === 'index'">
                    <div>
                    {{ index + 1 }}
                    </div>
                </template>
                <template v-if="column.key === 'StatusCode'">
                    <div v-if="record.StatusCode==0">草稿</div>
                    <div v-if="record.StatusCode==1">审批中</div>
                    <div v-if="record.StatusCode==3">审批通过</div>
                </template>
              <template v-if="column.key === 'Action'">
                <div class="iconBox">
                  <div class="popup">
                    <div class="option-item" @click="handleView(record.id)" :num="index">查看议题审批单</div>
                    <div class="option-item" @click="handleEdit(record.id)" :num="index">编辑</div>  
                    <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                  </div>
                  <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                </div>
                <!-- <a-button type="text" size="small" @click="handleView(record.id)" :num="index">查看议题审批单</a-button>
                <a-button type="text" size="small" @click="handleEdit(record.id)" :num="index">编辑</a-button>
                <a-button type="text" size="small" @click="handleDelete(record.id)" :num="index">删除</a-button> -->
              </template>
              <!-- <template v-if="column.key === 'index'">
                <div>
                  {{ index + 1 }}
                </div>
              </template>
              <template v-if="column.key === 'sort'">
                <div class="sortIcon">
                  <ArrowUpOutlined />
                  <ArrowDownOutlined />
                </div>
              </template> -->
            </template>
          </a-table>
          <div class="pageWrap">
                <a-pagination 
                show-size-changer
                show-quick-jumper
                :pageSizeOptions="['10', '20', '50', '80', '100']"
                :pageSize="pagination.pageSize"
                @showSizeChange="sizeChange"
                @change="handleTableChange" v-model:current="pagination.current" :total="pagination.total" :show-total="total => `共 ${total} 条`" />
            </div>
        </div>
      </div>
      <radio-user v-if="isRadioUser" :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="onSearch"></radio-user>
      <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @selectVal="handleDeptParams" @cancel="cancelDeptModal" @ok="onSearch"></radio-dept>
      <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
      <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
    </div>
  </template>
  <script setup>
  import "@/style/common.less";
  import {
    ref,
    toRefs,
    reactive,
    toRaw,
    onMounted,
    watch,
    getCurrentInstance,
    defineEmits,
    defineExpose,
    defineProps,
    h
  } from "vue";
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
  import {
    SwapLeftOutlined,
    SwapRightOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleOutlined
  } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import RadioDept from "@/components/commonModal/RadioDept.vue";
  import Delete from "@/components/listView/Delete.vue";
  import CommonFormModal from "@/components/listView/CommonFormModal.vue";
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  const { proxy } = getCurrentInstance();
  const TopicsLst = ref();
  var columns = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80,
  },
  {
      title: "议题内容",
      dataIndex: "Description",
      key: "Description"
  },
  {
      title: "审批状态",
      dataIndex: "StatusCode",
      key: "StatusCode",
      width: 200,
  },
  {
      title: "提交科室",
      dataIndex: "OwningBusinessUnit",
      key: "OwningBusinessUnit",
      width: 200,
  },
  {
      title: "提交人",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
      width: 200,
  },
  {
      title: "提交时间",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      width: 200,
  },
    {
      title: "操作",
      key: "Action",
      width: 120,
    },
  ];
  const props = defineProps({
    id: String,
    type:String,
    detailData:{
        type:Object,
        default:{}
    }
  });
  
  const emit = defineEmits(["load"]);
  
  const data = reactive({
    list: [],
    selectedRowKeys: [],
    loading: false,
    listData: [],
    searchVal: "",
    OwningBusinessUnitName:"",
    isRadioUser: false,
    isRadioDept: false,
    isCommon:false,
    RoleCode: 0,
    pagination:{
        hideOnSinglePage:false,
        showSizeChanger:true,
        showQuickJumper:true,
        total:0,//数据总数
        pageSize:10,
        current:1,
        pageSizeOptions: ['10', '20', '50', '100'],
        defaultPageSize: 10,
        showTotal:((total)=>{
            return `共${total}条`
        })
    },
    total:0,
    tableHeight:0,
    recordId:'',
    objectTypeCode:'5001',
    sObjectName:'MeetingItem',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    CheckinStatus:null,
    StatusCode:null,
    Checkin:null,
    Checkin1:null,
    Checkin2:null,
    height:100,
    detailData:{}
  });
  const columnList = toRaw(columns);
  const { listData, detailData,height,searchVal,OwningBusinessUnitName,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,isCommon,deleteDesc,external,isRadioUser,CheckinStatus,StatusCode,Checkin,Checkin1,Checkin2,isRadioDept } = toRefs(data);
  const getQuery = () => {
    // proxy.$get(Interface.user.groupUser, {}).then((res) => {
    //   data.listData = res.rows;
    // });
    data.listData=[];
    data.pagination.total = 0;
    let filterQuery='\nMeetingId\teq\t'+props.id;
    if(data.StatusCode){
        filterQuery+='\nStatusCode\teq\t'+data.StatusCode;
    }
    if(data.CheckinStatus){
        filterQuery+='\nCheckinStatus\teq\t'+data.CheckinStatus;
    }
    if(data.OwningBusinessUnitName){
      filterQuery+='\nOwningBusinessUnitName\tcontains\t'+data.OwningBusinessUnitName;
    }
    if(data.Checkin1){
      filterQuery+='\nCheckin\tge\t'+data.Checkin1;
    }
    if(data.Checkin2){
      filterQuery+='\nCheckin\tle\t'+data.Checkin2;
    }
          proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:data.objectTypeCode,
              entityName:data.sObjectName,
              filterQuery:filterQuery,
              search:data.searchVal||'',
              page: data.pagination.current,
              rows: data.pagination.pageSize,
              sort:'ModifiedOn',
              order:'desc',
              displayColumns:'Name,OwningBusinessUnit,Description,CreatedBy,CreatedOn,StatusCode'
          }).then(res => {
              var list = [];
              data.total = res.pageInfo?res.pageInfo.total:0;
              data.pagination.total = res.pageInfo?res.pageInfo.total:0;
              //console.log(pagination)
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      if(cell=='CreatedOn'){
                          item[cell]=item[cell]?dayjs(item[cell]).format("YYYY-MM-DD HH:mm"):'';
                      }
                  }
                  list.push(item)
              }
              data.listData = list;
              
          })
  };
  const onSearch = (e) => {
    getQuery();
  };
  const onClear = (e) => {
    data.searchVal='';
    data.StatusCode=null;
    data.CheckinStatus=null;
    data.Checkin=null;
    getQuery();
  };
  const changeRangeDate = (e) => {
        //console.log("e",e,item);
        if(e&&e.length){
            data.Checkin=e.join(',');
            data.Checkin1=e[0];
            data.Checkin2=e[1];
        }
        else{
            data.Checkin='';
        }
    }
  //改变页码
  const handleTableChange=(page, pageSize)=>{
    //data.pagination.current=page.current;
    data.pagination.current=page;
    data.pagination.pageSize=pageSize;
    getQuery();
  }
  const sizeChange=(current, size)=>{
    handleTableChange(current, size)
  }
  getQuery();
  // 添加成员
  const AddNew = () => {
    data.isRadioUser = true;
    data.RoleCode = 0;
  }
  // 添加管理员
  const AddAdmin = () => {
    data.RoleCode = 2;
    data.isRadioUser = true;
  };
  const closeUser = (e) => {
    data.isRadioUser = false;
  };
  // 添加成员/管理员
  const getUserData = (params) => {
    console.log("params:", params);
          let url=Interface.create;
          let d = {
          actions:[{
              id: "2919;a",
              descriptor: "",
              callingDescriptor: "UNKNOWN",
              params: {
                recordInput: {
                  allowSaveOnDuplicate: false,
                  apiName: data.sObjectName,
                  objTypeCode: data.objectTypeCode,
                  fields: {
                      MeetingId: props.id,
                      InviteeId: params.id,
                      Name: params.name,
                      StatusCode:1
                  }
                }              
              }
          }]
      };
      
      let obj = {
          message: JSON.stringify(d)
      }
      proxy.$post(url,obj).then(res=>{
        data.isRadioUser = false;
        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
          message.success("添加成功！");
          onSearch();
        }
        
      });
  
  };
  const cancelDeptModal = (params) => {
        data.isRadioDept = params;
  };
  const handleDeptParams = (params) => {
        console.log("deptData", params);
  };

  defineExpose({ getQuery,TopicsLst });
  //删除
  const handleDelete = (key) => {
      data.recordId=key;
      data.isDelete = true;
  }
  //删除关闭
  const cancelDelete = (e) => {
      data.isDelete = false;
  };
  //新建
  const handleNew = (e) => {
      data.recordId='';
      data.isCommon = true;
    }
    //编辑
    const handleEdit = (key) => {
      data.recordId=key;
      data.isCommon = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //查看
    const handleView= (id) => {
        window.open('/#/lightning/r/Workflow/instance/detail?id='+id+'&reurl=');
    };
  onMounted(() => {
      data.detailData=props.detailData;
      let h = document.documentElement.clientHeight;
      data.tableHeight = h-325;
      data.height=h-137;
      if(props.type=='modal'){
        data.tableHeight = h-480;
        data.height=h-295;
      }
      window.addEventListener("resize", (e) => {
        let h = document.documentElement.clientHeight;
        data.tableHeight = h-325;
        data.height=h-137;
        if(props.type=='modal'){
          data.tableHeight = h-480;
          data.height=h-295;
        }
      });
  })
  //打印
  const printForm=()=>{
    let url = router.resolve({
            path:'/lightning/o/printMeetingBasic',
            name: "PrintMeetingBasic",
            query: {
                id: props.id,
            },
        });
        window.open(url.href);
  }
  </script>
  <style lang="less">
  .TopicsWrap {
    width: 100%;
    .panel{
        margin-bottom: 0;
        padding-bottom: 0;
    }
  }
  .peopleHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .peopleHeader .searchitem{
    width: 170px !important;
    margin-right: 10px;
    border-radius: 4px !important;
    .ant-select-selector{
        border-radius: 4px !important;
    }
  }
  .peopleHeader .left .ant-picker{
        width: 340px !important;
    }
    .TopicsWrap{
      .panel{
        padding-top: 15px !important;
        margin-bottom: 0px !important;
      }
      .panelt{
        margin-bottom: 20px !important;
        padding: 12px;
      }
      .detailContent{
        width: 100%;
        padding: 20px;
        background: #fff;
        border-radius: 4px;
        overflow: auto;
      }
      .panel-top{
        background: #fff !important;
        padding-bottom: 15px;
        display: flex;
        .ant-card {
            width: 330px;
            float: left;
            color: #666;
            margin: 0 7px;
            margin-bottom: 0;
            box-shadow: none !important;
            border: 1px solid #eee !important;
            border-radius: 2px !important;
            background-color: #fff;
        }
        .ant-card-body {
            padding: 10px 15px;
            line-height: 30px !important;
            overflow: hidden;
            position: relative;
        }
        .statistics-left {
            float: left;
        }
        .statistics-name{
          font-size: 14px;
        }
        .statistics-count {
            font-weight: 700;
            font-size: 22px;
            color: #555;
        }
        .ant-card-body {
            padding: 10px 15px;
            border-radius: 4px;
        }
        .statistics-right {
            float: right;
            .anticon{
              font-size: 40px;
              position: relative;
              top: 10px;
              color: #108def;
            }
        }
        .layui-icon.wancheng {
            font-size: 45px !important;
            margin-top: 12px;
            color: #108def;
        }
      }
    }
    body .ant-table-tbody td{
      padding: 6.5px 16px !important;
    }
    body .ant-table-measure-row td{
      padding: 0 !important;
    }
    body .ant-table-wrapper .ant-table-thead >tr>th{
      background-color: #f7fbfe !important;
      padding: 8.5px 16px !important;
    }
    body .ant-table-tbody tr:hover,body .ant-table-tbody tr:hover td{
      background-color: #e9f7ff !important;
      color: #108def !important;
    }
    body .ant-table-tbody tr:nth-child(odd) {
      background-color: rgb(250, 250, 250) !important; /* 奇数行背景色 */
    }
    body .ant-table-tbody tr:nth-child(even) {
      background-color: #fff !important; /* 偶数行背景色 */
    }
    .TopicsWrap .panelt{
      background: #f0f2f6 !important;
      margin-bottom: 5px !important;
      padding: 0 !important;
    }
    .TopicsWrap .panel-top{
      background: #f0f2f6 !important;
      padding-bottom: 12px;
    }
    .TopicsWrap .panel-top .ant-card{
      border-radius: 4px !important;
    }
    .TopicsWrap .ant-card:first-child{
      margin-left: 0 !important;
    }
    .TopicsWrap .ant-card:last-child{
      margin-right: 0 !important;
    }
    .TopicsWrap .pageWrap{
      text-align: right;
      padding: 15px;
    }
    .TopicsWrap .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
    .TopicsWrap .iconBox .popup{
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }
    .TopicsWrap{
        .ant-table-wrapper,.ant-spin-nested-loading,.ant-spin-nested-loading .ant-spin-container,.ant-table-wrapper .ant-table,.ant-table-wrapper .ant-table-container{
            height: 100% !important;
        }
    }
    .TopicsWrap .panel-bd1{
      height: calc(~'100% - 115px') !important;
    }
    .TopicsWrap .ant-table-body{
      height: 100% !important;
    }
    .ant-pagination{
        .ant-pagination-item{
            border: 1px solid #d9d9d9;
        }
        .ant-pagination-item:hover{
            border: 1px solid #1677ff;
            background: #fff !important;
        }
        .ant-pagination-item-active,.ant-pagination-item-active:hover{
            border: 1px solid #1677ff;
            background: #1677ff;
            a{
                color: #fff;
            }
        }
    } 
    .TopicsWrap{
        #main-content td {
            border: 1px solid #333;
            min-width: 80px;
            box-sizing: border-box;
            padding: 5px;
            width: 95px;
            word-break: break-all;
        }

        #main-content tr td:first-child {
            max-width: 100px;
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
            width: 100%;
            margin: 0 auto;
            text-align: left;
            color: #000;
        }

        .table1 {
            margin-bottom: 20px;
            border-radius: 4px;
            .righttd{
                text-align: left !important;
                text-indent: 60px;
            }
            .trtitle{
              font-weight: bold;
            }
        }

        #main-content .table1 tr td {
            min-width: 200px;
            text-align: center;
            border-color: #ddd;
        }
        #main-content .table1 tr td.formtd{
            border:0;
            border-bottom:1px solid #000;
        }
    }
  </style>
  