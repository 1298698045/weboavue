<template>
  <div class="header">
    <div class="header-top-menu" @click.stop="handleShowApp">
      <!-- <svg
        t="1695101729390"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="840"
        width="16"
        height="16"
      >
        <path
          d="M0 0l254.336 0 0 254.272L0 254.272 0 0 0 0zM377.216 0l266.176 0 0 254.272L377.216 254.272 377.216 0 377.216 0zM766.336 0 1024 0l0 254.272-257.664 0L766.336 0 766.336 0zM766.336 378.88 1024 378.88l0 264.448-257.664 0L766.336 378.88 766.336 378.88zM377.216 378.88l266.176 0 0 264.448L377.216 643.328 377.216 378.88 377.216 378.88zM0 378.88l254.336 0 0 264.448L0 643.328 0 378.88 0 378.88zM0 766.272l254.336 0L254.336 1024 0 1024 0 766.272 0 766.272zM377.216 766.272l266.176 0L643.392 1024 377.216 1024 377.216 766.272 377.216 766.272zM766.336 766.272 1024 766.272 1024 1024l-257.664 0L766.336 766.272 766.336 766.272zM766.336 766.272"
          fill="#1055BC"
          p-id="841"
          data-spm-anchor-id="a313x.manage_type_myprojects.0.i3.75903a81GMlAwv"
          class=""
        ></path>
      </svg> -->
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
          v-model="searchVal"
          placeholder="请输入关键词搜索"
          type="text"
        />
      </div>
      <div class="search-searchIcon">
        <!-- <SearchOutlined style="font-size: 12px" /> -->
        <i class="iconfont icon-sousuo"></i>
      </div>
    </div>
    <div class="header-end">
      <div class="header-toobar-plugin signPlugin">
        <a-popover overlayClassName="signPlugin" trigger="click">
          <template #title>
            <div class="popup-header">
              <ScheduleOutlined style="font-size: 16px;color:var(--textColor)" />
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
                        <WeiboCircleOutlined style="font-size: 25px" />
                      </div>
                    </template>
                    <p>上班时间 09:00</p>
                    <p>打卡时间 今天 11:31:19</p>
                  </a-timeline-item>
                  <a-timeline-item>
                    <template #dot>
                      <div>
                        <WeiboCircleOutlined style="font-size: 25px" />
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
                  <BarChartOutlined />
                  <span class="checkTitle text-elli">考勤统计</span>
                </div>
                <a-tooltip>
                  <template #title>当前所在考勤组：默认考勤组</template>
                  <InfoCircleOutlined style="font-size: 16px" />
                </a-tooltip>
              </div>
            </div>
          </template>
          <!-- <ScheduleOutlined style="font-size: 16px" /> -->
          <i class="iconfont icon-kaoqin"></i>
          <span>考勤</span>
        </a-popover>
      </div>
      <div class="header-toobar-plugin" @click="hanldeOpenNotice">
        <!-- <BellOutlined style="font-size: 18px;" /> -->
        <i class="iconfont icon-xiaoxizhongxin"></i>
      </div>
      <div class="header-info">
        <div class="avatar" @click.stop="handleOpenInfo">
          <img
            class="img"
            :src="require('@/assets/img/fabe85b769064b61ad77a39d531a6e71.jpg')"
            alt=""
          />
        </div>
        <div class="info-name" @click.stop="handleOpenInfo">张三（演示账号）</div>
        <div class="info-icon" @click.stop="handleOpenInfo">
          <!-- <DownOutlined style="font-size: 10px" /> -->
          <i class="iconfont icon-xiala"  style="font-size: 10px;font-weight: bold;"></i>
        </div>
        <div class="header-info-popup" @click.stop v-if="isInfoPopup">
          <div class="row-text">
            主次账号切换
          </div>
          <div class="header-account-splitter"></div>
          <div class="row-text" @click="handlePersonal">
            个人中心
          </div>
          <div class="header-account-splitter"></div>
          <div class="header-account-list">
            <div v-for="item in 2">
              <div class="header-account-item">
                <div class="header-account-item-avatar">
                  <img
                  class="img"
                  :src="require('@/assets/img/fabe85b769064b61ad77a39d531a6e71.jpg')"
                  alt=""
                />
                </div>
                <div class="header-account-item-info">
                  <span class="header-account-item-username">
                    张三（演示账号）
                  </span>
                  <span class="header-account-item-jobs">董事长</span>
                  <br/>
                  <div class="header-account-item-deptName rowEllipsis">维森集团股份有限公司/董事长办公室</div>
                </div>
              </div>
              <div class="header-account-splitter"></div>
            </div>
          </div>
          <div class="header-account-seeting">
            <div class="header-account-seeting-item">
              <!-- <ScheduleOutlined class="icon" /> -->
              <i class="iconfont icon-zhutizhongxin"></i>
              <span class="header-account-seeting-title">主题中心</span>
            </div>
            <div class="header-account-seeting-item">
              <!-- <ScheduleOutlined class="icon" /> -->
              <i class="iconfont icon-tuichu"></i>
              <span class="header-account-seeting-title">退出</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app_popup" v-if="isShow" @click.stop>
      <div class="appList">
        <div class="app_item" v-for="(item,index) in appList" :style="{background:item.BgColor}" :key="index" @click="handleGoModule(item)">
          <div class="appBox">
            <div class="iconBox">
            </div>
            <div class="app-item-label">{{item.Label}}</div>
          </div>
        </div>
      </div>
    </div>
    <NoticeMessages v-if="isNotice" :isShow="isNotice" @cancel="isNotice=false" />
  </div>
</template>
<script setup>
  import "@/style/header.less";
import { ref, onMounted, toRefs, reactive, createApp, watch, getCurrentInstance } from "vue";
import { DownOutlined, SearchOutlined, BellOutlined, ScheduleOutlined, WeiboCircleOutlined, BarChartOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import NoticeMessages from "@/components/NoticeMessages.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const searchVal = ref("");
const isShow = ref(false);
const handleShowApp = () => {
  isShow.value = !isShow.value;
};
watch(searchVal, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
const moduleName = ref(store.state.moduleName);
watch(() => route.path,newRoute=> {
  moduleName.value = store.state.moduleName;
},{immediate:true,deep:true})
const data = reactive({
  appList: [],
  isInfoPopup: false,
  isNotice: false,
})
const { appList, isInfoPopup, isNotice } = toRefs(data);
proxy.$get(Interface.applist,{}).then((res)=>{
  console.log("res",res) 
  data.appList = res.rows;
})
const hanldeOpenNotice = () => {
  data.isNotice = true;
}
const handlePersonal = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/personal/home",
    query: {
      name: "123"
    }
  })
}
onMounted(() => {
  window.addEventListener("click", function (e) {
    isShow.value = false;
    data.isInfoPopup  = false;
  });
});
const handleGoModule = (item) => {
  // console.log("item", item);
  store.commit('setModuleName',item.Label)
  router.push({
      path:"/"+item.DeveloperName
  });
  isShow.value = false;
}
const handleOpenInfo = () => {
  data.isInfoPopup = !data.isInfoPopup;
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
.ant-popover.signPlugin .ant-popover-inner{
  padding: 0 !important;
}
</style>