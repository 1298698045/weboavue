<template>
  <div class="emailWrap">
    <div class="emailHeader">
      <!-- <div class="emailLogo">
                <MailOutlined />
                <span class="logoText">邮件</span>
            </div> -->
      <div class="header-top-menu" @click.stop="handleShowApp">
        <i
          class="iconfont icon-yingyongzhongxin"
          style="margin-left: 10px; font-size: 18px"
        ></i>
        <span class="text">邮件</span>
      </div>
      <div class="app_popup" v-if="isShow" @click.stop>
        <div class="appList">
          <div
            class="app_item"
            v-for="(item, index) in appList"
            :style="{ background: item.BgColor }"
            :key="index"
            @click="handleGoModule(item)"
          >
            <div class="appBox">
              <div class="iconBox">
                <img
                  :src="
                    'http://182.92.221.64:10000' +
                    (item.LogoUrl || '/img/apps/icon/ContentPage.png')
                  "
                  alt=""
                />
              </div>
              <div class="app-item-label">{{ item.Label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="emailSearch">
        <div class="navSearch" :class="{ active: isFocus }">
          <SearchOutlined class="SearchOutlined" />
          <el-input
            placeholder="搜索"
            v-model="searchText"
            @input="searchEmailInbox"
            @blur="handleBlurSearch"
            @focus="handleFocusSearch"
            clearable
          >
          </el-input>
        </div>
      </div>
      <div class="return">
        <div class="progressWrap">
          <a-progress
            :percent="
              percentage ? (percentage * 1 > 100 ? 100 : percentage) : 0
            "
            :size="8"
            :show-info="true"
            :title="
              '容量已使用' +
              (percentage ? (percentage * 1 > 100 ? 100 : percentage) : 0) +
              '%'
            "
          ></a-progress>
          <p class="progressText">
            邮箱空间使用量：{{
              UserInfo &&
              UserInfo.userSettings &&
              UserInfo.userSettings.mailboxUsedSpace
                ? UserInfo.userSettings.mailboxUsedSpace
                : "0"
            }}M/{{
              UserInfo &&
              UserInfo.userSettings &&
              UserInfo.userSettings.mailboxSpace
                ? UserInfo.userSettings.mailboxSpace
                : "0"
            }}M
          </p>
        </div>
      </div>
    </div>
    <div class="emailBd">
      <div class="emailContainer">
        <div class="leftContainer">
          <div class="leftNavPaneWrap" v-if="isFold">
            <a-button type="primary" block @click="openWriteEmail">
              写邮件
            </a-button>
            <div class="leftEmailScroll">
              <ul class="emailMenuWrap">
                <li
                  class="emailItem"
                  v-for="(item, index) in navList"
                  :key="index"
                >
                  <div class="emailItemRow" @click="handleOpen(item, index)">
                    <div class="emailItemTitle">
                      <div class="leftIcon">
                        <i
                          class="iconfont icon-xiala"
                          :class="{ active: !item.isBook }"
                          v-if="item.children.length > 0"
                        ></i>
                      </div>
                      <span class="name">{{ item.name }}</span>
                      <p
                        class="addIcon"
                        v-if="item.isAdd"
                        @click.stop="handleAddTab(item, index)"
                      >
                        <i class="iconfont icon-tianjia"></i>
                      </p>
                    </div>
                  </div>
                  <transition>
                    <div
                      class="menuChildren"
                      v-if="item.children.length > 0 && item.isBook"
                    >
                      <div
                        class="menuChildItem"
                        :class="{ active: self.ltags == ltags }"
                        @click="handleTypeEmail(self, idx)"
                        v-for="(self, idx) in item.children"
                        :key="idx"
                      >
                        <div class="leftIcon">
                          <i class="iconfont" :class="self.iconClass"></i>
                        </div>
                        <p class="name">{{ self.name }}</p>
                        <div class="option" v-if="item.isAdd">
                          <span
                            @click.stop="
                              handleRenameFolder(item, self, idx, index)
                            "
                            style="padding-right: 5px"
                            title="重命名"
                          >
                            <i class="iconfont icon-bianji"></i>
                          </span>
                          <span
                            @click.stop="handleDelFolder(self, idx)"
                            title="删除"
                          >
                            <i class="iconfont icon-yishanchu"></i>
                          </span>
                        </div>
                        <div class="emailNum" v-if="!item.isAdd">
                          <span class="num">{{ self.num || "" }}</span>
                          <i class="iconfont icon-gengduobiaoqian moreIcon"></i>

                          <div
                            class="dropMenuWapper leftMoreDrop"
                            v-if="item.hasOwnProperty('isFolder')"
                          >
                            <div class="dropOptionList">
                              <div
                                class="dropOptionItem"
                                @click.stop="handleDelFolder(self, idx)"
                              >
                                <span class="nameText">删除</span>
                              </div>
                              <div
                                class="dropOptionItem"
                                @click.stop="
                                  handleRenameFolder(item, self, idx, index)
                                "
                              >
                                <span class="nameText">重命名</span>
                              </div>
                            </div>
                          </div>
                          <div class="dropMenuWapper leftMoreDrop" v-else>
                            <div class="dropOptionList">
                              <div class="dropOptionItem">
                                <span class="nameText">全部标记已读</span>
                              </div>
                              <div class="dropOptionItem">
                                <span class="nameText">标记全部邮件</span>
                                <span class="rightIcon">
                                  <i
                                    class="iconfont icon-xiala rotate90deg"
                                  ></i>
                                </span>
                              </div>
                              <div class="dropOptionItem">
                                <span class="nameText">移动全部邮件</span>
                                <span class="rightIcon">
                                  <i
                                    class="iconfont icon-xiala rotate90deg"
                                  ></i>
                                </span>
                              </div>
                            </div>
                            <div class="dropOptionList">
                              <div class="dropOptionItem">
                                <span class="nameText">下移</span>
                              </div>
                            </div>
                            <div class="dropOptionList">
                              <div class="dropOptionItem">
                                <span class="nameText">清空此文件夹</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                  <div class="addTabsWrap" v-if="item.isAddTabs">
                    <el-input
                      v-model="folderText"
                      :ref="(el) => setItemRefs(el, index)"
                    ></el-input>
                    <div class="rightIcon">
                      <span
                        class="radiusIcon"
                        @click.stop="handleConfirm(item, index)"
                      >
                        <i class="iconfont icon-duigou"></i>
                      </span>
                      <span
                        class="radiusIcon"
                        @click.stop="handleClose(item, index)"
                      >
                        <i class="iconfont icon-guanbi"></i>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="leftNavIconWrap" v-else>
            <div class="squareBtn" @click="handleWriteEmail">
              <i class="iconfont icon-tianjia"></i>
            </div>
            <div class="navIconBox">
              <i class="iconfont icon-sousuo"></i>
            </div>
            <a-tooltip title="收件箱" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-shoujianxiang"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="跟进事项" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-genjinshixiang"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="完成事项" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-wanchengshixiang"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="重要邮件" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-zhongyaoyoujian"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="群邮件" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-qunyoujian"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="未读邮件" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-weiduyoujian"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="草稿箱" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-caogaoxiang1"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="已发送" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-yifasong"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="已删除" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-yishanchu"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="邮件文件夹" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-youjianwenjianjia"></i>
              </div>
            </a-tooltip>
            <a-tooltip title="标签" placement="bottom">
              <div class="navIconBox">
                <i class="iconfont icon-biaoqian"></i>
              </div>
            </a-tooltip>
          </div>
        </div>
        <div class="rightContainer" v-if="!isWriteEmail">
          <div class="mailListWrap" v-if="!isDetailView">
            <div class="mailHeader">
              <!-- <a-tooltip class="foldIcon" placement="top" :title="isFold?'收起文件夹栏':'展开文件夹栏'">
                                <div class="btnText foldIcon" v-if="!isEdit" @click="handleFoldIcon">
                                    <i class="iconfont icon-shouqiwenjianjialan" :class="{active:!isFold}"></i>
                                </div>
                                <div v-else>
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                                </div>
                            </a-tooltip> -->
              <!-- <div class="titleBox" v-if="ltags=='inbox'">
                                <button class="btnText">
                                    {{dropMenuItemName}}({{ emailTotal||0 }})
                                    <i class="iconfont icon-xiala"></i>
                                </button>
                                <div class="dropMenuWapper mailDropWrap">
                                    <div class="dropMenu">
                                        <div class="dropMenuItem" @click="dropMenuItemChange('全部邮件')"><span class="name">全部邮件</span></div>
                                        <div class="dropMenuItem" @click="dropMenuItemChange('未读邮件')"><span class="name">未读邮件</span></div>
                                        <div class="dropMenuItem" @click="dropMenuItemChange('已读邮件')"><span class="name">已读邮件</span></div>
                                    </div>
                                </div>
                            </div> -->
              <a-tooltip
                class="foldIcon"
                placement="top"
                title="全选"
                v-if="isEdit"
              >
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                ></el-checkbox>
              </a-tooltip>
              <div class="titleBox">
                <button class="btnText">
                  {{ dropMenuItemName }}
                </button>
              </div>
              <div class="rightBtn">
                <a-tooltip
                  placement="top"
                  :title="isEdit ? '点击关闭选择' : '点击打开选择'"
                >
                  <a-dropdown>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="1" @click="BatchHandleUnRead">
                          <i class="iconfont icon-weiduyoujian"></i>
                          设为未读邮件
                        </a-menu-item>
                        <a-menu-item key="2" @click="BatchHandleStar">
                          <i class="iconfont icon-zhongyaoyoujian"></i>
                          设为重要邮件
                        </a-menu-item>
                        <a-menu-item key="5" @click="BatchHandleDeleteEmail">
                          <i class="iconfont icon-yishanchu"></i>
                          批量删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                    <a-button
                      class="ml5 emaillistmenubtn1"
                      @click="handleEditEmail"
                    >
                      <Icon
                        :name="isEdit ? 'SelectAllOn' : 'SelectAllOff'"
                        fill="#000"
                        width="20"
                        hight="20"
                      />
                    </a-button>
                  </a-dropdown>
                </a-tooltip>
                <a-tooltip placement="top" title="筛选器">
                  <a-dropdown>
                    <template #overlay>
                      <a-menu class="emaillistmenu">
                        <a-menu-item
                          key="1"
                          @click="dropMenuItemChange('全部')"
                        >
                          <i
                            class="iconfont icon-duigou"
                            :style="{
                              color:
                                data.filterName == '全部' ? '#000' : '#fff',
                            }"
                          ></i>
                          <i class="iconfont icon-shoujianxiang"></i>
                          全部
                        </a-menu-item>
                        <a-menu-item
                          key="2"
                          @click="dropMenuItemChange('未读')"
                        >
                          <i
                            class="iconfont icon-duigou"
                            :style="{
                              color:
                                data.filterName == '未读' ? '#000' : '#fff',
                            }"
                          ></i>
                          <i class="iconfont icon-weiduyoujian"></i>
                          未读
                        </a-menu-item>
                        <a-menu-item
                          key="5"
                          @click="dropMenuItemChange('已标记')"
                        >
                          <i
                            class="iconfont icon-duigou"
                            :style="{
                              color:
                                data.filterName == '已标记' ? '#000' : '#fff',
                            }"
                          ></i>
                          <i class="iconfont icon-zhongyaoyoujian"></i>
                          已标记
                        </a-menu-item>
                      </a-menu>
                    </template>
                    <a-button class="ml5 emaillistmenubtn2">
                      <Icon name="Filter" fill="#000" width="20" hight="20" />
                    </a-button>
                  </a-dropdown>
                </a-tooltip>
                <a-tooltip placement="top" title="排序方式">
                  <a-dropdown>
                    <template #overlay>
                      <a-menu class="emaillistmenu">
                        <a-menu-item-group title="排序依据">
                          <a-menu-item
                            key="1"
                            @click="ChangeEmailSort('CreatedOn')"
                          >
                            <i
                              class="iconfont icon-duigou"
                              :style="{
                                color:
                                  data.sort == 'CreatedOn' ? '#000' : '#fff',
                              }"
                            ></i>
                            日期
                          </a-menu-item>
                          <a-menu-item
                            key="2"
                            @click="ChangeEmailSort('FromName')"
                          >
                            <i
                              class="iconfont icon-duigou"
                              :style="{
                                color:
                                  data.sort == 'FromName' ? '#000' : '#fff',
                              }"
                            ></i>
                            发件人
                          </a-menu-item>
                          <a-menu-item
                            key="3"
                            @click="ChangeEmailSort('StarEmail')"
                          >
                            <i
                              class="iconfont icon-duigou"
                              :style="{
                                color:
                                  data.sort == 'StarEmail' ? '#000' : '#fff',
                              }"
                            ></i>
                            重要性
                          </a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="排序顺序">
                          <a-menu-item key="4" @click="ChangeEmailOrder('ASC')">
                            <i
                              class="iconfont icon-duigou"
                              :style="{
                                color: data.order == 'ASC' ? '#000' : '#fff',
                              }"
                            ></i>
                            由旧到新
                          </a-menu-item>
                          <a-menu-item
                            key="5"
                            @click="ChangeEmailOrder('DESC')"
                          >
                            <i
                              class="iconfont icon-duigou"
                              :style="{
                                color: data.order == 'DESC' ? '#000' : '#fff',
                              }"
                            ></i>
                            由新到旧
                          </a-menu-item>
                        </a-menu-item-group>
                      </a-menu>
                    </template>
                    <a-button class="ml5 m155 emaillistmenubtn3">
                      <Icon
                        name="ArrowSort"
                        fill="#000"
                        width="20"
                        hight="20"
                      />
                    </a-button>
                  </a-dropdown>
                </a-tooltip>
              </div>
            </div>
            <div class="mailListContent">
              <div class="empty" v-if="inboxList == ''">
                <!-- 该标签下没有邮件！ -->
                <svg
                  width="64"
                  height="41"
                  viewBox="0 0 64 41"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                    <ellipse
                      fill="#f5f5f5"
                      cx="32"
                      cy="33"
                      rx="32"
                      ry="7"
                    ></ellipse>
                    <g fill-rule="nonzero" stroke="#d9d9d9">
                      <path
                        d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                      ></path>
                      <path
                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                        fill="#fafafa"
                      ></path>
                    </g>
                  </g>
                </svg>
                <p class="emptyDesc">暂无数据</p>
              </div>
              <el-checkbox-group v-model="checkList" @change="changeCheckbox">
                <div
                  class="mailContentItem"
                  :class="{
                    active: item.id == emailId,
                    unReadClass: item.isRead != true,
                  }"
                  v-for="(item, index) in inboxList"
                  :key="index"
                  @mouseenter="handleMouseover(item, index)"
                  @mouseleave="handleMouseout(item, index)"
                  @click="handleRowEmail(item, index)"
                >
                  <p @click.stop v-if="item.isBook">
                    <el-checkbox
                      class="checkbox"
                      :key="item.emailId"
                      :label="item.emailId"
                      :value="item.emailId"
                    ></el-checkbox>
                  </p>
                  <a-tooltip
                    placement="top"
                    :title="item.isRead ? '点击标记未读' : '点击标记已读'"
                  >
                    <span
                      class="readElement"
                      :class="{ active: item.isRead }"
                      @click.stop="handleRowRead(item)"
                    ></span>
                  </a-tooltip>
                  <div class="avatar">
                    <i class="iconfont icon-morentouxiang"></i>
                  </div>
                  <div class="rightInfo">
                    <div class="nameRow">
                      <span class="name" :class="{ active: !item.isRead }">{{
                        item.fromName || ""
                      }}</span>
                      <div class="right">
                        <a-tooltip
                          placement="top"
                          :title="item.isRead ? '点击标记未读' : '点击标记已读'"
                        >
                          <span @click.stop="handleRowRead(item)">
                            <i class="iconfont icon-wodeyoujian"></i>
                          </span>
                        </a-tooltip>
                        <a-tooltip
                          placement="top"
                          :title="
                            item.isStar
                              ? '点击取消重要邮件'
                              : '点击标记重要邮件'
                          "
                        >
                          <span
                            :class="{ active: item.isStar }"
                            @click.stop="handleItemStarEmail(item)"
                          >
                            <i
                              v-if="item.isStar"
                              class="iconfont icon-shoucangyoujian"
                              style="color: #f7ba1e; opacity: 1"
                            ></i>
                            <i v-else class="iconfont icon-zhongyaoyoujian"></i>
                          </span>
                        </a-tooltip>
                        <span
                          style="visibility: visible; margin-left: 5px"
                          v-if="item.isAttach"
                        >
                          <i class="iconfont icon-fujianwenjian"></i>
                        </span>
                      </div>
                    </div>
                    <div class="middleRow">
                      <div
                        class="theme rowEllipsis"
                        :class="{ active: !item.isRead }"
                      >
                        <a-tooltip
                          :title="item.subject || '无主题'"
                          placement="bottom"
                        >
                          <span>
                            {{ item.subject || "[无主题]" }}
                          </span>
                        </a-tooltip>
                      </div>
                      <div class="timer">
                        <i class="iconfont icon-fujian"></i>
                        {{ item.createdOn || "" }}
                      </div>
                      <div class="deleteAction">
                        <a-tooltip placement="top" title="删除">
                          <span @click.stop="handleRowDelete(item)">
                            <i class="iconfont icon-yishanchu"></i>
                          </span>
                        </a-tooltip>
                      </div>
                    </div>

                    <div
                      class="desc rowEllipsis"
                      v-html="item.content || ''"
                    ></div>
                  </div>
                </div>
                <div class="loadingList" v-if="loading">
                  <LoadingOutlined />
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <div class="emptyContent" v-if="!isDetail && !isDetailView">
            <div class="emptyContentbox">未选择邮件</div>
          </div>
          <!-- 邮件详情 -->
          <div class="mailContainerWrap inboxContainer" v-if="isDetail">
            <email-detail
              :emailId="emailId"
              @cancel="
                isDetail = false;
                emailId = '';
              "
              @reply="handleReply"
              @share="handleShare"
              @delete="handleRowDelete"
            ></email-detail>
          </div>
        </div>
        <div class="rightContainer" v-if="isWriteEmail">
          <writeEmail
            v-if="isWriteEmail"
            :ltags="ltagsRecord"
            :type="writeEmailType"
            @cancel="closeWriteEmail"
            @refresh="getInboxList"
            :id="recordId"
          />
        </div>
      </div>
    </div>
    <Delete
      :isShow="isDelete"
      :desc="deleteDesc"
      :sObjectName="sObjectName"
      :recordId="recordId"
      :objTypeCode="objectTypeCode"
      :external="external"
      @cancel="isDelete = false"
      @ok="deleteOk"
    />
    <CommonConfirm
      v-if="isConfirm"
      :isShow="isConfirm"
      :text="confirmText"
      :title="confirmTitle"
      @cancel="isConfirm = false"
      @ok="confirmOk"
      :id="recordId"
    />
  </div>
</template>
<script setup>
import "@/style/oldIcon/iconfont.css";
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
  nextTick,
  h,
} from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
dayjs.locale("zh-cn");
import calendar from "dayjs/plugin/calendar";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(localeData);
import {
  SearchOutlined,
  DeleteOutlined,
  MailOutlined,
  LoadingOutlined,
  MenuOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  FilterOutlined,
  SwapOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import EmailDetail from "@/components/email/EmailDetail.vue";
import writeEmail from "@/views/email/writeEmail/index.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import Icon from "@/components/icon/index.vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
let store = useStore();
const state = reactive({
  collapsed: false,
});
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const data = reactive({
  navList: [
    {
      name: "内部邮件",
      isBook: true,
      children: [
        {
          name: "收件箱",
          num: 0,
          iconClass: "icon-shoujianxiang",
          ltags: "inbox",
        },
        // {
        //     name: "重要邮件",
        //     num: "",
        //     iconClass: "icon-zhongyaoyoujian",
        //     ltags: "star",
        // },
        {
          name: "群邮件",
          num: 0,
          iconClass: "icon-qunyoujian",
          ltags: "group",
        },
        // {
        //     name: "未读邮件",
        //     num: "",
        //     iconClass: "icon-weiduyoujian",
        //     ltags: "unread",
        // },
        {
          name: "草稿箱",
          num: 0,
          iconClass: "icon-caogaoxiang1",
          ltags: "draft",
        },
        {
          name: "已发送",
          num: 0,
          iconClass: "icon-yifasong",
          ltags: "sent",
        },
        {
          name: "已删除",
          num: 0,
          iconClass: "icon-yishanchu",
          ltags: "Deleted",
        },
      ],
    },
    {
      name: "邮箱文件夹",
      isBook: true,
      isAdd: true,
      isAddTabs: false,
      isFolder: "1",
      children: [],
    },
  ],
  ltags: "inbox",
  emailId: "",
  folderId: "",
  inboxList: [],
  emailTotal: 0,
  emailListAll: [],
  folderList: [],
  folderText: "",
  renameFolderId: "",
  isEdit: false,
  checkList: [],
  checkAll: [],
  isIndeterminate: false,
  isFold: true,
  isDetail: false,
  emailIndex: 0,
  pageNumber: 1,
  pageSize: 20,
  searchText: "",
  isFocus: false,
  isWriteEmail: false,
  ltagsRecord: "",
  ltagsData: { name: "", id: "", body: "" },
  appList: [],
  keyIndex: 1,
  appCode: "",
  currentAppName: "",
  folderName: "",
  currentUserId: "",
  currentUserName: "",
  isDelete: false,
  recordId: "",
  objectTypeCode: "6000",
  sObjectName: "Chatter",
  deleteDesc: "确定要删除吗？",
  external: false,
  dropMenuItemName: "收件箱",
  percentage: 0,
  loading: false,
  isConfirm: false,
  confirmText: "",
  confirmTitle: "",
  sort: "CreatedOn",
  order: "DESC",
  filterName: "全部",
  writeEmailType: "",
  UserInfo: {},
  isDetailView: false,
});
const {
  isDetailView,
  UserInfo,
  writeEmailType,
  filterName,
  sort,
  order,
  loading,
  percentage,
  dropMenuItemName,
  isDelete,
  recordId,
  objectTypeCode,
  sObjectName,
  deleteDesc,
  external,
  currentUserId,
  currentUserName,
  folderName,
  navList,
  ltags,
  emailId,
  folderId,
  inboxList,
  emailTotal,
  emailListAll,
  folderList,
  folderText,
  renameFolderId,
  isEdit,
  checkList,
  checkAll,
  isIndeterminate,
  isFold,
  isConfirm,
  confirmText,
  confirmTitle,
  isDetail,
  emailIndex,
  pageNumber,
  pageSize,
  searchText,
  isFocus,
  isWriteEmail,
  ltagsRecord,
  ltagsData,
  appList,
  appCode,
  currentAppName,
} = toRefs(data);
data.appList = store.state.modules;

let localAppCode = localStorage.getItem("appCode");
let localAppName = localStorage.getItem("appName");
if (localAppCode) {
  data.appCode = localAppCode;
  data.currentAppName = localAppName;
}

const getModuleAppList = () => {
  proxy
    .$get(Interface.applist, {
      systemCode: "OA",
    })
    .then((res) => {
      data.appList = res.actions[0].returnValue.apps;
      if (localAppCode == "") {
        data.appCode = data.appList[0].AppCode;
        data.currentAppName = data.appList[0].Label;
      }
      store.commit("setModuleName", data.currentAppName);
    });
};
// getModuleAppList();

const changeCode = (e) => {
  data.appCode = e;
  localStorage.setItem("appCode", data.appCode);
  store.dispatch("getSubModules", e);
};
let itemRefs = [];
const handleTypeEmail = (item, index) => {
  data.keyIndex = 1;
  data.checkList = [];
  data.isDetail = false;
  data.ltags = item.ltags;
  data.emailId = "";
  data.isWriteEmail = false;
  data.recordId = "";
  data.writeEmailType = "";
  //data.ltagsData={name:'',id:'',body:''};
  if (data.ltags.indexOf("folder") != -1) {
    data.folderId = item.id;
    data.folderName = item.name;
  }
  if (data.ltags == "inbox") {
    data.dropMenuItemName = "收件箱";
  } else {
    data.dropMenuItemName = item.name;
  }
  getInboxList();
};
const handleOpen = (item, index) => {
  item.isBook = !item.isBook;
  item.isAddTabs = false;
  data.isWriteEmail = false;
  data.recordId = "";
  //data.ltagsData={name:'',id:'',body:''};
};

// 获取邮件列表
const getInboxList = () => {
  data.loading = true;
  data.isDetailView = false;
  if (data.keyIndex == 1) {
    data.inboxList = [];
  }
  let url = Interface.email.inboxSearch;
  let d = {
    actions: [
      {
        params: {
          ltags: data.ltags,
          search: data.searchText,
          pageNumber: data.keyIndex,
          pageSize: data.pageSize,
          sort: data.sort,
          order: data.order,
        },
      },
    ],
  };
  if (data.filterName == "未读") {
    d.actions[0].params.IsRead = false;
  } else if (data.filterName == "已标记") {
    d.actions[0].params.starEmail = 1;
  }
  if (data.ltags == "inbox") {
    url = Interface.email.inboxSearch;
  } else if (data.ltags == "sent") {
    url = Interface.email.sentboxSearch;
  } else if (data.ltags == "draft") {
    url = Interface.email.draftboxSearch;
  } else if (data.ltags == "star") {
    d.actions[0].params.starEmail = 1;
  } else if (data.ltags == "group") {
    d.actions[0].params.IsGroupmail = true;
  } else if (data.ltags == "unread") {
    d.actions[0].params.IsRead = false;
  } else if (data.ltags == "Deleted") {
    d.actions[0].params.DeleteStateCode = 1;
  }
  let obj = {
    message: JSON.stringify(d),
  };
  if (data.ltags.indexOf("folder") != -1) {
    url = Interface.list2;
    obj = {
      filterId: "",
      objectTypeCode: "20021",
      entityName: "MailInbox",
      filterCondition: '[{"attribute":"Labeld","column":"Labeld","label":"标签名称","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+data.folderId+'"]}]',
      search: data.searchText,
      page: data.keyIndex,
      rows: data.pageSize,
      sort: data.sort,
      order: data.order,
      displayColumns:
        "FromName,ToUserNames,IsRead,StarEmail,Subject,MailContent,CreatedOn",
    };
  }
  proxy.$post(url, obj).then((res) => {
    if (res && res.nodes.length) {
      let nodes = res.nodes;
      if (nodes && nodes.length) {
        data.isBook = false;
        nodes.forEach(function (item) {
          // if (item.toUserNames) {
          //     if (item.toUserNames.slice(item.toUserNames.length - 1) == ',') {
          //         var name = item.toUserNames.slice(0, item.toUserNames.length - 1)
          //         data.fromName = name;
          //     }
          // }
          data.inboxList.push({
            emailId: item.id,
            fromName: item.FromName ? item.FromName.textValue : "",
            ToUserNames: item.ToUserNames ? item.ToUserNames.textValue : "",
            isRead: item.IsRead ? item.IsRead.selected : false,
            isStar:
              item.StarEmail && item.StarEmail.value * 1 == 1 ? true : false,
            subject: item.Subject.textValue,
            content:
              item.Content && item.Content.value
                ? item.Content.value
                : item.MailContent && item.MailContent.value
                ? item.MailContent.value
                : "",
            createdOn:
              item.CreatedOn && item.CreatedOn.dateTime
                ? dayjs(item.CreatedOn.dateTime).format("YYYY-MM-DD HH:mm")
                : "",
            id: item.id,
          });
        });
        data.inboxList = data.inboxList.concat(data.inboxList);
        data.inboxList = unique(data.inboxList);
      }
      data.emailTotal =
        res.totalCount || (res.pageInfo ? res.pageInfo.total : 0) || 0;
      for (var i = 0; i < data.navList[0].children.length; i++) {
        if (
          data.ltags == data.navList[0].children[i].ltags &&
          (data.ltags == "inbox" || data.ltags == "draft")
        ) {
          data.navList[0].children[i].num = data.emailTotal;
        }
      }
    } else {
      data.emailId = "";
    }
    data.emailListAll = data.emailListAll.concat(data.inboxList);
    data.emailListAll = unique(data.emailListAll);
  });
  setTimeout(function () {
    data.loading = false;
  }, 3000);
};

// 获取我的标签
const getMyFolder = () => {
  data.navList[1].children = [];
  let url = Interface.list2;
  let obj = {
    filterId: "",
    objectTypeCode: "20609",
    entityName: "MailLabel",
    filterCondition: '[{"attribute":"CreatedBy","column":"CreatedBy","label":"创建人","operator":"eq","logical":"AND","picklistValues":[],"isEditable":false,"operands":["'+data.currentUserId+'"]}]',
    search: "",
    page: 1,
    rows: 100,
    sort: "CreatedOn",
    order: "ASC",
    displayColumns: "Name",
  };
  proxy.$post(url, obj).then((res) => {
    if (res && res.nodes.length) {
      let nodes = res.nodes;
      if (nodes && nodes.length) {
        nodes.forEach(function (item, index) {
          data.navList[1].children.push({
            name: item.Name ? item.Name.textValue : "",
            id: item.id,
            num: "",
            iconClass: "",
            ltags: "folder_" + index,
            folderId: item.id,
          });
        });
      }
    } else {
      data.folderId = "";
    }
  });
  // proxy.$get(Interface.email.myEmailFolder,{}).then(res=>{
  //     data.folderList = res.data;
  //     var result = [];
  //     result = res.data.map(function (item,index) {
  //         item.name = item.Name;
  //         item.id = item.Id;
  //         item.num = '';
  //         item.iconClass = '';
  //         item.ltags = 'folder_'+index;
  //         item.folderId = item.Id;
  //         return item;
  //     })
  //     data.navList[1].children = result
  // })
};
const unique = (list) => {
  for (var i = 0; i < list.length; i++) {
    for (var j = i + 1; j < list.length; j++) {
      if (list[i].id == list[j].id) {
        list.splice(j, 1);
        j--;
      }
    }
  }
  return list;
};

const handleAddTab = (item, index) => {
  if (item.children.length > 0) {
    item.isBook = true;
  }
  item.isAddTabs = true;
  nextTick(() => {
    itemRefs[0].el.focus();
    itemRefs = [];
  });
};
// 新建邮箱标签
const handleConfirm = (item, index) => {
  if (data.folderText != "") {
    let url = Interface.create;
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {
            recordInput: {
              allowSaveOnDuplicate: false,
              apiName: "MailLabel",
              objTypeCode: "20609",
              fields: {
                Name: data.folderText,
                CreatedBy: data.currentUserId,
              },
            },
          },
        },
      ],
    };
    if (data.renameFolderId) {
      url = Interface.edit;
      d.actions[0].params.recordId = data.renameFolderId;
    }
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].state &&
        res.actions[0].state == "SUCCESS"
      ) {
        message.success("保存成功！");
        item.isAddTabs = false;
        data.renameFolderId = "";
        data.folderText = "";
        getMyFolder();
      } else {
        if (
          res &&
          res.actions &&
          res.actions[0] &&
          res.actions[0].state &&
          res.actions[0].errorMessage
        ) {
          message.error(res.actions[0].errorMessage);
        } else {
          message.error("保存失败！");
        }
      }
    });
  } else {
    message.error("邮箱标签名称不能为空!");
  }
};
// 关闭新建邮箱标签
const handleClose = (item, index) => {
  item.isAddTabs = false;
  data.folderText = "";
  data.renameFolderId = "";
};
// 邮箱标签重命名
const handleRenameFolder = (item, self, idx, index) => {
  data.folderText = self.name;
  data.renameFolderId = self.folderId;
  item.isAddTabs = true;
  // nextTick(function () {
  //     inpRef.value[data.addTabs + index][0].focus();
  // })
  nextTick(() => {
    itemRefs[0].el.focus();
    itemRefs = [];
  });
};
const deleteOk = () => {
  if (data.objectTypeCode == "20609") {
    getMyFolder();
  }
  if (data.objectTypeCode == "20021") {
    data.keyIndex = 1;
    data.checkList = [];
    data.isDetail = false;
    data.emailId = "";
    getInboxList();
  }
  data.recordId = "";
};
// 删除邮箱标签
const handleDelFolder = (item, index) => {
  // deleteFolder(item.folderId);
  data.recordId = item.id;
  data.isDelete = true;
  data.objectTypeCode = "20609";
  data.sObjectName = "MailLabel";
};
const handleMouseover = (item, index) => {
  item.isBook = true;
};
const handleMouseout = (item, index) => {
  if (!data.isEdit) {
    item.isBook = false;
  }
};
const changeCheckbox = (e) => {
  let checkedCount = e.length;
  data.checkAll =
    checkedCount ==
    data.emailListAll.map(function (item) {
      return item.emailId;
    }).length;
  data.isIndeterminate =
    checkedCount > 0 &&
    checkedCount <
      data.emailListAll.map(function (item) {
        return item.emailId;
      }).length;
  data.isEdit = true;
};

const handleFoldIcon = () => {
  data.isFold = !data.isFold;
};
// 全选
const handleCheckAllChange = (val) => {
  data.checkList = val
    ? data.emailListAll.map(function (item) {
        return item.emailId;
      })
    : [];
  data.isIndeterminate = false;
};
// 编辑
const handleEditEmail = () => {
  data.isEdit = !data.isEdit;
};
watch(isEdit, (val, oldVal) => {
  if (val) {
    data.inboxList.forEach(function (item) {
      item.isBook = true;
    });
  } else {
    data.checkList = [];
    data.isIndeterminate = false;
    data.inboxList.forEach(function (item) {
      item.isBook = false;
    });
  }
});
const setItemRefs = (el, index) => {
  if (el && el != null) {
    itemRefs.push({
      index: index,
      el,
    });
    //console.log("itemRefs",itemRefs)
  }
};
// 切换邮件
const handleRowEmail = (item, index) => {
  if (item.isRead != true) {
    item.isRead = true;
    let item0 = { isRead: false, id: item.id, subject: item.subject };
    if (item0.id) {
      handleRowRead(item0, 1);
    }
  }
  if (data.ltags == "draft") {
    data.ltagsRecord = data.ltags;
    //data.ltagsData={name:'',id:'',body:item.content||''};
    data.recordId = item.id;
    data.isWriteEmail = true;
    data.writeEmailType = "";
  } else {
    data.emailId = item.id;
    data.emailIndex = index;
    data.isDetail = true;
  }
};
const backToOA = () => {
  let url = router.resolve({
    path: "/workspace/personal/home",
    name: "PersonalHome",
    query: {},
  });
  //window.open(url.href);
  window.location.href = url.href;
};
const openWriteEmail = () => {
  // let url = router.resolve({
  //     path:'/email/0/write',
  //     name: "WriteEmail",
  //     query: {

  //     },
  // });
  //window.open(url.href);
  //window.location.href=url.href;
  data.ltagsRecord = data.ltags;
  data.isWriteEmail = true;
  data.recordId = "";
  data.writeEmailType = "";
};
const handleReply = (e) => {
  data.ltagsRecord = data.ltags;
  //data.ltagsData=e;
  data.recordId = e.emailId;
  data.writeEmailType = e.type;
  nextTick(() => {
    data.isWriteEmail = true;
  });
};
const handleShare = (e) => {
  data.ltagsRecord = data.ltags;
  //data.ltagsData=e;
  data.recordId = e.emailId;
  data.writeEmailType = e.type;
  nextTick(() => {
    data.isWriteEmail = true;
  });
};
const searchEmailInbox = (e) => {
  data.searchText = e;
  data.keyIndex = 1;
  data.checkList = [];
  data.isDetail = false;
  data.emailId = "";
  if (data.searchText.length >= 2 || data.searchText == "") {
    getInboxList();
  }
};
const handleFocusSearch = (e) => {
  data.isFocus = true;
};
const handleBlurSearch = (e) => {
  data.isFocus = false;
};
const closeWriteEmail = (e) => {
  //console.log(e)
  data.isWriteEmail = false;
  data.recordId = "";
  data.writeEmailType = "";
  //data.ltagsData={name:'',id:'',body:''};
  data.ltags = e;
};
const isShow = ref(false);
const handleShowApp = () => {
  isShow.value = !isShow.value;
};
const handleGoModule = (item) => {
  // console.log("item", item);
  store.commit("setModuleName", item.Label);
  localStorage.setItem("moduleName", item.Label);
  changeCode(item.AppCode);
  isShow.value = false;
};
const handleRowDelete = (item) => {
  data.recordId = item.id;
  // data.isDelete = true;
  // data.objectTypeCode='20021';
  // data.sObjectName='MailInbox';
  data.isConfirm = true;
  if (data.ltags == "Deleted") {
    data.confirmText = "确定要永久删除吗？";
  } else {
    data.confirmText = "确定要删除吗？";
  }
  data.confirmTitle = "删除";
};
const handleRowRead = (item, num) => {
  let IsRead = item.isRead ? false : true;
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: item.id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "MailInbox",
            objTypeCode: "20021",
            fields: {
              IsRead: IsRead,
            },
          },
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      if (num * 1 == 1) {
      } else {
        message.success("操作成功！");
      }
      if (item.subject) {
        item.isRead = IsRead;
      } else {
        data.keyIndex = 1;
        if (!data.isDetailView) {
          getInboxList();
        }
      }
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
        message.success("操作失败！");
      }
    }
  });
};
const handleItemStarEmail = (item) => {
  let StarEmail = item.isStar ? 0 : 1;
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: item.id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "MailInbox",
            objTypeCode: "20021",
            fields: {
              StarEmail: StarEmail,
            },
          },
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("操作成功！");
      if (item.subject) {
        item.isStar = StarEmail && StarEmail * 1 == 1 ? true : false;
      } else {
        data.keyIndex = 1;
        getInboxList();
      }
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
        message.success("操作失败！");
      }
    }
  });
};
const confirmOk = (id) => {
  data.isConfirm = false;
  if (data.confirmTitle == "批量删除") {
    BatchHandleDeleteEmail2();
  } else {
    handleRowDelete2(id);
  }
};
//逻辑删除
const handleRowDelete2 = (id) => {
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: id,
          recordInput: {
            allowSaveOnDuplicate: false,
            apiName: "MailInbox",
            objTypeCode: "20021",
            fields: {
              DeleteStateCode: 1,
            },
          },
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  if (data.ltags == "Deleted") {
    url = Interface.email.deletePermEmail;
    obj = {
      id: id,
    };
  }
  proxy.$post(url, obj).then((res) => {
    if (
      res &&
      res.actions &&
      res.actions[0] &&
      res.actions[0].state &&
      res.actions[0].state == "SUCCESS"
    ) {
      message.success("删除成功！");
      data.keyIndex = 1;
      data.isDetail = false;
      data.emailId = "";
      getInboxList();
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
        message.success("删除失败！");
      }
    }
  });
};
//切换已读未读条件
const dropMenuItemChange = (name) => {
  //data.dropMenuItemName=name;
  data.filterName = name;
  data.keyIndex = 1;
  data.checkList = [];
  data.isDetail = false;
  data.emailId = "";
  data.isWriteEmail = false;
  data.recordId = "";
  data.writeEmailType = "";
  //data.ltagsData={name:'',id:'',body:''};
  getInboxList();
};
//切换排序方式
const ChangeEmailSort = (name) => {
  data.keyIndex = 1;
  data.checkList = [];
  data.isDetail = false;
  data.emailId = "";
  data.isWriteEmail = false;
  data.recordId = "";
  data.writeEmailType = "";
  //data.ltagsData={name:'',id:'',body:''};
  data.sort = name;
  getInboxList();
};
//切换排序顺序
const ChangeEmailOrder = (name) => {
  data.keyIndex = 1;
  data.checkList = [];
  data.isDetail = false;
  data.emailId = "";
  data.isWriteEmail = false;
  data.recordId = "";
  data.writeEmailType = "";
  //data.ltagsData={name:'',id:'',body:''};
  data.order = name;
  getInboxList();
};
//批量设置重要邮件
const BatchHandleStar = () => {
  console.log(data.checkList);
  if (data.checkList && data.checkList.length) {
    for (var i = 0; i < data.checkList.length; i++) {
      let item = { isStar: false, id: data.checkList[i] };
      if (item.id) {
        handleItemStarEmail(item);
      }
    }
    setTimeout(function () {
      data.checkList = [];
    }, 2000);
  } else {
    message.error("至少需要勾选一个");
  }
};
//批量设置未读
const BatchHandleUnRead = () => {
  console.log(data.checkList);
  if (data.checkList && data.checkList.length) {
    for (var i = 0; i < data.checkList.length; i++) {
      let item = { isRead: true, id: data.checkList[i] };
      if (item.id) {
        handleRowRead(item);
      }
    }
    setTimeout(function () {
      data.checkList = [];
    }, 2000);
  } else {
    message.error("至少需要勾选一个");
  }
};
//批量删除
const BatchHandleDeleteEmail = () => {
  console.log(data.checkList);
  if (data.checkList && data.checkList.length) {
    data.recordId = "";
    data.isConfirm = true;
    if (data.ltags == "Deleted") {
      data.confirmText = "确定要批量永久删除吗？";
    } else {
      data.confirmText = "确定要批量删除吗？";
    }
    data.confirmTitle = "批量删除";
  } else {
    message.error("至少需要勾选一个");
  }
};
const BatchHandleDeleteEmail2 = () => {
  if (data.checkList && data.checkList.length) {
    for (var i = 0; i < data.checkList.length; i++) {
      let item = { id: data.checkList[i] };
      if (item.id) {
        handleRowDelete2(item.id);
      }
    }
    setTimeout(function () {
      data.checkList = [];
    }, 2000);
  }
};
const getUserInfo = (id) => {
  let d = {
    actions: [
      {
        state: "",
        id: "",
        params: {
          id: id,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(Interface.user.getUserInfo, obj).then((res) => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      data.UserInfo = res.actions[0].returnValue;
      data.percentage =
        UserInfo && UserInfo.userSettings && UserInfo.userSettings.mailboxSpace
          ? (
              ((UserInfo &&
              UserInfo.userSettings &&
              UserInfo.userSettings.mailboxUsedSpace
                ? UserInfo.userSettings.mailboxUsedSpace * 1
                : 0) /
                (UserInfo.userSettings.mailboxSpace * 1)) *
              100
            ).toFixed(1)
          : 0;
    }
  });
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.currentUserId = userInfo.userId;
    data.currentUserName = userInfo.fullName;
    getUserInfo(userInfo.userId);
  }
  getMyFolder();
  if (route.query.type) {
    openWriteEmail();
  } else {
    if (route.query.id) {
      data.isDetailView = true;
      data.ltags = "";
      let item0 = { isRead: false, id: route.query.id, subject: "" };
      if (item0.id) {
        handleRowRead(item0, 1);
      }
      data.emailId = route.query.id;
      data.emailIndex = 0;
      data.isDetail = true;
    } else {
      data.isDetailView = false;
      getInboxList();
    }
  }

  window.addEventListener("click", function (e) {
    isShow.value = false;
    data.isInfoPopup = false;
  });
  window.addEventListener(
    "scroll",
    function () {
      if (document.getElementsByClassName("mailListContent").length) {
      } else {
        return;
      }
      var clientHeight =
        document.getElementsByClassName("mailListContent")[0].clientHeight;
      var scrollTop =
        document.getElementsByClassName("mailListContent")[0].scrollTop;
      var scrollHeight =
        document.getElementsByClassName("mailListContent")[0].scrollHeight;
      if (
        scrollTop &&
        clientHeight &&
        clientHeight + scrollTop >= scrollHeight
      ) {
        data.keyIndex = data.keyIndex + 1;
        getInboxList();
      }
    },
    true
  );
});
</script>
<style lang="less" scoped>
@import url("@/style/email.less");
@import "~@/style/icon/header/iconfont.css";
@import "~@/layout/layout.less";
.el-checkbox-group {
  font-size: 14px !important;
  line-height: unset !important;
}
.emailWrap {
  width: 100%;
  height: 100vh;
  background: #f0f2f6;
  overflow: hidden;
  font-size: 14px;
  .emailSearch {
    height: 64px;
    flex: 1;
  }
  .navSearch {
    padding: 13px 20px 13px 0;
    position: relative;
    float: left;
    margin-left: 60px;
    .el-input {
      height: 39px;
      :deep .el-input__inner {
        background: rgba(255, 255, 255, 0.4) !important;
        border: 1px solid transparent !important;
        color: #000 !important;
        text-indent: 18px;
      }
    }
    .SearchOutlined {
      position: absolute;
      left: 10px;
      top: 25px;
      color: #aaa;
      z-index: 1;
      font-size: 16px;
    }
  }
}

.emailHeader {
  width: 100%;
  height: 64px;
  background: var(--backColor);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  color: #fff;
  .emailLogo {
    width: 175px;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 19px 25px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    color: #fff;

    &:hover {
      background: #fff;

      svg {
        fill: var(--textColor);
      }

      color: var(--textColor);
    }

    svg {
      width: 26px;
      height: 26px;
    }

    .logoText {
      font-size: 20px;
      font-weight: bold;
      padding-left: 13px;
    }
  }

  .return {
    cursor: pointer;
  }
}

.emailBd {
  margin-top: 64px;
  height: calc(~"100% - 64px");
  overflow: hidden;

  .emailContainer {
    height: 100%;
    display: flex;
    .leftContainer {
      border-right: 1px solid #e4e8eb;
    }
    .leftNavPaneWrap {
      width: 220px;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      box-sizing: border-box;

      .leftEmailScroll {
        height: calc(~"100% - 52px");
        overflow-y: auto;
        margin-top: 20px;

        .emailMenuWrap {
          margin-top: 10px;

          .emailItem {
            border-radius: 2px;
            cursor: pointer;

            &:first-child {
              margin-top: 0;
            }

            .emailItemTitle {
              height: 36px;
              line-height: 36px;
              padding: 0 12px;
              box-sizing: border-box;
              color: #4e5969;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .leftIcon {
                width: 12px;

                .iconfont {
                  color: rgba(23, 26, 29, 0.6);
                  font-size: 12px;
                }
              }
              .addIcon {
                width: 20px;
                height: 20px;
                display: inline-block;
                text-align: center;
                line-height: 20px;
                .iconfont {
                  color: rgba(23, 26, 29, 0.6);
                  font-size: 12px;
                }
                &:hover {
                  background-color: rgba(0, 0, 0, 0.08);
                }
              }

              .name {
                display: inline-block;
                flex: 1;
                padding-left: 4px;
              }
            }

            .emailItemRow {
              cursor: pointer;
            }

            .emailItemRow:hover {
              background: #f2f3f5;
            }

            .menuChildren {
              .menuChildItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 36px;
                line-height: 36px;
                padding: 0 10px 0 24px;
                box-sizing: border-box;
                border-radius: 2px;
                margin-top: 4px;
                cursor: pointer;
                &:hover {
                  background: #f2f3f5;
                  //background: #CFE4FA;
                }
                .name {
                  color: #1d2129;
                  flex: 1;
                  padding-left: 14px;
                }
                .option {
                  .iconfont {
                    color: rgba(23, 26, 29, 0.6);
                  }
                }
                .num {
                  color: #242424;
                  font-size: 14px;
                }
                &.active {
                  //background: #f2f3f5;
                  background: #cfe4fa;
                  .num {
                    color: #0f548c;
                    font-weight: 600;
                  }
                }

                .emailNum {
                  width: 20px;
                  height: 20px;
                  display: inline-block;
                  text-align: center;
                  line-height: 20px;
                  color: #aaaaaa;
                  font-size: 12px;
                  position: relative;
                  border-radius: 2px;
                  .moreIcon {
                    display: none;
                    font-size: 12px;
                  }
                }
                .option {
                  display: none;
                }
                &:hover .option {
                  display: block;
                }
              }
            }
            .addTabsWrap {
              display: flex;
              padding-left: 28px;
              align-items: center;
              margin-top: 4px;
              .rightIcon {
                display: flex;
              }
              .radiusIcon {
                display: inline-block;
                width: 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                background: #f2f3f5;
                margin-left: 5px;
                cursor: pointer;
                .iconfont {
                  font-size: 16px;
                  color: #4e5969;
                  transform: scale(0.8);
                  display: inline-block;
                }
              }
            }

            .dropMenuWapper {
              position: absolute;
              width: 132px;
              background: #fff;
              border-radius: 3px;
              box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
              top: calc(100% - 10px);
              padding: 4px 0;
              box-sizing: border-box;
              overflow: auto;
              cursor: pointer;
              display: none;
              z-index: 99;
            }

            .dropMenuWapper.leftMoreDrop {
              width: 200px;
              min-height: auto;
              max-height: initial;
              top: 100% !important;
              padding-top: 0 !important;
              display: none;
              z-index: 200;
            }
          }
        }
      }
    }
    .leftNavIconWrap {
      width: 64px;
      height: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      background: #fff;
      box-sizing: border-box;
      cursor: pointer;
      .squareBtn {
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: #165dff;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        margin: 0 auto 10px;
        .iconfont {
          font-size: 12px;
        }
      }
      .navIconBox {
        width: 36px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: transparent;
        border-radius: 2px;
        color: #4e5969;
        margin: 5px auto;
        &:hover {
          background: #f2f3f5;
        }
        .iconfont {
          font-size: 22px;
        }
      }
    }
  }
}

.mailListWrap {
  width: 358px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e4e8eb;
  position: relative;

  .mailHeader {
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #e4e8eb;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .foldIcon {
      cursor: pointer;
      .iconfont {
        font-size: 12px !important;
        display: inline-block;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .titleBox {
      position: relative;
      flex: 1;
      margin-left: 5px;
      .btnText {
        font-size: 16px;
        font-weight: bold;
        color: #242424;
      }
      .btnText .iconfont {
        font-size: 12px;
      }
      &:hover .mailDropWrap {
        display: block;
      }

      .mailDropWrap {
        position: absolute;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
        padding: 4px 0;
        box-sizing: border-box;
        overflow: auto;
        cursor: pointer;
        display: none;
        z-index: 99;
        width: 198px;
        left: -30px;
        top: calc(100% - 3px);
        min-height: auto;
        max-height: inherit;

        .dropMenuItem {
          font-size: 14px;
          color: #4e5969;
          line-height: 36px;
          background: #fff;
          font-weight: normal;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            background: #f2f3f5;
            color: var(--textColor);
          }

          .name {
            padding-left: 24px;
            line-height: 36px;
          }
        }
      }
    }
  }

  .mailListContent {
    height: calc(~"100% - 45px");
    overflow-y: auto;
    box-sizing: border-box;
    display: block;
    padding-bottom: 36px;

    .mailContentItem {
      width: 100%;
      border-bottom: 1px solid #e4e8eb;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 12px 8px;
      position: relative;
      &:hover,
      &.active {
        background: #f2f3f5;
        .rightInfo .nameRow .right span {
          visibility: visible;
        }
        .middleRow .deleteAction {
          visibility: visible;
        }
      }
      &.active {
        background: #cfe4fa;
      }
      .rightInfo .nameRow .right span .iconfont {
        font-size: 12px;
        color: #aaa;
        margin-right: 6px;
        position: relative;
        top: 1px;
      }
      .rightInfo .nameRow .right span.active {
        visibility: visible;
      }
      .readElement {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid;
        background: #f53f3f;
        border-color: #f53f3f;
        display: inline-block;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
      }

      .readElement.active {
        background: #fff;
        border-color: #e4e8eb;
      }

      .avatar {
        width: 36px;
        height: 36px;
        margin-left: 6px;
        .iconfont {
          font-size: 36px;
          color: #c9cdd4;
        }
      }

      .rightInfo {
        flex: 1;
        margin-left: 8px;
        overflow: hidden;

        .nameRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 20px;

          .name {
            color: #165dff;
          }

          .right {
            display: flex;
            align-items: center;

            span {
              visibility: hidden;
            }
          }
        }
      }

      .timer {
        //color: #4e5969;
        color: #999;
        font-size: 12px;
      }

      .theme {
        width: 80%;
        line-height: 20px;
      }

      .desc {
        color: #4e5969;
        line-height: 20px;
      }
      .checkbox {
        position: absolute;
        left: 8px;
        top: 0px;
        margin-left: 0 !important;
        margin-top: 0 !important;
        border: none !important;
      }
    }
  }
}

.btnText {
  height: 44px;
  line-height: 49px;
  background: transparent;
  color: #4e5969;
  font-size: 14px;
  border-radius: 2px;
  padding: 0 4px;
  cursor: pointer;
  display: inline-block;
  .iconfont {
    vertical-align: middle;
  }
}

.btnText:hover {
  background: #f2f3f5;
}

.rowEllipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-height: 20px;
}
.emptyContent {
  flex: 1;
  padding: 24px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #1d2129;
  .emptyContentbox {
    //background: #fff;
    border-radius: 4px;
    height: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
  }
}
.el-checkbox__label {
  display: none;
}
.mailContainerWrap {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.rightContainer {
  width: 100%;
  display: flex;
  height: 100%;
  position: relative;
}
:deep .header-top-menu {
  width: 100px;
  font-size: 22px;
  position: relative;
  top: -1px;
  cursor: pointer;
  font-weight: bold;
  .icon-yingyongzhongxin {
    margin: 0 15px 0 22px !important;
    margin-left: 20px;
    font-size: 18px;
    margin-bottom: 20px;
    position: relative;
    top: -1px;
  }
}
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
.app_popup {
  width: 580px;
  height: 340px;
  background: #fff;
  position: absolute;
  top: 100%;
  z-index: 999;
  left: 0;
  box-sizing: 0 2px 2px 0 rgba(0, 0, 0, 0.6);
  border: 1px solid #d9d9d9;
  color: #333;
  overflow: auto;
  .appList .app_item .app-item-label {
    text-align: center;
    color: #fff;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .appList {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0 0;
    box-sizing: border-box;
    .app_item {
      width: 100px;
      height: 100px;
      margin-left: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      background: #3399ff;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .iconBox {
        position: relative;
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin: 0 auto 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.empty {
  background: #fff;
  padding: 8px 0 22px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg,
  img {
    width: 100px !important;
    height: auto;
  }
  .emptyDesc {
    color: #ccc;
    margin-top: 10px;
  }
}
.emailDetail {
  :deep .mailContentView {
    height: calc(~"100% - 95px") !important;
  }
}
.emailWrap {
  .icon-xiala.active {
    transform: rotate(-90deg);
    display: block;
  }
  .navSearch {
    //width: calc(~'100% - 200px');
    width: 50%;
  }
  .emailHeader .return {
    width: 240px;
    .progressWrap {
      font-size: 12px;
      text-align: left;
      margin-right: 0px;
      .progressText {
        margin-left: 5px;
      }
      :deep .ant-progress-line {
        margin-bottom: 2px;
      }
      :deep .ant-progress-text {
        color: #fff;
        font-size: 12px;
      }
      :deep .ant-progress-inner {
        background-color: #fff;
      }
      :deep .ant-progress .ant-progress-bg {
        background-color: rgb(135, 208, 104);
      }
    }
  }
  .mailListContent {
    :deep .el-checkbox-group {
      .loadingList {
        display: flex;
        justify-content: center;
        height: 100px;
        .anticon {
          font-size: 28px;
          color: #999;
        }
      }
    }
    .mailContentItem {
      :deep .el-checkbox__label {
        display: none;
      }
      .rightInfo {
        .nameRow {
          .name {
            color: #242424;
          }
          .right {
            position: relative;
            right: 15px;
          }
          .right span .iconfont {
            font-size: 15px;
            color: #aaa;
            margin: 0 7px;
            position: relative;
            top: -2px;
            right: 0px;
          }
        }
        .theme {
          color: #242424;
          width: 153px;
        }
        .desc {
          color: #616161;
        }
      }
      .middleRow {
        display: flex;
        .timer {
          font-size: 12px;
        }
        .deleteAction {
          font-size: 14px;
          color: #aaa;
          position: relative;
          left: 7px;
          visibility: hidden;
        }
      }
    }
    .mailContentItem.unReadClass {
      .nameRow .name {
        font-weight: bolder;
      }
      .theme {
        color: #1055bc;
        font-weight: bolder;
      }
    }
  }
}
.mailListWrap {
  width: 362px;
  // .m155{
  //     transform: rotate(90deg);
  // }
}
.mailHeader {
  height: 44px !important;
  line-height: 44px !important;
  padding-left: 8px !important;
  .rightBtn {
    :deep .ant-btn {
      border: none;
      color: #000;
    }
    :deep .ant-btn:hover {
      border: none;
      background: #f0f0f0;
    }
    .emaillistmenubtn1 {
      width: 32px;
      padding-inline-start: 0;
      padding-inline-end: 0;
      position: relative;
      top: 4px;
      .IconWrapContent {
        position: relative;
        top: 0px;
      }
    }
    .emaillistmenubtn2 {
      width: 32px;
      padding-inline-start: 0;
      padding-inline-end: 0;
      position: relative;
      top: 12px;
      .IconWrapContent {
        position: relative;
        top: -4px;
      }
    }
    .emaillistmenubtn3 {
      width: 32px;
      padding-inline-start: 0;
      padding-inline-end: 0;
      position: relative;
      top: 8px;
      .IconWrapContent {
        position: relative;
        top: -2px;
      }
    }
  }
}
.emaillistmenu {
  width: 130px;
  .icon-duigou {
    margin-right: 10px;
  }
  :deep .ant-dropdown-menu-item-group-title {
    font-size: 12px !important;
    font-weight: bold !important;
    padding-bottom: 5px;
  }
}
</style>
