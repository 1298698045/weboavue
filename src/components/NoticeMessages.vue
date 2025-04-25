<template>
  <div class="noticeWrap">
    <a-modal
      v-model:open="props.isShow"
      width="1000px"
      style="margin-top: 10px; top: 0"
      :maskClosable="false"
      @cancel="handleCancel"
      @ok="handleCancel"
    >
      <template #title>
        <div>通知</div>
      </template>
      <div class="modalContainer">
        <div class="modalCenter" :style="{ height: height + 'px !important' }">
          <div class="messageCenter">
            <div class="messageLeft">
              <div class="search">
                <a-input
                  v-model:value="searchVal"
                  placeholder="请输入关键字"
                  @change="getMessageType"
                >
                  <template #suffix>
                    <SearchOutlined />
                  </template>
                </a-input>
              </div>
              <div class="apps">
                <div
                  class="app-item"
                  v-for="(item, index) in MessageTypeList"
                  @click="handleTab(item, index)"
                  :class="{ active: objectTypeCode && current == index }"
                  :key="index"
                >
                  <span class="icon">
                    <img :src="require('@/assets/img/type011.png')" alt="" />
                  </span>
                  <span class="title" :title="item.Name">{{
                    item.Name || ""
                  }}</span>
                </div>
              </div>
            </div>
            <div class="messageRight">
              <div class="searchRow">
                <!-- <SearchOutlined style="font-size: 18px" /> -->
                仅显示未读
                <a-switch
                  v-model:checked="isRead"
                  size="small"
                  @change="isReadChange"
                  class="isReadSwitch"
                />
              </div>
              <div class="messages" ref="scrollDiv">
                <div class="messageMore" @click="addMore">
                  <a href="javascript:;">点击加载更多</a>
                </div>
                <div
                  class="messageItem"
                  v-for="(item, index) in MessageList"
                  :key="index"
                >
                  <div class="message-time">
                    {{
                      item.timestamp
                        ? dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss")
                        : ""
                    }}
                  </div>
                  <div class="message-content">
                    <div class="message-title" v-if="objectTypeCode&&MessageTypeList&&MessageTypeList[current]">
                      <span>{{ MessageTypeList[current].Name || "" }}</span>
                    </div>
                    <div class="message-title" v-else>
                      <span
                        v-if="
                          item.content &&
                          (item.content.type == '123' ||
                            item.content.type == '122')
                        "
                        >流程审批通知</span
                      >
                      <span
                        v-if="item.content && item.content.type == '100201'"
                      >
                        信息通知
                      </span>
                      <span v-if="item.content && item.content.type == '4'">
                        知识查看通知
                      </span>
                      <span v-if="item.content && item.content.type == '20021'">
                        邮件通知
                      </span>
                      <span
                        v-if="
                          item.content &&
                          (item.content.type == '5002' ||
                            item.content.type == '5000')
                        "
                      >
                        会议通知
                      </span>
                    </div>
                    <div class="message-detail" :class="{ isRead: item.readState=='已读' }">
                      <span>{{
                        item.content && item.content.message
                          ? item.content.message
                          : ""
                      }}</span>
                    </div>
                    <div class="message-creator">
                      创建人：{{ item.createdByName }}
                      <br />
                      创建时间：{{
                        item.createdOn
                          ? dayjs(item.createdOn).format("YYYY-MM-DD HH:mm:ss")
                          : ""
                      }}
                    </div>
                    <a
                      href="javascript:;"
                      class="message-link"
                      @click="openTo(item)"
                      >阅读详情<RightOutlined
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer> </template>
    </a-modal>
  </div>
</template>
<script setup>
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
  toRaw,
  inject,
  nextTick,
} from "vue";
import dayjs from "dayjs";
import {
  AlignCenterOutlined,
  SearchOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Dtable from "@/components/Dtable.vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
import { girdFormatterValue } from "@/utils/common.js";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const scrollDiv = ref();
const props = defineProps({
  isShow: Boolean,
});
const data = reactive({
  height: document.documentElement.clientHeight - 115,
  current: "",
  MessageTypeList: [],
  searchVal: "",
  MessageList: [],
  page: 1,
  size: 5,
  isRead: true,
  objectTypeCode: "",
});
const {
  height,
  current,
  MessageTypeList,
  searchVal,
  MessageList,
  page,
  size,
  isRead,
  objectTypeCode,
} = toRefs(data);
const emit = defineEmits(["cancel"]);
const handleCancel = () => {
  emit("cancel", false);
};
const openTo = (item) => {
  if (item && item.content && item.content.path) {
    window.open(item.content.path);
  }
};
const isReadChange = (e) => {
  data.isRead = e;
  data.page = 1;
  getMessageList();
};
const handleTab = (item, index) => {
  data.page = 1;
  data.current = index;
  data.objectTypeCode = data.MessageTypeList[index].MessageTypeCode || "";
  getMessageList();
};
const getMessageType = () => {
  data.MessageTypeList = [];
  let filterQuery = "";
  proxy
    .$post(Interface.list2, {
      filterId: "",
      objectTypeCode: "3015213",
      entityName: "MessageType",
      filterQuery: filterQuery,
      search: data.searchVal,
      page: 1,
      rows: 100,
      displayColumns: "Name,MessageTypeCode",
    })
    .then((res) => {
      if (res && res.nodes && res.nodes.length) {
        var list = [];
        for (var i = 0; i < res.nodes.length; i++) {
          var item = res.nodes[i];
          for (var cell in item) {
            if (
              cell != "id" &&
              cell != "nameField" &&
              cell != "MessageTypeCode"
            ) {
              item[cell] = girdFormatterValue(cell, item);
            }
            if (cell == "MessageTypeCode") {
              item[cell] = item[cell] ? item[cell].value : "";
            }
          }
          data.MessageTypeList.push(item);
        }
      }
    });
};
const getMessageList = () => {
  if (data.page * 1 == 1) {
    data.MessageList = [];
  }
  let url = Interface.user.messageList;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          isRead: data.isRead ? 0 : '',
          objectTypeCode: data.objectTypeCode,
          pageNumber: data.page,
          pageSize: data.size,
        },
      },
    ],
  };
  let obj = {
    message: JSON.stringify(d),
  };
  proxy.$post(url, obj).then((res) => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
      let list = res.actions[0].returnValue;
      list = list.reverse();
      list = list.concat(data.MessageList);
      data.MessageList = list;
      if (data.page * 1 == 1) {
        nextTick(() => {
          let scrollElem = scrollDiv.value;
          scrollElem.scrollTo({
            top: scrollElem.scrollHeight,
            //behavior: "smooth",
          });
        });
      }else{
        nextTick(() => {
          let scrollElem = scrollDiv.value;
          scrollElem.scrollTo({
            top: scrollElem.scrollHeight/data.page,
            //behavior: "smooth",
          });
        });
      }
    }
  });
};
const addMore = () => {
  data.page = data.page + 1;
  getMessageList();
};
onMounted(() => {
  window.addEventListener("resize", (e) => {
    data.height = document.documentElement.clientHeight - 115;
  });
  data.page = 1;
  data.current = "";
  getMessageType();
  getMessageList();
});
</script>
<style lang="less" scoped>
@import url("@/style/modal.less");
.noticeWrap .ant-modal-footer {
  display: none;
}
:deep .ant-modal-header {
  margin-bottom: 0 !important;
}
.modalCenter {
  padding: 0 !important;
}
.messageCenter {
  height: 100%;
  display: flex;
  .messageLeft {
    padding-top: 10px;
    width: 25%;
    height: 100%;
    background: #fff;
    border-right: 1px solid #e2e2e2;
    .search {
      padding: 4px 11px;
      margin-bottom: 10px;
    }
    .apps {
      height: calc(~"100% - 42px");
      overflow-y: auto;
      .app-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 20px;
        width: 100%;
        height: 40px;
        text-align: left;
        line-height: 40px;
        color: #333;
        cursor: pointer;
        transition: all 0.3s;
        border-top: 1px solid #e2e2e2;
        &:hover {
          background: #ebf9ff;
        }
        &.active {
          background: #ebf9ff;
        }
        .icon {
          display: inline-block;
          margin-right: 6px;
          width: 24px;
          height: 24px;
          font-size: 18px;
          color: #fff;
          border-radius: 50%;
          line-height: 24px;
          text-align: center;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .title {
          position: relative;
          padding: 0 4px;
          display: inline-block;
          width: 160px;
        }
      }
      .app-item:last-child{
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }
  .messageRight {
    flex: 1;
    .searchRow {
      height: 46px;
      line-height: 46px;
      background: #fff;
      border-bottom: 1px solid #eaeaea;
      text-align: right;
      padding-right: 10px;
    }
    .messages {
      background: #f9f9f9;
      height: calc(~"100% - 46px");
      overflow-y: auto;
      .messageMore {
        text-align: center;
        padding: 10px;
      }
      .messageItem {
        margin: 0 auto;
        padding: 10px 0;
        color: #999;
        width: 500px;
        .message-time {
          font-size: 12px;
          margin-top: 0;
          margin-bottom: 10px;
          text-align: center;
        }
        .message-content {
          text-align: left;
          position: relative;
          padding: 2px 12px 8px;
          background: #fff;
          border: 1px solid #e2e2e2;
          .message-title {
            margin-top: 4px;
            margin-bottom: 4px;
            color: #666;
            font-weight: 700;
            font-size: 14px;
          }
          .message-detail {
            min-height: 40px;
            max-height: 148px;
            color: #333;
            overflow: hidden;
            line-height: 16px;
            font-weight: bolder;
          }
          .message-detail.isRead{
            font-weight: normal;
          }
          .message-creator {
            margin-bottom: 0px;
            min-height: 50px;
            max-height: 150px;
            overflow: hidden;
            font-size: 12px;
          }
          .message-link {
            color: #999;
            padding-top: 6px;
            border-top: 1px solid #ebebeb;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:hover {
              color: var(--textColor);
            }
          }
        }
      }
    }
  }
}
.messageCenter {
  .messageRight {
    .searchRow {
      height: 40px;
      line-height: 33px;
      color: #86909c;
      .isReadSwitch {
        position: relative;
        top: -2px;
        margin-left: 5px;
      }
    }
    .messages {
      height: calc(~"100% - 40px");
    }
  }
}
.modalCenter {
  overflow: hidden !important;
  .messageLeft {
    padding-top: 0;
    .search {
      margin-bottom: -1px;
      position: relative;
      top: -4px;
    }
  }
}
</style>
