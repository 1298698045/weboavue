<template>
    <div class="MeetingSummaryWrap" ref="TopicsLst">
      <div class="panel" :style="{ height: height + 'px' }">
        <div class="panel-head">
          <div class="panel-title">会议纪要</div>
          <div class="panel-btn">
            <a-button class="ml10" type="primary" @click="handleEdit">编辑</a-button>
            <a-button class="ml10" @click="handleView">预览</a-button>
          </div>
        </div>
        <div class="panel-bd MeetingSummaryContent" v-html="content">
        </div>
      </div>
      <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="onSearch"></radio-user>
      <radio-dept :isShow="isRadioDept" @selectVal="handleDeptParams" @cancel="cancelDeptModal" @ok="onSearch"></radio-dept>
      <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal>
      <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
      <NewInfo :isShow="isNew" :treeData="gData" @cancel="isNew=false" :objectTypeCode="'100201'" :RegardingObjectTypeCode="'5000'" :RegardingObjectId="props.id" :FolderId="'00000000-0000-0000-0000-000000002000'" :RegardingObjectName="props.RegardingObjectName" />
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
  import NewInfo from "@/components/information/NewInfo.vue";
  const { proxy } = getCurrentInstance();
  const TopicsLst = ref();
  var columns = [
  {
      title: "标题",
      dataIndex: "Name",
      key: "Name"
  },
  
  ];
  const props = defineProps({
    id: String,
    type:String,
    RegardingObjectName:String
  });
  const gData = ref([]);
  gData.value = [
    {
      key:'00000000-0000-0000-0000-000000002000',
      value:'00000000-0000-0000-0000-000000002000',
      children:[],
      id:'00000000-0000-0000-0000-000000002000',
      name:'会议纪要',
      quantity:0,
      text:null,
      parent:null
    }
  ];
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
    objectTypeCode:'5004',
    sObjectName:'MeetingSummary',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    CheckinStatus:null,
    StatusCode:null,
    Checkin:null,
    Checkin1:null,
    Checkin2:null,
    height:100,
    content:'',
    isNew:false
  });
  const columnList = toRaw(columns);
  const { listData, content,isNew,height,searchVal,OwningBusinessUnitName,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,isCommon,deleteDesc,external,isRadioUser,CheckinStatus,StatusCode,Checkin,Checkin1,Checkin2,isRadioDept } = toRefs(data);
  const getQuery = () => {
    // proxy.$get(Interface.user.groupUser, {}).then((res) => {
    //   data.listData = res.rows;
    // });
    data.listData=[];
    data.pagination.total = 0;
    let filterQuery='\nRegardingObjectId\teq\t'+props.id;
          proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:'100201',
              entityName:'Content',
              filterQuery:filterQuery,
              search:data.searchVal||'',
              page: data.pagination.current,
              rows: data.pagination.pageSize,
              sort:'ModifiedOn',
              order:'desc',
              displayColumns:'ContentBody'
          }).then(res => {
              var list = [];
              data.total = res.pageInfo?res.pageInfo.total:0;
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
              if(list&&list[0]&&list[0].ContentBody){
                data.content=list[0].ContentBody;
                data.recordId=list[0].id;
              }
              else{
                data.recordId='';
                data.isNew = true;
              }
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
  const handleTableChange=(pag, filters, sorter)=>{
    //data.pagination.current=pag.current;
    data.pagination.current=pag;
    console.log(pag);
    getQuery();
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
      window.open('/#/content/visualEditor?id='+data.recordId+'&objectTypeCode=100201&FolderId=00000000-0000-0000-0000-000000002000&RegardingObjectTypeCode=5000&RegardingObjectId='+props.id);
      //data.isCommon = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //查看
    const handleView= (id) => {
        //window.open('/#/detail?id='+id+'&reurl=');
        window.open('/#/previewContent?id='+data.recordId+'&objectTypeCode=100201');
    };
  onMounted(() => {
      let h = TopicsLst.value.clientHeight;
      h=document.documentElement.clientHeight;
      data.tableHeight = h-310;
      data.height=h-120;
      if(props.type=='modal'){
        data.tableHeight = h-470;
        data.height=h-285;
      }
      window.addEventListener("resize", (e) => {
        let h = TopicsLst.value.clientHeight;
        h=document.documentElement.clientHeight;
        data.tableHeight = h-310;
        data.height=h-120;
        if(props.type=='modal'){
          data.tableHeight = h-470;
          data.height=h-285;
        }
      });
  })
  </script>
  <style lang="less">
  .MeetingSummaryWrap {
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
    .MeetingSummaryWrap{
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
    :where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table-thead >tr>th{
      background-color: #f7fbfe !important;
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
    .MeetingSummaryWrap .panelt{
      background: #f0f2f6 !important;
      margin-bottom: 5px !important;
      padding: 0 !important;
    }
    .MeetingSummaryWrap .panel-top{
      background: #f0f2f6 !important;
      padding-bottom: 12px;
    }
    .MeetingSummaryWrap .panel-top .ant-card{
      border-radius: 4px !important;
    }
    .MeetingSummaryWrap .ant-card:first-child{
      margin-left: 0 !important;
    }
    .MeetingSummaryWrap .ant-card:last-child{
      margin-right: 0 !important;
    }
    .MeetingSummaryWrap .pageWrap{
      text-align: right;
      padding: 15px;
    }
    .MeetingSummaryContent{
      width: 100%;
      height: calc(~'100% - 70px');
      min-height: 164px;
      border: 1px solid #e5e6eb;
      padding: 23px 21px;
      box-sizing: border-box;
      border-radius: 2px;
      overflow: hidden;
    }
    .MeetingSummaryWrap .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
    .MeetingSummaryWrap .iconBox .popup{
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }
    :where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper,:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading,:where(.css-dev-only-do-not-override-kqecok).ant-spin-nested-loading .ant-spin-container,:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table,:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper .ant-table-container{
      height: 100%;
    }
    .MeetingSummaryWrap .panel-bd1{
      height: calc(~'100% - 115px');
    }
    .MeetingSummaryWrap .ant-table-body{
      height: 100% !important;
    }
  </style>
  