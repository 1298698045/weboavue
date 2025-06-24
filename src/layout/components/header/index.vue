<template>
  <div class="headerFlex">
    <div class="leftLogo">
      <Logo></Logo>
    </div>
    <div class="header" style="flex: 1">
      <div class="header-top-menu" @click.stop="handleShowApp">
        <i
          class="iconfont icon-yingyongzhongxin"
          style="margin-left: 10px; font-size: 18px"
        ></i>
        <span class="text">{{ moduleName }}</span>
      </div>
      <!-- <div class="header-search">
        <div class="search-type">
          <span class="search-type-name">全搜</span>
          <span class="search-type-icon">
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
          <i class="iconfont icon-guanbi" style="font-size: 10px"></i>
        </div>
        <div class="search-searchIcon">
          <i class="iconfont icon-sousuo" style="font-size: 12px"></i>
        </div>
      </div> -->
      <div class="header-end">
        <!-- <div class="header-toobar-plugin signPlugin">
          <a-popover overlayClassName="signPlugin" trigger="click">
            <template #title>
              <div class="action-hover-point"></div>
              <div class="popup-header">
                <i
                  class="iconfont icon-kaoqin"
                  style="
                    font-size: 18px;
                    color: var(--textColor);
                    margin-right: 10px;
                  "
                ></i>
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
                          <i
                            class="iconfont icon-shangban"
                            style="font-size: 25px"
                          ></i>
                        </div>
                      </template>
                      <p>上班时间 09:00</p>
                      <p>打卡时间 今天 11:31:19</p>
                    </a-timeline-item>
                    <a-timeline-item>
                      <template #dot>
                        <div>
                          <i
                            class="iconfont icon-xiaban"
                            style="font-size: 25px"
                          ></i>
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
                    <i class="iconfont icon-tongji" style="color: #b3b3b3"></i>
                    <span class="checkTitle text-elli">考勤统计</span>
                  </div>
                  <a-tooltip :overlayClassName="'header-tooltip'">
                    <template #title>当前所在考勤组：默认考勤组</template>
                    <i class="iconfont icon-tishi" style="color: #b3b3b3"></i>
                  </a-tooltip>
                </div>
              </div>
            </template>
            <a-tooltip :overlayClassName="'header-tooltip'">
              <template #title>考勤打卡</template>
              <i class="iconfont icon-kaoqin" style="font-size: 16px"></i>
              <span>考勤</span>
            </a-tooltip>
          </a-popover>
        </div> -->
        <div class="header-toobar-plugin" @click="handleOpenEmail">
          <a-tooltip :overlayClassName="'header-tooltip'">
            <template #title>邮箱</template>
            <i class="iconfont icon-youjian" style="font-size: 18px"></i>
          </a-tooltip>
        </div>
        <!-- <div
          class="header-toobar-plugin MessageOut"
          @click="handleOpenMessage"
          style="margin-left: 8px"
        >
          <a-tooltip :overlayClassName="'header-tooltip'">
            <template #title>消息</template>
            <MessageFilled style="font-size: 16px" />
          </a-tooltip>
        </div> -->
        <!-- <div
          class="header-toobar-plugin header-toobar-plugin-favor"
          style="margin-left: 8px;"
        >
          <a-tooltip class="favorLeft" :overlayClassName="'header-tooltip'">
            <template #title>收藏</template>
            <StarFilled />
          </a-tooltip>
          <a-tooltip class="favorRight" :overlayClassName="'header-tooltip'">
            <template #title>收藏夹列表</template>
            <a-dropdown :overlayClassName="'FavorList'" :trigger="['click']">
              <CaretDownFilled />
              <template #overlay>
                <a-menu>
                  <div class="action-hover-point"></div>
                  <span class="actionLabel">我的收藏夹</span>
                  <a-menu-item v-for="(item, index) in FavorList" :key="index">
                    <div class="menu-row" @click="selectFavor(item)">
                      <span
                        v-if="index == 0"
                        style="background-color: #06a59a"
                        class="actionIcon"
                        
                        ><span
                          
                          class="uiImage"
                          data-aura-class="uiImage"
                          ><img
                            
                            src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/standard/lead_120.png"
                            alt="" /></span
                      ></span>
                      <span
                        v-if="index == 1"
                        style="background-color: #ff5d2d"
                        class="actionIcon"
                        
                        ><span
                          
                          class="uiImage"
                          data-aura-class="uiImage"
                          ><img
                            
                            src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/standard/opportunity_120.png"
                            alt="" /></span
                      ></span>
                      <span
                        v-if="index == 2"
                        style="background-color: #06a59a"
                        class="actionIcon"
                        
                        ><span
                          
                          class="uiImage"
                          data-aura-class="uiImage"
                          ><img
                            src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/standard/report_120.png"
                            alt="" /></span
                      ></span>
                      <span
                        v-if="index == 3"
                        style="background-color: #06a59a"
                        class="actionIcon"
                        
                        ><span
                          
                          class="uiImage"
                          data-aura-class="uiImage"
                          ><img
                            
                            src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/standard/report_120.png"
                            alt="" /></span
                      ></span>
                      <span
                        v-if="index == 4"
                        style="background-color: #f77e75"
                        class="actionIcon"
                        
                        ><span
                          
                          class="uiImage"
                          data-aura-class="uiImage"
                          ><img
                            
                            src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/custom/custom15_120.png"
                            alt="" /></span
                      ></span>
                      <span class="menuText">
                        <p class="favorname">{{ item.name }}</p>
                        <p class="favordesc">{{ item.desc }}</p>
                      </span>
                    </div>
                  </a-menu-item>
                  <div class="favoraction" @click="handleEditFavor">
                    <EditFilled />编辑收藏夹
                  </div>
                </a-menu>
              </template>
            </a-dropdown>
          </a-tooltip>
        </div> -->
        <div
          class="header-toobar-plugin header-toobar-plugin-action"
          style="margin-left: 8px"
        >
          <a-dropdown :overlayClassName="'OverallAction'" :trigger="['click']" placement="bottom">
            <a-tooltip :overlayClassName="'header-tooltip'">
              <template #title>全局操作</template>
              <PlusSquareFilled class="OverallActionIcon" />
            </a-tooltip>
            <template #overlay>
              <a-menu>
                <div class="action-hover-point"></div>
                <span class="actionLabel">全局操作</span>
                <a-menu-item v-for="(item, index) in ActionList" :key="index">
                  <div class="menu-row" @click="selectAction(item)">
                    <span
                      v-if="index == 0"
                      style="background-color: #0079de"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          style="width: 14px;height: 14px;"
                          
                          src="/src/assets/img/rightMenu/morenliucheng.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 1"
                      style="background-color: #06a59a"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/log_a_call_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 2"
                      style="background-color: #cb65ff"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/new_event_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 3"
                      style="background-color: #3ba755"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/new_task_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 4"
                      style="background-color: #9602c7"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/new_contact_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 5"
                      style="background-color: #ff5d2d"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/new_opportunity_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 6"
                      style="background-color: #ff538a"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/new_case_120.png"
                          alt="" /></span
                    ></span>
                    <span
                      v-if="index == 7"
                      style="background-color: #939393"
                      class="actionIcon"
                      
                      ><span
                        
                        class="uiImage"
                        data-aura-class="uiImage"
                        ><img
                          src="https://d90000000yvhgeay-dev-ed.my.salesforce.com/img/icon/t4v35/action/email_120.png"
                          alt="" /></span
                    ></span>
                    <span class="menuText">{{ item.name }}</span>
                  </div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div class="header-toobar-plugin" @click="hanldeOpenNotice">
          <a-tooltip :overlayClassName="'header-tooltip'">
            <template #title>通知</template>
            <i class="iconfont icon-xiaoxizhongxin" style="font-size: 18px"></i>
          </a-tooltip>
        </div>
        <div class="header-info">
          <div class="avatar" @click.stop="handleOpenInfo">
            <img
              class="img"
              :src="
                avatarUrl
                  ? '/api' + avatarUrl
                  : '/src/assets/img/user/MyResume/showEmpAvatar.png'
              "
              alt=""
            />
          </div>
          <div class="info-name" @click.stop="handleOpenInfo">
            <div class="info-name-top">{{ currentAccountName }}</div>
            <div class="info-name-bottom">{{ currentAccountDeptName }}</div>
          </div>
          <div class="info-icon" @click.stop="handleOpenInfo">
            <i
              class="iconfont icon-xiala"
              style="font-size: 12px; font-weight: 400"
            ></i>
          </div>
          <div class="header-info-popup" @click.stop v-if="isInfoPopup">
            <div class="action-hover-point"></div>
            <div class="row-text">身份切换</div>
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
                      :src="
                        item.avatarUrl
                          ? '/api' + item.avatarUrl
                          : '/src/assets/img/user/MyResume/showEmpAvatar.png'
                      "
                      alt=""
                    />
                  </div>
                  <div class="header-account-item-info" >
                    <!-- <span
                      v-if="BusinessUnitId == item.BusinessUnitId"
                      class="header-account-item-current-text"
                      >主</span> -->
                      <div :title="item.FullName+(item.UserName?'/'+item.UserName:'')+(item.jobTitle?'/'+item.jobTitle:'')">
                        <span class="header-account-item-username" @click.stop="handleInfo">
                          <span>{{ item.FullName }}</span>
                          <span v-if="item.UserName">{{item.UserName ? "/" + item.UserName : ""}}</span>
                        </span>
                        <span class="header-account-item-jobs">{{ item.jobTitle }}</span>
                        <span class="header-account-item-current-icon" v-if="BusinessUnitId == item.BusinessUnitId">
                          <CheckCircleFilled />
                        </span>
                      </div>
                      <div class="header-account-item-deptName rowEllipsis" :title="item.businessUnitIdName+(item.organizationIdName?'/'+item.organizationIdName:'')" >
                          <span>{{item.businessUnitIdName}}{{ item.businessUnitIdName&&item.organizationIdName?'/':'' }}{{item.organizationIdName}}</span>
                      </div>
                  </div>
                </div>
                <div class="header-account-splitter"></div>
              </div>
            </div>
            <div class="header-account-seeting">
              <!-- <div class="header-account-seeting-item" @click="handlePersonal">
                <i
                  class="iconfont icon-gerenzhongxin"
                  style="font-size: 18px"
                ></i>
                <span class="header-account-seeting-title">应用中心</span>
              </div> -->
              <div class="header-account-seeting-item" @click="EditPassWord">
                <i class="iconfont icon-xiugaimima" style="font-size: 18px"></i>
                <span class="header-account-seeting-title">密码修改</span>
              </div>
              <!-- <div class="header-account-seeting-item">
                <i class="iconfont icon-zhutizhongxin" style="font-size: 18px;"></i>
                <span class="header-account-seeting-title">主题中心</span>
              </div> -->
              <div class="header-account-seeting-item" @click="handleloginOut">
                <i class="iconfont icon-tuichu" style="font-size: 18px"></i>
                <span class="header-account-seeting-title">退出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app_popup" v-if="isShow" @click.stop>
        <div class="action-hover-point"></div>
        <div class="appSearch">
          <SearchOutlined class="searchIcon" />
          <a-input
            placeholder="查找应用"
            v-model:value="data.searchText"
            @change="onSearch"
          />
        </div>
        <div class="appList">
          <div
            class="app_item"
            :class="{
              active: currentModuleName && currentModuleName == item.Label,
            }"
            v-for="(item, index) in listApp"
            :style="{ background: item.BgColor }"
            :key="index"
            @click="handleGoModule(item)"
          >
            <div class="appBox">
              <div class="iconBox">
                <img :src="item.LogoUrl" alt="" />
              </div>
              <div class="app-item-label">{{ item.Label }}</div>
            </div>
          </div>
          <div
            class="app_item app_more"
            :class="{
              active: currentModuleName && currentModuleName == '更多应用',
            }"
            key="-1"
            @click="handleMoreApp()"
          >
            <div class="appBox">
              <div class="iconBox">
                <img
                  :src="'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMjQuODA3OSAyLjk1Mzg2QzIzLjUzODcgMS42ODQ2NSAyMS40ODA5IDEuNjg0NjUgMjAuMjExNyAyLjk1Mzg2TDE2Ljk5OSA2LjE2NjU3QzE2Ljk1NDcgNC40MTAxOSAxNS41MTcgMi45OTk5NyAxMy43NSAyLjk5OTk3SDYuMjVDNC40NTUwNyAyLjk5OTk3IDMgNC40NTUwNCAzIDYuMjQ5OTdWMjUuNzVDMyAyNy41NDQ5IDQuNDU1MDcgMjkgNi4yNSAyOUwyNS43NSAyOUMyNy41NDQ5IDI5IDI5IDI3LjU0NDkgMjkgMjUuNzVWMTguMjVDMjkgMTYuNDg1OCAyNy41OTQ0IDE1LjA0OTkgMjUuODQyIDE1LjAwMTJMMjkuMDUwNSAxMS43OTI3QzMwLjMxOTcgMTAuNTIzNSAzMC4zMTk3IDguNDY1NyAyOS4wNTA1IDcuMTk2NUwyNC44MDc5IDIuOTUzODZaTTE5LjE3NjMgMTVIMTdWMTIuODIzN0wxOS4xNzYzIDE1Wk0yMS42MjU5IDQuMzY4MDdDMjIuMTE0IDMuODc5OTEgMjIuOTA1NSAzLjg3OTkxIDIzLjM5MzYgNC4zNjgwN0wyNy42MzYzIDguNjEwNzFDMjguMTI0NCA5LjA5ODg3IDI4LjEyNDQgOS44OTAzMiAyNy42MzYzIDEwLjM3ODVMMjMuMzkzNiAxNC42MjExQzIyLjkwNTUgMTUuMTA5MyAyMi4xMTQgMTUuMTA5MyAyMS42MjU5IDE0LjYyMTFMMTcuMzgzMiAxMC4zNzg1QzE2Ljg5NTEgOS44OTAzMiAxNi44OTUxIDkuMDk4ODcgMTcuMzgzMiA4LjYxMDcxTDIxLjYyNTkgNC4zNjgwN1pNMTUgNi4yNDk5N1YxNUg1VjYuMjQ5OTdDNSA1LjU1OTYxIDUuNTU5NjQgNC45OTk5NyA2LjI1IDQuOTk5OTdIMTMuNzVDMTQuNDQwNCA0Ljk5OTk3IDE1IDUuNTU5NjEgMTUgNi4yNDk5N1pNNSAyNS43NVYxN0gxNVYyN0g2LjI1QzUuNTU5NjQgMjcgNSAyNi40NDAzIDUgMjUuNzVaTTE3IDE3SDI1Ljc1QzI2LjQ0MDQgMTcgMjcgMTcuNTU5NiAyNyAxOC4yNVYyNS43NUMyNyAyNi40NDAzIDI2LjQ0MDQgMjcgMjUuNzUgMjdIMTdWMTdaIiBmaWxsPSIjNjE2MTYxIi8+Cjwvc3ZnPgo='"
                  alt=""
                />
              </div>
              <div class="app-item-label">更多应用</div>
            </div>
          </div>
        </div>
      </div>
      <NoticeMessages
        v-if="isNotice"
        :isShow="isNotice"
        @cancel="isNotice = false"
      />
    </div>
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="loginOut"
      :id="''"
    />
    <AddSchedule
      :isShow="isAddSchedule"
      :calendarType="'0'"
      v-if="isAddSchedule"
      @cancel="isAddSchedule = false"
      :objectTypeCode="'4200'"
      :entityApiName="'ActivityPointer'"
      :id="''"
      @selectVal="isAddSchedule = false"
      :paramsTime="paramsTime"
    />
    <!-- <AddTask
      :isShow="isAddTask"
      :id="''"
      v-if="isAddTask"
      :paramsTime="paramsTime"
      @cancel="isAddTask = false"
      :objectTypeCode="'4200'"
      :entityApiName="'ActivityPointer'"
      @selectVal="isAddTask = false"
      :calendarType="''"
      :RegardingObjectTypeCode="''"
      :RegardingObjectId="''"
      :RegardingObjectIdName="''"
      :BgColor="''"
    /> -->
    <common-form-modal
      :isShow="isCommon"
      v-if="isCommon"
      @cancel="isCommon = false"
      :title="modalTitle"
      @success="isCommon = false"
      :id="recordId"
      :objectTypeCode="objectTypeCode"
      :entityApiName="sObjectName"
    ></common-form-modal>
    <NewMeeting
      :isShow="isNewMeeting"
      :meetingId="''"
      v-if="isNewMeeting"
      @cancel="isNewMeeting = false"
      @selectVal="isNewMeeting = false"
      :paramsTime="paramsTime"
      :MeetingType="''"
    />
    <NewVehicle
      :isShow="isNewVehicle"
      :meetingId="''"
      v-if="isNewVehicle"
      @cancel="isNewVehicle = false"
      @selectVal="isNewVehicle = false"
      :paramsTime="paramsTime"
      :VehicleType="''"
    />
    <RecordPhone
      :isShow="isRecord"
      v-if="isRecord"
      @cancel="isRecord = false"
      :id="''"
      :CalendarTypeCode="''"
      @selectVal="isRecord = false"
    />
    <NewTask
      :isShow="isAddTask"
      v-if="isAddTask"
      @cancel="isAddTask = false"
      :id="''"
      :CalendarTypeCode="''"
      @selectVal="isAddTask = false"
    />
  </div>
</template>
<script setup>
import "@/style/header.less";
import {
  ref,
  onMounted,
  toRefs,
  reactive,
  createApp,
  watch,
  getCurrentInstance,
  defineProps,
  defineEmits,
  nextTick,
} from "vue";
import {
  DownOutlined,
  SearchOutlined,
  MessageFilled,
  ScheduleOutlined,
  WeiboCircleOutlined,
  BarChartOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
  PlusSquareFilled,
  StarFilled,
  CaretDownFilled,
  EditFilled,
} from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import NoticeMessages from "@/components/NoticeMessages.vue";
import Logo from "../header/components/logo.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import AddSchedule from "@/components/schedule/AddSchedule.vue";
import AddTask from "@/components/meeting/AddTask.vue";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
import NewVehicle from "@/components/Vehicle/NewVehicle.vue";
import RecordPhone from "@/components/schedule/RecordPhone.vue";
import NewTask from "@/components/schedule/NewTask.vue";
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
  listApp: Array,
});
const emit = defineEmits(["changeCode"]);
const moduleName = ref(store.state.moduleName);

// watch(() => route.path,newRoute=> {
//   let matched = router.currentRoute.value.matched;
//   if(matched.length){
//     moduleName.value = matched[0].meta.name;
//   }
//   // moduleName.value = store.state.moduleName;
// },{immediate:true,deep:true});

watch(
  () => store.state.moduleName,
  (newVal, oldVal) => {
    moduleName.value = newVal;
  },
  { immediate: true }
);

const data = reactive({
  appList: [],
  isInfoPopup: false,
  isNotice: false,
  appCode: "02u90000110",
  currentAppName: "",
  searchVal: route.query.searchVal,
  accountList: [
    // {FullName:'张三（演示账号）',JobTitle:'院长',DeptName:'院领导'},
    // {FullName:'李四（演示账号）',JobTitle:'科主任',DeptName:'信息科'}
  ],
  currentAccountName: "",
  currentAccountDeptName:'',
  currentUserName: "",
  BusinessUnitId: "",
  userId: "",
  avatarUrl: "",
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
  searchText: "",
  listAppAll: [],
  listApp: [],
  ActionList: [
    { name: "新建流程" },
    { name: "记录电话" },
    { name: "新建事件" },
    { name: "新建任务" },
    { name: "新建联系人" },
    //{ name: "新建业务机会" },
    { name: "预约会议室" },
    // { name: "新建个案" },
    { name: "预约车辆" },
    { name: "电子邮件" },
  ],
  FavorList: [
    { name: "任务测试", desc: "潜在客户" },
    { name: "最近查看", desc: "业务机会" },
    { name: "商业机会", desc: "报表" },
    { name: "商业机会矩阵", desc: "报表" },
    { name: "天天", desc: "员工档案" },
  ],
  isAddSchedule: false,
  paramsTime: {
    date: "",
    time: "",
  },
  isAddTask: false,
  isCommon: false,
  recordId: "",
  objectTypeCode: "2",
  sObjectName: "Contact",
  modalTitle: "新建联系人",
  isRecord: false,
  isNewMeeting: false,
  currentModuleName: "",
  isNewVehicle: false,
});
const {
  isNewVehicle,
  currentModuleName,
  isNewMeeting,
  isRecord,
  modalTitle,
  isCommon,
  recordId,
  objectTypeCode,
  sObjectName,
  isAddTask,
  paramsTime,
  isAddSchedule,
  FavorList,
  ActionList,
  listApp,
  listAppAll,
  searchText,
  isConfirm,
  confirmText,
  confirmTitle,
  userId,
  appList,
  isInfoPopup,
  isNotice,
  appCode,
  currentAppName,
  searchVal,
  accountList,
  currentAccountName,
  currentAccountDeptName,
  currentUserName,
  BusinessUnitId,
  avatarUrl,
} = toRefs(data);
const ChangeAccount = (item) => {
  data.isInfoPopup = false;
  data.currentAccountName = item.FullName;
  data.currentUserName = item.UserName;
  data.BusinessUnitId = item.BusinessUnitId;
  data.currentAccountDeptName=item.businessUnitIdName,
  data.userId = item.UserId;
  data.avatarUrl = item.avatarUrl || "";
  switchUser(item);
};
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
    actions: [
      {
        id: "4105;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          appCode: data.appCode,
        },
      },
    ],
  };
  let d = {
    message: JSON.stringify(obj),
  };
  proxy.$post(Interface.currentApp, d).then((res) => {
    // console.log("res", res);
    data.appTabs = res.actions[0].returnValue.tabs;
  });
};
const hanldeOpenNotice = () => {
  data.isNotice = true;
};
const handleOpenEmail = () => {
  let url = router.resolve({
    path: "/email/0",
    name: "Email",
    query: {},
  });
  window.open(url.href);
  //window.location.href=url.href;
};
const handleOpenMessage = () => {
  let url = router.resolve({
    path: "/MessageHome",
    name: "MessageHome",
    query: {},
  });
  window.open(url.href);
};
//个人信息
const handleInfo = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/PersonalInfo",
    query: {
      id: data.userId,
    },
  });
};
//应用中心
const handlePersonal = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/personal/home",
    query: {
      name: "123",
    },
  });
};
//修改密码
const EditPassWord = () => {
  data.isInfoPopup = false;
  router.push({
    path: "/workspace/ChangePassWord",
    query: {},
  });
};
const handleloginOut = () => {
  data.isConfirm = true;
  data.confirmText = "确定要退出登录吗？";
  data.confirmTitle = "退出登录";
};
const loginOut = () => {
  data.isConfirm = false;
  localStorage.clear();
  router.push("/");
};
const getBusinessUnits = () => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.currentAccountName = userInfo.fullName;
    data.currentAccountDeptName=userInfo.businessUnitIdName,
    data.currentUserName = userInfo.userName;
    data.BusinessUnitId = userInfo.businessUnitId;
    data.accountList = [
      {
        BusinessUnitId: userInfo.businessUnitId,
        EmployeeId: userInfo.EmployeeId || "",
        FullName: userInfo.fullName,
        OrganizationId: userInfo.organizationId,
        UserId: userInfo.userId,
        UserName: userInfo.userName,
        avatarUrl: "/one/user/avatar/" + userInfo.userId,
        businessUnitIdName: userInfo.businessUnitIdName || "暂无",
        jobTitle: userInfo.JobTitle,
        organizationIdName: userInfo.organizationIdName || "暂无",
      },
    ];
    data.userId = userInfo.userId;
  }
  proxy.$post(Interface.user.getBusinessUnits, {}).then((res) => {
    //console.log("res", res);
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].returnValue &&
      res.actions[0].returnValue.length
    ) {
      data.accountList = res.actions[0].returnValue;
      for (var i = 0; i < data.accountList.length; i++) {
        if (data.BusinessUnitId == data.accountList[i].BusinessUnitId) {
          data.currentAccountName = data.accountList[i].FullName;
          data.currentAccountDeptName=data.accountList[i].businessUnitIdName;
          data.currentUserName = data.accountList[i].UserName;
          data.userId = data.accountList[i].UserId;
          data.avatarUrl = data.accountList[i].avatarUrl;
          window.localStorage.setItem(
            "businessUnitName",
            data.accountList[i].businessUnitIdName
          );
        }
      }
    }
  });
};
const switchUser = (item) => {
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          businessUnitId: item.BusinessUnitId,
          organizationId: item.OrganizationId,
          jobTitle: item.jobTitle,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.user.switchBusinessUnit, obj).then((res) => {
    //console.log("res", res);
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("切换成功！");
      localStorage.clear();
      let result = res.actions[0].returnValue;
      let token = result.token;
      result.user.fullName=result.user.fullName||data.currentAccountName;
      result.user.userName=result.user.userName||data.currentUserName;
      result.businessUnitIdName=result.user.businessUnitIdName||data.currentAccountDeptName;
      let userInfo = result.user ? JSON.stringify(result.user) : "";
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userInfo", userInfo);
      store.dispatch("getModules");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].errorMessage
      ) {
        message.success(res.actions[0].errorMessage);
      } else {
        message.success("切换失败！");
      }
    }
  });
};
const handleGoModule = (item) => {
  // console.log("item", item);
  store.commit("setModuleName", item.Label);
  localStorage.setItem("moduleName", item.Label);
  data.currentModuleName = item.Label;
  emit("changeCode", item);
  // router.push({
  //     path:"/"+item.Name
  // });
  isShow.value = false;
};
const handleMoreApp = () => {
  data.currentModuleName = "更多应用";
  isShow.value = false;
  handlePersonal();
};
const handleOpenInfo = () => {
  data.isInfoPopup = !data.isInfoPopup;
};
const selectAction = (item) => {
  if (item.name == "新建流程") {
    router.push({
      path: "/workflow/o/instance/add",
      query: {
      },
    });
  } else if (item.name == "记录电话") {
    data.isRecord = true;
  } else if (item.name == "新建事件") {
    data.isAddSchedule = true;
  } else if (item.name == "新建任务") {
    data.isAddTask = true;
  } else if (item.name == "新建联系人") {
    data.isCommon = true;
  } else if (item.name == "预约会议室") {
    data.isNewMeeting = true;
  } else if (item.name == "预约车辆") {
    data.isNewVehicle = true;
  } else if (item.name == "电子邮件") {
    let url = router.resolve({
      path: "/email/0",
      name: "Email",
      query: {
        type: 1,
      },
    });
    window.open(url.href);
  }
};
const selectFavor = (item) => {};
const handleEditFavor = () => {};
const search = () => {
  //window.open('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + data.searchVal);
  router.push({
    path: "/Search/SearchResult",
    query: {
      searchVal: data.searchVal,
    },
  });
};
const clearInput = () => {
  data.searchVal = "";
  let url = router.resolve({
    path: "/Search/SearchResult",
    name: "SearchResult",
    query: {
      searchVal: data.searchVal,
    },
  });
  window.location.href = url.href;
};
const onSearch = (e) => {
  data.listApp = data.listAppAll.filter((item) => {
    return item.Label.indexOf(data.searchText) != -1;
  });
};
onMounted(() => {
  if (props.listApp) {
    data.listApp = props.listApp;
    data.listAppAll = props.listApp;
  }
  getBusinessUnits();
  window.addEventListener("click", function (e) {
    isShow.value = false;
    data.isInfoPopup = false;
  });
  data.currentModuleName = window.localStorage.getItem("moduleName") || "";
  if (route.path == "/workspace/personal/home") {
    data.currentModuleName = "更多应用";
  }
});
</script>
<style lang="less">
/* @import "./header.less"; */
.ant-menu-submenu {
  .ant-menu-submenu-title {
    background: var(--textColor);
    box-shadow: none;
    margin: 0;
    width: 100%;
    border-radius: 0;

    &:hover {
      background: #2866c3 !important;
    }
  }
}
</style>
<style lang="less">
@import "~@/style/icon/header/iconfont.css";
/* @import "~@/style/icon/moduleApp/iconfont.css"; */

.ant-popover.signPlugin .ant-popover-inner {
  padding: 0 !important;
}

.headerFlex {
  width: 100%;
  display: flex;
}

.headerFlex .icon-sousuo {
  position: relative;
  top: 0px;
  right: 0px;
}

.leftLogo {
  width: 197px;
}

.header .header-search .search-searchIcon {
  margin-left: 0;
}

.header-account-item-current-icon {
  color: #1055bc;
  font-size: 18px;
  position: absolute;
  top: 18px;
  right: 17px;
}

.header-account-item-current-text {
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

.header .header-end .header-info-popup .header-account-splitter {
  margin: 0;
}

.header
  .header-end
  .header-info-popup
  .header-account-item
  .header-account-item-avatar {
  height: 54px;
}

.header .header-end .header-info-popup .header-account-item {
  height: 60px;
  padding-top: 4px;
}

.header .header-end .header-info-popup {
  right: 10px;
}

.header
  .header-end
  .header-info-popup
  .header-account-item
  .header-account-item-info {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.header
  .header-end
  .header-info-popup
  .header-account-item
  .header-account-item-info
  .header-account-item-jobs {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.header
  .header-end
  .header-info-popup
  .header-account-item
  .header-account-item-info
  .header-account-item-username {
  position: relative;
  top: 1px;
}

.header
  .header-end
  .header-info-popup
  .header-account-item
  .header-account-item-info
  .header-account-item-jobs {
  position: relative;
  top: 1px;
}

.headerFlex {
  .header {
    .app_popup {
      height: 485px;
      width: 560px;
      box-shadow: rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px,
        rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px;
      left: 8px;
      top: 40px;
      border-radius: 8px;

      .appSearch {
        position: relative;
        padding: 18px 20px 8px 20px;

        .ant-input {
          border-radius: 4px !important;
          background: #f2f2f2;
          border: none;
          height: 33px;
          text-indent: 22px;

          &::placeholder {
            color: #999 !important;
          }
        }

        .searchIcon {
          position: absolute;
          left: 29px;
          top: 26px;
          font-size: 18px;
          z-index: 1;
          color: #999;
        }
      }

      .appList {
        padding: 10px 0 0 7px;
        .app_item {
          margin-left: 10px;
          margin-bottom: 10px;
          width: 96px;
          height: 88px;
          border-radius: 8px;
          background: transparent;

          .app-item-label {
            color: #252423;
          }

          .iconBox {
            margin: 4px auto 4px;
          }
        }

        .app_item:hover {
          box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.1);
          border-color: #f4f4f4 !important;
        }

        .app_item:hover::after {
          display: none;
        }
      }
    }
  }
}
.ant-dropdown.OverallAction {
  top: 50px !important;
  //left: unset !important;
  //right: 170px !important;
  .ant-dropdown-menu {
    padding: 8px 2px !important;
    position: relative;
    width: 174px;
  }
  .action-hover-point {
    position: absolute;
    height: 14px;
    width: 14px;
    background-color: #fff;
    transform: rotate(45deg);
    top: -8px;
    right: 77px;
    z-index: 1;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  .actionLabel {
    font-size: 12px;
    padding: 4px 12px;
    color: #181818;
    display: block;
  }
  .ant-dropdown-menu-item {
    font-size: 12px;
    line-height: 30px;
    color: #181818;
  }
  .actionIcon {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 12px;
    border-radius: 5px;
    position: relative;
    top: 3px;
    .uiImage {
      display: flex;
      align-items: center;
      justify-content: center;
      height: inherit;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
}
.header-toobar-plugin {
  .OverallActionIcon {
    font-size: 20px;
    svg {
      border-radius: 7px;
    }
  }
}
.header-toobar-plugin-favor {
  margin: 0 6px !important;
  .favorLeft {
    border: 1px solid #ccc;
    padding: 4px 5px !important;
    margin-right: -1px;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
  }
  .favorRight {
    border: 1px solid #ccc;
    padding: 5px 1px !important;
    border-radius: 0 4px 4px 0;
    font-size: 14px;
  }
}
.header-toobar-plugin-action {
  margin: 0 6px 0 6px !important;
}
.ant-dropdown.FavorList {
  top: 52px !important;
  left: unset !important;
  right: 90px !important;
  .ant-dropdown-menu {
    position: relative;
    width: 320px;
  }
  .action-hover-point {
    position: absolute;
    height: 14px;
    width: 14px;
    background-color: #fff;
    transform: rotate(45deg);
    top: -8px;
    right: 135px;
    z-index: 1;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  .actionLabel {
    font-size: 12px;
    padding: 12px 22px 2px;
    color: #444;
    display: block;
  }
  .ant-dropdown-menu-item {
    font-size: 12px;
    line-height: 30px;
    color: #181818;
    margin: 8px 10px !important;
  }
  .actionIcon {
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
    position: relative;
    top: 3px;
    .uiImage {
      display: flex;
      align-items: center;
      justify-content: center;
      height: inherit;
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
  .menu-row {
    display: flex;
    align-items: center;
    .favorname {
      color: #181818;
      font-size: 13px;
      line-height: 20px;
    }
    .favordesc {
      color: #666;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .favoraction {
    background: #f3f3f3;
    padding: 10px 18px;
    color: rgba(11, 92, 171, 1);
    font-size: 13px;
    border-top: 1px solid #ccc;
    border-radius: 0 0 8px 8px;
    cursor: pointer;
    .anticon {
      font-size: 16px;
      margin-right: 12px;
      color: rgba(11, 92, 171, 1);
    }
  }
}
.header .header-end .header-info-popup {
  top: 55px;
  border-top: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  .action-hover-point {
    position: absolute;
    height: 14px;
    width: 14px;
    background-color: #fff;
    transform: rotate(45deg);
    top: -8px;
    right: 50px;
    z-index: 1;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
  }
  .row-text {
    padding-bottom: 6px;
  }
}
.ant-popover.signPlugin {
  border-radius: 4px;
  .action-hover-point {
    position: absolute;
    height: 14px;
    width: 14px;
    background-color: #fff;
    transform: rotate(45deg);
    top: -8px;
    right: 150px;
    z-index: 1;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
  }
}
.headerFlex .header .app_popup {
  top: 50px;
  overflow: visible;
  .action-hover-point {
    position: absolute;
    height: 14px;
    width: 14px;
    background-color: #fff;
    transform: rotate(45deg);
    top: -8px;
    left: 30px;
    z-index: 999;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
  }
  .appList {
    overflow: auto;
    max-height: calc(~"100% - 60px");
  }
}
.ant-tooltip.header-tooltip {
  .ant-tooltip-inner {
    padding: 9px 8px;
  }
}
.header .app_popup .appList {
  .app_item {
    .iconBox {
      width: 50px;
      height: 50px;
      img {
        border-radius: 50%;
      }
    }
    &:hover {
      box-shadow: none !important;
      border: none !important;
      background: #f2f3f5;
    }
    &.active {
      box-shadow: none;
      border: none;
      background: #f2f3f5;
    }
  }
  .app_more {
    .iconBox {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 0;
      }
    }
  }
}
.header-info{
  .info-name{
    .info-name-bottom{
      color: #909090 !important;
      font-size: 11px !important;
      margin-top: 3px;
    }
  }
}
</style>
