<template>
  <div class="ContentViewTemplateEditorWrap">
    <div class="preview-header">
      <div class="icon-circle-base">
        <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
      </div>
      <div class="leftBox">
        <div class="title">
          <div>
            <span class="doc-title">
              {{ title }}
              <!-- <a-input v-model:value="detail.Title" :placeholder="'文档标题'" @change="handleSave(1)"></a-input> -->
            </span>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <!-- <a-button type="primary" class="ml10">内部分享</a-button> -->
        <!-- <a-button type="primary" class="ml10" @click="handleEdit">编辑</a-button>
          <a-button type="primary" class="ml10" @click="handleDelete">删除</a-button> -->
        <!-- <a-button class="ml10" @click="changeStatus">更改状态</a-button> -->
        <!-- <a-button class="ml10" @click="handlePreview">预览</a-button> -->
        <!-- <a-button class="ml10" @click="handleRemind">提醒</a-button> -->
        <a-button type="primary" class="ml10" @click="handleSave">保存</a-button>
        <a-button class="ml10" @click="closeEditor">关闭</a-button>
        <!-- <a-button type="primary" class="ml10" @click="handleSubmit">发布</a-button>
          <a-button class="ml10" @click="closeEditor">关闭</a-button> -->
        <a-dropdown :trigger="['hover']" class="ml10">
          <span class="btn-drop">
            <UnorderedListOutlined style="color: #1d2129" />
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="handleNotes"> 备注 </a-menu-item>
              <!-- <a-menu-item @click="handleCancelRelease">
                    取消发布
                </a-menu-item>
                <a-menu-item @click="handleDetail">
                    查看详情
                </a-menu-item> -->
              <!-- <a-menu-item>
                    预览
                </a-menu-item> -->
              <!-- <a-menu-item key="4" @click="handleNotes"> 备注 </a-menu-item> -->
              <!-- <a-menu-item key="1"> 内部分享 </a-menu-item> -->
              <!-- <a-menu-item key="1"> 查看范围 </a-menu-item>
                <a-menu-item key="2"> 邀请查看者 </a-menu-item>
                <a-menu-item key="3"> 邀请所有人 </a-menu-item>
                <a-menu-item key="4" @click="handleNotes"> 备注 </a-menu-item>
                <a-menu-item key="5" @click="handleAddClass">添加分类</a-menu-item> -->
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="detail-bd">
        <div class="tabContainer containerForm" v-if="activeKey == 0">
          <div class="tableBox">
            <a-form :model="formState" ref="formRef">
              <div class="section">
                <div class="sectionTitle">基本信息</div>
                <div class="sectionRow">
                  <div class="sectionItem">
                    <a-form-item name="Name" label="模板名称" :rules="[{ required: true, message: '模板名称不能为空' }]">
                      <a-input v-model:value="formState.Name" class="ContentViewTemplateName"></a-input>
                    </a-form-item>
                  </div>
                </div>
              </div>
              <div class="section">
                <div class="sectionTitle">模板内容</div>
                <div class="sectionRow">
                  <div class="sectionItem sectionItem1">
                    <a-form-item name="Content" label="" :rules="[{ required: true, message: '模板内容不能为空' }]">
                      <div class="ContentViewTemplateContent">
                        <Editor v-if="isEditor" :mode="'doc'" placeholder="" ref="editorRef" :height="height"
                          @input="getContent" />
                        <div class="wea-doc-mould-rich-text-right-list">
                          <div class="special-field-wrapper " style="width: 180px; box-sizing: border-box;">
                            <div style="border-left: 1px solid rgb(228, 228, 228);">
                              <div style="padding: 4px 7px 6px; border-bottom: 1px solid rgb(228, 228, 228);">
                                <div class="wea-input-focus ">
                                  <span class="ant-input-wrapper">
                                    <a-input placeholder="输入变量关键字搜索" @change="onSearch" v-model:value="searchVal"
                                      allowClear class="ant-input" type="text" value="" />
                                  </span>
                                  <button type="button"
                                    class="ant-btn ant-btn-ghost ant-btn-icon-only  wea-input-focus-btn">
                                    <SearchOutlined />
                                  </button>
                                  <span class="placeHolder-tip" id="weaInputSearch_1"></span>
                                </div>
                              </div>
                              <div class="special-field-wrapper-single ">
                                <div class="wea-new-scroll " style="height: 497px;">
                                  <div class="clipper  baron" style="overflow: hidden;">
                                    <div class="scroller  "
                                      style="overflow-y: scroll; box-sizing: border-box; margin: 0px; border: 0px;">
                                      <ul style="padding: 7px 0px;">
                                        <li class="special-field-item text-overflow" v-for="(item, index) in FieldList"
                                          :name="item.name" :key="index" :class="{ 'actived': SelectFieldId == item.id }"
                                          @click="SelectField(item)">{{ item.label || '' }}</li>
                                      </ul>
                                    </div>
                                    <div class="track ">
                                      <div class="bar" style="height: 143px; top: 0px;"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <InfoNotes v-if="isNotes" :isShow="isNotes" :id="id" :objectTypeCode="objectTypeCode" @cancel="cancelNotes" />
    <ChangeStatus :isShow="isStatus" v-if="isStatus" :id="id" :objectTypeCode="objectTypeCode" @cancel="cancelStatus" />
    <InfoRemind v-if="isRemind" :isShow="isRemind" :id="id" @cancel="cancelRemind" :RegardingObjectIdName="detail.Title"
      :RegardingObjectTypeCode="objectTypeCode" />
    <InfoAddClass v-if="isAddClass" :isShow="isAddClass" :id="id" :objectTypeCode="objectTypeCode"
      @cancel="cancelAddClass" />
    <RadioUser v-if="isRadioUser" :isShow="isRadioUser" @cancel="cancleRadio" @selectVal="handleSelectUser" />
    <RelaseInfo v-if="isRelaseInfo" :isShow="isRelaseInfo" :objectTypeCode="objectTypeCode" :id="id"
      :FolderId="FolderId" @cancel="cancelRelaseInfo" />
    <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk"
      :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle"
      @cancel="isConfirm = false" @ok="isConfirm = false" :id="id" />
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  defineEmits,
  toRaw,
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
  UnorderedListOutlined,
  DownOutlined,
  CaretDownOutlined,
  DeleteFilled,
  DeleteOutlined,
  PlusOutlined,
  LikeOutlined,
  TagOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  UserOutlined,
  ProfileOutlined,
  CarryOutOutlined,
  PaperClipOutlined,
  SearchOutlined
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import Related from "@/components/detail/Related.vue";
import Info from "@/components/detail/Info.vue";
import InfoNotes from "@/components/commonModal/RelatedNote.vue";
import ChangeStatus from "@/components/information/ChangeStatus.vue";
import InfoRemind from "@/components/information/InfoRemind.vue";
import InfoAddClass from "@/components/information/InfoAddClass.vue";
import ReadRecord from "@/components/information/ReadRecord2.vue";
import DocLog from "@/components/documentAdmin/DocLog.vue";
import Comment from "@/components/detail/Comment2.vue";
import Editor from "@/components/TEditor.vue";
import RadioUser from "@/components/commonModal/RadioUser.vue";
import RelaseInfo from "@/components/information/RelaseInfo.vue";
//import DetailInfoEdit from "@/components/detail/DetailInfoEdit.vue";
import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import { girdFormatterValue } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
const editorRef = ref();
const route = useRoute();
const router = useRouter();
const data = reactive({
  tabs: [
    {
      label: "正文内容",
    },
    {
      label: "文档属性",
    },
    {
      label: "文档附件",
    },
  ],
  activeKey: 0,
  id: route.query.id,
  objectTypeCode: '5081',
  sObjectName: 'ContentViewTemplate',
  detail: {},
  isNotes: false,
  isStatus: false,
  isRemind: false,
  isAddClass: false,
  isUserModal: false,
  fileCategorys: [],
  files: [],
  content: '',
  isDelete: false,
  deleteDesc: '确定要删除吗？',
  external: false,
  isRelaseInfo: false,
  isEditor: false,
  height: 0,
  FolderId: route.query.FolderId || '',
  isRadioUser: false,
  IsReply: false,
  isConfirm: false,
  confirmText: '',
  confirmTitle: '',
  title: '新建显示模板',
  FieldList: [],
  FieldListAll: [],
  SelectFieldId: '',
  searchVal: ''
});
const {
  tabs,
  activeKey,
  id,
  objectTypeCode,
  detail,
  isNotes,
  isStatus,
  isRemind,
  isAddClass,
  isUserModal,
  fileCategorys,
  files,
  content,
  sObjectName,
  isDelete,
  deleteDesc,
  external,
  isRelaseInfo,
  isEditor,
  height,
  FolderId,
  isRadioUser,
  IsReply, isConfirm, confirmText, confirmTitle, title, FieldList, FieldListAll, SelectFieldId, searchVal
} = toRefs(data);
const ReadRecordLst = ref();
const DetailInfoEditRef = ref(null);
const expandIconPosition = ref("start");
const handleClick = (event) => {
  event.stopPropagation();
};
const refreshData = (e) => {
  if (ReadRecordLst.value && ReadRecordLst.value.getQuery) {
    ReadRecordLst.value.getQuery();
  }
}
const formRef = ref();
const formState = reactive({
  Name: '',
  Content: ''
});
const defaultContent = `<p>&nbsp;</p>
<div align="center">
<div style="background: rgb(233, 233, 233); margin: 0px auto; padding: 4px; border: 1px solid rgb(194, 194, 194); width: 950px; line-height: 22px;">
<div align="left" style="background: url(&quot;Six_01.gif&quot;) repeat-x 50% top rgb(255, 255, 255); padding: 20px 40px; border: 1px solid rgb(255, 255, 255);">
<div style="text-align: left; color: rgb(128, 128, 128); padding-bottom: 10px; font-size: 12px; border-bottom-color: rgb(216, 216, 216); border-bottom-width: 1px; border-bottom-style: dashed;">
<p><img alt="" class="formImgPlay" data-imgsrc="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab858d70e7e4327e75746e8662b6d7f37c27" onclick="ecCom.WeaRichText.playImg(this)" src="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab858d70e7e4327e75746e8662b6d7f37c27" style="float:right" /></p>

<p>发布日期：{{CreatedOn}}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img alt="" src="/weaver/weaver.file.FileDownload?fileid=aa2b9e044e6550c02fa4e089030305b7b0d8d57178121db74b41566603469b9f46f54a99481bb0aee8d70e7e4327e75746e8662b6d7f37c27" style="float:right" /></p>

<p>所属目录：{{FolderId}}&nbsp;&nbsp;&nbsp;&nbsp; 文档编号：{{DocNumber}}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img alt="" class="formImgPlay" data-imgsrc="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab850aee9b3134d0510871362141037cfb4e" onclick="ecCom.WeaRichText.playImg(this)" src="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab850aee9b3134d0510871362141037cfb4e" style="float:right" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img alt="" class="formImgPlay" data-imgsrc="/weaver/weaver.file.FileDownload?fileid=a2ea10cc802e27d0e73ca7bbfe2a4e02b91d9a7e09fc988e4d62cc587ec32bfd8fe266f7416e7d8470aee9b3134d0510871362141037cfb4e" onclick="ecCom.WeaRichText.playImg(this)" src="/weaver/weaver.file.FileDownload?fileid=a2ea10cc802e27d0e73ca7bbfe2a4e02b91d9a7e09fc988e4d62cc587ec32bfd8fe266f7416e7d8470aee9b3134d0510871362141037cfb4e" style="float:right" /><img alt="" class="formImgPlay" data-imgsrc="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab850aee9b3134d0510871362141037cfb4e" onclick="ecCom.WeaRichText.playImg(this)" src="/weaver/weaver.file.FileDownload?fileid=a64e15eefcc5614665811efb8ebf4a55a5216f1d9228e1aff195f08eb3390703ffe356ff22dfeab850aee9b3134d0510871362141037cfb4e" style="float:right" /></p>
</div>

<h2 style="color: rgb(0, 0, 0); line-height: 85px; font-family: &quot;Microsoft YaHei&quot;; font-size: 24px; text-align: center;"><span style="font-family: 仿宋_GB2312,FangSong_GB2312 !important;">{{Title}}</span></h2>

<p style="text-align: center; color: rgb(128, 128, 128); font-family: &quot;宋体&quot; !important; font-size: 12px; font-weight: normal;">创建人：{{CreatedBy}} &nbsp; &nbsp; &nbsp; &nbsp; 创建部门：{{BusinessUnitId}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 状态：{{StatusCodeName}}</p>

<p style="height: 1px; line-height: 1px; text-indent: 2em; font-size: 0px; border-top-color: rgb(191, 191, 191); border-bottom-color: rgb(216, 216, 216); border-top-width: 1px; border-bottom-width: 1px; border-top-style: solid; border-bottom-style: solid;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>

<div>
<p style="line-height: 1.75em; text-indent: 2em;">{{Content}}</p>

<p style="text-align: right;"><span style="font-size: 12px;">该文档最后由 {{CreatedBy}}&nbsp; 更新于 {{ModifiedOn}}。</span></p>
</div>
</div>
</div>
</div>
`;
//插入字段
const SelectField = (item) => {
  data.SelectFieldId = item.id;
  if (editorRef && editorRef.value) {
    const realStr = '{{' + item.name + '}}';
    tinymce.activeEditor.insertContent(realStr);
  }
}
//获取对象字段
const getFieldList = () => {
  data.FieldList = [];
  data.FieldListAll = [];
  let filterQuery = '\nEntityId\teq\tbbda8bc8-3e50-48ec-a4a8-68c86a5bd81a';
  proxy.$post(Interface.list2, {
    filterId: '',
    objectTypeCode: '100001',
    entityName: 'Attribute',
    filterQuery: filterQuery,
    search: '',
    page: 1,
    rows: 100,
    sort: 'ColumnNumber',
    order: 'asc',
    displayColumns: 'Name,DisplayName'
  }).then(res => {
    if (res && res.nodes && res.nodes.length) {
      var list = [];
      for (var i = 0; i < res.nodes.length; i++) {
        var item = res.nodes[i];
        for (var cell in item) {
          if (cell != 'id' && cell != 'nameField') {
            item[cell] = girdFormatterValue(cell, item);
          }
        }
        list.push({
          id: item.id,
          name: item.Name,
          label: item.DisplayName,
        })
      }
      data.FieldList = list;
      data.FieldListAll = list;
    }
  })
}
const onSearch = (e) => {
  data.FieldList = data.FieldListAll.filter(item => {
    return item.label.indexOf(data.searchVal) !== -1;
  })
}
//转义
const escapeHtml = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
//反转义
const htmlDecode = (input) => {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
const getDetail = () => {
  let d = {
    actions: [{
      id: "4270;a",
      descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
      callingDescriptor: "UNKNOWN",
      params: {
        recordId: data.id,
        apiName: data.sObjectName,
        objTypeCode: data.objectTypeCode
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.detail, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.fields) {
      let fields = res.actions[0].returnValue.fields;
      formState.Name = fields.Name.value;
      formState.Content = fields.Body.value ? htmlDecode(fields.Body.value) : '';
    }
    if (editorRef && editorRef.value) {
      if (formState.Content) {
        editorRef.value.content = formState.Content;
      }
      else {
        formState.Content = defaultContent;
        editorRef.value.content = formState.Content;
      }
    }
  })
};
//getDetail();
const getFileClass = () => {
  proxy
    .$get(Interface.information.attachmentCategory, {
      ObjectTypeCode: data.objectTypeCode,
    })
    .then((res) => {
      data.fileCategorys = res.returnValue.records;
    });
};
//getFileClass();
const getFiles = () => {
  proxy
    .$get(Interface.information.files, {
      id: data.id,
    })
    .then((res) => {
      data.files = res.listData;
    });
};
//getFiles();
// 关闭更改状态
const cancelStatus = (e) => {
  data.isStatus = e;
};
const cancelNotes = (e) => {
  data.isNotes = e;
};
const cancelRemind = (e) => {
  data.isRemind = e;
};
const cancelAddClass = (e) => {
  data.isAddClass = e;
};
// 更改状态
const changeStatus = () => {
  data.isStatus = true;
};
const handleEdit = () => {
  // router.push({
  //     path:"/content/visualEditor",
  //     query: {
  //       id: id
  //     }
  // });
  let reUrl = router.resolve({
    name: "visualEditor",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
      //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
      FolderId: data.FolderId || '',
    }
  })
  window.open(reUrl.href);
}
const handleDelete = (e) => {
  data.isDelete = true;
}
const deleteOk = (e) => {
  let path = '/lightning/o/Content/home';
  if (data.objectTypeCode == '100202') {
    path = '/lightning/o/ContentNotice/home'
  }
  router.push({
    path: path,
    query: {
    }
  });
};
const cancelDelete = (e) => {
  data.isDelete = false;
};
// 预览
const handlePreview = () => {
  let url = router.resolve({
    name: "PreviewContent",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
    },
  });
  window.open(url.href);
};
// 提醒
const handleRemind = () => {
  data.isRemind = true;
};
// 备注
const handleNotes = () => {
  data.isNotes = true;
};
// 添加分类
const handleAddClass = () => {
  data.isAddClass = true;
};
const getContent = (e) => {
  //console.log('e', e);
  formState.Content = e;
}
const handleInvitation = () => {
  data.isRadioUser = true;
}
// 关闭发布弹窗
const cancleRadio = (e) => {
  data.isRadioUser = e;
}
const cancelRelaseInfo = (e) => {
  data.isRelaseInfo = false;
}
const handleSelectUser = (params) => {
  console.log("params", params);
  proxy.$get(Interface.information.invite, {
    userIds: params.ID,
    contentid: ""
  }).then(res => {
    message.success(res.msg);
    data.isRadioUser = false;
  })
}

// 保存
const handleSave = (type) => {
  if (formState.Name) { } else {
    message.error("模板名称不能为空！");
    return
  }
  if (formState.Content) { } else {
    message.error("模板内容不能为空！");
    return
  }
  let userInfo = window.localStorage.getItem('userInfo');
  let userId = '';
  let userName = '';
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    userId = userInfo.userId;
    userName = userInfo.fullName;
    if (userId == 'jackliu') {
      userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
  }
  let url = Interface.create;
  let d = {
    actions: [{
      id: "2919;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        recordInput: {
          allowSaveOnDuplicate: false,
          apiName: data.sObjectName,
          objTypeCode: data.objectTypeCode,
          fields: {
            Name: formState.Name,
            Body: formState.Content ? escapeHtml(formState.Content) : '',
            OwningUser: userId,
            CreatedBy: userId,
          }
        }
      }
    }]
  };
  if (data.id) {
    url = Interface.edit;
    d.actions[0].params.recordId = data.id;
    d.actions[0].params.recordInput.fields.ModifiedBy = userId;
  }
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(url, obj).then(res => {
    //formRef.value.resetFields();
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("保存成功！");
      //getDetail();
      // let url = router.resolve({
      //   name: "ContentViewTemplateEditor",
      //   query: {
      //     id: res.actions[0].returnValue.id || data.id || '',
      //   },
      // });
      let url = router.resolve({
        path: "/lightning/o/ContentViewTemplate",
        query: {
        },
      });
      window.location.href = url.href;
      data.title = '编辑显示模板';
      data.id = res.actions[0].returnValue.id || data.id || '';
    }
    else {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
        message.success(res.actions[0].errorMessage);
      }
      else {
        message.success("保存失败！");
      }
    }
  });
}
//发布
const handleSubmit = () => {
  handleSave();
  data.isRelaseInfo = true;
}
//关闭
const closeEditor = () => {
  window.close();
}
// 查看详情
const handleDetail = () => {
  let reUrl = router.resolve({
    path: "/lightning/r/Content/view",
    query: {
      id: data.id,
      objectTypeCode: data.objectTypeCode,
      FolderId: data.FolderId
    }
  })
  window.open(reUrl.href);
}
onMounted(() => {
  getDetail();
  getFieldList();
  if (data.id) {
    data.title = '编辑显示模板';
  } else {
    data.title = '新建显示模板';
  }
  let h = document.documentElement.clientHeight;
  data.height = h - 260;
  data.isEditor = true;
  window.addEventListener("resize", () => {
    data.isEditor = false;
    let h = document.documentElement.clientHeight;
    data.height = h - 260;
    setTimeout(function () {
      data.isEditor = true;
      setTimeout(function () {
        getDetail()
      }, 100)
    }, 200)
  })
})
//取消发布
const handleCancelRelease = () => {
  data.isConfirm = true;
  data.confirmText = '确定要取消发布吗？'
  data.confirmTitle = '取消发布'
}
</script>
<style lang="less" scoped>
.ContentViewTemplateEditorWrap {
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: hidden;

  .preview-header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e6eb;
    box-shadow: 0px 2px 8px 0px rgba(237, 239, 243, 1);
    z-index: 99 !important;
    padding: 6px 20px 0 20px;

    .icon-circle-base {
      width: 35px;
      height: 35px;
      background: #0079de;
      border-radius: 50%;
      margin-right: 0px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      top: 0px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .ant-tabs-nav {
      margin: 0;
    }

    .leftBox {
      min-width: 695px;
      flex: 1;

      .backText {
        color: var(--textColor);
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        padding-right: 10px;
      }

      .title {
        // margin-top: 5px;
        // height: 48px;
        display: flex;
        align-items: center;
        color: #1d2129;
        font-size: 14px;
        font-weight: normal;
        margin: 6px 0 3px 18px;
      }

      .ant-tabs .ant-tabs-nav::before {
        display: none;
      }

      .ant-tabs-tab {
        padding: 9px 8px !important;
        margin-right: 24px !important;
      }
    }

  }

  .detail-scroll {
    overflow: auto;
    height: calc(~"100% - 159px");
    margin-top: 45px;
    overflow: auto;

    .detail-bd {
      // padding: 24px;
      height: 100%;
    }

    .tabContainer {
      min-height: 197px;
      height: 100%;
      display: flex;
      padding-bottom: 20px;
      position: relative;
      padding: 24px;

      .tableBox {
        // flex: 1;
        background: #fff;
        border-radius: 4px;
        margin-right: 12px;
        width: calc(~"100% - 0px");
        //overflow: auto;
        padding: 20px 15px;
        margin-right: 5px;

        .sectionItem1 {
          border: 1px solid #dedede;

          .ant-form-item {
            margin-bottom: 0;
          }
        }

        .ContentViewTemplateContent {
          display: flex;

          .wea-doc-mould-rich-text-right-list {
            width: 180px;
            right: 0;
            top: 0;
            bottom: 0;
            display: inline-block;
            position: absolute;
            height: calc(~'100% + 0px');
          }

          .wea-doc-mould-rich-text-right-list .special-field-wrapper>div {
            height: 100%;
          }

          .wea-input-focus {
            height: 30px;
            line-height: 32px;
            position: relative;
            background-color: #fff;
            display: inline-block;
            width: 100%;
          }

          .ant-input-wrapper {
            width: 100%;
            display: inline-block;
            height: 100%;

            .ant-input-affix-wrapper {
              padding-left: 8px !important;

              :deep #form_item_Content {
                border: none !important;
                font-size: 12px;
                width: 114px !important;
              }

              :deep .ant-input-clear-icon {
                position: relative;
                right: 0px;
              }
            }
          }

          .special-field-wrapper {
            height: 100%;
          }

          .wea-input-focus .ant-input-wrapper>input {
            width: 100%;
            display: inline-block;
            //padding-right: 45px;
            -webkit-box-shadow: none;
            box-shadow: none;
            //border: 1px solid #d9d9d9;
            height: 30px;
            // position: relative;
            // top: 1px;
            //text-indent: 10px;
            font-size: 12px;
          }

          .wea-input-focus>.wea-input-focus-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            height: 24px;
            line-height: 34px;
            padding-top: 0;
            padding-bottom: 0;
            padding-left: 5px !important;
            border: 0;
            padding-right: 5px;
            background: #fff;
            z-index: 2;
          }

          .wea-input-focus>.wea-input-focus-btn .anticon-search {
            display: inline-block;
            font-style: normal;
            vertical-align: baseline;
            text-align: center;
            text-transform: none;
            text-rendering: auto;
            line-height: 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            color: #b2b2b2;
            font-size: 14px !important;
          }

          .wea-input-focus>.wea-input-focus-btn .anticon-search {
            color: #b2b2b2;
            font-size: 12px;
          }

          .special-field-wrapper-single {
            display: inline-block;
            width: 100%;
            padding-bottom: 4px;
            height: calc(~'100% - 36px');
            overflow-y: auto;
            overflow-x: hidden;
          }

          .wea-new-scroll {
            height: 100% !important;

            .clipper {
              overflow: hidden;
              height: 100%;
              width: 100%;
              position: relative;
            }

            .scroller {
              overflow-y: scroll;
              overflow-x: hidden;
              height: 100%;
            }
          }

          .special-field-wrapper .special-field-item {
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
            font-size: 12px;
            cursor: pointer;
          }

          .special-field-wrapper .special-field-item:hover {
            background-color: #e9f7fe;
          }

          .special-field-wrapper .special-field-item.actived {
            background-color: #e9f7fe;
          }

        }
      }

      .tableBox.active {
        width: 100%;
      }
    }

    .wea-doc-detail-content-text-sub {
      color: #999;
      position: absolute;
      bottom: 13px;
      right: 40px;
      font-size: 13px;
    }
  }

  .detail-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    height: 64px;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
    z-index: 99;

    .flexEnd {
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
    }
  }

  :deep .ant-tabs-tab {
    padding: 10px 8px !important;
    font-size: 12px !important;
    margin-left: 10px !important;
    margin-right: 12px !important;
  }

  :deep .ant-tabs-nav::before {
    display: none;
  }
}

.rightBox {
  display: flex;
  align-items: end;
  height: 35px;

  .btn-drop {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 12px;
    color: #999999;
  }

  .btn-drop:hover {
    color: rgb(78, 89, 105);
    background: #f2f3f5;
  }

  .ant-btn {
    margin-top: 12px;
  }
}

.rightAside {
  min-width: 20%;
  max-width: 20%;
  position: absolute;
  height: 100%;
  right: 0;
  // background: #fff;
  padding: 0 10px;

  // overflow-y: auto;
  .panel {
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    cursor: pointer;
    overflow: auto;

    .panel-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 19px;

      .panel-title {
        font-size: 16px;
        color: #1d2129;
        font-weight: bold;
      }
    }

    .panel-bd {
      .empty {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        color: #666;

        img {
          width: 50px;
        }

        .emptyDesc {
          font-size: 14px;
        }
      }

      .relevantList {
        .relevantItem {
          width: 100%;
          position: relative;
          padding: 13px 8px;
          border-bottom: 1px solid #e5e6eb;

          .relevantTitle {
            width: 75%;
            font-size: 14px;
            color: #1d2129;
          }

          .relevantTimerInfo {
            font-size: 12px;
            color: #86909c;
            padding-top: 10px;
          }

          .anticon-delete {
            position: absolute;
            right: 10px;
            top: 25px;
            font-size: 16px;
          }
        }

        .relevantItem:hover {
          background: #f2f3f5 !important;
        }
      }
    }
  }

  .asideScroll {
    height: 100%;
    overflow-y: auto;
  }

  .arrowIcon {
    position: absolute;
    top: 50%;
    z-index: 999;
    width: 16px;
    height: 60px;
    background: url("~@/assets/img/right.png") center center no-repeat;
    cursor: pointer;
    left: 1px;
  }

  .arrowIcon.rightIcon:hover {
    background: url("~@/assets/img/right_hover.png") center center no-repeat;
  }

  .arrowIcon.leftIcon {
    top: 50%;
    left: inherit !important;
    right: 0;
    background: url("~@/assets/img/left.png") center center no-repeat;

    &:hover {
      background: url("~@/assets/img/left_hover.png") center center no-repeat;
    }
  }
}

.leftContent {
  width: calc(~"80% - 5px");
  height: 100%;
  border-right: 1px solid #e2e3e5;
  overflow: hidden;
  overflow-y: auto;

  &.active {
    width: calc(~"100% - 24px");
  }
}

:where(.css-dev-only-do-not-override-kqecok).ant-collapse {
  border: none !important;
  background: #fff;
}

:where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item {
  border-bottom: none !important;
  background: #f3f2f2;
  margin-bottom: 8px;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse .ant-collapse-content {
  border-top: none !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item>.ant-collapse-header {
  padding: 6px 16px !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse .ant-collapse-content>.ant-collapse-content-box {
  padding: 0 !important;
}

:deep :where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item:last-child,
:where(.css-dev-only-do-not-override-kqecok).ant-collapse>.ant-collapse-item:last-child>.ant-collapse-header {
  border-radius: 0 !important;
}

// :deep .panel {
//   overflow: hidden;
//   height: 100%;
// }
.files {
  width: 100%;

  .fileItem {
    width: 100%;
    display: flex;
    padding: 10px 5px;

    &:hover {
      cursor: pointer;
      background: #eee;
    }

    .lImg {
      width: 40px;
      height: 40px;
      min-width: 40px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .rInfo {
      flex: 1;
      margin-left: 10px;
      overflow: hidden;

      .name {
        width: 60%;
        font-size: 14px;
      }

      .optionLink {
        .link {
          color: var(--textColor);
        }
      }

      .time {
        font-size: 12px;
        color: #b8bbcc;
      }
    }
  }
}

.ContentViewTemplateEditorWrap .detail-scroll {
  height: calc(~"100% - 45px");
}

.ContentViewTemplateEditorWrap .detailContent {
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  overflow: auto;
}

.ContentViewTemplateEditorWrap .tableBoxContent {
  white-space: pre-wrap;
  word-break: break-all;
  padding-top: 20px;
}

.tableBoxWrap {
  background: rgb(233, 233, 233);
  margin: 0px auto;
  padding: 4px;
  border: 1px solid rgb(194, 194, 194);
  width: 950px;
  line-height: 22px;
  margin-top: 8px;

  .tableBoxDiv {
    background: url(&quot;Six_01.gif&quot;) repeat-x 50% top rgb(255, 255, 255);
    padding: 20px 40px;
    border: 1px solid rgb(255, 255, 255);
  }

  .tableBoxTop {
    text-align: left;
    color: rgb(128, 128, 128);
    padding-bottom: 10px;
    font-size: 12px;
    border-bottom-color: rgb(216, 216, 216);
    border-bottom-width: 1px;
    border-bottom-style: dashed;
  }

  .tableBoxTitle {
    color: rgb(0, 0, 0);
    line-height: 85px;
    font-size: 24px;
    text-align: center;
    font-family: 仿宋_GB2312, FangSong_GB2312 !important;
  }

  .tableBoxp1 {
    text-align: center;
    color: rgb(128, 128, 128);
    font-family: 宋体 !important;
    font-size: 12px;
    font-weight: normal;
  }

  .tableBoxp2 {
    height: 1px;
    line-height: 1px;
    text-indent: 2em;
    font-size: 0px;
    border-top-color: rgb(191, 191, 191);
    border-bottom-color: rgb(216, 216, 216);
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-top-style: solid;
    border-bottom-style: solid;
  }
}

.ContentViewTemplateEditorWrap {
  .preview-header .icon-circle-base {
    background: #df583a;
  }

  .title {
    color: #333;
  }

  .wea-doc-detail-content-text-sub span {
    font-size: 12px;
  }

  .doc-like .anticon {
    color: rgb(178, 178, 178);
    margin-left: 8px;
    margin-right: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  .doc-like.active,
  .doc-like.active .anticon {
    color: rgb(255, 159, 1);
  }

  .doc-label {
    color: #999;
    margin-left: 10px;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    cursor: pointer;
  }

  .detail-scroll .tabContainer .tableBox {
    padding: 0;
    //width: 835px;
    //margin: 0 auto;
  }

  :deep .tox-tinymce {
    width: calc(~'100% - 180px') !important;
    border: none;
    border-radius: 0;

    .tox-editor-container {

      //background: #f0f2f6;
      .tox-toolbar__primary {
        //display: flex;
        //justify-content: center;
        border-radius: 0;
      }

      .tox-editor-header {
        //border:none;
        background: #f8f8f8;
        border-radius: 0;
        box-shadow: none;
        padding: 0;
        border-bottom: 1px solid #eaeaea;
        //position: relative;
        //top: -12px;
      }

      .tox-toolbar__primary {
        background: #f8f8f8;
        border-radius: 0;
        //zoom: 0.9;
      }

      .tox-toolbar-overlord {
        border: none;
        background: #f8f8f8;
        border-radius: 0;
      }

      .tox-tbtn--bespoke {
        background: #f8f8f8;
        width: 87px !important;
      }

      .tox-toolbar__group {
        padding: 0 0px 0 8px;
      }
    }

    .tox-edit-area::before {
      border: none !important;
    }
  }

  .preview-header .leftBox .title {
    margin: 7px 0 0px 13px;

    .doc-title {
      width: 455px;
      display: block;
    }
  }

  :deep .ant-tabs-tab {
    margin-left: 20px !important;
    margin-right: 4px !important;
    padding: 6px 8px !important;
  }

  .require {
    font-size: 24px;
    margin-left: 5px;
    color: red;
    position: relative;
    top: 4px;
  }

  .btn-drop {
    font-size: 18px !important;
  }

  .tableBox-Bottom {
    height: 45px;
    background: #fff;
    display: flex;
    align-items: center;
    border-top: 1px solid #eaeaea;
    padding-left: 10px;

    .tableBox-Bottom-Btn {
      padding: 0 10px;
      cursor: pointer;
    }

    .tableBox-Bottom-Btn-Icon {
      position: relative;
      top: 1px;
      margin-right: 1px;
    }
  }

  .IsReply {
    margin: 0 5px 0 15px;

    :deep .el-checkbox__label {
      padding-left: 5px;
    }
  }

  .replyInfo {
    color: #fff;
    width: 17px;
    height: 17px;
    background: #faa825;
    border-radius: 50%;
    text-align: center;
    position: relative;
    top: -1px;
  }

  .sectionItem1 {
    height: auto;
    width: 100%;
    padding: 0px;
    justify-items: center;
    margin: 10px 0 20px 0;
  }

  .detail-scroll .tabContainer .tableBox .sectionItem1 .ant-form-item {
    width: 100%;
  }

  .section .sectionRow .sectionItem .ant-row {
    width: 100%;
  }
}
</style>