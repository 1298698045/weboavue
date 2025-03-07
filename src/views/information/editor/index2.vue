<template>
    <div class="editorWrap">
      <div class="preview-header">
        <div class="icon-circle-base">
            <img :src="require('@/assets/img/rightMenu/youcemoren.png')" alt="">
        </div>
        <div class="leftBox">
          <div class="title">
            <div>
              <span class="doc-title">
                <a-input v-model:value="detail.Title" :placeholder="'文档标题'" @change="handleSave(1)"></a-input>
              </span>
              <!-- <span class="doc-like" title="点赞">
                <LikeOutlined />(<span>{{ detail.NumOfLike||0 }}</span>)
              </span>
              <span class="doc-label">
                <TagOutlined />
              </span> -->
            </div>
            <span class="require">*</span>
            <span class="IsReply"><el-checkbox v-model="IsReply">回复提醒</el-checkbox></span>
            <span class="replyInfo" title="只对文档所有者提醒">?</span>
          </div>
          <div class="tabWrap">
            <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
              <a-tab-pane v-for="(item, index) in tabs" :key="index">
                <template #tab>
                  <span>
                    {{ item.label }}
                  </span>
                </template>
              </a-tab-pane>
            </a-tabs>
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
          <a-button type="primary" class="ml10" @click="handleSubmit">发布</a-button>
          <a-button class="ml10" @click="closeEditor">关闭</a-button>
          <a-dropdown :trigger="['hover']" class="ml10">
            <span class="btn-drop">
              <UnorderedListOutlined style="color: #1d2129" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="handleCancelRelease">
                    取消发布
                </a-menu-item>
                <a-menu-item @click="handleDetail">
                    查看详情
                </a-menu-item>
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
                <Editor v-if="isEditor" :mode="'doc'" placeholder="" ref="editorRef" :height="height" @input="getContent" />
                <div class="tableBox-Bottom">
                    <div class="tableBox-Bottom-Btn" @click="addDoc">
                        <span class="tableBox-Bottom-Btn-Icon">
                            <FileTextOutlined />
                        </span>
                        <span class="tableBox-Bottom-Btn-Label">
                            文档
                        </span>
                    </div>
                    <div class="tableBox-Bottom-Btn" @click="handleAddLink('WFProcessInstance')">
                        <span class="tableBox-Bottom-Btn-Icon">
                            <NodeIndexOutlined />
                        </span>
                        <span class="tableBox-Bottom-Btn-Label">
                            流程
                        </span>
                    </div>
                    <div class="tableBox-Bottom-Btn" @click="handleAddLink('SystemUser')">
                        <span class="tableBox-Bottom-Btn-Icon">
                            <UserOutlined />
                        </span>
                        <span class="tableBox-Bottom-Btn-Label">
                            客户
                        </span>
                    </div>
                    <div class="tableBox-Bottom-Btn">
                        <span class="tableBox-Bottom-Btn-Icon">
                            <ProfileOutlined />
                        </span>
                        <span class="tableBox-Bottom-Btn-Label">
                            项目
                        </span>
                    </div>
                    <div class="tableBox-Bottom-Btn">
                        <span class="tableBox-Bottom-Btn-Icon">
                            <CarryOutOutlined />
                        </span>
                        <span class="tableBox-Bottom-Btn-Label">
                            任务
                        </span>
                    </div>
                    <a-upload v-model:file-list="fileList" action :showUploadList="false" multiple name="file" 
                    :customRequest="changeRequest" :before-upload="beforeUpload" @change="handleChange">
                      <div class="tableBox-Bottom-Btn">
                          <span class="tableBox-Bottom-Btn-Icon">
                              <PaperClipOutlined />
                          </span>
                          <span class="tableBox-Bottom-Btn-Label">
                              附件
                          </span>
                      </div>
                    </a-upload>
                </div>
            </div>
          </div>
          <div class="tabContainer" v-show="activeKey == 1">
            <div class="detailContent">
              <DetailInfoEdit ref="DetailInfoEditRef" :id="id" :type="'page'" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" @refreshData="getDetail" />
            </div>
          </div>
          <div class="tabContainer" v-if="activeKey == 2">
            <RelatedAttachment :id="id" :type="'page'" :RegardingObjectIdName="detail.Title" :RegardingObjectTypeCode="objectTypeCode" :entityName="sObjectName" />
          </div>
          <span class="wea-doc-detail-content-text-sub"><span>最后由</span><span>&nbsp;&nbsp;&nbsp;{{detail.ModifiedBy ||'暂无'}}&nbsp;&nbsp;</span><span> 编辑于 {{detail.ModifiedOn ||' '}} </span>&nbsp;&nbsp;<span> 阅读 ({{detail.ReadCount ||0}})</span></span>
        </div>
      </div>
      <InfoNotes
        v-if="isNotes"
        :isShow="isNotes"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelNotes"
      />
      <ChangeStatus
        :isShow="isStatus"
        v-if="isStatus"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelStatus"
      />
      <InfoRemind
        v-if="isRemind"
        :isShow="isRemind"
        :id="id"
        @cancel="cancelRemind"
        :RegardingObjectIdName="detail.Title"
        :RegardingObjectTypeCode="objectTypeCode"
      />
      <InfoAddClass
        v-if="isAddClass"
        :isShow="isAddClass"
        :id="id"
        :objectTypeCode="objectTypeCode"
        @cancel="cancelAddClass"
      />
      <RadioUser v-if="isRadioUser" :isShow="isRadioUser" @cancel="cancleRadio" @selectVal="handleSelectUser" />
      <RelaseInfo v-if="isRelaseInfo" :isShow="isRelaseInfo" :objectTypeCode="objectTypeCode" :id="id" :FolderId="FolderId" @cancel="cancelRelaseInfo" />
      <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="deleteOk" :sObjectName="sObjectName" :recordId="id" :objTypeCode="objectTypeCode" :external="external" />
      <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="confirmText" :title="confirmTitle" @cancel="isConfirm=false" @ok="isConfirm=false" :id="id" />
      <AddDocument v-if="isAddDoc" :isShow="isAddDoc" @select="handleSelectDoc" @cancel="isAddDoc=false" />
      <AddLink v-if="isAddLink" :isShow="isAddLink" @select="handleSelectLink" :entityApiName="sObjectName2" @cancel="isAddLink=false" />
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
    nextTick
  } from "vue";
  import axios from "axios";
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
  } from "@ant-design/icons-vue";
  import { useRouter, useRoute } from "vue-router";
  import Related from "@/components/detail/Related.vue";
  import Info from "@/components/detail/Info.vue";
  import InfoNotes from "@/components/information/InfoNotes.vue";
  import ChangeStatus from "@/components/information/ChangeStatus.vue";
  import InfoRemind from "@/components/information/InfoRemind.vue";
  import InfoAddClass from "@/components/information/InfoAddClass.vue";
  import ReadRecord from "@/components/information/ReadRecord2.vue";
  import RelatedAttachment from "@/components/commonTab/RelatedAttachment.vue";
  import DocLog from "@/components/documentAdmin/DocLog.vue";
  import Comment from "@/components/detail/Comment2.vue";
  import Editor from "@/components/TEditor.vue";
  import RadioUser from "@/components/commonModal/RadioUser.vue";
  import RelaseInfo from  "@/components/information/RelaseInfo.vue";
  import DetailInfoEdit from "@/components/detail/DetailInfoEdit.vue";
  import Delete from "@/components/listView/Delete.vue";
  import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
  import AddDocument from "@/components/information/AddDocument.vue";
  import AddLink from "@/components/information/AddLink.vue";
  import Interface from "@/utils/Interface.js";
  import { message } from "ant-design-vue";
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
    objectTypeCode: route.query.objectTypeCode,
    sObjectName:'Content',
    sObjectName2:'',
    detail: {},
    isNotes: false,
    isStatus: false,
    isRemind: false,
    isAddClass: false,
    isUserModal: false,
    fileCategorys: [],
    files: [],
    content:'',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external:false,
    isRelaseInfo: false,
    isEditor: false,
    height: 0,
    FolderId:route.query.FolderId||'',
    isRadioUser:false,
    IsReply:false,
    isConfirm:false,
    confirmText:'',
    confirmTitle:'',
    isAddDoc:false,
    fileList:[],
    fileList1:[],
    isAddLink:false
  });
  const {
    sObjectName2,
    isAddLink,
    fileList,
    fileList1,
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
    IsReply,isConfirm,confirmText,confirmTitle,isAddDoc
  } = toRefs(data);
  const changeTabs = (e) => {
    data.activeKey = e;
    if(e==0){
        getDetail()
    }
  };
  const current = ref([]);
  const ReadRecordLst = ref();
  const DetailInfoEditRef= ref(null);
  const expandIconPosition = ref("start");
  const handleClick = (event) => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
  };
  const refreshData=(e)=>{
    if(ReadRecordLst.value&&ReadRecordLst.value.getQuery){
        ReadRecordLst.value.getQuery();
    }
}

if(route.query.objectTypeCode=='100201'){
        data.sObjectName='Content'
      }
      else if(route.query.objectTypeCode=='100202'){
        data.sObjectName='Notice'
      }
      else if(route.query.objectTypeCode=='1027'){
        data.sObjectName='KbArticle'
      }
  const getDetail = () => {
    // proxy
    //   .$get(Interface.information.detail, {
    //     id: data.id,
    //     objectTypeCode: data.objectTypeCode,
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //     data.detail = res.actions[0].returnValue.record;
    //   });
    let d = {
              actions:[{
                  id: "4270;a",
                  descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                  callingDescriptor: "UNKNOWN",
                  params: {
                  recordId: data.id,
                  apiName:data.sObjectName,
                  objTypeCode: data.objectTypeCode
                  }
              }]
          };
          let obj = {
              message: JSON.stringify(d)
          }
          proxy.$post(Interface.detail,obj).then(res=>{
              if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
                let fields=res.actions[0].returnValue.fields;
                data.detail.Title=fields.Title.value;
                if(route.query.objectTypeCode=='1027'){
                  data.content=fields.Content.value;
                }
                else{
                  data.content=fields.ContentBody.value;
                }
                data.detail.ApprovedOn=fields.ApprovedOn&&fields.ApprovedOn.value?dayjs(fields.ApprovedOn.value).format("YYYY-MM-DD HH:mm"):'';
                if(fields.FolderId&&fields.FolderId.value){
                    data.detail.FolderIdName=fields.FolderId.displayValue;
                    data.FolderId=fields.FolderId.value;
                }
                data.detail.BusinessUnitIdName=fields.BusinessUnitId?fields.BusinessUnitId.displayValue:'';
                data.detail.ApprovedByName=fields.ApprovedBy?fields.ApprovedBy.displayValue:'';
                data.detail.StateCodeName=fields.StateCode?fields.StateCode.displayValue:'';
                data.detail.ReadCount=fields.ReadCount?fields.ReadCount.value:'';
                data.detail.ModifiedBy=fields.ModifiedBy?fields.ModifiedBy.displayValue:'';
                data.detail.ModifiedOn=fields.ModifiedOn&&fields.ModifiedOn.value?dayjs(fields.ModifiedOn.value).format("YYYY-MM-DD HH:mm"):'';
                data.IsReply=fields.IsReply?fields.IsReply.value:false;
                if(editorRef&&editorRef.value){
                  editorRef.value.content=data.content;
                }
              }
          })
  };
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
  const handleEdit = () =>{
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
                  FolderId: data.FolderId||'',
              }
          })
      window.open(reUrl.href); 
    }
  const handleDelete= (e) => {
    data.isDelete = true;
  }
  const deleteOk = (e) => {
    let path='/lightning/o/Content/home';
    if(data.objectTypeCode=='100202'){
      path='/lightning/o/ContentNotice/home'
    }
    router.push({
          path:path,
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
        data.content = e;
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
        proxy.$get(Interface.information.invite,{
            userIds: params.ID,
            contentid: ""
        }).then(res=>{
            message.success(res.msg);
            data.isRadioUser = false;
        })
    }
  // 保存
  const handleSave = (type) => {
        if(DetailInfoEditRef&&DetailInfoEditRef.value&&DetailInfoEditRef.value.handleSubmit!='undefined'&&type!=1){
            DetailInfoEditRef.value.handleSubmit();
        }
        let url=Interface.edit;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName:data.sObjectName,
                objTypeCode: data.objectTypeCode,
                fields: {
                    FolderId:data.FolderId,
                    ContentBody: data.content,
                    IsPublic:0,
                    IsReply:data.IsReply,
                }
              }              
            }
        }]
    };
    if(data.id){
        d.actions[0].params.recordId=data.id;
    }
    if(route.query.objectTypeCode=='1027'){
      d.actions[0].params.recordInput.fields={
        Content:data.content,
      };
    }
    let userInfo=window.localStorage.getItem('userInfo');
    if(userInfo){
          userInfo=JSON.parse(userInfo);
          var userId=userInfo.userId;
          var userName=userInfo.fullName;
          if(userId=='jackliu'){
              userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
          }
          d.actions[0].params.recordInput.fields.ModifiedBy=userId;
    }
    if(route.query.RegardingObjectId){
        d.actions[0].params.recordInput.fields.RegardingObjectId=route.query.RegardingObjectId;
        d.actions[0].params.recordInput.fields.RegardingObjectTypeCode=route.query.RegardingObjectTypeCode;
        d.actions[0].params.recordInput.fields.FolderId=route.query.FolderId;
    }
    if(type==1){
        d.actions[0].params.recordInput.fields={
            Title: data.detail.Title
        }
    }
    let obj = {
        message: JSON.stringify(d)
    }
        proxy.$post(url,obj).then(res=>{
          //formRef.value.resetFields();
          if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
            if(type==1){
                message.success("标题修改成功！");
                if(DetailInfoEditRef&&DetailInfoEditRef.value&&DetailInfoEditRef.value.handleSubmit!='undefined'){
                    DetailInfoEditRef.value.getData();
                }
            }
            else{
                //message.success("保存成功！");
                //getDetail();
            }
          }
          else{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                message.success(res.actions[0].errorMessage);
            }
            else{
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
            path:"/lightning/r/Content/view",
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
        let h=document.documentElement.clientHeight;
        data.height = h-140-46;
        data.isEditor = true;
        window.addEventListener("resize", () => {
            let h=document.documentElement.clientHeight;
            data.height = h-140-46;
            if(data.activeKey==0){
                data.activeKey=-1;
                setTimeout(function(){
                    changeTabs(0);
                },100)
            }
        })
    })
    //取消发布
  const handleCancelRelease = () => {
    data.isConfirm=true;
    data.confirmText='确定要取消发布吗？'
    data.confirmTitle='取消发布'
  }
  //添加文档链接
  const addDoc=()=>{
      data.isAddDoc=true;
    }
  //选中文档链接
  const handleSelectDoc=(obj)=>{
      let reUrl = router.resolve({
          path:"/lightning/r/Content/view",
          query: {
            id: obj.id,
            objectTypeCode:'100201'
          }
      })
      let html='<a href="'+reUrl.href+'" target="_blank">'+obj.name+'</a>';
      if(editorRef&&editorRef.value){
        tinymce.activeEditor.insertContent(html);
      }
      data.isAddDoc=false;
  }
  //添加 流程/用户 链接
  const handleAddLink=(name)=>{
    data.sObjectName2=name;
    data.isAddLink=true;
  }
  //选中 流程/用户 链接
  const handleSelectLink=(obj)=>{
      let reUrl = router.resolve({
          path:"/lightning/r/Workflow/instance/detail",
          query: {
            id: obj.id,
            reurl:'/lightning/o/workflow/doing'
          }
      })
      let html='<a href="'+reUrl.href+'" target="_blank">'+obj.name+'</a>';
      if(data.sObjectName2=='SystemUser'){
        html='<span>'+obj.name+'</span>';
      }
      if(editorRef&&editorRef.value){
        tinymce.activeEditor.insertContent(html);
      }
      data.isAddLink=false;
  }
  //去重
  const unique = (list) => {
        for (var i = 0; i < list.length; i++) {
            for (var j = i + 1; j < list.length; j++) {
                if (list[i].uid == list[j].uid) {
                    list.splice(j, 1)
                    j--;
                }
            }
        }
        return list;
    }
    const beforeUpload=(e)=>{
        //执行顺序1
        console.log("beforeUpload",e);
    }
    const handleChange = (file) => {
        //执行顺序2
        if(file&&file.file){
            let size=file.file.size;
            size=size?(size*1/1024).toFixed(2):0;
            data.fileList1.push({
                uid: file.file.uid,
                name: file.file.name,
                url: file.file.url,
                fileExtension: file.file.name ? (file.file.name).split('.')[1] : '',
                raw: file.file.originFileObj,
                Privilege: '',
                size:size+'kb',
                isNew:true
            });
        }
        data.fileList1=unique(data.fileList1);
    }
    const changeRequest=(file) => {
        //执行顺序3
        nextTick(()=>{
            if (data.fileList1&&data.fileList1.length&&data.id) {
                let isHasNew=false;
                var fd = new FormData();
                fd.append('parentId', data.id);
                fd.append('entityName', 'Content');
                for (var i = 0; i < data.fileList1.length; i++) {
                    var item = data.fileList1[i];
                    if (item.raw&&item.isNew) {
                        fd.append('files', item.raw);
                        data.fileList1[i].isNew=false;
                        isHasNew=true;
                    }
                }
                if(isHasNew){
                    axios({
                        url: Interface.uploadFiles,
                        method: 'POST',
                        data: fd,
                        headers: {
                            'Content-type': 'multipart/form-data',
                        },
                    }).then(res=>{
                        message.success("上传成功！");
                        //changeTabs(2);
                    }).catch(err => {
                        console.log('error', err);
                        message.error("上传失败！");
                    });
                }
            }
        })
    }
  </script>
  <style lang="less" scoped>
  .editorWrap{
    width: 100%;
    height: 100vh;
    background: #f0f2f6;
    overflow: hidden;
    .preview-header{
        width: 100%;
        height: 74px;
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
            width: 40px;
            height: 40px;
            background: #0079de;
            border-radius: 50%;
            margin-right: 0px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            top: 10px;
            img {
                width: 20px;
                height: 20px;
            }
        }
        .ant-tabs-nav{
            margin: 0;
        }
        .leftBox {
            min-width: 695px;
            flex: 1;
            .backText{
                color: var(--textColor);
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                padding-right: 10px;
            }
            .title{
                // margin-top: 5px;
                // height: 48px;
                display: flex;
                align-items: center;
                color: #1d2129;
                font-size: 14px;
                font-weight: normal;
                margin:6px 0 3px 18px;
            }
            .ant-tabs .ant-tabs-nav::before{
                display: none;
            }
            .ant-tabs-tab{
                padding: 9px 8px !important;
                margin-right: 24px !important;
            }
        }
        
    }
    .detail-scroll{
        overflow: auto;
        height: calc(~"100% - 159px");
        margin-top: 71px;
        overflow: auto;
        .detail-bd{
            // padding: 24px;
            height: 100%;
        }
        .tabContainer{
            min-height: 197px;
            height: 100%;
            display: flex;
            padding-bottom: 20px;
            position: relative;
            padding: 24px;
            .tableBox{
                // flex: 1;
                background: #fff;
                border-radius: 4px;
                margin-right: 12px;
                width: calc(~"100% - 0px");
                overflow: auto;
                padding: 20px 15px;
                margin-right: 5px;
            }
            .tableBox.active{
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
    .detail-footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        background: #fff;
        height: 64px;
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
        z-index: 99;
        .flexEnd{
            display: flex;
            justify-content: flex-end;
            padding-right: 10px;
        }
    }
    :deep .ant-tabs-tab{
        padding: 10px 8px !important;
        font-size: 12px !important;
        margin-left: 10px !important;
        margin-right: 12px !important;
    }
    :deep .ant-tabs-nav::before{
        display: none;
    }
}
.rightBox{
    display: flex;
    align-items: end;
    height: 60px;
    .btn-drop{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 12px;
        color: #999999;
    }
    .btn-drop:hover{
        color: rgb(78,89,105);
        background: #f2f3f5;
    }
    .ant-btn{
        margin-top: 12px;
    }
}

.rightAside{
    min-width: 20%;
    max-width: 20%;
    position: absolute;
    height: 100%;
    right: 0;
    // background: #fff;
    padding: 0 10px;
    // overflow-y: auto;
    .panel{
        padding: 20px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        cursor: pointer;
        overflow: auto;
        .panel-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 19px;
            .panel-title{
                font-size: 16px;
                color: #1d2129;
                font-weight: bold;
            }
        }
        .panel-bd{
            .empty {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-align: center;
                color: #666;
                img{
                    width: 50px;
                }
                .emptyDesc{
                    font-size: 14px;
                }
            }
            .relevantList{
                .relevantItem{
                    width: 100%;
                    position: relative;
                    padding: 13px 8px;
                    border-bottom: 1px solid #e5e6eb;
                    .relevantTitle{
                        width: 75%;
                        font-size: 14px;
                        color: #1d2129;
                    }
                    .relevantTimerInfo{
                        font-size: 12px;
                        color: #86909c;
                        padding-top: 10px;
                    }
                    .anticon-delete{
                        position: absolute;
                        right: 10px;
                        top: 25px;
                        font-size: 16px;
                    }
                }
                .relevantItem:hover{
                    background: #f2f3f5 !important;
                }
            }
        }
    }
    .asideScroll{
        height: 100%;
        overflow-y: auto;
    }
    .arrowIcon{
        position: absolute;
        top: 50%;
        z-index: 999;
        width: 16px;
        height: 60px;
        background: url("~@/assets/img/right.png") center center no-repeat;
        cursor: pointer;
        left: 1px;
    }
    .arrowIcon.rightIcon:hover{
        background: url("~@/assets/img/right_hover.png") center center no-repeat;
    }
    .arrowIcon.leftIcon{
        top: 50%;
        left: inherit !important;
        right: 0;
        background: url("~@/assets/img/left.png") center center no-repeat;
        &:hover{
            background: url("~@/assets/img/left_hover.png") center center no-repeat;
        }
    }
}
.leftContent{
    width: calc(~"80% - 5px");
    height: 100%;
    border-right: 1px solid #e2e3e5;
    overflow: hidden;
    overflow-y: auto;
    &.active{
        width: calc(~"100% - 24px");
    }
}

  :where(.css-dev-only-do-not-override-kqecok).ant-collapse {
    border: none !important;
    background: #fff;
  }
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse > .ant-collapse-item {
    border-bottom: none !important;
    background: #f3f2f2;
    margin-bottom: 8px;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content {
    border-top: none !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header {
    padding: 6px 16px !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    .ant-collapse-content
    > .ant-collapse-content-box {
    padding: 0 !important;
  }
  :deep
    :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child,
  :where(.css-dev-only-do-not-override-kqecok).ant-collapse
    > .ant-collapse-item:last-child
    > .ant-collapse-header {
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
  .editorWrap .detail-scroll{
    height: calc(~"100% - 90px");
  }
  .editorWrap .detailContent{
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 4px;
      overflow: auto;
  }
  .editorWrap .tableBoxContent{
    white-space: pre-wrap;
    word-break: break-all;
    padding-top: 20px;
  }
  .tableBoxWrap{
    background: rgb(233, 233, 233); 
    margin: 0px auto; padding: 4px; 
    border: 1px solid rgb(194, 194, 194); 
    width: 950px; 
    line-height: 22px;
    margin-top: 8px;
    .tableBoxDiv{
        background: url(&quot;Six_01.gif&quot;) repeat-x 50% top rgb(255, 255, 255); 
        padding: 20px 40px; 
        border: 1px solid rgb(255, 255, 255);
    }
    .tableBoxTop{
        text-align: left; 
        color: rgb(128, 128, 128); 
        padding-bottom: 10px; 
        font-size: 12px; 
        border-bottom-color: rgb(216, 216, 216); 
        border-bottom-width: 1px; 
        border-bottom-style: dashed;
    }
    .tableBoxTitle{
        color: rgb(0, 0, 0); 
        line-height: 85px; 
        font-size: 24px; 
        text-align: center;
        font-family: 仿宋_GB2312,FangSong_GB2312 !important;
    }
    .tableBoxp1{
        text-align: center; 
        color: rgb(128, 128, 128); 
        font-family: 宋体 !important; 
        font-size: 12px; 
        font-weight: normal;
    }
    .tableBoxp2{
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
  .editorWrap{
    .preview-header .icon-circle-base{
      background: #df583a;
    }
    .title{
      color: #333;
    }
    .wea-doc-detail-content-text-sub span{
      font-size: 12px;
    }
    .doc-like .anticon{
      color: rgb(178, 178, 178);
      margin-left: 8px;
      margin-right: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .doc-like.active,.doc-like.active .anticon{
      color: rgb(255, 159, 1);
    }
    .doc-label{
      color: #999;
      margin-left: 10px;
      font-size: 16px;
      font-weight: normal;
      position: absolute;
      cursor: pointer;
    }
    .detail-scroll .tabContainer .tableBox{
        padding:0;
        //width: 835px;
        //margin: 0 auto;
    }
    :deep .tox-tinymce{
        border: none;
        border-radius: 0;
        .tox-editor-container{
            //background: #f0f2f6;
            .tox-toolbar__primary{
                //display: flex;
                //justify-content: center;
                border-radius: 0;
            }
            .tox-editor-header{
                //border:none;
                background: #f8f8f8;
                border-radius: 0;
                box-shadow: none;
                padding: 0;
                border-bottom: 1px solid #eaeaea;
                //position: relative;
                //top: -12px;
            }
            .tox-toolbar__primary{
                background: #f8f8f8;
                border-radius: 0;
                //zoom: 0.9;
            }
            .tox-toolbar-overlord{
                border:none;
                background: #f8f8f8;
                border-radius: 0;
            }
            .tox-tbtn--bespoke{
                background: #f8f8f8;
                width: 87px !important;
            }
            .tox-toolbar__group{
                padding: 0 0px 0 8px;
            }
        }
       .tox-edit-area::before{
            border: none !important;
        }
    }
    .preview-header .leftBox .title{
        margin: 2px 0 0px 18px;
        .doc-title{
            width: 455px;
            display: block;
        }
    }
    :deep .ant-tabs-tab{
        margin-left: 20px !important;
        margin-right: 4px !important;
        padding: 6px 8px !important;
    }
    .require{
        font-size: 24px;
        margin-left: 5px;
        color: red;
        position: relative;
        top: 4px;
    }
    .btn-drop{
        font-size: 18px !important;
    }
    .tableBox-Bottom{
        height: 45px;
        background: #fff;
        display: flex;
        align-items: center;
        border-top: 1px solid #eaeaea;
        padding-left: 10px;
        .tableBox-Bottom-Btn{
            padding: 0 10px;
            cursor: pointer;
        }
        .tableBox-Bottom-Btn-Icon{
            position: relative;
            top: 1px;
            margin-right: 1px;
        }
    }
    .IsReply{
        margin: 0 5px 0 15px;
        :deep .el-checkbox__label{
            padding-left: 5px;
        }
    }
    .replyInfo{
        color: #fff;
        width: 17px;
        height: 17px;
        background: #faa825;
        border-radius: 50%;
        text-align: center;
        position: relative;
        top: -1px;
    }
  }
  </style>
  