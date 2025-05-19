<template>
<div class="project-detail" :class="{'onearrange':twoarrange}">
<div class="head-container">
    <div class="head-breadcrumb">
        <div class="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item class="breadcrumbitem"><a>{{title}}</a></a-breadcrumb-item>
                <a-breadcrumb-item class="breadcrumbitem">
                    <img :src="imgUrl1" alt="" />
                    <a class="breadcrumbitema1">{{ projectname||RegardingObjectIdName||'详情' }}</a>
                </a-breadcrumb-item>
                <a-breadcrumb-item class="breadcrumbitem">
                    <!-- <a-tooltip class="item" effect="dark" title="更改项目类型" placement="bottom"> -->
                        <div class="dropbtn" :class="{'showmenu':isshowmenu}">
                            <a-dropdown>
                                <div class="a-dropdown-link" title="点击更改事务类型">
                                    <img v-if="informationdata.record.IssueType&&informationdata.record.IssueType.content&&informationdata.record.IssueType.content.id" :src="imgUrl2" alt="">
                                </div>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item v-for="item,k in IssueTypeList" :key="k" class="a-menu-item" @click="changeIssueType(item.ID)">
                                            <div class="IssueTypeItem">
                                                <div class="checkbox-img"><img :src="getImg3(item)" alt="" /></div>
                                                <div>{{item.Name||'暂无'}}</div>
                                            </div>
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                             </a-dropdown>
                        </div>
                        
                    <!-- </a-tooltip> -->
                    <div class="task-title" v-if="informationdata.record.IssueKey">
                        <a @click="opendetail">
                            <span>{{informationdata.record.IssueKey||'暂无'}}</span>
                        </a>
                        <!-- <copylink :copy="itemid"/> -->
                    </div>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="head-operate">
                <a-tooltip title="关注" effect="dark"  placement="bottom">
                    <guanzhu />
                </a-tooltip>
                <a-tooltip title="表决" effect="dark"  placement="bottom">
                    <biaojue :itemid="itemid" />
                </a-tooltip>
                <a-tooltip title="分享" effect="dark"  placement="bottom">
                    <sharepopup class="sharepopup" />
                </a-tooltip>

            <div class="head-operate-item svgiconbtn">
                <a-dropdown>
                    <div class="groupBtn">
                        <a-tooltip title="更多" effect="dark" placement="bottom">
                            <icon name="gengduo" />
                        </a-tooltip>
                    </div>
                    <template #overlay>
                      <a-menu>
                        <!-- <a-menu-item @click="addworklog">记录工作</a-menu-item>
                        <a-menu-item>Connect Slack channel</a-menu-item>
                        <a-menu-item divided>转换为子任务</a-menu-item>
                        <a-menu-item command="move">移动</a-menu-item>
                        <a-menu-item command="copy">克隆</a-menu-item> -->
                        <a-menu-item @click="handleDelete" v-if="isAdmin">删除</a-menu-item>
                        <!-- <a-menu-item divided>查找字段</a-menu-item>
                        <a-menu-item >打印</a-menu-item>
                        <a-menu-item >导出 XML</a-menu-item>
                        <a-menu-item >导出 Word</a-menu-item> -->
                    </a-menu>
                    </template>
                    
                </a-dropdown>
            </div>
            <div class="head-operate-item hover-iconbtn" @click="$emit('close')" v-if="popup!=false">
                <a-tooltip title="关闭" effect="dark"  placement="bottom">
                    <icon name="guanbi" />
                </a-tooltip>
            </div>
        </div>
    </div>
    
    
</div>

<div class="box detail-body" :style="{height:detailheight}" ref="box">
    <div class="left detail-left">
        <div class="head-title">
        <div class="head-name" style="width:100%" @click="editsubject">
            <div v-show="!edittitle" >
            {{informationdata.record.Subject||'测试标题'}}
            </div>
            <div v-show="edittitle" style="width:100%">
                <el-input 
                class="searchinput"
                style="width:100%" 
                 ref="subject"
                v-model="informationdata.record.Subject" 
                @blur="edittitle=false" @change="savedetail('Subject');edittitle=false"></el-input>
            </div>
        </div>

        
        </div>
        <div class="head-operate" v-if="isAdmin">
            <div class="head-operate-item btn"  @click="addfile">
                <a-tooltip title="添加附件" effect="dark"  placement="bottom">
                    <a-upload v-model:file-list="fileList" :headers="headers" @change="changeFiles" :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false" multiple name="files" :before-upload="beforeUpload">
                        <div class="addsubtask"><LinkOutlined class="btnicon" />添加附件</div>
                    </a-upload>
                </a-tooltip>
            </div>
            <div class="head-operate-item btn"  @click="newrelated">
                <a-tooltip title="添加子事务" effect="dark"  placement="bottom">
                    <div  class="addsubtask"><icon name="subtasknumber"></icon>添加子事务</div>
                </a-tooltip>
            </div>
            <div class="head-operate-item btn" @click="newrelated">
                <a-tooltip title="链接事务" effect="dark"  placement="bottom">
                    <div  class="addsubtask"><icon name="connection"></icon>链接事务</div>
                </a-tooltip>
            </div>
        </div>

        <div class="detail-section detail-describe">
            <div class="section-title">描述</div>
            <div class="section-body">
                <div v-show="!editdescribe.show||isAdmin" @click="editdescribe.show=true">
                    <div class="descriptioncontainer" 
                        v-if="informationdata.record.Description!=''" 
                        v-html="informationdata.record.Description">
                    </div>
                    <div v-else class="placeholder">
                        <span >添加描述...</span>
                    </div>
                </div>
                <div class="editorcontent" v-show="editdescribe.show&&isAdmin">
                    <!-- <Editor v-model="informationdata.record.Description"></Editor> -->
                    <TEditor ref="editorRef" mode="middle" :placeholder="'添加描述或附件文档'"  :height=250
                            @input="getEditorContent" />
                    <div class="edit-foot">
                        <a-button @click="savedetail('Description')" type="primary" :size="'mini'">保存</a-button>
                        <a-button @click="editdescribe.show=false" :size="'mini'">取消</a-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section detail-describe">
            <div class="section-title">附件</div>
            <div class="section-body">
                <!-- <fileupload :autoupload="false" :itemid="itemid" ref="fileupload" /> -->
                <a-upload-dragger v-if="isAdmin" v-model:file-list="fileList" :headers="headers" @change="changeFiles" :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false" multiple name="files" :before-upload="beforeUpload">
                    <div class="uploadRow">
                        <p class="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p class="ant-upload-text">将文件拖到此处，或点击上传</p>
                    </div>
                </a-upload-dragger>
                <div class="inboxFileList">
                    <div class="inboxFileItem" v-for="(item,index) in attachments" :key="index">
                        <div class="leftImg">
                            <img src="/src/assets/img/filetype/doc.png" v-if="item.fileExtension=='ocx'||item.fileExtension=='docx'||item.fileExtension=='doc'||
                                    item.fileExtension=='.ocx'||item.fileExtension=='.docx'||item.fileExtension=='.doc'||item.fileExtension=='.wps'||item.fileExtension=='wps'" />
                            <img src="/src/assets/img/filetype/rar.png" v-else-if="item.fileExtension=='rar'||item.fileExtension=='zip'||
                                    item.fileExtension=='.rar'||item.fileExtension=='.zip'" />
                            <img src="/src/assets/img/filetype/Excel.png" v-else-if="item.fileExtension=='xlsx'||item.fileExtension=='xls'||
                                    item.fileExtension=='.xlsx'||item.fileExtension=='.xls'" />
                            <img src="/src/assets/img/filetype/Pdf.png" v-else-if="item.fileExtension=='pdf'||item.fileExtension=='.pdf'" />
                            <img src="/src/assets/img/filetype/TXT.png" v-else-if="item.fileExtension=='txt'||item.fileExtension=='.txt'" />
                            <img src="/src/assets/img/filetype/PPT.png" v-else-if="item.fileExtension=='ppt'||item.fileExtension=='.ppt'||item.fileExtension=='pptx'||item.fileExtension=='.pptx'" />
                            <img src="/src/assets/img/filetype/defaultImg.png" v-else-if="item.fileExtension=='jpg'||item.fileExtension=='png'||item.fileExtension=='.jpg'||item.fileExtension=='.png'" />
                            <img src="/src/assets/img/filetype/Folder.png" v-else />
                        </div>
                        <div class="rightFileInfo">
                            <div class="fileName rowEllipsis">
                                {{item.name}}
                            </div>
                            <div class="fileSize">{{item.size}}</div>
                            <div class="fileOptionShow" :title="(item.name||'')">
                                <div class="btns">
                                    <a-tooltip title="查看" placement="top">
                                        <a-button type="text" :icon="h(EyeOutlined)" @click="handlePreviewFile(item)"></a-button>
                                    </a-tooltip>
                                    <a-tooltip title="下载" placement="top">
                                        <a-button type="text" :icon="h(VerticalAlignBottomOutlined)" @click="downloadFile(item)"></a-button>
                                    </a-tooltip>
                                    <a-tooltip title="删除" placement="top">
                                        <a-button type="text" :icon="h(CloseOutlined)" @click="deleteFile0(item)"></a-button>
                                    </a-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section detail-related">
            <Subtask ref="SubtaskRef" :isAdmin="isAdmin" :priorities="informationdata.record.PriorityCode.priorities" :statuss="informationdata.record.StateCode.statuss" :itemid="itemid" @reload="reloadinformation()" @handleDelete="handleDelete1" />
        </div>
        <information v-if="twoarrange" :informationdata='informationdata'></information>
        <div class="detail-section detail-active">
            <Common :itemid="itemid"/>
        </div>
    </div>
    <div class="resize" title="拖动左右宽度">
        ⋮
    </div>
    <div class="right detail-right">
        <information @reload="reloadinformation" :informationdata='informationdata' :showWorkflow="showWorkflow" :isAdmin="isAdmin"></information>
    </div>
</div>
    <movetask ref="movetask" v-if="isShowMovetask" :project="informationdata.record.RegardingObjectId" :itemid="itemid" />
    <copytask ref="copytask" v-if="isShowCopytask" :Subject="informationdata.record.Subject" :itemid="itemid" />
    <div v-show="worklog">
        <Worklog v-model="worklog" :value="worklog" @cancel="worklog=false" />
    </div>
    <div v-show="isShowWorkflow">
        <ManageWorkflow v-model="isShowWorkflow" :ShowEditWorkflow="ShowEditWorkflow" />
    </div>
    <div class="popup-container" v-show="isShowEditWorkflow">
        <div class="editworkflowbox">
            <EditWorkflow v-if="isShowEditWorkflow" />
        </div>
    </div>
    <Delete :isShow="isDelete" v-if="isDelete" :desc="'确定要删除吗？'" @cancel="cancelDelete" @ok="getFiles"
      :sObjectName="'RelatedAttachment'" :recordId="recordId" :objTypeCode="'1001'" :external="false" />
    <CommonConfirm v-if='isConfirm' :isShow="isConfirm" :text="'确定要删除吗？'" :title="'删除'"
      @cancel="isConfirm = false" @ok="deleteFile" :id="recordId" />
    <ImageView v-if="isPhoto" :isShow="isPhoto" :photoParams="photoParams" @cancel="isPhoto = false" />
    <PdfView v-if="isPdf" :isShow="isPdf" :pdfParams="pdfParams" @cancel="isPdf = false" />
    <TxtView v-if="isTxt" :isShow="isTxt" :txtParams="txtParams" @cancel="isTxt = false" />
</div>
</template>
<script setup>
import {
      ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
      defineEmits, provide, h,
      nextTick,
  } from "vue";
  import { message } from 'ant-design-vue';
import { EditOutlined, LinkOutlined, InboxOutlined, EyeOutlined, VerticalAlignBottomOutlined, CloseOutlined } from "@ant-design/icons-vue";
import commonapi from '@/utils/commonapi.js';
import { IssueDataGet } from "@/utils/projectapi.js";
// import copylink from "@/components/schedule/detail/copylink.vue";
//import Editor from "@/components/schedule/detail/editor.vue";
import TEditor from "@/components/TEditor.vue";
 import fileupload from '@/components/schedule/detail/fileupload.vue';
 import biaojue from "@/components/schedule/detail/popup/biaojue.vue";
 import guanzhu from "@/components/schedule/detail/popup/guanzhu.vue";
 import sharepopup from "@/components/schedule/detail/popup/share.vue";
 import Common from '@/components/schedule/detail/sectioncomponents/common.vue';
 import information from "@/components/schedule/detail/sectioncomponents/information";
 import Subtask from '@/components/schedule/detail/sectioncomponents/Subtask.vue';
// import Userhead from '@/components/schedule/detail/Userheadphoto.vue';
 import icon from '@/components/schedule/detail/icon.vue';

 import copytask from "@/components/schedule/detail/copytask.vue";
 import EditWorkflow from "@/components/schedule/detail/EditWorkflow.vue";
 import ManageWorkflow from "@/components/schedule/detail/ManageWorkflow.vue";
 import movetask from "@/components/schedule/detail/movetask.vue";
 import Worklog from '@/components/schedule/detail/Worklog.vue';

import Delete from "@/components/listView/Delete.vue";
import CommonConfirm from "@/components/workflow/CommonConfirm.vue";
import ImageView from "@/components/file/ImageView.vue";
import PdfView from "@/components/file/PdfView.vue";
import TxtView from "@/components/file/TxtView.vue";
import { getprojectboardtask } from "@/utils/projectapi.js";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
const { proxy } = getCurrentInstance();
const SubtaskRef = ref(null);
const token = localStorage.getItem("token");
const data = reactive({
    
            id:'',
            projectname:'',
            projectid:'',
            title:'任务详情',
            edittitle:false,
            fileList:[],
            editdescribe:{
                show:false
            },
            informationdata:{
                record:{subtask:[],PriorityCode:{priorities:{}},StateCode:{statuss:[]},subtask:{content:[]}}
            },
            relatedlist:[
            ],
            priorities:[],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            IssueTypeList:[],
            isshowmenu:false,
            changeurl:'',
            worklog:false,
            isShowWorkflow:false,
            isShowEditWorkflow:false,
            isShowMovetask:false,
            isShowCopytask:false,
        imgUrl1:'',
        imgUrl2:'',
        imgUrl3:'',
        attachments:[],
        ImageList:[],
        uploadData: {
            parentId: '',
            entityName: ''
        },
        headers: {
            Authorization: token,
            Token: token,
        },
        isDelete: false,
        isConfirm: false,
        isPhoto: false,
        photoParams: {},
        isPdf: false,
        pdfParams: {},
        recordId:'',
        isTxt: false,
        txtParams: {},
        currentUserId:'',
        isAdmin:false
  })
  const {
            id,
            isDelete,
            isConfirm,
            isPhoto,
            photoParams,
            isPdf,
            pdfParams,
            isTxt, 
            txtParams, 
            recordId,
            attachments,
            ImageList,
            uploadData,
            headers,
            imgUrl1,
            imgUrl2,
            imgUrl3,
            projectname,
            projectid,
            title,
            edittitle,
            fileList,
            editdescribe,
            informationdata,
            relatedlist,
            priorities,
            dialogImageUrl,
            dialogVisible,
            disabled,
            IssueTypeList,
            isshowmenu,
            changeurl,
            worklog,
            isShowWorkflow,
            isShowEditWorkflow,
            isShowMovetask,
            isShowCopytask,
            currentUserId,
            isAdmin
        } = toRefs(data);
        const emit = defineEmits(['reload','handleDelete']);
        const props = defineProps({
            twoarrange: String,
            detailheight: String,itemid: String,popup: String,title: String,RegardingObjectIdName: String,
        });
        const editorRef=ref(null)
        function handleDelete(e){
            emit('handleDelete', {Id:props.itemid})
        }
        function handleDelete1(e){
            emit('handleDelete', {Id:e.Id})
        }
        function getEditorContent(e){
            data.informationdata.record.Description = e;
        }
        function getIssueTypeList(){
            data.IssueTypeList=[];
            const datalist=[{"id":"10009","name":"任务","iconUrl":"/images/icons/issuetypes/task.svg","subtask":false},{"id":"10010","name":"子任务","iconUrl":"/images/icons/issuetypes/subtask.png","subtask":false},{"id":"10000","name":"长篇故事","iconUrl":"/images/icons/issuetypes/epic.svg","subtask":false},{"id":"10017","name":"故事","iconUrl":"/images/icons/issuetypes/story.svg","subtask":false},{"id":"10007","name":"服务请求","iconUrl":"/images/icons/issuetypes/request.png","subtask":false},{"id":"10028","name":"缺陷","iconUrl":"/images/icons/issuetypes/bug.svg","subtask":false}];
            datalist.forEach(item =>{
                data.IssueTypeList.push({
                    ID:item.id,
                    IconUrl:item.iconUrl,
                    Name:item.name
                })
                if(data.informationdata.record.IssueType.content.id==item.id){
                    data.informationdata.record.IssueType.content.iconUrl=item.iconUrl
                }
            })
        }
        function changeDropdown(bool){
            if(bool){
                data.isshowmenu=true;                       
                
            }
            else{
                data.isshowmenu=false;
            }
        }
        function changeIssueType(id){
            //console.log(id)
            if(data.isAdmin){}else{
                return false;
            }
            data.informationdata.record['IssueType']=id
            savedetail('IssueType')
        }
        function addfile(){
            //refs.fileupload.$el.childNodes[0].childNodes[0].childNodes[0].click()
        }
        function addworklog(){
            data.worklog = true
        }
        function showWorkflow(){
            data.isShowWorkflow = true;
            data.isShowEditWorkflow = false;
        }
        function ShowEditWorkflow(){
            data.isShowEditWorkflow = true;
            data.isShowWorkflow = false;
        }
        function opendetail(){
            
        }
        function openproject(){
            const url = router.resolve({
                path:'/projects/board/'+data.projectname,
                query:{
                    id:data.projectid,
                }
            })
            window.open(url.href)
        }
        function openprojectlist(){
            const url = router.resolve({
                path:'/projects/list',
                query:{
                }
            })
            window.open(url.href)
        }
        function handleCommand(command){
            if(command=='move'){
                data.isShowMovetask=true;
            }
            if(command=='copy'){
                data.isShowCopytask=true;
            }
            if(command=='delete'){
            //     data.$confirm('<p>您将永久删除此事务及其所有子任务、评论、附件以及所有数据。您应该将您不想删除的全部子任务移动到另一个父事务中。</p><p>如果不确定，可以解决或关闭此事务。</p>', '删除 '+data.informationdata.record.IssueKey.content+' 及其子任务?', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     confirmButtonClass:'warningbtn',
            //     type: 'warning',
            //     dangerouslyUseHTMLString: true
            // }).then(() => {
            //     commonapi.entitydelete(4200,props.itemid).then(()=>{
            //         reload()
            //     })
            // })
            }
        }
        function titlechange(){
            console.log(123)
        }
        function reloadinformation(){
            emit('reload','')
            getdetail()
        }
        function newrelated(){
            //refs.Subtask.newrelated()
            if(SubtaskRef.value&&SubtaskRef.value.newrelated){
                SubtaskRef.value.newrelated();
            }
        }
        function savedetail(column){
            const fields = {}
            fields[column] = data.informationdata.record[column]
            
            let url = Interface.edit;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: props.itemid,
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: 'ActivityPointer',
                            objTypeCode: '4200',
                            fields: fields
                        }
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then((res) => {
                 message.success('保存成功')
                 getdetail()
                 emit('reload')
                 data.editdescribe.show = false
            });
        }
        function getdata(){
            getdetail()
        }
        function getdetail(){
            let d = {
                actions:[{
                        id: "4270;a",
                        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                        callingDescriptor: "UNKNOWN",
                        params: {
                        recordId: props.itemid,
                        apiName:'ActivityPointer',
                        objTypeCode: '4200'
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            
            proxy.$post(Interface.detail,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
                let fields=res.actions[0].returnValue.fields;

                data.informationdata.id = props.itemid;
                data.projectid=fields.OwningBusinessUnit?fields.OwningBusinessUnit.value:'';
                data.projectname=fields.OwningBusinessUnit?fields.OwningBusinessUnit.displayValue:'';
                editorRef.value.content=fields.Description?fields.Description.value:'';
                if(fields.OwningUser.value==data.currentUserId||fields.CreatedBy.value==data.currentUserId){
                    data.isAdmin=true;
                }
                else{
                    data.isAdmin=false;
                }
                data.informationdata.record = {
                    Subject:fields.Subject.value,
                    Description:fields.Description?fields.Description.value:'',
                    OwningUser:{
                        Id:fields.OwningUser.value,
                        Name:fields.OwningUser.displayValue
                    },
                    CreatedBy:{
                        Id:fields.OwningUser.value,
                        Name:fields.OwningUser.displayValue,
                        Icon:''
                    },
                    CreatedOn:fields.CreatedOn.value?dayjs(fields.CreatedOn.value).format("YYYY-MM-DD"):'',
                    PriorityCode:{priorities:{nodes:[{"iconUrl":"/images/icons/priorities/highest.svg","id":"5","name":"最高","__typename":null},{"iconUrl":"/images/icons/priorities/high.svg","id":"4","name":"高","__typename":null},{"iconUrl":"/images/icons/priorities/medium.svg","id":"3","name":"中等","__typename":null},{"iconUrl":"/images/icons/priorities/low.svg","id":"2","name":"低","__typename":null},{"iconUrl":"/images/icons/priorities/lowest.svg","id":"1","name":"最低","__typename":null}]},content:{"iconUrl":"/images/icons/priorities/medium.svg","self":null,"description":null,id:(fields.PriorityCode.value||"3"),"name":"中等"}},
                    ScheduledStart:fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("YYYY-MM-DD"):'',
                    ScheduledEnd:fields.ScheduledEnd.value?dayjs(fields.ScheduledEnd.value).format("YYYY-MM-DD"):'',
                    IssueType:{content:{"avatarId":0,"description":null,"id":(fields.IssueType.value||"10009"),"name":"任务","iconUrl":"/images/icons/issuetypes/task.svg","hierarchyLevel":0,"subtask":false}},
                    IssueKey:fields.IssueKey.value,
                    StateCode:{content:{statusCategory:{id:'1'},id:(fields.StateCode.value||'10025'),name:'待办'},statuss:{nodes:[{"statusId":"1","name":"打开","statusCategoryId":2,"iconUrl":null},{"statusId":"3","name":"进行中","statusCategoryId":2,"iconUrl":null},{"statusId":"4","name":"已重新打开","statusCategoryId":1,"iconUrl":null},{"statusId":"5","name":"已解决","statusCategoryId":3,"iconUrl":null},{"statusId":"6","name":"已关闭","statusCategoryId":3,"iconUrl":null},{"statusId":"10006","name":"Pending","statusCategoryId":3,"iconUrl":null},{"statusId":"10007","name":"已取消","statusCategoryId":3,"iconUrl":null},{"statusId":"10025","name":"待办","statusCategoryId":1,"iconUrl":null},{"statusId":"10011","name":"已完成","statusCategoryId":3,"iconUrl":null},{"statusId":"10050","name":"正在进行","statusCategoryId":2,"iconUrl":null}]}},
                    RegardingObjectId:{
                        id:fields.RegardingObjectId.value,
                        name:fields.RegardingObjectId.displayValue,
                        avatarValue:{
                            large:fields.RegardingObjectId&&fields.RegardingObjectId.avatarValue?fields.RegardingObjectId.avatarValue.large:''
                        }
                    },
                    subtask:{content:fields.subtask&&fields.subtask.value?fields.subtask.value:[]},
                    id:props.itemid,
                    TimeOriginalEstimate:fields.TimeOriginalEstimate.value
                }
                data.informationdata.record.StateCode.statuss.nodes.forEach(item =>{
                    if(data.informationdata.record.StateCode.content.id==item.statusId){
                        data.informationdata.record.StateCode.content.statusCategory.id=item.statusCategoryId
                        data.informationdata.record.StateCode.content.name=item.name
                    }
                })
                if(informationdata&&informationdata.record&&informationdata.record.RegardingObjectId&&informationdata.record.RegardingObjectId.content&&informationdata.record.RegardingObjectId.content.avatarValue&&informationdata.record.RegardingObjectId.content.avatarValue.large){
                    data.imgUrl1=require('@/assets/img/taskdetail'+informationdata.record.RegardingObjectId.content.avatarValue.large);
                }
                else{
                    data.imgUrl1=require('@/assets/img/taskdetail/images/icons/project/project00026.svg');
                }
                if(informationdata&&informationdata.record&&informationdata.record.IssueType&&informationdata.record.IssueType.content&&informationdata.record.IssueType.content.iconUrl){
                    data.imgUrl2=require('@/assets/img/taskdetail'+informationdata.record.IssueType.content.iconUrl);
                }
                else{
                    data.imgUrl2=require('@/assets/img/taskdetail/images/icons/issuetypes/task.svg');
                }
                    getIssueTypeList()
                }
            })
        }
function dragControllerDiv(){
    const resize = document.getElementsByClassName('resize');
    const left = document.getElementsByClassName('detail-left');
    const mid = document.getElementsByClassName('detail-right');
    const box = document.getElementsByClassName('box');
    for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
            //色彩扭转揭示
            resize[i].style.background = '#818181';
            const startX = e.clientX;
            resize[i].left = resize[i].offsetLeft-160;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                const endX = e.clientX;
                const moveLen = resize[i].left + (endX - startX); // （endx-startx）=挪动的间隔。resize[i].left+挪动的间隔=右边区域最初的宽度
                const maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 右边区域的宽度 = 左边区域的宽度
                if (moveLen < 150) {moveLen = 150; }// 右边区域的最小宽度为32px
                if (moveLen > maxT - 150) {moveLen = maxT - 150;} //左边区域最小宽度为150px
                for (let j = 0; j < left.length; j++) {
                    left[j].style.width = (moveLen/document.body.clientWidth)*100 + '%';
                    mid[j].style.width = ((box[i].clientWidth - moveLen)/document.body.clientWidth)*100 + '%';
                }
            };
            // 鼠标松开事件
            document.onmouseup = function (evt) {
                //色彩复原
                resize[i].style.background = '#d6d6d6';
                document.onmousemove = null;
                document.onmouseup = null;
                resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在须要持续取得鼠标音讯就要应该调用ReleaseCapture()开释掉
            };
            resize[i].setCapture && resize[i].setCapture(); //该函数在属于以后线程的指定窗口里设置鼠标捕捉
            return false;
        };
    }
}
function editsubject(){
    if(data.isAdmin){}else{
        return false;
    }
            data.edittitle = true
            nextTick(()=>{    
                //refs.subject.focus()
            })
        }

        const getImg3=(item)=>{
            let path='';
            if(item.IconUrl&&item.IconUrl!=null&&item.IconUrl!='undefined'){
                path=('/src/assets/img/taskdetail'+(item.IconUrl))
            }
            else{
                if(item.Name=='任务'){
                    path=('/src/assets/img/taskdetail/images/icons/issuetypes/task.svg')
                }else{
                    path=('/src/assets/img/taskdetail/images/icons/issuetypes/subtask.png')
                }
            }
            return path;
        }
const getFiles = () => {
  data.attachments = [];
  data.ImageList = [];  
  let url = Interface.getFiles;
  let d = {
    parentId: props.itemid,
    page: 1,
    rows: 100
  }
  proxy.$post(url, d).then(res => {
    var list = [];
    var list2 = [];
    if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue) {
      for (var i = 0; i < res.actions[0].returnValue.length; i++) {
        var item = res.actions[0].returnValue[i];
        let size = item.fileSize;
        size = size ? (size * 1 / 1024).toFixed(2) : 0;
        size = size + 'kb';
        let name = item.name || '';
        if (name) {
          name = name.replaceAll('.' + item.fileExtension, '');
        }
        let ite = {
          size: size,
          url: '/' + data.uploadData.entityName + '/' + item.id + '/' + name,
          fileLocation: item.fileLocation || '',
          uid: item.id,
          id: item.id,
          downloadUrl: item.downloadUrl || '',
          viewUrl: item.viewUrl || '',
          fileExtension: item.fileExtension,
          FileExtension: item.fileExtension,
          fileSize: item.fileSize,
          name: item.name,
          Name: item.name,
          CreatedOn: item.createdOn?dayjs(item.createdOn).format("YYYY-MM-DD hh:mm"):'',
          CreatedBy: item.createdByName || '',
        };
        list.push(ite);
        if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
          list2.push(ite);
        }
      }
    }
    data.attachments = list;
    data.ImageList = list2;
  })
};
const beforeUpload = (e) => {
    data.uploadData.entityName='ActivityPointer';
    data.uploadData.parentId=props.itemid;
    console.log("beforeUpload", e);
}
const changeFiles = (e) => {
  // console.log("e", e);
  if (e.file.status == "done") {
      message.success("上传成功！");
      getFiles();
  }
}
//预览附件
const handlePreviewFile = (item) => {
  let url = '';
  if (item.fileExtension) {
    item.fileExtension = item.fileExtension.replace(".", "");
  }
  if (item.fileExtension == 'jpg' || item.fileExtension == 'jpeg' || item.fileExtension == 'png') {
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
      index: index
    };
    data.isPhoto = true;
  } else if (item.fileExtension == 'pdf') {
    url = '/pdfjs/web/viewer.html?file=' + encodeURIComponent(item.viewUrl);
    data.pdfParams = {
      id: item.id,
      name: item.name,
      index: 0,
      viewUrl: item.viewUrl,
      downloadUrl: item.downloadUrl
    };
    data.isPdf = true;
  }
  else if (item.fileExtension == 'txt') {
    data.txtParams = {
        name: item.name,
        viewUrl: item.viewUrl,
        downloadUrl: item.downloadUrl
    };
    data.isTxt = true;
  } else if (
      item.fileExtension == "docx" ||
      item.fileExtension == "pptx" ||
      item.fileExtension == "xlsx" ||
      item.fileExtension == "doc" ||
      item.fileExtension == "ppt" ||
      item.fileExtension == "xls"
    ) {
      if(item.viewUrl&&item.viewUrl.indexOf('/lightning/r/office/view')!=-1){}else{
        item.viewUrl='/lightning/r/office/view?id='+item.id;
      }
      if(item.fileExtension == "ppt" ||item.fileExtension == "pptx"){
        item.viewUrl='/lightning/r/office/view2?id='+item.id;
      }
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
  var mhtmlHeight = window.screen.availHeight;//获得窗口的垂直位置;
  var mhtmlWidth = window.screen.availWidth; //获得窗口的水平位置; 
  var iTop = 0; //获得窗口的垂直位置;
  var iLeft = 0; //获得窗口的水平位置;
  //window.open('/#' + link + "&FileType=" + type + "&FileName=" + name + "&UserName=" + username);
  window.open('/#' + link + "&entityName=RelatedAttachment", '', 'height=' + mhtmlHeight + ',width=' + mhtmlWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=yes,scrollbars=no,resizable=yes, location=no,status=no');
};
//下载附件
const downloadFile = (item) => {
  let url = item.downloadUrl;
  window.open(url);
  // let text = item.Name || '';
  // windowOpen(url, text);
};
//删除
const deleteFile0 = (item) => {
  data.recordId = item.id;
  data.confirmText = '确定要删除吗？'
  data.confirmTitle = '删除'
  //data.isConfirm = true;
  data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
  data.isDelete = false;
  data.isConfirm = false;
};
//删除附件
const deleteFile = (id) => {
  let d = {
    actions: [{
      id: "4105;a",
      descriptor: "",
      callingDescriptor: "UNKNOWN",
      params: {
        parentId: data.uploadData.parentId,
        entityName: data.uploadData.entityName,
        fileId: id
      }
    }]
  };
  let obj = {
    message: JSON.stringify(d)
  }
  proxy.$post(Interface.deleteFiles, obj).then(res => {
    if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
      message.success("删除成功！");
      data.isConfirm = false;
      getFiles();
    }
    else {
      if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
        message.error(res.actions[0].errorMessage);
      }
      else {
        message.error("删除失败！");
      }
    }
  }).catch(err => {
    console.log('error', err);
    message.error("删除失败！");
  });
}
watch(props.itemid, (newVal, oldVal) => {
    getdata();
    getFiles();
    data.uploadData.parentId=props.itemid;
}, { deep: true, immediate: true })
onMounted(() => {
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        var userId = userInfo.userId;
        var userName = userInfo.fullName;
        if (userId == 'jackliu') {
        userId = '2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
        }
        data.currentUserId=userId.toUpperCase();
    }
    dragControllerDiv();
    getdata();
    getFiles();
    data.uploadData.parentId=props.itemid;
});
</script>
<style lang="less">
.head-operate{
    display: flex;
}
.head-container{
    padding: 15px 15px 0 34px;
}
.head-title{
    font-size: 22px;
    color: #172b4d;
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    margin-bottom: 5px;
}
.head-name{
display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
}
.el-dropdown{
    display: block;
}
.detail-left{
    width: 60%;
    padding-right: 20px;
    box-sizing: border-box;
    overflow-x: hidden !important;
}
.detail-left .head-operate{
    padding: 0 5px;
}
.onearrange .detail-left {
    width: 100%;
    padding-right: 10px;
}
.onearrange .detail-body{
  height: calc(100vh - 220px);
}
.onearrange .head-container{
  padding-left: 15px;
}
.onearrange .detail-body{
  padding-left: 15px;
}
.detail-body{
    padding: 0 0 0 35px;
    display: flex;
    justify-content: space-between;
    height: calc(95vh - 150px);
}
.detail-body>div{
    overflow: auto;
    height: 100%;
}
.detail-section {
    margin: 15px 0;
}
.section-title{
    font-weight: 700;
    padding: 0 5px;
}
.section-body {
    margin: 5px 0;
    padding: 0 5px;

    .inboxFileList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .ant-btn.ant-btn-text, .ant-btn.ant-btn-text:hover{
            color: #000 !important;
        }
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
                    background: rgba(242, 243, 245, .8);
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
}
.detail-describe .section-body{
    padding: 0;
}
.placeholder{
    color: #777;
    border-radius: 4px;
    cursor: pointer;
    padding: 7px 5px;
}
.placeholder:hover{
    background-color: rgb(231, 231, 233);
}
.detail-right{
    width: 40%;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
}
.detail-right .section-body{
    padding: 0 5px;
}
.edit-foot{
    margin-top: 10px;
}
.el-dropdown-menu__item{
    padding: 0 30px 0 10px;
}
.sharepopup :deep .title{
    display: none;
}
.sharepopup :deep .icon{
    margin: 0;
}
.sharepopup :deep svg{
    width: 22px;
    height: 22px;
}
.breadcrumbitem :deep .el-breadcrumb__inner{
    display: flex;
    align-items: center;
}
.breadcrumbitem img{
    margin-right: 5px;
    cursor: pointer !important;
}
.breadcrumbitem a{
    text-decoration:underline;
    cursor: pointer !important;
}
.head-breadcrumb{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-breadcrumb img{
    width: 16px;
    height: 16px;
}
.task-title{
    display: flex;
    align-items: center;
}
.task-title :deep svg{
    width: 18px;
    height: 18px;
    margin-left: 3px;
}
.copylink{
    visibility: hidden;
    cursor: pointer;
}
.task-title:hover .copylink{
    visibility: initial;
}
.descriptioncontainer{
    padding: 5px;
}
.head-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.head-name:hover{
    background-color: #f2f2f2;
}
.addsubtask{
    display: flex;
    align-items: center;
    color: #42526e ;
}
.addsubtask :deep svg{
    width: 16px;
    height: 16px;
    margin-right: 3px;
}
.lang-select-dropdown {
    margin-left: -10px !important;
}
.dropbtn {
    padding: 5px 5px;
    padding-right: 6px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    color: rgb(66, 82, 110) !important;
    margin-right: 0px;
    position: relative;
    top: -4px;
    left: -4px;
    float: left;
    margin-right: 6px;
}
:deep .ant-breadcrumb ol{
    position: relative !important;
    top: -8px !important;
}
:deep .breadcrumbitem .ant-breadcrumb-link{
    display: inline-block;
}
.showmenu{
    background:#253858 !important;
}
.showmenu .el-dropdown{
    color: #F4F5F7 !important;
}
.lang-select-dropdown{
    min-width: 115px;
}
.el-dropdown-item{
    display: flex;
    padding-left: 15px;
    align-items: center;
}
.checkbox-img{
    line-height: 0px;
    margin-right: 5px;
}
.checkbox-img img{
    width: 16px;
    height: 16px;
}
.el-dropdown-title{
    font-size: 14px;
    font-weight: bold;
    color:#172b4d;
    margin-left: 15px;
    margin-bottom: 5px;
}

.el-dropdown{
    top:-2px;
}
.el-breadcrumb__item{
    display: flex;
    height: 26px;
    line-height: 26px;
}
.breadcrumbitem a{
    text-decoration: none;
    color: #606266;
    font-weight: normal;
}
.breadcrumbitem a:hover{
    text-decoration: underline;
}
.breadcrumbitema{
    margin-left: 4px;
}
.popup-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.editworkflowbox{
    width: 100%;
    height: 100%;
}

.left {
    /* width: 49.2%;
    height:100%; */
    /* overflow-y:auto;
    overflow-x:hidden; */
    float: left;
    flex: 1;
}
.resize {
    cursor: col-resize;
    float: left;
    position: relative;
    top: -3%;
    background-color: #d6d6d6;
    border-radius: 5px;
    width: 3px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-size: cover;
    background-position: center;
    font-size: 0.32rem;
    color: white;
}
/*拖拽区鼠标悬停款式*/
.resize:hover {
    color: #444444;
}
.right {
    /* height:7.8rem; */
    float: left;
    /* width:50%; */
}
:deep .head-operate .svgiconbtn{
  display: flex !important;
  cursor: pointer;
}
:deep .head-operate .svgiconbtn .groupBtn,:deep .head-operate-item.hover-iconbtn{
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
}
.project-detail .btn,.project-detail .hoverbtn{
        padding: 6px 10px;
        cursor: pointer;
        color: #42526e !important;
        border-radius: 4px;
        display: inline-block;
}
.project-detail i{
    font-style: normal;
}
.project-detail .btn{
    background-color: #f3f3f5;
    margin-right: 10px;
}
.project-detail .ant-btn{
    margin-right: 10px;
}
a{
    text-decoration: none !important;
}
.IssueTypeItem{
    display: flex;
    align-items: center;
}
:deep .detail-section .section-title{
    color: #606266;
    font-size: 14px;
}
.ant-breadcrumb-link img{
    position: relative;
    top: 3px;
}
:deep .dropbtn .a-dropdown-link img{
    top: 0;
}
.uploadRow {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;

    p {
        margin: 0 !important;
    }

    p.ant-upload-text {
        font-size: 14px !important;
    }
}
input[aria-hidden="true"] {
    display: none !important;
}
.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
    box-shadow: none !important;
}
.section-body{
    .ant-upload-drag{
        background: #fff !important;
    }
}
</style>