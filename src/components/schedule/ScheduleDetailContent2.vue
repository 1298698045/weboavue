<template>
<div class="project-detail" :class="{'onearrange':twoarrange}">
<div class="head-container">
    <div class="head-breadcrumb">
        <div class="breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item class="breadcrumbitem"><a>{{title}}</a></a-breadcrumb-item>
                <a-breadcrumb-item class="breadcrumbitem">
                    <img :src="require('@/assets/img/taskdetail'+(informationdata&&informationdata.record&&informationdata.record.RegardingObjectId&&informationdata.record.RegardingObjectId.content&&informationdata.record.RegardingObjectId.content.avatarValue&&informationdata.record.RegardingObjectId.content.avatarValue.large?informationdata.record.RegardingObjectId.content.avatarValue.large:'/images/icons/project/project00026.svg'))" alt="" />
                    <a class="breadcrumbitema1">{{ projectname||RegardingObjectIdName||'详情' }}</a>
                </a-breadcrumb-item>
                <a-breadcrumb-item class="breadcrumbitem">
                    <!-- <a-tooltip class="item" effect="dark" title="更改项目类型" placement="bottom"> -->
                        <div class="dropbtn" :class="{'showmenu':isshowmenu}">
                            <a-dropdown>
                                <div class="a-dropdown-link" title="点击更改事务类型">
                                    <img v-if="informationdata.record.IssueType&&informationdata.record.IssueType.content&&informationdata.record.IssueType.content.id" :src="require('@/assets/img/taskdetail'+(informationdata&&informationdata.record&&informationdata.record.IssueType&&informationdata.record.IssueType.content&&informationdata.record.IssueType.content.iconUrl?informationdata.record.IssueType.content.iconUrl:'/images/icons/issuetypes/task.svg'))" alt="">
                                </div>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item v-for="item,k in IssueTypeList" :key="k" class="a-menu-item" @click="changeIssueType(item.ID)">
                                            <div class="IssueTypeItem">
                                                <div class="checkbox-img"><img :src="require('@/assets/img/taskdetail'+(item.IconUrl||(item.Name=='任务'?'/images/icons/issuetypes/task.svg':'/images/icons/issuetypes/subtask.png')))" alt="" /></div>
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
                        <a-menu-item @click="addworklog">记录工作</a-menu-item>
                        <a-menu-item>Connect Slack channel</a-menu-item>
                        <a-menu-item divided>转换为子任务</a-menu-item>
                        <a-menu-item command="move">移动</a-menu-item>
                        <a-menu-item command="copy">克隆</a-menu-item>
                        <a-menu-item @click="handleDelete">删除</a-menu-item>
                        <a-menu-item divided>查找字段</a-menu-item>
                        <a-menu-item >打印</a-menu-item>
                        <a-menu-item >导出 XML</a-menu-item>
                        <a-menu-item >导出 Word</a-menu-item>
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
        <div class="head-operate">
            <div class="head-operate-item btn"  @click="addfile">
                <a-tooltip title="添加附件" effect="dark"  placement="bottom">
                    <div  class="addsubtask"><LinkOutlined class="btnicon" />添加附件</div>
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
                <div v-show="!editdescribe.show" @click="editdescribe.show=true">
                    <div class="descriptioncontainer" 
                        v-if="informationdata.record.Description!=''" 
                        v-html="informationdata.record.Description">
                    </div>
                    <div v-else class="placeholder">
                        <span >添加描述...</span>
                    </div>
                </div>
                <div class="editorcontent" v-show="editdescribe.show">
                    <!-- <Editor v-model="informationdata.record.Description"></Editor> -->
                    <TEditor ref="editorRef" mode="middle" :placeholder="'添加描述或附件文档'"  :height=250
                            @input="getEditorContent" />
                    <div class="edit-foot">
                        <a-button @click="savedetail('Description')" type="primary" size="mini">保存</a-button>
                        <a-button @click="editdescribe.show=false" size="mini">取消</a-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section detail-describe">
            <div class="section-title">附件</div>
            <div class="section-body">
                <fileupload :autoupload="false" :itemid="itemid" ref="fileupload" />
            </div>
        </div>
        <div class="detail-section detail-related" v-if="informationdata.record.subtask">
            <Subtask :priorities="informationdata.record.PriorityCode.priorities" :statuss="informationdata.record.StateCode.statuss" ref="Subtask" :itemid="itemid" @reload="reloadinformation()" @handleDelete="handleDelete1" />
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
        <information @reload="reloadinformation" :informationdata='informationdata' :showWorkflow="showWorkflow"></information>
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
</div>
</template>
<script>
import {getCurrentInstance} from "vue";
import { EditOutlined, LinkOutlined } from "@ant-design/icons-vue";
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
import { getprojectboardtask } from "@/utils/projectapi.js";
import Interface from "@/utils/Interface.js";
import dayjs from 'dayjs';
export default {
    inject:['reload'],
    data(){
        return {
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
            proxy:null
        }
    },
    props:['twoarrange','detailheight','itemid','popup','title','RegardingObjectIdName'],
    watch:{
        itemid(){
            this.getdata()
        }
    },
    computed:{
    },
    created(){
        // if(this.$route.params.projectname){
        //     this.projectname = this.$route.params.projectname
        // }
        // this.itemid = this.$route.query.id
        const { proxy } = getCurrentInstance();
        this.proxy=proxy;
        this.getdata()
        //this.getIssueTypeList()
    },
    mounted() {
        //tinymce.init({});
        //const dropdownMenu = this.$refs['elDropdown']
        //dropdownMenu.$data.currentPlacement = 'bottom-start'

        let me=this;
        me.dragControllerDiv();
    },
    components:{
        // Userhead,
         //Editor,
         TEditor,
         information,
         fileupload,
         icon,
         Subtask,
         Common,
         sharepopup,
         guanzhu,
         biaojue,
        // copylink,
         movetask,
         copytask,
         Worklog,
         ManageWorkflow,
         EditWorkflow,
         EditOutlined,
         LinkOutlined
    },
    methods:{
        handleDelete(e){
            this.$emit('handleDelete', {Id:this.itemid})
        },
        handleDelete1(e){
            this.$emit('handleDelete', {Id:e.Id})
        },
        getEditorContent(e){
            this.informationdata.record.Description = e;
        },
        getIssueTypeList(){
            var that=this;
            this.IssueTypeList=[];
            var datalist=[{"id":"10009","name":"任务","iconUrl":"/images/icons/issuetypes/task.svg","subtask":false},{"id":"10010","name":"子任务","iconUrl":"/images/icons/issuetypes/subtask.png","subtask":false},{"id":"10000","name":"长篇故事","iconUrl":"/images/icons/issuetypes/epic.svg","subtask":false},{"id":"10017","name":"故事","iconUrl":"/images/icons/issuetypes/story.svg","subtask":false},{"id":"10007","name":"服务请求","iconUrl":"/images/icons/issuetypes/request.png","subtask":false},{"id":"10028","name":"缺陷","iconUrl":"/images/icons/issuetypes/bug.svg","subtask":false}];
            datalist.forEach(item =>{
                this.IssueTypeList.push({
                    ID:item.id,
                    IconUrl:item.iconUrl,
                    Name:item.name
                })
                if(that.informationdata.record.IssueType.content.id==item.id){
                    that.informationdata.record.IssueType.content.iconUrl=item.iconUrl
                }
            })
            //console.log(this.IssueTypeList,111)
        },
        changeDropdown(bool){
            if(bool){
                this.isshowmenu=true;                       
                var that=this;
                // getprojectboardtask({
                //     projectId:this.projectid,
                //     search:'',
                //     OwningUser:'',
                //     filterQuery:''
                // }).then((res)=>{
                //     if(res&&res.data&&res.data.boardScope){
                //         that.IssueTypeList=[];
                //         const datalist=res.data.boardScope.projectLocation.issueTypes;
                //         datalist.find(function(item,index){
                //             that.IssueTypeList.push({
                //                 ID:item.id,
                //                 IconUrl:item.iconUrl,
                //                 Name:item.name
                //             })
                //         })
                //     }
                // })
            }
            else{
                this.isshowmenu=false;
            }
        },
        changeIssueType(id){
            //console.log(id)
            this.informationdata.record['IssueType']=id
            this.savedetail('IssueType')
        },
        addfile(){
            console.log(this.$refs.fileupload)
            this.$refs.fileupload.$el.childNodes[0].childNodes[0].childNodes[0].click()
        },
        addworklog(){
            this.worklog = true
        },
        showWorkflow(){
            this.isShowWorkflow = true;
            this.isShowEditWorkflow = false;
        },
        ShowEditWorkflow(){
            this.isShowEditWorkflow = true;
            this.isShowWorkflow = false;
        },
        opendetail(){
            // const url = this.$router.resolve({
            //     path:'/projects/detail/'+this.projectname,
            //     query:{
            //         id:this.projectid,
            //         itemid:this.itemid
            //     }
            // })
            // window.open(url.href)
        },
        openproject(){
            const url = this.$router.resolve({
                path:'/projects/board/'+this.projectname,
                query:{
                    id:this.projectid,
                }
            })
            window.open(url.href)
        },
        openprojectlist(){
            const url = this.$router.resolve({
                path:'/projects/list',
                query:{
                }
            })
            window.open(url.href)
        },
        handleCommand(command){
            if(command=='move'){
                //this.$refs.movetask.show()
                this.isShowMovetask=true;
            }
            if(command=='copy'){
                //this.$refs.copytask.show()
                this.isShowCopytask=true;
            }
            if(command=='delete'){
                this.$confirm('<p>您将永久删除此事务及其所有子任务、评论、附件以及所有数据。您应该将您不想删除的全部子任务移动到另一个父事务中。</p><p>如果不确定，可以解决或关闭此事务。</p>', '删除 '+this.informationdata.record.IssueKey.content+' 及其子任务?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass:'warningbtn',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(() => {
                commonapi.entitydelete(4200,this.itemid).then(()=>{
                    this.reload()
                })
            })
            }
        },
        titlechange(){
            console.log(123)
        },
        reloadinformation(){
            this.$emit('reload')
            this.getdetail()
        },
        newrelated(){
            this.$refs.Subtask.newrelated()
        },
        savedetail(column){
            const fields = {}
            fields[column] = this.informationdata.record[column]
            // commonapi.entitysaverecord(fields,4200,this.informationdata.id).then(()=>{
            //     this.$message.success('保存成功')
            //     this.getdetail()
            //     this.$emit('reload')
            //     this.editdescribe.show = false
            // })
            var that=this;
            let url = Interface.edit;
            let d = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordId: that.itemid,
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
            this.proxy.$post(url, obj).then((res) => {
                 that.$message.success('保存成功')
                 that.getdetail()
                 that.$emit('reload')
                 that.editdescribe.show = false
            });
        },
        getdata(){
            this.getdetail()
        },
        getdetail(){
            // return IssueDataGet(this.itemid).then((res)=>{
            //     let record = {}
            //     if(res&&res.data&&res.data.issue&&res.data.issue.fields){}else{return}
            //     res.data.issue.fields.forEach(item => {
            //         record[item.key]=item
            //     });
            //     this.informationdata.id = res.data.issue.id
            //     this.projectid=record.RegardingObjectId.content.id
            //     this.projectname=record.RegardingObjectId.content.name
            //     this.informationdata.record = {
            //         Subject:record.Subject.content,
            //         Description:record.Description.content,
            //         OwningUser:{
            //             Id:record.OwningUser.content.id,
            //             Name:record.OwningUser.content.displayName
            //         },
            //         CreatedBy:{
            //             Id:record.OwningUser.content.id,
            //             Name:record.OwningUser.content.displayName,
            //             Icon:record.OwningUser.content.self
            //         },
            //         PriorityCode:record.PriorityCode,
            //         ScheduledStart:record.ScheduledStart.content,
            //         ScheduledEnd:record.ScheduledEnd.content,
            //         IssueType:record.IssueType,
            //         IssueKey:record.IssueKey,
            //         StateCode:record.StateCode,
            //         RegardingObjectId:{
            //             id:record.RegardingObjectId.content.id,
            //             name:record.RegardingObjectId.content.name,
            //             avatarValue:{
            //                 large:record.RegardingObjectId.content.avatarValue.large
            //             }
            //         },
            //         subtask:record.subtask,
            //         id:this.itemid,
            //         TimeOriginalEstimate:record.TimeOriginalEstimate.content
            //     }
            // })
            var that=this;
            let d = {
                actions:[{
                        id: "4270;a",
                        descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                        callingDescriptor: "UNKNOWN",
                        params: {
                        recordId: that.itemid,
                        apiName:'ActivityPointer',
                        objTypeCode: '4200'
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            
            this.proxy.$post(Interface.detail,obj).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
                let fields=res.actions[0].returnValue.fields;

                that.informationdata.id = that.itemid;
                that.projectid=fields.OwningBusinessUnit.value;
                that.projectname=fields.OwningBusinessUnit.displayValue;
                that.$refs.editorRef.content=fields.Description.value;
                that.informationdata.record = {
                    Subject:fields.Subject.value,
                    Description:fields.Description.value,
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
                    id:that.itemid,
                    TimeOriginalEstimate:fields.TimeOriginalEstimate.value
                }
                that.informationdata.record.StateCode.statuss.nodes.forEach(item =>{
                    if(that.informationdata.record.StateCode.content.id==item.statusId){
                        that.informationdata.record.StateCode.content.statusCategory.id=item.statusCategoryId
                        that.informationdata.record.StateCode.content.name=item.name
                        that.$forceUpdate();
                    }
                })
                that.getIssueTypeList()
                }
            })
        },
        dragControllerDiv: function () {
    var resize = document.getElementsByClassName('resize');
    var left = document.getElementsByClassName('detail-left');
    var mid = document.getElementsByClassName('detail-right');
    var box = document.getElementsByClassName('box');
    for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
            //色彩扭转揭示
            resize[i].style.background = '#818181';
            var startX = e.clientX;
            resize[i].left = resize[i].offsetLeft-160;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                var endX = e.clientX;
                var moveLen = resize[i].left + (endX - startX); // （endx-startx）=挪动的间隔。resize[i].left+挪动的间隔=右边区域最初的宽度
                var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 右边区域的宽度 = 左边区域的宽度
                if (moveLen < 150) moveLen = 150; // 右边区域的最小宽度为32px
                if (moveLen > maxT - 150) moveLen = maxT - 150; //左边区域最小宽度为150px
                //resize[i].style.left = moveLen; // 设置左侧区域的宽度
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
},
        editsubject(){
            this.edittitle = true
            this.$nextTick(()=>{    
                this.$refs.subject.focus()
            })
        }
    }
}
</script>
<style scoped>
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
.section-body{
    margin: 5px 0;
    padding: 0 5px;
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
.sharepopup>>>.title{
    display: none;
}
.sharepopup>>>.icon{
    margin: 0;
}
.sharepopup>>>svg{
    width: 22px;
    height: 22px;
}
.breadcrumbitem>>>.el-breadcrumb__inner{
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
.task-title>>>svg{
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
.addsubtask>>>svg{
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
    top: -2px;
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
</style>