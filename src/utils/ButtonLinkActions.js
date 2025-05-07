import { reactive, defineAsyncComponent } from "vue";
import router from "../router/index.js";
const componentItem = reactive({
  component: "",
  isShow: false,
  dataParams: "",
});
//文档模板-新建
const NewContentViewTemplate = () => {
  let url = router.resolve({
    name: "ContentViewTemplateEditor",
    query: {
      id: "",
    },
  });
  window.open(url.href);
};

//文档模板-编辑
const EditContentViewTemplate = (id) => {
  let url = router.resolve({
    name: "ContentViewTemplateEditor",
    query: {
      id: id || "",
    },
  });
  window.open(url.href);
};

//地图维护新建
const AddKnowledgeMap = () => {
  data.listId = "";
  data.isKnowledgeMap = true;
};

//地图维护编辑
const EditKnowledgeMap = (id) => {
  data.isKnowledgeMap = true;
  data.listId = id;
};
//地图明细编辑
const EditKnowledgeMapDetail = (id) => {
  let url = router.resolve({
    name: "KnowledgeMapDetailEditor",
    query: {
      id: id || "",
    },
  });
  window.open(url.href);
};
//新建短信发送
const CampaignSmsNew = () => {
  let url = router.resolve({
    name: "CampaignSmsEditor",
    query: {},
  });
  window.open(url.href);
};
//编辑短信发送
const CampaignSmsEdit = (id) => {
  let url = router.resolve({
    name: "CampaignSmsEditor",
    query: {
      id: id,
    },
  });
  window.open(url.href);
};
//短信上传文件发送
const CampaignSmsUpload = () => {
  let url = router.resolve({
    name: "CampaignSmsUpload",
    query: {},
  });
  window.open(url.href);
};
//查看制度文件详情
const ViewRuleArticleDetail = (id) => {
  let url = router.resolve({
    path: "/knowledge/RuleArticle/detail",
    name: "RuleArticleDetail",
    query: {
      id: id,
    },
  });
  window.open(url.href);
};
//通用查看
const View = (id, entityName) => {
  let url = router.resolve({
    path: "/lightning/r/Record/view",
    query: {
      entityType: entityName,
      objectTypeCode: "",
      id: id,
    },
  });
  window.open(url.href);
};
//动态组件
export const getComponent = (path) => {
  if (path == "/lightning/o/ResourceOrg") {
    return defineAsyncComponent(() =>
      import("@/components/meeting/meetingRoom/NewMeetingRoom.vue")
    );
  } else {
    return defineAsyncComponent(() =>
      import("@/components/listView/CommonFormModal.vue")
    );
  }
};
//定制方法
export const getActionFunc = () => {
  window.NewContentViewTemplate = NewContentViewTemplate;
  window.EditContentViewTemplate = EditContentViewTemplate;
  window.AddKnowledgeMap = AddKnowledgeMap;
  window.EditKnowledgeMap = EditKnowledgeMap;
  window.EditKnowledgeMapDetail = EditKnowledgeMapDetail;
  window.CampaignSmsNew = CampaignSmsNew;
  window.CampaignSmsEdit = CampaignSmsEdit;
  window.CampaignSmsUpload = CampaignSmsUpload;
  window.ViewRuleArticleDetail = ViewRuleArticleDetail;
  window.newSuggestion = window.New;
  window.editSuggestion = window.Edit;
  window.View = View;
};
