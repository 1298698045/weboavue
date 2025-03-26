<template>
  <div class="headerFlex">
    <div class="leftLogo">
      <Logo></Logo>
    </div>
    <div class="header" style="flex: 1;">
      <div class="header-top-menu" @click.stop="handleShowApp">
        <i class="iconfont icon-yingyongzhongxin" style="margin-left: 10px;font-size: 18px;"></i>
        <span class="text">{{moduleName}}</span>
      </div>
      <div class="header-search">
        <div class="search-type">
          <span class="search-type-name">全搜</span>
          <span class="search-type-icon">
            <!-- <DownOutlined style="font-size: 10px" /> -->
            <i class="iconfont icon-xiala" style="font-size: 10px"></i>
          </span>
        </div>
        <div class="search-split"></div>
        <div class="search-content">
          <input
            class="inp"
            v-model="data.searchVal"
            @keydown.enter="search()"
            placeholder="请输入关键词搜索"
            type="text"
          />
        </div>
        <div class="search-searchIcon" @click="clearInput()">
          <!-- <SearchOutlined style="font-size: 12px" /> -->
          <i class="iconfont icon-guanbi" style="font-size: 10px"></i>
        </div>
        <div class="search-searchIcon">
          <!-- <SearchOutlined style="font-size: 12px" /> -->
          <i class="iconfont icon-sousuo" style="font-size: 12px"></i>
        </div>
      </div>
      <div class="header-end">
        <div class="header-toobar-plugin signPlugin" title="考勤打卡">
          <a-popover overlayClassName="signPlugin" trigger="click">
            <template #title>
              <div class="popup-header">
                <!-- <ScheduleOutlined style="font-size: 16px;color:var(--textColor)" /> -->
                <i class="iconfont icon-kaoqin" style="font-size: 18px;color:var(--textColor);margin-right: 10px;"></i>
                <span>2023-12-12</span>
                <span>星期二</span>
              </div>
            </template>
            <template #content>
              <div class="content">
                <div class="wea-new-scroll">
                  <a-timeline>
                    <a-timeline-item>
                      <template #dot>
                        <div>
                          <!-- <WeiboCircleOutlined style="font-size: 25px" /> -->
                          <i class="iconfont icon-shangban" style="font-size: 25px;"></i>
                        </div>
                      </template>
                      <p>上班时间 09:00</p>
                      <p>打卡时间 今天 11:31:19</p>
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <div>
                          <!-- <WeiboCircleOutlined style="font-size: 25px" /> -->
                          <i class="iconfont icon-xiaban" style="font-size: 25px;"></i>
                        </div>
                      </template>
                      <p>下班时间 18:00</p>
                      <p>打卡时间 今天 11:31:22</p>
                      <a href="#">更新打卡时间</a>
                    </a-timeline-item>
                  </a-timeline>
                </div>
                <div class="flow">
                  如有打卡异常，请 
                  <a class="flow-link">提交考勤流程 &gt;&gt;</a>
                </div>
                <div class="popup-footer">
                  <div class="checking" title="考勤统计">
                    <!-- <BarChartOutlined /> -->
                    <i class="iconfont icon-tongji" style="color: #b3b3b3;"></i>
                    <span class="checkTitle text-elli">考勤统计</span>
                  </div>
                  <a-tooltip>
                    <template #title>当前所在考勤组：默认考勤组</template>
                    <!-- <InfoCircleOutlined style="font-size: 16px" /> -->
                    <i class="iconfont icon-tishi" style="color: #b3b3b3;"></i>
                  </a-tooltip>
                </div>
              </div>
            </template>
            <!-- <ScheduleOutlined style="font-size: 16px" /> -->
            <i class="iconfont icon-kaoqin" style="font-size: 16px"></i>
            <span>考勤</span>
          </a-popover>
        </div>
        <div class="header-toobar-plugin" @click="handleOpenEmail" title="邮箱">
          <!-- <MessageFilled style="font-size: 18px;" /> -->
          <i class="iconfont icon-youjian" style="font-size: 18px;"></i>
        </div>
        <div class="header-toobar-plugin MessageOut" @click="handleOpenMessage" title="消息" style="margin-left: 8px;">
          <MessageFilled style="font-size: 16px;" />
          <!-- <i class="iconfont icon-消息" style="font-size: 18px;"></i> -->
        </div>
        <div class="header-toobar-plugin" @click="hanldeOpenNotice" title="通知">
          <!-- <MessageFilled style="font-size: 18px;" /> -->
          <i class="iconfont icon-xiaoxizhongxin" style="font-size: 18px;"></i>
        </div>
        <div class="header-info">
          <div class="avatar" @click.stop="handleOpenInfo">
            <img
              class="img"
              :src="avatarUrl?'/api'+ avatarUrl:'/src/assets/img/user/MyResume/showEmpAvatar.png'"
              alt=""
            />
          </div>
          <div class="info-name" @click.stop="handleOpenInfo">{{ currentAccountName }}</div>
          <div class="info-icon" @click.stop="handleOpenInfo">
            <!-- <DownOutlined style="font-size: 10px" /> -->
            <i class="iconfont icon-xiala"  style="font-size: 12px;font-weight: 400;"></i>
          </div>
          <div class="header-info-popup" @click.stop v-if="isInfoPopup">
            <div class="row-text">
              主次账号切换
            </div>
            <div class="header-account-splitter"></div>
            <!-- <div class="row-text" @click="handlePersonal">
              个人中心
            </div>
            <div class="header-account-splitter"></div> -->
            <div class="header-account-list">
              <div v-for="item in accountList" :key="item">
                <div class="header-account-item" @click="ChangeAccount(item)">
                  <div class="header-account-item-avatar">
                    <img
                    class="img"
                    :src="item.avatarUrl?'/api'+item.avatarUrl:'/src/assets/img/user/MyResume/showEmpAvatar.png'"
                    alt=""
                  />
                  </div>
                  <div class="header-account-item-info">
                    <span v-if="BusinessUnitId==item.BusinessUnitId" class="header-account-item-current-text">主</span>
                    <span class="header-account-item-username" @click.stop="handleInfo">
                      <span :title="item.FullName">{{ item.FullName }}</span><span v-if="item.UserName" :title="item.UserName">{{ item.UserName?'/'+item.UserName:'' }}</span>
                    </span>
                    <span class="header-account-item-jobs" :title="item.jobTitle">{{item.jobTitle}}</span><span class="header-account-item-current-icon" v-if="BusinessUnitId==item.BusinessUnitId"><CheckCircleFilled /></span>
                    <br/>
                    <div class="header-account-item-deptName rowEllipsis"><span v-if="item.organizationIdName" :title="item.organizationIdName">{{item.organizationIdName?item.organizationIdName+'/':''}}</span><span :title="item.businessUnitIdName">{{item.businessUnitIdName}}</span></div>
                  </div>
                </div>
                <div class="header-account-splitter"></div>
              </div>
            </div>
            <div class="header-account-seeting">
              <div class="header-account-seeting-item"  @click="handlePersonal">
                <i class="iconfont icon-gerenzhongxin" style="font-size: 18px;"></i>
                <span class="header-account-seeting-title">应用中心</span>
              </div>
              <div class="header-account-seeting-item"  @click="EditPassWord">
                <i class="iconfont icon-xiugaimima" style="font-size: 18px;"></i>
                <span class="header-account-seeting-title">密码修改</span>
              </div>
              <div class="header-account-seeting-item">
                <!-- <ScheduleOutlined class="icon" /> -->
                <i class="iconfont icon-zhutizhongxin" style="font-size: 18px;"></i>
                <span class="header-account-seeting-title">主题中心</span>
              </div>
              <div class="header-account-seeting-item" @click="handleloginOut">
                <!-- <ScheduleOutlined class="icon" /> -->
                <i class="iconfont icon-tuichu" style="font-size: 18px;"></i>
                <span class="header-account-seeting-title">退出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app_popup" v-if="isShow" @click.stop>
        <div class="appList">
          <div class="app_item" v-for="(item,index) in listApp" :style="{background:item.BgColor}" :key="index" @click="handleGoModule(item)">
            <div class="appBox">
              <div class="iconBox">
                <img :src="item.LogoUrl" alt="">
              </div>
              <div class="app-item-label">{{item.Label}}</div>
            </div>
          </div>
        </div>
      </div>
      <NoticeMessages v-if="isNotice" :isShow="isNotice" @cancel="isNotice=false" />
    </div>
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle" @cancel="isConfirm=false" @ok="loginOut" :id="''" />
  </div>
</template>
<script setup>
import "@/style/header.less";
import { ref, onMounted, toRefs, reactive, createApp, watch, getCurrentInstance, defineProps, defineEmits } from "vue";
import { DownOutlined, SearchOutlined, MessageFilled, ScheduleOutlined, WeiboCircleOutlined, BarChartOutlined, InfoCircleOutlined,CheckCircleFilled } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import NoticeMessages from "@/components/NoticeMessages.vue";
import Logo from "../header/components/logo.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
//const searchVal = ref("");
const isShow = ref(false);
const handleShowApp = () => {
  isShow.value = !isShow.value;
};
//watch(searchVal, (newVal, oldVal) => {
  // console.log(newVal, oldVal);
//});
const props = defineProps({
  listApp: Array
});
const emit = defineEmits(['changeCode']);
const moduleName = ref(store.state.moduleName);

// watch(() => route.path,newRoute=> {
//   let matched = router.currentRoute.value.matched;
//   if(matched.length){
//     moduleName.value = matched[0].meta.name;
//   }
//   // moduleName.value = store.state.moduleName;
// },{immediate:true,deep:true});


watch(() => store.state.moduleName, (newVal, oldVal) => {
  moduleName.value = newVal;
}, {immediate: true});

const data = reactive({
  appList: [],
  isInfoPopup: false,
  isNotice: false,
  appCode: "02u90000110",
  currentAppName: "",
  searchVal:route.query.searchVal,
  accountList:[
    // {FullName:'张三（演示账号）',JobTitle:'院长',DeptName:'院领导'},
    // {FullName:'李四（演示账号）',JobTitle:'科主任',DeptName:'信息科'}
  ],
  currentAccountName:'',
  BusinessUnitId:'',
  userId:'',
  avatarUrl:'',
  isConfirm:false,
  confirmText:'',
  confirmTitle:'',
})
const { isConfirm,confirmText,confirmTitle,userId,appList, isInfoPopup, isNotice, appCode, currentAppName,searchVal,accountList,currentAccountName,BusinessUnitId,avatarUrl } = toRefs(data);
const ChangeAccount= (item) => {
  data.isInfoPopup = false;
  data.currentAccountName=item.FullName;
  data.BusinessUnitId=item.BusinessUnitId;
  data.userId=item.UserId;
  data.avatarUrl=item.avatarUrl||'';
  switchUser(item);
}
// proxy.$get(Interface.applist,{
//   systemCode: 'OA'
// }).then((res)=>{
//   console.log("res",res) 
//   data.appList = res.actions[0].returnValue.apps;
//   let row = data.appList.find(item=>route.path.indexOf(item.StartUrl)!=-1);
//   if(row){
//     data.appCode = row.AppCode;
//     data.currentAppName =  row.Label;
//     getCurrentApp();
//   }
// })
const getCurrentApp = () => {
  let obj = {
    actions:[{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        appCode: data.appCode
      }
    }]
  };
  let d = {
    message: JSON.stringify(obj)
  }
  proxy.$post(Interface.currentApp, d).then(res=>{
    // console.log("res", res);
    data.appTabs = res.actions[0].returnValue.tabs;
  })
};
const hanldeOpenNotice = () => {
  data.isNotice = true;
}
const handleOpenEmail= () => {
    let url = router.resolve({
        path:'/email',
        name: "Email",
        query: {
            
        },
    });
    window.open(url.href);
    //window.location.href=url.href;
}
const handleOpenMessage= () => {
    let url = router.resolve({
        path:'/MessageHome',
        name: "MessageHome",
        query: {
            
        },
    });
    window.open(url.href);
}
//个人信息
const handleInfo = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/PersonalInfo",
    query: {
      id: data.userId,
    }
  })
}
//应用中心
const handlePersonal = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/personal/home",
    query: {
      name: "123"
    }
  })
}
//修改密码
const EditPassWord=()=>{
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/ChangePassWord",
    query: {
    }
  })
}
const handleloginOut=()=>{
  data.isConfirm=true;
  data.confirmText='确定要退出登录吗？';
  data.confirmTitle='退出登录';
}
const loginOut= () => {
  data.isConfirm=false;
  localStorage.clear();
  router.push('/');
}
const getBusinessUnits = () => {
  let userInfo=window.localStorage.getItem('userInfo');
  if(userInfo){
    userInfo=JSON.parse(userInfo);
    data.currentAccountName=userInfo.fullName;
    data.BusinessUnitId=userInfo.businessUnitId;
    data.accountList=[
      {
        BusinessUnitId: userInfo.businessUnitId,
        EmployeeId: userInfo.EmployeeId||'',
        FullName: userInfo.fullName,
        OrganizationId: userInfo.organizationId,
        UserId: userInfo.userId,
        UserName: userInfo.userName,
        avatarUrl: '/one/user/avatar/'+userInfo.userId,
        businessUnitIdName: userInfo.businessUnitIdName||'暂无',
        jobTitle: userInfo.JobTitle,
        organizationIdName: userInfo.organizationIdName||'暂无',
      }
    ]
    data.userId=userInfo.userId;
  }
  proxy.$post(Interface.user.getBusinessUnits, {}).then(res=>{
    //console.log("res", res);
    if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.length){
      data.accountList=res.actions[0].returnValue;
      for(var i=0;i<data.accountList.length;i++){
        if(data.BusinessUnitId==data.accountList[i].BusinessUnitId){
          data.currentAccountName=data.accountList[i].FullName;
          data.userId=data.accountList[i].UserId;
          data.avatarUrl=data.accountList[i].avatarUrl;
          window.localStorage.setItem('businessUnitName', data.accountList[i].businessUnitIdName);
        }
      }
    }
  })
};
const switchUser= (item) => {
  let d={
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          businessUnitId: item.BusinessUnitId,
          organizationId: item.OrganizationId,
          jobTitle: item.jobTitle
        }
      }
    ]
  }
  let obj = {
      message: JSON.stringify(d)
  }
  proxy.$post(Interface.user.switchBusinessUnit,obj).then(res=>{
    //console.log("res", res);
    if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
        message.success("切换成功！");
        localStorage.clear();
        let data=res.actions[0].returnValue;
        let token = data.token;
        let userInfo=data.user?JSON.stringify(data.user):'';
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('userInfo', userInfo);
        store.dispatch('getModules');
        setTimeout(function(){
          window.location.reload();
        },1000)
    }
    else{
        if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
            message.success(res.actions[0].errorMessage);
        }
        else{
            message.success("切换失败！");
        }
    }
    
  })
};
onMounted(() => {
  getBusinessUnits();
  window.addEventListener("click", function (e) {
    isShow.value = false;
    data.isInfoPopup  = false;
  });
});
const handleGoModule = (item) => {
  // console.log("item", item);
  store.commit('setModuleName',item.Label);
  localStorage.setItem("moduleName", item.Label);
  emit("changeCode", item);
  // router.push({
  //     path:"/"+item.Name
  // });
  isShow.value = false;
}
const handleOpenInfo = () => {
  data.isInfoPopup = !data.isInfoPopup;
}
const search = () => {
  //window.open('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + data.searchVal);
  router.push({
    path: "/Search/SearchResult",
    query: {
      searchVal: data.searchVal
    }
  })
}  
const clearInput= () => {
  data.searchVal = '';
  let url = router.resolve({
      path:'/Search/SearchResult',
      name: "SearchResult",
      query: {
        searchVal: data.searchVal
      },
  });
  window.location.href=url.href;
}  
</script>
<style lang="less">
/* @import "./header.less"; */
.ant-menu-submenu{
  .ant-menu-submenu-title{
    background: var(--textColor);
    box-shadow: none;
    margin: 0;
    width: 100%;
    border-radius: 0;
    &:hover{
      background: #2866C3 !important;
    }
  }
}
</style>
<style>
  @import "~@/style/icon/header/iconfont.css";
  /* @import "~@/style/icon/moduleApp/iconfont.css"; */

.ant-popover.signPlugin .ant-popover-inner{
  padding: 0 !important;
}
.headerFlex{
  width: 100%;
  display: flex;
}
.headerFlex .icon-sousuo{
  position: relative;
  top: 0px;
  right: 0px;
}
.leftLogo{
  width: 197px;
}
.header .header-search .search-searchIcon{
  margin-left: 0;
}
.header-account-item-current-icon{
  color:#1055BC;
  font-size: 18px;
  position: absolute;
  top: 18px;
  right: 17px;
}
.header-account-item-current-text{
    margin-right: 6px;
    color: #fff;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: rgb(232, 169, 5);
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 11px;
}
.header .header-end .header-info-popup .header-account-splitter{
  margin: 0;
}
.header .header-end .header-info-popup .header-account-item .header-account-item-avatar{
  height: 54px;
}
.header .header-end .header-info-popup .header-account-item{
  height: 60px;
  padding-top: 4px;
}
.header .header-end .header-info-popup{
  right: 10px;
}
.header .header-end .header-info-popup .header-account-item .header-account-item-info{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .header-end .header-info-popup .header-account-item .header-account-item-info .header-account-item-jobs{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header .header-end .header-info-popup .header-account-item .header-account-item-info .header-account-item-username{
    position: relative;
    top: 1px;
}
.header .header-end .header-info-popup .header-account-item .header-account-item-info .header-account-item-jobs{
    position: relative;
    top: 1px;
}
</style>