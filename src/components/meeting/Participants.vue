<template>
    <div class="relatedWrap" ref="PersonnelLst">
      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">参会人员</div>
          <div class="panel-btn"></div>
        </div>
        <div class="panel-bd">
          <div class="peopleHeader">
            <div class="left">
              <a-input
                v-model:value="searchVal"
                placeholder="请输入姓名"
                class="searchitem"
                @search="onSearch"
              ></a-input>
              <a-select v-model:value="StatusCode" placeholder="请选择接受状态" class="searchitem">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="0">未接受</a-select-option>
                    <a-select-option value="1">已接受</a-select-option>
                    <a-select-option value="2">已拒绝</a-select-option>
              </a-select>
              <a-select v-model:value="CheckinStatus" placeholder="请选择签到状态" class="searchitem">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">未签到</a-select-option>
                <a-select-option value="2">已签到</a-select-option>
              </a-select>
              <!-- <a-date-picker show-time autoclear valueFormat="YYYY-MM-DD HH:mm" placeholder="请选择签到时间" v-model:value="Checkin"></a-date-picker> -->
              <a-range-picker show-time class="radiusNone" valueFormat="YYYY-MM-DD HH:mm:ss" @change="(e)=>{changeRangeDate(e)}" />
            </div>
            <div class="rightOption">
              <a-button class="ml10" type="primary" @click="AddPeople">邀请参与人</a-button>
              <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
              <a-button class="ml10" type="default" @click="onClear">重置</a-button>
              <a-button class="ml10" type="default">导出</a-button>
            </div>
          </div>
          <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight }" :pagination="data.pagination" @change="handleTableChange">
            <template #bodyCell="{ column, index,record }">
              <template v-if="column.key === 'Action'">
                <a-button type="text" size="small" @click="handleDelete(record.id)">删除</a-button>
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
        </div>
      </div>
      <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
      <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="refreshPeople" :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
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
  } from "@ant-design/icons-vue";
  import Interface from "@/utils/Interface.js";
  import { girdFormatterValue } from "@/utils/common.js";
  import { message } from "ant-design-vue";
  import RadioUser from "@/components/commonModal/MultipleUser.vue";
  import Delete from "@/components/listView/Delete.vue";
  const { proxy } = getCurrentInstance();
  const PersonnelLst = ref();
  var columns = [
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
      title: "签到地址",
      dataIndex: "name",
      key: "name"
  },
  {
      title: "签退时间",
      dataIndex: "Checkout",
      key: "Checkout"
  },
  {
      title: "接受状态",
      dataIndex: "StatusCode",
      key: "StatusCode"
  },
  {
      title: "签到状态",
      dataIndex: "CheckinStatus",
      key: "CheckinStatus"
  },
  {
      title: "原因",
      dataIndex: "Description",
      key: "Description"
  },
    {
      title: "操作",
      key: "Action",
      width: 150,
    },
  ];
  const props = defineProps({
    id: String,
  });
  
  const emit = defineEmits(["load"]);
  
  const data = reactive({
    list: [],
    selectedRowKeys: [],
    loading: false,
    listData: [],
    searchVal: "",
    isRadioUser: false,
    isDelete: false,
    RoleCode: 0,
    pagination:{
        hideOnSinglePage:true,
        showSizeChanger:true,
        showQuickJumper:true,
        total:0,//数据总数
        pageSize:10,
        current:1,
        showTotal:((total)=>{
            return `共${total}条`
        })
    },
    total:0,
    tableHeight:0,
    recordId:'',
    objectTypeCode:'5002',
    sObjectName:'MeetingAudience',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    CheckinStatus:null,
    StatusCode:null,
    Checkin:null,
    Checkin1:null,
    Checkin2:null
  });
  const columnList = toRaw(columns);
  const { listData, searchVal,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,deleteDesc,external,isRadioUser,CheckinStatus,StatusCode,Checkin,Checkin1,Checkin2 } = toRefs(data);
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
    // if(data.Checkin){
    //   filterQuery+='\nCheckin\tbetween\t'+data.Checkin;
    // }
    if(data.Checkin1){
      filterQuery+='\nCheckin\tge\t'+data.Checkin1;
    }
    if(data.Checkin2){
      filterQuery+='\nCheckin\tle\t'+data.Checkin2;
    }
          proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:'5002',
              entityName:'MeetingAudience',
              filterQuery:filterQuery,
              search:data.searchVal||'',
              page: data.pagination.current,
              rows: data.pagination.pageSize,
              sort:'ModifiedOn',
              order:'desc',
              displayColumns:'InviteeId,OwningBusinessUnit,Checkin,name,Checkout,StatusCode,CheckinStatus,Description,ModifiedOn'
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
  const handleTableChange=(pag, filters, sorter)=>{
    data.pagination.current=pag.current;
    getQuery();
  }
  getQuery();
  // 添加成员
  const AddPeople = () => {
    data.isRadioUser = true;
    data.RoleCode = 0;
  }
  // 添加管理员
  const AddAdmin = () => {
    data.RoleCode = 2;
    data.isRadioUser = true;
  };
  const refreshPeople=(e)=>{
    getQuery();
    emit("load","");
  }
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
                  apiName: 'MeetingAudience',
                  objTypeCode: '5002',
                  fields: {
                      MeetingId: props.id,
                      InviteeId: params.id,
                      CheckinStatus: 1,
                      StatusCode:0
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
          refreshPeople();
        }
        
      });
  
  };
  defineExpose({ getQuery,PersonnelLst });
  //删除
  const handleDelete = (key) => {
      data.recordId=key;
      data.isDelete = true;
  }
  //删除关闭
  const cancelDelete = (e) => {
      data.isDelete = false;
  };
  onMounted(() => {
      let h = PersonnelLst.value.clientHeight;
      h=document.documentElement.clientHeight;
      data.tableHeight = h-490;
  })
  </script>
  <style lang="less">
  .relatedWrap {
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
  .searchitem{
    width: 200px;
    margin-right: 10px;
    border-radius: 4px !important;
    .ant-select-selector{
        border-radius: 4px !important;
    }
  }
  .peopleHeader .left .ant-picker{
        width: 340px !important;
    }
  </style>
  