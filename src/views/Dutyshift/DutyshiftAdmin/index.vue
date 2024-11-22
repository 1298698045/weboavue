<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">{{pageTitle||''}}</span>
            </div>
            <div class="headerRight">
                <a-button type="primary">设置班次</a-button>
                <a-button type="primary" class="ml10">提交</a-button>
                <a-button type="primary" class="ml10" @click="handlePrint">打印</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <div class="schedual" v-if="pageTitle!='行政总值班'">
                <div class="schedualbtn">
                    <div class="attdpeople-head">
                        <div class="attdpeople-head-title">
                            值班班次
                        </div>
                    </div>
                    <div class="attdpeople-section">
                        <ul style="display: block;">
                            <li employeeid="d6a9fcd6-b65e-4284-b9e6-ea542407d890" class="attdpeople-item">    
                                <span>白班</span>    
                            </li>
                            <li employeeid="7789d08f-5a26-4f08-91ec-66b0d8454229" class="attdpeople-item">    
                                <span>夜班</span>    
                            </li>
                            <li employeeid="8809c60e-077b-4292-9202-108630226dcc" class="attdpeople-item">    
                                <span>休假</span>    
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="calendarLeft" :class="{'calendarCenter':pageTitle!='行政总值班'}">
                <CalendarVue v-if="isshowCalendar" @refresh="refreshTime" />
            </div>
            <div class="calendarRight">
                <div class="attdpeople">
                    <div class="attdpeople-head">
                        <div class="attdpeople-head-title">
                            值班人员
                            <a-input placeholder="请输入搜索" class="attdpeople-head-seach-input" autocomplete="off" v-model:value="data.searchVal" @change="onSearch"></a-input>
                            <SearchOutlined class="attdpeople-head-seach-icon" />
                        </div>
                    </div>
                    <div class="attdpeople-section">
                        <!-- <ul style="display: block;">
                            <li employeeid="d6a9fcd6-b65e-4284-b9e6-ea542407d890" class="attdpeople-item">    
                                <span>郝</span>    
                                <span title="测试部门">测试部门</span>    
                                <span>Hxy555</span>
                            </li>
                            <li employeeid="7789d08f-5a26-4f08-91ec-66b0d8454229" class="attdpeople-item">    
                                <span>郝小白</span>    
                                <span title="测试部门">测试部门</span>    
                                <span>hxy666</span>
                            </li>
                            <li employeeid="8809c60e-077b-4292-9202-108630226dcc" class="attdpeople-item">    
                                <span>郝小花</span>    
                                <span title="测试部门">测试部门</span>    
                                <span>hxy111</span>
                            </li>
                        </ul> -->
                         <a-tree
                         class="group-people-tree"
                  :style="{height: tableHeight+'px'}"
                  :expanded-keys="expandedKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="gData"
                  block-node
                  :fieldNames="fieldNames"
                  :selectedKeys="[data.SelectKey]"
                  @select="onSelect"
                  @expand="onExpand"
                >
                  <template #switcherIcon="{ switcherCls }">
                    <CaretDownOutlined
                      :class="switcherCls"
                      style="color: rgb(163, 163, 163); font-size: 14px"
                    ></CaretDownOutlined>
                  </template>
                  <template  #title="{ name }">
                    <span>{{ name }}</span>
                  </template>
                </a-tree>
                    </div>
                    <!-- <div id="attachFiles" style="margin-bottom:10px;">
                        <div class="attdpeople-head-title">附件</div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="loadingWrap" v-if="!isshowCalendar">
            <loading-outlined></loading-outlined>
            <span class="loadinglabel">正在加载中，请稍候...</span>
        </div>
        <NewMeeting :isShow="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" />
        <NewRepeatMeeting :isShow="isRepeatMeeting" @cancel="cancelRepeatMeeting" @selectVal="handleRepeatMeetingVal" />
    </div>
</template>
<script setup>
    // import "@/style/oldIcon/iconfont.css";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
    } from "vue";
    import { SearchOutlined, DeleteOutlined,LoadingOutlined,CaretDownOutlined } from "@ant-design/icons-vue";
    import ListView from "@/components/meeting/meetingCalendar/List.vue";
    import CalendarVue from "@/components/Dutyshift/DutyshiftAdmin/Calendar.vue";
    import { message } from "ant-design-vue";

     // 新建
     import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    // 重复会议
    import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
    import Interface from "@/utils/Interface.js";
    import { girdFormatterValue,formTreeData } from "@/utils/common.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
        current: 1,
        isNewMeeting: false,
        isRepeatMeeting: false,
        searchVal:'',
        pageTitle:route.meta.name||'',
        isshowCalendar:true,
        pageTime:'',
        tableHeight: '',
        fieldNames:{
      children:'children', title:'name', key:'id'
    },
    SelectKey:'',
    SelectName:'',
    });
    const { SelectKey,SelectName,fieldNames,tableHeight,pageTime,pageTitle,current, isNewMeeting, isRepeatMeeting,searchVal,isshowCalendar } = toRefs(data);
    const expandedKeys = ref([]);
    const autoExpandParent = ref(true);
    const gData = ref([]);
    const gDataAll=ref([]);
    const onExpand = (keys) => {
    expandedKeys.value = keys
  };
  const onSelect = (keys,{node}) => {
    expandedKeys.value=keys;
    if(keys&&keys.length){
      data.SelectKey=node.id;
      data.SelectName=node.name;
      
    }
  };
  onMounted(()=>{
    let userInfo=window.localStorage.getItem('userInfo');
    if(userInfo){
        userInfo=JSON.parse(userInfo);
        data.userId=userInfo.userId;
    }
    window.addEventListener('resize',changeHeight)
  })
  function changeHeight(h){
    let contentHeight = document.documentElement.clientHeight;
    let height = contentHeight - 100;
    data.tableHeight = height;

  }
    const getTreeData=()=>{
    gData.value = [];
    gDataAll.value = [];
    let filterQuery='';
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'30041',
            entityName:'HRAttendGroup',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'SortNumber',
            order:'asc',
            displayColumns:'Name'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                  }
                  gData.value.push({
                    children:[],
                    id:item.id,
                    pid:'',
                    key:item.id,
                    name:item.Name,
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.id,
                  })
                  gDataAll.value.push({
                    children:[],
                    id:item.id,
                    pid:'',
                    key:item.id,
                    name:item.Name,
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.id,
                  })
                  getChild(item.id,i);
              }
            }
        })
    
  }
  getTreeData()
  const getChild=(id,index)=>{
    (gData.value)[index].children = [];
    (gDataAll.value)[index].children = [];
    let filterQuery='\nAttendGroupId\teq\t'+id;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'30042',
            entityName:'HRAttendGroupMembers',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'SortNumber',
            order:'asc',
            displayColumns:'Name,EmployeeId'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              var list = [];
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                      
                  }
                  item.name=item.Name||item.EmployeeId;
                  if(item.name){
                    list.push(item);
                  }
                  
              }
              (gData.value)[index].children = list;
              (gDataAll.value)[index].children = list;
            }
        })
  }
  const searchTreeData=()=>{
    gData.value = [];
    gDataAll.value = [];
    let filterQuery='\nFullName\tcontains\t'+data.searchVal;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'30020',
            entityName:'HREmployee',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 100,
            sort:'EmployeeNo',
            order:'asc',
            displayColumns:'FullName,EmployeeNo'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                  }
                  gData.value.push({
                    children:[],
                    id:item.id,
                    pid:'',
                    key:item.id,
                    name:item.FullName+'（'+(item.EmployeeNo||'')+'）',
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.id,
                  })
                  gDataAll.value.push({
                    children:[],
                    id:item.id,
                    pid:'',
                    key:item.id,
                    name:item.FullName+'（'+(item.EmployeeNo||'')+'）',
                    parent:null,
                    quantity:0,
                    text:null,
                    value:item.id,
                  })
              }
            }
        })
    
  }
const onSearch=()=>{
    //data.searchVal=e.data;
    if(data.searchVal){
        searchTreeData();
    }
    else{
        getTreeData()
    }
}
    watch(()=> route.meta.name, (newVal,oldVal) => {
        data.isshowCalendar=false;
        setTimeout(function(){
            data.isshowCalendar=true;
            getData();
        },300)
    })
    const getData= () => {
        data.pageTitle=route.meta.name;
    }
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = e;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
    }
    // 新建会议
    const handleAddMeeting = () => {
        data.isNewMeeting =  true;
    }
    // 新建重复会议
    const handleAddRepeatMeeting = () => {
        data.isRepeatMeeting =  true;
    }
    // 关闭重复会议弹窗
    const cancelRepeatMeeting = (e) => {
        data.isRepeatMeeting = e;
    }
    const handleRepeatMeetingVal = (e) => {
        data.isRepeatMeeting = false;
    }
    const refreshTime= (e) => {
        data.pageTime = e;
    }
    //打印
  const handlePrint=()=>{
    let url = router.resolve({
            path:'/lightning/o/printDutyShift',
            name: "PrintDutyShift",
            query: {
                name: data.pageTitle,
                type:'print',
                time: data.pageTime
            },
        });
        window.open(url.href);
  }
</script>
<style lang="less" scoped>
    .wrappper{
        width: 100%;
        height: 100%;
        .calendarBody{
            display: flex;
            height: calc(~"100% - 52px");
            .leftMenuWrapper{
                min-width: 115px;
                width: 115px;
                height: 100%;
                padding: 8px 8px;
                border-right: 1px solid #e5e6eb;
                background: #fff;
                .leftTabMenu{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    display: flex;
                    align-items: center;
                    color: #4e5969;
                    background: #fff;
                    cursor: pointer;
                    box-sizing: border-box;
                    margin-bottom: 4px;
                    border-radius: 2px;
                    &.active{
                        color: var(--textColor);
                        background: #f2f3f5;
                    }
                    .iconfont{
                        padding-left: 10px;
                        font-size: 14px;
                    }
                    .name{
                        padding-left: 8px;
                    }
                    &:hover{
                        background: #f2f3f5;
                    }
                    &.active:hover{
                        font-weight: bold;
                    }
                }
            }
            .schedual{
                width: 200px;
                height: 100%;
                background: #fff;
                .schedualbtn{
                    width: 100%;
                    border: 1px solid #dedede;
                    //border-left: 0;
                    margin-top: 56px;
                    height: calc(~'100% - 55px');
                    .attdpeople-head{
                        width: 100%;
                        font-size: 14px;
                        height: 45px;
                        border-bottom: 1px solid #dedede;
                        .attdpeople-head-title {
                            background-color: #f9f9f9;
                            padding: 5px;
                            height: 44px;
                            line-height: 37px;
                            padding-left: 12px;
                            position: relative;
                        }
                        .attdpeople-head-title input {
                            float: right;
                            height: 30px;
                            line-height: 30px;
                            //text-indent: 10px;
                            margin-right: 7px;
                            margin-top: 3px;
                            border-radius: 4px;
                        }
                        .attdpeople-head-seach-input{
                            width:260px;
                            border-radius: 4px !important;
                        }
                        .attdpeople-head-seach-icon{
                            color: #aaa;
                            font-size: 18px;
                            position: absolute;
                            right: 20px;
                            top: 14px;
                        }
                    }
                    .attdpeople-section {
                            overflow: auto;
                            height:calc(~'100% - 84px') !important;
                            ul{
                                display: block;
                                margin-top: 5px;
                                .attdpeople-item {
                                    line-height: 28px;
                                    cursor: pointer;
                                    margin-left: 0;
                                    padding-left: 20px;
                                }
                                .attdpeople-item:hover,.attdpeople-item.active {
                                    background-color: #f9f9f9;
                                    color: #108def;
                                }
                                .attdpeople-item span {
                                    display: inline-block;
                                    width: 32%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    height: 30px;
                                    line-height: 40px;
                                }
                            }
                        }
                        #attachFiles{
                            width: 100%;
                            font-size: 14px;
                            height: 40px;
                            border-top: 1px solid #dedede;
                            
                            .attdpeople-head-title {
                                background-color: #f9f9f9;
                                padding: 5px;
                                height: 39px;
                                line-height: 30px;
                                padding-left: 12px;
                                border-bottom: 1px solid #dedede;
                            }
                        }
                }
            }
            .calendarLeft{
                flex: 1;
                height: 100%;
                background: #fff;
                margin-right: -1px;
            }
            .calendarRight{
                width: 300px;
                height: 100%;
                background: #fff;
                .attdpeople{
                    width: 100%;
                    border: 1px solid #dedede;
                    //border-left: 0;
                    margin-top: 56px;
                    height: calc(~'100% - 61px');
                    .attdpeople-head{
                        width: 100%;
                        font-size: 14px;
                        height: 45px;
                        border-bottom: 1px solid #dedede;
                        .attdpeople-head-title {
                            background-color: #f9f9f9;
                            padding: 5px;
                            height: 44px;
                            line-height: 37px;
                            padding-left: 12px;
                            position: relative;
                        }
                        .attdpeople-head-title input {
                            float: right;
                            height: 30px;
                            line-height: 30px;
                            //text-indent: 10px;
                            margin-right: 7px;
                            margin-top: 3px;
                            border-radius: 4px;
                        }
                        .attdpeople-head-seach-input{
                            width:200px;
                            border-radius: 4px !important;
                        }
                        .attdpeople-head-seach-icon{
                            color: #aaa;
                            font-size: 18px;
                            position: absolute;
                            right: 20px;
                            top: 14px;
                        }
                    }
                    .attdpeople-section {
                            overflow: auto;
                            height:calc(~'100% - 46px') !important;
                            padding-top: 15px !important;
                            padding-left: 20px !important;
                            padding-right: 20px !important;
                            ul{
                                display: block;
                                margin-top: 5px;
                                .attdpeople-item {
                                    line-height: 28px;
                                    cursor: pointer;
                                    margin-left: 0;
                                    padding-left: 20px;
                                }
                                .attdpeople-item:hover,.attdpeople-item.active {
                                    background-color: #f9f9f9;
                                    color: #108def;
                                }
                                .attdpeople-item span {
                                    display: inline-block;
                                    width: 32%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    height: 30px;
                                    line-height: 40px;
                                }
                            }
                        }
                        #attachFiles{
                            width: 100%;
                            font-size: 14px;
                            height: 40px;
                            border-top: 1px solid #dedede;
                            
                            .attdpeople-head-title {
                                background-color: #f9f9f9;
                                padding: 5px;
                                height: 39px;
                                line-height: 30px;
                                padding-left: 12px;
                                border-bottom: 1px solid #dedede;
                            }
                        }
                }
            }
            .calendarCenter{
                :deep .calendarHeader{
                    position: relative;
                    left: -200px;
                    width: calc(~'100% + 200px');
                }
            }
            :deep .fc-theme-standard th{
                    background: #f9f9f9 !important;
            }
        }
    }
    .loadingWrap{
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: #fff;
        position: fixed;
        top: 0;
        z-index: 1000;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.45);
        .loadinglabel{
            font-size: 22px;
            margin-left: 25px;
        }
    }
</style>