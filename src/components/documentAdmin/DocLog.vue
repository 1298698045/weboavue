<template>
    <div class="DocLogWrap" ref="TopicsLst">
      <div class="panel" :style="{ height: height + 'px' }">
        <div class="panel-head">
          <!-- <div class="panel-title">文档日志</div> -->
          <div class="tabWrap panel-bd-tabWrap">
              <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                  <a-tab-pane v-for="(item, index) in tabs" :key="index">
                      <template #tab>
                          <span>{{ item.label }}</span>
                      </template>
                  </a-tab-pane>
              </a-tabs>
          </div>
          <div class="panel-btn">
            <a-button class="ml10" type="primary">导出日志</a-button>
          </div>
        </div>
        <div class="panel-bd panel-bd1">
          <a-table :columns="columns" :dataSource="listData" :scroll="{ y:tableHeight }" :pagination="false" @change="handleTableChange">
            <template #bodyCell="{ column, index,record }">
              <template v-if="column.key === 'index'">
                <div>
                  {{ index + 1 }}
                </div>
              </template>
              <!-- <template v-if="column.key === 'FileExtension'">
                <div v-if="record.FileExtension=='8'" class="share-type">
                  <span class="share-type-img">
                    <img :src="require('@/assets/img/user/user.png')" alt="">
                  </span>
                  <span>用户</span>
                </div>
                <div v-if="record.FileExtension=='1036'" class="share-type">
                  <span class="share-type-img">
                    <img :src="require('@/assets/img/user/role.png')" alt="">
                  </span>
                  <span>角色</span>
                </div>
                <div v-if="record.FileExtension=='9'" class="share-type">
                  <span class="share-type-img">
                    <img :src="require('@/assets/img/user/group.png')" alt="">
                  </span>
                  <span>小组</span>
                </div>
                <div v-if="record.FileExtension=='10'" class="share-type">
                  <span class="share-type-img">
                    <img :src="require('@/assets/img/user/businessunit.png')" alt="">
                  </span>
                  <span>部门</span>
                </div>
              </template> -->
              <!-- <template v-if="column.key === 'SharedRights'">
                <div v-if="record.SharedRights=='2'">允许查看</div>
                <div v-if="record.SharedRights=='4'">允许查看和新建任务</div>
              </template> -->
              <template v-if="column.key === 'Action'">
                <div class="iconBox">
                  <div class="popup">
                    <!-- <div class="option-item" @click="handleView(record.id)" :num="index">查看</div> -->
                    <!-- <div class="option-item" @click="handleEdit(record.id)" :num="index">编辑</div>   -->
                    <!-- <div class="option-item" :num="index">重命名</div> -->
                    <div class="option-item" @click="handleDelete(record.id)" :num="index">删除</div>
                    <!-- <div class="option-item" @click="handDownload(record.FileLocation)" :num="index">下载</div> -->
                  </div>
                  <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
                </div>
                <!-- <a-button type="text" size="small" @click="handleView(record.id)" :num="index">查看</a-button>
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
      <AddMeetingShare :isShow="isShare" v-if="isShare"  @cancel="onSearch" :id="props.id" />
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
  import AddMeetingShare from "@/components/meeting/AddMeetingShare.vue";
  const { proxy } = getCurrentInstance();
  const TopicsLst = ref();
  const TaskDetailModal=ref(null);
  var columns = [
  {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 80,
  },
  {
      title: "类型",
      dataIndex: "FileExtension",
      key: "FileExtension",
      width: 200,
  },
  {
      title: "标题",
      dataIndex: "Name",
      key: "Name",
  },
  {
      title: "浏览人",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
      width: 200,
  },
  {
      title: "浏览时间",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      width: 200,
  },
  {
      title: "客户端地址",
      dataIndex: "IpAddr",
      key: "IpAddr",
      width: 200,
  },
    // {
    //   title: "操作",
    //   key: "Action",
    //   width: 120,
    // },
  ];
  const props = defineProps({
    id: String,
    type:String,
    RegardingObjectTypeCode:String,
    RegardingObjectIdName:String
  });
  
  const emit = defineEmits(["load"]);
  
  const data = reactive({
    list: [],
    fileList:[],
    selectedRowKeys: [],
    loading: false,
    listData: [],
    searchVal: "",
    OwningBusinessUnitName:"",
    isRadioUser: false,
    isRadioDept: false,
    isCommon:false,
    isShare:false,
    isTaskDetail:false,
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
    objectTypeCode:'100102',
    sObjectName:'FileLog',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    CheckinStatus:null,
    StatusCode:null,
    Checkin:null,
    Checkin1:null,
    Checkin2:null,
    height:100,
    activeKey:0,
    tabs: [
        {
        label: "全部",
        },
        {
        label: "已阅",
        },
        {
        label: "打印",
        },
        {
        label: "下载",
        },
    ],
  });
  const changeTabs = (e) => {
      data.activeKey = e;
      getQuery();
  };
  const columnList = toRaw(columns);
  const { activeKey,tabs,listData, fileList,height,searchVal,OwningBusinessUnitName,pagination,tableHeight,recordId,objectTypeCode,sObjectName,isDelete,isCommon,isTaskDetail,isShare,deleteDesc,external,isRadioUser,CheckinStatus,StatusCode,Checkin,Checkin1,Checkin2,isRadioDept } = toRefs(data);
  const getQuery = () => {
    // proxy.$get(Interface.user.groupUser, {}).then((res) => {
    //   data.listData = res.rows;
    // });
    data.listData=[];
    data.pagination.total = 0;
    let filterCondition = '[{"attribute":"RegardingObjectId","column":"RegardingObjectId","label":"相关ID","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+props.id+'"]}]';
    if(data.activeKey==0){
    }
    if(data.activeKey==1){
      filterCondition='[{"attribute":"RegardingObjectId","column":"RegardingObjectId","label":"相关ID","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+props.id+'"]},{"attribute":"IsRead","column":"IsRead","label":"是否阅读","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":[1]}]';
    }
    if(data.activeKey==2){
      filterCondition='[{"attribute":"RegardingObjectId","column":"RegardingObjectId","label":"相关ID","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+props.id+'"]},{"attribute":"IsPrint","column":"IsPrint","label":"是否打印","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":[1]}]';
    }
    if(data.activeKey==3){
      filterCondition='[{"attribute":"RegardingObjectId","column":"RegardingObjectId","label":"相关ID","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+props.id+'"]},{"attribute":"IsDownload","column":"IsDownload","label":"是否下载","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":[1]}]';
    }
    
          proxy.$post(Interface.list2, {
              filterId:'',
              objectTypeCode:data.objectTypeCode,
              entityName:data.sObjectName,
              filterCondition:filterCondition,
              search:data.searchVal||'',
              page: data.pagination.current,
              rows: data.pagination.pageSize,
              sort:'Position',
              order:'asc',
              displayColumns:'FileExtension,Name,CreatedOn,CreatedBy,IpAddr'
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
    data.isDelete=false;
    data.isShare=false;
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
      //data.isShare = true;
    }
    //编辑
    const handleEdit = (key) => {
      data.recordId=key;
      //data.isShare = true;
    }
    // 通用弹窗关闭
    const handleCommonCancel = (params) => {
        data.isCommon=false;
    };
    //查看
    const handleView= (id) => {
      data.recordId=id;
      //data.isTaskDetail=true;
      //window.open('/#/lightning/r/Workflow/instance/detail?id='+id+'&reurl=');
    };
    //下载
    const handDownload= (link) => {
      window.open('/#'+link);
    };
  onMounted(() => {
    let h = document.documentElement.clientHeight;
      data.tableHeight = h-345;
      data.height=h-137;
      if(props.type=='modal'){
        data.tableHeight = h-470;
        data.height=h-285;
      }
      window.addEventListener("resize", (e) => {
        let h = document.documentElement.clientHeight;
        data.tableHeight = h-345;
        data.height=h-137;
        if(props.type=='modal'){
          data.tableHeight = h-470;
          data.height=h-285;
        }
      });
  })
  </script>
  <style lang="less">
  .DocLogWrap {
    width: 100%;
    .panel{
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .share-type{
      .share-type-img{
        width: 20px;
        height: 20px;
        display: inline-block;
        background-color: #165dff !important;
        position: relative;
        top: 5px;
        margin-right: 8px;
      }
      img{
        max-width: 100%;
        height: auto;
      }
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
    .DocLogWrap{
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
    .DocLogWrap .panelt{
      background: #f0f2f6 !important;
      margin-bottom: 5px !important;
      padding: 0 !important;
    }
    .DocLogWrap .panel-top{
      background: #f0f2f6 !important;
      padding-bottom: 12px;
    }
    .DocLogWrap .panel-top .ant-card{
      border-radius: 4px !important;
    }
    .DocLogWrap .ant-card:first-child{
      margin-left: 0 !important;
    }
    .DocLogWrap .ant-card:last-child{
      margin-right: 0 !important;
    }
    .DocLogWrap .pageWrap{
      text-align: right;
      padding: 15px;
    }
    .DocLogWrap .iconBox {
    position: relative;
    cursor: pointer;
}
.DocLogWrap .popup .option-item {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 6px 6px 0 0;
}
    .DocLogWrap .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
    .DocLogWrap .iconBox .popup{
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }
    .DocLogWrap{
        .ant-table-wrapper,.ant-spin-nested-loading,.ant-spin-nested-loading .ant-spin-container,.ant-table-wrapper .ant-table,.ant-table-wrapper .ant-table-container{
            height: 100% !important;
        }
        .iconBox {
  position: relative;
  cursor: pointer;
}
.icon.img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.iconBox:hover .popup {
  display: block;
}
.popup {
  position: absolute;
  top: 0;
  min-width: 100px;
  background: #fff;
  display: none;
  z-index: 999999;
  box-shadow: 0 1px 6px rgba(99, 99, 99, 0.2);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
.popup .option-item {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 6px 6px 0 0;
}
.popup .option-item:hover {
  background: #eaf8fe;
}
td[field="Action"] .datagrid-cell {
  overflow: initial !important;
}
:deep .iconBox {
  text-align: center;
}
:deep .iconBox .popup {
  text-align: left;
  top: 20px;
}
:deep .iconBox .moreaction {
  padding: 0px 1px;
  width: 18px;
  border: 1px solid #dedede;
  border-radius: 4px;
  position: relative;
  top: 1px;
}

    }
    .DocLogWrap .panel-bd1{
      height: calc(~'100% - 115px') !important;
    }
    .DocLogWrap .ant-table-body{
      height: 100% !important;
    }
    .container {
        padding: 10px;
        box-sizing: border-box;
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
            background: #1677ff !important;
            a{
                color: #fff;
            }
        }
    } 
    .DocLogWrap{
      .tabWrap{
        width: 100%;
        border-bottom: 1px solid #eee;
      }
      .panel-head{
        margin-bottom: 12px;
        position: relative;
      }
      .panel-btn{
        position: absolute;
        right: 5px;
        top:0;
      }
      .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab{
        padding: 10px 18px !important;
      }
    }
  </style>
  