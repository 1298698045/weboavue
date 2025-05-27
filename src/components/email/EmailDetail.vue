<template>
  <div class="emailDetail">
    <div class="mailSubject">
      <div class="title rowEllipsis">
        {{ detail.subject || "暂无标题" }}
      </div>
      <div class="emailOption">
        <a-button class="ml5" @click="handleReply">回复</a-button>
        <a-button class="ml5" @click="handleShare">转发</a-button>
        <!-- <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick" style="width: 150px;">
                            <a-menu-item key="1">
                                通知
                            </a-menu-item>
                        </a-menu>
                    </template>
<a-button class="ml5">移动</a-button>
</a-dropdown> -->
        <a-button class="ml5" @click="changeEmailLabel">移动</a-button>
        <a-button class="ml5" @click="handleDeleteEmail">删除</a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleUnRead">
                <i class="iconfont icon-weiduyoujian"></i>
                设为未读邮件
              </a-menu-item>
              <a-menu-item key="2" @click="handleStar(1)">
                <i class="iconfont icon-zhongyaoyoujian"></i>
                设为重要邮件
              </a-menu-item>
              <a-menu-item key="3" @click="handleReply"> 回复 </a-menu-item>
              <a-menu-item key="4" @click="handleShare"> 转发 </a-menu-item>
              <a-menu-item key="5" @click="handleDeleteEmail">
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button :icon="h(EllipsisOutlined)" class="ml5"> </a-button>
        </a-dropdown>
        <a-button
          :icon="h(CloseOutlined)"
          class="ml5"
          @click="closeDetail"
          title="点击关闭详情"
        >
        </a-button>
      </div>
    </div>
    <div class="mailContentView">
      <div
        style="
          border-bottom: 1px solid rgb(228, 232, 235);
          padding-bottom: 10px;
        "
      >
        <div class="formPeopleWrap">
          <div class="avatar">
            <i class="iconfont icon-morentouxiang"></i>
          </div>
          <div class="emailInfo">
            <div class="nameRow">
              <a-tooltip title="点击标记未读" placement="bottom">
                <span
                  class="readElement"
                  :class="{ active: detail.isRead != false }"
                ></span>
              </a-tooltip>
              <span class="name">{{ detail.fromName || "" }}</span>
              <span class="emailText" :class="{ active: detail.isRead }">{{
                detail.ToEmailAddr || ""
              }}</span>
            </div>
            <div class="rowLabel">
              <span class="label">收件人：</span>
              <div class="fullNameList" v-if="receiverNames != ''">
                <span
                  class="emailFullName"
                  v-for="(item, index) in receiverNames"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
            </div>
            <div class="emailTitleBox" v-if="isEmailTitle">
              {{ detail.subject || "" }}
            </div>
          </div>
          <div class="emailOther">
            <div class="timerRow">
              <a-tooltip
                placement="top"
                :title="
                  detail.starEmail * 1 == 1
                    ? '点击取消重要邮件'
                    : '点击标记重要邮件'
                "
              >
                <span
                  @click.stop="handleStar(detail.starEmail * 1 == 1 ? 0 : 1)"
                >
                  <i
                    v-if="detail.starEmail * 1 == 1"
                    class="iconfont icon-shoucangyoujian"
                    style="color: #f7ba1e; opacity: 1"
                  ></i>
                  <i v-else class="iconfont icon-zhongyaoyoujian"></i>
                </span>
              </a-tooltip>
              {{ detail.createdOn || "" }}
            </div>
            <div class="detailText">
              <a-tooltip
                :title="!isDetail ? '展开详情信息' : '收起详情信息'"
                placement="bottom"
              >
                <button class="btnText" @click="handleClickText">
                  详情
                  <i
                    class="iconfont icon-xiala"
                    :class="{ active: isEmailTitle }"
                  ></i>
                </button>
              </a-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="inboxWrap">
        <div class="inboxBd">
          <div class="richText" v-html="detail.body"></div>
          <div
            class="inboxFileWrap"
            v-if="attachments && attachments.length > 0"
          >
            <div class="inboxFileHead">
              <i class="iconfont icon-fujianwenjian"></i>
              附件{{ attachments && attachments.length }}个
              <!--<span class="shu" v-if="attachments && attachments.length>=2">|</span>
                                        <span class="linkText">打包下载</span>-->
            </div>
            <div
              class="inboxFileList"
              v-if="attachments && attachments.length > 0"
            >
              <div
                class="inboxFileItem"
                v-for="(item, index) in attachments"
                :key="index"
              >
                <div class="leftImg">
                  <img
                    src="/src/assets/img/filetype/doc.png"
                    v-if="
                      item.fileExtension == 'ocx' ||
                      item.fileExtension == 'docx' ||
                      item.fileExtension == 'doc' ||
                      item.fileExtension == '.ocx' ||
                      item.fileExtension == '.docx' ||
                      item.fileExtension == '.doc' ||
                      item.fileExtension == 'wps' ||
                      item.fileExtension == '.wps'
                    "
                  />
                  <img
                    src="/src/assets/img/filetype/rar.png"
                    v-else-if="
                      item.fileExtension == 'rar' ||
                      item.fileExtension == 'zip' ||
                      item.fileExtension == '.rar' ||
                      item.fileExtension == '.zip'
                    "
                  />
                  <img
                    src="/src/assets/img/filetype/Excel.png"
                    v-else-if="
                      item.fileExtension == 'xlsx' ||
                      item.fileExtension == 'xls' ||
                      item.fileExtension == '.xlsx' ||
                      item.fileExtension == '.xls'
                    "
                  />
                  <img
                    src="/src/assets/img/filetype/Pdf.png"
                    v-else-if="
                      item.fileExtension == 'pdf' ||
                      item.fileExtension == '.pdf'
                    "
                  />
                  <img
                    src="/src/assets/img/filetype/PPT.png"
                    v-else-if="
                      item.fileExtension == 'ppt' ||
                      item.fileExtension == '.ppt'
                    "
                  />
                  <img
                    src="/src/assets/img/filetype/defaultImg.png"
                    v-else-if="
                      item.fileExtension == 'jpg' ||
                      item.fileExtension == 'png' ||
                      item.fileExtension == '.jpg' ||
                      item.fileExtension == '.png'
                    "
                  />
                  <img src="/src/assets/img/filetype/Folder.png" v-else />
                </div>
                <div class="rightFileInfo">
                  <div class="fileName rowEllipsis">
                    {{ item.name || "" }}
                  </div>
                  <div class="fileSize">{{ item.size || "" }}</div>
                  <div class="fileOptionShow" :title="item.name || ''">
                    <div class="btns">
                      <a-tooltip title="保存到文档" placement="top">
                        <a-button
                          class="btn square default"
                          title="保存到文档"
                          @click="saveToContent(item)"
                        >
                          <i class="iconfont icon-baocundaoyoupan"></i>
                        </a-button>
                      </a-tooltip>
                      <a-tooltip title="预览" placement="top">
                        <a-button
                          class="btn square default"
                          @click="handlePreviewFile(item)"
                          title="预览"
                        >
                          <i class="iconfont icon-yulanwenjian"></i>
                        </a-button>
                      </a-tooltip>
                      <a-tooltip title="下载" placement="top">
                        <a-button
                          class="btn square default"
                          @click="downloadFile(item)"
                          title="下载"
                        >
                          <i class="iconfont icon-xiazai"></i>
                        </a-button>
                      </a-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChangeLabel
      :isShow="isLabel"
      v-if="isLabel"
      :id="props.emailId"
      @cancel="isLabel = false"
    />
    <NewContent
      v-if="isNewContent"
      :isShow="isNewContent"
      :name="fileName"
      :treeData="gData"
      @cancel="isNewContent = false"
      :objectTypeCode="'20021'"
      :FolderId="''"
    />
    <ImageView
      v-if="isPhoto"
      :isShow="isPhoto"
      :photoParams="photoParams"
      @cancel="isPhoto = false"
    />
    <PdfView
      v-if="isPdf"
      :isShow="isPdf"
      :pdfParams="pdfParams"
      @cancel="isPdf = false"
    />
    <TxtView
      v-if="isTxt"
      :isShow="isTxt"
      :txtParams="txtParams"
      @cancel="isTxt = false"
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
import {
  EllipsisOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import ChangeLabel from "@/components/email/ChangeLabel.vue";
import NewContent from "@/components/information/NewInfo.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  emailId: String,
});
const emit = defineEmits(["cancel", "reply", "share"]);
const data = reactive({
  isDetail: false,
  isLabel: false,
  isEmailTitle: false,
  detail: { Subject: "" },
  ltags: "inbox",
  receiverNames: [],
  attachments: [
    // {
    //     "attachId": "79354244-3BAB-44A2-BD10-80FA622CD0A8",
    //     "name": "1.jpg",
    //     "description": null,
    //     "fileTypeCode": 0,
    //     "fileLocation": "/202411/14/9445b88b-2647-4974-b4e2-2cdce80ec053/20241125102002337.jpg",
    //     "fileExtension": ".jpg",
    //     "fileSize": 1012086,
    //     "parentTypeCode": null,
    //     "parentId": "9445B88B-2647-4974-B4E2-2CDCE80EC053",
    //     "parentName": "",
    //     "isFromFile": false,
    //     "organizationId": null,
    //     "storageNode": "",
    //     "createdOn": "2024-11-25 10:20:02.0",
    //     "size":'1.6kb'
    // }
  ],
  isDelete: false,
  currentUserId: "",
  currentUserName: "",
  isNewContent: false,
  fileName: "",
  isPhoto: false,
  photoParams: {},
  isPdf: false,
  pdfParams: {},
  ImageList: [],
  isTxt: false,
  txtParams: {},
});
const {
  isTxt,
  txtParams,
  pdfParams,
  isPdf,
  photoParams,
  ImageList,
  isPhoto,
  fileName,
  isNewContent,
  isLabel,
  currentUserId,
  currentUserName,
  isDetail,
  isEmailTitle,
  detail,
  receiverNames,
  isDelete,
  attachments,
} = toRefs(data);

const handleClickText = () => {
  data.isDetail = !data.isDetail;
  data.isEmailTitle = !data.isEmailTitle;
};

const getDetail = () => {
  // proxy.$get(Interface.email.emailInfo,{
  //     id: props.emailId,
  //     ltags: data.ltags
  // }).then(res=>{
  //     data.detail = res.data;
  //     data.receiverNames = data.detail.ReceiverNames && data.detail.ReceiverNames.split(',');

  // })
  proxy
    .$get(Interface.email.getMail, {
      id: props.emailId,
    })
    .then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].returnValue &&
        res.actions[0].returnValue
      ) {
        data.detail = res.actions[0].returnValue;
        data.receiverNames = data.detail.toUserNames
          ? data.detail.toUserNames.split(",")
          : [];
        if (data.detail.isGroupmail) {
          data.receiverNames = data.detail.toGroupNames
            ? data.detail.toGroupNames.split(",")
            : [];
        }
        if (data.receiverNames && data.receiverNames.length == 0) {
          data.receiverNames = [data.currentUserName];
        }
        //data.attachments=res.actions[0].returnValue.attachments||[];
      }
    });
};
const getAttachments = () => {
  data.ImageList = [];
  data.attachments = [];
  var list2 = [];
  proxy
    .$get(Interface.email.getAttachments, {
      id: props.emailId,
    })
    .then((res) => {
      if (
        res &&
        res.actions &&
        res.actions[0] &&
        res.actions[0].returnValue &&
        res.actions[0].returnValue
      ) {
        data.attachments = res.actions[0].returnValue || [];
        for (var i = 0; i < data.attachments.length; i++) {
          var item = data.attachments[i];
          let size = item.fileSize;
          size = size ? ((size * 1) / 1024).toFixed(2) : 0;
          size = size + "kb";
          data.attachments[i].size = size;
          data.attachments[i]["uid"] = item.attachId;
          data.attachments[i]["id"] = item.attachId;
          data.attachments[i]["Name"] = item.name;
          data.attachments[i]["downloadUrl"] =
            item.downloadUrl && item.downloadUrl != "undefined"
              ? item.downloadUrl
              : item.fileLocation || "";
          data.attachments[i]["viewUrl"] =
            item.viewUrl && item.viewUrl != "undefined"
              ? item.viewUrl
              : item.fileLocation || "";
          let name = item.name || "";
          if (name) {
            name = name.replaceAll("." + item.fileExtension, "");
          }
          data.attachments[i]["url"] = "/" + item.parentId + "/" + name;
          if (
            item.fileExtension == "jpg" ||
            item.fileExtension == "jpeg" ||
            item.fileExtension == "png"
          ) {
            list2.push(item);
          }
        }
        data.ImageList = list2;
      }
    });
};
watch(
  () => props.emailId,
  (newVal, oldVal) => {
    getDetail();
    getAttachments();
  },
  { immediate: true, deep: true }
);
const handleDeleteEmail = () => {
  //data.isDelete = true;
  emit("delete", { id: props.emailId });
};
const cancelDelete = (e) => {
  data.isDelete = e;
};

const deleteEmail = () => {
  data.isDelete = false;
};
const closeDetail = () => {
  emit("cancel", "");
};
const handleMenuClick = () => {};
// 未读邮件
const handleUnRead = () => {
  // proxy.$get(Interface.email.read,{
  //     ids: props.emailId,
  //     isRead: 0
  // }).then(res=>{
  //     message.success("设置成功!");
  // })
  let IsRead = false;
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.emailId,
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
      message.success("设置成功！");
      getDetail();
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
        message.success("设置失败！");
      }
    }
  });
};
// 重要邮件
const handleStar = (type) => {
  // proxy.$get(Interface.email.star,{
  //     Id: props.emailId,
  //     IsStar: 1
  // }).then(res=>{
  //     message.success("设置成功!");
  // })
  let StarEmail = type;
  let url = Interface.edit;
  let d = {
    actions: [
      {
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
          recordId: props.emailId,
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
      message.success("设置成功！");
      getDetail();
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
        message.success("设置失败！");
      }
    }
  });
};
// 回复
const handleReply = () => {
  let ltagsData = {
    name: "",
    id: "",
    body: "",
    emailId: props.emailId,
    type: "回复",
  };
  emit("reply", ltagsData);
};
// 转发
const handleShare = () => {
  let ltagsData = {
    name: "",
    id: "",
    body: "",
    emailId: props.emailId,
    type: "转发",
  };
  emit("share", ltagsData);
};
// 移动到邮件标签
const changeEmailLabel = () => {
  data.isLabel = true;
};
const gData = ref([]);
//保存到文档
const saveToContent = (item) => {
  data.fileName = item.name;
  if (gData.value && gData.value.length) {
    data.isNewContent = true;
  } else {
    let url = Interface.content.folder.get;
    let d = {
      actions: [
        {
          id: "2919;a",
          descriptor: "",
          callingDescriptor: "UNKNOWN",
          params: {},
        },
      ],
    };
    let obj = {
      message: JSON.stringify(d),
    };
    proxy.$post(url, obj).then((res) => {
      if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
        let formTree = (list) => {
          list.forEach((item) => {
            if (item.children) {
              formTree(item.children);
            }
            item.key = item.id;
            item.value = item.id;
            item.isFavor = item.isFavor || false;
          });
        };
        let response = res.actions[0].returnValue;
        formTree(response);
        //console.log("formTree",response);
        gData.value = response;
        data.isNewContent = true;
      }
    });
  }
};
const windowOpen = (url, fileName) => {
  var xhr = new XMLHttpRequest();
  // var fileName = window.fileName + typeName; // 文件名称
  xhr.open("POST", url, true);
  xhr.responseType = "blob";

  //xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
  //xhr.setRequestHeader('token', window.localStorage.getItem('token'));
  xhr.onload = function (res) {
    if (this.status === 200) {
      var type = xhr.getResponseHeader("Content-Type");
      var blob = new Blob([this.response], { type: type });
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        /*
         * For IE
         * >=IE10
         */
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        /*
         * For Non-IE (chrome, firefox)
         */
        var URL = window.URL || window.webkitURL;
        var objectUrl = URL.createObjectURL(blob);
        if (fileName) {
          var a = document.createElement("a");
          if (typeof a.download === "undefined") {
            window.location = objectUrl;
          } else {
            a.href = objectUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        } else {
          window.location = objectUrl;
        }
      }
    }
  };
  xhr.send();
};
//预览附件
const handlePreviewFile = (item) => {
  if (item.fileExtension) {
    item.fileExtension = item.fileExtension.replace(".", "");
  }
  let url = "";
  if (
    item.fileExtension == "jpg" ||
    item.fileExtension == "jpeg" ||
    item.fileExtension == "png"
  ) {
    let index = 0;
    for (var i = 0; i < data.ImageList.length; i++) {
      let ite = data.ImageList[i];
      if (ite.id == item.id) {
        index = i;
      }
    }
    data.photoParams = {
      id: item.id,
      item: item,
      imageList: data.ImageList,
      index: index,
    };
    data.isPhoto = true;
  } else if (item.fileExtension == "pdf") {
    //url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
    data.pdfParams = {
      id: item.id,
      name: item.name,
      index: 0,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl,
    };
    data.isPdf = true;
  } else if (item.fileExtension == "txt") {
    data.txtParams = {
      name: item.name,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl,
    };
    data.isTxt = true;
  } else if (
    item.fileExtension == "docx" ||
    item.fileExtension == "pptx" ||
    item.fileExtension == "xlsx" ||
    item.fileExtension == "doc" ||
    item.fileExtension == "ppt" ||
    item.fileExtension == "xls" || item.fileExtension == "wps"
  ) {
    item.viewUrl = "/lightning/r/office/view?id=" + item.id;
    openControlViewFile(
      item.id,
      item.createdByName,
      item.fileExtension,
      item.viewUrl,
      item.name
    );
  } else {
    downloadFile(item);
  }
};
//预览office文件
const openControlViewFile = (id, username, type, link, name) => {
  var mhtmlHeight = window.screen.availHeight; //获得窗口的垂直位置;
  var mhtmlWidth = window.screen.availWidth; //获得窗口的水平位置;
  var iTop = 0; //获得窗口的垂直位置;
  var iLeft = 0; //获得窗口的水平位置;
  //window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + username);
  window.open(
    "/#" + link + "&entityName=MailAttachBase",
    "",
    "height=" +
      mhtmlHeight +
      ",width=" +
      mhtmlWidth +
      ",top=" +
      iTop +
      ",left=" +
      iLeft +
      ",toolbar=no,menubar=yes,scrollbars=no,resizable=yes, location=no,status=no"
  );
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
  //let text = item.Name;
  //windowOpen(url, text);
};
onMounted(() => {
  let userInfo = window.localStorage.getItem("userInfo");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    data.currentUserId = userInfo.userId;
    data.currentUserName = userInfo.fullName;
  }
});
</script>
<style lang="less" scoped>
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

.emailDetail {
  width: 100%;
  height: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  overflow: hidden;

  .mailSubject {
    height: 70px;
    line-height: 70px;
    display: flex;
    justify-content: space-between;

    .title {
      flex: 1;
      font-size: 18px;
      color: #080707;
      font-weight: bold;
      margin-right: 20px;
      padding-left: 2px;
    }

    .emailOption {
      text-align: right;
    }
  }

  .mailContentView {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;

    .formPeopleWrap {
      display: flex;
      padding-bottom: 0;
      border-bottom: none;

      .avatar {
        width: 28px;
        height: 28px;
        color: #c9cdd4;

        .iconfont {
          font-size: 28px;
        }
      }

      .emailInfo {
        flex: 1;
        margin-left: 10px;

        .nameRow {
          line-height: 28px;

          .name {
            color: #165dff;
            padding-left: 5px;
          }

          .emailText {
            color: #4e5969;
          }
        }

        .rowLabel {
          display: flex;
          overflow: hidden;

          .label {
            min-width: 58px;
            display: inline-block;
            color: #4e5969;
            line-height: 24px;
          }

          .fullNameList {
            flex: 1;
            display: flex;
            flex-wrap: wrap;

            .emailFullName {
              padding: 3px 4px;
              background: #e8f3ff;
              display: inline-block;
              border-radius: 2px;
              cursor: pointer;
              margin-bottom: 5px;
              margin-right: 5px;
            }
          }
        }

        .emailTitleBox {
          line-height: 1.5;
          color: #1d2129;
          margin-top: 13px;
        }
      }

      .emailOther {
        color: #4e5969;

        .timerRow {
          font-size: 12px;
          color: #424242;
        }

        .btnText {
          padding-left: 10px;
          padding-right: 0;
        }

        .iconfont {
          padding-right: 10px;
          cursor: pointer;
          opacity: 0.6;
          font-size: 14px;
          color: #4e5969;
        }

        .detailText {
          margin-top: 10px;
          cursor: pointer;
          text-align: right;
          color: #1d2129;
        }
      }
    }
  }

  .richText {
    padding: 20px 15px;
  }
}

.inboxFileWrap {
  .inboxFileList {
    display: flex;
    flex-wrap: wrap;

    .inboxFileItem {
      width: 266px;
      border-radius: 2px;
      background: #f2f3f5;
      padding: 10px;
      box-sizing: border-box;
      margin-right: 16px;
      margin-bottom: 16px;
      cursor: pointer;
      display: flex;
      overflow: hidden;
      position: relative;

      .leftImg {
        width: 32px;
        height: 32px;
        position: relative;
        top: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .rightFileInfo {
        flex: 1;
        margin-left: 14px;
        overflow: hidden;
        color: #1d2129;

        .fileSize {
          color: #4e5969;
          padding-top: 4px;
        }

        .fileOptionShow {
          position: absolute;
          width: calc(~"100% - 36px");
          height: 100%;
          left: 42px;
          top: 0;
          background: rgba(242, 243, 245, 0.8);
          display: none;

          .btns {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: flex-end;
            padding-right: 20px;
            box-sizing: border-box;
          }
        }
      }

      &:hover .fileOptionShow {
        display: block;
      }
    }
  }

  .inboxFileHead {
    font-size: 12px;
    margin-bottom: 5px;
    color: #242424;

    .iconfont {
      font-size: 12px;
    }
  }

  :deep .ant-btn:hover {
    color: rgba(0, 0, 0, 0.88);
    background-color: rgba(0, 0, 0, 0.06);
    border: none;
    box-shadow: none;
  }

  :deep .ant-btn {
    width: 32px;
    padding-inline-start: 0;
    padding-inline-end: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
  }
}
</style>
