import { reactive, defineAsyncComponent } from "vue";
import router from "../router/index.js";
const componentItem = reactive({
    component: '',
    isShow:false,
    dataParams: ''
})
//文档模板-新建
const NewContentViewTemplate=() => {
    let url = router.resolve({
        name: "ContentViewTemplateEditor",
        query: {
        id: '',
        },
    });
    window.open(url.href);
}

//文档模板-编辑
const EditContentViewTemplate=(id) => {
    let url = router.resolve({
        name: "ContentViewTemplateEditor",
        query: {
        id: id||'',
        },
    });
    window.open(url.href);
}

//地图维护新建
const AddKnowledgeMap = () => {
    data.listId='';
    data.isKnowledgeMap = true;
};

//地图维护编辑
const EditKnowledgeMap = (id) => {
    data.isKnowledgeMap = true;
    data.listId=id;
};
//地图明细编辑
const EditKnowledgeMapDetail=(id)=>{
  let url = router.resolve({
        name: "KnowledgeMapDetailEditor",
        query: {
        id: id||'',
        },
    });
    window.open(url.href);
}
//新建短信发送
const NewCampaignSms =()=>{
    let url = router.resolve({
        name: "CampaignSmsEditor",
        query: {
        id: '',
        },
    });
    window.open(url.href);
}
//编辑短信发送
const EditCampaignSms =(id)=>{
    let url = router.resolve({
        name: "CampaignSmsEditor",
        query: {
        id: id,
        },
    });
    window.open(url.href);
}
//查看制度文件详情
const ViewRuleArticleDetail=(id) => {
    let url = router.resolve({
        path: '/knowledge/RuleArticle/detail',
        name: "RuleArticleDetail",
        query: {
          id: id,
        },
    });
    window.open(url.href);
}
//动态组件
export const getComponent=(path)=>{
    if(path=='/lightning/o/ResourceOrg'){
        return defineAsyncComponent(() => import("@/components/meeting/meetingRoom/NewMeetingRoom.vue"));
    }else{
        return defineAsyncComponent(() => import("@/components/listView/CommonFormModal.vue"));
    }
}
//定制方法
export const getActionFunc=()=>{
    window.NewContentViewTemplate = NewContentViewTemplate;
    window.EditContentViewTemplate = EditContentViewTemplate;
    window.AddKnowledgeMap=AddKnowledgeMap;
    window.EditKnowledgeMap=EditKnowledgeMap;
    window.EditKnowledgeMapDetail=EditKnowledgeMapDetail;
    window.NewCampaignSms=NewCampaignSms;
    window.EditCampaignSms=EditCampaignSms;
    window.ViewRuleArticleDetail=ViewRuleArticleDetail;
    window.newSuggestion=window.New;
    window.editSuggestion=window.Edit;
}