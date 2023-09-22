<template>
  <div class="header">
    <div class="header-top-menu" @click.stop="handleShowApp">
      <svg
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
      </svg>
      <span class="text">流程管理</span>
    </div>
    <div class="header-search">
      <div class="search-type">
        <span class="search-type-name">微搜</span>
        <span class="search-type-icon">
          <DownOutlined style="font-size: 10px" />
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
        <SearchOutlined style="font-size: 12px" />
      </div>
    </div>
    <div class="header-end">
      <div class="header-info">
        <div class="avatar">
          <img
            class="img"
            src="https://enterprise.e-cology.com.cn/messager/usericon/fabe85b769064b61ad77a39d531a6e71.jpg"
            alt=""
          />
        </div>
        <div class="info-name">杨文元（演示账号）</div>
        <div class="info-icon">
          <DownOutlined style="font-size: 10px" />
        </div>
      </div>
    </div>
    <div class="app_popup" v-if="isShow" @click.stop>
      <div class="appList">
        <div class="app_item" v-for="(item,index) in appList" :style="{background:item.BgColor}" :key="index">
          <div class="appBox">
            <div class="iconBox">
            </div>
            <div class="app-item-label">{{item.Label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, toRefs, reactive, createApp, watch, getCurrentInstance } from "vue";
import { DownOutlined, SearchOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
const searchVal = ref("");
const isShow = ref(false);
const handleShowApp = () => {
  isShow.value = !isShow.value;
};
watch(searchVal, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
const data = reactive({
  appList: []
})
const { appList } = toRefs(data);
proxy.$get(Interface.applist,{}).then((res)=>{
  console.log("res",res)
  data.appList = res.rows;
})
onMounted(() => {
  window.addEventListener("click", function (e) {
    isShow.value = false;
  });
});
</script>
<style>
@import "./header.less";
</style>
